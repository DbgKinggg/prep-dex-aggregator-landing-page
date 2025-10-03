import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAddress, verifyMessage } from 'viem';
import { Prisma } from '@prisma/client';

interface WaitlistRequestBody {
  walletAddress: string;
  email?: string;
  message: string;
  signature: `0x${string}`;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WaitlistRequestBody;
    const { walletAddress, email, message, signature, timestamp } = body;

    // Validate required fields
    if (!walletAddress || !message || !signature || !timestamp) {
      return NextResponse.json(
        { error: 'Wallet address, message, signature, and timestamp are required' },
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

    // Check timestamp is not too old (max 5 minutes)
    const currentTime = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (currentTime - timestamp > maxAge) {
      return NextResponse.json(
        { error: 'Signature expired. Please try again.' },
        { status: 401 }
      );
    }

    // Verify the signature
    try {
      const isValid = await verifyMessage({
        address: walletAddress as `0x${string}`,
        message,
        signature,
      });

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }

      console.log('Signature verified successfully for wallet:', walletAddress);
    } catch (verifyError) {
      console.error('Signature verification error:', verifyError);
      return NextResponse.json(
        { error: 'Invalid signature' },
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
