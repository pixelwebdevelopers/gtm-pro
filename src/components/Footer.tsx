"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 text-center sm:px-8 bg-[#050505]">
      <div className="mx-auto max-w-3xl">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <div
            style={{ position: "relative" }}
            className="relative h-10 w-36"
          >
            <Image
              src="/logo.png"
              alt="GTM PRO Logo"
              fill
              sizes="144px"
              className="object-contain object-center"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] leading-relaxed text-zinc-500">
          Trading XAUUSD involves substantial risk. Past performance does not guarantee future results.
          The EA, like any automated algorithmic system, can lose money. Use only capital you can afford to lose.
          GTM PRO does not provide financial or investment advice.
        </p>

        {/* Telegram icon */}
        <div className="mt-6 flex items-center justify-center">
          <a
            href="https://t.me/abangrimba"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Telegram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2L2 9.5l7 3.5 3.5 7L21.5 2z" />
              <path d="M9 13l5.5-5.5" />
            </svg>
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
