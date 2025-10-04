import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tangerine - Perp DEX Aggregator',
    short_name: 'Tangerine',
    description: 'The 1inch for Perp Trading. One interface for all perpetual DEXs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ff7c3a',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
