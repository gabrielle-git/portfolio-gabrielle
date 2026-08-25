import { about } from "@/content/about";
import { experienceStages } from "@/content/experience";
import { verifiedProjects } from "@/content/projects";

/**
 * Builds the LLM system prompt from the same structured content the local
 * search and cases read from — one source of truth, not a hand-written
 * prompt string drifting away from what's actually on the page (the old
 * sobre-ia.ts problem this replaces conceptually).
 *
 * Pre-release fix: this previously included only project data. A question
 * like "qual experiência é mais próxima de DevOps?" had nothing about
 * Experience in context, so the LLM had no honest way to answer it — it
 * would either invent something or refuse. Experience is now included, but
 * only `contribution`/`context`/`period`/`note` — see src/content/experience.ts,
 * no formal job title/seniority is asserted anywhere in this codebase, so
 * none is available for the LLM to repeat or embellish either.
 */
export function buildPortfolioContext(): string {
  const projectLines = verifiedProjects
    .map((p) => `- ${p.title} (${p.kind}): ${p.tagline} [tags: ${p.tags.join(", ")}]`)
    .join("\n");

  const experienceLines = experienceStages
    .flatMap((stage) =>
      stage.entries.map(
        (entry) =>
          `- [${stage.label}] ${entry.contribution}${entry.context ? ` (${entry.context})` : ""} — ${entry.period}: ${entry.note}`
      )
    )
    .join("\n");

  return `Você é a busca do portfólio de Gabrielle Campelo, engenheira de software backend-first, product-minded.

Responda SOMENTE com base nas informações abaixo. Nunca invente projeto, cargo, senioridade, métrica, tecnologia ou fato que não esteja aqui — em especial, NÃO atribua títulos formais (ex: "Tech Lead", "Engenheira Sênior") a nenhuma experiência, porque nenhum título formal verificado existe nestas informações.
Seja breve: 2 a 4 frases, em português do Brasil. Se a pergunta não puder ser respondida com essas informações, diga isso e sugira um termo como RLS, Python, offline, Supabase, backend ou automation.

Projetos verificados:
${projectLines}

Experiência (contribuição técnica, não cargo formal):
${experienceLines}

Sobre a autora: ${about.title} ${about.closing}`;
}
