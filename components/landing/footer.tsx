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
        <div className="mx-auto flex max-w-7xl items-center justify-between flex-row gap-4 px-6 py-5 text-black lg:px-4">
          <div className="flex sm:w-full items-center justify-center gap-3 text-sm font-medium text-black/80 sm:w-auto sm:justify-start">
            <span className="text-base text-black">
              Tangerine&nbsp;©&nbsp;{new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-x-6">
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
          </div>
        </div>
      </footer>
    </>
  );
}
