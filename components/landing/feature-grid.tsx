import { LiquidityGrid } from "@/components/landing/liquidity-grid";

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

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
      {label}
    </div>
  );
}
