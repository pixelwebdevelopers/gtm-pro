"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FaqItem {
  id: string;
  catKey: "basics" | "account" | "risk" | "setup";
  q: string;
  a: string;
}

export default function FaqSection() {
  const [activeCat, setActiveCat] = useState<"basics" | "account" | "risk" | "setup">("basics");
  const [openId, setOpenId] = useState<string | null>("q1");

  const categories = [
    { key: "basics" as const, label: "Basics (6)" },
    { key: "account" as const, label: "Account & Broker (5)" },
    { key: "risk" as const, label: "Capital & Risk (6)" },
    { key: "setup" as const, label: "Setup & Help (3)" },
  ];

  const faqs: FaqItem[] = [
    // TAB 1 — BASICS (6)
    {
      id: "q1",
      catKey: "basics",
      q: "What is GTM PRO?",
      a: "GTM PRO is an Expert Advisor for MetaTrader 4 and MetaTrader 5, built specifically for trading XAUUSD (Gold). It uses a straddle entry, grid recovery, a shared basket take profit, license binding and strict risk controls to manage your trades automatically, based on the settings you choose.",
    },
    {
      id: "q2",
      catKey: "basics",
      q: "Who is GTM PRO for?",
      a: "GTM PRO is for traders who understand the risks of automated trading and are ready to follow the correct setup: the right broker, account type, leverage, lot size, VPS and risk settings. It is not for anyone expecting a fixed profit without being ready to handle floating loss or drawdown.",
    },
    {
      id: "q3",
      catKey: "basics",
      q: "Can GTM PRO be used on MT4 and MT5?",
      a: "Yes. GTM PRO comes as a .ex5 file for MetaTrader 5 and a .ex4 file for MetaTrader 4 (the MT4 version is coming soon). Simply download the file that matches the platform you use.",
    },
    {
      id: "q4",
      catKey: "basics",
      q: "Can I run GTM PRO on a mobile phone?",
      a: "No. The EA must run inside the desktop MT4 or MT5 terminal, on a Windows PC, laptop or VPS. Your phone can only be used to monitor your trades through the MetaTrader mobile app.",
    },
    {
      id: "q5",
      catKey: "basics",
      q: "Which pair does GTM PRO trade?",
      a: "GTM PRO is designed and optimized for XAUUSD (Gold). If you want to use it on other pairs, you must use a special configuration or .set file tested for that pair. Never copy the XAUUSD settings to another pair without checking them first.",
    },
    {
      id: "q6",
      catKey: "basics",
      q: "What strategy does GTM PRO use?",
      a: "GTM PRO places a straddle of pending orders (a Buy Stop and a Sell Stop) around the current price. Once one side is triggered, it manages that trade chain as a basket, using grid spacing, lot scaling (martingale) and a basket take profit, until the whole basket closes in net profit according to your settings.",
    },

    // TAB 2 — ACCOUNT & BROKER (5)
    {
      id: "q7",
      catKey: "account",
      q: "Which brokers can I use?",
      a: "GTM PRO works with any MT4/MT5 broker that offers a suitable Gold symbol, spread, leverage, execution quality and account type. For Free Access, your trading account must first be registered and verified under our partner link with Vantage Markets or Exness.",
    },
    {
      id: "q8",
      catKey: "account",
      q: "I already have a broker account. Can I use it?",
      a: "Please check with our support first. With a Direct License, your existing account can be used if it meets the EA's requirements. For Free Access, your account must be under our partner network, so you will need to transfer your IB/partner to us or open a new account.",
    },
    {
      id: "q9",
      catKey: "account",
      q: "What is the difference between Direct License and Free Access?",
      a: "A Direct License gives you full freedom to use any broker, with no trading-volume conditions. Free Access has no license fee, but it is only activated after we verify that your account is under our partner network with Vantage Markets or Exness.",
    },
    {
      id: "q10",
      catKey: "account",
      q: "Can I use a cent account?",
      a: "Yes, and it is highly recommended, as long as your broker, leverage, spread, symbol name and .set file all match. Cent accounts let you trade live with smaller real capital, but the same risk-management rules still apply.",
    },
    {
      id: "q11",
      catKey: "account",
      q: "Can I use a standard account?",
      a: "Yes. But a standard account needs much more capital, the minimum lot size and more conservative risk settings. If your lot settings are too aggressive, floating loss on a standard account is far larger than on a cent account.",
    },

    // TAB 3 — CAPITAL & RISK (6)
    {
      id: "q12",
      catKey: "risk",
      q: "How much capital do you recommend?",
      a: "GTM PRO can technically run on a cent account with as little as 10,000 USC, but most users choose 50,000 USC or more for a more balanced and comfortable experience. In our recent live forward-testing, 100,000 USC gave the best margin flexibility and stability in changing market conditions. In general, the stronger your capital, the better your account can handle market swings. Choose a capital size that fits your goals and your comfort with risk.",
    },
    {
      id: "q13",
      catKey: "risk",
      q: "What lot size is suitable?",
      a: "Your lot size should be based on your total capital, equity, leverage, account type, spread and the preset you use. Never choose a lot size based only on a profit target. It must match how much floating movement and drawdown your account can handle. The default starting lot is 0.01.",
    },
    {
      id: "q14",
      catKey: "risk",
      q: "Does GTM PRO guarantee profit?",
      a: "No. No trading system or EA can guarantee fixed profit or a risk-free investment. GTM PRO can still face floating loss, drawdown, margin call, stop out and even the loss of your full capital, especially when the market moves strongly in one direction without enough pullback.",
    },
    {
      id: "q15",
      catKey: "risk",
      q: "What is the main risk of GTM PRO?",
      a: "The main risk is rising floating drawdown while grid recovery is active. If the market keeps moving against the open basket, margin use grows quickly. That is why your capital, lot size, leverage, preset, VPS stability and risk-limit settings must be chosen correctly from the start.",
    },
    {
      id: "q16",
      catKey: "risk",
      q: "Can I trade during news?",
      a: "GTM PRO has a built-in news filter that automatically pauses new cycles before and after high-impact news, while open baskets are still managed to take profit. Even so, major events like NFP, CPI and FOMC can cause wider spreads, slippage and very fast moves, so always keep your risk under control around them.",
    },
    {
      id: "q17",
      catKey: "risk",
      q: "Can I withdraw profit anytime?",
      a: "Yes. Withdrawals are made through your broker, not through the EA. Just make sure you keep enough free margin after withdrawing. Avoid large withdrawals while a basket is still open and floating, as this can increase the risk of a sudden margin call or stop out.",
    },

    // TAB 4 — SETUP & HELP (3)
    {
      id: "q18",
      catKey: "setup",
      q: "Do I need a VPS?",
      a: "A VPS is strongly recommended for live trading. The EA needs MetaTrader to stay online 24/5 to open, manage and close positions. If your PC or laptop is turned off, goes to sleep, restarts or loses internet, the EA cannot manage your trades.",
    },
    {
      id: "q19",
      catKey: "setup",
      q: "Why isn't the EA opening trades?",
      a: "Common reasons are: an invalid or expired license, the WebRequest URL not added in MetaTrader settings, the Algo Trading button switched off, the market being closed, the spread being above the allowed limit, a wrong symbol name (suffix), the trading window not having started yet, not enough free margin, or a .set file that doesn't match your account.",
    },
    {
      id: "q20",
      catKey: "setup",
      q: "If I register to get the EA, is an installation service provided?",
      a: "Installation is not included by default, so you will need to install the EA yourself using our guide. If you face a technical problem, our support team can help you check the basics or review the errors in your Experts/Journal tab. Never share your trading account's master password with anyone.",
    },
  ];

  const filteredFaqs = faqs.filter((item) => item.catKey === activeCat);

  return (
    <section id="faq" className="border-t border-white/10 bg-zinc-950 px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-black tracking-wider text-[#E8C97A] uppercase">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Everything you need to know about GTM PRO.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCat(cat.key);
                setOpenId(null);
              }}
              className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                activeCat === cat.key
                  ? "bg-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/20"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-[#C9A84C]/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between p-5 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-4">
                    {item.q}
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-400 text-xs font-bold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 px-5 pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-zinc-300">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Button: Browse All Questions -> /faq */}
        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-8 py-3.5 text-xs sm:text-sm font-black text-zinc-950 shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <span>Browse All Questions →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
