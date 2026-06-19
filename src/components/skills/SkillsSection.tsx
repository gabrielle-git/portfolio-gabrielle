"use client";

import { motion, type Variants } from "framer-motion";

const SERVER_SIDE = [
  {
    category: "linguagens",
    color: "accent",
    items: ["Node.js", "TypeScript", "Python", "Flask"],
  },
  {
    category: "ia & automação",
    color: "accent",
    items: ["n8n", "Make", "Gemini", "Claude", "Ollama", "Eng. de Prompt"],
  },
  {
    category: "infra",
    color: "accent",
    items: ["Docker", "Linux", "CI/CD", "GitHub Actions"],
  },
  {
    category: "dados",
    color: "accent",
    items: ["PostgreSQL", "Supabase", "Firebase", "Pandas"],
  },
];

const CLIENT_SIDE = [
  {
    category: "frameworks",
    color: "cyan",
    items: ["Next.js", "React", "Vite"],
  },
  {
    category: "estilização",
    color: "cyan",
    items: ["Tailwind CSS", "Framer Motion", "CSS Modules"],
  },
  {
    category: "ferramentas",
    color: "cyan",
    items: ["Figma", "Cursor", "GitHub", "Obsidian"],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] },
  }),
};

function SkillGroup({
  category,
  items,
  side,
  index,
}: {
  category: string;
  items: string[];
  side: "server" | "client";
  index: number;
}) {
  const chipBase =
    "font-mono text-[11px] tracking-wide px-2.5 py-1 rounded-md border transition-all duration-200 cursor-default";

  const chipStyle =
    side === "server"
      ? "text-fg-muted border-border-default bg-white/[0.015] hover:text-accent hover:border-accent/50 hover:bg-accent/8 hover:shadow-[0_0_16px_rgba(139,92,246,0.2)]"
      : "text-fg-muted border-border-default bg-white/[0.015] hover:text-[#22d3ee] hover:border-[#22d3ee]/40 hover:bg-[#22d3ee]/8 hover:shadow-[0_0_16px_rgba(34,211,238,0.18)]";

  return (
    <motion.div
      className="flex flex-col gap-2"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
    >
      <span
        className={`text-[10px] font-mono tracking-[0.25em] uppercase ${
          side === "server" ? "text-accent/60" : "text-[#22d3ee]/60"
        }`}
      >
        {category}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className={`${chipBase} ${chipStyle}`}>
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#22d3ee]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px w-8 bg-accent/50" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-fg-dim">
            // 02 / stack
          </span>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            <span className="text-gradient">Full-stack</span>
            <span className="text-fg"> de verdade.</span>
          </h2>
          <p className="mt-3 text-fg-muted text-base font-light max-w-lg">
            Do servidor à interface — sistemas críticos que escalam e interfaces
            que encantam.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 lg:gap-0">
          {/* Server Side */}
          <div className="pr-0 lg:pr-12 pb-12 lg:pb-0">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
              <span className="text-sm font-semibold text-fg tracking-wide">
                Server Side
              </span>
              <span className="text-xs font-mono text-fg-dim">
                backend · ia · infra · dados
              </span>
            </motion.div>

            <div className="flex flex-col gap-5">
              {SERVER_SIDE.map((group, i) => (
                <SkillGroup
                  key={group.category}
                  category={group.category}
                  items={group.items}
                  side="server"
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center gap-0">
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-border-default to-transparent" />
            <div className="my-4 flex flex-col items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              <div className="w-1 h-1 rounded-full bg-border-default" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]/60" />
            </div>
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-border-default to-transparent" />
          </div>

          <div className="block lg:hidden h-px bg-border-default mb-12" />

          {/* Client Side */}
          <div className="pl-0 lg:pl-12">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
              <span className="text-sm font-semibold text-fg tracking-wide">
                Client Side
              </span>
              <span className="text-xs font-mono text-fg-dim">
                frontend · ui · dx
              </span>
            </motion.div>

            <div className="flex flex-col gap-5">
              {CLIENT_SIDE.map((group, i) => (
                <SkillGroup
                  key={group.category}
                  category={group.category}
                  items={group.items}
                  side="client"
                  index={i + SERVER_SIDE.length}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom connector to next section */}
        <div className="mt-20 flex justify-center">
          <div className="flex flex-col items-center gap-1.5 opacity-30">
            <div className="w-px h-8 bg-gradient-to-b from-border-default to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
