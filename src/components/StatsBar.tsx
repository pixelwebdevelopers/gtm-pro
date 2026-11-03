"use client";

import React, { useState, useEffect } from "react";
import { defaultStats, StatsSettings } from "@/lib/siteSettingsTypes";

export default function StatsBar() {
  const [stats, setStats] = useState<StatsSettings>(defaultStats);

  useEffect(() => {
    // Fetch live numbers from API (backed by MongoDB)
    fetch("/api/live-stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setStats((prev) => ({
            ...prev,
            activatedToday:
              typeof data.activatedToday === "number"
                ? data.activatedToday
                : prev.activatedToday,
            runningNow:
              typeof data.runningNow === "number"
                ? data.runningNow
                : prev.runningNow,
            liveBadgeText: data.liveBadgeText || prev.liveBadgeText,
            activatedLabel: data.activatedLabel || prev.activatedLabel,
            runningLabel: data.runningLabel || prev.runningLabel,
          }));
        }
      })
      .catch(() => {
        // Fallback to defaultStats
      });
  }, []);

  return (
    <section
      id="stats"
      className="border-y border-[#C9A84C]/15 bg-[#C9A84C]/[0.04] px-5 py-6 sm:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div
          title="Live activity verified from licensing server"
          className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/[0.06] px-3.5 py-1 text-left select-none cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,.9)]" />
          </span>
          <span className="text-[11px] font-black tracking-wider text-[#E8C97A] uppercase">
            {stats.liveBadgeText}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:w-auto sm:max-w-none sm:gap-8">
          <div className="text-center">
            <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {stats.activatedToday.toLocaleString()}
            </p>
            <p className="mt-0.5 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
              {stats.activatedLabel}
            </p>
          </div>

          <span className="h-8 w-px bg-white/10" />

          <div className="text-center">
            <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {stats.runningNow.toLocaleString()}
            </p>
            <p className="mt-0.5 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
              {stats.runningLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
