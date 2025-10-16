import { motion } from "motion/react";

import { StarBorder } from "@/components/ui/star-border";

type EarlyAccessSectionProps = {
  onJoinWaitlist: () => void;
};

export function EarlyAccessSection({
  onJoinWaitlist,
}: EarlyAccessSectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden px-6 py-24 text-center after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl sm:px-16 after:sm:rounded-3xl">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Early access coming soon
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-300">
            Join now, get rewarded. We will let you know when we are out.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <StarBorder onClick={onJoinWaitlist} className="cursor-pointer">
              Join Early Access
            </StarBorder>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#early-access-gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="early-access-gradient">
                <stop stopColor="#f2995a" />
                <stop offset={1} stopColor="#f97316" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
