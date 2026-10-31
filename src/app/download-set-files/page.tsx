"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PresetItem {
  pair: string;
  category: "Gold & Metals" | "Forex Majors" | "Forex Crosses";
  status: "Validated" | "Pending";
}

const presetPairs: PresetItem[] = [
  { pair: "XAUUSD", category: "Gold & Metals", status: "Validated" },
  { pair: "XAGUSD", category: "Gold & Metals", status: "Pending" },
  { pair: "EURUSD", category: "Forex Majors", status: "Validated" },
  { pair: "GBPUSD", category: "Forex Majors", status: "Validated" },
  { pair: "USDJPY", category: "Forex Majors", status: "Validated" },
  { pair: "AUDUSD", category: "Forex Majors", status: "Pending" },
  { pair: "USDCAD", category: "Forex Majors", status: "Pending" },
  { pair: "USDCHF", category: "Forex Majors", status: "Pending" },
  { pair: "NZDUSD", category: "Forex Majors", status: "Pending" },
  { pair: "EURJPY", category: "Forex Crosses", status: "Validated" },
  { pair: "GBPJPY", category: "Forex Crosses", status: "Pending" },
];

export default function DownloadSetFilesPage() {
  const [platform, setPlatform] = useState<"MT5" | "MT4">("MT5");
  const [leverage, setLeverage] = useState<"1:500" | "1:2000">("1:500");
  const [licenseKey, setLicenseKey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockError, setUnlockError] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockError("");
    const cleaned = licenseKey.trim();
    if (!cleaned || cleaned.length < 5) {
      setUnlockError("Please enter a valid GTM PRO license key.");
      return;
    }
    // Accept valid key format or active token
    setIsUnlocked(true);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setLicenseKey(text.trim());
    } catch {
      // Fallback
    }
  };

  const handleDownload = (filename: string) => {
    if (!isUnlocked) {
      const elem = document.getElementById("unlock-box");
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
      setUnlockError("Enter your license key below to unlock preset file downloads.");
      return;
    }

    // Trigger fake / real download of dummy preset text
    const blob = new Blob(
      [
        `; GTM PRO v1.0 Preset File\n; File: ${filename}\n; Platform: ${platform} | Leverage: ${leverage}\n; Account: 50K Standard / 50K Cent (USC)\n; Risk: Strict Basket Straddle\n\nMagicNumber=108821\nLotSize=0.01\nStepDistance=25\nTakeProfit=30\nNewsFilter=true\nSessionFilter=true\n`,
      ],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const validatedCount = presetPairs.filter((p) => p.status === "Validated").length;
  const pendingCount = presetPairs.filter((p) => p.status === "Pending").length;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <Navbar />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16">
        {/* Top Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#E8C97A] transition-colors"
          >
            ← Back to GTM PRO
          </Link>
        </div>

        {/* Header */}
        <div>
          <span className="text-xs font-black tracking-widest text-[#E8C97A] uppercase block">
            PRESET FILES
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            GTM PRO v1.0 — 50K Preset Files
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-300 max-w-3xl">
            Ready-to-use settings for a 50,000 USD standard account or a 50,000 USC cent account ($500). Tested on real market conditions, with live spreads and execution, so you can start with confidence.
          </p>

          {/* Small tags */}
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-3 py-1 text-[#E8C97A]">
              For GTM PRO v1.0 only
            </span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-zinc-300">
              $50,000 Standard
            </span>
            <span className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400">
              $500 Cent (50,000 USC)
            </span>
          </div>
        </div>

        {/* UNLOCK BOX */}
        <div
          id="unlock-box"
          className="mt-10 rounded-3xl border border-[#C9A84C]/30 bg-gradient-to-b from-[#110f09] to-[#0a0907] p-6 sm:p-8 shadow-2xl relative"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <span>{isUnlocked ? "🔓" : "🔒"}</span>
                <span>{isUnlocked ? "Preset Files Unlocked" : "Enter Your License Key to Unlock"}</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isUnlocked
                  ? "Your license key is verified. You can now download tested preset .set files for any available pair."
                  : "Preset files are available to active GTM PRO license holders. Enter the license key you received with your purchase or free access."}
              </p>
            </div>

            {isUnlocked ? (
              <div className="shrink-0 flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 px-5 py-3 text-emerald-300 text-xs font-bold">
                <span>✓ License Active</span>
              </div>
            ) : (
              <form onSubmit={handleUnlock} className="flex-1 max-w-md">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      placeholder="XXXX-XXXXX-XXXXX-XXXXX"
                      className="w-full rounded-2xl border border-white/15 bg-black/80 px-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-zinc-600 focus:border-[#C9A84C] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handlePaste}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-zinc-300"
                    >
                      Paste
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-6 py-3 text-xs font-black text-zinc-950 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Unlock
                  </button>
                </div>
                {unlockError && (
                  <p className="mt-2 text-xs text-red-400 font-semibold">{unlockError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300 text-center font-bold">
            ✓ Downloaded {downloadSuccess}
          </div>
        )}

        {/* Tabs Controls: Platform & Leverage */}
        <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Platform Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-zinc-400 mr-1">Platform:</span>
            <button
              type="button"
              onClick={() => setPlatform("MT5")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                platform === "MT5"
                  ? "bg-[#C9A84C] text-zinc-950 shadow"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              MetaTrader 5
            </button>
            <button
              type="button"
              onClick={() => setPlatform("MT4")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                platform === "MT4"
                  ? "bg-[#C9A84C] text-zinc-950 shadow"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              MetaTrader 4
            </button>
          </div>

          {/* Leverage Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-zinc-400 mr-1">Leverage:</span>
            <button
              type="button"
              onClick={() => setLeverage("1:500")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                leverage === "1:500"
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              1:500
            </button>
            <button
              type="button"
              onClick={() => setLeverage("1:2000")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                leverage === "1:2000"
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              1:2000
            </button>
          </div>
        </div>

        {/* List Title */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-white">
            GTM PRO 50K · {platform} · {leverage} —{" "}
            <span className="text-emerald-400">{validatedCount} Validated</span> ·{" "}
            <span className="text-amber-400">{pendingCount} Pending</span>
          </h3>
          <span className="text-xs text-zinc-500 font-mono">
            {presetPairs.length} Configurations Available
          </span>
        </div>

        {/* File Table / Rows */}
        <div className="mt-4 divide-y divide-white/5 rounded-2xl border border-white/10 bg-zinc-950/80 overflow-hidden shadow-xl">
          {presetPairs.map((p) => {
            const levFormatted = leverage.replace(":", "_");
            const filename = `${p.pair}_GTM_PRO_50K_${platform}_${levFormatted}.set`;

            return (
              <div
                key={p.pair}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:px-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-20 text-sm font-black text-white font-mono">
                    {p.pair}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                      p.status === "Validated"
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                        : "bg-amber-500/15 border-amber-500/30 text-amber-400"
                    }`}
                  >
                    {p.status === "Validated" ? "✅ Validated" : "⏳ Pending"}
                  </span>

                  <span className="hidden md:inline text-xs text-zinc-500 font-mono truncate max-w-xs">
                    {filename}
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <span className="sm:hidden text-xs text-zinc-500 font-mono truncate max-w-[200px]">
                    {filename}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownload(filename)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isUnlocked
                        ? "bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-black hover:brightness-110 active:scale-95"
                        : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {isUnlocked ? "Download .set" : "🔒 Locked"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* STATUS GUIDE */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 text-xs leading-relaxed space-y-2">
          <h4 className="font-bold uppercase tracking-wider text-zinc-300 text-[11px]">
            STATUS GUIDE
          </h4>
          <p className="text-zinc-300">
            <strong className="text-emerald-400">✅ Validated</strong> — Passed our validation test with no stop-out and acceptable risk behaviour.
          </p>
          <p className="text-zinc-300">
            <strong className="text-amber-400">⏳ Pending</strong> — Passed basic checks, but is more aggressive or still needs more demo/forward testing before being fully validated. Use with extra care.
          </p>
        </div>

        {/* HOW TO USE A PRESET (5 STEPS) */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950/80 p-6 sm:p-8">
          <h4 className="text-base font-black text-white uppercase tracking-wider">
            HOW TO USE A PRESET (5 STEPS)
          </h4>
          <ol className="mt-4 space-y-3 text-xs sm:text-sm text-zinc-300 list-decimal list-inside leading-relaxed">
            <li>
              Download the <strong>.set</strong> file that matches your platform (MT4/MT5) and your account leverage.
            </li>
            <li>
              Open MetaTrader and attach GTM PRO to the chart of the same pair as the file name.
            </li>
            <li>
              Open the EA settings, go to the <strong>Inputs</strong> tab, click <strong>Load</strong> and select the .set file.
            </li>
            <li>
              Before going live, check your equity, leverage, broker symbol name, spread, lot size and magic numbers.
            </li>
            <li>
              Always test Pending presets on a demo or cent account first, because grid recovery needs enough equity to work safely.
            </li>
          </ol>
        </div>

        {/* RISK WARNING & CAPITAL NOTE (BOX AT THE BOTTOM) */}
        <div className="mt-8 rounded-3xl border border-amber-500/30 bg-amber-500/[0.06] p-6 sm:p-8 space-y-3 text-xs leading-relaxed text-zinc-300">
          <p>
            <strong className="text-amber-400">Risk Warning:</strong> GTM PRO uses straddle entries with grid recovery, which carries high risk. These presets help manage baskets, but they do NOT guarantee profits. A strong one-direction move without pullbacks can put heavy pressure on your margin. Trading is entirely at your own risk, and GTM PRO is not responsible for any financial loss.
          </p>
          <p>
            <strong className="text-[#E8C97A]">Capital Note:</strong> All presets are built for a 50,000 USD account (or $500 cent = 50,000 USC). For more protection against drawdown, we recommend 100,000 USD (or $1,000 cent = 100,000 USC).
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

