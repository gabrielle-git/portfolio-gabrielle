import type { ProjectContent } from "../types";

/**
 * Structural placeholders only — NOT rendered anywhere yet. iml/relprev/
 * registro moved out of this file into their own verified content files
 * (see docs/V3-MIGRATION-PLAN.md section 4). These two remain placeholders
 * because their own direct-source audit hasn't happened — no unverified
 * claims: no tagline, no tags, no metrics.
 */

const placeholder = (id: string, title: string, repo: string | undefined, note: string): ProjectContent => ({
  id,
  status: "placeholder",
  kind: "product",
  title,
  eyebrow: "",
  tagline: "",
  tags: [],
  links: repo ? { repo } : {},
  sourceNote: note,
});

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
