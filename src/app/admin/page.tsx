"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SiteSettings,
  defaultSiteSettings,
} from "@/lib/siteSettingsTypes";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [originalSettings, setOriginalSettings] =
    useState<SiteSettings>(defaultSiteSettings);
  const [activeTab, setActiveTab] = useState<
    "offer" | "stats" | "pricing" | "system"
  >("offer");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveToast, setSaveToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Check auth status on load
  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
          loadSettings();
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  // Prevent scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        setOriginalSettings(data);
      }
    } catch (err) {
      console.error("Failed to load settings", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        loadSettings();
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch {
      setLoginError("Failed to connect to authentication server");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setMobileSidebarOpen(false);
  };

  const handleSave = async () => {
    setSaveLoading(true);
    setSaveToast(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setOriginalSettings(settings);
        setSaveToast({
          type: "success",
          message: "All changes committed to MongoDB successfully.",
        });
        setTimeout(() => setSaveToast(null), 4000);
      } else {
        setSaveToast({
          type: "error",
          message: data.error || "Failed to commit settings to database.",
        });
      }
    } catch {
      setSaveToast({
        type: "error",
        message: "Network error occurred while connecting to server.",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleReset = () => {
    if (
      confirm(
        "Discard unsaved modifications and revert to the last saved database state?"
      )
    ) {
      setSettings(originalSettings);
    }
  };

  const hasUnsavedChanges =
    JSON.stringify(settings) !== JSON.stringify(originalSettings);

  // Helper to update pricing plan features
  const handleFeatureChange = (
    planKey: keyof typeof settings.pricing,
    index: number,
    val: string
  ) => {
    const plan = settings.pricing[planKey] as any;
    if (!plan || !plan.features) return;
    const newFeatures = [...plan.features];
    newFeatures[index] = val;
    setSettings({
      ...settings,
      pricing: {
        ...settings.pricing,
        [planKey]: {
          ...plan,
          features: newFeatures,
        },
      },
    });
  };

  const handleAddFeature = (planKey: keyof typeof settings.pricing) => {
    const plan = settings.pricing[planKey] as any;
    if (!plan || !plan.features) return;
    setSettings({
      ...settings,
      pricing: {
        ...settings.pricing,
        [planKey]: {
          ...plan,
          features: [...plan.features, "New feature benefit"],
        },
      },
    });
  };

  const handleRemoveFeature = (
    planKey: keyof typeof settings.pricing,
    index: number
  ) => {
    const plan = settings.pricing[planKey] as any;
    if (!plan || !plan.features) return;
    const newFeatures = plan.features.filter(
      (_: any, i: number) => i !== index
    );
    setSettings({
      ...settings,
      pricing: {
        ...settings.pricing,
        [planKey]: {
          ...plan,
          features: newFeatures,
        },
      },
    });
  };

  // Loading state during auth check
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-10 w-32">
            <Image
              src="/logo.png"
              alt="GTM PRO"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C9A84C] border-t-transparent mt-2" />
          <p className="text-xs font-mono text-zinc-500 tracking-wider uppercase">
            Initializing Console...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFESSIONAL LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col justify-between bg-[#08080a] text-white relative overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#C9A84C]/8 via-[#C9A84C]/3 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />

        {/* Minimalist Top Header */}
        <header className="relative z-10 mx-auto w-full max-w-7xl px-6 py-6 flex items-center justify-between">
          <div className="relative h-8 w-28 sm:h-9 sm:w-32">
            <Image
              src="/logo.png"
              alt="GTM PRO Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-400 hover:text-[#E8C97A] transition-colors flex items-center gap-1.5"
          >
            <span>Live Site</span>
            <span>↗</span>
          </Link>
        </header>

        {/* Login Card Container */}
        <div className="relative z-10 mx-auto w-full max-w-md px-4 py-8">
          <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* Header with real logo and portal label */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-3 py-1 text-[11px] font-bold tracking-widest text-[#E8C97A] uppercase mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8C97A]" />
                <span>Executive Console</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Administrator Sign In
              </h1>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Authenticate to manage live pricing tiers, homepage metrics, and promotional offers.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full rounded-xl border border-zinc-800 bg-[#08080a] pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-zinc-800 bg-[#08080a] pl-10 pr-11 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 font-semibold flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full rounded-xl bg-gradient-to-r from-[#F0D896] via-[#E8C97A] to-[#C9A84C] py-3 text-xs font-black uppercase tracking-wider text-zinc-950 shadow-lg shadow-[#C9A84C]/20 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {loginLoading ? "Verifying Credentials..." : "Access Console"}
              </button>
            </form>
          </div>
        </div>

        {/* Minimalist Footer */}
        <footer className="relative z-10 py-6 text-center text-[11px] text-zinc-600">
          <p>GTM PRO Control Portal · 256-Bit SSL Encrypted Admin Session</p>
        </footer>
      </main>
    );
  }

  // ==========================================
  // PROFESSIONAL ADMIN DASHBOARD WITH SIDEBAR
  // ==========================================
  const navItems = [
    {
      id: "offer" as const,
      name: "Pre-Header Offer",
      desc: "Top announcement bar",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
    {
      id: "stats" as const,
      name: "Live Hero Stats",
      desc: "Homepage activity ticker",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: "pricing" as const,
      name: "Pricing & Plans",
      desc: "License tiers & wallet",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: "system" as const,
      name: "System & Server",
      desc: "MongoDB & SMTP status",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col lg:flex-row antialiased">
      {/* ===================================== */}
      {/* DESKTOP SIDEBAR MENU                  */}
      {/* ===================================== */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-col justify-between border-r border-zinc-800/80 bg-[#0c0c0e] shrink-0 sticky top-0 h-screen z-30">
        <div>
          {/* Logo & Brand Header */}
          <div className="p-6 border-b border-zinc-800/80">
            <div className="flex items-center justify-between">
              <div className="relative h-8 w-32">
                <Image
                  src="/logo.png"
                  alt="GTM PRO Official Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                v1.0
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold text-zinc-400 truncate">
                MongoDB Atlas: <strong className="text-zinc-200">gtm_pro</strong>
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
              Navigation
            </span>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? "bg-[#C9A84C]/15 text-[#E8C97A] border border-[#C9A84C]/30 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent"
                  }`}
                >
                  <span className={`${isActive ? "text-[#E8C97A]" : "text-zinc-500"}`}>
                    {item.icon}
                  </span>
                  <div>
                    <span className="block font-bold">{item.name}</span>
                    <span className="block text-[10px] text-zinc-500 font-normal">
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-zinc-800/80">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                Live Shortcuts
              </span>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>View Public Website</span>
                </span>
                <span className="text-[10px] text-zinc-600">↗</span>
              </Link>

              <Link
                href="/download-set-files"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Preset Files Portal</span>
                </span>
                <span className="text-[10px] text-zinc-600">↗</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="p-4 border-t border-zinc-800/80 bg-[#08080a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center font-bold text-xs text-[#E8C97A] shrink-0">
                AD
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">Administrator</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <span>●</span> active session
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-rose-500/15 hover:border-rose-500/30 text-zinc-400 hover:text-rose-300 flex items-center justify-center transition-colors cursor-pointer"
              title="Sign Out"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ===================================== */}
      {/* MOBILE APP BAR & SLIDING DRAWER       */}
      {/* ===================================== */}
      <div className="lg:hidden sticky top-0 z-40 border-b border-zinc-800 bg-[#0c0c0e]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-300 hover:text-white"
            aria-label="Toggle navigation drawer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="relative h-7 w-24">
            <Image
              src="/logo.png"
              alt="GTM PRO"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <button
              onClick={handleSave}
              disabled={saveLoading}
              className="rounded-lg bg-gradient-to-r from-[#F0D896] to-[#C9A84C] px-3 py-1.5 text-xs font-black text-zinc-950"
            >
              {saveLoading ? "Saving..." : "Save"}
            </button>
          )}

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white text-xs"
            title="Open Live Site"
          >
            ↗
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-72 bg-[#0c0c0e] border-r border-zinc-800 p-5 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="relative h-8 w-28">
                  <Image
                    src="/logo.png"
                    alt="GTM PRO"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <nav className="mt-5 space-y-1.5">
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                  Sections
                </span>
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all text-left ${
                        isActive
                          ? "bg-[#C9A84C]/15 text-[#E8C97A] border border-[#C9A84C]/30"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <div>
                        <span className="block font-bold">{item.name}</span>
                        <span className="block text-[10px] text-zinc-500 font-normal">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 py-2.5 text-xs font-bold text-rose-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* MAIN CONTENT WORKSPACE                */}
      {/* ===================================== */}
      <div className="flex-1 flex flex-col min-w-0 pb-28 lg:pb-24">
        {/* Desktop Top Workspace Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-zinc-800/80 bg-[#0c0c0e]/60 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500">Console</span>
            <span className="text-zinc-600">/</span>
            <span className="font-bold text-zinc-200">
              {navItems.find((n) => n.id === activeTab)?.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-[11px] text-zinc-400">
              <span
                className={`h-2 w-2 rounded-full ${
                  hasUnsavedChanges
                    ? "bg-amber-400 animate-pulse"
                    : "bg-emerald-400"
                }`}
              />
              <span>
                {hasUnsavedChanges
                  ? "Unsaved modifications"
                  : "All changes committed"}
              </span>
            </div>

            {hasUnsavedChanges && (
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Revert
              </button>
            )}

            <button
              onClick={handleSave}
              disabled={saveLoading || !hasUnsavedChanges}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#F0D896] via-[#E8C97A] to-[#C9A84C] px-5 py-1.5 text-xs font-black uppercase tracking-wider text-zinc-950 shadow-md shadow-[#C9A84C]/15 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {saveLoading ? "Writing to DB..." : "Commit Changes"}
            </button>
          </div>
        </header>

        {/* Content Pane */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Notification Toast */}
          {saveToast && (
            <div
              className={`rounded-xl p-4 text-xs font-bold flex items-center justify-between border ${
                saveToast.type === "success"
                  ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                  : "border-rose-500/40 bg-rose-500/15 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span>{saveToast.type === "success" ? "✓" : "⚠"}</span>
                <span>{saveToast.message}</span>
              </div>
              <button
                onClick={() => setSaveToast(null)}
                className="text-zinc-400 hover:text-white ml-2 p-1 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: PRE-HEADER OFFER BANNER                            */}
          {/* ========================================================= */}
          {activeTab === "offer" && (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
                <div>
                  <h2 className="text-xl font-black text-white">
                    Pre-Header Announcement Banner
                  </h2>
                  <p className="mt-1 text-xs text-zinc-400">
                    Configure the promotional bar that floats above the main header across all site pages.
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 w-fit">
                  <span className="text-xs font-bold text-zinc-300">
                    Display:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        preHeader: {
                          ...settings.preHeader,
                          enabled: !settings.preHeader.enabled,
                        },
                      })
                    }
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                      settings.preHeader.enabled
                        ? "bg-emerald-500"
                        : "bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        settings.preHeader.enabled
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      settings.preHeader.enabled
                        ? "text-emerald-400"
                        : "text-zinc-500"
                    }`}
                  >
                    {settings.preHeader.enabled ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>

              {/* Realistic Browser Live Preview Mockup */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] overflow-hidden shadow-2xl">
                <div className="bg-[#15151b] px-4 py-2.5 border-b border-zinc-800 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  </div>
                  <div className="mx-auto rounded-md bg-zinc-900/90 border border-zinc-800 px-4 py-0.5 text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                    <span>🔒</span>
                    <span>goldtacticalmachine.com</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                    Live Component Render
                  </span>
                  <div className="rounded-xl border border-[#C9A84C]/25 bg-gradient-to-r from-[#141208] via-[#1c1809] to-[#141208] p-3 text-center text-xs text-zinc-300">
                    {settings.preHeader.enabled ? (
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-white">
                          {settings.preHeader.badge}
                        </span>
                        <span className="text-zinc-500 hidden sm:inline">—</span>
                        <span>
                          <strong className="text-[#E8C97A] font-bold">
                            {settings.preHeader.highlightText}
                          </strong>{" "}
                          {settings.preHeader.mainText}{" "}
                          <span className="font-bold text-[#E8C97A] underline decoration-[#E8C97A]/40">
                            {settings.preHeader.broker1Name}
                          </span>{" "}
                          or{" "}
                          <span className="font-bold text-[#E8C97A] underline decoration-[#E8C97A]/40">
                            {settings.preHeader.broker2Name}
                          </span>{" "}
                          {settings.preHeader.postText}
                        </span>
                      </div>
                    ) : (
                      <span className="text-zinc-500 italic text-[11px]">
                        Banner is disabled. Navigation bar will render directly at the top.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Settings */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-4">
                  <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800 pb-2">
                    Banner Content
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Badge Text / Icon
                    </label>
                    <input
                      type="text"
                      value={settings.preHeader.badge}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preHeader: {
                            ...settings.preHeader,
                            badge: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Promotion Highlight Text
                    </label>
                    <input
                      type="text"
                      value={settings.preHeader.highlightText}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preHeader: {
                            ...settings.preHeader,
                            highlightText: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs font-bold text-[#E8C97A] focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Description Copy
                    </label>
                    <textarea
                      rows={2}
                      value={settings.preHeader.mainText}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preHeader: {
                            ...settings.preHeader,
                            mainText: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Closing Note
                    </label>
                    <input
                      type="text"
                      value={settings.preHeader.postText}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preHeader: {
                            ...settings.preHeader,
                            postText: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-4">
                  <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800 pb-2">
                    Partner Broker Links
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Broker 1 Label
                    </label>
                    <input
                      type="text"
                      value={settings.preHeader.broker1Name}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preHeader: {
                            ...settings.preHeader,
                            broker1Name: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Broker 1 Referral URL
                    </label>
                    <input
                      type="url"
                      value={settings.preHeader.broker1Link}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preHeader: {
                            ...settings.preHeader,
                            broker1Link: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs font-mono text-zinc-300 focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Broker 2 Label
                    </label>
                    <input
                      type="text"
                      value={settings.preHeader.broker2Name}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preHeader: {
                            ...settings.preHeader,
                            broker2Name: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Broker 2 Referral URL
                    </label>
                    <input
                      type="url"
                      value={settings.preHeader.broker2Link}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preHeader: {
                            ...settings.preHeader,
                            broker2Link: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs font-mono text-zinc-300 focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: HERO STATS BAR                                     */}
          {/* ========================================================= */}
          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800/80 pb-5">
                <h2 className="text-xl font-black text-white">
                  Live Activity Performance Bar
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Update verified license counts and live trading robots displayed right after the hero section.
                </p>
              </div>

              {/* Live Preview Ticker */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 sm:p-6 shadow-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                  Live Component Render
                </span>
                <div className="rounded-xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.04] p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/[0.06] px-3.5 py-1 text-left w-fit">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,.9)]" />
                      </span>
                      <span className="text-[11px] font-black tracking-wider text-[#E8C97A] uppercase">
                        {settings.stats.liveBadgeText}
                      </span>
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
                      <div className="text-center">
                        <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                          {settings.stats.activatedToday.toLocaleString()}
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
                          {settings.stats.activatedLabel}
                        </p>
                      </div>

                      <span className="h-8 w-px bg-white/10" />

                      <div className="text-center">
                        <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                          {settings.stats.runningNow.toLocaleString()}
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
                          {settings.stats.runningLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-5">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800 pb-2">
                  Metric Inputs
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Status Badge Label
                    </label>
                    <input
                      type="text"
                      value={settings.stats.liveBadgeText}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: {
                            ...settings.stats,
                            liveBadgeText: e.target.value,
                          },
                        })
                      }
                      className="w-full sm:w-80 rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Licenses Activated Today (Numeric Count)
                    </label>
                    <input
                      type="number"
                      value={settings.stats.activatedToday}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: {
                            ...settings.stats,
                            activatedToday: parseInt(e.target.value, 10) || 0,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-sm font-mono text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Activated Today Caption
                    </label>
                    <input
                      type="text"
                      value={settings.stats.activatedLabel}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: {
                            ...settings.stats,
                            activatedLabel: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      EAs Running Now (Numeric Count)
                    </label>
                    <input
                      type="number"
                      value={settings.stats.runningNow}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: {
                            ...settings.stats,
                            runningNow: parseInt(e.target.value, 10) || 0,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-sm font-mono text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Running Now Caption
                    </label>
                    <input
                      type="text"
                      value={settings.stats.runningLabel}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: {
                            ...settings.stats,
                            runningLabel: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PRICING & PLANS                                    */}
          {/* ========================================================= */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800/80 pb-5">
                <h2 className="text-xl font-black text-white">
                  Pricing Models & License Tiers
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Manage pricing for all 4 direct plans, custom enterprise tiers, source code, and USDT TRC20 wallet destination.
                </p>
              </div>

              {/* Global Checkout Config */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-4">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800 pb-2">
                  Section Header & Payment Settings
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={settings.pricing.heading}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            heading: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={settings.pricing.subheading}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            subheading: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      USDT TRC20 Payment Wallet (Copied in Modal)
                    </label>
                    <input
                      type="text"
                      value={settings.pricing.usdtWallet}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            usdtWallet: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs font-mono text-[#E8C97A] focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Telegram Support Confirmation Link
                    </label>
                    <input
                      type="url"
                      value={settings.pricing.telegramLink}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            telegramLink: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs font-mono text-zinc-300 focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* 1. Free Option */}
                <div className="rounded-2xl border border-emerald-500/30 bg-[#0d0d11] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                        Plan 1: Free Access
                      </h4>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Broker IB Link
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.freePlan.title}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              freePlan: {
                                ...settings.pricing.freePlan,
                                title: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Price Display
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.freePlan.price}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              freePlan: {
                                ...settings.pricing.freePlan,
                                price: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-emerald-400 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={settings.pricing.freePlan.subtitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            freePlan: {
                              ...settings.pricing.freePlan,
                              subtitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-zinc-400">
                        Feature Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddFeature("freePlan")}
                        className="text-[10px] text-[#E8C97A] font-bold hover:underline"
                      >
                        + Add Bullet
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {settings.pricing.freePlan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) =>
                              handleFeatureChange("freePlan", idx, e.target.value)
                            }
                            className="flex-1 rounded-lg border border-zinc-800 bg-[#08080a] px-2.5 py-1.5 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature("freePlan", idx)}
                            className="text-zinc-600 hover:text-rose-400 px-1 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. 5 Accounts */}
                <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">
                      Plan 2: 5 Accounts License
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Standard Tier
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.fiveAccountsPlan.title}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              fiveAccountsPlan: {
                                ...settings.pricing.fiveAccountsPlan,
                                title: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Price Display
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.fiveAccountsPlan.price}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              fiveAccountsPlan: {
                                ...settings.pricing.fiveAccountsPlan,
                                price: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs font-bold text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={settings.pricing.fiveAccountsPlan.subtitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            fiveAccountsPlan: {
                              ...settings.pricing.fiveAccountsPlan,
                              subtitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-zinc-400">
                        Feature Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddFeature("fiveAccountsPlan")}
                        className="text-[10px] text-[#E8C97A] font-bold hover:underline"
                      >
                        + Add Bullet
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {settings.pricing.fiveAccountsPlan.features.map(
                        (feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) =>
                                handleFeatureChange(
                                  "fiveAccountsPlan",
                                  idx,
                                  e.target.value
                                )
                              }
                              className="flex-1 rounded-lg border border-zinc-800 bg-[#08080a] px-2.5 py-1.5 text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveFeature("fiveAccountsPlan", idx)
                              }
                              className="text-zinc-600 hover:text-rose-400 px-1 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Unlimited Plan */}
                <div className="rounded-2xl border border-[#C9A84C]/40 bg-[#0d0d11] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-xs font-black text-[#E8C97A] uppercase tracking-wider">
                      Plan 3: Unlimited Accounts (Best Value)
                    </h4>
                    <span className="rounded bg-[#C9A84C]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#E8C97A]">
                      Flagship
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.unlimitedPlan.title}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              unlimitedPlan: {
                                ...settings.pricing.unlimitedPlan,
                                title: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Price Display
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.unlimitedPlan.price}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              unlimitedPlan: {
                                ...settings.pricing.unlimitedPlan,
                                price: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs font-bold text-[#E8C97A]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Badge Tag
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.unlimitedPlan.tag || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              unlimitedPlan: {
                                ...settings.pricing.unlimitedPlan,
                                tag: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.unlimitedPlan.subtitle}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              unlimitedPlan: {
                                ...settings.pricing.unlimitedPlan,
                                subtitle: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-zinc-400">
                        Feature Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddFeature("unlimitedPlan")}
                        className="text-[10px] text-[#E8C97A] font-bold hover:underline"
                      >
                        + Add Bullet
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {settings.pricing.unlimitedPlan.features.map(
                        (feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) =>
                                handleFeatureChange(
                                  "unlimitedPlan",
                                  idx,
                                  e.target.value
                                )
                              }
                              className="flex-1 rounded-lg border border-zinc-800 bg-[#08080a] px-2.5 py-1.5 text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveFeature("unlimitedPlan", idx)
                              }
                              className="text-zinc-600 hover:text-rose-400 px-1 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. White-Label */}
                <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">
                      Plan 4: White-Label Partner
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      B2B / Educators
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.whiteLabelPlan.title}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              whiteLabelPlan: {
                                ...settings.pricing.whiteLabelPlan,
                                title: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                        Price Display
                      </label>
                      <input
                        type="text"
                        value={settings.pricing.whiteLabelPlan.price}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            pricing: {
                              ...settings.pricing,
                              whiteLabelPlan: {
                                ...settings.pricing.whiteLabelPlan,
                                price: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs font-bold text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={settings.pricing.whiteLabelPlan.subtitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            whiteLabelPlan: {
                              ...settings.pricing.whiteLabelPlan,
                              subtitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-lg border border-zinc-800 bg-[#08080a] px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-zinc-400">
                        Feature Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddFeature("whiteLabelPlan")}
                        className="text-[10px] text-[#E8C97A] font-bold hover:underline"
                      >
                        + Add Bullet
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {settings.pricing.whiteLabelPlan.features.map(
                        (feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) =>
                                handleFeatureChange(
                                  "whiteLabelPlan",
                                  idx,
                                  e.target.value
                                )
                              }
                              className="flex-1 rounded-lg border border-zinc-800 bg-[#08080a] px-2.5 py-1.5 text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveFeature("whiteLabelPlan", idx)
                              }
                              className="text-zinc-600 hover:text-rose-400 px-1 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Code Wide Section */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <h4 className="text-xs font-black text-[#E8C97A] uppercase tracking-wider">
                    Source Code Ownership License
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Developers & Enterprise
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Price Display
                    </label>
                    <input
                      type="text"
                      value={settings.pricing.sourceCode.price}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            sourceCode: {
                              ...settings.pricing.sourceCode,
                              price: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs font-bold text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Terms / Subtitle
                    </label>
                    <input
                      type="text"
                      value={settings.pricing.sourceCode.subtitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            sourceCode: {
                              ...settings.pricing.sourceCode,
                              subtitle: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">
                      Description Paragraph
                    </label>
                    <textarea
                      rows={2}
                      value={settings.pricing.sourceCode.description}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          pricing: {
                            ...settings.pricing,
                            sourceCode: {
                              ...settings.pricing.sourceCode,
                              description: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#08080a] px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: SYSTEM & SERVER STATUS                             */}
          {/* ========================================================= */}
          {activeTab === "system" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-zinc-800/80 pb-5">
                <h2 className="text-xl font-black text-white">
                  System Environment & Database Health
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  Infrastructure connectivity, encryption tokens, and mail relay services.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* MongoDB Card */}
                <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      MongoDB Atlas
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      <span>●</span> Operational
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 font-mono break-all pt-1">
                    gtm-pro.2lhts3u.mongodb.net
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Database: <span className="text-zinc-300 font-mono">gtm_pro</span> · Collection: <span className="text-zinc-300 font-mono">site_settings</span>
                  </p>
                </div>

                {/* SMTP Mail Card */}
                <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      SMTP Mail Server
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-2 py-0.5 text-[10px] font-bold text-[#E8C97A]">
                      Configured
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 font-mono break-all pt-1">
                    support@goldtacticalmachine.com
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Relay: Port 587 · Free Access verification notifications
                  </p>
                </div>
              </div>

              {/* Environment Variable Map */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-5 space-y-3">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Active Configuration Mapping (.env)
                </h3>
                <div className="space-y-1.5 text-xs font-mono bg-[#08080a] p-4 rounded-xl border border-zinc-800/80 text-zinc-400 overflow-x-auto">
                  <p>
                    <span className="text-zinc-500">ADMIN_USERNAME=</span>
                    <span className="text-zinc-200">admin</span>
                  </p>
                  <p>
                    <span className="text-zinc-500">ADMIN_PASSWORD=</span>
                    <span className="text-zinc-200">••••••••</span>
                  </p>
                  <p>
                    <span className="text-zinc-500">MONGODB_URI=</span>
                    <span className="text-emerald-400">mongodb+srv://admin:***@gtm-pro.2lhts3u.mongodb.net</span>
                  </p>
                  <p>
                    <span className="text-zinc-500">SMTP_HOST=</span>
                    <span className="text-[#E8C97A]">smtp.gmail.com</span>
                  </p>
                  <p>
                    <span className="text-zinc-500">SMTP_PORT=</span>
                    <span className="text-zinc-300">587</span>
                  </p>
                  <p>
                    <span className="text-zinc-500">NEXT_PUBLIC_PRESET_UNLOCK_KEY=</span>
                    <span className="text-emerald-400">GTEA-J8M7B-SHVRL-3P9WK</span>
                  </p>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Credentials are cryptographically signed using HMAC SHA-256 session cookies. To change administrator keys or cluster endpoints, update the local or hosting environment variables and redeploy.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Save Action Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-zinc-800 bg-[#0c0c0e]/95 backdrop-blur-xl p-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                hasUnsavedChanges
                  ? "bg-amber-400 animate-pulse"
                  : "bg-emerald-400"
              }`}
            />
            <span className="text-xs font-semibold text-zinc-300">
              {hasUnsavedChanges ? "Pending edits" : "Synced"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-400"
              >
                Revert
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saveLoading || !hasUnsavedChanges}
              className="rounded-lg bg-gradient-to-r from-[#F0D896] via-[#E8C97A] to-[#C9A84C] px-5 py-2 text-xs font-black uppercase tracking-wider text-zinc-950 disabled:opacity-40"
            >
              {saveLoading ? "Saving..." : "Commit Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
