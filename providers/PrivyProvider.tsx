'use client';

import { useMemo } from 'react';
import { PrivyProvider as Privy } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from '@privy-io/wagmi';
import { arbitrum } from 'viem/chains';
import { http } from 'wagmi';
import { createConfig } from 'wagmi';

export function PrivyProvider({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    throw new Error('NEXT_PUBLIC_PRIVY_APP_ID is not set');
  }

  // Memoize QueryClient to prevent recreation on every render
  const queryClient = useMemo(() => new QueryClient(), []);

  // Memoize wagmiConfig to prevent recreation on every render
  const wagmiConfig = useMemo(
    () =>
      createConfig({
        chains: [arbitrum],
        transports: {
          [arbitrum.id]: http(),
        },
      }),
    []
  );

  return (
    <Privy
      appId={appId}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#ff7c3a', // Tangerine color
          logo: undefined,
        },
        loginMethods: ['wallet'],
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </Privy>
  );
}
