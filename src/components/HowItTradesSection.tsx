"use client";

import React from "react";

export default function HowItTradesSection() {
  const fiveSteps = [
    {
      num: "01",
      title: "Watches Gold Structure",
      desc: "Continuously tracks XAUUSD equilibrium and market volatility across session opens, scanning for valid liquidity conditions 24/5.",
    },
    {
      num: "02",
      title: "Waits for Valid Setup",
      desc: "Eliminates premature entries. Waits patiently for the exact mathematical breakout criteria it was built to identify.",
    },
    {
      num: "03",
      title: "Gets In Without Hesitation",
      desc: "Executes instantaneously the moment price crosses threshold parameters, instantly cancelling opposing pending orders.",
    },
    {
      num: "04",
      title: "Manages The Exit",
      desc: "Applies dynamic basket recovery, rollover spread pause guards, and trailing profit locks to protect account equity.",
    },
    {
      num: "05",
      title: "Closes & Auto-Resets",
      desc: "Locks in net target profit, flattens exposure, and resets buffer variables to prepare for the next setup — every single time.",
    },
  ];

  return (
    <section id="how-it-works" className="relative px-5 py-24 sm:px-8 bg-[#050505] overflow-hidden">
      {/* Anchor alias for backwards compatibility */}
      <div id="how-it-trades" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full bg-[#C9A84C]/10 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/35 bg-[#C9A84C]/10 px-4 py-1.5 text-xs font-black tracking-widest text-[#E8C97A] uppercase shadow-md shadow-[#C9A84C]/10">
            <span className="h-2 w-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span>How It Works</span>
          </div>

          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
            The <span className="gold-text">Apex Edge™</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-300 font-normal">
            The problem was never your strategy. It was the moment between seeing the setup and
            acting on it. Both Apex Gold Algo and Apex Gold Algo Pro use the same Apex Edge, the
            five-step system that removes that moment completely. It watches Gold, waits for the
            conditions it was built to find, gets in, manages the exit, and closes, every single
            time. You set the risk per trade. The system follows it without hesitation.
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
                  {st.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 font-medium">
                  {st.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] font-semibold text-[#E8C97A]">
                <span>Automated step</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* The .GIF Showcase Display */}
        <div className="mt-16 sm:mt-20">
          <div className="relative mx-auto max-w-4xl">
            {/* Ambient Gold Aura behind GIF container */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] bg-[#C9A84C]/20 blur-3xl pointer-events-none" />

            {/* Premium Glass Terminal Container */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-zinc-950/90 shadow-2xl shadow-black backdrop-blur-2xl">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-black/60">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-3 hidden sm:inline text-xs font-mono font-semibold text-zinc-400">
                    XAUUSD · Apex Edge™ Algorithm Execution
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Execution Demo</span>
                  </span>
                </div>
              </div>

              {/* Animated GIF Body */}
              <div className="p-3 sm:p-5 flex items-center justify-center bg-black/80">
                <div className="relative w-full max-w-[800px] overflow-hidden rounded-xl border border-white/[0.08] shadow-inner bg-black">
                  <img
                    src="/chart.gif"
                    alt="Apex Edge Gold Algo Live Chart Animation"
                    className="w-full h-auto object-contain block mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Bottom Feature Strip */}
              <div className="border-t border-white/10 bg-black/70 px-5 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div>
                    <span className="block text-xs font-bold text-white">Zero Hesitation</span>
                    <span className="text-[10px] text-zinc-500">Autonomous triggers</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#E8C97A]">Disciplined Risk</span>
                    <span className="text-[10px] text-zinc-500">Fixed risk per trade</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">Dynamic Exit</span>
                    <span className="text-[10px] text-zinc-500">Basket TP & recovery</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#E8C97A]">MT4 & MT5</span>
                    <span className="text-[10px] text-zinc-500">Full platform support</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-zinc-400">
              Live chart demonstration illustrating autonomous entry timing, order management, and structured exit sequence on XAUUSD.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
