import Image from "next/image";
import { motion } from "motion/react";

const platforms = [
  {
    name: "Hyperliquid",
    src: "/images/platforms/hyperliquid-text.png",
  },
  {
    name: "Aster",
    src: "/images/platforms/aster-text.png",
  },
  {
    name: "Lighter",
    src: "/images/platforms/lighter-text.png",
  },
  {
    name: "Backpack",
    src: "/images/platforms/backpack-text.png",
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
              whileHover={{ scale: 1.05 }}
            >
              <Image
                alt={platform.name}
                src={platform.src}
                width={158}
                height={48}
                className="max-h-12 w-full object-contain"
              />
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
