"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

const STATUS_CONFIG = {
  live: {
    label: "LIVE",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-400",
    hex: "#34d399",
    pulse: true,
  },
  completed: {
    label: "CONCLUÍDO",
    text: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    dot: "bg-blue-400",
    hex: "#60a5fa",
    pulse: false,
  },
  ongoing: {
    label: "EM ANDAMENTO",
    text: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    dot: "bg-amber-400",
    hex: "#fbbf24",
    pulse: false,
  },
  archived: {
    label: "ARQUIVADO",
    text: "text-zinc-400",
    border: "border-zinc-500/30",
    bg: "bg-zinc-500/10",
    dot: "bg-zinc-400",
    hex: "#a1a1aa",
    pulse: false,
  },
} as const;

interface CaseCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export function CaseCard({ project, index, featured = false }: CaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    setTilt({
      x: (cy / rect.height - 0.5) * -10,
      y: (cx / rect.width - 0.5) * 10,
    });
    setSpotlight({
      x: (cx / rect.width) * 100,
      y: (cy / rect.height) * 100,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  const status = STATUS_CONFIG[project.status];
  const num = (index + 1).toString().padStart(2, "0");
  const stackLimit = featured ? 7 : 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn("h-full", featured && "sm:col-span-2 lg:col-span-2")}
    >
      <Link
        href={`/cases/${project.id}`}
        aria-label={`Ver case: ${project.title}`}
        className="block h-full"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition:
              tilt.x === 0 && tilt.y === 0
                ? "transform 0.5s ease"
                : "transform 0.1s linear",
          }}
          className={cn(
            "relative group cursor-pointer rounded-2xl overflow-hidden h-full",
            "border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015]",
            "backdrop-blur-sm transition-colors duration-300",
            "hover:border-[var(--accent-primary)]/40"
          )}
        >
          {/* Linha de topo (cor do status) */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to right, transparent, ${status.hex}, transparent)`,
            }}
          />

          {/* Corner glow */}
          <div
            className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-15 group-hover:opacity-40 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${status.hex}55, transparent 70%)`,
            }}
          />

          {/* Número da unidade (marca d'água) */}
          <span className="pointer-events-none absolute top-4 right-5 font-mono text-3xl font-bold text-white/[0.04] group-hover:text-white/[0.07] transition-colors select-none">
            {num}
          </span>

          {/* Spotlight que segue o cursor */}
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(320px circle at ${spotlight.x}% ${spotlight.y}%, rgba(167,139,250,0.13), transparent 60%)`,
            }}
          />

          <div className="relative z-20 p-6 flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-2">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border",
                      status.text,
                      status.border,
                      status.bg
                    )}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      {status.pulse && (
                        <span
                          className={cn(
                            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                            status.dot
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "relative inline-flex h-1.5 w-1.5 rounded-full",
                          status.dot
                        )}
                      />
                    </span>
                    {status.label}
                  </span>
                  {project.confidential && (
                    <span className="text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border bg-red-500/10 text-red-400 border-red-500/30">
                      CONFIDENCIAL
                    </span>
                  )}
                </div>
                {/* Título */}
                <h3
                  className={cn(
                    "font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors duration-200",
                    featured ? "text-xl sm:text-2xl" : "text-lg"
                  )}
                >
                  {project.title}
                </h3>
              </div>

              {/* Seta */}
              <div className="shrink-0 mt-1 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[var(--accent-primary)]/50 group-hover:bg-[var(--accent-primary)]/10 transition-all duration-200">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-white/40 group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                >
                  <path
                    d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Tagline */}
            <p
              className={cn(
                "text-sm text-white/50 leading-relaxed",
                !featured && "line-clamp-2"
              )}
            >
              {project.tagline}
            </p>

            {/* Role */}
            <p className="text-xs font-mono text-[var(--accent-primary)]/70">
              ▸ {project.role}
            </p>

            {/* Impacto (só no card em destaque) */}
            {featured && project.impact[0] && (
              <div className="rounded-lg border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/[0.06] px-3 py-2">
                <span className="block text-[9px] font-mono tracking-widest uppercase text-[var(--accent-primary)]/70 mb-0.5">
                  impacto
                </span>
                <span className="text-sm text-white/85 leading-snug">
                  {project.impact[0]}
                </span>
              </div>
            )}

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06] mt-auto">
              {project.stack.slice(0, stackLimit).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] tracking-wide px-2 py-0.5 rounded-md bg-white/[0.025] text-white/45 border border-white/[0.08] group-hover:border-white/15 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > stackLimit && (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.025] text-white/35 border border-white/[0.08]">
                  +{project.stack.length - stackLimit}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}