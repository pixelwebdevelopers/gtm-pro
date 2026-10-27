"use client";

import React, { useState } from "react";

interface FaqItem {
  id: string;
  catKey: string;
  q: string;
  a: string;
}

export default function FaqSection() {
  const [activeCat, setActiveCat] = useState("1");
  const [openId, setOpenId] = useState<string | null>("q1");

  const categories = [
    { key: "1", label: "Basics" },
    { key: "2", label: "Account & Broker" },
    { key: "3", label: "Capital & Risk" },
    { key: "4", label: "Setup & Help" },
  ];

  const faqs: FaqItem[] = [
    // Cat 1: Basics
    {
      id: "q1",
      catKey: "1",
      q: "What is GTM PRO?",
      a: "GTM PRO is an Expert Advisor for MetaTrader 4 and MetaTrader 5, built specifically for XAUUSD (Gold) trading. It uses a straddle-entry strategy, grid recovery, basket take profit, license binding, and strict risk control to manage trades automatically according to your configured settings.",
    },
    {
      id: "q2",
      catKey: "1",
      q: "Who is GTM PRO for?",
      a: "GTM PRO suits traders who understand the risks of automated trading and are ready to follow the correct standard setup (broker choice, account type, leverage, lot size, VPS use, and risk settings). It is not for users who expect fixed profit without being willing to face floating loss or drawdown.",
    },
    {
      id: "q3",
      catKey: "1",
      q: "Can GTM PRO be used on MT4 and MT5?",
      a: "Yes. The current official release provides builds for both platforms — a .ex4 file for MetaTrader 4 and a .ex5 file for MetaTrader 5. Just pick the file that matches the MetaTrader platform you use.",
    },
    {
      id: "q4",
      catKey: "1",
      q: "Can I run GTM PRO on a mobile phone?",
      a: "No. A phone is only for monitoring trade activity through the mobile MetaTrader app. The EA file must run inside a desktop MT4 or MT5 terminal installed on a Windows PC/laptop or a VPS.",
    },
    {
      id: "q5",
      catKey: "1",
      q: "Do I need a VPS?",
      a: "A Virtual Private Server (VPS) is strongly recommended for live trading. The EA needs the MetaTrader terminal online 24/5 to open, manage, and close positions. If your PC or laptop is turned off, in sleep mode, restarting, or loses internet, the EA cannot work to manage your trades.",
    },

    // Cat 2: Account & Broker
    {
      id: "q6",
      catKey: "2",
      q: "Which brokers can I use?",
      a: "GTM PRO can work on any MT4/MT5 broker that provides a suitable symbol, spread, leverage, execution quality, and account type. For the Free Access program, the trading account must first be registered under our supported IB (Introducing Broker) network and verified.",
    },
    {
      id: "q7",
      catKey: "2",
      q: "I already have a broker account. Can I use it?",
      a: "Please check with support first. For a Direct License subscription, an existing broker account may be considered if its specifications meet the EA's technical requirements. For the Free Access program, the account must be under our IB network; otherwise you will need to do an IB transfer or open a new account.",
    },
    {
      id: "q8",
      catKey: "2",
      q: "What is the difference between Direct License and Free Access?",
      a: "Direct License gives users full flexibility to use any broker of their own choice without volume conditions. Free Access is a program with no monthly license fee, but license activation depends entirely on verifying the account status under the IB broker network we support.",
    },
    {
      id: "q9",
      catKey: "2",
      q: "Can I use a cent account?",
      a: "Yes, a cent account is highly recommended when the broker, leverage type, spread, symbol suffix, and set file used all match. Cent accounts are typically used for live testing sessions with smaller real capital, but risk-management principles still apply.",
    },
    {
      id: "q10",
      catKey: "2",
      q: "Can I use a standard account?",
      a: "Yes, a standard account can be used. However, it requires far larger capital, minimum lot sizes, and more conservative risk settings. Floating loss on a standard account is far larger than on a cent account if lot settings are too aggressive.",
    },

    // Cat 3: Capital & Risk
    {
      id: "q11",
      catKey: "3",
      q: "How much capital do you recommend?",
      a: "While GTM PRO can technically run on a cent account with as low as 10,000 USC, most of our users opt for 50,000 USC or higher for a more balanced and comfortable trading experience. In our recent live forward-testing, a capital size of 100,000 USC has delivered the strongest margin flexibility and stability during changing, unpredictable market conditions. Choose a capital size that fits your financial goals and risk comfort zone.",
    },
    {
      id: "q12",
      catKey: "3",
      q: "What lot size is suitable?",
      a: "Lot size must be calculated and decided based on total capital, equity, leverage, account type, spread, and the loaded preset. Never choose lot size based on a profit target alone; lot size must be based on the account's ability to withstand the impact of floating movement and market drawdown. The default start is 0.01.",
    },
    {
      id: "q13",
      catKey: "3",
      q: "Which pair does GTM PRO trade?",
      a: "GTM PRO's main focus and logic optimization is specifically for the XAUUSD (Gold) market. If you intend to use it on other currency pairs, you must use a special configuration or set file that has been tested for that pair. Never copy the XAUUSD settings directly to another pair without a technical review.",
    },
    {
      id: "q14",
      catKey: "3",
      q: "What strategy does GTM PRO use?",
      a: "GTM PRO uses a straddle pending-order system (BuyStop & SellStop) around the current market price. Once one direction is triggered, the EA begins managing that transaction chain (basket) using grid distance, lot scaling (martingale), and basket take profit until the entire position is closed net according to the target settings.",
    },
    {
      id: "q15",
      catKey: "3",
      q: "Does GTM PRO guarantee profit?",
      a: "No. No trading system or EA can guarantee fixed profit or risk-free investment. GTM PRO remains exposed to floating loss, drawdown, margin call, stop out, and full capital loss, especially when the market moves sharply in one direction without enough price retracement.",
    },
    {
      id: "q16",
      catKey: "3",
      q: "What is the main risk of GTM PRO?",
      a: "The main risk is rising floating drawdown while the grid recovery phase is actively running. If the market keeps driving against the active basket's direction, margin exposure rises sharply. That is why compliance with the capital ratio, lot, leverage, VPS stability, and risk-limit settings must be chosen correctly from the start.",
    },
    {
      id: "q17",
      catKey: "3",
      q: "Can I trade during news?",
      a: "High-impact news such as NFP, CPI, FOMC, and other major Gold events can cause widening spreads, slippage, and extremely fast market moves in a short period. Users are strongly advised to reduce account risk by closing pending orders or stopping new entry cycles manually before major news is released, to avoid overly volatile market shocks.",
    },
    {
      id: "q18",
      catKey: "3",
      q: "Can I withdraw profit anytime?",
      a: "Withdrawals are handled entirely through your broker's system, not through EA functions. However, you must ensure free margin remains sufficient after the withdrawal is done. Avoid making very large withdrawals while the account has active floating baskets, as it can spike the risk of a sudden margin call or stop out.",
    },

    // Cat 4: Setup & Help
    {
      id: "q19",
      catKey: "4",
      q: "Why isn't the EA opening trades?",
      a: "Common causes include an invalid/expired license status, the WebRequest URL domain not yet allowed in settings, the Algo/AutoTrading button turned off on the terminal, a closed market session, current spread exceeding the maximum limit, a wrong symbol suffix on the broker, the trading window not yet started, insufficient free margin, or a set file that does not match the account specifications.",
    },
    {
      id: "q20",
      catKey: "4",
      q: "If I register to get the EA, is an installation service provided?",
      a: "An installation service is not provided by default. Users must install it themselves. Support is ready to help check basic information or review error logs in the Experts/Journal tab if you face technical problems, but users must never share their trading account password (master password) with anyone.",
    },
  ];

  const filteredFaqs = faqs.filter((f) => f.catKey === activeCat);

  return (
    <section id="faq" className="border-y border-white/10 bg-zinc-950 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-sm font-black tracking-wider text-[#E8C97A] uppercase">
          FAQ
        </p>
        <h2 className="mt-3 text-center text-4xl font-black tracking-tight text-white sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-sm text-zinc-400">
          Everything you need to know about GTM PRO.
        </p>

        {/* Category Filter Pills */}
        <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-2 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setActiveCat(c.key);
                setOpenId(null);
              }}
              className={`w-full rounded-full px-5 py-2.5 text-center text-xs font-bold tracking-wide transition-all sm:w-auto ${
                activeCat === c.key
                  ? "bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-zinc-950 shadow-md font-black"
                  : "bg-white/[0.04] text-zinc-300 ring-1 ring-white/10 hover:text-white"
              }`}
            >
              {c.label}
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
                className={`overflow-hidden rounded-3xl border bg-white/[0.03] transition-colors ${
                  isOpen ? "border-[#C9A84C]/40 bg-[#C9A84C]/[0.02]" : "border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-black text-white hover:text-[#E8C97A] transition-colors"
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition-transform ${
                      isOpen
                        ? "bg-[#C9A84C] text-black rotate-180 font-black"
                        : "bg-white/10 text-zinc-400"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-6 py-4 text-xs sm:text-sm leading-relaxed text-zinc-400">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://t.me/abangrimba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/[0.04] px-6 py-3 text-sm font-black text-white ring-1 ring-white/10 transition-colors hover:bg-white/[0.08]"
          >
            Have More Questions? Ask on Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
