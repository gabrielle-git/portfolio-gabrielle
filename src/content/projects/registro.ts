import type { ProjectContent } from "../types";

/**
 * Registro — a personal knowledge/journal system for tracking sectors,
 * people and diary entries across a career path. Corresponds to what the
 * old portfolio called `diario-pcdf`, but that old content is NOT the
 * source of truth here (see docs/V3-MIGRATION-PLAN.md section 5) — this was
 * verified directly against github.com/gabrielle-git/registro (shallow
 * clone, 2026-08-20): package.json confirms React 19.2, Vite 8, TypeScript,
 * @supabase/supabase-js, react-router-dom, react-hook-form + zod;
 * src/lib/supabase.ts and src/pages/Login.tsx confirm Auth is wired, not
 * just planned. Domain vocabulary below (Setor, Pessoa, Vinculo,
 * EntradaDiario + its 5 tipos, AvaliacaoSetor) is read directly from
 * src/types/*.ts in that repo, not invented.
 */

export interface RelationNode {
  id: string;
  label: string;
  detail: string;
}

export const registroHierarchy: RelationNode[] = [
  { id: "setor", label: "SETOR", detail: "Onde a passagem aconteceu — um setor cadastrado, com avaliações (nota + justificativa) ao longo do tempo." },
  { id: "pessoas", label: "PESSOAS", detail: "Pessoa é uma entidade independente, referenciada em vários lugares. O vínculo com um setor tem um papel — ou aponta pra um local em texto livre, quando o encontro não aconteceu num setor cadastrado." },
  { id: "registros", label: "REGISTROS", detail: "Entradas de diário — dia normal, feedback recebido, aprendizado, observação ou marco — que podem mencionar setores e pessoas." },
  { id: "contexto", label: "CONTEXTO / MEMÓRIA", detail: "As menções cruzadas entre entrada, setor e pessoa formam a timeline e a memória de trabalho consultável depois." },
];

export const registroInspect = {
  heading: "Relações / contexto",
  annotation: "AUTH-GATED, RELATIONAL",
  flow: [
    { id: "auth", label: "Auth", detail: "Supabase Auth — src/pages/Login.tsx e src/lib/supabase.ts confirmados no repositório." },
    { id: "user", label: "User", detail: "Sessão autenticada antes de qualquer leitura/escrita." },
    { id: "sector", label: "Sector hierarchy", detail: "Setores cadastrados, cada um com avaliações ao longo do tempo (AvaliacaoSetor)." },
    { id: "relations", label: "Person / location relations", detail: "Pessoa vinculada a um setor cadastrado OU a um local em texto livre — nem todo encontro tem um setor formal." },
    { id: "entries", label: "Entries / categories", detail: "EntradaDiario tipada: dia_normal, feedback_recebido, aprendizado, observacao, marco." },
    { id: "db", label: "PostgreSQL / RLS", detail: "Supabase/PostgreSQL como backend; RLS conforme confirmado pela autora." },
  ],
};

export const registro: ProjectContent = {
  id: "registro",
  status: "verified",
  kind: "relational",
  title: "Registro",
  eyebrow: "02 / SELECTED SYSTEMS",
  tagline: "Setores, pessoas e diário conectados — um mapa de relações, não uma lista de registros soltos.",
  tags: ["react", "typescript", "vite", "supabase", "postgresql", "rls", "auth", "backend", "frontend"],
  links: {
    repo: "https://github.com/gabrielle-git/registro",
  },
  sourceNote:
    "Verificado em 2026-08-20 via clone direto de github.com/gabrielle-git/registro — package.json, src/types/{setor,pessoa,entrada,avaliacao}.ts, src/lib/supabase.ts e src/pages/Login.tsx lidos diretamente. Evolução do que o portfólio antigo chamava diario-pcdf; o conteúdo técnico antigo foi descartado como fonte.",
};
