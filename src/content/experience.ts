/**
 * Experience timeline content. Roles/clients/periods are copied verbatim
 * from src/lib/data/projects.ts (the legacy portfolio's own project data —
 * already existing/verified in this repository, not invented for V3). No
 * new dates or job titles are introduced. CatCare/Multi-pet Care isn't
 * listed here because no verified role/period exists for it anywhere in
 * the repo — omitted rather than guessed, per the Sprint V3 instruction
 * not to invent dates.
 */

export interface ExperienceEntry {
  role: string;
  client?: string;
  period: string;
  note: string;
}

export interface ExperienceStage {
  id: "operations" | "automation" | "systems";
  label: string;
  title: string;
  entries: ExperienceEntry[];
}

export const experienceIntro = {
  eyebrow: "03 / EXPERIENCE",
  title: "Experiência conectada ao que eu construí.",
  subtitle:
    "Em vez de currículo em cartões, cada etapa revela problemas, ferramentas e sistemas relacionados.",
};

export const experienceStages: ExperienceStage[] = [
  {
    id: "operations",
    label: "OPERATIONS",
    title: "Dentro da operação real",
    entries: [
      {
        role: "Engenheira de Software (cobertura de férias na divisão administrativa)",
        client: "Polícia Civil do Distrito Federal · Instituto de Medicina Legal",
        period: "2026",
        note: "Perto o bastante do processo manual de triagem documental para ver exatamente onde ele quebrava.",
      },
      {
        role: "Engenheira de Software",
        client: "Polícia Civil do Distrito Federal · Divisão de Operações Aéreas",
        period: "2026",
        note: "Registro de ocorrências operacionais sob restrição real de TI — sem internet garantida, sem servidor.",
      },
    ],
  },
  {
    id: "automation",
    label: "AUTOMATION",
    title: "Automatizando o que consumia horas",
    entries: [
      {
        role: "Engenheira de Automação (PJ)",
        client: "Sisters Live Marketing",
        period: "2025",
        note: "Pipeline ETL ligando captação de leads, banco de dados e mensageria, com deduplicação e sanitização de dados.",
      },
    ],
  },
  {
    id: "systems",
    label: "SYSTEMS",
    title: "Sistemas completos, de ponta a ponta",
    entries: [
      {
        role: "Desenvolvedora autoral",
        client: "Registro (projeto pessoal)",
        period: "2026 — presente",
        note: "Modelagem de domínio própria, pensada para migrar de armazenamento local para backend sem reescrever a aplicação.",
      },
      {
        role: "Tech Lead / Engenheira de Software",
        client: "NutriAprova",
        period: "2026 — presente",
        note: "Arquitetura multi-perfil com IA generativa isolada da experiência do usuário por fila assíncrona.",
      },
    ],
  },
];
