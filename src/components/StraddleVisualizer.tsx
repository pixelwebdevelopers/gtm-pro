"use client";

import React, { useState } from "react";

export default function StraddleVisualizer() {
  const [activeScenario, setActiveScenario] = useState<"neutral" | "bullish" | "bearish" | "rollover">("neutral");

  return (
    <section id="simulator" className="section bg-[rgba(10,11,16,0.6)]">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="w-2 h-2 rounded-full bg-[var(--gold-400)]" />
            <span>Interactive Strategy Simulator</span>
          </div>
          <h2 className="section-title">
            How the <span className="gold-text">Straddle Matrix</span> Executes
          </h2>
          <p className="section-subtitle">
            GTM PRO does not guess market direction. It traps volatility with paired pending orders,
            instant opposite cancellation, and mathematically calculated basket exits.
          </p>
        </div>

        {/* Interactive Simulator Shell */}
        <div className="glass-card-static border border-[var(--gold-border)] rounded-2xl p-6 md:p-10 max-w-5xl mx-auto bg-[#0a0b10] shadow-2xl">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border-light)]">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Live Execution Simulation</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Select a market scenario below to observe automated basket reaction:
              </p>
            </div>

            {/* Scenario Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveScenario("neutral")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeScenario === "neutral"
                    ? "bg-[rgba(255,255,255,0.12)] text-white border border-white/20"
                    : "text-[var(--text-secondary)] bg-[rgba(255,255,255,0.03)] hover:text-white"
                }`}
              >
                1. Neutral Straddle
              </button>
              <button
                onClick={() => setActiveScenario("bullish")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeScenario === "bullish"
                    ? "bg-[rgba(0,229,153,0.2)] text-[var(--accent-green)] border border-[rgba(0,229,153,0.4)]"
                    : "text-[var(--text-secondary)] bg-[rgba(255,255,255,0.03)] hover:text-white"
                }`}
              >
                2. Bullish Breakout
              </button>
              <button
                onClick={() => setActiveScenario("bearish")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeScenario === "bearish"
                    ? "bg-[rgba(255,59,86,0.2)] text-[var(--accent-red)] border border-[rgba(255,59,86,0.4)]"
                    : "text-[var(--text-secondary)] bg-[rgba(255,255,255,0.03)] hover:text-white"
                }`}
              >
                3. Bearish Retracement
              </button>
              <button
                onClick={() => setActiveScenario("rollover")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeScenario === "rollover"
                    ? "bg-[rgba(212,175,55,0.2)] text-[var(--gold-300)] border border-[var(--gold-border)]"
                    : "text-[var(--text-secondary)] bg-[rgba(255,255,255,0.03)] hover:text-white"
                }`}
              >
                4. Rollover Protection
              </button>
            </div>
          </div>

          {/* Graphical Visualizer Canvas / Chart Box */}
          <div className="relative h-72 md:h-80 w-full rounded-xl bg-[#06070a] border border-[var(--border-subtle)] p-6 overflow-hidden flex flex-col justify-between">
            {/* Grid background lines */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Bullish Take Profit Line */}
            <div className="relative z-10 flex items-center justify-between border-b border-dashed border-[var(--accent-green)] pb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[var(--accent-green)]">
                  BASKET TAKE-PROFIT ($2,745.50)
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[rgba(0,229,153,0.15)] text-[var(--accent-green)]">
                  {activeScenario === "bullish" ? "TARGET HIT · ALL CLOSE" : "Target Exit"}
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--accent-green)]">+45 Pips Net</span>
            </div>

            {/* BuyStop Pending Order Line */}
            <div
              className={`relative z-10 flex items-center justify-between p-2 rounded border transition-all duration-500 ${
                activeScenario === "bullish"
                  ? "bg-[rgba(0,229,153,0.15)] border-[var(--accent-green)] translate-x-2"
                  : activeScenario === "rollover"
                  ? "opacity-30 line-through border-transparent"
                  : "bg-[rgba(0,229,153,0.05)] border-[rgba(0,229,153,0.3)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" />
                <span className="text-xs font-mono font-bold text-white">
                  BuyStop Trigger Line ($2,735.00)
                </span>
                {activeScenario === "bullish" && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--accent-green)] text-black">
                    TRIGGERED
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-[var(--text-secondary)]">0.01 Lot Start</span>
            </div>

            {/* Current Market Price Line */}
            <div className="relative z-10 flex items-center justify-between py-2 px-3 rounded-lg bg-[rgba(212,175,55,0.12)] border border-[var(--gold-border)] shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--gold-400)] animate-pulse" />
                <span className="text-xs font-mono font-bold text-[var(--gold-300)]">
                  CURRENT XAUUSD MARKET PRICE ($2,730.20)
                </span>
              </div>
              <span className="text-xs font-mono text-white">
                {activeScenario === "neutral" && "Spread: 1.2 Pips · Balanced Straddle"}
                {activeScenario === "bullish" && "Strong Breakout Upwards (+28 Pips)"}
                {activeScenario === "bearish" && "Pullback Triggered · Grid Recovery Active"}
                {activeScenario === "rollover" && "Rollover Window (23:55-00:05) · Orders Paused"}
              </span>
            </div>

            {/* SellStop Pending Order Line */}
            <div
              className={`relative z-10 flex items-center justify-between p-2 rounded border transition-all duration-500 ${
                activeScenario === "bullish"
                  ? "opacity-30 line-through border-transparent"
                  : activeScenario === "bearish"
                  ? "bg-[rgba(255,59,86,0.15)] border-[var(--accent-red)] translate-x-2"
                  : activeScenario === "rollover"
                  ? "opacity-30 line-through border-transparent"
                  : "bg-[rgba(255,59,86,0.05)] border-[rgba(255,59,86,0.3)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-red)]" />
                <span className="text-xs font-mono font-bold text-white">
                  SellStop Trigger Line ($2,725.00)
                </span>
                {activeScenario === "bullish" && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.1)] text-[var(--text-muted)]">
                    AUTO-CANCELLED
                  </span>
                )}
                {activeScenario === "bearish" && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--accent-red)] text-white">
                    TRIGGERED
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-[var(--text-secondary)]">0.01 Lot Start</span>
            </div>

            {/* Bearish Take Profit Line */}
            <div className="relative z-10 flex items-center justify-between border-t border-dashed border-[var(--accent-red)] pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[var(--accent-red)]">
                  BEARISH RECOVERY TP ($2,715.00)
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[rgba(255,59,86,0.15)] text-[var(--accent-red)]">
                  Dynamic Breakeven
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--accent-red)]">+45 Pips Net</span>
            </div>
          </div>

          {/* Strategy Insight Explanation Box */}
          <div className="mt-6 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[rgba(212,175,55,0.1)] text-[var(--gold-400)] shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-white block mb-0.5">Automated Risk Safeguard Principle:</strong>
              {activeScenario === "neutral" &&
                "Both BuyStop and SellStop are simultaneously placed around the live spot price. You don't have to predict whether news or momentum will push Gold up or down."}
              {activeScenario === "bullish" &&
                "As soon as the BuyStop order triggers, GTM PRO immediately cancels the opposing SellStop order to avoid hedging drag, and establishes a dynamic basket take-profit above the trigger."}
              {activeScenario === "bearish" &&
                "If price retraces against the active basket, adaptive grid positions (PipStep 1/2) are added at calculated mathematical distances, recalculating the breakeven point closer so the exit occurs on the very first bounce."}
              {activeScenario === "rollover" &&
                "During broker rollover (daily spread widening period), all pending straddles are wiped from the terminal to avoid spread-spike false breakouts. Any open positions remain strictly guarded."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
