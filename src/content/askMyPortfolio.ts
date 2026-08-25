/**
 * Action verb per section anchor (matches the hrefs searchPortfolio()
 * returns, see src/lib/search), so reference links read contextually —
 * title and action rendered as two typographic parts of the same link
 * (see AskMyPortfolio.tsx), not one generic "view" everywhere.
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
  subtitle: "Explore projetos, decisões técnicas e experiência fazendo uma pergunta.",
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
