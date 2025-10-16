'use client';

import Image from "next/image";
import { motion } from "motion/react";

type Step = {
  label: string;
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  reverse?: boolean;
};

const steps: Step[] = [
  {
    label: "Connect",
    title: "All portfolio in one",
    description:
      "Manage all your Perp positions, orders and trading history in one place.",
    bullets: [
      "Unified view",
      "Manage positions, modify orders instantly",
      "Better risk management",
    ],
    imageSrc: "/images/illustrations/illustration-01.avif",
  },
  {
    label: "Simple",
    title: "Simple, but powerful",
    description:
      "Simplified UI, Perp trading has never been easy. Designed for everyone, whether you are newbie or pro.",
    bullets: [
      "Simple/Pro mode",
      "Trade like swapping tokens",
      "Powerful presets",
    ],
    imageSrc: "/images/illustrations/illustration-02.avif",
    reverse: true,
  },
  {
    label: "Learn",
    title: "Tangerine University",
    description:
      "Learn how to trade Perp, from 0 to 1 in no time. Learn Perp trading knowledge here.",
    bullets: [
      "Helpful pro tips",
      "Learn Perp trading from the Pros",
      "Knowledge base",
    ],
    imageSrc: "/images/illustrations/illustration-03.avif",
  },
];

export function HowItWorksSection() {
  return (
    <section className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-bold sm:text-5xl">
          Your Perp trading
          <br />
          starts right here
        </h2>
        <div className="mt-10 flex flex-col space-y-6 md:mt-20 md:space-y-12">
          {steps.map((step) => (
            <motion.article
              key={step.title}
              className={`flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur md:flex-row ${step.reverse ? "md:flex-row-reverse" : ""
                }`}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex flex-col space-y-2 px-6 py-6 md:w-1/2 md:space-y-4 md:px-8 md:py-8">
                <span className="font-semibold text-primary">
                  {step.label}
                </span>
                <h3 className="text-2xl font-bold sm:text-4xl">
                  {step.title}
                </h3>
                <p className="mx-auto max-w-3xl text-lg text-white/70">
                  {step.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70 sm:text-base font-semibold">
                  {step.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="pt-0.5">🍊</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full md:w-1/2 md:self-stretch">
                <Image
                  src={step.imageSrc}
                  alt={step.title}
                  width={480}
                  height={360}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
