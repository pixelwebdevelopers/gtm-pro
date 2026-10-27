"use client";

import React from "react";

export default function LivePerformanceSection() {
  return (
    <section id="live-results" className="relative border-y border-[#C9A84C]/15 bg-[#C9A84C]/[0.04] px-5 py-20 sm:px-8">
      <div id="performance" className="absolute -top-24 pointer-events-none" />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-black tracking-wider text-[#E8C97A] uppercase">
            Live Results
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl text-white">
            Real Results. Real Users.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            See live account updates, user feedback, and trading results shared by the GTM PRO community on Telegram.
          </p>
        </div>

        <a
          href="https://t.me/abangrimba"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-2xl bg-gradient-to-b from-[#7FD1F7] to-[#0E96D6] px-7 py-4 text-sm font-black text-white shadow-2xl shadow-[#0E96D6]/20 transition-transform hover:brightness-110 active:scale-[0.98] md:self-auto"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21.5 2L2 9.5l7 3.5 3.5 7L21.5 2z" />
            <path d="M9 13l5.5-5.5" />
          </svg>
          <span>View Live Results</span>
        </a>
      </div>
    </section>
  );
}
