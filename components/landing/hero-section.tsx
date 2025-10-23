import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics/react";
import { motion } from "motion/react";

type HeroSectionProps = {
  onJoinWaitlist: () => void;
};

export function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  const handleJoinWaitlist = () => {
    track('cta_join_early_access_click');
    onJoinWaitlist();
  };

  return (
    <motion.section
      className="relative z-10 mx-2 flex min-h-[calc(100vh-100px)] flex-col items-center justify-center rounded-4xl px-4 text-center sm:px-6 md:mx-4"
      style={{
        background:
          "radial-gradient(200% 184% at 50% 5%,var(--token-0d9b717a-2449-4354-bde9-4e406668174b, #000000) 31.306306306306297%,var(--token-bcb4b7ca-f1d2-4fcd-a692-7f500cce537b, #f97316) 47.50197072072073%,var(--token-e0feb305-cb1f-4bbf-ad55-3fa715937606, #fa9d5b) 58.40019707207207%,rgb(255,255,255) 85.76506193693693%)",
      }}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="mx-auto max-w-5xl space-y-2 sm:space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
        }}
      >
        <motion.h2
          className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl md:text-7xl"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          All of Perp DEXs
          <br />
          curated as one
        </motion.h2>
        <motion.p
          className="mx-auto max-w-3xl text-lg font-medium text-white/70 sm:max-w-xl sm:text-xl md:text-xl"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          The only Perp Dex aggregator you need
        </motion.p>
        <motion.div
          className="flex flex-col items-center justify-center gap-4 pt-10 sm:flex-row sm:gap-6"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleJoinWaitlist}
              className="group relative inline-flex h-14 cursor-pointer items-center justify-center rounded-full bg-white px-8 py-6 text-base font-semibold text-primary-foreground shadow-[0_24px_80px_rgba(249,115,22,0.35)] transition-all duration-300 hover:shadow-[0_30px_100px_rgba(249,115,22,0.45)] hover:bg-white sm:h-[3.5rem]"
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
          </motion.div>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              disabled
              className="inline-flex h-14 cursor-not-allowed items-center justify-center rounded-full border border-white/15 bg-black/40 px-8 py-6 text-base font-semibold text-white/60 backdrop-blur-md transition-all duration-300 sm:h-[3.5rem]"
              size="lg"
              variant="outline"
            >
              Launch App
            </Button>
            <motion.span
              className="absolute -right-2 -top-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-[0_12px_30px_rgba(249,115,22,0.45)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 240, damping: 20 }}
            >
              Coming Soon
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
