"use client";

import { motion } from "framer-motion";
import { Typewriter } from "@/components/effects/Typewriter";

const STACK_GROUPS = [
  { label: "backend", items: ["Node.js", "TypeScript", "Python", "Flask"] },
  { label: "infra", items: ["Docker", "Linux", "CI/CD", "GitHub Actions"] },
  {
    label: "ia & automação",
    items: ["n8n", "Make", "Gemini", "Ollama", "Claude", "Eng. de Prompt"],
  },
  { label: "frontend", items: ["Next.js", "React", "Tailwind", "Vite"] },
  { label: "dados", items: ["SQL", "Supabase", "Firebase", "Pandas"] },
  { label: "tools", items: ["Cursor", "GitHub", "Obsidian", "Notion"] },
];

const NAME_FIRST = "Gabrielle";
const NAME_LAST = "Campelo";

export function HeroIdentity() {
  return (
    <div className="flex flex-col items-start gap-6 max-w-xl">
      {/* eyebrow */}
      <motion.div
        className="flex items-center gap-2 text-xs font-mono text-accent tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="inline-block w-6 h-px bg-accent shadow-[0_0_8px_var(--accent-glow)]" />
        <span>OLÁ, EU SOU</span>
      </motion.div>

      {/* nome com glow */}
      <h1
        className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight whitespace-nowrap"
        style={{
          fontFamily: "var(--font-pixel)",
          filter: "drop-shadow(0 0 26px rgba(139,92,246,0.45))",
        }}
      >
        <span className="block">
          {NAME_FIRST.split("").map((char, i) => (
            <motion.span
              key={`first-${i}`}
              className="inline-block text-gradient"
              initial={{ opacity: 0, y: 18, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.03, ease: "easeOut" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
        <span className="block">
          {NAME_LAST.split("").map((char, i) => (
            <motion.span
              key={`last-${i}`}
              className="inline-block text-gradient"
              initial={{ opacity: 0, y: 18, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.4, delay: 0.42 + i * 0.03, ease: "easeOut" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </h1>

      {/* cargo + disciplinas */}
      <motion.div
        className="flex items-center gap-2.5 text-lg md:text-xl text-fg flex-wrap"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <span className="text-accent font-mono">▸</span>
        <span className="font-medium">Engenheira de Software</span>
        <span className="text-fg-dim font-light">·</span>
        <span className="text-fg-muted text-base font-light">Backend</span>
        <span className="text-fg-dim font-light">·</span>
        <span className="text-fg-muted text-base font-light">Automação</span>
        <span className="text-fg-dim font-light">·</span>
        <span className="text-fg-muted text-base font-light">IA</span>
      </motion.div>

      {/* tagline com efeito typewriter */}
      <motion.div
        className="text-fg-muted leading-relaxed text-base md:text-lg font-light max-w-md min-h-[5em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Typewriter
          text="Construo automações, integrações com IA e sistemas críticos."
          delay={700}
          speed={28}
        />
      </motion.div>

      {/* stack em chips */}
      <motion.div
        className="flex flex-col gap-2.5 mt-2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.65 }}
      >
        {STACK_GROUPS.map((group, gi) => (
          <motion.div
            key={group.label}
            className="flex items-start gap-3 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + gi * 0.06 }}
          >
            <span className="text-fg-dim/60 font-mono text-[10px] w-24 tracking-widest uppercase shrink-0 pt-2 text-right">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[11px] tracking-wide text-fg-muted px-2.5 py-1 rounded-md border border-border-default bg-white/[0.015] hover:text-fg hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_18px_rgba(139,92,246,0.25)] hover:-translate-y-px transition-all cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}