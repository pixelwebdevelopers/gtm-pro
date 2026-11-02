"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SiteSettings,
  defaultSiteSettings,
  PricingPlan,
} from "@/lib/siteSettings";

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
  const [activeTab, setActiveTab] = useState<"offer" | "stats" | "pricing" | "system">("offer");
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
          message: "✓ All settings saved to MongoDB successfully!",
        });
        setTimeout(() => setSaveToast(null), 4000);
      } else {
        setSaveToast({
          type: "error",
          message: data.error || "Failed to save settings to MongoDB",
        });
      }
    } catch {
      setSaveToast({
        type: "error",
        message: "Network error while saving settings",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to discard your unsaved edits and restore last saved settings?"
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
    const newFeatures = plan.features.filter((_: any, i: number) => i !== index);
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
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A84C] border-t-transparent" />
          <p className="text-xs font-mono text-zinc-400">Loading Control Panel...</p>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#050505] p-4 text-white relative overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C9A84C]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md rounded-3xl border border-[#C9A84C]/30 bg-gradient-to-b from-[#110f09] to-[#080705] p-6 sm:p-10 shadow-2xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] p-0.5 shadow-lg shadow-[#C9A84C]/20 mb-4">
              <div className="w-full h-full bg-[#0d0b07] rounded-[calc(1rem-2px)] flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
            <span className="text-[10px] font-black tracking-widest text-[#E8C97A] uppercase block">
              GTM PRO · CONTROL CENTER
            </span>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-white">
              Administrator Login
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400">
              Sign in with your admin credentials to manage live pricing, stats, and offers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full rounded-2xl border border-white/15 bg-black/70 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#C9A84C] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-2xl border border-white/15 bg-black/70 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#C9A84C] focus:outline-none transition-colors pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400 font-semibold">
                ⚠ {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] py-3.5 text-sm font-black text-zinc-950 shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loginLoading ? "Authenticating..." : "Sign In to Admin Panel"}
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-4 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-[#E8C97A] transition-colors"
            >
              ← Back to Live Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080808]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-zinc-950 font-black text-sm">
              ⚡
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">GTM PRO</span>
                <span className="rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 px-2 py-0.2 text-[10px] font-bold text-[#E8C97A] uppercase">
                  Admin Panel
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 hidden sm:inline">
                MongoDB: <strong className="text-emerald-400">gtm-pro.2lhts3u.mongodb.net</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-all"
              title="Open the website in a new tab to see your changes"
            >
              <span>🌐</span>
              <span className="hidden sm:inline">Live Site</span>
              <span>→</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation (Scrollable on mobile) */}
        <div className="border-t border-white/5 bg-zinc-950/50">
          <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-8">
            <button
              onClick={() => setActiveTab("offer")}
              className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === "offer"
                  ? "border-[#C9A84C] text-[#E8C97A]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <span>🎁</span>
              <span>Pre-Header Offer</span>
            </button>

            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === "stats"
                  ? "border-[#C9A84C] text-[#E8C97A]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <span>📊</span>
              <span>Hero Live Stats</span>
            </button>

            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === "pricing"
                  ? "border-[#C9A84C] text-[#E8C97A]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <span>💎</span>
              <span>Pricing & Plans</span>
            </button>

            <button
              onClick={() => setActiveTab("system")}
              className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === "system"
                  ? "border-[#C9A84C] text-[#E8C97A]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <span>⚙️</span>
              <span>System & Credentials</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* Toast alert */}
        {saveToast && (
          <div
            className={`mb-6 rounded-2xl p-4 text-xs sm:text-sm font-bold flex items-center justify-between border ${
              saveToast.type === "success"
                ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                : "border-red-500/40 bg-red-500/15 text-red-300"
            }`}
          >
            <span>{saveToast.message}</span>
            <button
              onClick={() => setSaveToast(null)}
              className="text-zinc-400 hover:text-white font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* TAB 1: PRE-HEADER OFFER BANNER */}
        {activeTab === "offer" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Pre-Header Offer Banner
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  Control the announcement bar that appears above the navigation bar on all pages.
                </p>
              </div>

              {/* Enable / Disable Toggle */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl w-fit">
                <span className="text-xs font-bold text-zinc-300">
                  Banner Status:
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
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    settings.preHeader.enabled ? "bg-emerald-500" : "bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.preHeader.enabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-xs font-bold uppercase ${
                    settings.preHeader.enabled
                      ? "text-emerald-400"
                      : "text-zinc-500"
                  }`}
                >
                  {settings.preHeader.enabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>

            {/* LIVE PREVIEW BOX */}
            <div className="rounded-3xl border border-[#C9A84C]/30 bg-[#0c0a06] p-5 sm:p-6 shadow-xl">
              <span className="text-[10px] font-black tracking-widest text-[#E8C97A] uppercase block mb-3">
                LIVE INTERACTIVE PREVIEW
              </span>
              <div className="rounded-2xl border border-white/10 bg-[#141208] p-3 text-center text-xs text-zinc-300">
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
                      <span className="font-bold text-[#E8C97A] underline">
                        {settings.preHeader.broker1Name}
                      </span>{" "}
                      or{" "}
                      <span className="font-bold text-[#E8C97A] underline">
                        {settings.preHeader.broker2Name}
                      </span>{" "}
                      {settings.preHeader.postText}
                    </span>
                  </div>
                ) : (
                  <span className="text-zinc-500 italic">
                    Pre-header banner is currently disabled and will not show on the live site.
                  </span>
                )}
              </div>
            </div>

            {/* FORM FIELDS */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 space-y-4">
                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
                  Offer Text & Highlight
                </h3>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Badge / Tag (e.g. 🎁 New Client Offer)
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Highlighted Promo (e.g. FREE until Nov 30, 2026:)
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-[#E8C97A] font-bold focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Main Description Text
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Closing Note (e.g. via our IB link. No payment needed.)
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 space-y-4">
                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
                  Broker Links & References
                </h3>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Broker 1 Name
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Broker 1 Referral Link
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white font-mono focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Broker 2 Name
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Broker 2 Referral Link
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white font-mono focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO STATS BAR */}
        {activeTab === "stats" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Homepage Hero Stats Bar
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Update the numbers and labels displayed in the live activity ticker right after the hero section.
              </p>
            </div>

            {/* LIVE PREVIEW BOX */}
            <div className="rounded-3xl border border-[#C9A84C]/30 bg-[#0c0a06] p-5 sm:p-6 shadow-xl">
              <span className="text-[10px] font-black tracking-widest text-[#E8C97A] uppercase block mb-3">
                LIVE INTERACTIVE PREVIEW
              </span>
              <div className="rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.04] p-5">
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

            {/* EDIT FIELDS */}
            <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 space-y-5">
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
                Live Stats Metrics
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Live Status Badge Text
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  {/* Spacer */}
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Licenses Activated Today (Count)
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Activated Today Label
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    GTM PRO EAs Running Now (Count)
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    EAs Running Now Label
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRICING & PLANS */}
        {activeTab === "pricing" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Pricing & License Plans
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Change pricing amounts, subtitles, features, and payment wallet details.
              </p>
            </div>

            {/* General Section Settings */}
            <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
                Header & Payment Configuration
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Section Heading
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Section Subheading
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    USDT TRC20 Payment Wallet Address
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Telegram Confirmation Link
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* PLAN 1: FREE OPTION */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.03] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-sm font-black text-emerald-400">
                    Card 1: Free Option
                  </h4>
                  <span className="text-[10px] font-bold text-zinc-400">
                    Broker IB Tier
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Card Title
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Price Tag (e.g. FREE)
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-emerald-400 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
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
                    className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase">
                      Features List
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddFeature("freePlan")}
                      className="text-[10px] text-[#E8C97A] font-bold hover:underline"
                    >
                      + Add Feature
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
                          className="flex-1 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature("freePlan", idx)}
                          className="text-zinc-500 hover:text-red-400 px-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PLAN 2: 5 ACCOUNTS */}
              <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-sm font-black text-white">
                    Card 2: 5 Accounts Plan
                  </h4>
                  <span className="text-[10px] font-bold text-zinc-400">
                    Direct License
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Card Title
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Price (e.g. $299 USDT)
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
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
                    className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase">
                      Features List
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddFeature("fiveAccountsPlan")}
                      className="text-[10px] text-[#E8C97A] font-bold hover:underline"
                    >
                      + Add Feature
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
                            className="flex-1 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveFeature("fiveAccountsPlan", idx)
                            }
                            className="text-zinc-500 hover:text-red-400 px-1 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* PLAN 3: UNLIMITED ACCOUNTS */}
              <div className="rounded-2xl border border-[#C9A84C]/40 bg-[#0c0a06] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-sm font-black text-[#E8C97A]">
                    Card 3: Unlimited Plan (Best Value)
                  </h4>
                  <span className="text-[10px] font-bold text-zinc-400">
                    Flagship License
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Card Title
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Price (e.g. $1,065 USDT)
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-[#E8C97A] font-bold"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Badge Tag (e.g. BEST VALUE)
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase">
                      Features List
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddFeature("unlimitedPlan")}
                      className="text-[10px] text-[#E8C97A] font-bold hover:underline"
                    >
                      + Add Feature
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
                            className="flex-1 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveFeature("unlimitedPlan", idx)
                            }
                            className="text-zinc-500 hover:text-red-400 px-1 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* PLAN 4: WHITE-LABEL */}
              <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-sm font-black text-white">
                    Card 4: White-Label Partner
                  </h4>
                  <span className="text-[10px] font-bold text-zinc-400">
                    B2B & Educators
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Card Title
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Price (e.g. $4,999)
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
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
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
                    className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase">
                      Features List
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddFeature("whiteLabelPlan")}
                      className="text-[10px] text-[#E8C97A] font-bold hover:underline"
                    >
                      + Add Feature
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
                            className="flex-1 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveFeature("whiteLabelPlan", idx)
                            }
                            className="text-zinc-500 hover:text-red-400 px-1 text-xs"
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

            {/* SOURCE CODE SECTION */}
            <div className="rounded-2xl border border-[#C9A84C]/30 bg-[#0c0a06] p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#E8C97A] border-b border-white/10 pb-2">
                Wide Card: Source Code License
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Price (e.g. $26,900)
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs font-bold text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Subtitle / Terms
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
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
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM & CREDENTIALS */}
        {activeTab === "system" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                System & Credentials
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Information on how administrator access and MongoDB data are connected.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
                Authentication Settings
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Your admin login credentials are secure and configured inside your server environment (<code className="text-[#E8C97A]">.env</code>):
              </p>

              <div className="space-y-2 text-xs font-mono bg-black/80 p-4 rounded-xl border border-white/10">
                <p>
                  <span className="text-zinc-500">ADMIN_USERNAME=</span>
                  <span className="text-white">admin</span>
                </p>
                <p>
                  <span className="text-zinc-500">ADMIN_PASSWORD=</span>
                  <span className="text-white">••••••••</span>
                </p>
                <p>
                  <span className="text-zinc-500">MONGODB_URI=</span>
                  <span className="text-emerald-400">mongodb+srv://admin:***@gtm-pro.2lhts3u.mongodb.net</span>
                </p>
                <p>
                  <span className="text-zinc-500">SMTP_HOST=</span>
                  <span className="text-amber-300">smtp.gmail.com (or your provider)</span>
                </p>
                <p>
                  <span className="text-zinc-500">SMTP_PORT=</span>
                  <span className="text-amber-300">587</span>
                </p>
                <p>
                  <span className="text-zinc-500">SMTP_FROM=</span>
                  <span className="text-zinc-300">support@goldtacticalmachine.com</span>
                </p>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                To change your admin username, password, or MongoDB cluster URL in the future, simply update <code className="text-[#E8C97A]">.env</code> and restart the application.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/15 bg-[#0a0907]/95 backdrop-blur-xl p-4 shadow-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                hasUnsavedChanges
                  ? "bg-amber-400 animate-pulse"
                  : "bg-emerald-400"
              }`}
            />
            <span className="text-xs font-bold text-zinc-300">
              {hasUnsavedChanges ? "Unsaved changes detected" : "All changes saved"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Discard
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saveLoading || !hasUnsavedChanges}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-6 py-2.5 text-xs font-black text-zinc-950 shadow-lg shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>{saveLoading ? "Saving to MongoDB..." : "💾 Save Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

