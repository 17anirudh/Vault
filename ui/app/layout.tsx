import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import RootProvider from "@/lib/root-provider";
import { Background } from "@/components/bg";
import { useMutation } from "@tanstack/react-query";

const instrumentSans = Instrument_Sans({subsets:['latin'],variable:'--font-sans'});
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vault",
  description: "Your reliable and smooth transaction ledger",
  icons: [
    {
      url: '/favicon.png',
      type: 'image/png',
      sizes: '512x512'
    }
  ]
};

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`antialiased ${geistSans.variable} ${geistMono.variable} font-sans ${instrumentSans.variable}`}>
      <body className="min-h-screen w-screen overflow-x-hidden relative flex flex-col gap-4 bg-foreground text-background">
        <RootProvider>
          <Background />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}