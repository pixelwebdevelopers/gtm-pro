"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DownloadsSection() {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const whitelistDomain = "https://a689.link";

  const handleCopyWhitelist = () => {
    navigator.clipboard.writeText(whitelistDomain);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("pricing");
    if (elem) {
      const offset = elem.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="download" className="relative px-4 py-20 sm:px-8 border-y border-white/10 bg-zinc-950">
      <div id="downloads" className="absolute -top-24 pointer-events-none" />
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-black tracking-wider text-[#E8C97A] uppercase">
            DOWNLOADS
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Download GTM PRO
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Available for MetaTrader 4 &amp; 5. Copy the file into your platform&apos;s Experts folder, attach it to an XAUUSD chart, and activate it with your license key.
          </p>
        </div>

        {/* Section: GTM PRO V1.0 (MAIN EA) */}
        <div className="mt-12">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C9A84C]" />
            <h3 className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
              GTM PRO V1.0 (MAIN EA)
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Card 1 — MetaTrader 5 */}
            <div className="rounded-3xl border border-white/10 bg-black/50 p-6 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-colors shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[10px] font-black uppercase text-emerald-400">
                    METATRADER 5 · v1.0
                  </span>
                </div>
                <h4 className="mt-4 text-lg font-black text-white">GTM PRO for MT5</h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Copy into MQL5 → Experts. Works on cent and standard accounts (hedging account required).
                </p>
                <div className="mt-3 font-mono text-[11px] text-zinc-500">
                  File name: <span className="text-zinc-300 font-bold">GTM_PRO_EA_v1.0.ex5</span>
                </div>
                <div className="mt-3 text-[11px] text-[#E8C97A] font-semibold">
                  🔑 License key required on live accounts. Free on demo &amp; backtest.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">v1.0 (Official)</span>
                <a
                  href="#pricing"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-5 py-2.5 text-xs font-black text-zinc-950 shadow-md shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  Download
                </a>
              </div>
            </div>

            {/* Card 2 — MetaTrader 4 (Coming Soon) */}
            <div className="rounded-3xl border border-white/5 bg-black/30 p-6 flex flex-col justify-between opacity-80 shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-zinc-800 border border-white/10 px-3 py-1 text-[10px] font-black uppercase text-zinc-400">
                    METATRADER 4 · v1.0
                  </span>
                </div>
                <h4 className="mt-4 text-lg font-black text-zinc-200">GTM PRO for MT4</h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  Copy into MQL4 → Experts. Built for the MT4 desktop terminal.
                </p>
                <div className="mt-3 text-[11px] text-zinc-500 font-semibold">
                  🔑 License key required on live accounts.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-600 font-mono">In final testing</span>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-800/80 border border-white/5 px-5 py-2.5 text-xs font-bold text-zinc-400 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: GTM BULL & GTM BEAR (ONE-DIRECTION EAS) */}
        <div className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C9A84C]" />
            <h3 className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
              GTM BULL &amp; GTM BEAR (ONE-DIRECTION EAS)
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Card 3 — GTM Bull */}
            <div className="rounded-3xl border border-white/10 bg-black/50 p-6 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-colors shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 px-3 py-1 text-[10px] font-black uppercase text-[#E8C97A]">
                    METATRADER 5 · v1.0
                  </span>
                </div>
                <h4 className="mt-4 text-lg font-black text-white">GTM Bull — BUY Only</h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Trades BUY cycles only. Ideal when you want to follow gold&apos;s upside.
                </p>
                <div className="mt-3 font-mono text-[11px] text-zinc-500">
                  File name: <span className="text-zinc-300 font-bold">GTM_Bull_v1.0.ex5</span>
                </div>
                <div className="mt-3 text-[11px] text-[#E8C97A] font-semibold">
                  🔑 License key required
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">Included in Unlimited</span>
                <a
                  href="#pricing"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-5 py-2.5 text-xs font-black text-zinc-950 shadow-md shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  Download
                </a>
              </div>
            </div>

            {/* Card 4 — GTM Bear */}
            <div className="rounded-3xl border border-white/10 bg-black/50 p-6 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-colors shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 px-3 py-1 text-[10px] font-black uppercase text-[#E8C97A]">
                    METATRADER 5 · v1.0
                  </span>
                </div>
                <h4 className="mt-4 text-lg font-black text-white">GTM Bear — SELL Only</h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Trades SELL cycles only. Ideal when you want to follow gold&apos;s downside.
                </p>
                <div className="mt-3 font-mono text-[11px] text-zinc-500">
                  File name: <span className="text-zinc-300 font-bold">GTM_Bear_v1.0.ex5</span>
                </div>
                <div className="mt-3 text-[11px] text-[#E8C97A] font-semibold">
                  🔑 License key required
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">Included in Unlimited</span>
                <a
                  href="#pricing"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-5 py-2.5 text-xs font-black text-zinc-950 shadow-md shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  Download
                </a>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-zinc-400">
            Run either EA on its own, or run both together on two separate XAUUSD charts.
          </p>
        </div>

        {/* SETUP NOTE — REQUIRED ONCE PER TERMINAL */}
        <div className="mt-8 rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/[0.05] p-5 sm:p-6 text-xs text-zinc-300">
          <div className="flex items-center gap-2 font-black text-[#E8C97A] text-sm uppercase">
            <span>Setup note — required once per terminal</span>
          </div>
          <p className="mt-2 leading-relaxed text-zinc-300">
            GTM PRO checks your license online. Add this URL to your MetaTrader whitelist:
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-black/70 border border-white/10 font-mono">
            <span className="text-[#E8C97A] font-bold text-sm">{whitelistDomain}</span>
            <button
              onClick={handleCopyWhitelist}
              className="px-3 py-1.5 rounded-lg bg-[#C9A84C] text-black text-xs font-bold shrink-0 hover:brightness-110 active:scale-95"
            >
              {copiedUrl ? "Copied! ✓" : "Copy URL"}
            </button>
          </div>
          <p className="mt-3 text-[11px] text-zinc-400">
            <strong>Steps:</strong> MT4 / MT5 → Tools → Options → Expert Advisors → tick &ldquo;Allow WebRequest for listed URL&rdquo; → add the URL → OK.
          </p>
        </div>

        {/* VPS NOTE (SMALL BOX) */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-zinc-400">
          <span className="font-bold text-zinc-200">VPS Note:</span> For best results, run GTM PRO 24/5 on a VPS close to your broker&apos;s server: ideally under 10 ms, never above 100 ms.
        </div>

        {/* PRESET FILES BOX (WIDE GOLD BOX) */}
        <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#F0D896] via-[#E8C97A] to-[#C9A84C] p-[1.5px] shadow-xl shadow-[#C9A84C]/15">
          <div className="rounded-[calc(1.5rem-1.5px)] bg-[#0d0b07] p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase block">
                PRESET FILES
              </span>
              <h4 className="mt-1 text-2xl font-black text-white">
                Need Ready-Made Settings?
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
                Download tested 50K preset .set files for XAUUSD and other pairs, tuned for MT4 &amp; MT5 at 1:500 and 1:2000 leverage.
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
              <Link
                href="/download-set-files"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-6 py-3.5 text-sm font-black text-zinc-950 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Browse Preset Files →
              </Link>
              <a
                href="#pricing"
                onClick={scrollToPricing}
                className="text-xs text-zinc-400 hover:text-[#E8C97A] underline transition-colors"
              >
                Don&apos;t have a license yet? Get one here →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
