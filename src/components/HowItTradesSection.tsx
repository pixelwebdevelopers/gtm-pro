"use client";

import React from "react";
import NextImage from "next/image";

export default function HowItTradesSection() {
  const fiveSteps = [
    {
      num: "01",
      title: "Sets the Trap",
      desc: "At the start of every cycle, GTM PRO places a Buy Stop above and a Sell Stop below the current gold price. No guessing which way the market will go.",
    },
    {
      num: "02",
      title: "Market Picks the Direction",
      desc: "Whichever order the price hits first becomes the active trade. The opposite order is cancelled instantly.",
    },
    {
      num: "03",
      title: "Manages the Pullback",
      desc: "If price moves against the trade, GTM PRO adds measured layers at fixed spacing and controlled lot steps, always by rules, never by emotion.",
    },
    {
      num: "04",
      title: "Closes at One Target",
      desc: "All positions share one basket take profit. When price reaches it, every position closes together in profit.",
    },
    {
      num: "05",
      title: "Guards & Resets",
      desc: "News filter, session pause and your optional loss limit stay on guard. Once the basket closes, a fresh cycle begins automatically.",
    },
  ];

  return (
    <section id="how-it-works" className="relative px-3.5 py-24 sm:px-8 bg-[#050505] overflow-hidden">
      {/* Anchor alias for backwards compatibility */}
      <div id="how-it-trades" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full bg-[#C9A84C]/10 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center px-1.5 sm:px-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/35 bg-[#C9A84C]/10 px-4 py-1.5 text-xs font-black tracking-widest text-[#E8C97A] uppercase shadow-md shadow-[#C9A84C]/10">
            <span className="h-2 w-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
            The <span className="gold-text">GTM PRO Cycle</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-300 font-normal">
            Most traders don&apos;t lose because of a bad strategy. They lose in the moment between seeing a move and reacting to it — hesitation, fear, greed. GTM PRO removes that moment completely. It follows the same five-step cycle on every trade: no prediction, no emotion, no second-guessing. You choose the settings. The system follows them, every single time.
          </p>
        </div>

        {/* The 5-Step System Cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {fiveSteps.map((st) => (
            <div
              key={st.num}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-[#C9A84C]/45 hover:bg-[#C9A84C]/[0.06] hover:-translate-y-1"
            >
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-xs font-black text-zinc-950 shadow-md shadow-[#C9A84C]/20">
                  {st.num}
                </span>
                <h3 className="mt-4 text-base font-bold text-white group-hover:text-[#E8C97A] transition-colors">
                  {st.num} · {st.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 font-medium">
                  {st.desc}
                </p>
              </div>

              <a
                href="#features"
                className="mt-5 pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-semibold text-[#E8C97A] hover:text-white transition-colors cursor-pointer"
              >
                <span>Automated step</span>
                <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* The Demo Video / GIF Display */}
        <div className="mt-16 sm:mt-20">
          <div className="relative mx-auto max-w-3xl">
            {/* Ambient Gold Aura behind container */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] bg-[#C9A84C]/20 blur-3xl pointer-events-none" />

            {/* Premium Glass Terminal Container */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/20 bg-zinc-950/90 shadow-2xl shadow-black backdrop-blur-2xl w-full mx-auto">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-3 sm:px-5 py-2.5 sm:py-3.5 bg-black/60">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 sm:ml-3 text-[11px] sm:text-xs font-mono font-semibold text-zinc-300 sm:text-zinc-400 truncate max-w-[190px] sm:max-w-none">
                    XAUUSD · GTM PRO Cycle
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>REAL MT5 EXECUTION</span>
                  </span>
                </div>
              </div>

              {/* Animated GIF Body */}
              <div className="p-1 sm:p-5 flex items-center justify-center bg-black/80">
                <div className="relative w-full max-w-full sm:max-w-[460px] md:max-w-[480px] lg:max-w-[500px] overflow-hidden rounded-lg sm:rounded-xl border border-white/[0.08] shadow-inner bg-black">
                  <NextImage
                    src="/chart.gif"
                    alt="GTM PRO Live MT5 Execution Recording"
                    width={1000}
                    height={1000}
                    unoptimized
                    className="w-full h-auto max-h-[380px] sm:max-h-[440px] md:max-h-[470px] object-contain block mx-auto"
                    priority
                  />
                </div>
              </div>

              {/* Bottom Feature Strip (4 items) */}
              <div className="border-t border-white/10 bg-black/70 px-5 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div>
                    <span className="block text-xs font-bold text-white">Zero Hesitation</span>
                    <span className="text-[10px] text-zinc-400">Executes instantly by fixed rules</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#E8C97A]">Controlled Layers</span>
                    <span className="text-[10px] text-zinc-400">Fixed spacing &amp; lot steps</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">One Basket TP</span>
                    <span className="text-[10px] text-zinc-400">All positions close together</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#E8C97A]">MT4 &amp; MT5</span>
                    <span className="text-[10px] text-zinc-400">Full platform support</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-zinc-400">
              Real MT5 recording of GTM PRO trading XAUUSD: entry, layer management and basket take-profit exit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
