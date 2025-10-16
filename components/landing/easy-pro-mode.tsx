'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ButtonGroup } from "@/components/ui/button-group";

const modes = {
  simple: "Simple",
  pro: "Pro",
} as const;

type ModeKey = keyof typeof modes;

export function EasyProMode() {
  const [mode, setMode] = useState<ModeKey>("simple");

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden border border-white/10 bg-white/10 px-6 py-8 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.25),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black via-black/70 to-transparent opacity-60" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black via-black/70 to-transparent opacity-60" />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center">
        <ButtonGroup className="relative w-full max-w-xs items-center justify-center rounded-full border border-white/15 bg-black/40 p-2 sm:max-w-sm">
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="pointer-events-none absolute inset-0 rounded-full"
          />
          {(Object.keys(modes) as ModeKey[]).map((key) => {
            const isActive = mode === key;
            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className="relative flex-1 cursor-pointer select-none rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/60 transition-colors sm:px-8"
                whileHover={{ scale: isActive ? 1.02 : 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="mode-highlight"
                    className="absolute inset-0 rounded-full bg-primary/35 shadow-[0_20px_60px_rgba(249,115,22,0.35)]"
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  />
                )}
                <span className="relative z-10">{modes[key]}</span>
              </motion.button>
            );
          })}
        </ButtonGroup>
      </div>
    </div>
  );
}
