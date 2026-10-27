"use client";

import React, { useState } from "react";

export default function DownloadsSection() {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const whitelistDomain = "https://goldtacticalmachine.com";

  const handleCopyWhitelist = () => {
    navigator.clipboard.writeText(whitelistDomain);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const files = [
    {
      title: "GTM PRO MT5 Build",
      ver: "v4.2.7",
      filename: "GTM_PRO_v4.2.7.ex5",
      platform: "MetaTrader 5",
      desc: "Install into MQL5/Experts. Standard and cent account hedging supported.",
    },
    {
      title: "GTM PRO MT4 Build",
      ver: "v4.2.3",
      filename: "GTM_PRO_v4.2.3.ex4",
      platform: "MetaTrader 4",
      desc: "Install into MQL4/Experts. Optimized for MT4 desktop terminals.",
    },
    {
      title: "GTM PRO Yin (BUY Only)",
      ver: "v4.2.7",
      filename: "GTM_PRO_Yin.ex5",
      platform: "MetaTrader 5",
      desc: "Executes BUY breakout cycles only. Can run standalone or alongside Yang.",
    },
    {
      title: "GTM PRO Yang (SELL Only)",
      ver: "v4.2.7",
      filename: "GTM_PRO_Yang.ex5",
      platform: "MetaTrader 5",
      desc: "Executes SELL breakout cycles only. Can run standalone or alongside Yin.",
    },
  ];

  return (
    <section id="download" className="relative px-5 py-20 sm:px-8 border-y border-white/10 bg-zinc-950">
      <div id="downloads" className="absolute -top-24 pointer-events-none" />
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-sm font-black tracking-wider text-[#E8C97A] uppercase">
          Downloads
        </p>
        <h2 className="mt-3 text-center text-4xl font-black tracking-tight text-white sm:text-5xl">
          Download GTM PRO
        </h2>
        <p className="mt-3 text-center text-sm text-zinc-400">
          Compiled for MetaTrader 4 & 5. Install into your platform&rsquo;s Experts folder and activate with your license key.
        </p>

        {/* Files Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {files.map((f) => (
            <div
              key={f.filename}
              className="rounded-3xl border border-white/10 bg-black/40 p-6 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-3 py-1 text-[10px] font-black uppercase text-[#E8C97A]">
                    {f.platform}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">{f.ver}</span>
                </div>
                <h3 className="mt-4 text-lg font-black text-white">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{f.desc}</p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                <span className="font-mono text-xs text-zinc-500">{f.filename}</span>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-4 py-2 text-xs font-black text-zinc-950"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Required Setup Note: WebRequest Whitelist */}
        <div className="mt-8 rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/[0.05] p-5 text-xs text-zinc-300">
          <div className="flex items-center gap-2 font-black text-[#E8C97A] text-sm uppercase">
            <span>Setup note — required once per terminal</span>
          </div>
          <p className="mt-2 leading-relaxed text-zinc-300">
            The EA verifies your license online. Add this URL to your MetaTrader whitelist:
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-black/60 border border-white/10 font-mono">
            <span className="text-[#E8C97A] font-bold">{whitelistDomain}</span>
            <button
              onClick={handleCopyWhitelist}
              className="rounded-lg bg-white/10 px-3 py-1 text-xs font-bold text-white hover:bg-white/20 transition-all"
            >
              {copiedUrl ? "Copied! ✓" : "Copy URL"}
            </button>
          </div>
          <p className="mt-2.5 text-[11px] text-zinc-500">
            MT5/MT4 → Tools → Options → Expert Advisors → tick &ldquo;Allow WebRequest for listed URL&rdquo; → add the domain → OK.
          </p>
        </div>

        {/* VPS note */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-zinc-400 leading-relaxed">
          This protected release build is for live and demo trading. For best execution, use a VPS near your broker&rsquo;s server, ideally under 10 ms, and never above 100 ms.
        </div>
      </div>
    </section>
  );
}
