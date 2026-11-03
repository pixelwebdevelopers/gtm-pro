import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTM PRO Help Center — FAQ, Setup, Licensing & Troubleshooting",
  description:
    "Find answers to all frequently asked questions about GTM PRO setup, licensing, broker registration, risk management, and troubleshooting.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

