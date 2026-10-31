"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import NextImage from "next/image";

export default function ChartComparisonSection() {
  // Initially show With GTM PRO on 80% of the chart (slider at 20%)
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

  useEffect(() => {
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
    <section id="preview" className="relative px-3.5 py-24 sm:px-8 bg-[#070709] border-t border-white/[0.08] overflow-hidden">
      {/* Ambient background gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#C9A84C]/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center px-1.5 sm:px-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/35 bg-[#C9A84C]/10 px-4 py-1.5 text-xs font-black tracking-widest text-[#E8C97A] uppercase shadow-md shadow-[#C9A84C]/10">
            <span className="h-2 w-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span>INTERACTIVE PREVIEW</span>
          </div>

          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
            Same Candles. <br className="hidden sm:inline" />
            <span className="gold-text">Every Trade Marked.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-300 font-normal">
            Drag the slider and watch GTM PRO appear on the chart: where it entered, where it added layers, and where the basket closed. The candles never change. Only the decisions do — and every one follows the rules.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-black tracking-wider text-[#E8C97A] uppercase">
            <span className="rounded-md bg-[#C9A84C]/15 border border-[#C9A84C]/30 px-2.5 py-1">
              GTM PRO EA · BEFORE / AFTER COMPARISON
            </span>
          </div>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="mt-14 mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/20 bg-black/90 p-1.5 sm:p-4 shadow-2xl shadow-black backdrop-blur-2xl w-full mx-auto">
            {/* Terminal Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-white/10 px-2 sm:px-3 pb-2.5 sm:pb-3 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/80 inline-block" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono font-bold text-zinc-300">
                  XAUUSD · Before &amp; After GTM PRO
                </span>
              </div>

              {/* View Buttons */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="hidden sm:inline text-xs text-zinc-400 font-medium mr-1">View:</span>
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
                  Split View
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
                  With GTM PRO
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
              {/* Bottom Layer: After Image (GTM PRO Overlay) */}
              <div className="absolute inset-0 h-full w-full pointer-events-none select-none bg-black">
                <NextImage
                  src="/after-chart.png"
                  alt="With GTM PRO Marked Entries and Layers"
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
                  alt="Raw XAUUSD Market Candles Before GTM PRO"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Left Label: RAW CANDLES · BEFORE */}
              <div
                className={`absolute top-4 left-4 z-20 transition-opacity duration-200 pointer-events-none hidden sm:flex ${
                  sliderPosition < 15 ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/80 px-3 py-1.5 backdrop-blur-md shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-zinc-400" />
                  <span className="text-xs font-bold tracking-wide text-zinc-200">
                    RAW CANDLES · BEFORE
                  </span>
                </div>
              </div>

              {/* Right Label: WITH GTM PRO · AFTER */}
              <div
                className={`absolute top-4 right-4 z-20 transition-opacity duration-200 pointer-events-none hidden sm:flex ${
                  sliderPosition > 85 ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-2 rounded-xl border border-[#C9A84C]/50 bg-black/80 px-3 py-1.5 backdrop-blur-md shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-black tracking-wide text-[#E8C97A]">
                    WITH GTM PRO · AFTER
                  </span>
                </div>
              </div>

              {/* Vertical Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 z-30 w-0.5 bg-gradient-to-b from-[#FFF0B8] via-[#E8C97A] to-[#C9A84C] shadow-[0_0_15px_rgba(201,168,76,0.9)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Handle with "GTM PRO" label */}
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-2 border-white/50 bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-3 py-1.5 text-zinc-950 shadow-[0_0_20px_rgba(201,168,76,0.7)] cursor-ew-resize transition-transform hover:scale-105 active:scale-95 pointer-events-auto">
                  <span className="text-[10px] font-black tracking-wider uppercase whitespace-nowrap">
                    GTM PRO
                  </span>
                </div>
              </div>

              {/* Hint under chart: Drag the handle or click anywhere to compare */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:block">
                <span className="rounded-full border border-white/15 bg-black/80 px-3.5 py-1 text-[11px] font-semibold text-zinc-300 backdrop-blur-md shadow">
                  ← Drag the handle or click anywhere to compare →
                </span>
              </div>
            </div>
          </div>

          {/* Small Note Under Chart */}
          <p className="mt-3 text-center text-xs text-zinc-400">
            Illustrative example. Real results vary.
          </p>

          {/* 3 Detail Cards Below Slider */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#C9A84C]/35 hover:bg-[#C9A84C]/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30">
                  01
                </span>
                <h3 className="text-sm font-bold text-white">01 · Where It Entered</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                No hesitation. The straddle triggers automatically the moment price breaks above or below the trap, and the opposite order is cancelled.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#C9A84C]/35 hover:bg-[#C9A84C]/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-[#E8C97A] font-bold text-xs border border-amber-500/30">
                  02
                </span>
                <h3 className="text-sm font-bold text-white">02 · Where It Added Layers</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                When price pulled back, GTM PRO added positions at fixed spacing and controlled lot steps, exactly as its rules define.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#C9A84C]/35 hover:bg-[#C9A84C]/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#C9A84C]/20 text-[#FFF0B8] font-bold text-xs border border-[#C9A84C]/40">
                  03
                </span>
                <h3 className="text-sm font-bold text-white">03 · Where It Closed</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                All positions closed together at one basket take profit. The cycle reset and a new one began automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
