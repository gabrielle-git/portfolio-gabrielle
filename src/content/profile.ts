/**
 * Profile facts for the V3 Hero/Header. Links reused from the existing
 * portfolio (src/components/ui/Navbar.tsx, src/components/contact/ContactSection.tsx)
 * rather than re-typed, to avoid drift between the legacy site and V3.
 */
export const profile = {
  eyebrow: "gabrielle / systems",
  nav: ["PROJECTS", "EXPERIENCE", "ABOUT"],
  availability: "AVAILABLE FOR REMOTE",
  firstName: "Gabrielle",
  lastName: "Campelo",
  role: "Full Stack Developer · Backend · Systems · Automation",
  statement: "Eu gosto de construir coisas que funcionam por dentro e encantam por fora.",
  subStatement: "Do modelo de dados ao deploy — produto, automação, segurança e experiência.",
  badges: ["backend-first", "product-minded"] as const,
  photoPlaceholder: {
    label: "SUA FOTO AQUI",
    hint: "retrato vertical / editorial",
  },
  cta: {
    exploreSystems: "EXPLORE SYSTEMS ↘",
    askPortfolio: "ASK MY PORTFOLIO",
    github: "GITHUB ↗",
  },
  links: {
    github: "https://github.com/gabrielle-git",
    linkedin: "https://www.linkedin.com/in/helena-gabrielle-da-cunha-camp%C3%AAlo/",
  },
} as const;
