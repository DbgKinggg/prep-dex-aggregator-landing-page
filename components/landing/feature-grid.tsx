import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Feature = {
  label: string;
  title: string;
  description: string;
  className: string;
  renderContent: () => JSX.Element;
};

const features: Feature[] = [
  {
    label: "More",
    title: "More coins, more liquidity",
    description: "Trade Perp on more coins, trade with MAX liquidity.",
    className: "lg:col-span-4",
    renderContent: () => <LiquidityGrid />,
  },
  {
    label: "Multi-chain",
    title: "Cross-chain trading",
    description:
      "Trade from your favorite chain, keep funds on where you like.",
    className: "lg:col-span-2",
    renderContent: () => (
      <PlaceholderCard label="Network mesh visualization coming soon" />
    ),
  },
  {
    label: "Farming",
    title: "Farm all Perp DEXs in one place",
    description:
      "Why swap between different DEXs when you can trade all of them right here.",
    className: "lg:col-span-2",
    renderContent: () => (
      <PlaceholderCard label="Rewards dashboard layout coming soon" />
    ),
  },
  {
    label: "Flexibility",
    title: "Easy/Pro mode",
    description:
      "Whether you are a Perp newbie or pro, trade the way you like. We give you the max flexibility on how you'd like to trade.",
    className: "lg:col-span-4",
    renderContent: () => (
      <PlaceholderCard label="Mode toggler interaction coming soon" />
    ),
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
          Trade faster
        </h2>
        <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl">
          But why choose us?
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {features.map((feature, index) => (
            <div key={feature.title} className={`flex p-px ${feature.className}`}>
              <div
                className={[
                  "flex h-full w-full flex-col overflow-hidden rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15 dark:shadow-none",
                  index === 0
                    ? "max-lg:rounded-t-4xl lg:rounded-tl-4xl"
                    : "",
                  index === 1 ? "lg:rounded-tr-4xl" : "",
                  index === 2 ? "lg:rounded-bl-4xl" : "",
                  index === features.length - 1
                    ? "max-lg:rounded-b-4xl lg:rounded-br-4xl"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="flex h-80 w-full flex-shrink-0 items-center justify-center bg-gradient-to-br from-white/8 via-white/10 to-white/5 backdrop-blur">
                  {feature.renderContent()}
                </div>
                <div className="p-10">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {feature.label}
                  </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                    {feature.title}
                  </p>
                  <p className="mt-2 max-w-lg text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type TokenImage = {
  symbol: string;
  src: string;
};

type LogoRowConfig = {
  tokens: TokenImage[];
  duration: number;
  direction: "forward" | "reverse";
  delay: number;
};

const tokenSymbols = [
  "ADA",
  "ARB",
  "ASTER",
  "AVAX",
  "BNB",
  "BONK",
  "BTC",
  "CAKE",
  "CRV",
  "DOGE",
  "ETH",
  "HYPE",
  "IP",
  "LINK",
  "MNT",
  "PEPE",
  "PUMP",
  "SOL",
  "SUI",
  "UNI",
  "WLFI",
  "XPL",
  "XRP",
  "ZORA",
] as const;

const tokenImages: TokenImage[] = tokenSymbols.map((symbol) => ({
  symbol,
  src: `/images/tokens/${symbol}.svg`,
}));

const liquidityRows: LogoRowConfig[] = [
  { tokens: tokenImages.slice(0, 8), duration: 18, direction: "forward", delay: 0 },
  { tokens: tokenImages.slice(8, 16), duration: 20, direction: "reverse", delay: -4 },
  { tokens: tokenImages.slice(16, 24), duration: 22, direction: "forward", delay: -8 },
];

function LiquidityGrid() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="relative flex h-80 w-full items-center justify-center border border-white/10 bg-white/10 px-4 py-8 sm:px-10"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      tabIndex={0}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black via-black/70 to-transparent opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black via-black/70 to-transparent opacity-70" />
      <div className="relative flex w-full flex-col gap-6 sm:gap-8">
        {liquidityRows.map((row, index) => (
          <LogoLoopRow key={`${row.direction}-${index}`} {...row} isActive={isActive} />
        ))}
      </div>
      <style jsx global>{`
        @keyframes logo-loop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

type LogoLoopRowProps = LogoRowConfig & { isActive: boolean };

function LogoLoopRow({ tokens, duration, direction, delay, isActive }: LogoLoopRowProps) {
  const items = [...tokens, ...tokens];

  return (
    <div className="relative w-full">
      <div
        className="flex w-max items-center gap-4 sm:gap-6"
        style={{
          animationName: "logo-loop",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction === "reverse" ? "reverse" : "normal",
          animationPlayState: isActive ? "running" : "paused",
          animationDelay: `${delay}s`,
        }}
      >
        {items.map(({ symbol, src }, index) => (
          <CoinBadge
            key={`${symbol}-${index}`}
            token={symbol}
            src={src}
          />
        ))}
      </div>
    </div>
  );
}

type CoinBadgeProps = {
  token: string;
  src: string;
};

function CoinBadge({ token, src }: CoinBadgeProps) {
  return (
    <div
      className={cn(
        "flex w-14 h-14 md:w-16 md:h-16 relative border-t border-x rounded-2xl p-3 transition-all delay-100 hover:scale-105 hover:-translate-y-1",
      )}
    >
      <div
        aria-hidden="true"
        className="left-1/2 top-0 w-[25px] user-select-none center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{ "background": "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)" }}
      />
      <Image
        src={src}
        alt={`${token} token`}
        width={64}
        height={64}
        className="aspect-square w-full h-full rounded-full"
        priority
      />
    </div>
  );
}

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
      {label}
    </div>
  );
}
