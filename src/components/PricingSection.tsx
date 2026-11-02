"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultPricing, PricingSettings } from "@/lib/siteSettings";

interface PlanModalInfo {
  name: string;
  price: string;
}

export default function PricingSection() {
  const [pricing, setPricing] = useState<PricingSettings>(defaultPricing);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanModalInfo>({
    name: "5 Accounts",
    price: "$299 USDT",
  });
  const [copiedWallet, setCopiedWallet] = useState(false);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.pricing) {
          setPricing(data.pricing);
        }
      })
      .catch(() => {
        // Fallback to defaultPricing
      });
  }, []);

  const usdtWallet = pricing.usdtWallet || "TJiS8efyHdCcP1vXw6DvvtCRqLv8GzWbs8";
  const telegramLink =
    pricing.telegramLink || "https://t.me/Ryan_Mitchell_GTMPRO";

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
    <section
      id="pricing"
      className="border-y border-white/10 bg-zinc-950 px-5 py-20 sm:px-8 relative"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl text-white">
            {pricing.heading}
          </h2>
          <p className="mt-3 text-base text-zinc-300">{pricing.subheading}</p>
        </div>

        {/* Pricing Cards Grid (4 columns) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Free Option */}
          <div className="flex flex-col justify-between rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 shadow-xl relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.85)]" />
                <span className="text-xs font-black tracking-wider text-emerald-400 uppercase">
                  {pricing.freePlan.badge || "FREE OPTION"}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">
                {pricing.freePlan.title}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-black text-emerald-400">
                  {pricing.freePlan.price}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                {pricing.freePlan.subtitle}
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                {pricing.freePlan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-[11px] leading-relaxed text-zinc-400 border-t border-white/5 pt-3">
                Register a new account under our IB link and complete verification
                (KYC).
              </p>
            </div>

            <div className="mt-8">
              <Link
                href={pricing.freePlan.buttonLink || "/free-access"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#34D399] to-[#059669] py-3.5 text-sm font-black text-white shadow-2xl shadow-emerald-500/20 transition-transform hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                {pricing.freePlan.buttonText || "Register via My Link"}
              </Link>
            </div>
          </div>

          {/* Card 2: 5 Accounts */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  {pricing.fiveAccountsPlan.badge || "DIRECT LICENSE"}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">
                {pricing.fiveAccountsPlan.title}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">
                  {pricing.fiveAccountsPlan.price}
                </span>
                {pricing.fiveAccountsPlan.period && (
                  <span className="text-xs text-zinc-400">
                    {pricing.fiveAccountsPlan.period}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                {pricing.fiveAccountsPlan.subtitle}
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                {pricing.fiveAccountsPlan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#E8C97A] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() =>
                  handleOpenPayment(
                    pricing.fiveAccountsPlan.title,
                    pricing.fiveAccountsPlan.price
                  )
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3.5 text-sm font-black text-white transition-colors hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 cursor-pointer active:scale-[0.98]"
              >
                {pricing.fiveAccountsPlan.buttonText || "Buy Now"}
              </button>
            </div>
          </div>

          {/* Card 3: Unlimited Accounts (Best Value) */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#C9A84C]/50 bg-black/60 p-6 shadow-2xl relative">
            {pricing.unlimitedPlan.tag && (
              <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-3 py-1 text-[10px] font-black uppercase text-zinc-950 shadow-lg">
                {pricing.unlimitedPlan.tag}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  {pricing.unlimitedPlan.badge || "UNLIMITED ACCESS"}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">
                {pricing.unlimitedPlan.title}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black gold-text">
                  {pricing.unlimitedPlan.price}
                </span>
                {pricing.unlimitedPlan.period && (
                  <span className="text-xs text-zinc-400">
                    {pricing.unlimitedPlan.period}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                {pricing.unlimitedPlan.subtitle}
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                {pricing.unlimitedPlan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#E8C97A] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() =>
                  handleOpenPayment(
                    pricing.unlimitedPlan.title,
                    pricing.unlimitedPlan.price
                  )
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-3.5 text-sm font-black text-zinc-950 shadow-2xl shadow-[#C9A84C]/25 transition-transform hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                {pricing.unlimitedPlan.buttonText || "Buy Now"}
              </button>
            </div>
          </div>

          {/* Card 4: White-Label */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  {pricing.whiteLabelPlan.badge || "WHITE-LABEL"}
                </span>
                {pricing.whiteLabelPlan.tag && (
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-black text-white">
                    {pricing.whiteLabelPlan.tag}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-xl font-black text-white">
                {pricing.whiteLabelPlan.title}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">
                  {pricing.whiteLabelPlan.price}
                </span>
                {pricing.whiteLabelPlan.period && (
                  <span className="text-xs text-zinc-400">
                    {pricing.whiteLabelPlan.period}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                {pricing.whiteLabelPlan.subtitle}
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                {pricing.whiteLabelPlan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#E8C97A] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-[11px] leading-relaxed text-zinc-400 border-t border-white/5 pt-3">
                Rebrand only. Trading logic and source code are not included.
              </p>
            </div>

            <div className="mt-8">
              <a
                href={pricing.whiteLabelPlan.buttonLink || telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 py-3.5 text-sm font-black text-[#E8C97A] transition-colors hover:border-[#C9A84C] hover:bg-[#C9A84C]/20 cursor-pointer active:scale-[0.98]"
              >
                {pricing.whiteLabelPlan.buttonText || "Discuss on Telegram"}
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
                  {pricing.sourceCode.badge}
                </p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                  {pricing.sourceCode.title}{" "}
                  <span className="text-[#E8C97A]">
                    {pricing.sourceCode.highlightTitle}
                  </span>
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                  {pricing.sourceCode.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-300">
                  {pricing.sourceCode.features.map((feat, idx) => (
                    <span key={idx}>✓ {feat}</span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <div className="text-left sm:text-right">
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    {pricing.sourceCode.price}
                  </div>
                  <span className="text-xs text-zinc-400">
                    {pricing.sourceCode.subtitle}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenPayment(
                        "Source Code",
                        `${pricing.sourceCode.price} USDT`
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-6 py-3 text-sm font-black text-zinc-950 hover:brightness-110 active:scale-95 cursor-pointer"
                  >
                    Purchase
                  </button>
                  <a
                    href={telegramLink}
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

        {/* Payment Popup (USDT TRC20 Modal) */}
        {paymentModalOpen && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 p-3 sm:p-6 backdrop-blur-md flex justify-center items-start sm:items-center"
            onClick={() => setPaymentModalOpen(false)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl border border-[#C9A84C]/40 bg-[#0d0d10] p-5 sm:p-8 shadow-2xl shadow-black my-4 sm:my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-zinc-900/95 text-zinc-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Close modal"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Header */}
              <div className="border-b border-white/10 pb-4 pr-10">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedPlan.name === "Source Code"
                    ? "Purchase GTM PRO v1.0 — Source Code"
                    : "Purchase GTM PRO v1.0"}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
                  Pay with USDT, then confirm on Telegram to activate your license.
                </p>
              </div>

              {/* Selected Plan Summary Card */}
              <div className="mt-4 rounded-2xl border border-[#C9A84C]/30 bg-gradient-to-r from-[#1c1809]/80 to-[#121008]/80 p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Selected License
                  </span>
                  <span className="text-base font-black text-white">
                    {selectedPlan.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Amount Due
                  </span>
                  <span className="text-lg font-black text-[#E8C97A]">
                    {selectedPlan.price}
                  </span>
                </div>
              </div>

              {/* QR Code */}
              <div className="mt-5 flex flex-col items-center">
                <div className="relative rounded-2xl bg-white p-3 shadow-xl">
                  <Image
                    src="/usdt-qr.png"
                    alt="USDT TRC20 Wallet QR Code"
                    width={180}
                    height={180}
                    className="rounded-lg"
                  />
                </div>
                <span className="mt-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Scan to Pay with USDT (TRC20)
                </span>
              </div>

              {/* Wallet Address Box */}
              <div className="mt-4">
                <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
                  USDT TRC20 Deposit Address:
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-black/70 p-2 pl-3.5">
                  <span className="flex-1 font-mono text-xs sm:text-sm text-white break-all select-all font-semibold">
                    {usdtWallet}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyWallet}
                    className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      copiedWallet
                        ? "bg-emerald-500 text-black font-black"
                        : "bg-[#C9A84C] text-black hover:brightness-110"
                    }`}
                  >
                    {copiedWallet ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Network Warning */}
              <div className="mt-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
                <span className="font-bold">
                  ⚠ Send USDT on the TRC20 (Tron) network only.
                </span>{" "}
                Payments sent on any other network cannot be recovered.
              </div>

              {/* Instructions */}
              <p className="mt-4 text-xs leading-relaxed text-zinc-300">
                After payment, send your transaction screenshot and your MT5
                account number(s) to our admin on Telegram. Your license will be
                activated after the payment is confirmed.
              </p>

              {/* Telegram Confirmation Button */}
              <div className="mt-6">
                <a
                  href={`${telegramLink}?text=Hi%20Ryan,%20I%20have%20sent%20${encodeURIComponent(
                    selectedPlan.price
                  )}%20for%20GTM%20PRO%20${encodeURIComponent(selectedPlan.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-3.5 text-sm font-black text-zinc-950 shadow-lg shadow-[#C9A84C]/25 transition-transform hover:brightness-110 active:scale-[0.98] cursor-pointer"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21.5 2L2 9.5l7 3.5 3.5 7L21.5 2z" />
                    <path d="M9 13l5.5-5.5" />
                  </svg>
                  <span>✈ Confirm Payment on Telegram</span>
                </a>
              </div>

              {/* Close Button at bottom */}
              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="text-xs font-semibold text-zinc-400 hover:text-white py-1.5 px-3 transition-colors cursor-pointer"
                >
                  ✕ Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
