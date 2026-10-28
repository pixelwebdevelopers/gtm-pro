"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  color: string;
}

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeInterval, setActiveInterval] = useState("15");
  const [isChartLoading, setIsChartLoading] = useState(false);

  const handleIntervalChange = (val: string) => {
    if (val === activeInterval) return;
    setIsChartLoading(true);
    setActiveInterval(val);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // High DPI sharp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    // Gold, amber, and glowing star particles
    const particleColors = [
      "rgba(255, 232, 163, 0.85)",
      "rgba(243, 202, 101, 0.8)",
      "rgba(212, 175, 55, 0.75)",
      "rgba(255, 255, 255, 0.7)",
    ];

    const particleCount = Math.min(Math.floor((width * height) / 13000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseRadius = Math.random() * 1.8 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: baseRadius,
        baseRadius,
        alpha: Math.random() * 0.5 + 0.3,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    const maxLineDist = 120;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const radialGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.2
        );
        radialGrad.addColorStop(0, "rgba(212, 175, 55, 0.12)");
        radialGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 2;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
          p.radius = p.baseRadius * 1.4;
        } else {
          p.radius = p.baseRadius;
        }

        ctx.fillStyle = p.color;
        ctx.shadowColor = "rgba(212, 175, 55, 0.6)";
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distP = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (distP < maxLineDist) {
            const lineOpacity = (1 - distP / maxLineDist) * 0.28;
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineOpacity})`;
            ctx.lineWidth = 0.85;
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (dist < mouse.radius) {
          const mouseLineOpacity = (1 - dist / mouse.radius) * 0.45;
          ctx.strokeStyle = `rgba(255, 232, 163, ${mouseLineOpacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const chartUrl = `https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#%7B%22autosize%22%3Atrue%2C%22symbol%22%3A%22OANDA%3AXAUUSD%22%2C%22interval%22%3A%22${activeInterval}%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22hide_top_toolbar%22%3Afalse%2C%22hide_legend%22%3Afalse%2C%22allow_symbol_change%22%3Afalse%2C%22save_image%22%3Afalse%2C%22calendar%22%3Afalse%2C%22support_host%22%3A%22https%3A%2F%2Fwww.tradingview.com%22%7D`;

  return (
    <section className="relative min-h-[calc(100vh-76px)] overflow-hidden flex items-center py-10 lg:py-16">
      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ zIndex: 1 }}
      />

      {/* Ambient background gold glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] rounded-full bg-[#C9A84C]/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[110px] pointer-events-none" />

      {/* 2-Column Split Grid */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr] w-full">
        {/* Left Column: Heading, Subtitles, CTAs */}
        <div>
          {/* Top Pill Badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#C9A84C]/40 bg-black/50 px-4 py-2 backdrop-blur-md shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.85)] animate-pulse" />
            <span className="text-[11px] font-black tracking-[0.18em] text-[#E8C97A] uppercase sm:text-xs">
              Automated MT4/MT5 Trading · v4.2.7
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.0] text-white">
            Trade <span className="gold-text">XAUUSD</span> <br />with Structure
          </h1>

          {/* Tagline */}
          <p className="mt-5 text-lg sm:text-xl font-bold tracking-tight text-[#E8C97A]">
            Optimized for Gold Trading. Built for MT4 & MT5.
          </p>

          {/* Subtitle */}
          <p className="mt-3.5 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-300">
            GTM PRO (<strong className="text-white">GoldTacticalMachine.com</strong>) automates trade
            execution and basket management using a structured trading approach designed for
            traders who prefer consistency over manual execution.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#F0D896] to-[#C9A84C] px-7 py-4 text-sm font-black text-zinc-950 shadow-2xl shadow-[#C9A84C]/25 transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              <span>Get GTM PRO v4.2.7</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-black text-white transition-colors hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>How It Works</span>
            </a>
          </div>

          {/* Key Quick Benefits */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {[
              "100% Automated Straddle",
              "Cent & Standard Accounts",
              "Rollover Pause Window",
              "Server License Binding",
            ].map((feat) => (
              <div
                key={feat}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-zinc-300"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  ✓
                </span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: The Glowing Live Gold Chart */}
        <div className="relative w-full -mx-3.5 sm:mx-0 w-[calc(100%+1.75rem)] sm:w-full">
          {/* Ambient Gold Aura behind chart */}
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[#C9A84C]/25 blur-3xl pointer-events-none" />

          {/* Outer Glass Card */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/20 bg-white/[0.07] p-1.5 sm:p-4 pt-2.5 sm:pt-4 shadow-2xl shadow-black/80 backdrop-blur-2xl">
            {/* Terminal Bar Header */}
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-white/10 px-2">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/40 font-mono text-[11px] sm:text-xs font-black text-[#E8C97A]">
                  AU
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    XAU/USD
                  </span>
                  <span className="hidden sm:inline text-xs sm:text-sm font-medium text-zinc-400">
                    · Gold Spot
                  </span>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black text-emerald-400 border border-emerald-500/40 uppercase">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Timeframe Buttons */}
              <div className="flex items-center gap-1">
                {["15", "60", "240", "D"].map((val, idx) => {
                  const labels = ["15M", "1H", "4H", "1D"];
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleIntervalChange(val)}
                      className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all cursor-pointer active:scale-95 ${
                        activeInterval === val
                          ? "bg-[#C9A84C] text-black shadow"
                          : "text-zinc-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {labels[idx]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inner Chart Iframe Container */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-[1.5rem] border border-white/10 bg-black/60 shadow-inner">
              {isChartLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#C9A84C]/25 border-t-[#C9A84C]" />
                  <span className="mt-2 text-[11px] font-mono font-bold text-[#E8C97A]">
                    Loading {activeInterval === "D" ? "1D" : activeInterval === "240" ? "4H" : activeInterval === "60" ? "1H" : "15M"} Chart...
                  </span>
                </div>
              )}
              <iframe
                key={activeInterval}
                title="Live XAUUSD Gold Chart"
                src={chartUrl}
                className="h-[390px] sm:h-[430px] md:h-[460px] w-full border-0"
                loading="eager"
                onLoad={() => setIsChartLoading(false)}
              />
            </div>
          </div>

          <p className="mt-3 px-2 text-center sm:text-left text-xs leading-relaxed text-zinc-400">
            Live chart is for real-time market reference. GTM PRO executes autonomously inside your
            own MetaTrader desktop terminal or VPS.
          </p>
        </div>
      </div>
    </section>
  );
}
