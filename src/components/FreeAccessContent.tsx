"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function FreeAccessContent() {
  // Modals state
  const [popupAOpen, setPopupAOpen] = useState(false);
  const [popupBOpen, setPopupBOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Copy states
  const [copiedVantageLink, setCopiedVantageLink] = useState(false);
  const [copiedVantageCode, setCopiedVantageCode] = useState(false);
  const [copiedExnessLink, setCopiedExnessLink] = useState(false);
  const [copiedExnessCode, setCopiedExnessCode] = useState(false);

  // Popup A copy states
  const [copiedToEmail, setCopiedToEmail] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  // Popup B copy states
  const [copiedExnessPartnerLink, setCopiedExnessPartnerLink] = useState(false);
  const [copiedExnessPartnerDomain, setCopiedExnessPartnerDomain] = useState(false);

  // Form states
  const [broker, setBroker] = useState("Vantage Markets");
  const [accountNumber, setAccountNumber] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const vantageLink = "https://vigco.co/la-com-inv/9XhUYs8x";
  const vantageCode = "9XhUYs8x";
  const exnessLink = "https://one.toexness.com/a/53of1lwuw5";
  const exnessCode = "53of1lwuw5";

  const vantageEmailBody = `Dear Paula,

I would like to request the transfer of my trading account under IB 32375654.
Please proceed with my request.

My registered email: [Your Email]

Thank you.
[Your Name]`;

  const handleCopy = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2200);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/free-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ broker, accountNumber, email, telegram }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToStep4 = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("step-04");
    if (elem) {
      const offset = elem.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full bg-[#C9A84C]/10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="mx-auto max-w-3xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black tracking-widest text-emerald-400 uppercase shadow-md shadow-emerald-500/10">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>FREE ACCESS</span>
        </div>

        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Get GTM PRO <span className="text-emerald-400">Free</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-zinc-300">
          Open a verified account with one of our partner brokers and get full access to GTM PRO at no cost. It takes about 10 minutes.
        </p>

        {/* Step bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5 text-[#E8C97A]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A84C] text-[10px] font-black text-black">1</span>
            Choose Your Broker
          </span>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-black text-white">2</span>
            Verify Your Account
          </span>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-black text-white">3</span>
            Open an MT5 Account
          </span>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-black text-white">4</span>
            Claim Your Free Access
          </span>
        </div>

        {/* Small skip link */}
        <div className="mt-3">
          <a
            href="#step-04"
            onClick={scrollToStep4}
            className="text-xs font-medium text-zinc-400 hover:text-[#E8C97A] transition-colors underline underline-offset-4 decoration-zinc-600 cursor-pointer"
          >
            Already done these steps? Skip to the form ↓
          </a>
        </div>
      </div>

      {/* STEP 01: REGISTER VIA MY LINK (TWO BOXES SIDE BY SIDE) */}
      <div className="mt-14 relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] font-black text-xs text-black shadow-md">
            01
          </span>
          <div>
            <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase block">
              STEP 01
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              REGISTER VIA MY LINK
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Box A — Vantage Markets */}
          <div className="rounded-3xl border border-white/15 bg-zinc-950/80 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:border-[#C9A84C]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  BOX A — PARTNER BROKER
                </span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
                  Verified
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-black text-white">Vantage Markets</h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Open a new Vantage Markets account using our referral link.
              </p>

              <div className="mt-6">
                <a
                  href={vantageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-3.5 text-sm font-black text-zinc-950 shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Register New Account (Under My Link) →
                </a>
              </div>

              {/* Referral details */}
              <div className="mt-5 space-y-2.5 rounded-2xl border border-white/10 bg-black/60 p-3.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">Referral Link:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-300 truncate max-w-[170px] sm:max-w-[210px]">
                      {vantageLink}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(vantageLink, setCopiedVantageLink)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#C9A84C] hover:text-black font-semibold text-[11px] transition-colors"
                    >
                      {copiedVantageLink ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                  <span className="text-zinc-400">Referral Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#E8C97A]">{vantageCode}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(vantageCode, setCopiedVantageCode)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#C9A84C] hover:text-black font-semibold text-[11px] transition-colors"
                    >
                      {copiedVantageCode ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={() => setPopupAOpen(true)}
                className="text-xs font-semibold text-[#E8C97A] hover:text-white underline underline-offset-4 decoration-[#E8C97A]/40 transition-colors cursor-pointer"
              >
                I Already Have an Account — Transfer my account to your IB →
              </button>
            </div>
          </div>

          {/* Box B — Exness */}
          <div className="rounded-3xl border border-white/15 bg-zinc-950/80 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:border-[#C9A84C]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase">
                  BOX B — PARTNER BROKER
                </span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
                  Verified
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-black text-white">Exness</h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Open a new Exness account using our partner link.
              </p>

              <div className="mt-6">
                <a
                  href={exnessLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-3.5 text-sm font-black text-zinc-950 shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Register New Account (Under My Link) →
                </a>
              </div>

              {/* Partner details */}
              <div className="mt-5 space-y-2.5 rounded-2xl border border-white/10 bg-black/60 p-3.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">Partner Link:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-300 truncate max-w-[170px] sm:max-w-[210px]">
                      {exnessLink}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(exnessLink, setCopiedExnessLink)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#C9A84C] hover:text-black font-semibold text-[11px] transition-colors"
                    >
                      {copiedExnessLink ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                  <span className="text-zinc-400">Partner Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#E8C97A]">{exnessCode}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(exnessCode, setCopiedExnessCode)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#C9A84C] hover:text-black font-semibold text-[11px] transition-colors"
                    >
                      {copiedExnessCode ? "Copied! ✓" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={() => setPopupBOpen(true)}
                className="text-xs font-semibold text-[#E8C97A] hover:text-white underline underline-offset-4 decoration-[#E8C97A]/40 transition-colors cursor-pointer"
              >
                I Already Have an Account — Change my partner to GTM PRO →
              </button>
            </div>
          </div>
        </div>

        {/* Warning box (under both) */}
        <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/[0.08] p-4 text-xs sm:text-sm text-amber-200 flex items-center gap-3">
          <span className="text-lg shrink-0">⚠</span>
          <span>
            <strong>Your account must be registered under our link.</strong> Accounts under a different IB or partner are not eligible.
          </span>
        </div>
      </div>

      {/* STEP 02 & STEP 03: TWO COLUMN TILES */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 relative z-10">
        {/* STEP 02: COMPLETE VERIFICATION (KYC) */}
        <div className="rounded-3xl border border-white/15 bg-zinc-950/80 p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 font-black text-xs text-white">
              02
            </span>
            <div>
              <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase block">
                STEP 02
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                COMPLETE VERIFICATION (KYC)
              </h2>
            </div>
          </div>
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
            Fully verify your identity inside your broker&apos;s app or website (ID and proof of address). Your broker requires this before you can trade.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-3.5 text-xs text-zinc-400 flex items-center gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Government ID + Proof of Residence verified inside broker portal</span>
          </div>
        </div>

        {/* STEP 03: OPEN AN MT5 TRADING ACCOUNT */}
        <div className="rounded-3xl border border-white/15 bg-zinc-950/80 p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 font-black text-xs text-white">
              03
            </span>
            <div>
              <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase block">
                STEP 03
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                OPEN AN MT5 TRADING ACCOUNT
              </h2>
            </div>
          </div>
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
            Create a new MT5 trading account inside Vantage Markets or Exness.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-4 text-xs space-y-1.5">
            <div className="font-bold text-[#E8C97A] uppercase tracking-wider text-[11px]">
              Recommended account setup:
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <span className="text-emerald-400">●</span>
              <span><strong>Platform:</strong> MetaTrader 5</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <span className="text-emerald-400">●</span>
              <span><strong>Account type:</strong> Cent account (recommended)</span>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 04: CLAIM YOUR FREE ACCESS (FORM) */}
      <div id="step-04" className="mt-14 relative z-10">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#C9A84C]/35 bg-[#090807] p-6 sm:p-10 shadow-2xl shadow-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C9A84C]/10 blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] font-black text-xs text-black">
              04
            </span>
            <div>
              <span className="text-xs font-black tracking-wider text-[#E8C97A] uppercase block">
                STEP 04
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                CLAIM YOUR FREE ACCESS
              </h2>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
            Enter your MT5 account number and registered email. We&apos;ll verify your account and send your GTM PRO access details to your email.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-2xl font-bold">
                ✓
              </div>
              <h3 className="mt-3 text-lg font-black text-white">Submission Received!</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-emerald-200 max-w-md mx-auto">
                Thank you! We&apos;ve received your details. Our team will verify your account and email your access details within 24 hours.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <a
                  href="https://t.me/Ryan_Mitchell_GTMPRO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20"
                >
                  Telegram Admin: @Ryan_Mitchell_GTMPRO
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="mt-8 space-y-4">
              {formError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                  {formError}
                </div>
              )}

              {/* Field 1: Broker */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                  Broker
                </label>
                <select
                  value={broker}
                  onChange={(e) => setBroker(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white focus:border-[#C9A84C] focus:outline-none"
                  required
                >
                  <option value="Vantage Markets">Vantage Markets</option>
                  <option value="Exness">Exness</option>
                </select>
              </div>

              {/* Field 2: MT5 Account Number */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                  MT5 Account Number
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="12345678"
                  className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#C9A84C] focus:outline-none"
                  required
                />
              </div>

              {/* Field 3: Registered Email */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                  Registered Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#C9A84C] focus:outline-none"
                  required
                />
              </div>

              {/* Field 4: Telegram (optional) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-300">
                    Telegram <span className="text-zinc-500 font-normal">(optional)</span>
                  </label>
                  <span className="text-[11px] text-zinc-500">
                    So we can reach you quickly if there is a problem.
                  </span>
                </div>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@username"
                  className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#C9A84C] focus:outline-none"
                />
              </div>

              {/* Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] via-[#E8C97A] to-[#C9A84C] py-4 text-sm font-black text-zinc-950 shadow-2xl shadow-[#C9A84C]/25 transition-transform hover:brightness-110 active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Verify & Get Access"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* POPUP A — VANTAGE MARKETS: ALREADY REGISTERED? */}
      {popupAOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto"
          onClick={() => setPopupAOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-[#C9A84C]/40 bg-[#0d0d10] p-6 sm:p-8 shadow-2xl shadow-black my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setPopupAOpen(false)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl sm:text-2xl font-black text-white pr-8">
              Already Have a Vantage Markets Account?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              No problem. Just ask Vantage Markets to move your account under our IB. Copy the email below and send it from your registered email address.
            </p>

            <div className="mt-6 space-y-4">
              {/* To field */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  To:
                </label>
                <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/70 p-3">
                  <span className="font-mono text-xs text-white break-all">
                    paula.schuppel@vantagemarkets.com
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy("paula.schuppel@vantagemarkets.com", setCopiedToEmail)}
                    className="shrink-0 rounded-lg bg-[#C9A84C] px-3 py-1 text-xs font-bold text-black hover:brightness-110"
                  >
                    {copiedToEmail ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Subject field */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Subject:
                </label>
                <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/70 p-3">
                  <span className="font-mono text-xs text-white">
                    IB Transfer Request (Your Name)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy("IB Transfer Request (Your Name)", setCopiedSubject)}
                    className="shrink-0 rounded-lg bg-[#C9A84C] px-3 py-1 text-xs font-bold text-black hover:brightness-110"
                  >
                    {copiedSubject ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Body field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase text-zinc-400">
                    Body:
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(vantageEmailBody, setCopiedBody)}
                    className="rounded-lg bg-[#C9A84C] px-3 py-1 text-xs font-bold text-black hover:brightness-110"
                  >
                    {copiedBody ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
                <pre className="rounded-xl border border-white/10 bg-black/70 p-3.5 font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed select-all">
                  {vantageEmailBody}
                </pre>
              </div>
            </div>

            <p className="mt-5 text-[11px] text-zinc-400 italic border-t border-white/10 pt-3">
              Please wait for Vantage Markets to confirm the transfer before you request GTM PRO activation.
            </p>
          </div>
        </div>
      )}

      {/* POPUP B — EXNESS: ALREADY HAVE AN EXNESS ACCOUNT? */}
      {popupBOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto"
          onClick={() => setPopupBOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl border border-[#C9A84C]/40 bg-[#0d0d10] p-6 sm:p-8 shadow-2xl shadow-black my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setPopupBOpen(false)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl sm:text-2xl font-black text-white pr-8">
              Already Have an Exness Account?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              You can move your account to GTM PRO as your partner in a few minutes, directly from the Exness app.
            </p>

            {/* Steps with matching screenshots */}
            <div className="mt-6 space-y-6">
              {/* Step 1 */}
              <div className="grid gap-3 sm:grid-cols-[1.2fr_.8fr] items-center rounded-2xl border border-white/10 bg-black/60 p-4">
                <div>
                  <span className="text-[11px] font-black text-[#E8C97A] uppercase tracking-wider block">
                    Step 1
                  </span>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-white">
                    Open the Exness mobile app and tap <strong>Profile</strong> (bottom right).
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-400">
                    Follow the red arrow directly to Profile.
                  </p>
                </div>
                <div
                  className="relative h-44 w-full cursor-pointer rounded-xl overflow-hidden border border-white/10 group"
                  onClick={() => setPreviewImage("/exness-step-1.jpg")}
                  title="Click to zoom screenshot"
                >
                  <Image
                    src="/exness-step-1.jpg"
                    alt="Exness Step 1 Profile"
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-[#E8C97A]">
                    Tap to zoom 🔍
                  </span>
                </div>
              </div>

              {/* Step 2 & 3 & 4 */}
              <div className="grid gap-3 sm:grid-cols-[1.2fr_.8fr] items-center rounded-2xl border border-white/10 bg-black/60 p-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-black text-[#E8C97A] uppercase tracking-wider block">
                    Steps 2 — 4
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-200">
                    <strong>2.</strong> Scroll down to <strong>Support</strong> and tap <strong>LiveChat</strong>.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-200">
                    <strong>3.</strong> Type: <span className="font-mono text-[#E8C97A] bg-white/5 px-1 py-0.5 rounded">&quot;I want to change my IB&quot;</span> and send it.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-200">
                    <strong>4.</strong> The Exness Assistant will reply with a link. Tap <strong>Link</strong> to open the Partner Change form.
                  </p>
                </div>
                <div
                  className="relative h-44 w-full cursor-pointer rounded-xl overflow-hidden border border-white/10 group"
                  onClick={() => setPreviewImage("/exness-step-2.jpg")}
                  title="Click to zoom screenshot"
                >
                  <Image
                    src="/exness-step-2.jpg"
                    alt="Exness Step 2 Assistant Link"
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-[#E8C97A]">
                    Tap to zoom 🔍
                  </span>
                </div>
              </div>

              {/* Step 5 & 6 */}
              <div className="grid gap-3 sm:grid-cols-[1.2fr_.8fr] items-center rounded-2xl border border-white/10 bg-black/60 p-4">
                <div>
                  <span className="text-[11px] font-black text-[#E8C97A] uppercase tracking-wider block">
                    Steps 5 — 6
                  </span>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-white">
                    5. Fill in the form:
                  </p>
                  <ul className="mt-2 space-y-2 text-xs text-zinc-300">
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#E8C97A]">●</span>
                      <span><strong>Select reason:</strong> choose any reason</span>
                    </li>
                    <li className="border-t border-white/5 pt-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <span><strong>New partner&apos;s link:</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy(exnessLink, setCopiedExnessPartnerLink)}
                          className="px-2 py-0.5 rounded bg-[#C9A84C] text-[10px] font-bold text-black"
                        >
                          {copiedExnessPartnerLink ? "Copied! ✓" : "Copy"}
                        </button>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400 break-all block mt-0.5">
                        {exnessLink}
                      </span>
                    </li>
                    <li className="border-t border-white/5 pt-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <span><strong>Where did you find your partner?:</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy("www.goldtacticalmachine.com", setCopiedExnessPartnerDomain)}
                          className="px-2 py-0.5 rounded bg-[#C9A84C] text-[10px] font-bold text-black"
                        >
                          {copiedExnessPartnerDomain ? "Copied! ✓" : "Copy"}
                        </button>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400 block mt-0.5">
                        www.goldtacticalmachine.com
                      </span>
                    </li>
                    <li className="border-t border-white/5 pt-1.5">
                      <span><strong>Leave a comment:</strong> optional</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-200">
                    <strong>6.</strong> Tap <strong>Submit</strong>, then confirm with the code Exness sends you and tap <strong>Continue</strong>.
                  </p>
                </div>
                <div
                  className="relative h-48 w-full cursor-pointer rounded-xl overflow-hidden border border-white/10 group"
                  onClick={() => setPreviewImage("/exness-step-3.jpg")}
                  title="Click to zoom screenshot"
                >
                  <Image
                    src="/exness-step-3.jpg"
                    alt="Exness Step 3 Partner Change Form"
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-[#E8C97A]">
                    Tap to zoom 🔍
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-[11px] text-zinc-400 italic border-t border-white/10 pt-3">
              Exness processes partner changes within 3 business days. Please wait for confirmation before you request GTM PRO activation.
            </p>
          </div>
        </div>
      )}

      {/* Full Size Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-h-[92vh] max-w-sm w-full h-[85vh]">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white font-bold text-sm bg-white/20 px-3 py-1 rounded-full"
            >
              Close ✕
            </button>
            <Image
              src={previewImage}
              alt="Enlarged Step Screenshot"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

