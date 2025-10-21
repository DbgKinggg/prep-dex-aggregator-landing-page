import Image from "next/image";
import { track } from "@vercel/analytics/react";
import { motion } from "motion/react";

type Platform = {
  name: string;
  src: string;
  href: string;
  event: string;
};

const platforms: Platform[] = [
  {
    name: "Hyperliquid",
    src: "/images/platforms/hyperliquid-text.png",
    href: "https://hyperliquid.xyz",
    event: "platform_hyperliquid_click",
  },
  {
    name: "Aster",
    src: "/images/platforms/aster-text.png",
    href: "https://www.asterdex.com/",
    event: "platform_aster_click",
  },
  {
    name: "Lighter",
    src: "/images/platforms/lighter-text.png",
    href: "https://lighter.xyz/",
    event: "platform_lighter_click",
  },
  {
    name: "Backpack",
    src: "/images/platforms/backpack-text.png",
    href: "https://backpack.exchange/",
    event: "platform_backpack_click",
  },
];

export function PlatformShowcase() {
  return (
    <motion.section
      className="py-16 sm:py-24"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center text-lg font-semibold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          All the Perp DEXs you love
        </motion.h2>
        <motion.div
          className="mx-auto mt-10 grid max-w-lg grid-cols-4 place-items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              className="col-span-2 flex w-full items-center justify-center lg:col-span-1"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center p-4 transition-colors"
                onClick={() => track(platform.event)}
              >
                <Image
                  alt={platform.name}
                  src={platform.src}
                  width={158}
                  height={48}
                  className="max-h-12 w-full object-contain"
                />
              </a>
            </motion.div>
          ))}
          <motion.div
            className="font-semibold sm:text-xl"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            and more...
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
