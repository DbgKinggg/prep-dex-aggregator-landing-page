import type { ComponentProps, ComponentType } from "react";
import { motion } from "motion/react";

type SocialIcon = ComponentType<ComponentProps<"svg">>;

export type SocialLink = {
  name: string;
  href: string;
  icon: SocialIcon;
};

type LandingFooterProps = {
  links: SocialLink[];
};

export function LandingFooter({ links }: LandingFooterProps) {
  return (
    <>
      <motion.div
        className="text-center text-7xl text-white sm:text-[200px] xl:text-[300px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Tangerine
      </motion.div>
      <footer className="bg-white">
        <motion.div
          className="mx-auto flex max-w-7xl flex-row items-center justify-between gap-4 px-6 py-5 text-black lg:px-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="flex w-full items-center justify-center gap-3 text-sm font-medium text-black/80 sm:w-auto sm:justify-start">
            <motion.span
              className="text-base text-black"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Tangerine&nbsp;©&nbsp;{new Date().getFullYear()}
            </motion.span>
          </div>
          <motion.div
            className="flex items-center gap-x-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-black hover:text-black/60"
                target="_blank"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </footer>
    </>
  );
}
