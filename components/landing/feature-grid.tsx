import { motion } from "motion/react";

import { CrossChainCarousel } from "@/components/landing/cross-chain-carousel";
import { FarmPortfolioDemo } from "@/components/landing/farm-portfolio-demo";
import { LiquidityGrid } from "@/components/landing/liquidity-grid";
import { EasyProMode } from "@/components/landing/easy-pro-mode";

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
      "Trade from your favorite chain while keeping funds where you like.",
    className: "lg:col-span-2",
    renderContent: () => <CrossChainCarousel />,
  },
  {
    label: "Farming",
    title: "Farm all Perp DEXs in one place",
    description:
      "Why swap between different DEXs when you can trade all of them right here.",
    className: "lg:col-span-3",
    renderContent: () => <FarmPortfolioDemo />,
  },
  {
    label: "Flexibility",
    title: "Easy/Pro mode",
    description:
      "Whether you're a perp newbie or pro, trade the way you like. We give you maximum flexibility in how you trade.",
    className: "lg:col-span-3",
    renderContent: () => <EasyProMode />,
  },
];

export function FeatureGrid() {
  return (
    <motion.section
      className="py-16 sm:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-5xl lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
          Trade faster
        </h2>
        <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl">
          But why choose us?
        </p>
        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`flex p-px ${feature.className}`}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -6 }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
      {label}
    </div>
  );
}
