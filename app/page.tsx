'use client';

import { useState } from 'react';
import Image from 'next/image';
import { WaitlistDialog } from '@/components/WaitlistDialog';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const isMobile = useIsMobile();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const walletAddress = address || '';

  const navigation = [
    {
      name: 'X',
      href: '#',
      icon: (props: React.ComponentProps<"svg">) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="relative z-50 w-full px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/3d-logo-with-text-orange.png"
              alt="Tangerine"
              width={isMobile ? 100 : 140}
              height={isMobile ? 21 : 30}
              className="h-6 sm:h-7 w-auto"
            />
            <h1 className="sr-only">TANGERINE</h1>
          </div>

          {/* Connect Wallet Button */}
          <Button
            onClick={() => open()}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer text-xs sm:text-base rounded-full px-4 sm:px-6 py-2 sm:py-2.5 backdrop-blur-sm transition-all"
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 sm:px-6 text-center mx-2 md:mx-4 rounded-4xl"
        style={{
          background: "radial-gradient(200% 184% at 50% 5%,var(--token-0d9b717a-2449-4354-bde9-4e406668174b, #000000) 31.306306306306297%,var(--token-bcb4b7ca-f1d2-4fcd-a692-7f500cce537b, #f97316) 47.50197072072073%,var(--token-e0feb305-cb1f-4bbf-ad55-3fa715937606, #fa9d5b) 58.40019707207207%,rgb(255,255,255) 85.76506193693693%)"
        }}
      >
        <div className="max-w-5xl mx-auto space-y-2 sm:space-y-4">
          {/* Main Headline */}
          <h2 className="text-5xl sm:text-7xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Perp trading
            <br />
            made easy
          </h2>

          {/* Secondary Tagline */}
          <p className="text-lg sm:text-xl md:text-xl text-white/70 sm:max-w-xl max-w-3xl mx-auto font-medium">
            Trade and manage Perp Trading across Hyperliquid, Aster, Lighter and more Perp DEXs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8">
            {/* Join Early Access Button */}
            <button
              onClick={() => setWaitlistOpen(true)}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-black bg-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              Join Early Access
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            {/* Launch App Button (Disabled) */}
            <div className="relative">
              <button
                disabled
                className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-white/40 bg-white/10 border border-white/20 rounded-full cursor-not-allowed backdrop-blur-sm"
              >
                Launch App
              </button>
              {/* Coming Soon Tag */}
              <span className="absolute -top-2 -right-2 px-3 py-1 text-xs font-bold text-black bg-orange-400 rounded-full shadow-lg">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-white">Trusted by the world’s most innovative teams</h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              alt="Transistor"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />

            <img
              alt="Reform"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />

            <img
              alt="Tuple"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />

            <img
              alt="SavvyCal"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />

            <img
              alt="Statamic"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
        </div>
      </div>
      <div className="min-h-screen px-4 sm:px-6 py-10 sm:py-20 sm:mx-20">
        <h2 className="font-bold text-3xl sm:text-5xl">
          Your Perp trading<br />starts right here
        </h2>
        <div className="mt-10 md:mt-20 flex flex-col space-y-1 sm:space-y-5">
          <div className="p-4 sm:p-6 sm:mx-20 flex flex-col sm:flex-row items-center justify-center">
            <div className="flex space-y-2 sm:space-y-4 flex-col sm:w-1/2">
              <label className='text-primary font-semibold'>Connect</label>
              <h3 className="font-bold text-2xl sm:text-4xl">All portfolio in one</h3>
              <p className="text-lg sm:text-xl md:text-xl text-white/70 max-w-3xl mx-auto font-medium">
                Manage all your Perp positions, orders and trading history in one place.
              </p>
            </div>
            <Image
              src="/images/cubes.png"
              alt='Cubes'
              width={350}
              height={350}
            />
          </div>
          <div className="p-4 sm:p-6 sm:mx-20 flex flex-col sm:flex-row items-center justify-center">
            <Image
              src="/images/cubes.png"
              alt='Cubes'
              width={350}
              height={350}
            />
            <div className="flex space-y-2 sm:space-y-4 flex-col sm:w-1/2">
              <label className='text-primary font-semibold'>Connect</label>
              <h3 className="font-bold text-2xl sm:text-4xl">All portfolio in one</h3>
              <p className="text-lg sm:text-xl md:text-xl text-white/70 max-w-3xl mx-auto font-medium">
                Manage all your Perp positions, orders and trading history in one place.
              </p>
            </div>
          </div>
          <div className="p-4 sm:p-6 sm:mx-20 flex flex-col sm:flex-row items-center justify-center">
            <div className="flex space-y-2 sm:space-y-4 flex-col sm:w-1/2">
              <label className='text-primary font-semibold'>Connect</label>
              <h3 className="font-bold text-2xl sm:text-4xl">All portfolio in one</h3>
              <p className="text-lg sm:text-xl md:text-xl text-white/70 max-w-3xl mx-auto font-medium">
                Manage all your Perp positions, orders and trading history in one place.
              </p>
            </div>
            <Image
              src="/images/cubes.png"
              alt='Cubes'
              width={350}
              height={350}
            />
          </div>
        </div>
      </div>
      <div className="py-24 sm:py-32 mt-10 sm:mt-20">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">Trade faster</h2>
          <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            But why choose use?
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="flex p-px lg:col-span-4">
              <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-releases.png"
                  className="h-80 object-cover object-left dark:hidden"
                />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-02-releases.png"
                  className="h-80 object-cover object-left not-dark:hidden"
                />
                <div className="p-10">
                  <h3 className="text-sm/4 font-semibold text-gray-500 dark:text-gray-400">Releases</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">Push to deploy</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla efficitur, maximus
                    egestas sem pellentesque.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-px lg:col-span-2">
              <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:rounded-tr-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-integrations.png"
                  className="h-80 object-cover dark:hidden"
                />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-02-integrations.png"
                  className="h-80 object-cover not-dark:hidden"
                />
                <div className="p-10">
                  <h3 className="text-sm/4 font-semibold text-gray-500 dark:text-gray-400">Integrations</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                    Connect your favorite tools
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                    Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus massa.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-px lg:col-span-2">
              <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:rounded-bl-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-security.png"
                  className="h-80 object-cover dark:hidden"
                />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-02-security.png"
                  className="h-80 object-cover not-dark:hidden"
                />
                <div className="p-10">
                  <h3 className="text-sm/4 font-semibold text-gray-500 dark:text-gray-400">Security</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                    Advanced access control
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-px lg:col-span-4">
              <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-performance.png"
                  className="h-80 object-cover object-left dark:hidden"
                />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-02-performance.png"
                  className="h-80 object-cover object-left not-dark:hidden"
                />
                <div className="p-10">
                  <h3 className="text-sm/4 font-semibold text-gray-500 dark:text-gray-400">Performance</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                    Lightning-fast builds
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                    Sed congue eros non finibus molestie. Vestibulum euismod augue vel commodo vulputate. Maecenas at
                    augue sed elit dictum vulputate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 py-10 sm:py-20 sm:mx-20">
        <h3 className="text-6xl sm:text-8xl text-muted-foreground"><span className="text-white">Tangerine</span> is community first, everyone gets a slice. Experience onchain <span className="text-white">Perp trading</span> like never before.</h3>
      </div>
      <div>
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-800 px-6 py-24 text-center after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl sm:px-16 after:sm:rounded-3xl">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              Early access coming soon
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
              Join now, get rewarded. We will let you know why we are out.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {' '}
                Join Early Access
              </a>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
            >
              <circle r={512} cx={512} cy={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="text-7xl sm:text-[200px] xl:text-[300px] text-center text-white">Tangerine</div>
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center gap-x-6 md:order-2">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-black hover:text-black/60">
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-sm/6 text-black md:order-1 md:mt-0">
            &copy; 2025 Tangerine, Inc. All rights reserved.
          </p>
        </div>
      </footer>
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
