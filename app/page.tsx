'use client';

import { useState } from 'react';
import Image from 'next/image';
import { WaitlistDialog } from '@/components/WaitlistDialog';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const isMobile = useIsMobile();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const walletAddress = address || '';

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="relative z-50 w-full px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/3d-logo-with-text-orange.png"
              alt="Tangerine"
              width={isMobile ? 100 : 140}
              height={isMobile ? 21 : 30}
              className="h-6 sm:h-7 w-auto"
            />
            <h1 className="sr-only">TANGERINE</h1>
          </div>

          {/* Connect Wallet Button */}
          <Button
            onClick={() => open()}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer text-xs sm:text-base rounded-full px-4 sm:px-6 py-2 sm:py-2.5 backdrop-blur-sm transition-all"
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 sm:px-6 text-center mx-2 md:mx-4 rounded-4xl"
        style={{
          background: "radial-gradient(200% 184% at 50% 5%,var(--token-0d9b717a-2449-4354-bde9-4e406668174b, #000000) 31.306306306306297%,var(--token-bcb4b7ca-f1d2-4fcd-a692-7f500cce537b, #f97316) 47.50197072072073%,var(--token-e0feb305-cb1f-4bbf-ad55-3fa715937606, #fa9d5b) 58.40019707207207%,rgb(255,255,255) 85.76506193693693%)"
        }}
      >
        <div className="max-w-5xl mx-auto space-y-2 sm:space-y-4">
          {/* Main Headline */}
          <h2 className="text-5xl sm:text-7xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Perp trading
            <br />
            made easy
          </h2>

          {/* Secondary Tagline */}
          <p className="text-lg sm:text-xl md:text-xl text-white/70 max-w-3xl mx-auto font-medium">
            Trade and manage Perp Trading across Hyperliquid, Aster and more Perp DEXs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8">
            {/* Join Early Access Button */}
            <button
              onClick={() => setWaitlistOpen(true)}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-black bg-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              Join Early Access
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            {/* Launch App Button (Disabled) */}
            <div className="relative">
              <button
                disabled
                className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-white/40 bg-white/10 border border-white/20 rounded-full cursor-not-allowed backdrop-blur-sm"
              >
                Launch App
              </button>
              {/* Coming Soon Tag */}
              <span className="absolute -top-2 -right-2 px-3 py-1 text-xs font-bold text-black bg-orange-400 rounded-full shadow-lg">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen px-4 sm:px-6 py-10 sm:py-20">
        <h2 className="font-bold text-3xl sm:text-5xl">
          Your Perp trading<br />starts right here
        </h2>
        <div className="mt-10 md:mt-20">
          <div className="p-4 sm:p-6 sm:mx-20 flex flex-col sm:flex-row items-center">
            <div className="flex space-y-2 sm:space-y-4 flex-col sm:w-1/2">
              <label className='text-primary font-semibold'>Connect</label>
              <h3 className="font-bold text-2xl sm:text-4xl">All portfolio in one</h3>
              <p className="text-lg sm:text-xl md:text-xl text-white/70 max-w-3xl mx-auto font-medium">
                Manage all your Perp positions, orders and trading history in one place.
              </p>
            </div>
            <Image
              src="/images/cubes.png"
              alt='Cubes'
              width={350}
              height={350}
            />
          </div>
        </div>
      </div>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
