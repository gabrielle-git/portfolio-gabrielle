"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

const STATUS_CONFIG = {
  live:      { label: "LIVE",         className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  completed: { label: "CONCLUÍDO",    className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  ongoing:   { label: "EM ANDAMENTO", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  archived:  { label: "ARQUIVADO",    className: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30" },
} as const;

interface CaseModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseModal({ project, onClose }: CaseModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, handleKey]);

  const status = project ? STATUS_CONFIG[project.status] : null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "pointer-events-auto w-full max-w-2xl max-h-[85vh] overflow-y-auto",
                "rounded-2xl border border-white/10 bg-[#0f0f0f]",
                "shadow-2xl shadow-black/60"
              )}
            >
              {/* Header sticky */}
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 pb-4 bg-[#0f0f0f] border-b border-white/6">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {status && (
                      <span className={cn("text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border", status.className)}>
                        {status.label}
                      </span>
                    )}
                    {project.confidential && (
                      <span className="text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border bg-red-500/10 text-red-400 border-red-500/30">
                        CONFIDENCIAL
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--text-primary)]">{project.title}</h2>
                  <p className="text-sm text-white/40">{project.tagline}</p>
                  <p className="text-sm font-mono text-[var(--accent-primary)]/80">▸ {project.role}</p>
                  {project.client && (
                    <p className="text-xs text-white/30 font-mono">{project.client} · {project.period}</p>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/30 transition-all duration-200"
                  aria-label="Fechar"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Conteúdo */}
              <div className="p-6 pt-5 flex flex-col gap-6">

                {/* Diagrama de arquitetura */}
                {project.heroImage && (
                  <div className="rounded-xl overflow-hidden border border-white/8 bg-white/[0.02]">
                    <Image
                      src={project.heroImage}
                      alt={`Diagrama de arquitetura — ${project.title}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Aviso NDA */}
                {project.confidential && (
                  <div className="flex gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <span className="text-red-400 text-sm shrink-0">⚠</span>
                    <p className="text-xs text-red-400/80 leading-relaxed">
                      Este projeto está sob NDA. Detalhes de implementação e código-fonte não podem ser divulgados publicamente.
                    </p>
                  </div>
                )}

                {/* Problema */}
                <div>
                  <h3 className="text-xs font-mono text-white/30 tracking-widest uppercase mb-2">O problema</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{project.problem}</p>
                </div>

                {/* Solução */}
                <div>
                  <h3 className="text-xs font-mono text-white/30 tracking-widest uppercase mb-2">A solução</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{project.solution}</p>
                </div>

                {/* Destaques técnicos */}
                {project.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">Destaques técnicos</h3>
                    <ul className="flex flex-col gap-2">
                      {project.highlights.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-white/55 leading-relaxed">
                          <span className="text-[var(--accent-primary)] mt-0.5 shrink-0">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impacto */}
                {project.impact.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">Impacto</h3>
                    <ul className="flex flex-col gap-2">
                      {project.impact.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-white/55 leading-relaxed">
                          <span className="text-emerald-400 mt-0.5 shrink-0">↗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stack */}
                <div>
                  <h3 className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 text-white/50 border border-white/8">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contexto extra */}
                {project.context && (
                  <div className="p-4 rounded-lg bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/15">
                    <h3 className="text-xs font-mono text-[var(--accent-primary)]/60 tracking-widest uppercase mb-2">Contexto</h3>
                    <p className="text-sm text-white/45 leading-relaxed italic">{project.context}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}