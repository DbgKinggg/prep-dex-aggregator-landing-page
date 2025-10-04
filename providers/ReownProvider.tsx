'use client';

import { wagmiAdapter, solanaWeb3JsAdapter, projectId } from '@/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { arbitrum, mainnet, bsc, solana } from '@reown/appkit/networks';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

const queryClient = new QueryClient();

const metadata = {
  name: 'Tangerine',
  description: 'The 1inch for Perp Trading',
  url: 'https://tangerine.finance', // Update with your actual URL
  icons: ['https://tangerine.finance/logo-orange.png'], // Update with your actual icon URL
};

// Create the AppKit modal with multi-chain support (EVM + Solana)
if (projectId) {
  createAppKit({
    adapters: [wagmiAdapter, solanaWeb3JsAdapter],
    projectId,
    networks: [arbitrum, mainnet, bsc, solana],
    defaultNetwork: arbitrum,
    metadata,
    features: {
      analytics: true,
    },
  });
}

export function ReownProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
