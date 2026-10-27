"use client";

import React from "react";

export default function FeaturesSection() {
  const benefits = [
    {
      title: "Automated Trade Execution",
      desc: "EA places BuyStop above and SellStop below market simultaneously. The first side that triggers wins; opposite pending order is cancelled instantly.",
    },
    {
      title: "Basket Management System",
      desc: "When price moves against the winning side, the EA adds positions at adaptive grid distances (PipStep1 / PipStep2) with a controlled lot multiplier. Designed for XAUUSD volatility.",
    },
    {
      title: "MT4 & MT5 Compatible",
      desc: "Native compiled builds available for both desktop platforms (.ex4 for MT4 and .ex5 for MT5).",
    },
    {
      title: "VPS Friendly",
      desc: "Runs smoothly 24/5 on low-latency Windows VPS (<10ms). Recovers seamlessly after connection drops.",
    },
    {
      title: "Daily Profit Target Option",
      desc: "Automatically locks in gains and stops new trading cycles once the configured daily profit target is reached.",
    },
    {
      title: "Built-In Risk Management Features",
      desc: "Hard equity drawdown kill-switch protects against runaway market events. Closes all open positions unconditionally.",
    },
    {
      title: "Optimized for Gold Trading",
      desc: "Algorithmic logic and grid recovery spacing tuned specifically for XAUUSD liquidity sweeps and market sessions.",
    },
    {
      title: "Suitable for Cent & Standard Accounts",
      desc: "Runs with as low as 10,000 USC ($100), with 50,000 USC ($500) recommended for optimal margin comfort.",
    },
  ];

  return (
    <section id="features" className="border-y border-white/10 bg-zinc-950 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-black tracking-wider text-[#E8C97A] uppercase">
            Quick Benefits
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl text-white">
            Why Traders Choose GTM PRO
          </h2>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-[#C9A84C]/35 hover:bg-[#C9A84C]/[0.06]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#E8C97A] ring-1 ring-[#C9A84C]/25 mt-0.5 font-bold text-xs">
                ✓
              </span>
              <div>
                <h3 className="text-base font-black text-white">{b.title}</h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
