import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { headers } from "next/headers";
import "./globals.css";
import { ReownProvider } from "@/providers/ReownProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Tangerine - Perp DEX Aggregator",
  description: "Making perp trading as simple as swapping tokens.",
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
      </body>
    </html>
  );
}
