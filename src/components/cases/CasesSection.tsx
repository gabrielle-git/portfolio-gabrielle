"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data/projects";
import { CaseCard } from "./CaseCard";

export function CasesSection() {
  return (
    <section id="cases" className="relative w-full py-28 px-6 overflow-hidden">
      {/* Conector vindo do hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-white/10" />

      {/* Glow de atmosfera (coesão com o hero) */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[820px] h-[520px] rounded-full blur-[140px] opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <span className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] tracking-widest uppercase">
            <span className="inline-block w-6 h-px bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]" />
            03 / cases
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[var(--text-primary)] leading-[1.05] tracking-tight">
            O que eu construí
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-lg leading-relaxed">
            Projetos reais — sistemas críticos, automações e produtos com IA
            generativa. Cada um com a arquitetura documentada.
          </p>
        </motion.div>

        {/* Grid bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, index) => (
            <CaseCard
              key={project.id}
              project={project}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}