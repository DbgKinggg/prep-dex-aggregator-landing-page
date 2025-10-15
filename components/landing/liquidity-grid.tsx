import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

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

export function LiquidityGrid() {
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
          <CoinBadge key={`${symbol}-${index}`} token={symbol} src={src} />
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
        "relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-2 shadow-inner shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:h-16 sm:w-16",
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
        className="h-full w-full rounded-full object-cover"
        priority
      />
    </div>
  );
}
