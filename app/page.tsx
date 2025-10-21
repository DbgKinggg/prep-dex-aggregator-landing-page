'use client';

import { useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

import { WaitlistDialog } from '@/components/WaitlistDialog';
import { CommunitySection } from '@/components/landing/community-section';
import { EarlyAccessSection } from '@/components/landing/early-access-section';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { LandingFooter, type SocialLink } from '@/components/landing/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { HowItWorksSection } from '@/components/landing/how-it-works';
import { LandingNavbar } from '@/components/landing/navbar';
import { PlatformShowcase } from '@/components/landing/platform-showcase';

const socialLinks: SocialLink[] = [
  {
    name: 'X',
    href: 'https://x.com/Tangerine_DEX',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const walletAddress = address || '';

  const handleJoinWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <LandingNavbar
        walletAddress={walletAddress}
        onConnect={() => open()}
      />
      <HeroSection onJoinWaitlist={handleJoinWaitlist} />
      <PlatformShowcase />
      <HowItWorksSection />
      <FeatureGrid />
      <CommunitySection />
      <EarlyAccessSection onJoinWaitlist={handleJoinWaitlist} />
      <LandingFooter links={socialLinks} />
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
