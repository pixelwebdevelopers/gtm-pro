"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnnouncementBar from "./AnnouncementBar";

interface NavLinkItem {
  label: string;
  href: string;
  caption: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on Escape key or window resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Lock background body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks: NavLinkItem[] = [
    {
      label: "Features",
      href: "/#features",
      caption: "Core automation & execution safeguards",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      label: "How It Works",
      href: "/#how-it-works",
      caption: "Repeating straddle cycle & grid logic",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      label: "Preview",
      href: "/#preview",
      caption: "Interactive before & after chart slider",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      label: "Live Results",
      href: "/#live-results",
      caption: "Community proof & Telegram updates",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Pricing",
      href: "/#pricing",
      caption: "5-Account, Unlimited & Source plans",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      ),
    },
    {
      label: "Free Access",
      href: "/free-access",
      caption: "Partner broker onboarding & transfer",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
    },
    {
      label: "Downloads",
      href: "/#download",
      caption: "MT4, MT5, GTM Bull & Bear binaries",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
    },
    {
      label: "FAQ",
      href: "/#faq",
      caption: "Frequently asked questions & guidance",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);

    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace(/^\/#/, "");
      if (targetId === "" || targetId === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
        return;
      }
      let elem = document.getElementById(targetId);
      if (!elem) {
        if (targetId === "how-it-works" || targetId === "how-it-trades") {
          elem = document.getElementById("how-it-works") || document.getElementById("how-it-trades");
        } else if (targetId === "download" || targetId === "downloads") {
          elem = document.getElementById("download") || document.getElementById("downloads");
        } else if (targetId === "live-results" || targetId === "performance") {
          elem = document.getElementById("live-results") || document.getElementById("performance");
        } else if (targetId === "how-to-get-free" || targetId === "free") {
          elem = document.getElementById("how-to-get-free") || document.getElementById("free");
        }
      }

      if (elem) {
        const headerOffset = 90;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
        window.history.pushState(null, "", href.replace("/", ""));
      } else {
        window.location.hash = targetId;
      }
    }
  };

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#070709]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/#top")}
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            title="GTM PRO - Home"
          >
            <div
              style={{ position: "relative" }}
              className="relative h-9 sm:h-10 w-32 sm:w-36 transition-transform hover:scale-[1.02]"
            >
              <Image
                src="/logo.png"
                alt="GTM PRO - Gold Tactical Machine"
                fill
                sizes="(max-width: 768px) 130px, 150px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#E8C97A] transition-colors py-1 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Server status pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.85)]" />
              <span className="font-semibold">Licensing Online</span>
            </div>

            <a
              href="https://t.me/Ryan_Mitchell_GTMPRO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 transition-all cursor-pointer"
              title="Telegram Admin"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2L2 9.5l7 3.5 3.5 7L21.5 2z"></path>
                <path d="M9 13l5.5-5.5"></path>
              </svg>
            </a>

            <a
              href="/#pricing"
              onClick={(e) => handleNavClick(e, "/#pricing")}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-5 py-2.5 text-xs font-black text-zinc-950 shadow-lg shadow-[#C9A84C]/20 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
            >
              Get GTM PRO
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex items-center justify-center p-2.5 text-zinc-300 hover:text-white rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Modern Professional Off-Canvas Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-visibility duration-300 ${
          mobileMenuOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Dark Dim Backdrop with Blur */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Slide-out Sidebar Panel */}
        <aside
          className={`fixed top-0 right-0 bottom-0 w-full max-w-[340px] sm:max-w-[380px] bg-[#09090c] border-l border-[#C9A84C]/20 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Ambient Gold Glow at top of drawer */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C9A84C]/10 blur-3xl pointer-events-none" />

          {/* Top Header of Sidebar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] px-6 py-4.5 bg-black/40 backdrop-blur-sm">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/#top")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="relative h-9 w-28">
                <Image
                  src="/logo.png"
                  alt="GTM PRO"
                  fill
                  sizes="120px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Circular Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-400 hover:text-white hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/15 transition-all cursor-pointer active:scale-95"
              aria-label="Close navigation menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Status Capsule under header */}
          <div className="relative z-10 px-6 pt-4 pb-2">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,.9)]"></span>
                </span>
                <span>Server Licensing Online</span>
              </div>
              <span className="rounded bg-[#C9A84C]/15 px-2 py-0.5 text-[10px] font-black tracking-wider text-[#E8C97A] border border-[#C9A84C]/30">
                v1.0
              </span>
            </div>
          </div>

          {/* Middle Navigation Section */}
          <div className="relative z-10 flex-1 overflow-y-auto px-4 py-2 space-y-1">
            <p className="px-3 pt-2 pb-1 text-[10px] font-black tracking-widest text-[#E8C97A] uppercase">
              Navigation
            </p>

            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group flex items-center justify-between rounded-2xl border border-transparent px-3 py-2.5 transition-all hover:border-[#C9A84C]/25 hover:bg-[#C9A84C]/[0.08] active:scale-[0.98] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors group-hover:border-[#C9A84C]/40 group-hover:bg-[#C9A84C]/15 group-hover:text-[#E8C97A]">
                      <IconComponent className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-zinc-200 transition-colors group-hover:text-white">
                        {link.label}
                      </span>
                      <span className="block text-[11px] text-zinc-500 transition-colors group-hover:text-zinc-400 leading-tight">
                        {link.caption}
                      </span>
                    </div>
                  </div>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-[#E8C97A]"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              );
            })}
          </div>

          {/* Bottom Action Section with CTAs */}
          <div className="relative z-10 border-t border-white/[0.08] bg-black/60 p-5 backdrop-blur-md space-y-3">
            <a
              href="/#pricing"
              onClick={(e) => handleNavClick(e, "/#pricing")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#F0D896] via-[#E8C97A] to-[#C9A84C] py-3.5 text-center text-xs font-black tracking-wide text-zinc-950 shadow-lg shadow-[#C9A84C]/25 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
            >
              <span>Get GTM PRO v1.0</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a
              href="https://t.me/Ryan_Mitchell_GTMPRO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] py-3 text-center text-xs font-bold text-white transition-all hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2AABEE]">
                <path d="M21.5 2L2 9.5l7 3.5 3.5 7L21.5 2z"></path>
                <path d="M9 13l5.5-5.5"></path>
              </svg>
              <span>Telegram: @Ryan_Mitchell_GTMPRO</span>
            </a>

            <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
              <span>GoldTacticalMachine.com</span>
              <span className="text-[#E8C97A]">Cent & Standard</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
