import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from "react";

type StarBorderProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T;
  color?: string;
  speed?: CSSProperties["animationDuration"];
  thickness?: number;
};

export function StarBorder<T extends ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps<T>) {
  const Component = (as || "button") as ElementType;

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...(style as CSSProperties),
      }}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      <div
        className="absolute bottom-[-11px] right-[-250%] z-0 h-[50%] w-[300%] rounded-full opacity-70 animate-star-movement-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute left-[-250%] top-[-10px] z-0 h-[50%] w-[300%] rounded-full opacity-70 animate-star-movement-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-[1] rounded-[20px] border border-white/10 bg-gradient-to-b from-black/80 via-black/60 to-gray-900/80 px-[26px] py-[16px] text-center text-sm font-semibold text-white sm:text-base">
        {children}
      </div>
    </Component>
  );
}

StarBorder.displayName = "StarBorder";
