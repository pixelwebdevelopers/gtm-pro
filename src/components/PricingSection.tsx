"use client";

import React, { useState } from "react";

export default function PricingSection() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "Unlimited Accounts", price: "$1,055" });
  const [copiedWallet, setCopiedWallet] = useState(false);

  const usdtWallet = "TM74BDqkK3uoaJpZiFcNNChnj8jXQ3xWrT";

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
    <section id="pricing" className="border-y border-white/10 bg-zinc-950 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl text-white">
            Get GTM PRO
          </h2>
          <p className="mt-3 text-zinc-400">Choose how you want to get started.</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Free Option */}
          <div className="flex flex-col justify-between rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 shadow-xl relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.85)]" />
                <span className="text-xs font-black tracking-wider text-emerald-400 uppercase">
                  Free Option
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">Free Access</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-black text-emerald-400">FREE</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">Via Vantage or VT Markets IB</p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>1 MT4/MT5 Account ID</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>All automated features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Cent & Standard accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Free future updates</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <a
                href="#how-to-get-free"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#34D399] to-[#059669] py-3.5 text-sm font-black text-white shadow-2xl shadow-emerald-500/20 transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                Register via My Link
              </a>
            </div>
          </div>

          {/* Card 2: 5 Accounts */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  Direct License
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">5 Accounts</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$299</span>
                <span className="text-xs text-zinc-500">/ one-time</span>
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
                  <span>Priority support reply</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button
                onClick={() => handleOpenPayment("5 Accounts License", "$299")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3.5 text-sm font-black text-white transition-colors hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Card 3: Unlimited Accounts (Featured) */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#C9A84C]/50 bg-black/60 p-6 shadow-2xl relative">
            <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-3 py-1 text-[10px] font-black uppercase text-zinc-950 shadow-lg">
              Most Popular
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  Unlimited Access
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">Unlimited</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black gold-text">$1,055</span>
                <span className="text-xs text-zinc-500">/ one-time</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">For traders managing multiple accounts</p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <strong className="text-white">Unlimited MT5/MT4 accounts</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Use with any broker</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Includes Yin & Yang EAs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Free upgrades to all future versions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Priority 1-on-1 support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button
                onClick={() => handleOpenPayment("Unlimited Accounts License", "$1,055")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-3.5 text-sm font-black text-zinc-950 shadow-2xl shadow-[#C9A84C]/25 transition-transform hover:brightness-110 active:scale-[0.98]"
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
                  White-Label
                </span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-black text-white">
                  NEW
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">Your Own Brand</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$3,999</span>
                <span className="text-xs text-zinc-500">/ one-time</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">For trading educators, IBs & signal providers</p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>One GTM PRO EA under YOUR brand name</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Your name on dashboard & order comments</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Optional broker lock</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E8C97A] font-bold">✓</span>
                  <span>Powered by our licensing server</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button
                onClick={() => handleOpenPayment("White-Label Enterprise", "$3,999")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3.5 text-sm font-black text-white transition-colors hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Source Code Featured Golden Banner Box */}
        <div className="relative mt-12 rounded-[1.75rem] bg-gradient-to-r from-[#F0D896] via-[#E8C97A] to-[#C9A84C] p-[1.5px] shadow-[0_0_60px_-10px_rgba(201,168,76,0.5)]">
          <div
            id="source-code"
            className="rounded-[calc(1.75rem-1.5px)] bg-[#0c0a06] p-6 pt-10 md:p-8 md:pt-11"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  For developers & partners
                </p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                  Get the <span className="text-[#E8C97A]">Source Code</span>
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                  Full MQL4 & MQL5 source code for GTM PRO v4.2.7. Read every line, modify logic,
                  integrate with proprietary tooling, or build on top of it.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-300">
                  <span>✓ Full MQL4 & MQL5 source</span>
                  <span>✓ Modify, customize, rebrand</span>
                  <span>✓ No license server lock-in</span>
                  <span>✓ Direct developer support</span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <div className="text-left sm:text-right">
                  <div className="text-3xl sm:text-4xl font-black text-white">$25,400</div>
                  <span className="text-xs text-zinc-500">One-time payment · Lifetime ownership</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenPayment("Source Code MQL4/MQL5", "$25,400")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-6 py-3 text-sm font-black text-zinc-950"
                  >
                    Purchase
                  </button>
                  <a
                    href="https://t.me/abangrimba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
                  >
                    Discuss on Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* USDT Payment Modal */}
        {paymentModalOpen && (
          <div className="modal-overlay" onClick={() => setPaymentModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Purchase {selectedPlan.name}</h3>
                  <span className="text-xs text-zinc-400">Direct USDT TRC20 Crypto Payment</span>
                </div>
                <button
                  onClick={() => setPaymentModalOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 mb-5 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase text-zinc-400 font-semibold block">Total</span>
                  <span className="text-2xl font-black text-white">{selectedPlan.price} USDT</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-black text-[#E8C97A] text-xs font-mono font-bold border border-[#C9A84C]/40">
                  TRC20 (Tron)
                </span>
              </div>

              <div className="mb-5">
                <label className="text-xs font-bold uppercase text-zinc-400 block mb-2">
                  TRC20 Wallet Address:
                </label>
                <div className="p-3.5 rounded-xl bg-black border border-white/10 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-white break-all select-all">
                    {usdtWallet}
                  </span>
                  <button
                    onClick={handleCopyWallet}
                    className="px-3 py-1.5 rounded-lg bg-[#C9A84C] text-black text-xs font-bold shrink-0 hover:brightness-110"
                  >
                    {copiedWallet ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mb-6">
                After transfer, send transaction screenshot to <strong>@abangrimba</strong> on Telegram for instant license authorization.
              </p>

              <a
                href={`https://t.me/abangrimba?text=Hi%20Abang%20Rimba,%20I%20have%20sent%20${selectedPlan.price}%20USDT%20for%20the%20${selectedPlan.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-3.5 text-sm font-black text-zinc-950"
              >
                Confirm Payment on Telegram
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
