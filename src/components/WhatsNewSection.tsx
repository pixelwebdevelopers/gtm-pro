"use client";

import React from "react";

export default function WhatsNewSection() {
  const updates = [
    {
      num: "01",
      title: "Online License Bound to MT Account",
      desc: "Each license key is tied directly to your verified MT4/MT5 account numbers on our licensing server. Eliminates unauthorized usage and ensures remote compliance.",
    },
    {
      num: "02",
      title: "Hourly Heartbeat & Offline Tolerance",
      desc: "The EA checks license status every hour. The last result is securely cached locally for 24 hours, so brief internet drops or VPS maintenance will never interrupt active trades.",
    },
    {
      num: "03",
      title: "Tighter Rollover Pause Window",
      desc: "Pending orders are automatically wiped during the midnight rollover period so broker spread widening never causes artificial breakout fills.",
    },
    {
      num: "04",
      title: "24/7 Hard Equity Kill-Switch",
      desc: "Total equity drawdown protection is hardwired to run unconditionally, even during the pause window. If breached, every open position is liquidated instantly.",
    },
  ];

  return (
    <section className="section bg-[#06070a]">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="w-2 h-2 rounded-full bg-[var(--gold-400)]" />
            <span>Architecture Upgrades</span>
          </div>
          <h2 className="section-title">
            What’s New in <span className="gold-text">GTM PRO v4.2.7</span>
          </h2>
          <p className="section-subtitle">
            Our latest release focuses on enhanced server license security, resilient VPS heartbeat
            caching, and stricter risk protocol safeguards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {updates.map((up) => (
            <div
              key={up.num}
              className="glass-card p-6 md:p-8 flex items-start gap-5 hover:border-[var(--gold-border)]"
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.12)] border border-[var(--gold-border)] flex items-center justify-center font-black text-lg gold-text shrink-0">
                {up.num}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{up.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {up.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
