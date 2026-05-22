"use client";

import { motion } from "framer-motion";
import { Typewriter } from "@/components/effects/Typewriter";

const STACK_GROUPS = [
  {
    label: "backend",
    items: ["Node.js", "TypeScript", "Python", "Flask"],
  },
  {
    label: "infra",
    items: ["Docker", "Linux", "CI/CD", "GitHub Actions"],
  },
  {
    label: "ia & automação",
    items: ["n8n", "Make", "Gemini", "Ollama", "Claude", "Eng. de Prompt"],
  },
  {
    label: "frontend",
    items: ["Next.js", "React", "Tailwind", "Vite"],
  },
  {
    label: "dados",
    items: ["SQL", "Supabase", "Firebase", "Pandas"],
  },
  {
    label: "tools",
    items: ["Cursor", "GitHub", "Obsidian", "Notion"],
  },
];

const NAME_FIRST = "Gabrielle";
const NAME_LAST = "Campelo";

export function HeroIdentity() {
  return (
    <div className="flex flex-col items-start gap-6 max-w-xl">
      <motion.div
        className="flex items-center gap-2 text-xs font-mono text-accent tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block w-6 h-px bg-accent" />
        <span>OLÁ, EU SOU</span>
      </motion.div>

      <h1
        className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight whitespace-nowrap"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        <span className="block">
          {NAME_FIRST.split("").map((char, i) => (
            <motion.span
              key={`first-${i}`}
              className="inline-block text-gradient"
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.04,
                ease: "easeOut",
              }}
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
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.7 + i * 0.04,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </h1>

      <motion.div
        className="flex items-center gap-3 text-lg md:text-xl text-fg"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <span className="text-accent font-mono">▸</span>
        <span className="font-medium">Engenheira de Software</span>
      </motion.div>

      <motion.div
        className="text-fg-muted leading-relaxed text-base md:text-lg font-light max-w-md min-h-[5em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <Typewriter
          text="Construo automações, integrações com IA e sistemas críticos."
          delay={1800}
          speed={30}
        />
      </motion.div>

      <motion.div
        className="flex flex-col gap-2 mt-2 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 4 }}
      >
        {STACK_GROUPS.map((group, gi) => (
          <motion.div
            key={group.label}
            className="flex items-start gap-3 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 4 + gi * 0.08 }}
          >
            <span className="text-fg-dim/60 font-mono text-xs w-28 tracking-widest uppercase shrink-0 pt-0.5">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-fg-muted hover:text-accent transition-colors cursor-default font-mono text-xs"
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