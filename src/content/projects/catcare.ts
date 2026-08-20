import type {
  DomainNode,
  InspectCodeSample,
  InspectFlowStep,
  ProjectContent,
  ProjectRole,
} from "../types";

/**
 * CatCare — verified against github.com/gabrielle-git/CatCare directly
 * (shallow clone audited on 2026-08-20; see docs/V3-MIGRATION-PLAN.md section 3).
 *
 * Every field below is traceable to a real file, migration or route in that
 * repository. Nothing here is inferred from the old portfolio's projects.ts,
 * and nothing is copied from the CatCare repo's own README/SECURITY.md
 * without independent confirmation in code — those documents were found to
 * be stale in places (see plan doc), so code/migrations are the source used
 * here, not the docs.
 */

export const catCareVisual = {
  homeLabel: "CATCARE / HOME",
  greeting: "Oi, Gabi.",
  subheading: "Rotina dos seus gatos hoje",
  pets: [
    { name: "Dobby", meta: "4 meses", metric: "2,4 kg" },
    { name: "Luna", meta: "neonatal", metric: "160 g" },
    { name: "Nino", meta: "neonatal", metric: "124 g" },
  ],
  nextCare: {
    label: "PRÓXIMO CUIDADO",
    title: "Vacina",
    when: "amanhã · 14:00",
  },
  weightPanel: { label: "PESO / 30 DIAS" },
  whyItExists: {
    label: "PRODUCT CONTEXT",
    title: "Cuidado multi-pet sem fragmentar a rotina.",
    body: "Saúde, peso, neonatal, despesas, lembretes e memória no mesmo fluxo — com dados privados e múltiplos perfis.",
  },
  cta: {
    live: "LIVE PRODUCT ↗",
    source: "SOURCE ↗",
  },
  hint: {
    label: "hover / click",
    body: "o card abre por dentro e revela a engenharia",
  },
} as const;

const flow: InspectFlowStep[] = [
  {
    id: "client",
    label: "Client",
    detail: "Server Components + Server Actions, sem client-side data fetching direto.",
  },
  {
    id: "nextjs",
    label: "Next.js",
    detail:
      "proxy.ts na raiz de src/ — convenção atual do Next 16 (renomeada de middleware.ts) — faz o gate de rota antes do render.",
  },
  {
    id: "auth",
    label: "Supabase Auth",
    detail: "Email + senha via @supabase/ssr; sessão lida em cada Server Action com auth.getUser().",
  },
  {
    id: "rls",
    label: "RLS",
    detail:
      "Toda leitura/escrita é reavaliada dentro do Postgres — não é só uma checagem na aplicação.",
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    detail: "26 migrations versionadas; households, membros, pets e registros com FKs reais.",
  },
];

const domain: DomainNode[] = [
  { id: "household", label: "household", detail: "1 household pode ter múltiplos membros e o usuário pode alternar entre households." },
  { id: "members", label: "household_members", detail: "Tabela de junção: user_id + household_id + role (owner/caregiver/viewer)." },
  { id: "pets", label: "pets", detail: "Multi-pet por household; suporte a espécie, peso, microchip, castração." },
  { id: "records", label: "records", detail: "health_records, weight_records, neonatal_records, expenses, reminders, memories — a maioria referencia household_id diretamente, não só via pets." },
];

const roles: ProjectRole[] = [
  { id: "viewer", label: "viewer", description: "read only" },
  { id: "caregiver", label: "caregiver", description: "mutate" },
  { id: "owner", label: "owner", description: "manage" },
];

const codeSample: InspectCodeSample = {
  source: "supabase/migrations/0001_initial.sql",
  language: "sql",
  code: `create or replace function public.can_edit_household(target_household_id uuid)
returns boolean language sql stable security definer
set search_path = public as $$
  select exists (
    select 1 from public.household_members hm
    where hm.household_id = target_household_id
      and hm.user_id = auth.uid()
      and hm.role in ('owner', 'caregiver')
  );
$$;

create policy "pets_member_insert" on public.pets
  for insert with check (public.can_edit_household(household_id));`,
};

export const catCareInspect = {
  heading: "Backend / architecture",
  annotation: "RLS ENFORCED AT DATABASE LAYER",
  flow,
  domain,
  roles,
  codeSample,
  evidenceLabel: "ENGINEERING EVIDENCE",
  evidence: ["authorization", "data model", "access control", "domain logic"],
  note:
    "viewer nunca grava — mesmo que a chamada da aplicação falhe ou seja contornada, a policy do Postgres nega a escrita.",
} as const;

export const catCare: ProjectContent = {
  id: "catcare",
  status: "verified",
  title: "CatCare",
  eyebrow: "01 / FEATURED PRODUCT",
  tagline: "Um projeto pessoal que virou produto real.",
  tags: ["typescript", "nextjs", "supabase", "postgresql", "rls", "auth", "backend"],
  links: {
    live: "https://cat-care-xi.vercel.app/",
    repo: "https://github.com/gabrielle-git/CatCare",
  },
  sourceNote:
    "Verificado em 2026-08-20 via clone direto de github.com/gabrielle-git/CatCare — stack, 26 migrations, políticas RLS, papéis owner/caregiver/viewer e funções de autorização lidas diretamente do código, não inferidas do portfólio antigo.",
};
