# Plano de Migração — Portfólio V3

Status: **DIAGNÓSTICO REVISADO — aguardando aprovação da Fase 1. Nenhuma implementação de redesign foi iniciada.**
Auditoria original: 2026-08-20. Revisão incorporando decisões do usuário: 2026-08-20.
Fonte visual: Figma — `V3 — Interactive Portfolio / HOME` (node `8:2`, arquivo `CfBzUepF6McBAMRJOUhBdh`)
Fonte técnica CatCare: `https://github.com/gabrielle-git/CatCare` (auditado diretamente, clone raso do branch padrão)

---

## 0. Resumo executivo

A auditoria original identificou que o Figma aprovado é uma direção visual (clara/editorial) completamente diferente do site atual (dark/roxo/terminal), e que a base de dados/lógica atual (`projects.ts`, `sobre-ia.ts`) não podia ser copiada cegamente para a V3.

Essas decisões já foram tomadas e estão incorporadas neste documento:

1. **Stack: Next.js 16 + React 19 + TypeScript, aprovado.** Não há migração para SvelteKit. A justificativa **não depende** da preservação de Three.js/R3F — depende de backend/API, Portfolio AI, dados, cases, SEO/metadata, deploy e menor risco (seção 5).
2. **Estilização da V3: reduzir dependência de Tailwind.** Novos componentes usam CSS Modules + custom properties + Motion, não Tailwind (seção 2A). Código antigo continua em Tailwind até ser tocado — sem migração em massa.
3. **CatCare confirmado como case principal**, com conteúdo técnico agora baseado em auditoria direta do repositório real (seção 3), não mais inferido do portfólio atual.
4. **`projects.ts` não é source of truth.** É conteúdo do portfólio atual, possivelmente desatualizado. Cada case será verificado contra o projeto real antes de publicar (seção 4).
5. **Registro = evolução de `diario-pcdf`**, mas conteúdo técnico específico fica marcado como "a atualizar a partir do projeto real" — não implementar detalhes ainda.
6. **NutriAprova e Sisters Live não são removidos.** Entram como "More work / Other systems", composição visual a definir depois; métricas não publicam sem validação.
7. **CV e foto não bloqueiam a Fase 1** — placeholders estruturais, sem conteúdo fictício.
8. **Escopo da Fase 1 é restrito** (seção 13-A): fundação visual, tokens, header/nav, Hero, infraestrutura de motion, e CatCare Featured Case com Visual↔Inspect funcional. Todo o resto (Experience, outros projetos, nova Portfolio AI, Command Palette, animações do IML/RELPREV, Contact/Under the Hood finais) fica para fases posteriores.

**Este documento aguarda aprovação explícita da Fase 1 antes de qualquer código de produto ser escrito.**

---

## 1. Arquitetura atual (portfólio)

Next.js 16.2.6 (App Router, Turbopack), React 19.2.4, TypeScript estrito, Tailwind CSS 4 (config CSS-first, sem `tailwind.config.js`).

```
src/
  app/
    layout.tsx              # fontes (Geist, Geist Mono, Syne), metadata raiz, monta chrome global
    page.tsx                # Hero + Skills + Cases + About + Contact
    not-found.tsx
    opengraph-image.tsx     # next/og — gera OG image em runtime
    globals.css             # design tokens + @theme inline (Tailwind 4)
    cases/[id]/page.tsx     # SSG por projeto (generateStaticParams + generateMetadata)
    api/chat/route.ts       # Portfolio AI (OpenRouter)
    api/visita/route.ts     # grava analytics no Supabase (service role)
    api/resumo-diario/route.ts  # cron diário → email via Resend
  components/
    hero/        HeroSphere, HeroSphereScene (r3f), HeroIdentity, HeroAvatar (morto)
    effects/     AuroraBackground, PageBackground (canvas starfield), SmoothScroll (Lenis), Typewriter
    cases/       ArchitectureDiagram, CaseCard, CasesSection
    chat/        RecruiterChat (morto/duplicado)
    terminal/    TerminalPanel (terminal + IA, é o chat "de verdade")
    about/, skills/, contact/, analytics/ (VisitTracker), ui/ (Button, Badge, Navbar, CommandPalette-morto)
  lib/
    data/        projects.ts, architectures.ts, sobre-ia.ts
    supabase.ts  cliente browser (anon key, instanciado eager no escopo do módulo)
    utils.ts     cn()
```

Infra: `vercel.json` define 1 cron (`/api/resumo-diario`, diário 11:00 UTC). Sem testes de nenhum tipo.

---

## 2. Funcionalidades existentes do portfólio (o que já funciona hoje)

- **Portfolio AI** via OpenRouter, com fallback em cascata entre 3 modelos. Contexto único: string estática `CONTEXTO_GABRIELLE` ([sobre-ia.ts](src/lib/data/sobre-ia.ts)). Sem streaming, sem RAG/vector DB.
- **5 projetos** tipados em [projects.ts](src/lib/data/projects.ts): `nutriaprova`, `pcdf-iml`, `doa-relprev`, `sisters-live`, `diario-pcdf`.
- **5 diagramas de arquitetura** em [architectures.ts](src/lib/data/architectures.ts), renderizados por [ArchitectureDiagram.tsx](src/components/cases/ArchitectureDiagram.tsx): camadas com nós clicáveis, inspector lateral, animação de "pacote" viajando entre camadas via framer-motion, com `useReducedMotion()` — o único ponto do código hoje que respeita `prefers-reduced-motion`.
- **Páginas de case SSG** (`/cases/[id]`) com metadata por projeto.
- **Hero 3D interativo** com `@react-three/fiber`, sem gate de reduced-motion.
- **Analytics bespoke**: `VisitTracker` → `/api/visita` → Supabase (`visitas`) → cron diário → email via Resend.
- **Formulário de contato** com escrita dupla (Supabase `mensagens` + Web3Forms).
- **Terminal/command-line** (`TerminalPanel`) com comandos de navegação e aba de chat com a IA.
- **SEO básico**: metadata raiz, metadata por case, OG image dinâmica — faltam `sitemap.ts`, `robots.ts`, `manifest.ts`, `metadataBase`.
- Build de produção funciona quando as env vars do Supabase estão presentes (ver seção 11 sobre o comportamento sem `.env`).

---

## 2A. Estratégia de estilização (decisão aprovada)

A V3 **reduz a dependência de Tailwind**, sem removê-lo do código legado:

- **Componentes novos da V3** (Fase 1 em diante): CSS Modules + CSS Custom Properties/design tokens + estilos globais mínimos + Motion/Framer Motion para interação. Objetivo: CSS mais legível, autoral, adequado ao tom editorial do Figma — em vez de classes utilitárias densas.
- **Código antigo permanece em Tailwind** enquanto não for tocado pela migração. Não haverá migração em massa de estilos antigos "por precaução" ou "por consistência" — só migra quando o componente em questão for reescrito para a V3.
- **Convivência**: durante a transição, o projeto terá Tailwind (legado) e CSS Modules (V3) simultaneamente. Isso é aceito como estado intermediário esperado, não dívida técnica a corrigir às pressas.
- Tokens de design (cores, espaçamento, tipografia, radii) definidos como CSS Custom Properties compartilhadas — mesma fonte para Tailwind (`@theme inline`) e para os novos CSS Modules, evitando dois sistemas de tokens divergentes.
- Tailwind só é removido do projeto depois que **nenhum componente ativo** depender dele — decisão futura, não desta fase.

---

## 3. CatCare — auditoria técnica direta (fonte: repositório real)

Repositório: `github.com/gabrielle-git/CatCare` · Live: `cat-care-xi.vercel.app`. Clone raso auditado diretamente (não inferido do portfólio). Histórico de commits não é visível no clone raso — não é possível verificar timeline/autoria completa a partir deste checkout.

### Stack confirmada
Next.js **16.3.1**, React **19.2.8**, `@supabase/supabase-js` **2.112.3** + `@supabase/ssr` **0.12.4**, Tailwind 4, TypeScript **strict mode** ligado, Resend para email transacional. Sem biblioteca de formulário/validação (formulários HTML + Server Actions com validação manual), sem state management externo. `next.config.ts` tem uma chave `agentRules: false` que **não é uma opção documentada do Next.js** — não verificável, sinalizado como tal.

### Auth
Supabase Auth (email+senha) via `@supabase/ssr`. Middleware implementado em `src/proxy.ts` (não `middleware.ts` — nome não convencional; não foi possível confirmar estaticamente se Next 16.3.1 trata `src/proxy.ts` como middleware válido, vale checar antes de citar "middleware" como fato assumido). Gate de rota redireciona não-autenticados para `/login`.

### Modelo de dados (26 migrations SQL, `0001`→`0026`)
Hierarquia real, confirmada no schema: `households` → `household_members` (tabela de junção com `role` — `owner`/`caregiver`/`viewer`) → a maioria das tabelas de domínio carrega `household_id` diretamente (não aninhado via `pets`). Tabelas confirmadas: `pets`, `weight_records`, `health_records`, `vaccine_doses`, `neonatal_records`, `expenses`, `reminders`, `documents`, `memories` (+ `memory_pets`, `memory_media`), `products`/`purchases`/`product_reviews`, `health_plans` (+ regras de coparticipação, guias, templates), `benefit_memberships`, `household_invites`, `household_member_aliases`. Padrão de **tabela de junção multi-pet** (`memory_pets`, `expense_pets`, `purchase_pets`, `review_pets`) permite um registro (memória/despesa/compra/review) referenciar múltiplos pets — mais sofisticado que "1 registro = 1 pet".

### RLS — confirmado a nível de banco, não só de aplicação
Funções helper `SECURITY DEFINER` (`0001_initial.sql`):
```sql
is_household_member(target_household_id)   -- membro de qualquer role
is_household_owner(target_household_id)    -- só owner
can_edit_household(target_household_id)    -- owner OU caregiver (exclui viewer)
```
Padrão aplicado à maioria das tabelas de domínio: **select = qualquer membro (inclusive viewer); insert/update/delete = `can_edit_household` (owner/caregiver)**. Isso é reforçado no banco via `create policy`, não apenas checado na aplicação.

Achado notável: `household_invites` e `household_member_aliases` têm RLS **ativado mas sem nenhuma `create policy`** — o que nega todo acesso direto via PostgREST; o acesso acontece só por RPCs `SECURITY DEFINER` auditáveis. É um padrão deliberado e mais restritivo (não uma lacuna), mas fácil de descrever errado — vale nomear explicitamente no case como "acesso só via função, nunca direto à tabela".

Storage: bucket `pet-media` privado (`public=false`, limite 5MB, mimetypes restritos), políticas de RLS em `storage.objects` derivam o `household_id` do primeiro segmento do path do arquivo; leitura via signed URLs (`createSignedUrl`, 1h), nunca URL pública.

### Autorização na aplicação
`src/lib/roles.ts` expõe `assertCanEdit`/`assertOwner`/`requireEditPage`, usados nas Server Actions de todas as áreas de escrita (`pets`, `records`, `expenses`, `agenda`, `memories`, `shopping`, `health-plan`, `settings`). Nuance real encontrada: `getMyRole()` retorna `"owner"` por padrão se a RPC `my_household_role()` falhar ou retornar nulo (fail-open na camada de app) — mas isso não é um bypass de segurança real, porque o RLS do banco continua sendo a barreira efetiva independente do que essa função retorna. Vale descrever essa nuance com precisão no case, não simplificar para "tudo é seguro" nem para "há uma falha de segurança".

Operações destrutivas (deletar household, transferir dono) são checadas **duas vezes**: na Server Action (TypeScript) e de novo dentro da função Postgres `SECURITY DEFINER` correspondente — defesa em profundidade genuína e verificada.

### Funcionalidades confirmadas
Multi-pet, prontuário de saúde (vacinas, consultas, exames, medicação, doença, alergia, cirurgia, vermifugação), **cuidado neonatal** (alimentação, peso, urina, fezes, temperatura), despesas (individuais/compartilhadas), agenda/lembretes com recorrência, memórias/álbum (múltiplos pets e fotos por memória), loja/compras/reviews de produtos, **plano de saúde/convênio pet** (feature grande, não mencionada no README), programas de fidelidade, convites por email (Resend) com token hex de 32 bytes (não é UUID, ao contrário do que o `SECURITY.md` do próprio repo afirma), troca entre múltiplos households (`active_household_id`), exportação JSON completa da household ativa (`/api/export`), **assistente local por palavra-chave** (regex sobre termos em português — não é LLM, não faz chamada externa; confirma exatamente o padrão "local search sem IA" que queremos para o fallback do Portfolio AI, seção 9).

### Qualidade / lacunas confirmadas (não inventar o oposto)
Sem testes automatizados, sem CI (`.github/workflows` não existe). `README.md` está desatualizado em pontos verificáveis: lista migrations `0001`–`0006` como instrução de setup quando o repo tem 26; a seção "próximos cortes" lista features (galeria de memórias, convite por email, gráfico de peso) que **já estão implementadas** no código. Esses são fatos sobre a documentação do CatCare, não sobre o portfólio — mencionados aqui para não repetir a mesma imprecisão no case.

### Implicação para o case "Visual ↔ Inspect"
O material real é *mais forte* do que qualquer coisa que eu inventaria: RLS reforçado no banco (não só na aplicação), papéis owner/caregiver/viewer com exclusão real de escrita para viewer, storage privado com URL assinada, exportação de dados, defesa em profundidade em operações destrutivas. O bloco "Inspect system" do Figma (`Client → Next.js → Auth → RLS → PostgreSQL`, `household → members → pets → records`, `viewer: read only / caregiver: mutate / owner: manage`) **bate quase literalmente** com o que foi confirmado no código — o conteúdo do Inspect mode pode citar as funções reais (`is_household_member`, `can_edit_household`) em vez de pseudocódigo genérico.

**Ainda não decidido, precisa da sua revisão antes de publicar**: como tratar as imprecisões encontradas no próprio README/SECURITY.md do CatCare dentro do case do portfólio (ignorar, ou usar como exemplo de rigor/code review no texto "Under the hood"?), e se o nome do arquivo de middleware não-convencional (`src/proxy.ts`) deve ser verificado em produção antes de eu citar "middleware" como termo técnico no case.

---

## 4. `projects.ts` não é source of truth — nova estratégia de dados

Decisão: o conteúdo atual de `src/lib/data/projects.ts` e `architectures.ts` reflete o portfólio anterior, não o estado real de cada projeto, e **não deve ser copiado automaticamente**.

Nova abordagem:

1. Cada case da V3 (CatCare, IML, RELPREV, Registro, e depois NutriAprova/Sisters Live) precisa de verificação direta contra o projeto real antes de publicar — mesmo padrão aplicado ao CatCare nesta revisão (seção 3), repetido para os demais quando chegar a vez deles (fora do escopo da Fase 1).
2. Criar uma **nova source of truth estruturada** (formato ainda a definir na Fase 1 — provavelmente um arquivo por projeto com campos tipados: stack real, features confirmadas, tags para busca, links, status de verificação), que alimenta tanto os cases quanto a Portfolio AI — eliminando a duplicação/desalinhamento que existia entre `sobre-ia.ts` (prompt solto) e `projects.ts` (dados estruturados).
3. **Registro** (`diario-pcdf`): usar o projeto real como fonte quando essa fase chegar. Não implementar detalhes técnicos do Registro a partir da descrição antiga em `projects.ts` — isso fica marcado como pendente, fora do escopo da Fase 1.
4. **NutriAprova e Sisters Live**: preservados, não deletados. Métricas/afirmações sobre eles não são publicadas sem validação contra o projeto real — mesma regra do CatCare, aplicada quando essa fase chegar.
5. A Portfolio AI (seção 9) não deve depender de informação antiga ou contraditória — a reestruturação de dados desta seção é pré-requisito para a nova Portfolio AI, não only para os cases visuais.

---

## 5. Análise Next.js vs SvelteKit — decisão aprovada

**Aprovado: Next.js 16 + React 19 + TypeScript. Sem migração para SvelteKit.**

A justificativa **não depende** da preservação de Three.js/React Three Fiber — o design da V3 não depende do 3D existente no Hero. Se, ao implementar a V3, confirmarmos que Three.js/R3F não é necessário no novo design, essas dependências podem ser removidas depois (fora do escopo da Fase 1; requer confirmação explícita antes de remover).

Razões reais da decisão:

- **Backend/API atual** (`api/chat`, `api/visita`, `api/resumo-diario`) é TypeScript puro sobre Route Handlers — funciona hoje, porta com risco mínimo dentro do próprio Next.
- **Portfolio AI existente** (OpenRouter + fallback, lógica de prompt) não precisa ser reescrita para outro runtime.
- **Dados e cases** (mesmo que o conteúdo mude, seção 4) já têm um padrão de modelagem/rota (`generateStaticParams`, `generateMetadata`) validado.
- **SEO/metadata**: SSG, metadata dinâmica e geração de OG image já funcionam.
- **Deploy**: Vercel + cron já configurados e funcionando.
- **Menor risco de migração**: qualquer redesign já é grande o suficiente (camada visual quase inteira é refeita); não somar um segundo eixo de risco (framework novo) ao mesmo tempo.
- **Ecossistema React**: maior disponibilidade de bibliotecas maduras (motion, diagramas, testing) e maior familiaridade no mercado de trabalho-alvo.
- **Relevância profissional**: Next.js/React é o que o público-alvo (recrutadores/EMs de vagas backend/full stack) mais provavelmente reconhece e avalia no código.

Comparação de esforço/risco por critério (referência, não é mais objeto de decisão):

| Critério | Next.js (aprovado) | SvelteKit (descartado) |
|---|---|---|
| Esforço | Alto na camada visual, baixo em dados/API/IA | Alto em tudo |
| Risco | Médio | Alto (stack nova + redesign simultâneos) |
| Reaproveitamento | ~90% da lógica de dados/API/IA/analytics | Mesma lógica, mas reescrita na sintaxe de SvelteKit |
| Deploy | Já configurado (Vercel + cron) | Precisa reconfiguração |
| Manutenção | Uma stack já conhecida no projeto | Duas curvas simultâneas |

---

## 6. Diagramas / Architecture (sem mudança de direção)

`ArchitectureDiagram.tsx` continua como referência conceitual. A V3 terá uma família de visualizações customizadas em **SVG + React** (não Mermaid):

- `ArchitectureDiagram` (evolução do existente)
- `RequestFlow` — mapeia o bloco "Inspect system" do Figma; para o CatCare, pode citar literalmente `is_household_member`/`can_edit_household` (seção 3)
- `SecurityFlow` — papéis owner/caregiver/viewer, RLS
- `DataModelDiagram` — hierarquia households → household_members → domínio
- `PipelineDiagram` — fluxo de documentos (IML)

Requisitos: interativos, acessíveis (teclado + `aria-label`), responsivos, compatíveis com `prefers-reduced-motion`. Nenhum desses entra na Fase 1 (seção 13-A) além do necessário para o Visual↔Inspect do CatCare.

---

## 7. Motion (sem mudança de direção)

- framer-motion/Motion mantido.
- Expandir `prefers-reduced-motion` para além do `ArchitectureDiagram` — hoje ausente em `HeroSphereScene`, `PageBackground`, e nos `motion.div` de scroll-reveal.
- A Fase 1 inclui explicitamente "infraestrutura de motion/reduced motion" (seção 13-A, item E) — ou seja, o hook/padrão compartilhado nasce já na primeira fase, para que todo componente novo o use desde o início, em vez de retrofitting depois.

---

## 8. SEO/Metadata (sem mudança de direção)

Lacunas confirmadas: sem `sitemap.ts`, `robots.ts`, `manifest.ts`, `metadataBase`. Ícones inconsistentes (`favicon.ico` vs `metadata.icons` apontando para `/avatar.png`). Correção é mecânica, baixo risco — não faz parte do escopo explícito da Fase 1, mas pode ser feita como ajuste de infraestrutura isolado (seção 11) sem esperar pelas fases visuais.

---

## 9. Portfolio AI — arquitetura revisada

Decisão explícita: **a IA atual continua no ar durante toda a migração.** Não remover `TerminalPanel`/`api/chat` antes que a nova Portfolio AI esteja funcionando e substituindo-a de fato — sem janela em que o portfólio fica sem IA.

Arquitetura-alvo (a construir em fase própria, não na Fase 1):

```
portfolio content (nova source of truth, seção 4)
        ↓
   local search (busca por palavra-chave/tag — funciona sozinha, sem provider)
        ↓
   optional LLM enrichment (OpenRouter, mesmo padrão de fallback atual)
```

- A busca local precisa funcionar **de forma independente** — se o provider externo cair, a busca por `python`, `RLS`, `Supabase`, `automation`, `backend` etc. ainda retorna conteúdo relevante, com link para o case certo.
- Sem vector DB / RAG neste momento — não há volume de conteúdo que justifique.
- Consolidar a lógica hoje duplicada entre `RecruiterChat.tsx` (morto) e `TerminalPanel.tsx` (ativo) num único módulo, quando essa fase chegar.
- Renomear a experiência para "Ask My Portfolio" quando a nova UI for construída — não confundir com a IA atual, que continua ativa até lá.

---

## 10. Responsivo e Acessibilidade (sem mudança de direção)

Frame do Figma é desktop-only (1440px) — responsivo precisa ser desenhado durante a implementação. Achados de acessibilidade da auditoria original permanecem válidos: `ArchitectureDiagram.tsx` sem `aria-label`/`role` nos nós, `useReducedMotion` concentrado em um único componente, paleta clara/pastel do Figma precisa de checagem de contraste AA antes de virar token final. Aplicável à Fase 1 nos itens que ela cobre (Hero, header/nav, CatCare Visual↔Inspect).

---

## 11. Build e Lint — decisão documentada

**ESLint**: `npm run lint` falha hoje porque não existe `eslint.config.js` (ESLint 9 exige config explícita, flat-config). Correção: criar o config, como **ajuste de infraestrutura isolado**, sem misturar com mudanças de produto — pode ser feito a qualquer momento, inclusive antes da Fase 1, sem depender de nenhuma decisão de design.

**Supabase / build sem `.env`**: investigação teve que diferenciar três cenários antes de propor qualquer correção, conforme pedido:

1. **Ambiente local sem configuração** (este worktree de auditoria, sem `.env`): é exatamente o que causou a falha de build observada — `lib/supabase.ts` instancia o client no escopo do módulo, com non-null assertion nas env vars. Sem `.env`, o import já lança exceção no module-eval, e como esse módulo é alcançado a partir de `/` (via `ContactSection`), o prerender de `/` falha e derruba o build inteiro.
2. **Bug real de build**: sim, existe um — não pelo fato de faltar env var (isso é esperado sem config), mas porque a **falha se propaga para fora do componente que realmente precisa do client**, derrubando a página inteira mesmo em seções que não usam Supabase. O padrão correto (e é literalmente o padrão que o próprio CatCare usa, confirmado na auditoria da seção 3: `src/lib/supabase/server.ts` expõe uma função `createClient()`, chamada sob demanda, não um client instanciado eager no escopo do módulo) é criar o client dentro de uma função, no momento do uso — não no import.
3. **Comportamento esperado em Vercel**: em produção, com as env vars reais configuradas no projeto Vercel, esse problema não se manifesta — o build sempre teve as variáveis disponíveis ali. Ou seja, isto nunca foi um incidente de produção; é uma fragilidade que aparece em qualquer ambiente sem os secrets (CI, preview sem env, este worktree de auditoria).

**Decisão**: corrigir adotando o mesmo padrão do CatCare — fábrica de client sob demanda (`function createClient()`), não instanciação eager no module scope. Isso **não é um fallback inseguro**: não muda nenhuma regra de autenticação/autorização, não adiciona um "modo sem auth", apenas adia a criação do client para o momento em que ele é efetivamente necessário — que é uma prática mais correta de qualquer forma, e já é o padrão comprovado no próprio ecossistema da autora. Nenhuma chave, política ou verificação de acesso muda de comportamento.

Este é um ajuste de infraestrutura (Fase 0), não uma decisão de produto — pode ser feito isoladamente, sem esperar aprovação de design.

---

## 12. Estrutura de arquivos proposta (referência para fases futuras)

Mantida como referência de longo prazo — **não é o escopo da Fase 1**, que toca apenas um subconjunto pequeno desta árvore:

```
src/
  app/
    layout.tsx / page.tsx / sitemap.ts / robots.ts / manifest.ts
    cases/[id]/page.tsx
    api/{chat,visita,resumo-diario}/route.ts
  components/
    hero/                    # Hero V3 (CSS Modules), sem HeroAvatar morto
    behaviors/               # cards "Portfolio Behaviors" + Visual↔Inspect, Case Morph
    diagrams/                # ArchitectureDiagram, RequestFlow, PipelineDiagram, SecurityFlow, DataModelDiagram
    portfolio-ai/            # painel "Ask My Portfolio" + hook único (fase futura)
    projects/                # CaseCard, CasesSection, ProjectMorph
    terminal/                # TerminalPanel (permanece ativo até portfolio-ai/ substituir)
    about/, skills/, contact/, analytics/, ui/
  lib/
    data/
      projects/              # nova source of truth por projeto (substitui projects.ts monolítico)
      architectures.ts (ou diagrams.ts)
    portfolio-ai/
      search.ts               # busca local por palavra-chave
      client.ts                # provider + fallback chain
    supabase.ts                # client sob demanda (seção 11)
    utils.ts
tests/
  unit/ (Vitest) / e2e/ (Playwright)
```

---

## 13. Fases de implementação

### 13-A. Fase 1 — escopo aprovado (única fase autorizada a começar após este documento)

- **A. Fundação visual da V3** — estrutura base de CSS Modules + custom properties, convivendo com Tailwind legado (seção 2A).
- **B. Design tokens** — cores, tipografia, espaçamento, radii extraídos do Figma HOME, com checagem de contraste AA antes de fechar.
- **C. Header/navigation** — conforme Figma (`gabrielle / systems`, nav PROJECTS/EXPERIENCE/ABOUT, ⌘K badge visual — sem funcionalidade de Command Palette ainda, ver exclusões abaixo).
- **D. Hero** — bloco de texto (Gabrielle Campelo, tagline, badges "backend-first"/"product-minded"), placeholder editorial de foto (sem imagem real/gerada), CTAs (Explore Systems, Ask My Portfolio, GitHub) — sem exigir que "Ask My Portfolio" já funcione de ponta a ponta nesta fase, só o botão/estrutura.
- **E. Infraestrutura de motion/reduced motion** — hook/padrão compartilhado (seção 7), usado desde já por Hero e CatCare Visual↔Inspect.
- **F. Estrutura inicial do CatCare Featured Case** — usando os dados reais confirmados na seção 3.
- **G. Visual ↔ Inspect funcional para CatCare** — a interação-assinatura completa, com o conteúdo técnico verificado (RLS, roles, storage) da seção 3.

### 13-B. Explicitamente fora do escopo da Fase 1

Não implementar ainda: Experience/timeline completa; IML, RELPREV, Registro (e suas animações/interações específicas); NutriAprova/Sisters Live e a seção "More work"; nova Portfolio AI (a atual continua ativa, seção 9); Command Palette funcional; Contact final; "Under the hood" final; família completa de diagramas (além do necessário para o Inspect do CatCare); testes automatizados; migração de SEO (`sitemap`/`robots`/`manifest`) — pode ser feita à parte, como infra isolada, mas não bloqueia nem faz parte da entrega visual da Fase 1.

### 13-C. Fases futuras (não detalhadas agora, apenas nomeadas)

Fase 2 — Reconciliação de dados dos demais projetos (Registro/`diario-pcdf`, NutriAprova, Sisters Live) contra as fontes reais, seguindo o mesmo processo de auditoria aplicado ao CatCare.
Fase 3 — Seções restantes da Home (Systems row, Experience, About, Contact, Under the hood) e "More work / Other systems".
Fase 4 — Nova Portfolio AI ("Ask My Portfolio") com busca local + enrichment opcional.
Fase 5 — Command Palette, Case Morph, interações específicas (scroll-pipeline IML, toggle online/offline RELPREV, hover-timeline Registro).
Fase 6 — Família de diagramas completa.
Fase 7 — Responsivo/A11y/SEO/testes, verificação final.

---

## 14. Riscos (atualizado)

1. ~~Divergência CatCare~~ — **resolvido**: CatCare auditado diretamente (seção 3), conteúdo verificado, não inferido.
2. Sem frame mobile no Figma — responsivo ainda precisa ser desenhado durante a implementação (não é bloqueio da Fase 1, que é desktop-first pelo próprio Figma).
3. CV/foto ausentes — **não bloqueiam** (decisão do usuário); estrutura sim, conteúdo final depois.
4. Fragilidade de build sem env vars — **decisão documentada e correção definida** (seção 11), como ajuste de infra, sem enfraquecer segurança.
5. **CatCare — imprecisões no próprio README/SECURITY.md** do repositório (migrations desatualizadas, "próximos cortes" já implementados, token de convite descrito como UUID mas não é) — precisa de decisão sobre como (ou se) mencionar isso no case (seção 3, pendência aberta).
6. `src/proxy.ts` como middleware no CatCare — nome de arquivo não convencional para Next 16.3.1; recomendo confirmar em produção antes de usar "middleware" como termo técnico afirmativo no case.
7. Escopo grande / prazo de busca de emprego — mitigado pela restrição explícita da Fase 1 (seção 13-A): entrega incremental, com uma fatia publicável (Hero + CatCare Inspect) antes de tudo o mais.
8. Three.js/R3F — mantidos por ora; decisão de remoção fica pendente de confirmação explícita de que a V3 não precisa de 3D (não decidir isso implicitamente durante a Fase 1).

---

## 15. Critérios de aceite — Fase 1

- Header/nav, Hero e CatCare Featured Case (Visual + Inspect) implementados conforme os itens A–G da seção 13-A, usando CSS Modules/custom properties (seção 2A) para o código novo.
- Todo o conteúdo técnico do CatCare exibido no Inspect mode é rastreável a um arquivo/linha real do repositório CatCare auditado (seção 3) — nada inventado.
- `prefers-reduced-motion` respeitado no Hero e no Visual↔Inspect do CatCare desde o início (não como retrofit).
- Placeholder editorial de foto e botão de CV presentes estruturalmente, sem imagem gerada/stock e sem PDF fictício.
- Nenhuma funcionalidade hoje ativa (Portfolio AI atual, analytics, contato, GitHub/LinkedIn, cron de resumo diário) quebra durante a Fase 1 — a Fase 1 é aditiva à home existente, não substitui `page.tsx` de uma vez.
- `npx tsc --noEmit` continua em zero erros.
- `npm run lint` executável (config corrigida, seção 11), sem novos erros introduzidos pela Fase 1.
- Correção do Supabase client (seção 11) aplicada sem alterar nenhuma regra de auth/RLS existente.

---

## Questões em aberto — resolvidas (aprovação de Fase 1)

1. **CatCare — código vs. documentação antiga**: resolvido. Código e migrations são a fonte primária; imprecisões do README/SECURITY.md do CatCare não são reproduzidas no case, e o repositório CatCare não foi alterado (a atualização da documentação dele é um trabalho separado, fora deste projeto).
2. **`src/proxy.ts`**: investigado tecnicamente (não era uma decisão da usuária). `git ls-files`/`git status`/`git diff` confirmaram que o arquivo está versionado, sem alterações locais. `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` e o guia de upgrade (`upgrading/version-16.md`) confirmam que o Next.js 16 **renomeou o arquivo/convenção `middleware` para `proxy`** (`middleware.ts` → `proxy.ts`, export `middleware` → `proxy`). `src/proxy.ts` no CatCare é a convenção atual e correta, não uma solução alternativa. Citado como fato técnico verificado no Inspect mode (seção "Entrega da Fase 1" abaixo).
3. **Nova source of truth**: definida já na Fase 1 em `src/content/` (types.ts, profile.ts, projects/catcare.ts, projects/placeholders.ts, projects/index.ts) — ver "Entrega da Fase 1".

---

## Entrega da Fase 1

Implementada na branch `claude/portfolio-audit-migration-plan-ba19c1` (branch já dedicada a este trabalho, não-main; ver nota sobre nomenclatura de branch na mensagem de entrega). Escopo: itens A–H da seção 13-A (Header, Hero, tokens, motion foundation, source of truth + CatCare, Featured CatCare com Visual↔Inspect funcional). Detalhes completos — arquivos, decisões técnicas, status de lint/typecheck/build, comportamento com reduced motion, divergências deliberadas do Figma — na mensagem de entrega desta sessão, não duplicados aqui para evitar desalinhamento entre os dois. Este documento permanece a referência de arquitetura/estratégia; a mensagem de entrega é o registro pontual desta rodada.

**Aguardando revisão visual e técnica antes da Fase 2.**
