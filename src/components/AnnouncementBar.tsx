"use client";

import React from "react";

export default function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-[#C9A84C]/25 bg-gradient-to-r from-[#141208] via-[#1c1809] to-[#141208] px-3.5 py-2 text-center text-xs text-zinc-300">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-1.5 flex-wrap">
        <span className="shrink-0 text-base leading-none">🎁</span>
        <span className="font-semibold text-white">New Client Offer</span>
        <span className="text-zinc-500 hidden sm:inline">—</span>
        <span>
          <strong className="text-[#E8C97A] font-bold">FREE until Nov 30, 2026:</strong> full access, all features. Register with{" "}
          <a
            href="https://vigco.co/la-com-inv/9XhUYs8x"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#E8C97A] underline decoration-[#E8C97A]/40 underline-offset-2 hover:text-white transition-colors"
          >
            Vantage Markets
          </a>{" "}
          or{" "}
          <a
            href="https://one.toexness.com/a/53of1lwuw5"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#E8C97A] underline decoration-[#E8C97A]/40 underline-offset-2 hover:text-white transition-colors"
          >
            Exness
          </a>{" "}
          via our IB link. No payment needed.
        </span>
      </div>
    </div>
  );
}

