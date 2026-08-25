/**
 * The editorial index row between Hero and the Featured Case. Only
 * "visual-inspect" has a real, built target (#featured-case) — the rest are
 * previews of interactions that ship in later phases (Command Palette, Ask
 * My Portfolio, Case Morph) and are rendered inert until then. See
 * docs/V3-MIGRATION-PLAN.md "CTA" — no anchors to nowhere.
 */
export interface InteractionEntry {
  id: string;
  title: string;
  subtitle: string;
  href?: string;
}

export const interactions: InteractionEntry[] = [
  {
    id: "visual-inspect",
    title: "VISUAL / INSPECT",
    subtitle: "produto e engenharia",
    href: "#featured-case",
  },
  {
    id: "command-k",
    title: "⌘K",
    subtitle: "atalhos e navegação",
  },
  {
    id: "ask-portfolio",
    title: "ASK PORTFOLIO",
    subtitle: "busca sobre projetos e experiência",
  },
  {
    id: "case-morph",
    title: "CASE MORPH",
    subtitle: "do resumo para o case, sem perder contexto",
  },
];
