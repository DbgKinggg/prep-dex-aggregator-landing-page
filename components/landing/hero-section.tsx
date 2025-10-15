import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onJoinWaitlist: () => void;
};

export function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <section
      className="relative z-10 mx-2 flex min-h-[calc(100vh-100px)] flex-col items-center justify-center rounded-4xl px-4 text-center sm:px-6 md:mx-4"
      style={{
        background:
          "radial-gradient(200% 184% at 50% 5%,var(--token-0d9b717a-2449-4354-bde9-4e406668174b, #000000) 31.306306306306297%,var(--token-bcb4b7ca-f1d2-4fcd-a692-7f500cce537b, #f97316) 47.50197072072073%,var(--token-e0feb305-cb1f-4bbf-ad55-3fa715937606, #fa9d5b) 58.40019707207207%,rgb(255,255,255) 85.76506193693693%)",
      }}
    >
      <div className="mx-auto max-w-5xl space-y-2 sm:space-y-4">
        <h2 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl md:text-7xl">
          Perp Trading Made
          <br />
          Easy and Accessible
        </h2>
        <p className="mx-auto max-w-3xl text-lg font-medium text-white/70 sm:max-w-xl sm:text-xl md:text-xl">
          Trade and manage Perp Trading across Hyperliquid, Aster, Lighter and
          more Perp DEXs.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:gap-6">
          <Button
            onClick={onJoinWaitlist}
            className="group relative inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-black shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl sm:text-lg"
            size="lg"
          >
            Join Early Access
            <svg
              className="ml-2 size-5 transition-transform duration-200 group-hover:translate-x-1"
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
          </Button>
          <div className="relative">
            <Button
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white/40 backdrop-blur-sm sm:text-lg"
              size="lg"
              variant="outline"
            >
              Launch App
            </Button>
            <span className="absolute -right-2 -top-2 rounded-full bg-orange-400 px-3 py-1 text-xs font-bold text-black shadow-lg">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
