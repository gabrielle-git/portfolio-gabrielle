/**
 * Action verb per section anchor (matches the hrefs searchPortfolio()
 * returns, see src/lib/search), so reference links read contextually —
 * "Multi-pet Care → OPEN INSPECT", "IML → VIEW PIPELINE" — not one generic
 * "view" everywhere.
 */
export const referenceAction: Record<string, string> = {
  "featured-case": "OPEN INSPECT",
  iml: "VIEW PIPELINE",
  relprev: "VIEW SYSTEM",
  registro: "EXPLORE RELATIONS",
  experience: "VIEW EXPERIENCE",
};

export const askMyPortfolio = {
  eyebrow: "05 / ASK MY PORTFOLIO",
  title: "Ask My Portfolio",
  subtitle: "Busca sobre projetos e experiência — funciona mesmo sem IA.",
  placeholder: "Pergunte sobre projetos, stack ou experiência…",
  suggestions: [
    "Qual projeto demonstra mais backend?",
    "Onde você usou RLS?",
    "Quais projetos usam Python?",
    "Me mostre automação",
    "O que funciona offline?",
    "Qual projeto tem mais segurança?",
  ],
};
