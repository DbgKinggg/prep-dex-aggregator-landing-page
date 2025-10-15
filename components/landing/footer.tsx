import type { ComponentProps, ComponentType } from "react";

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
      <div className="text-center text-7xl text-white sm:text-[200px] xl:text-[300px]">
        Tangerine
      </div>
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center gap-x-6 md:order-2">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-black hover:text-black/60"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-black md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Tangerine, Inc. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
