import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAddress } from 'viem';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, email, privyToken } = body;

    // Validate required fields
    if (!walletAddress || !privyToken) {
      return NextResponse.json(
        { error: 'Wallet address and authentication token are required' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!isAddress(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Verify Privy authentication token
    const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
    const privyAppSecret = process.env.PRIVY_APP_SECRET;

    if (!privyAppId || !privyAppSecret) {
      console.error('Privy credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify the token with Privy
    const verifyResponse = await fetch(
      'https://auth.privy.io/api/v1/verification_keys',
      {
        headers: {
          'privy-app-id': privyAppId,
          Authorization: `Bearer ${privyAppSecret}`,
        },
      }
    );

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: 'Authentication verification failed' },
        { status: 401 }
      );
    }

    // Decode and verify the JWT token
    const jose = await import('jose');
    const jwks = await verifyResponse.json();

    try {
      const JWKS = jose.createRemoteJWKSet(
        new URL('https://auth.privy.io/api/v1/verification_keys')
      );

      const { payload } = await jose.jwtVerify(privyToken, JWKS, {
        issuer: 'privy.io',
        audience: privyAppId,
      });

      // Verify the wallet address matches the authenticated user
      const userWallets = (payload as any).linked_accounts?.filter(
        (account: any) => account.type === 'wallet'
      );

      const walletMatches = userWallets?.some(
        (wallet: any) =>
          wallet.address?.toLowerCase() === walletAddress.toLowerCase()
      );

      if (!walletMatches) {
        return NextResponse.json(
          { error: 'Wallet address does not match authenticated user' },
          { status: 403 }
        );
      }
    } catch (verifyError) {
      console.error('Token verification error:', verifyError);
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    // Get IP address and user agent
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Store in Postgres
    try {
      const result = await prisma.waitlist.create({
        data: {
          walletAddress: walletAddress.toLowerCase(),
          email: email || null,
          ip,
          userAgent,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Successfully joined the waitlist',
          data: {
            walletAddress: result.walletAddress,
            createdAt: result.createdAt,
          },
        },
        { status: 201 }
      );
    } catch (dbError: any) {
      // Check for unique constraint violation (duplicate wallet)
      if (dbError.code === 'P2002') {
        return NextResponse.json(
          { error: 'Wallet address already registered' },
          { status: 409 }
        );
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
