import type { ProjectContent } from "../types";

/**
 * Structural placeholders only — NOT rendered anywhere in Fase 1.
 *
 * Per docs/V3-MIGRATION-PLAN.md section 4: src/lib/data/projects.ts is not a
 * source of truth. These entries exist so the content registry (index.ts)
 * has a stable shape to grow into, but carry no unverified claims — no
 * tagline, no tags, no metrics. Each will be replaced by a `verified` entry
 * once that project gets its own direct-source audit (Fase 2/3).
 */

const placeholder = (id: string, title: string, repo: string | undefined, note: string): ProjectContent => ({
  id,
  status: "placeholder",
  title,
  eyebrow: "",
  tagline: "",
  tags: [],
  links: repo ? { repo } : {},
  sourceNote: note,
});

export const iml = placeholder(
  "iml",
  "Fatiador IML",
  undefined,
  "Corresponde a pcdf-iml no portfólio antigo. Repositório é privado/confidencial (confirmado em src/lib/data/projects.ts: confidential: true) — conteúdo aguarda verificação direta antes de publicar."
);

export const relprev = placeholder(
  "relprev",
  "RELPREV / DOA",
  undefined,
  "Corresponde a doa-relprev no portfólio antigo. Aguarda verificação direta contra o projeto real antes de publicar conteúdo técnico."
);

export const registro = placeholder(
  "registro",
  "Registro",
  "https://github.com/gabrielle-git/registro",
  "Evolução de diario-pcdf (link de repositório já confirmado em src/app/cases/[id]/page.tsx CASE_REPOS). O conteúdo técnico do projects.ts antigo NÃO deve ser considerado atual — aguarda auditoria direta do repositório antes de publicar (ver plano, seção 5)."
);

export const nutriaprova = placeholder(
  "nutriaprova",
  "NutrIAprova",
  undefined,
  "Preservado, não removido. Entra em 'More work / Other systems' em fase futura — métricas/afirmações aguardam validação contra o projeto real."
);

export const sistersLive = placeholder(
  "sisters-live",
  "Sisters Live",
  undefined,
  "Preservado, não removido. Entra em 'More work / Other systems' em fase futura — métricas/afirmações aguardam validação contra o projeto real."
);
