"use client";

import React, { useState } from "react";

export default function ProfitCalculator() {
  const [accountType, setAccountType] = useState<"cent" | "standard">("cent");
  const [capital, setCapital] = useState(50000); // 50,000 USC or $5,000 USD
  const [riskMode, setRiskMode] = useState<"conservative" | "balanced" | "aggressive">("balanced");

  // Calculations
  const isCent = accountType === "cent";
  const startLot = isCent
    ? (capital < 30000 ? 0.01 : capital < 100000 ? 0.01 : 0.02)
    : (capital < 5000 ? 0.01 : capital < 15000 ? 0.02 : 0.05);

  const recommendedLeverage = isCent ? "1:500 to 1:2000" : "1:500";
  const safetyScore =
    isCent && capital >= 50000
      ? "Strong Buffer (Recommended)"
      : isCent && capital >= 20000
      ? "Moderate Stability"
      : !isCent && capital >= 10000
      ? "Solid Standard Account Buffer"
      : "High Drawdown Risk (Minimum Capital)";

  const safetyBadgeColor =
    (isCent && capital >= 50000) || (!isCent && capital >= 10000)
      ? "text-[var(--accent-green)] border-[rgba(0,229,153,0.3)] bg-[rgba(0,229,153,0.1)]"
      : "text-[var(--gold-300)] border-[var(--gold-border)] bg-[rgba(212,175,55,0.1)]";

  const monthlyEstimate =
    riskMode === "conservative"
      ? "5% – 9%"
      : riskMode === "balanced"
      ? "9% – 16%"
      : "16% – 25%+";

  return (
    <section id="calculator" className="section bg-[rgba(8,9,13,0.7)]">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="w-2 h-2 rounded-full bg-[var(--gold-400)]" />
            <span>Risk Management Calculator</span>
          </div>
          <h2 className="section-title">
            Calculate Your <span className="gold-text">Account Setup & Lot Size</span>
          </h2>
          <p className="section-subtitle">
            Never guess your lot size. GTM PRO is designed for strict margin ratios. Select your
            account type and capital to see recommended specifications.
          </p>
        </div>

        <div className="glass-card-static border border-[var(--gold-border)] rounded-2xl p-6 md:p-10 max-w-4xl mx-auto bg-[#0b0c12] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Account Type Toggle */}
              <div>
                <label className="text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider block mb-2.5">
                  1. Select Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setAccountType("cent");
                      setCapital(50000);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      accountType === "cent"
                        ? "bg-[rgba(212,175,55,0.15)] border-[var(--gold-border)] text-white shadow-md"
                        : "bg-[rgba(255,255,255,0.02)] border-[var(--border-light)] text-[var(--text-secondary)] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">Cent Account (USC)</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--gold-500)] text-[#100d02]">
                        RECOMMENDED
                      </span>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] block">
                      Vantage Markets / Exness Cent
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setAccountType("standard");
                      setCapital(5000);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      accountType === "standard"
                        ? "bg-[rgba(212,175,55,0.15)] border-[var(--gold-border)] text-white shadow-md"
                        : "bg-[rgba(255,255,255,0.02)] border-[var(--border-light)] text-[var(--text-secondary)] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">Standard Account (USD)</span>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] block">
                      Direct broker $ balance
                    </span>
                  </button>
                </div>
              </div>

              {/* Capital Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider">
                    2. Total Account Capital
                  </label>
                  <span className="text-lg font-bold font-mono gold-text">
                    {isCent
                      ? `${capital.toLocaleString()} USC (≈ $${(capital / 100).toFixed(0)} USD)`
                      : `$${capital.toLocaleString()} USD`}
                  </span>
                </div>

                <input
                  type="range"
                  min={isCent ? 10000 : 1000}
                  max={isCent ? 200000 : 30000}
                  step={isCent ? 5000 : 500}
                  value={capital}
                  onChange={(e) => setCapital(Number(e.target.value))}
                  className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-lg appearance-none cursor-pointer accent-[var(--gold-500)]"
                />

                <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-mono mt-2">
                  <span>{isCent ? "10,000 USC (Min)" : "$1,000 (Min)"}</span>
                  <span className="text-[var(--gold-300)] font-semibold">
                    {isCent ? "50,000 USC (Sweet Spot)" : "$5,000 (Optimal)"}
                  </span>
                  <span>{isCent ? "200,000 USC" : "$30,000"}</span>
                </div>
              </div>

              {/* Risk Profile Selection */}
              <div>
                <label className="text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider block mb-2.5">
                  3. Risk Profile Setting
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {(
                    [
                      { key: "conservative", label: "Conservative", note: "Max Safety" },
                      { key: "balanced", label: "Balanced", note: "Default Preset" },
                      { key: "aggressive", label: "Dynamic", note: "High Yield" },
                    ] as const
                  ).map((rm) => (
                    <button
                      key={rm.key}
                      onClick={() => setRiskMode(rm.key)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        riskMode === rm.key
                          ? "bg-[rgba(212,175,55,0.15)] border-[var(--gold-border)] text-white font-bold"
                          : "bg-[rgba(255,255,255,0.02)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white"
                      }`}
                    >
                      <span className="block mb-0.5">{rm.label}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">{rm.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card (Right Column) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[rgba(16,17,24,0.95)] border border-[var(--gold-border)] shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)] mb-4">
                  <span className="text-xs uppercase font-bold text-[var(--text-muted)]">
                    Calculated Configuration
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${safetyBadgeColor}`}>
                    {safetyScore}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Starting Lot Size</span>
                    <span className="text-xl font-mono font-bold text-white">{startLot} Lot</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Account Leverage</span>
                    <span className="text-sm font-mono font-bold text-[var(--gold-300)]">
                      {recommendedLeverage}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Est. Monthly Basket Gain</span>
                    <span className="text-base font-mono font-bold text-[var(--accent-green)]">
                      {monthlyEstimate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Max Drawdown Target</span>
                    <span className="text-sm font-mono font-semibold text-white">
                      {riskMode === "conservative" ? "< 8%" : riskMode === "balanced" ? "< 14%" : "< 22%"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-light)]">
                <a href="#pricing" className="btn-gold w-full text-center !py-3 !text-xs font-bold">
                  Deploy GTM PRO with This Preset
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
