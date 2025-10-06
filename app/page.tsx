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
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] via-[#2d1810] to-[#1a0f0a]">
        {/* Animated particles/stars effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/40 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 sm:px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
          {/* Main Headline */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-tight">
            Perp trading
            <br />
            made easy
          </h2>

          {/* Secondary Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-medium">
            Trade and manage Perp Trading across 10+ Perp DEXs.
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

          {/* Feature highlights - optional section */}
          <div className="pt-16 sm:pt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Best Execution</h3>
              <p className="text-sm text-white/60">Get the best prices across all major Perp DEXs</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Unified Interface</h3>
              <p className="text-sm text-white/60">One platform to manage all your positions</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Smart Routing</h3>
              <p className="text-sm text-white/60">Automatically find the most efficient routes</p>
            </div>
          </div>
        </div>
      </div>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
