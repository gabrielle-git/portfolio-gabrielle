"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PROJECTS, allStackTechnologies } from "@/lib/data/projects";

const FOCO = [
  "Backend",
  "Automação",
  "IA aplicada",
  "Sistemas críticos",
  "Integração de dados",
];

// Stats reais derivados dos dados (atualizam sozinhos se você adicionar projetos)
const TOTAL_PROJETOS = PROJECTS.length;
const PROJETOS_LIVE = PROJECTS.filter((p) => p.status === "live").length;
const TOTAL_TECH = allStackTechnologies.length;

function ProfileRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="text-white/30 w-12 shrink-0">{label}</dt>
      <dd className="text-white/75">{children}</dd>
    </div>
  );
}

function StatTile({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2.5 text-center">
      <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">
        {value}
      </div>
      <div className="text-[9px] font-mono uppercase tracking-wider text-white/35 mt-0.5">
        {label}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="sobre" className="relative w-full py-28 px-6 overflow-hidden">
      {/* Conector */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-white/10" />

      {/* Glow de atmosfera */}
      <div
        className="pointer-events-none absolute top-1/3 right-0 w-[600px] h-[500px] rounded-full blur-[150px] opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto flex flex-col gap-12">
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
            04 / sobre
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[var(--text-primary)] leading-[1.05] tracking-tight">
            Quem está por trás
          </h2>
        </motion.div>

        {/* Conteúdo: (foto + painel) | bio */}
        <div className="grid gap-10 md:grid-cols-[300px_1fr] md:gap-12 items-start">
          {/* Coluna visual: foto em cima, painel embaixo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 mx-auto md:mx-0 w-full max-w-[320px]"
          >
            {/* ===== FOTO / AVATAR ===== */}
            <div className="relative">
              {/* Glow atrás */}
              <div className="absolute -inset-3 rounded-2xl bg-[var(--accent-primary)]/15 blur-2xl -z-10" />

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.1] bg-gradient-to-br from-[var(--accent-dim)]/25 via-[var(--bg-secondary)] to-black">
                {/* Linha de topo */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-70 z-20" />

                {/* Imagem */}
                <Image
                  src="/sobre.jpg"
                  alt="Gabrielle Campelo"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="320px"
                />

                {/* Scanlines sutis (vibe CRT / pixel) */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06] z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
                  }}
                />

                {/* Gradiente embaixo pra dar profundidade */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

                {/* Cantos estilo HUD */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-[var(--accent-primary)]/50 z-20" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-[var(--accent-primary)]/50 z-20" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-[var(--accent-primary)]/50 z-20" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-[var(--accent-primary)]/50 z-20" />
              </div>
            </div>

            {/* ===== PAINEL (estilo terminal / HUD) ===== */}
            <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015] backdrop-blur-sm overflow-hidden">
              {/* Linha de topo */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-60" />

              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-2 font-mono text-[10px] text-white/30 tracking-wider">
                  ~/gabrielle/perfil.json
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-4">
                {/* Readout */}
                <dl className="font-mono text-xs space-y-2">
                  <ProfileRow label="nome">Gabrielle Campelo</ProfileRow>
                  <ProfileRow label="cargo">Engenheira de Software</ProfileRow>
                  <ProfileRow label="local">Brasília-DF · remota</ProfileRow>
                  <ProfileRow label="status">
                    <span className="text-emerald-400">● disponível</span>
                  </ProfileRow>
                  <ProfileRow label="foco">backend · automação · IA</ProfileRow>
                </dl>

                {/* Divider */}
                <div className="h-px bg-white/[0.06]" />

                {/* Stats reais */}
                <div className="grid grid-cols-3 gap-2">
                  <StatTile value={TOTAL_PROJETOS} label="projetos" />
                  <StatTile value={PROJETOS_LIVE} label="em produção" />
                  <StatTile value={TOTAL_TECH} label="tecnologias" />
                </div>

                {/* Linha viva */}
                <div className="font-mono text-[10px] text-white/30">
                  <span className="text-[var(--accent-primary)]">$</span> sistema
                  pronto
                  <span className="cursor-blink" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <p className="text-white/75 leading-relaxed text-base sm:text-lg">
              Sou engenheira de software baseada em Brasília, com foco em backend,
              automação e integração de agentes de IA. Gosto de construir coisas que
              precisam funcionar de verdade — não só no caminho feliz, mas quando a rede
              cai, o dado vem sujo e o usuário faz o que ninguém previu.
            </p>
            <p className="text-white/60 leading-relaxed">
              Meu trabalho vai de produto a infraestrutura: liderei a parte técnica de um
              SaaS de nutrição com IA generativa, construí automação documental para um
              órgão de segurança pública e desenhei pipelines de dados resilientes para
              captação de leads. Em cada um, o que me importa é a engenharia por trás —
              idempotência, observabilidade e decisões que não viram dívida técnica em
              seis meses.
            </p>
            <p className="text-white/60 leading-relaxed">
              Tenho carinho especial por decisões de arquitetura de longo prazo e por
              saber quando <span className="text-white/85">não</span> usar a ferramenta da
              moda. Documento o que faço, abstraio o que vai mudar e prefiro um sistema
              auditável e previsível a um truque esperto. E estou sempre estudando — hoje
              cursando análise e desenvolvimento de sistemas e aprofundando em engenharia
              de software, dados e segurança.
            </p>

            {/* Áreas de foco */}
            <div className="flex flex-wrap gap-2 pt-2">
              {FOCO.map((item) => (
                <span
                  key={item}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-white/55 border border-white/[0.08] hover:text-white hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-primary)]/10 transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}