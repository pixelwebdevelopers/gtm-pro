"use client";

import React from "react";

export default function FeaturesSection() {
  const benefits = [
    {
      title: "Hands-Free Straddle Entry",
      desc: "A Buy Stop and Sell Stop are placed around the price at the start of every cycle. The market picks the direction, and the opposite order is removed instantly.",
    },
    {
      title: "Smart Basket Management",
      desc: "If price pulls back, GTM PRO adds measured layers at fixed spacing, then closes every position together at one shared take profit.",
    },
    {
      title: "Free Backtest & Demo",
      desc: "Test GTM PRO in the MT5 Strategy Tester or on a demo account for free. See the drawdown and every trade before you go live.",
    },
    {
      title: "Smart News Filter",
      desc: "New cycles pause automatically around high-impact USD news like NFP, CPI and FOMC, while open baskets are still managed to TP.",
    },
    {
      title: "Max Basket Loss Protection",
      desc: "Set your own loss limit per basket. If it's reached, GTM PRO closes all its positions and stops new cycles to protect your account.",
    },
    {
      title: "Daily Profit Target",
      desc: "Set a daily goal. Once it's reached, GTM PRO stops opening new cycles until the next trading day.",
    },
    {
      title: "Full On-Chart Control",
      desc: "Clear live status on your chart, plus one-click STOP / START and CLOSE ALL buttons. You stay in control at all times.",
    },
    {
      title: "Cent & Standard Accounts",
      desc: "Works on both account types. Start small on a cent account, or scale up on standard with the right capital.",
    },
    {
      title: "VPS-Ready, 24/5",
      desc: "Runs smoothly around the clock on a Windows VPS. For best execution, use a VPS close to your broker's server, ideally under 10 ms.",
    },
    {
      title: "Built for Gold",
      desc: "Entry distance, layer spacing and take profit are tuned specifically for XAUUSD volatility and gold market sessions.",
    },
  ];

  return (
    <section id="features" className="border-y border-white/10 bg-zinc-950 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black tracking-wider text-[#E8C97A] uppercase">
            WHY GTM PRO
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl text-white">
            Why Traders Choose GTM PRO
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-300">
            Everything you need to trade gold automatically — with the controls to manage your risk.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 transition-all hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/[0.06] hover:-translate-y-0.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-zinc-950 mt-0.5 font-black text-xs shadow-md shadow-[#C9A84C]/20">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-400 font-medium">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
