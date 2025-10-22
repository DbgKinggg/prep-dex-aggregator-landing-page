'use client';

import { motion } from "motion/react";

export function CommunitySection() {
  const lines = [
    <>
      <span className="text-white">Tangerine</span> is community first,
    </>,
    <>everyone gets a slice.</>,
    <>
      Experience onchain{" "}
      <span className="text-white">Perp trading</span>
      like never before.
    </>,
  ];

  const containerVariants = {
    hidden: { rotate: 2 },
    visible: {
      rotate: 0,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const easeOut = [0.16, 1, 0.3, 1] as const;

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 32,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <motion.section
      className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <motion.h3
        className="text-5xl text-muted-foreground sm:text-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={containerVariants}
      >
        {lines.map((line, index) => (
          <motion.span
            key={index}
            className="block"
            variants={lineVariants}
          >
            {line}
          </motion.span>
        ))}
      </motion.h3>
    </motion.section>
  );
}
