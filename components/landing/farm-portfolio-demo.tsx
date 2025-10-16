import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { animate, motion, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

type Position = {
  symbol: string;
  leverage: string;
  baseAmount: string;
  pnl: string;
  pnlDirection: "up" | "down";
  change: string;
  platform: "hyperliquid" | "aster" | "lighter";
};

const portfolioPositions: Position[] = [
  {
    symbol: "BTC",
    leverage: "2x",
    baseAmount: "0.00012 BTC",
    pnl: "+$12,480.32",
    pnlDirection: "up",
    change: "+214%",
    platform: "hyperliquid",
  },
  {
    symbol: "PUMP",
    leverage: "10x",
    baseAmount: "248,597 PUMP",
    pnl: "+$42,680.21",
    pnlDirection: "up",
    change: "+386%",
    platform: "aster",
  },
  {
    symbol: "ARB",
    leverage: "5x",
    baseAmount: "4,200 ARB",
    pnl: "+$9,542.10",
    pnlDirection: "up",
    change: "+228%",
    platform: "hyperliquid",
  },
  {
    symbol: "SOL",
    leverage: "2x",
    baseAmount: "32 SOL",
    pnl: "+$5,402.77",
    pnlDirection: "up",
    change: "+136%",
    platform: "lighter",
  },
  {
    symbol: "ETH",
    leverage: "4x",
    baseAmount: "8.42 ETH",
    pnl: "+$24,812.33",
    pnlDirection: "up",
    change: "+312%",
    platform: "hyperliquid",
  },
  {
    symbol: "BONK",
    leverage: "8x",
    baseAmount: "1.2M BONK",
    pnl: "+$12,004.66",
    pnlDirection: "up",
    change: "+268%",
    platform: "aster",
  },
];

const platformLogo: Record<Position["platform"], string> = {
  hyperliquid: "/images/platforms/hyperliquid.png",
  aster: "/images/platforms/aster.png",
  lighter: "/images/platforms/lighter.png",
};

const getTokenSrc = (symbol: string) =>
  `/images/tokens/${symbol.toUpperCase()}.svg`;

export function FarmPortfolioDemo() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const translateY = useMotionValue(0);

  useEffect(() => {
    const activeCard = cardRefs.current[activeIndex];
    const container = containerRef.current;

    if (!activeCard || !container) return;

    const containerHeight = container.clientHeight;
    const cardRect = activeCard.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const topRelative = cardRect.top - containerRect.top;
    const target = -(topRelative - (containerHeight - cardRect.height) / 2);

    animate(translateY, target, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    });
  }, [activeIndex, translateY]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 via-white/8 to-white/5 px-3 py-8 sm:px-4">
      <div className="pointer-events-none absolute inset-x-12 top-1/2 z-0 h-40 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500/15 via-purple-500/10 to-orange-500/15 blur-3xl" />
      <motion.div
        ref={containerRef}
        className="relative z-10 flex h-full w-full max-w-xl flex-col justify-center"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="flex flex-col gap-3 sm:gap-4"
          style={{ y: translateY }}
        >
          {portfolioPositions.map((position, index) => {
            const isActive = index === activeIndex;
            const isHovered = hoverIndex === index;

            return (
              <motion.button
                key={position.symbol}
                type="button"
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                tabIndex={0}
                aria-pressed={isActive}
                className="relative flex w-full items-center justify-between rounded-3xl px-4 py-3 text-left sm:px-5 sm:py-4"
                animate={{
                  scale: isActive ? 1 : isHovered ? 0.96 : 0.92,
                  opacity: isActive ? 1 : isHovered ? 0.75 : 0.45,
                }}
                whileHover={{
                  scale: isActive ? 1.02 : 0.96,
                  opacity: isActive ? 1 : 0.85,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                }}
              >
                <div className="relative flex items-center gap-4 sm:gap-5">
                  <div className="relative flex size-12 items-center justify-center sm:size-14">
                    <Image
                      src={getTokenSrc(position.symbol)}
                      alt={position.symbol}
                      width={56}
                      height={56}
                      className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                      onError={(event) => {
                        const target = event.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.nextElementSibling as HTMLSpanElement | null;
                        if (fallback) {
                          fallback.style.display = "inline-flex";
                        }
                      }}
                    />
                    <span
                      className="size-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold uppercase text-white/70 sm:size-12"
                      style={{ display: "none" }}
                    >
                      {position.symbol.slice(0, 3)}
                    </span>
                    <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border border-white/30 bg-black/70 p-0.5">
                      <Image
                        src={platformLogo[position.platform]}
                        alt={`${position.platform} logo`}
                        width={20}
                        height={20}
                        className="h-full w-full rounded-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-sm font-semibold sm:text-base text-white",
                        isActive
                          ? "text-white"
                          : isHovered
                            ? "text-white/90"
                            : "text-white/80"
                      )}
                    >
                      {position.symbol} {position.leverage}
                    </span>
                    <span
                      className={cn(
                        "text-xs sm:text-sm text-white/80",
                        isActive
                          ? "text-white/70"
                          : isHovered
                            ? "text-white/55"
                            : "text-white/45"
                      )}
                    >
                      {position.baseAmount}
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-col items-end text-white">
                  <span
                    className={cn(
                      "text-sm font-semibold sm:text-base",
                      position.pnlDirection === "up"
                        ? "text-emerald-400"
                        : "text-rose-400"
                    )}
                  >
                    {position.pnl}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium sm:text-sm",
                      position.pnlDirection === "up"
                        ? "text-emerald-500/80"
                        : "text-rose-400/80"
                    )}
                  >
                    {position.change}
                  </span>
                </div>
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 rounded-3xl border border-white/5 bg-black/25 transition-all duration-300",
                    isActive
                      ? "border-white/25 bg-black/60 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
                      : isHovered
                        ? "border-white/15 bg-black/35"
                        : "border-white/10"
                  )}
                />
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
