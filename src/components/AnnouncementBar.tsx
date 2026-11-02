"use client";

import React, { useState, useEffect } from "react";
import { defaultPreHeader, PreHeaderSettings } from "@/lib/siteSettings";

export default function AnnouncementBar() {
  const [settings, setSettings] = useState<PreHeaderSettings>(defaultPreHeader);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.preHeader) {
          setSettings(data.preHeader);
        }
      })
      .catch(() => {
        // Fallback to defaultPreHeader
      });
  }, []);

  if (!settings.enabled) return null;

  return (
    <div className="relative z-50 border-b border-[#C9A84C]/25 bg-gradient-to-r from-[#141208] via-[#1c1809] to-[#141208] px-3.5 py-2 text-center text-xs text-zinc-300">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-1.5 flex-wrap">
        <span className="font-semibold text-white">{settings.badge}</span>
        <span className="text-zinc-500 hidden sm:inline">—</span>
        <span>
          <strong className="text-[#E8C97A] font-bold">
            {settings.highlightText}
          </strong>{" "}
          {settings.mainText}{" "}
          {settings.broker1Name && settings.broker1Link && (
            <>
              <a
                href={settings.broker1Link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#E8C97A] underline decoration-[#E8C97A]/40 underline-offset-2 hover:text-white transition-colors"
              >
                {settings.broker1Name}
              </a>
              {" or "}
            </>
          )}
          {settings.broker2Name && settings.broker2Link && (
            <a
              href={settings.broker2Link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#E8C97A] underline decoration-[#E8C97A]/40 underline-offset-2 hover:text-white transition-colors"
            >
              {settings.broker2Name}
            </a>
          )}{" "}
          {settings.postText}
        </span>
      </div>
    </div>
  );
}
