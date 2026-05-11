import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import RootProvider from "@/lib/root-provider";

const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
type Props = { children: ReactNode }

export const metadata: Metadata = {
  title: "Bird",
  description: "Bird is a Ledger application for seamless transaction management",
  icons: '/favicon.png'
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" className={"h-full antialiased " + geistSans.variable + " " + geistMono.variable + " font-sans " + publicSans.variable}>
      <body className="min-h-full w-screen bg-foreground text-background relative flex flex-col">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
