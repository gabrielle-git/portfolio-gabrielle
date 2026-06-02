"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data/projects";
import { CaseCard } from "./CaseCard";
import { CaseModal } from "./CaseModal";
import type { Project } from "@/lib/data/projects";

export function CasesSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section id="cases" className="relative w-full py-24 px-6">
        {/* Linha decorativa */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-white/10" />

        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <span className="text-xs font-mono text-[var(--accent-primary)]/60 tracking-widest uppercase">
              02 / cases
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] leading-tight">
              O que eu construí
            </h2>
            <p className="text-white/40 text-sm max-w-lg leading-relaxed">
              Projetos reais — sistemas críticos, automações e produtos com IA generativa.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((project, index) => (
              <CaseCard
                key={project.id}
                project={project}
                index={index}
                onClick={setSelected}
              />
            ))}
          </div>
        </div>
      </section>

      <CaseModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}