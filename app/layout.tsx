import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { headers } from "next/headers";
import "./globals.css";
import { ReownProvider } from "@/providers/ReownProvider";
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Tangerine - The Perp Dex Aggregator",
  description: "Perp DEX Aggregator - One interface for all perpetual DEXs.",
  keywords: ["perp trading", "perpetual futures", "DEX aggregator", "crypto trading", "DeFi", "derivatives", "Arbitrum", "Ethereum"],
  authors: [{ name: "Tangerine" }],
  creator: "Tangerine",
  publisher: "Tangerine",
  metadataBase: new URL('https://tangerine.exchange'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Tangerine - The Perp Dex Aggregator",
    description: "One interface for all perpetual DEXs. Turn market inefficiencies into profit opportunities.",
    url: 'https://tangerine.exchange',
    siteName: 'Tangerine',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tangerine - The Perp DEX Aggregator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tangerine - The Perp DEX Aggregator",
    description: "One interface for all perpetual DEXs. ",
    images: ['/og-image.png'],
    creator: '@Tangerine_DEX',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get('cookie');

  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased font-sans">
        <ReownProvider cookies={cookies}>
          {children}
        </ReownProvider>
        <Toaster theme="dark" richColors closeButton position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
