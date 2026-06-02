import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PROJECTS, getProjectById } from "@/lib/data/projects";

const STATUS_CONFIG = {
  live:      { label: "LIVE",         className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  completed: { label: "CONCLUÍDO",    className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  ongoing:   { label: "EM ANDAMENTO", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  archived:  { label: "ARQUIVADO",    className: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30" },
} as const;

/** Pré-renderiza uma página estática para cada case (melhor SEO e performance) */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

/** Metadata por case: título e descrição próprios na aba e no compartilhamento */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Case não encontrado · Gabrielle Campelo" };
  return {
    title: `${project.title} · Gabrielle Campelo`,
    description: project.tagline,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const status = STATUS_CONFIG[project.status];

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Barra superior fixa com voltar */}
      <div className="sticky top-0 z-30 backdrop-blur bg-[var(--bg-primary)]/80 border-b border-white/6">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/#cases"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[var(--accent-primary)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar aos cases
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12 sm:py-16 flex flex-col gap-12">
        {/* Cabeçalho */}
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <span className={`text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border ${status.className}`}>
              {status.label}
            </span>
            {project.confidential && (
              <span className="text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border bg-red-500/10 text-red-400 border-red-500/30">
                CONFIDENCIAL
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
            {project.tagline}
          </p>

          <div className="flex flex-col gap-1 pt-2">
            <p className="text-sm font-mono text-[var(--accent-primary)]/80">▸ {project.role}</p>
            <p className="text-xs font-mono text-white/30">
              {project.client ? `${project.client} · ${project.period}` : project.period}
            </p>
          </div>
        </header>

        {/* Diagrama de arquitetura em destaque */}
        {project.heroImage && (
          <figure className="rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02]">
            <Image
              src={project.heroImage}
              alt={`Diagrama de arquitetura — ${project.title}`}
              width={1600}
              height={1000}
              className="w-full h-auto"
              priority
            />
          </figure>
        )}

        {/* Aviso NDA */}
        {project.confidential && (
          <div className="flex gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
            <span className="text-red-400 shrink-0">⚠</span>
            <p className="text-sm text-red-400/80 leading-relaxed">
              Este projeto está sob NDA. Detalhes de implementação e código-fonte não podem ser divulgados publicamente.
            </p>
          </div>
        )}

        {/* Problema + Solução lado a lado */}
        <section className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-mono text-white/30 tracking-widest uppercase">O problema</h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">{project.problem}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-mono text-white/30 tracking-widest uppercase">A solução</h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">{project.solution}</p>
          </div>
        </section>

        {/* Destaques técnicos */}
        {project.highlights.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-mono text-white/30 tracking-widest uppercase">Destaques técnicos</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.highlights.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/60 leading-relaxed">
                  <span className="text-[var(--accent-primary)] mt-0.5 shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Impacto */}
        {project.impact.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-mono text-white/30 tracking-widest uppercase">Impacto</h2>
            <ul className="flex flex-col gap-3">
              {project.impact.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/60 leading-relaxed">
                  <span className="text-emerald-400 mt-0.5 shrink-0">↗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Stack */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-mono text-white/30 tracking-widest uppercase">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/8">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Contexto */}
        {project.context && (
          <section className="p-6 rounded-2xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/15">
            <h2 className="text-xs font-mono text-[var(--accent-primary)]/60 tracking-widest uppercase mb-3">Contexto</h2>
            <p className="text-sm sm:text-base text-white/55 leading-relaxed italic">{project.context}</p>
          </section>
        )}

        {/* Voltar no rodapé */}
        <div className="pt-8 border-t border-white/6">
          <Link
            href="/#cases"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[var(--accent-primary)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar aos cases
          </Link>
        </div>
      </article>
    </main>
  );
}