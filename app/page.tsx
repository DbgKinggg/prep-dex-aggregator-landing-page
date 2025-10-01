'use client';

import PixelBlast from '@/components/PixelBlast';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* PixelBlast Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={4}
          color="#f97316" // Tangerine orange for light mode
          patternScale={2.5}
          patternDensity={0.8}
          liquid={true}
          liquidStrength={0.15}
          liquidRadius={1.2}
          enableRipples={true}
          rippleIntensityScale={1.5}
          rippleSpeed={0.4}
          speed={0.3}
          transparent={true}
          edgeFade={0.3}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground">
            Perpetual DEX
            <br />
            <span className="text-primary">Aggregator</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Trade smarter across multiple perpetual DEXs. Best prices, unified interface.
          </p>

          {/* Join Waitlist Button */}
          <div className="pt-6">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
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
