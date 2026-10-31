"use client";

import React from "react";
import Link from "next/link";

export default function HowToGetFreeSection() {
  const vantageLink = "https://vigco.co/la-com-inv/9XhUYs8x";
  const exnessLink = "https://one.toexness.com/a/53of1lwuw5";

  return (
    <section id="how-to-get-free" className="relative px-4 py-20 sm:px-8 border-t border-white/10 bg-[#060608]">
      <div id="free" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-4 py-1.5 text-xs font-black tracking-widest text-emerald-400 uppercase shadow-md shadow-emerald-500/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FREE ACCESS</span>
          </div>

          <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Get GTM PRO Free in <span className="gold-text">4 Simple Steps</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-300">
            No payment, no subscription. Just open a verified account with one of our partner brokers and start trading with GTM PRO.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 01 — Register via Our Link */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-7 shadow-xl hover:border-[#C9A84C]/40 transition-colors">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-sm font-black text-zinc-950 shadow-md">
                01
              </span>
              <h3 className="mt-4 text-lg font-black text-white">Register via Our Link</h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-zinc-400">
                Open a new account with Vantage Markets or Exness using our official partner link.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={vantageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 py-2.5 text-xs font-bold text-white hover:bg-[#C9A84C]/15 hover:border-[#C9A84C]/50 hover:text-[#E8C97A] transition-all"
              >
                Vantage Markets →
              </a>
              <a
                href={exnessLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 py-2.5 text-xs font-bold text-white hover:bg-[#C9A84C]/15 hover:border-[#C9A84C]/50 hover:text-[#E8C97A] transition-all"
              >
                Exness →
              </a>
            </div>
          </div>

          {/* Card 02 — Verify Your Account (KYC) */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-7 shadow-xl hover:border-[#C9A84C]/40 transition-colors">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-sm font-black text-zinc-950 shadow-md">
                02
              </span>
              <h3 className="mt-4 text-lg font-black text-white">Verify Your Account (KYC)</h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-zinc-400">
                Complete your identity verification inside the broker&apos;s app or website. It only takes a few minutes and is required before you can trade.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center text-xs font-mono text-zinc-300">
              ID document + proof of address
            </div>
          </div>

          {/* Card 03 — Open an MT5 Account */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-7 shadow-xl hover:border-[#C9A84C]/40 transition-colors">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-sm font-black text-zinc-950 shadow-md">
                03
              </span>
              <h3 className="mt-4 text-lg font-black text-white">Open an MT5 Account</h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-zinc-400">
                Create a new MT5 trading account. We recommend a cent account so you can start with lower capital and control your risk.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] p-3 text-center text-xs font-bold text-emerald-400">
              MT5 · Cent Account
            </div>
          </div>

          {/* Card 04 — Claim Your Free Access */}
          <div className="flex flex-col justify-between rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 sm:p-7 shadow-xl hover:border-emerald-500/50 transition-colors">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-b from-[#34D399] to-[#059669] text-sm font-black text-white shadow-md">
                04
              </span>
              <h3 className="mt-4 text-lg font-black text-white">Claim Your Free Access</h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-zinc-300">
                Submit your MT5 account number and registered email. Once we verify your account, we&apos;ll send your GTM PRO access details by email.
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/free-access#step-04"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#34D399] to-[#059669] py-3 text-xs font-black text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Claim Free Access →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar — Already Have an Account? */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Already Have a Vantage Markets or Exness Account?
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
                No need to open a new one. Move your existing account under our partner network, and you&apos;ll qualify for free access too.
              </p>
            </div>

            <Link
              href="/free-access#step-01"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-6 py-3.5 text-xs font-black text-[#E8C97A] hover:bg-[#C9A84C]/20 hover:border-[#C9A84C] transition-all active:scale-[0.98]"
            >
              See Transfer Steps →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
