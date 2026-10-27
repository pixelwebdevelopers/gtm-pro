"use client";

import React from "react";

export default function StatsBar() {
  return (
    <section id="stats" className="border-y border-[#C9A84C]/15 bg-[#C9A84C]/[0.04] px-5 py-6 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/[0.06] px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8C97A] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E8C97A]" />
          </span>
          <span className="text-[11px] font-black tracking-wider text-[#E8C97A] uppercase">
            Live Activity
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:w-auto sm:max-w-none sm:gap-8">
          <div className="text-center">
            <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">17</p>
            <p className="mt-0.5 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
              License Keys Generated Today
            </p>
          </div>
          <span className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">2,037</p>
            <p className="mt-0.5 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
              EAs Running Today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
