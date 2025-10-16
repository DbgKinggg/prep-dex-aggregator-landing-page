import Image from "next/image";

type Step = {
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
};

const steps: Step[] = [
  {
    label: "Connect",
    title: "All portfolio in one",
    description:
      "Manage all your Perp positions, orders and trading history in one place.",
    imageSrc: "/images/cubes.png",
  },
  {
    label: "Simple",
    title: "Simple, but powerful",
    description:
      "Simplified UI, Perp trading has never been easy. Designed for everyone, whether you are newbie or pro.",
    imageSrc: "/images/3d-tangerine.png",
    reverse: true,
  },
  {
    label: "Learn",
    title: "Tangerine University",
    description:
      "Learn how to trade Perp, from 0 to 1 in no time. Learn Perp trading knowledge here.",
    imageSrc: "/images/cubes.png",
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
        <div className="mt-10 flex flex-col space-y-6 md:mt-20 md:space-y-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className={`flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:flex-row md:gap-10 md:p-8 ${
                step.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex flex-col space-y-2 md:w-1/2 md:space-y-4">
                <span className="font-semibold text-primary">
                  {step.label}
                </span>
                <h3 className="text-2xl font-bold sm:text-4xl">
                  {step.title}
                </h3>
                <p className="mx-auto max-w-3xl text-lg font-medium text-white/70 sm:text-xl md:text-xl">
                  {step.description}
                </p>
              </div>
              <Image
                src={step.imageSrc}
                alt={step.title}
                width={350}
                height={350}
                className="w-full max-w-xs md:max-w-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
