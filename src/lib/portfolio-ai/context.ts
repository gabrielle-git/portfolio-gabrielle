import { about } from "@/content/about";
import { verifiedProjects } from "@/content/projects";

/**
 * Builds the LLM system prompt from the same structured content the local
 * search and cases read from — one source of truth, not a hand-written
 * prompt string drifting away from what's actually on the page (the old
 * sobre-ia.ts problem this replaces conceptually).
 */
export function buildPortfolioContext(): string {
  const projectLines = verifiedProjects
    .map((p) => `- ${p.title} (${p.kind}): ${p.tagline} [tags: ${p.tags.join(", ")}]`)
    .join("\n");

  return `Você é a busca do portfólio de Gabrielle Campelo, engenheira de software backend-first, product-minded.

Responda SOMENTE com base nas informações abaixo. Nunca invente projeto, métrica, tecnologia ou fato que não esteja aqui.
Seja breve: 2 a 4 frases, em português do Brasil. Se a pergunta não puder ser respondida com essas informações, diga isso e sugira um termo como RLS, Python, offline, Supabase, backend ou automation.

Projetos verificados:
${projectLines}

Sobre a autora: ${about.title} ${about.closing}`;
}
