"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PresetPair {
  id: number;
  pair: string;
  status500: "Validated" | "Pending";
  status2000: "Validated" | "Pending";
}

// All 37 configurations - XAUUSD is explicitly item #1
const presetPairs: PresetPair[] = [
  { id: 1, pair: "XAUUSD", status500: "Pending", status2000: "Pending" },
  { id: 2, pair: "AUDNZD", status500: "Pending", status2000: "Pending" },
  { id: 3, pair: "EURGBP", status500: "Validated", status2000: "Validated" },
  { id: 4, pair: "EURCHF", status500: "Validated", status2000: "Validated" },
  { id: 5, pair: "AUDCAD", status500: "Validated", status2000: "Pending" },
  { id: 6, pair: "NZDCAD", status500: "Validated", status2000: "Pending" },
  { id: 7, pair: "AUDCHF", status500: "Validated", status2000: "Validated" },
  { id: 8, pair: "EURCAD", status500: "Validated", status2000: "Validated" },
  { id: 9, pair: "GBPCAD", status500: "Validated", status2000: "Pending" },
  { id: 10, pair: "CHFJPY", status500: "Validated", status2000: "Pending" },
  { id: 11, pair: "NZDCHF", status500: "Pending", status2000: "Pending" },
  { id: 12, pair: "CADCHF", status500: "Validated", status2000: "Validated" },
  { id: 13, pair: "EURAUD", status500: "Validated", status2000: "Validated" },
  { id: 14, pair: "GBPAUD", status500: "Validated", status2000: "Validated" },
  { id: 15, pair: "EURNZD", status500: "Validated", status2000: "Validated" },
  { id: 16, pair: "GBPNZD", status500: "Validated", status2000: "Pending" },
  { id: 17, pair: "AUDUSD", status500: "Validated", status2000: "Pending" },
  { id: 18, pair: "NZDUSD", status500: "Validated", status2000: "Validated" },
  { id: 19, pair: "USDCAD", status500: "Pending", status2000: "Pending" },
  { id: 20, pair: "USDCHF", status500: "Pending", status2000: "Pending" },
  { id: 21, pair: "EURUSD", status500: "Validated", status2000: "Validated" },
  { id: 22, pair: "AUDJPY", status500: "Pending", status2000: "Pending" },
  { id: 23, pair: "CADJPY", status500: "Pending", status2000: "Pending" },
  { id: 24, pair: "EURJPY", status500: "Validated", status2000: "Validated" },
  { id: 25, pair: "GBPJPY", status500: "Validated", status2000: "Validated" },
  { id: 26, pair: "USDJPY", status500: "Pending", status2000: "Pending" },
  { id: 27, pair: "GBPUSD", status500: "Validated", status2000: "Validated" },
  { id: 28, pair: "GBPCHF", status500: "Validated", status2000: "Validated" },
  { id: 29, pair: "SGDJPY", status500: "Pending", status2000: "Pending" },
  { id: 30, pair: "NZDJPY", status500: "Validated", status2000: "Validated" },
  { id: 31, pair: "USDSGD", status500: "Pending", status2000: "Pending" },
  { id: 32, pair: "AUDSGD", status500: "Pending", status2000: "Pending" },
  { id: 33, pair: "NZDSGD", status500: "Pending", status2000: "Pending" },
  { id: 34, pair: "EURSGD", status500: "Pending", status2000: "Pending" },
  { id: 35, pair: "GBPSGD", status500: "Pending", status2000: "Pending" },
  { id: 36, pair: "CHFSGD", status500: "Pending", status2000: "Pending" },
  { id: 37, pair: "USDHKD", status500: "Pending", status2000: "Pending" },
];

export default function DownloadSetFilesPage() {
  const [platform, setPlatform] = useState<"MT5" | "MT4">("MT5");
  const [leverage, setLeverage] = useState<"1:500" | "1:2000">("1:500");
  const [licenseKey, setLicenseKey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [unlockError, setUnlockError] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Restore unlock status from localStorage if previously verified
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gtm_preset_unlocked");
      if (saved === "true") {
        setIsUnlocked(true);
      }
    } catch {
      // LocalStorage might be restricted
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockError("");

    const cleaned = licenseKey.trim();
    if (!cleaned) {
      setUnlockError("Please enter your GTM PRO license key.");
      return;
    }

    setIsVerifying(true);

    // Read configured key from client environment or fallback to default
    const clientExpectedKey = (
      process.env.NEXT_PUBLIC_PRESET_UNLOCK_KEY || "GTEA-J8M7B-SHVRL-3P9WK"
    ).trim();

    try {
      // Server-side verification via route handler
      const res = await fetch("/api/verify-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey: cleaned }),
      });
      const data = await res.json();

      if (res.ok && data.valid) {
        setIsUnlocked(true);
        try {
          localStorage.setItem("gtm_preset_unlocked", "true");
        } catch {
          // Ignore storage restrictions
        }
        setIsVerifying(false);
        return;
      }
    } catch {
      // If server route is unavailable, fallback to client-side verification
    }

    // Direct client-side validation
    if (cleaned.toUpperCase() === clientExpectedKey.toUpperCase()) {
      setIsUnlocked(true);
      try {
        localStorage.setItem("gtm_preset_unlocked", "true");
      } catch {
        // Ignore storage restrictions
      }
    } else {
      setUnlockError(
        "Invalid license key. Please check your key or contact support to obtain one."
      );
    }
    setIsVerifying(false);
  };

  const handleRelock = () => {
    setIsUnlocked(false);
    setLicenseKey("");
    try {
      localStorage.removeItem("gtm_preset_unlocked");
    } catch {
      // Ignore
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setLicenseKey(text.trim());
    } catch {
      // Clipboard fallback
    }
  };

  const handleDownload = (filename: string) => {
    if (platform === "MT4") {
      // MT4 presets are coming soon
      return;
    }

    if (!isUnlocked) {
      const elem = document.getElementById("unlock-box");
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
      setUnlockError(
        "Enter your license key below to unlock preset file downloads."
      );
      return;
    }

    // Download real MT5 .set file from public folder
    const levFormatted = leverage === "1:500" ? "1_500" : "1_2000";
    const filePath = `/downloads/presets/${levFormatted}/${filename}`;

    const a = document.createElement("a");
    a.href = filePath;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  // Ensure XAUUSD is ALWAYS on top in every case
  const sortedPairs = [...presetPairs].sort((a, b) => {
    if (a.pair === "XAUUSD") return -1;
    if (b.pair === "XAUUSD") return 1;
    return a.id - b.id;
  });

  // Filter based on search query, while keeping XAUUSD on top if matched
  const filteredPairs = sortedPairs.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      p.pair.toLowerCase().includes(q) ||
      (p.pair === "XAUUSD" && "gold".includes(q))
    );
  });

  const validatedCount = presetPairs.filter(
    (p) => (leverage === "1:500" ? p.status500 : p.status2000) === "Validated"
  ).length;
  const pendingCount = presetPairs.filter(
    (p) => (leverage === "1:500" ? p.status500 : p.status2000) === "Pending"
  ).length;

  const levFormatted = leverage === "1:500" ? "1_500" : "1_2000";

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
            Ready-to-use settings for a 50,000 USD standard account or a 50,000 USC
            cent account ($500). Tested on real market conditions, with live
            spreads and execution, so you can start with confidence.
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
            <span className="rounded-xl border border-[#C9A84C]/40 bg-[#C9A84C]/15 px-3 py-1 text-[#E8C97A]">
              ⭐ XAU/USD (Gold) Featured
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
                <span>
                  {isUnlocked
                    ? "Preset Files Unlocked"
                    : "Enter Your License Key to Unlock"}
                </span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isUnlocked
                  ? "Your license key is verified. You can now download tested preset .set files for any available pair."
                  : "Preset files are available to active GTM PRO license holders. Enter the license key you received with your purchase or free access."}
              </p>
            </div>

            {isUnlocked ? (
              <div className="shrink-0 flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 px-5 py-3 text-emerald-300 text-xs font-bold shadow-lg">
                  <span>✓ License Active</span>
                </div>
                <button
                  type="button"
                  onClick={handleRelock}
                  className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-3 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Change Key
                </button>
              </div>
            ) : (
              <form onSubmit={handleUnlock} className="flex-1 max-w-md">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      placeholder="GTEA-J8M7B-SHVRL-3P9WK"
                      className="w-full rounded-2xl border border-white/15 bg-black/80 px-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-zinc-600 focus:border-[#C9A84C] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handlePaste}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-zinc-300 cursor-pointer"
                    >
                      Paste
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-6 py-3 text-xs font-black text-zinc-950 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    {isVerifying ? "Verifying..." : "Unlock"}
                  </button>
                </div>
                {unlockError && (
                  <p className="mt-2 text-xs text-red-400 font-semibold">
                    {unlockError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300 text-center font-bold">
            ✓ Successfully downloaded {downloadSuccess}
          </div>
        )}

        {/* Tabs Controls: Platform & Leverage */}
        <div className="mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Platform Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-zinc-400 mr-1">
              Platform:
            </span>
            <button
              type="button"
              onClick={() => setPlatform("MT5")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                platform === "MT5"
                  ? "bg-[#C9A84C] text-zinc-950 shadow-md"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              <span>MetaTrader 5</span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 bg-black/20 rounded">
                Ready
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPlatform("MT4")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                platform === "MT4"
                  ? "bg-[#C9A84C] text-zinc-950 shadow-md"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              <span>MetaTrader 4</span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded">
                Soon
              </span>
            </button>
          </div>

          {/* Leverage Tabs & Bulk Download */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-zinc-400 mr-1">
                Leverage:
              </span>
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

            {/* Bulk ZIP Download for MT5 */}
            {platform === "MT5" && (
              <a
                href={
                  isUnlocked
                    ? `/downloads/presets/GTM_PRO_Presets_MT5_${levFormatted}.zip`
                    : "#unlock-box"
                }
                onClick={(e) => {
                  if (!isUnlocked) {
                    e.preventDefault();
                    const elem = document.getElementById("unlock-box");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                    setUnlockError(
                      "Enter your license key above to unlock the presets archive."
                    );
                  }
                }}
                download={
                  isUnlocked
                    ? `GTM_PRO_Presets_MT5_${levFormatted}.zip`
                    : undefined
                }
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A84C]/20 to-[#E8C97A]/20 hover:from-[#C9A84C]/30 hover:to-[#E8C97A]/30 border border-[#C9A84C]/40 px-3.5 py-2 text-xs font-bold text-[#E8C97A] transition-all cursor-pointer"
                title="Download all 37 preset files in a single zip archive"
              >
                <span>📦</span>
                <span>
                  {isUnlocked
                    ? `Download All 37 Presets (.ZIP)`
                    : `Unlock All 37 (.ZIP)`}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* MT4 Notice Banner */}
        {platform === "MT4" && (
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex items-start gap-3">
            <span className="text-2xl shrink-0 mt-0.5">⏳</span>
            <div>
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wide">
                MetaTrader 4 Presets — Coming Soon
              </h4>
              <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                All 37 preset configurations for MetaTrader 4 are currently undergoing final stress testing and forward validation. Each MT4 preset file will be released here very soon. If you are using MetaTrader 5, all 37 files are available for immediate download now.
              </p>
            </div>
          </div>
        )}

        {/* List Title & Filter Search */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">
              GTM PRO 50K · {platform === "MT5" ? "MetaTrader 5" : "MetaTrader 4"} · {leverage} —{" "}
              {platform === "MT5" ? (
                <>
                  <span className="text-emerald-400">{validatedCount} Validated</span> ·{" "}
                  <span className="text-amber-400">{pendingCount} Pending</span>
                </>
              ) : (
                <span className="text-amber-300">All 37 Files Coming Soon</span>
              )}
            </h3>
            <span className="text-xs text-zinc-500 font-mono">
              Showing {filteredPairs.length} of {presetPairs.length} Configurations
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pair (e.g. XAUUSD, EUR, JPY)..."
              className="w-full sm:w-64 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-[#C9A84C] focus:outline-none font-mono"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* File Table / Rows */}
        <div className="mt-4 divide-y divide-white/5 rounded-2xl border border-white/10 bg-zinc-950/80 overflow-hidden shadow-xl">
          {filteredPairs.map((p) => {
            const isGold = p.pair === "XAUUSD";
            const status = leverage === "1:500" ? p.status500 : p.status2000;
            const filename = `${p.pair}_GTM_PRO_50K_${platform}_${levFormatted}.set`;

            return (
              <div
                key={p.pair}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:px-6 transition-colors ${
                  isGold
                    ? "bg-gradient-to-r from-[#C9A84C]/15 via-[#C9A84C]/5 to-transparent border-l-4 border-l-[#C9A84C]"
                    : "hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="w-8 text-xs font-mono font-bold text-zinc-500">
                    #{p.id}
                  </span>

                  <span
                    className={`w-24 text-sm font-black font-mono flex items-center gap-1.5 ${
                      isGold ? "text-[#E8C97A]" : "text-white"
                    }`}
                  >
                    {p.pair}
                    {isGold && <span title="Flagship Pair">⭐</span>}
                  </span>

                  {isGold && (
                    <span className="rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#E8C97A]">
                      TOP ASSET
                    </span>
                  )}

                  {platform === "MT5" ? (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                        status === "Validated"
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                          : "bg-amber-500/15 border-amber-500/30 text-amber-400"
                      }`}
                    >
                      {status === "Validated" ? "✅ Validated" : "⏳ Pending"}
                    </span>
                  ) : (
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border bg-amber-500/15 border-amber-500/30 text-amber-300">
                      ⏳ Coming Soon
                    </span>
                  )}

                  <span className="hidden md:inline text-xs text-zinc-500 font-mono truncate max-w-xs">
                    {filename}
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <span className="sm:hidden text-xs text-zinc-500 font-mono truncate max-w-[200px]">
                    {filename}
                  </span>

                  {platform === "MT5" ? (
                    <button
                      type="button"
                      onClick={() => handleDownload(filename)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isUnlocked
                          ? "bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-black hover:brightness-110 active:scale-95 shadow-md"
                          : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {isUnlocked ? "Download .set" : "🔒 Locked"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/10 border border-amber-500/25 text-amber-300/80 cursor-not-allowed whitespace-nowrap"
                    >
                      ⏳ Coming Soon
                    </button>
                  )}
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
          <p className="text-zinc-300">
            <strong className="text-amber-300">⏳ Coming Soon</strong> — MetaTrader 4 versions are currently in optimization and will be available for download here soon.
          </p>
        </div>

        {/* HOW TO USE A PRESET (5 STEPS) */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950/80 p-6 sm:p-8">
          <h4 className="text-base font-black text-white uppercase tracking-wider">
            HOW TO USE A PRESET (5 STEPS)
          </h4>
          <ol className="mt-4 space-y-3 text-xs sm:text-sm text-zinc-300 list-decimal list-inside leading-relaxed">
            <li>
              Download the <strong>.set</strong> file that matches your platform (MT5) and your account leverage (1:500 or 1:2000).
            </li>
            <li>
              Open MetaTrader and attach GTM PRO to the chart of the same pair as the file name (e.g. XAUUSD for gold).
            </li>
            <li>
              Open the EA settings, go to the <strong>Inputs</strong> tab, click <strong>Load</strong> and select the downloaded .set file.
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
