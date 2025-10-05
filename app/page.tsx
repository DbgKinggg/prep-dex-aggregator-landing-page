'use client';

import { useState } from 'react';
import Image from 'next/image';
import TextRotate from '@/components/TextRotate';
import FaultyTerminal from '@/components/FaultyTerminal';
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
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Glassmorphic Navbar */}
      <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-4xl w-[calc(100%-1rem)] sm:w-full px-2">
        <div className="backdrop-blur-[10px] bg-white/5 border border-white/20 rounded-[50px] px-3 sm:px-8 py-3 sm:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex items-center justify-between">
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
          <Button
            onClick={() => open()}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer text-xs sm:text-base"
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
      </nav>

      {/* FaultyTerminal Background */}
      <div
        className="fixed inset-0"
        style={{
          zIndex: 0,
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0
        }}
      >
        <FaultyTerminal
          scale={isMobile ? 1 : 1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={0.3}
          glitchAmount={isMobile ? 0.8 : 0.5}
          flickerAmount={0.3}
          noiseAmp={0.4}
          chromaticAberration={0}
          dither={0}
          curvature={0.24}
          tint="#ff7c3a"
          mouseReact={true}
          mouseStrength={0.1}
          pageLoadAnimation={false}
          brightness={1.2}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-screen px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Headline */}
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white/80 pointer-events-none">
            Perp DEX
            <br />
            <span className="inline-block text-4xl sm:text-8xl font-bold backdrop-blur-[10px] bg-white/5 border border-white/20 rounded-[50px] px-4 sm:px-8 py-3 sm:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] mt-3 sm:mt-4 text-white">
              Aggregator
            </span>
          </h2>

          <div className="text-base sm:text-xl md:text-2xl text-white max-w-2xl mx-auto font-semibold h-20 sm:h-20 flex items-center justify-center px-6 sm:px-8 pointer-events-none">
            <TextRotate
              texts={[
                'The 1inch for Perp Trading',
                'One interface. All perp DEXs',
                "Perp trading doesn't have to be rocket science",
                'Turn market inefficiencies into profit opportunities',
              ]}
              rotationInterval={3000}
            />
          </div>

          <div className="pt-4 sm:pt-6 pointer-events-auto">
            <button
              onClick={() => setWaitlistOpen(true)}
              className="group relative inline-flex items-center cursor-pointer justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black bg-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Join Waitlist
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
          </div>
        </div>
      </div>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
