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
    <section className="min-h-screen px-4 py-10 sm:px-6 sm:py-20 sm:mx-20">
      <h2 className="text-3xl font-bold sm:text-5xl">
        Your Perp trading
        <br />
        starts right here
      </h2>
      <div className="mt-10 flex flex-col space-y-1 md:mt-20 sm:space-y-5">
        {steps.map((step) => (
          <div
            key={step.title}
            className={`flex flex-col items-center justify-center gap-6 p-4 sm:mx-20 sm:flex-row sm:gap-10 sm:p-6 ${
              step.reverse ? "sm:flex-row-reverse" : ""
            }`}
          >
            <div className="flex flex-col space-y-2 sm:w-1/2 sm:space-y-4">
              <span className="font-semibold text-primary">{step.label}</span>
              <h3 className="text-2xl font-bold sm:text-4xl">{step.title}</h3>
              <p className="mx-auto max-w-3xl text-lg font-medium text-white/70 sm:text-xl md:text-xl">
                {step.description}
              </p>
            </div>
            <Image
              src={step.imageSrc}
              alt={step.title}
              width={350}
              height={350}
              className="w-full max-w-xs sm:max-w-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
