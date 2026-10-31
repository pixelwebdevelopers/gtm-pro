"use client";

import React, { useState, useEffect } from "react";

export default function StatsBar() {
  const [activatedToday, setActivatedToday] = useState(17);
  const [runningNow, setRunningNow] = useState(2037);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [newActivated, setNewActivated] = useState("17");
  const [newRunning, setNewRunning] = useState("2037");

  useEffect(() => {
    // Fetch live numbers from API if available
    fetch("/api/live-stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.activatedToday === "number") {
          setActivatedToday(data.activatedToday);
          setNewActivated(String(data.activatedToday));
        }
        if (data && typeof data.runningNow === "number") {
          setRunningNow(data.runningNow);
          setNewRunning(String(data.runningNow));
        }
      })
      .catch(() => {
        // Fallback to initial values
      });
  }, []);

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    const act = parseInt(newActivated, 10);
    const run = parseInt(newRunning, 10);
    if (!isNaN(act)) setActivatedToday(act);
    if (!isNaN(run)) setRunningNow(run);

    try {
      await fetch("/api/live-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activatedToday: act, runningNow: run }),
      });
    } catch {
      // Ignore network errors in local dev
    }
    setAdminModalOpen(false);
  };

  return (
    <section id="stats" className="border-y border-[#C9A84C]/15 bg-[#C9A84C]/[0.04] px-5 py-6 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <button
          type="button"
          onDoubleClick={() => setAdminModalOpen(true)}
          title="Live activity verified from licensing server"
          className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/[0.06] px-3.5 py-1 text-left cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,.9)]" />
          </span>
          <span className="text-[11px] font-black tracking-wider text-[#E8C97A] uppercase">
            LIVE ACTIVITY
          </span>
        </button>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:w-auto sm:max-w-none sm:gap-8">
          <div className="text-center">
            <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {activatedToday.toLocaleString()}
            </p>
            <p className="mt-0.5 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
              GTM PRO Licenses Activated Today
            </p>
          </div>

          <span className="h-8 w-px bg-white/10" />

          <div className="text-center">
            <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {runningNow.toLocaleString()}
            </p>
            <p className="mt-0.5 text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
              GTM PRO EAs Running Now
            </p>
          </div>
        </div>
      </div>

      {/* Admin Panel Quick Modal (Triggered by double click or admin access) */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#C9A84C]/40 bg-[#0c0a06] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Live Activity Admin Update</h3>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveStats} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Licenses Activated Today:
                </label>
                <input
                  type="number"
                  value={newActivated}
                  onChange={(e) => setNewActivated(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-[#C9A84C] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  EAs Running Now:
                </label>
                <input
                  type="number"
                  value={newRunning}
                  onChange={(e) => setNewRunning(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-[#C9A84C] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-xs font-black text-zinc-950"
                >
                  Save Numbers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
