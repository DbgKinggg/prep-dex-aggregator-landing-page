import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { mainnet, arbitrum, bsc } from '@reown/appkit/networks';
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks';

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_REOWN_PROJECT_ID is not set');
}

// EVM networks
export const networks = [arbitrum, mainnet, bsc];

// Solana networks
export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [],
});

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }) as any, // Type assertion needed for wagmi storage compatibility
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
