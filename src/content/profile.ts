/**
 * Profile facts for the V3 Hero/Header. Links reused from the existing
 * portfolio (src/components/ui/Navbar.tsx, src/components/contact/ContactSection.tsx)
 * rather than re-typed, to avoid drift between the legacy site and V3.
 */
export const profile = {
  eyebrow: "gabrielle / systems",
  nav: ["PROJECTS", "EXPERIENCE", "ABOUT"],
  availability: "OPEN TO REMOTE · BRASIL / GLOBAL",
  firstName: "Gabrielle",
  lastName: "Campelo",
  role: "Full Stack Developer · Backend · Systems · Automation",
  statement:
    "Construo sistemas completos — dados, automação, segurança e interface trabalhando juntos.",
  subStatement:
    "Meu foco é backend e sistemas; o frontend entra para fazer a engenharia chegar bem até quem usa.",
  photoPlaceholder: {
    label: "SUA FOTO AQUI",
    hint: "retrato real · vertical · editorial",
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
