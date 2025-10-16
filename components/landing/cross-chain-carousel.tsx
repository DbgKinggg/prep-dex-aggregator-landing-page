'use client';

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Chain = {
  name: string;
  symbol: string;
  logo: string;
};

const chains: Chain[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: "/images/chains/ethereum.svg",
  },
  {
    name: "Solana",
    symbol: "SOL",
    logo: "/images/chains/solana.svg",
  },
  {
    name: "Base",
    symbol: "BASE",
    logo: "/images/chains/base.svg",
  },
  {
    name: "Arbitrum",
    symbol: "ARB",
    logo: "/images/chains/arbitrum.svg",
  },
  {
    name: "Polygon",
    symbol: "POL",
    logo: "/images/chains/hyperevm.svg",
  },
];

export function CrossChainCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const centerOnIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const card = cardRefs.current[index];
      if (!track || !card) return;

      const cardOffset =
        card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2;

      track.scrollTo({
        left: cardOffset,
        behavior: "smooth",
      });
    },
    []
  );

  useEffect(() => {
    centerOnIndex(activeIndex);
  }, [activeIndex, centerOnIndex]);

  useEffect(() => {
    const handleResize = () => centerOnIndex(activeIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, centerOnIndex]);

  return (
    <div className="relative mx-auto flex h-full w-full max-w-md flex-col items-center justify-center">
      <div
        ref={trackRef}
        className="flex h-full w-full items-center gap-6 overflow-x-auto scroll-smooth px-3 py-5"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {chains.map((chain, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.button
              key={chain.name}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative flex aspect-square h-[160px] w-[160px] items-center justify-center rounded-[32px] bg-gradient-to-br from-primary/35 via-primary/20 to-primary/45 transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
              aria-pressed={isActive}
              animate={{
                scale: isActive ? 1 : 0.8,
                opacity: isActive ? 1 : 0.45,
                filter: isActive ? "blur(0px)" : "blur(1px)",
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 28,
              }}
              style={{
                boxShadow: isActive
                  ? "0 48px 120px rgba(249, 115, 22, 0.45)"
                  : "0 20px 48px rgba(15, 23, 42, 0.35)",
              }}
            >
              <Image
                src={chain.logo}
                alt={chain.name}
                width={100}
                height={100}
                className="h-20 w-20 rounded-[18px] bg-background/25 p-3 object-contain"
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
