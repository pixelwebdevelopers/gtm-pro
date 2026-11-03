import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTM PRO v1.0 — 50K Preset Files | GoldTacticalMachine.com",
  description:
    "Ready-to-use settings for 50,000 USD standard and 50,000 USC cent accounts on MetaTrader 5 and MetaTrader 4. Tested on real market conditions.",
};

export default function DownloadSetFilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

