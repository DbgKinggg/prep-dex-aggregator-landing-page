import Image from "next/image";

import { Button } from "@/components/ui/button";

type LandingNavbarProps = {
  isMobile: boolean;
  walletAddress?: string;
  onConnect: () => void;
};

export function LandingNavbar({
  isMobile,
  walletAddress,
  onConnect,
}: LandingNavbarProps) {
  const displayLabel = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : "Connect Wallet";

  return (
    <nav className="relative z-50 w-full px-4 py-6 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/3d-logo-with-text-orange.png"
            alt="Tangerine"
            width={isMobile ? 100 : 140}
            height={isMobile ? 21 : 30}
            className="h-6 w-auto sm:h-7"
            priority
          />
          <h1 className="sr-only">Tangerine</h1>
        </div>
        <Button
          onClick={onConnect}
          variant="outline"
          className="cursor-pointer rounded-full border-white/20 bg-white/10 px-4 py-2 text-xs text-white transition-all hover:bg-white/20 sm:px-6 sm:py-2.5"
        >
          {displayLabel}
        </Button>
      </div>
    </nav>
  );
}
