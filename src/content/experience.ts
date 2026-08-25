/**
 * Experience timeline content — pre-release truth audit (see
 * docs/V3-MIGRATION-PLAN.md / delivery report for the full classification).
 *
 * The previous version copied `role`/`client` verbatim from the legacy
 * portfolio's src/lib/data/projects.ts and displayed them as formal job
 * titles ("Engenheira de Software", "Tech Lead / Engenheira de Software").
 * That old file is explicitly NOT a source of truth, and no formal
 * title/seniority claim here has an independently confirmed source —
 * displaying them as titles would overclaim. They're marked NEEDS
 * CONFIRMATION in the delivery report and removed from what's rendered.
 *
 * In their place, `contribution` describes the actual technical activity
 * (verb-first: "Automação de...", "Desenvolvimento de...") rather than
 * asserting a job title. `context` avoids naming the specific government
 * institution behind the first two entries — the IML/RELPREV project cards
 * themselves already withhold that name deliberately (see
 * src/content/projects/relprev.ts), so Experience naming it directly would
 * have been an inconsistency, not just an unrelated omission.
 *
 * Periods and the private-sector/personal-project names (Sisters Live
 * Marketing, Registro, NutriAprova) are also NEEDS CONFIRMATION — not
 * independently re-verified this round — but carry no title/seniority
 * claim, so they're kept, flagged, pending confirmation.
 */

export interface ExperienceEntry {
  contribution: string;
  context?: string;
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
        contribution: "Automação de processos de triagem documental em instituição pública",
        period: "2026",
        note: "Perto o bastante do processo manual para ver exatamente onde ele quebrava — esse contexto originou o IML.",
      },
      {
        contribution: "Desenvolvimento de sistema de registro de ocorrências operacionais em instituição pública",
        period: "2026",
        note: "Restrição real de TI — sem internet garantida, sem servidor — esse contexto originou o RELPREV.",
      },
    ],
  },
  {
    id: "automation",
    label: "AUTOMATION",
    title: "Automatizando o que consumia horas",
    entries: [
      {
        contribution: "Implementação de pipeline de automação de captação de leads",
        context: "Sisters Live Marketing",
        period: "2025",
        note: "Ligou captação, banco de dados e mensageria, com deduplicação e sanitização de dados.",
      },
    ],
  },
  {
    id: "systems",
    label: "SYSTEMS",
    title: "Sistemas completos, de ponta a ponta",
    entries: [
      {
        contribution: "Desenvolvimento autoral de sistema de registro e relações",
        context: "Registro · projeto pessoal",
        period: "2026 — presente",
        note: "Modelagem de domínio própria, com autenticação e RLS confirmados diretamente no repositório.",
      },
      {
        contribution: "Arquitetura e desenvolvimento de produto SaaS multi-perfil",
        context: "NutriAprova",
        period: "2026 — presente",
        note: "Arquitetura multi-perfil com IA generativa isolada da experiência do usuário por fila assíncrona.",
      },
    ],
  },
];
