"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Free Access", href: "/free-access" },
    { label: "Downloads", href: "/#download" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="border-t border-white/10 px-5 py-12 text-center sm:px-8 bg-[#050505]">
      <div className="mx-auto max-w-3xl">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="inline-block">
            <div style={{ position: "relative" }} className="relative h-10 w-36">
              <Image
                src="/logo.png"
                alt="GTM PRO Logo"
                fill
                sizes="144px"
                className="object-contain object-center"
              />
            </div>
          </Link>
        </div>

        {/* Quick Links Row */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-zinc-400">
          {quickLinks.map((item, idx) => (
            <React.Fragment key={item.label}>
              <Link
                href={item.href}
                className="hover:text-[#E8C97A] transition-colors"
              >
                {item.label}
              </Link>
              {idx < quickLinks.length - 1 && (
                <span className="text-zinc-600">·</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Risk Disclaimer */}
        <p className="text-[11px] leading-relaxed text-zinc-500 max-w-2xl mx-auto">
          <strong className="text-zinc-400">Risk Warning:</strong> Trading gold (XAUUSD) carries a high level of risk and may not be suitable for every investor. Like any automated trading system, GTM PRO can lose money, including your full capital. Past performance and backtest results do not guarantee future returns. Only trade with money you can afford to lose. GTM PRO provides trading software only. We do not manage client funds or give financial or investment advice.
        </p>

        {/* Telegram icon & Support Email */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://t.me/Ryan_Mitchell_GTMPRO"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Telegram Admin (@Ryan_Mitchell_GTMPRO)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2L2 9.5l7 3.5 3.5 7L21.5 2z" />
              <path d="M9 13l5.5-5.5" />
            </svg>
          </a>

          <a
            href="mailto:support@goldtacticalmachine.com"
            className="text-xs text-zinc-400 hover:text-[#E8C97A] font-mono transition-colors"
          >
            support@goldtacticalmachine.com
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-[11px] text-zinc-500">
          © 2026 GTM PRO · GoldTacticalMachine.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
