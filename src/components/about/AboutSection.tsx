"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FOCO = ["Backend", "Automação", "IA aplicada", "Sistemas críticos", "Integração de dados"];

export function AboutSection() {
  return (
    <section id="sobre" className="relative w-full py-24 px-6">
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
            03 / sobre
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] leading-tight">
            Quem está por trás
          </h2>
        </motion.div>

        {/* Conteúdo: foto + bio */}
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-12 items-start">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto md:mx-0"
          >
            {/* Glow atrás da foto */}
            <div className="absolute -inset-3 rounded-2xl bg-[var(--accent-primary)]/15 blur-2xl" />
            <div className="relative w-[260px] h-[320px] rounded-2xl overflow-hidden border border-white/10">
              {/*
                PLACEHOLDER: por enquanto usa o avatar.
                Para colocar SUA FOTO real:
                1. salve a imagem em public/ (ex.: public/sobre.jpg)
                2. troque o src abaixo para "/sobre.jpg"
              */}
              <Image
                src="/avatar.png"
                alt="Gabrielle Campelo"
                fill
                className="object-cover"
                sizes="260px"
              />
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
            <p className="text-white/60 leading-relaxed">
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
              saber quando <span className="text-white/80">não</span> usar a ferramenta da
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
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/8"
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