"use client";

import React, { useState } from "react";

export default function HowToGetFreeSection() {
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [brokerTab, setBrokerTab] = useState<"vantage" | "vtmarkets">("vantage");
  const [copiedVantage, setCopiedVantage] = useState(false);
  const [copiedVtm, setCopiedVtm] = useState(false);

  const vantageTemplate = `To: iskandar.my@vantagemarkets.com
Subject: Account reassign - [Your Full Name]

Dear Iskandar,

Please assist to move my account under IB (26467149).

My registered email: [Your Email]
Trading account number: [Your Account Number]

Thank you.`;

  const vtmTemplate = `To: info@vtmarkets.com
CC: zioon.tan@vtmarkets.com
Subject: Request for IB Transfer

Dear VT Markets,

I would like to formally request to transfer my account to a new IB (28906689).

My registered email: [Your Email]
Trading account number: [Your Account Number]

Previously, I have not received the level of support and guidance I needed to properly develop my IB and trading operations. After communicating with the new IB, I believe they can provide me with better support and help me grow more effectively.

I would sincerely appreciate it if VT Markets could review my request and assist with the IB transfer.

Thank you.`;

  const handleCopyVantage = () => {
    navigator.clipboard.writeText(vantageTemplate);
    setCopiedVantage(true);
    setTimeout(() => setCopiedVantage(false), 2500);
  };

  const handleCopyVtm = () => {
    navigator.clipboard.writeText(vtmTemplate);
    setCopiedVtm(true);
    setTimeout(() => setCopiedVtm(false), 2500);
  };

  return (
    <section id="how-to-get-free" className="relative px-5 py-20 sm:px-8 bg-[#050505]">
      <div id="free" className="absolute -top-24 pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black tracking-wider text-[#E8C97A] uppercase">
            Free Access
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl text-white">
            How to Get <span className="text-[#E8C97A]">Free Access</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Follow these simple steps to get GTM PRO for free.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Step 1 */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 flex flex-col justify-between">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C9A84C] text-sm font-black text-zinc-950">
                01
              </span>
              <h3 className="mt-4 text-lg font-black text-white">Register via My Link</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Register a new account with Vantage or VT Markets using our authorized referral link below.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="https://vigco.co/la-scom-inv/ms/uN60VTqp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 py-2.5 text-xs font-bold text-white hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]/40"
              >
                Vantage Markets
              </a>
              <a
                href="https://www.vtmarkets.com/trade-now/?affid=Mjg5MDY2ODk=&invitecode=7pc9aIyg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 py-2.5 text-xs font-bold text-white hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]/40"
              >
                VT Markets
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 flex flex-col justify-between">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C9A84C] text-sm font-black text-zinc-950">
                02
              </span>
              <h3 className="mt-4 text-lg font-black text-white">Complete KYC (Verification)</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Fully verify your identity (ID & proof of address) inside the broker portal. Required before trading.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-zinc-500">
              Identity document + address verification
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 flex flex-col justify-between">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C9A84C] text-sm font-black text-zinc-950">
                03
              </span>
              <h3 className="mt-4 text-lg font-black text-white">Open MT5 Account</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Cent account recommended with 1:500 or 1:2000 leverage. 50,000 USC provides optimal margin flexibility.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 text-[11px] text-emerald-400 font-semibold">
              Cent Account · 1:500 Leverage · 50k USC
            </div>
          </div>

          {/* Step 4 */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 flex flex-col justify-between">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C9A84C] text-sm font-black text-zinc-950">
                04
              </span>
              <h3 className="mt-4 text-lg font-black text-white">Send Details</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Send your MT5 Account ID and registered email on Telegram for instant server license binding.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="https://t.me/abangrimba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-2.5 text-xs font-black text-zinc-950"
              >
                Send on Telegram
              </a>
            </div>
          </div>
        </div>

        {/* IB Transfer callout card */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-950/60 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-black text-white">
              Already Registered? Not Under Our Link?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
              If you already have a Vantage or VT Markets account, you can request an IB transfer to switch under our network and qualify for free access.
            </p>
          </div>
          <button
            onClick={() => setTransferModalOpen(true)}
            className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-6 py-3 text-xs font-bold text-[#E8C97A] hover:bg-[#C9A84C]/20 transition-all"
          >
            IB Transfer Instructions
          </button>
        </div>

        {/* Modal */}
        {transferModalOpen && (
          <div className="modal-overlay" onClick={() => setTransferModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <h3 className="text-lg font-bold text-white">IB Transfer Instructions</h3>
                <button
                  onClick={() => setTransferModalOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setBrokerTab("vantage")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    brokerTab === "vantage"
                      ? "bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-zinc-950"
                      : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  Vantage Markets (IB: 26467149)
                </button>
                <button
                  onClick={() => setBrokerTab("vtmarkets")}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    brokerTab === "vtmarkets"
                      ? "bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-zinc-950"
                      : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  VT Markets (IB: 28906689)
                </button>
              </div>

              {brokerTab === "vantage" ? (
                <div>
                  <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs text-zinc-300 font-mono whitespace-pre-wrap mb-4">
                    {vantageTemplate}
                  </pre>
                  <button
                    onClick={handleCopyVantage}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#C9A84C] py-2.5 text-xs font-black text-zinc-950"
                  >
                    {copiedVantage ? "Copied! ✓" : "Copy Vantage Template"}
                  </button>
                </div>
              ) : (
                <div>
                  <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs text-zinc-300 font-mono whitespace-pre-wrap mb-4">
                    {vtmTemplate}
                  </pre>
                  <button
                    onClick={handleCopyVtm}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#C9A84C] py-2.5 text-xs font-black text-zinc-950"
                  >
                    {copiedVtm ? "Copied! ✓" : "Copy VT Markets Template"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
