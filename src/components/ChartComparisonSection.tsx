"use client";

import React, { useState, useRef, useCallback } from "react";
import NextImage from "next/image";

export default function ChartComparisonSection() {
  // Always initially show GTM Algo on 80% of the chart (slider at 20%)
  const [sliderPosition, setSliderPosition] = useState(20);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Handle position calculation from mouse or touch event
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  // Dragging event listeners attached to window during active drag
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <section id="preview" className="relative px-5 py-24 sm:px-8 bg-[#070709] border-t border-white/[0.08] overflow-hidden">
      {/* Ambient background gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#C9A84C]/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/35 bg-[#C9A84C]/10 px-4 py-1.5 text-xs font-black tracking-widest text-[#E8C97A] uppercase shadow-md shadow-[#C9A84C]/10">
            <span className="h-2 w-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span>Interactive Preview</span>
          </div>

          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
            Same Candles. <br className="hidden sm:inline" />
            <span className="gold-text">Every Entry and Exit Marked.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-300 font-normal">
            Drag either handle and the algo appears on the chart: where it entered, where the stop
            sat, and where it closed. The candles never change. What you can see does.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-black tracking-wider text-[#E8C97A] uppercase">
            <span className="rounded-md bg-[#C9A84C]/15 border border-[#C9A84C]/30 px-2.5 py-1">
              GTM PRO ALGO
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400">Interactive Split Comparison</span>
          </div>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="mt-14 mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/20 bg-black/90 p-1.5 sm:p-4 shadow-2xl shadow-black backdrop-blur-2xl -mx-3 sm:mx-0 w-[calc(100%+1.5rem)] sm:w-full">
            {/* Terminal Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-white/10 px-2 sm:px-3 pb-2.5 sm:pb-3 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/80 inline-block" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono font-bold text-zinc-300">
                  XAU/USD · Execution Comparison
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="hidden sm:inline text-xs text-zinc-500 font-medium mr-1">View:</span>
                <button
                  type="button"
                  onClick={() => setSliderPosition(100)}
                  className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer active:scale-95 ${
                    sliderPosition >= 98
                      ? "bg-[#C9A84C] text-black shadow"
                      : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Raw Candles
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(50)}
                  className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer active:scale-95 ${
                    sliderPosition > 25 && sliderPosition < 75
                      ? "bg-[#C9A84C] text-black shadow"
                      : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Split (50%)
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPosition(20)}
                  className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer active:scale-95 ${
                    sliderPosition <= 25
                      ? "bg-[#C9A84C] text-black shadow"
                      : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  GTM Algo (80%)
                </button>
              </div>
            </div>

            {/* Draggable Viewport */}
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl bg-black cursor-ew-resize select-none touch-none"
              style={{ touchAction: "none" }}
            >
              {/* Bottom Layer: After Image (Algo Overlay) */}
              <div className="absolute inset-0 h-full w-full pointer-events-none select-none bg-black">
                <NextImage
                  src="/after-chart.png"
                  alt="GTM PRO ALGO With Marked Entries and Exits"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Top Layer: Before Image (Raw Candles) with Clip-Path */}
              <div
                className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none select-none bg-black"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <NextImage
                  src="/before-chart.png"
                  alt="Raw XAUUSD Market Candles Before Algo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Before Badge (Left Side) - Hidden on Mobile */}
              <div
                className={`absolute top-4 left-4 z-20 transition-opacity duration-200 pointer-events-none hidden sm:flex ${
                  sliderPosition < 15 ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/75 px-3 py-1.5 backdrop-blur-md shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-zinc-400" />
                  <span className="text-xs font-bold tracking-wide text-zinc-200">
                    RAW CANDLES · BEFORE
                  </span>
                </div>
              </div>

              {/* After Badge (Right Side) - Hidden on Mobile */}
              <div
                className={`absolute top-4 right-4 z-20 transition-opacity duration-200 pointer-events-none hidden sm:flex ${
                  sliderPosition > 85 ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-2 rounded-xl border border-[#C9A84C]/50 bg-black/75 px-3 py-1.5 backdrop-blur-md shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-black tracking-wide text-[#E8C97A]">
                    GTM PRO ALGO · AFTER
                  </span>
                </div>
              </div>

              {/* Vertical Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 z-30 w-0.5 bg-gradient-to-b from-[#FFF0B8] via-[#E8C97A] to-[#C9A84C] shadow-[0_0_15px_rgba(201,168,76,0.9)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Circular Handle Button */}
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-b from-[#F0D896] to-[#C9A84C] text-zinc-950 shadow-[0_0_20px_rgba(201,168,76,0.6)] cursor-ew-resize transition-transform hover:scale-110 active:scale-95 pointer-events-auto">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="-ml-3">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              {/* Drag instruction overlay hint - Hidden on Mobile */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:block">
                <span className="rounded-full border border-white/15 bg-black/75 px-3.5 py-1 text-[11px] font-semibold text-zinc-300 backdrop-blur-md shadow">
                  ← Drag handle or click anywhere to compare →
                </span>
              </div>
            </div>
          </div>

          {/* 3 Detail Cards Below Slider */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#C9A84C]/35 hover:bg-[#C9A84C]/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30">
                  01
                </span>
                <h3 className="text-sm font-bold text-white">Where It Entered</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                Zero human hesitation. The straddle engine triggers automatically the instant price
                crosses equilibrium breakout criteria.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#C9A84C]/35 hover:bg-[#C9A84C]/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-[#E8C97A] font-bold text-xs border border-amber-500/30">
                  02
                </span>
                <h3 className="text-sm font-bold text-white">Where The Stop Sat</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                Disciplined mathematical stops tailored strictly to your per-trade risk allowance,
                eliminating emotional blowout risks.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#C9A84C]/35 hover:bg-[#C9A84C]/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#C9A84C]/20 text-[#FFF0B8] font-bold text-xs border border-[#C9A84C]/40">
                  03
                </span>
                <h3 className="text-sm font-bold text-white">Where It Closed</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                Automated breakeven tracking and basket profit realization locks in gains and
                resets for the next cycle without delay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
