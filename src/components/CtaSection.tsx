"use client";

import React from "react";

export default function CtaSection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container relative z-10">
        <div className="glass-card-static border border-[var(--gold-border-glow)] rounded-3xl p-8 sm:p-12 md:p-16 max-w-4xl mx-auto text-center bg-[rgba(14,15,22,0.92)] shadow-2xl relative overflow-hidden">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(212,175,55,0.1)] border border-[var(--gold-border)] text-xs font-semibold text-[var(--gold-300)] mb-6">
            <span className="pulse-beacon" />
            <span>Instant MT4 / MT5 Server Authorization</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Trade XAUUSD <br className="hidden sm:inline" />
            <span className="gold-text gold-glow-text">with Structure?</span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminate emotional guesswork and inconsistent manual trades. Deploy GTM PRO v1.0
            today with dual straddles, synchronized basket recovery, and 24/7 equity safeguards.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#pricing" className="btn-gold !py-3.5 !px-8 text-sm md:text-base font-bold">
              <span>Get Free Access Now</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a
              href="https://t.me/Ryan_Mitchell_GTMPRO"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold !py-3.5 !px-8 text-sm md:text-base font-bold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2L2 9.5l7 3.5 3.5 7L21.5 2z"></path>
                <path d="M9 13l5.5-5.5"></path>
              </svg>
              <span>Contact on Telegram</span>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[var(--text-muted)] font-mono">
            <span>✓ Verified Forward Results</span>
            <span>✓ Cent & Standard</span>
            <span>✓ MT4 & MT5</span>
          </div>
        </div>
      </div>
    </section>
  );
}
