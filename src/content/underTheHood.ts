/**
 * Under the Hood — explains the portfolio itself. Stack list only includes
 * technology actually used by this codebase (see package.json / this
 * session's own work), not an aspirational list.
 */
export const underTheHood = {
  eyebrow: "07 / UNDER THE HOOD",
  title: "This portfolio is also a project.",
  contentMap: [
    { id: "content", label: "CONTENT", detail: "src/content — a estrutura tipada que alimenta cases, busca e IA." },
    { id: "search", label: "LOCAL SEARCH", detail: "Busca determinística por tags/palavra-chave, sem IA e sem vector DB." },
    { id: "ai", label: "PORTFOLIO AI", detail: "Enriquece a resposta da busca local via OpenRouter — nunca é a única forma de navegar." },
    { id: "nav", label: "CASE NAVIGATION", detail: "Resultados apontam para o case/seção real, não para uma resposta solta." },
  ],
  motionMap: [
    { id: "ui", label: "UI", detail: "CSS Modules + design tokens, superfícies flat, hairlines." },
    { id: "motion", label: "MOTION", detail: "Só onde comunica algo — pipeline, estado online/offline, transições de resultado." },
    { id: "reduced", label: "REDUCED MOTION", detail: "prefers-reduced-motion obrigatório em toda animação." },
    { id: "accessibility", label: "ACCESSIBILITY", detail: "Foco por teclado, roles ARIA, sem overflow horizontal." },
  ],
  stackLabel: "STACK",
  stack: "Next.js, React, TypeScript, CSS Modules, Motion, OpenRouter, Vercel.",
  links: {
    viewSource: "VIEW SOURCE",
    openCommandMenu: "OPEN COMMAND MENU",
  },
};
