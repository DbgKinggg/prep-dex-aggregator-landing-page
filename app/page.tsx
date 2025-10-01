'use client';

import FaultyTerminal from '@/components/FaultyTerminal';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
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
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
            TANGERINE
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
            Making perp trading as simple as swapping tokens.
          </p>

          {/* Join Waitlist Button */}
          <div className="pt-6">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
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
    </div>
  );
}
