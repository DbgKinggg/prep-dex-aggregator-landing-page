import Image from "next/image";

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
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-white">
          All the Perp DEXs you love
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 place-items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {platforms.map((platform) => (
            <Image
              key={platform.name}
              alt={platform.name}
              src={platform.src}
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
          ))}
          <div className="font-semibold sm:text-xl">and more...</div>
        </div>
      </div>
    </section>
  );
}
