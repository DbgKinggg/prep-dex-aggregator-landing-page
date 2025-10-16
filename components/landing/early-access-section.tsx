import { StarBorder } from "@/components/ui/star-border";
import { RippleGrid } from "@/components/effects/ripple-grid";
import { motion } from "motion/react";

type EarlyAccessSectionProps = {
  onJoinWaitlist: () => void;
};

export function EarlyAccessSection({
  onJoinWaitlist,
}: EarlyAccessSectionProps) {
  return (
    <motion.section
      className="py-16 sm:py-24"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative isolate overflow-hidden px-6 py-24 text-center after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl sm:px-16 after:sm:rounded-3xl">
          <div className="absolute inset-0 -z-20">
            <RippleGrid rippleIntensity={0.08} gridSize={9} glowIntensity={0.18} opacity={0.9} />
          </div>
          <div className="absolute inset-0 -z-10 bg-black/10 backdrop-blur-xs" />
          <motion.h2
            className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Early access coming soon
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-300"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Join now and get rewarded. We&apos;ll let you know as soon as we&apos;re live.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          >
            <StarBorder onClick={onJoinWaitlist} className="cursor-pointer">
              Join Early Access
            </StarBorder>
          </motion.div>
          <motion.svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.9, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
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
          </motion.svg>
        </div>
      </motion.div>
    </motion.section>
  );
}
