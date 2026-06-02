"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

const STATUS_CONFIG = {
  live:      { label: "LIVE",         className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  completed: { label: "CONCLUÍDO",    className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  ongoing:   { label: "EM ANDAMENTO", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  archived:  { label: "ARQUIVADO",    className: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30" },
} as const;

interface CaseCardProps {
  project: Project;
  index: number;
}

export function CaseCard({ project, index }: CaseCardProps) {
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
      x: ((cy / rect.height) - 0.5) * -16,
      y: ((cx / rect.width) - 0.5) * 16,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full"
    >
      <Link href={`/cases/${project.id}`} className="block h-full">
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
          "relative group cursor-pointer rounded-xl overflow-hidden h-full",
          "border border-white/8 bg-white/3",
          "hover:border-[var(--accent-primary)]/40 transition-colors duration-300"
        )}
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-xl transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(300px circle at ${spotlight.x}% ${spotlight.y}%, rgba(167,139,250,0.12), transparent 60%)`,
          }}
        />

        <div className="relative z-20 p-6 flex flex-col gap-4 h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className={cn("text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border", status.className)}>
                  {status.label}
                </span>
                {project.confidential && (
                  <span className="text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border bg-red-500/10 text-red-400 border-red-500/30">
                    CONFIDENCIAL
                  </span>
                )}
              </div>
              {/* Título */}
              <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors duration-200">
                {project.title}
              </h3>
            </div>

            {/* Ícone seta */}
            <div className="shrink-0 mt-1 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[var(--accent-primary)]/50 group-hover:bg-[var(--accent-primary)]/10 transition-all duration-200">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/40 group-hover:text-[var(--accent-primary)] transition-colors duration-200">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
            {project.tagline}
          </p>

          {/* Role */}
          <p className="text-xs font-mono text-[var(--accent-primary)]/70">
            ▸ {project.role}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/6 mt-auto">
            {project.stack.slice(0, 5).map((tech) => (
              <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/8">
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/30">
                +{project.stack.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}