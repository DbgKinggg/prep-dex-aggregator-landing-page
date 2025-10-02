import { NextRequest, NextResponse } from 'next/server';
import { PrivyClient } from '@privy-io/server-auth';
import { prisma } from '@/lib/prisma';
import { isAddress } from 'viem';
import { Prisma } from '@prisma/client';

interface WaitlistRequestBody {
  walletAddress: string;
  email?: string;
  privyToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WaitlistRequestBody;
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

    // Initialize Privy client
    const privy = new PrivyClient(privyAppId, privyAppSecret);

    // Verify the token and get user data
    try {
      const claims = await privy.verifyAuthToken(privyToken);

      // Get user data from Privy
      const user = await privy.getUser(claims.userId);

      // Verify the wallet address matches the authenticated user
      const userWallets = user.linkedAccounts.filter(
        (account) => account.type === 'wallet'
      );

      const walletMatches = userWallets.some(
        (wallet) =>
          'address' in wallet &&
          wallet.address.toLowerCase() === walletAddress.toLowerCase()
      );

      if (!walletMatches) {
        console.error('Wallet verification failed:', {
          requestedWallet: walletAddress,
          userWallets: userWallets
            .filter((w) => 'address' in w)
            .map((w) => 'address' in w ? w.address : null),
        });
        return NextResponse.json(
          { error: 'Wallet address does not match authenticated user' },
          { status: 403 }
        );
      }

      console.log('User authenticated successfully with wallet:', walletAddress);
    } catch (verifyError) {
      console.error('Token verification error:', verifyError);
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    // Get IP address and user agent
    let ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') || // Cloudflare
      request.headers.get('x-client-ip') ||
      'unknown';

    // Convert IPv6 localhost to IPv4 for consistency
    if (ip === '::1' || ip === '::ffff:127.0.0.1') {
      ip = '127.0.0.1';
    }

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
    } catch (dbError) {
      // Check for unique constraint violation (duplicate wallet)
      if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
        if (dbError.code === 'P2002') {
          return NextResponse.json(
            { error: 'Wallet address already registered' },
            { status: 409 }
          );
        }
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
