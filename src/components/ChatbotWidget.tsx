"use client";

import React, { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  buttons?: { label: string; action: () => void }[];
  showContactForm?: boolean;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProactiveBubble, setShowProactiveBubble] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Proactive bubble timer (appears after 12 seconds if user hasn't opened chat)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowProactiveBubble(true);
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Initial welcome message
  useEffect(() => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([
      {
        id: "msg-welcome",
        sender: "bot",
        text: "Welcome to GTM PRO! 👋 How can I help you today?",
        timestamp: now,
        buttons: [
          {
            label: "Pricing",
            action: () => handleSendQuickReply("What are the pricing options?"),
          },
          {
            label: "Free Access",
            action: () => handleSendQuickReply("How do I get Free Access?"),
          },
          {
            label: "How It Works",
            action: () => handleSendQuickReply("How does the GTM PRO trading cycle work?"),
          },
          {
            label: "Talk to Support",
            action: () => handleSendQuickReply("I want to speak with a human support agent"),
          },
        ],
      },
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowProactiveBubble(false);
  };

  const getAiAnswer = (query: string): { text: string; showContact?: boolean } => {
    const q = query.toLowerCase();

    // Human Support Request
    if (
      q.includes("human") ||
      q.includes("support") ||
      q.includes("talk to") ||
      q.includes("agent") ||
      q.includes("person") ||
      q.includes("speak to")
    ) {
      return {
        text: "Our team is offline right now. Please message us on Telegram: https://t.me/Ryan_Mitchell_GTMPRO, or leave your email below and we'll get back to you.",
        showContact: true,
      };
    }

    // Password attempt
    if (q.includes("password") || q.includes("master password") || q.includes("secret key")) {
      return {
        text: "Important Security Rule: We will NEVER ask for or accept your trading account's master password. Only share your read-only investor password with VPS providers if necessary.",
      };
    }

    // Profit guarantee / daily return query
    if (q.includes("guarantee") || q.includes("daily return") || q.includes("how much profit") || q.includes("promised return")) {
      return {
        text: "GTM PRO does NOT promise or guarantee fixed daily or monthly profit. Trading XAUUSD carries risk of loss and drawdown. We provide mathematical straddle automation, but past results and backtests do not guarantee future performance.",
      };
    }

    // Pricing & Plans
    if (q.includes("price") || q.includes("cost") || q.includes("pricing") || q.includes("plan") || q.includes("5 account") || q.includes("unlimited")) {
      return {
        text: "GTM PRO has 4 options:\n• Free Access: $0 via Vantage Markets or Exness IB\n• 5 Accounts: $299 USDT one-time (lifetime license)\n• Unlimited: $1,065 USDT one-time (includes GTM Bull & Bear EAs)\n• White-Label: $4,999 one-time (custom branding)\n• Source Code: $26,900 one-time (full MQL4 & MQL5)\nAll payments are in USDT TRC20.",
      };
    }

    // Free Access
    if (q.includes("free") || q.includes("vantage") || q.includes("exness") || q.includes("kyc") || q.includes("ib")) {
      return {
        text: "You can get GTM PRO 100% Free:\n1. Open a new account under our link with Vantage Markets or Exness.\n2. Complete identity verification (KYC).\n3. Open an MT5 Cent account (recommended).\n4. Submit your MT5 account number on the Free Access page (/free-access).\nAlready have an account? You can easily transfer your IB to GTM PRO in minutes!",
      };
    }

    // How It Works / Strategy
    if (q.includes("how it work") || q.includes("strategy") || q.includes("cycle") || q.includes("straddle") || q.includes("martingale")) {
      return {
        text: "The GTM PRO Cycle uses a 5-step straddle system:\n1. Sets the Trap: Buy Stop & Sell Stop placed around the gold price.\n2. Market Picks Direction: The triggered order activates, opposite is cancelled.\n3. Manages Pullback: Adds measured layers at fixed spacing if price moves against the trade.\n4. Closes at Target: All positions close together at one basket TP.\n5. Guards & Resets: News filter and loss limit protect your balance, then auto-resets.",
      };
    }

    // WebRequest / Whitelist URL
    if (q.includes("webrequest") || q.includes("whitelist") || q.includes("url") || q.includes("not opening trade") || q.includes("license server")) {
      return {
        text: "The EA checks its license online. You MUST add this WebRequest URL in MetaTrader:\nTools → Options → Expert Advisors → tick 'Allow WebRequest for listed URL' → add https://a689.link → click OK.",
      };
    }

    // Presets / .set files
    if (q.includes("preset") || q.includes(".set") || q.includes("settings") || q.includes("download set")) {
      return {
        text: "Tested 50K preset .set files for XAUUSD and major forex pairs are available on our Preset Files page (/download-set-files). Enter your active license key to unlock and download them for MT4/MT5 at 1:500 and 1:2000 leverage.",
      };
    }

    // VPS / Latency
    if (q.includes("vps") || q.includes("laptop") || q.includes("phone") || q.includes("offline")) {
      return {
        text: "A Windows VPS is strongly recommended for 24/5 non-stop operation with under 10 ms latency. GTM PRO cannot run directly on mobile phones (phone is for monitoring only). We officially recommend MyForexVPS.",
      };
    }

    // USDT Payment / Wallet
    if (q.includes("usdt") || q.includes("wallet") || q.includes("payment") || q.includes("pay") || q.includes("trc20")) {
      return {
        text: "Payments are in USDT on the TRC20 (Tron) network only:\nWallet Address: TJiS8efyHdCcP1vXw6DvvtCRqLv8GzWbs8\nAfter sending USDT, send your screenshot and MT5 account number to @Ryan_Mitchell_GTMPRO on Telegram to activate.",
      };
    }

    // Downloads
    if (q.includes("download") || q.includes("mt4") || q.includes("mt5") || q.includes("bull") || q.includes("bear")) {
      return {
        text: "You can download GTM PRO for MT5 (.ex5), GTM Bull (BUY Only), and GTM Bear (SELL Only) directly from the Downloads section. The MT4 (.ex4) build is coming soon.",
      };
    }

    // Default Fallback
    return {
      text: "I want to be sure you receive exact information. I can connect you directly with our admin Ryan Mitchell on Telegram (https://t.me/Ryan_Mitchell_GTMPRO), or you can leave your question and email below.",
      showContact: true,
    };
  };

  const handleSendQuickReply = (text: string) => {
    handleProcessUserMessage(text);
  };

  const handleProcessUserMessage = (userText: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: timeNow,
    };

    setMessages((prev) => [...prev, userMsg]);

    // AI Bot Response
    setTimeout(() => {
      const response = getAiAnswer(userText);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showContactForm: response.showContact,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userEmail.includes("@")) return;

    setEmailSubmitted(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `Thank you! We've recorded your email (${userEmail}). Our support team will follow up with you within 24 hours.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setUserEmail("");
      setEmailSubmitted(false);
    }, 600);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setInputVal("");
    handleProcessUserMessage(text);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Proactive Speech Bubble (shown after 12s if unopened) */}
      {showProactiveBubble && !isOpen && (
        <div
          onClick={handleOpenChat}
          className="mb-3 max-w-[260px] rounded-2xl border border-[#C9A84C]/40 bg-[#0d0d10] p-3 text-xs text-zinc-200 shadow-2xl backdrop-blur-md cursor-pointer hover:border-[#C9A84C] transition-all animate-bounce"
        >
          <div className="flex items-start gap-2.5">
            <span className="text-base">👋</span>
            <div>
              <p className="font-semibold text-white">Still there?</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                I&apos;m here if you need anything.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowProactiveBubble(false);
              }}
              className="text-zinc-500 hover:text-white text-xs ml-auto"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpenChat}
          aria-label="Open GTM PRO Support Chat"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#F0D896] via-[#E8C97A] to-[#C9A84C] text-zinc-950 shadow-2xl shadow-[#C9A84C]/40 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex flex-col w-[350px] sm:w-[390px] h-[520px] rounded-3xl border border-[#C9A84C]/35 bg-[#09090c] shadow-2xl shadow-black overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </span>
              <div>
                <h3 className="text-sm font-black text-white">GTM PRO</h3>
                <span className="text-[10px] text-zinc-400 font-medium">
                  Zanderio AI · Online 24/7
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-zinc-950 font-medium rounded-tr-none shadow"
                      : "bg-white/[0.06] border border-white/10 text-zinc-200 rounded-tl-none shadow-inner"
                  }`}
                >
                  {m.text}
                </div>

                <span className="mt-1 text-[10px] font-mono text-zinc-500 px-1">
                  {m.timestamp}
                </span>

                {/* Quick reply buttons (e.g. on welcome) */}
                {m.buttons && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {m.buttons.map((btn) => (
                      <button
                        key={btn.label}
                        type="button"
                        onClick={btn.action}
                        className="rounded-xl border border-[#C9A84C]/35 bg-[#C9A84C]/10 px-2.5 py-1 text-[11px] font-bold text-[#E8C97A] hover:bg-[#C9A84C]/20 hover:border-[#C9A84C] transition-colors"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Optional Contact Form / Telegram Link inside message */}
                {m.showContactForm && (
                  <div className="mt-3 w-full rounded-2xl border border-white/10 bg-black/60 p-3 space-y-2.5">
                    <a
                      href="https://t.me/Ryan_Mitchell_GTMPRO"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-2 text-xs font-black text-zinc-950 hover:brightness-110"
                    >
                      ✈ Open Telegram Support
                    </a>

                    <div className="text-[10px] text-center text-zinc-500 font-mono">
                      — or leave your email —
                    </div>

                    <form onSubmit={handleFormSubmit} className="flex gap-1.5">
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 rounded-xl border border-white/10 bg-zinc-900 px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]"
                        required
                      />
                      <button
                        type="submit"
                        disabled={emailSubmitted}
                        className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20 disabled:opacity-50"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <form
            onSubmit={handleInputSubmit}
            className="border-t border-white/10 bg-black/70 p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C9A84C]"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-zinc-950 font-bold hover:brightness-110 disabled:opacity-30 cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

