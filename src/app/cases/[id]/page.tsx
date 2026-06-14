import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PROJECTS, getProjectById } from "@/lib/data/projects";
import { ArchitectureDiagram } from "@/components/cases/ArchitectureDiagram";
import { ARCHITECTURES } from "@/lib/data/architectures";

const STATUS_CONFIG = {
  live:      { label: "LIVE",         className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  completed: { label: "CONCLUÍDO",    className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  ongoing:   { label: "EM ANDAMENTO", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  archived:  { label: "ARQUIVADO",    className: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30" },
} as const;

/** Repositórios públicos por case (só os que são seguros pra abrir). */
const CASE_REPOS: Record<string, string> = {
  "diario-pcdf": "https://github.com/gabrielle-git/registro",
};

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

          {CASE_REPOS[project.id] && (
            <a
              href={CASE_REPOS[project.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 mt-1 rounded-full border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5 px-4 py-2 text-sm font-mono text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Ver código no GitHub
            </a>
          )}
        </header>

        {ARCHITECTURES[project.id] ? (
          <ArchitectureDiagram {...ARCHITECTURES[project.id]} />
        ) : project.heroImage ? (
          <figure className="rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] flex justify-center">
            <Image
              src={project.heroImage}
              alt={`Diagrama de arquitetura — ${project.title}`}
              width={1600}
              height={1000}
              className="w-auto h-auto max-h-[80vh] max-w-full object-contain"
              priority
            />
          </figure>
        ) : null}

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