'use client';

import { useState } from 'react';
import DecryptedText from '@/components/DecryptedText';
import FaultyTerminal from '@/components/FaultyTerminal';
import { WaitlistDialog } from '@/components/WaitlistDialog';
import { useIsMobile } from '@/hooks/useIsMobile';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';

export default function Home() {
  const isMobile = useIsMobile();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { login, logout, user } = usePrivy();
  const walletAddress = user?.wallet?.address || '';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background p-2">
      {/* Glassmorphic Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-4xl w-full px-2">
        <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-8 py-4 shadow-2xl flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-white">
            TANGERINE
          </h1>
          {walletAddress ? (
            <Button
              onClick={() => logout()}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Button>
          ) : (
            <Button
              onClick={() => login()}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Connect Wallet
            </Button>
          )}
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
          noiseAmp={0.5}
          chromaticAberration={0}
          dither={0}
          curvature={0.24}
          tint="#ff7c3a"
          mouseReact={true}
          mouseStrength={0.1}
          pageLoadAnimation={false}
          brightness={1.2}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-screen h-screen px-6 text-center pointer-events-none">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
            Perp DEX
            <br />
            <span className="text-6xl sm:text-8xl font-bold">Aggregator</span>
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-semibold">
            <DecryptedText
              text="The 1inch for Perp Trading."
              animateOn="view"
              revealDirection="center"
              speed={100}
              maxIterations={20}
            />
          </p>

          <div className="pt-6 pointer-events-auto">
            <button
              onClick={() => setWaitlistOpen(true)}
              className="group relative inline-flex items-center cursor-pointer justify-center px-8 py-4 text-lg font-semibold text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
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
