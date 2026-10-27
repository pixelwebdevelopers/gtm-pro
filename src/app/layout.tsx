import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goldtacticalmachine.com"),
  title: "GTM PRO — Trade XAUUSD with Structure | GoldTacticalMachine.com",
  description:
    "Breakout & straddle XAUUSD trading automation with built-in risk management and dynamic basket recovery for MT4 and MT5. Pure mathematical structure, zero emotional trading.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "GTM PRO — Trade XAUUSD with Structure | GoldTacticalMachine.com",
    description:
      "Automated XAUUSD trading execution with adaptive grid recovery, server-verified license binding, and equity safeguards.",
    url: "https://goldtacticalmachine.com",
    siteName: "GoldTacticalMachine.com",
    images: [
      {
        url: "/logo.png",
        width: 440,
        height: 145,
        alt: "GTM PRO Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTM PRO — Trade XAUUSD with Structure",
    description: "Automated breakout-based XAUUSD trading automation with built-in risk control.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="antialiased">
        {children}
        <Script
          src="https://cdn.zanderio.ai/widget/loader.js"
          data-id="wdg_dC5nmde4v6OZj4ksjSHE2qeC"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
