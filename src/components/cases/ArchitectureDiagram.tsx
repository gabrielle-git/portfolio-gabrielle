"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type ArchNode = { id: string; label: string; detail: string };

export type ArchLayer = {
  id: string;
  name: string;
  tag: string;
  hex: string;
  text: string;
  border: string;
  bg: string;
  dot: string;
  nodes: ArchNode[];
  flowLabel?: string; // rótulo do conector ABAIXO desta camada
};

export type ArchData = {
  liveLabel: string;
  overview: string;
  layers: ArchLayer[];
};

export function ArchitectureDiagram({ liveLabel, overview, layers }: ArchData) {
  const [active, setActive] = useState<ArchNode | null>(null);
  const reduce = useReducedMotion();

  return (
    <figure className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm overflow-hidden">
      {/* Linha de topo */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-60" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="relative flex h-2 w-2">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-white/60 tracking-widest uppercase">{liveLabel}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] text-white/35">
          {layers.map((l) => (
            <span key={l.id} className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${l.dot}`} />
              {l.name.split(" · ")[0]}
            </span>
          ))}
        </div>
      </div>

      {/* Bandas */}
      <div className="p-5 sm:p-7 flex flex-col">
        {layers.map((layer, i) => (
          <div key={layer.id}>
            {/* Banda da camada */}
            <div className={`rounded-xl border ${layer.border} ${layer.bg} p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`font-mono text-[10px] font-bold ${layer.text}`}>
                  {layer.tag}
                </span>
                <span className={`font-mono text-[11px] tracking-widest uppercase ${layer.text}`}>
                  {layer.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.nodes.map((node) => {
                  const isActive = active?.id === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onPointerEnter={() => setActive(node)}
                      onPointerLeave={() => setActive(null)}
                      onClick={() => setActive(node)}
                      className={`text-left font-mono text-[11px] rounded-lg border px-3 py-2 transition-all ${
                        isActive
                          ? `${layer.border} bg-white/[0.06] text-white -translate-y-px`
                          : "border-white/[0.08] bg-white/[0.02] text-white/55 hover:text-white/80"
                      }`}
                      style={isActive ? { boxShadow: `0 0 20px ${layer.hex}40` } : undefined}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conector animado entre as camadas */}
            {i < layers.length - 1 && (
              <div className="relative h-12 flex items-center justify-center">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
                {!reduce && (
                  <motion.span
                    className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full"
                    style={{ background: layer.hex, boxShadow: `0 0 8px ${layer.hex}` }}
                    animate={{ top: ["8%", "92%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                  />
                )}
                {layer.flowLabel && (
                  <span className="absolute left-1/2 ml-4 font-mono text-[9px] uppercase tracking-widest text-white/30 whitespace-nowrap">
                    {layer.flowLabel}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Inspector */}
      <figcaption className="px-5 sm:px-7 pb-5">
        <div className="rounded-lg border border-white/[0.08] bg-black/20 px-4 py-3 min-h-[64px] flex items-center">
          {active ? (
            <p className="text-sm text-white/75 leading-relaxed">
              <span className="font-mono text-[var(--accent-primary)]">{active.label}</span>
              <span className="text-white/40"> — </span>
              {active.detail}
            </p>
          ) : (
            <p className="text-sm text-white/45 leading-relaxed">{overview}</p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}