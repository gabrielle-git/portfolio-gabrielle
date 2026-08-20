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

/**
 * Visual mode content — sourced directly from CatCare's own real demo/mock
 * dataset (src/lib/mock-data.ts in the CatCare repo), not invented for the
 * portfolio. That file is what CatCare itself renders when Supabase isn't
 * configured, badge and all ("Demonstração" — same copy, same styling
 * convention, reused here deliberately). Concretely, from the real repo:
 *
 * - Pets "Dobby" and "Crystal", birth_date 2026-03-31 → ~4 meses old today.
 * - Dobby's real demo weight series (demoWeights): 3200→3550→3900→4100→4250g.
 * - Reminder "Vacina V4" due 2026-08-24T15:00 (demoReminders, rem-4).
 * - Greeting/subheading copy ("Um resumo tranquilo do que importa hoje.")
 *   and the "Demonstração" badge are copied verbatim from
 *   src/app/(app)/page.tsx and globals.css in the CatCare repo.
 *
 * Earlier drafts used Figma's illustrative pet names/weights (Luna, Nino,
 * "amanhã · 14:00") — replaced here with the product's own verified demo
 * data per the Fase 1.2 correction ("não inventar dados").
 */
export const catCareVisual = {
  demoBadge: "Demonstração",
  homeLabel: "MULTI-PET / HOME",
  greeting: "Boa tarde, família.",
  subheading: "Um resumo tranquilo do que importa hoje.",
  pets: [
    { name: "Dobby", meta: "4 meses", metric: "4,25 kg" },
    { name: "Crystal", meta: "4 meses", metric: "3,6 kg" },
  ],
  nextCare: {
    label: "PRÓXIMOS CUIDADOS",
    title: "Vacina V4 · Dobby",
    when: "24 ago · 15:00",
  },
  weightPanel: { label: "PESO · DOBBY" },
  weightSeries: [3200, 3550, 3900, 4100, 4250],
  narrative: {
    title: "Cuidado multi-pet sem fragmentar a rotina.",
    beats: [
      "Cuidar de mais de um pet ao mesmo tempo — em diferentes espécies, idades ou fases de cuidado — dispersa informações entre anotações, conversas e lembretes.",
      "Tudo fica junto: saúde, peso, alimentação, despesas e memória, com histórico por pet e por família.",
      "Mais de uma pessoa pode cuidar da mesma família de pets — quem só acompanha não deveria conseguir editar por acidente. Essa regra vive no banco, não só na tela.",
    ],
  },
  cta: {
    live: "LIVE PRODUCT ↗",
    source: "SOURCE ↗",
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
  /**
   * "Multi-pet Care" is a provisional, descriptive display name — not the
   * final commercial brand. The product supports multiple species, not just
   * cats, and the official name hasn't been chosen yet. `id`, `links.repo`
   * and `links.live` intentionally keep the repo's real "catcare"/"CatCare"
   * values below; only `title` (the one place the UI renders a product
   * name) changes. When the real brand is decided, update `title` here —
   * this is the single point every display of the name reads from.
   */
  title: "Multi-pet Care",
  eyebrow: "01 / FEATURED PRODUCT",
  tagline: "Um produto multi-pet para rotina, saúde e cuidado compartilhado.",
  tags: ["typescript", "nextjs", "supabase", "postgresql", "rls", "auth", "backend"],
  links: {
    live: "https://cat-care-xi.vercel.app/",
    repo: "https://github.com/gabrielle-git/CatCare",
  },
  sourceNote:
    "Verificado em 2026-08-20 via clone direto de github.com/gabrielle-git/CatCare — stack, 26 migrations, políticas RLS, papéis owner/caregiver/viewer e funções de autorização lidas diretamente do código, não inferidas do portfólio antigo. Display name 'Multi-pet Care' é provisório (ver comentário acima); id/repo/live URL preservam o nome real do repositório.",
};
