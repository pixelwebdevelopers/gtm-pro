"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PlanModalInfo {
  name: string;
  price: string;
}

export default function PricingSection() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanModalInfo>({
    name: "5 Accounts",
    price: "$299 USDT",
  });
  const [copiedWallet, setCopiedWallet] = useState(false);

  const usdtWallet = "TJiS8efyHdCcP1vXw6DvvtCRqLv8GzWbs8";

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(usdtWallet);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2500);
  };

  const handleOpenPayment = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setPaymentModalOpen(true);
  };

  return (
    <section id="pricing" className="border-y border-white/10 bg-zinc-950 px-5 py-20 sm:px-8 relative">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl text-white">
            Get GTM PRO
          </h2>
          <p className="mt-3 text-base text-zinc-300">
            Start free, or choose a lifetime license. Test everything on demo first.
          </p>
        </div>

        {/* Pricing Cards Grid (4 columns) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Free Option */}
          <div className="flex flex-col justify-between rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 shadow-xl relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.85)]" />
                <span className="text-xs font-black tracking-wider text-emerald-400 uppercase">
                  FREE OPTION
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">Free Access</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-black text-emerald-400">FREE</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                Via Vantage Markets or Exness IB registration
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>1 MT4/MT5 account</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>All automated features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Cent &amp; Standard accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Free future updates</span>
                </li>
              </ul>

              <p className="mt-4 text-[11px] leading-relaxed text-zinc-400 border-t border-white/5 pt-3">
                Register a new account under our IB link and complete verification (KYC).
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/free-access"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#34D399] to-[#059669] py-3.5 text-sm font-black text-white shadow-2xl shadow-emerald-500/20 transition-transform hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                Register via My Link
              </Link>
            </div>
          </div>

          {/* Card 2: 5 Accounts */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  DIRECT LICENSE
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">5 Accounts</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$299 USDT</span>
                <span className="text-xs text-zinc-400">/ one-time</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">Perfect for most traders</p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Up to 5 MT4/MT5 accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Use with any broker</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Lifetime license</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Free upgrades to all future versions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => handleOpenPayment("5 Accounts", "$299 USDT")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3.5 text-sm font-black text-white transition-colors hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 cursor-pointer active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Card 3: Unlimited Accounts (Best Value) */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#C9A84C]/50 bg-black/60 p-6 shadow-2xl relative">
            <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-3 py-1 text-[10px] font-black uppercase text-zinc-950 shadow-lg">
              BEST VALUE
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  UNLIMITED ACCESS
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">Unlimited</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black gold-text">$1,065 USDT</span>
                <span className="text-xs text-zinc-400">/ one-time</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">For traders managing multiple accounts</p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <strong className="text-white">Unlimited MT4/MT5 accounts</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Use with any broker</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Includes GTM Bull &amp; GTM Bear EAs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Lifetime license</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Free upgrades to all future versions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Priority 1-on-1 setup support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => handleOpenPayment("Unlimited", "$1,065 USDT")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-3.5 text-sm font-black text-zinc-950 shadow-2xl shadow-[#C9A84C]/25 transition-transform hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Card 4: White-Label */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  WHITE-LABEL
                </span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-black text-white">
                  NEW
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">Your Own Brand</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$4,999</span>
                <span className="text-xs text-zinc-400">/ one-time</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                For trading educators, IBs &amp; signal providers
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>GTM PRO EA under YOUR brand name</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Your name on dashboard, logs, alerts &amp; order comments</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Your website link &amp; contact details</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Unique magic numbers — runs safely alongside other EAs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Optional broker lock</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Same strategy updates as GTM PRO</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Powered by our secure licensing server</span>
                </li>
              </ul>

              <p className="mt-4 text-[11px] leading-relaxed text-zinc-400 border-t border-white/5 pt-3">
                Rebrand only. Trading logic and source code are not included.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://t.me/Ryan_Mitchell_GTMPRO"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 py-3.5 text-sm font-black text-[#E8C97A] transition-colors hover:border-[#C9A84C] hover:bg-[#C9A84C]/20 cursor-pointer active:scale-[0.98]"
              >
                Discuss on Telegram
              </a>
            </div>
          </div>
        </div>

        {/* SOURCE CODE (WIDE CARD BELOW PRICING) */}
        <div className="relative mt-12 rounded-[1.75rem] bg-gradient-to-r from-[#F0D896] via-[#E8C97A] to-[#C9A84C] p-[1.5px] shadow-[0_0_60px_-10px_rgba(201,168,76,0.5)]">
          <div
            id="source-code"
            className="rounded-[calc(1.75rem-1.5px)] bg-[#0c0a06] p-6 pt-10 md:p-8 md:pt-11"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  FOR DEVELOPERS &amp; PARTNERS
                </p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                  Get the <span className="text-[#E8C97A]">Source Code</span>
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                  Full MQL4 &amp; MQL5 source code for GTM PRO v1.0. Read every line, modify the logic, connect it to your own tools, or build something new on top of it.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-300">
                  <span>✓ Full MQL4 (.mq4) &amp; MQL5 (.mq5) source</span>
                  <span>✓ Modify, customize &amp; rebrand</span>
                  <span>✓ No license server lock-in</span>
                  <span>✓ Developer support</span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <div className="text-left sm:text-right">
                  <div className="text-3xl sm:text-4xl font-black text-white">$26,900</div>
                  <span className="text-xs text-zinc-400">
                    One-time payment · Lifetime ownership · No refund
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleOpenPayment("Source Code", "$26,900 USDT")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-6 py-3 text-sm font-black text-zinc-950 hover:brightness-110 active:scale-95 cursor-pointer"
                  >
                    Purchase
                  </button>
                  <a
                    href="https://t.me/Ryan_Mitchell_GTMPRO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 active:scale-95 cursor-pointer"
                  >
                    Discuss on Telegram →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Payment Popup (USDT TRC20 Modal) */}
        {paymentModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto"
            onClick={() => setPaymentModalOpen(false)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl border border-[#C9A84C]/40 bg-[#0d0d10] p-6 sm:p-8 shadow-2xl shadow-black my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Header */}
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {selectedPlan.name === "Source Code"
                    ? "Purchase GTM PRO v1.0 — Source Code"
                    : "Purchase GTM PRO v1.0"}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  Pay with USDT, then confirm on Telegram to activate your license.
                </p>
              </div>

              {/* Plan & Amount Summary */}
              <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-[#C9A84C]/25 bg-[#C9A84C]/[0.05] p-4">
                <div>
                  <span className="block text-[11px] font-black uppercase tracking-wider text-zinc-400">
                    Plan
                  </span>
                  <span className="mt-1 block text-base sm:text-lg font-bold text-white">
                    {selectedPlan.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[11px] font-black uppercase tracking-wider text-zinc-400">
                    Amount
                  </span>
                  <span className="mt-1 block text-base sm:text-lg font-black text-[#E8C97A]">
                    {selectedPlan.price}
                  </span>
                </div>
              </div>

              {/* Network Badge */}
              <div className="mt-4 flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase text-zinc-400">Network</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A84C]/40 bg-black/60 px-3 py-1 font-mono text-xs font-bold text-[#E8C97A]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  TRC20 (Tron)
                </span>
              </div>

              {/* QR Code Container */}
              <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/70 p-4">
                <div className="relative h-44 w-44 overflow-hidden rounded-xl border border-[#C9A84C]/30 bg-white p-2">
                  <Image
                    src="/usdt-qr.png"
                    alt="USDT TRC20 Wallet QR Code"
                    width={200}
                    height={200}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="mt-2 text-[10px] font-mono text-zinc-400">
                  Scan with your crypto wallet (TRC20 network)
                </span>
              </div>

              {/* Wallet Address Box with Copy */}
              <div className="mt-4">
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1.5">
                  Wallet Address:
                </label>
                <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/80 p-3">
                  <span className="font-mono text-xs text-white break-all select-all">
                    {usdtWallet}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyWallet}
                    className="shrink-0 rounded-lg bg-[#C9A84C] px-3 py-1.5 text-xs font-bold text-black transition-all hover:brightness-110 active:scale-95"
                  >
                    {copiedWallet ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Orange Warning Box */}
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/[0.08] p-3 text-xs leading-relaxed text-amber-200">
                <span className="font-bold">⚠ Send USDT on the TRC20 (Tron) network only.</span> Payments sent on any other network cannot be recovered.
              </div>

              {/* Instructions */}
              <p className="mt-4 text-xs leading-relaxed text-zinc-300">
                After payment, send your transaction screenshot and your MT5 account number(s) to our admin on Telegram. Your license will be activated after the payment is confirmed.
              </p>

              {/* Telegram Confirmation Button */}
              <div className="mt-6">
                <a
                  href={`https://t.me/Ryan_Mitchell_GTMPRO?text=Hi%20Ryan,%20I%20have%20sent%20${encodeURIComponent(selectedPlan.price)}%20for%20GTM%20PRO%20${encodeURIComponent(selectedPlan.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-3.5 text-sm font-black text-zinc-950 shadow-lg shadow-[#C9A84C]/25 transition-transform hover:brightness-110 active:scale-[0.98] cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21.5 2L2 9.5l7 3.5 3.5 7L21.5 2z" />
                    <path d="M9 13l5.5-5.5" />
                  </svg>
                  <span>✈ Confirm Payment on Telegram</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
