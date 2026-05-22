"use client";

import { useEffect, useState } from "react";

export function HeroStatusBar() {
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const h = Math.floor(elapsed / 3600).toString().padStart(2, "0");
      const m = Math.floor((elapsed % 3600) / 60).toString().padStart(2, "0");
      const s = (elapsed % 60).toString().padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between w-full text-xs font-mono tracking-widest uppercase">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-accent bg-accent/5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-accent font-semibold">online</span>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-default bg-bg-secondary/30 backdrop-blur-sm">
          <span className="text-fg-dim">uptime</span>
          <span className="text-accent tabular-nums font-semibold">
            {uptime}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-default bg-bg-secondary/30 backdrop-blur-sm">
          <span className="text-fg-dim">loc</span>
          <span className="text-accent font-semibold">br · df</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-default bg-bg-secondary/30 backdrop-blur-sm">
          <span className="text-fg-dim">v</span>
          <span className="text-accent font-semibold">1.0.0</span>
        </div>
      </div>
    </div>
  );
}