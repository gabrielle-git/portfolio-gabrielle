/* ================================================================
 * projects.ts — Fonte única de verdade dos projetos
 * Portfolio Gabrielle Campelo · Software Engineer
 * ================================================================
 *
 * Esse arquivo é a "base de dados" estática dos cases featured.
 * Outros projetos (acadêmicos, secundários) ficam em otherProjects.ts.
 *
 * Adicionar projeto: adicionar uma entrada no array PROJECTS.
 * O TypeScript garante que nenhum campo obrigatório seja esquecido.
 * ================================================================ */

/* ----------------------------------------------------------------
 * TIPOS — Define a "forma" de um projeto
 * ---------------------------------------------------------------- */

export type ProjectCategory =
  | "saas"           // Produto SaaS
  | "automation"     // Automação de processos
  | "ai-integration" // Integração com IA
  | "data-pipeline"  // Pipeline ETL / integração de dados
  | "internal-tool"  // Ferramenta interna
  | "freelance";     // Projeto de cliente

export type ProjectStatus =
  | "live"           // Em produção, em uso
  | "completed"      // Concluído e entregue
  | "ongoing"        // Em desenvolvimento ativo
  | "archived";      // Arquivado mas relevante

export type EngagementType =
  | "product-lead"   // Liderança técnica de produto próprio
  | "consulting"     // Consultoria pontual
  | "contracting"    // Contrato independente (PJ)
  | "internal";      // Trabalho interno em órgão/empresa

export interface Project {
  /** Identificador único (usado em URLs, keys do React, etc.) */
  id: string;

  /** Nome do projeto */
  title: string;

  /** Slogan curto (1 linha, aparece embaixo do título) */
  tagline: string;

  /** Categoria principal */
  category: ProjectCategory;

  /** Status atual */
  status: ProjectStatus;

  /** Tipo de engajamento */
  engagement: EngagementType;

  /** Cliente ou contexto (ex.: "Sisters Live Marketing", "PCDF/IML") */
  client?: string;

  /** Papel exercido no projeto */
  role: string;

  /** Período (ex.: "2026 — presente", "2025") */
  period: string;

  /** O problema que o projeto resolve */
  problem: string;

  /** A solução implementada */
  solution: string;

  /** Stack técnica usada (exibida como tags) */
  stack: string[];

  /** Decisões arquiteturais importantes (bullets curtos) */
  highlights: string[];

  /** Métricas / impacto de negócio (bullets curtos) */
  impact: string[];

  /** Marca se é caso confidencial (mostra aviso de NDA) */
  confidential?: boolean;

  /** Marca se é destacado na home */
  featured?: boolean;

  /** Texto livre adicional sobre o contexto (opcional, narrativa expandida) */
  context?: string;
}

/* ----------------------------------------------------------------
 * DADOS — Cases featured
 *
 * Ordem do array = ordem de exibição.
 * Mais impactante primeiro.
 * ---------------------------------------------------------------- */

export const PROJECTS: Project[] = [
  /* ============================================================
   * 1. NUTRIAPROVA — SaaS B2B com IA generativa
   * ============================================================ */
  {
    id: "nutriaprova",
    title: "NutriAprova",
    tagline: "SaaS de nutrição com IA generativa e validação clínica",
    category: "saas",
    status: "live",
    engagement: "product-lead",
    role: "Tech Lead / Engenheira de Software",
    period: "2026 — presente",
    problem:
      "Nutricionistas gastavam em média 40 minutos para montar manualmente um plano alimentar individualizado considerando restrições, preferências e objetivos clínicos do paciente. O gargalo limitava o número de atendimentos diários e tornava inviável a escala de clínicas com múltiplos profissionais. Softwares de mercado eram engessados em templates, sem capacidade de personalização real via linguagem natural.",
    solution:
      "Plataforma SaaS multi-perfil (paciente, nutricionista, personal trainer, administrador) onde o profissional descreve em texto livre o contexto clínico do paciente e um motor de IA generativa produz o plano alimentar estruturado em segundos, editável e exportável. Arquitetura desacoplada com fila assíncrona via webhooks isolando o custo computacional da IA da experiência do usuário, garantindo latência percebida baixa mesmo sob carga variável da API do modelo.",
    stack: [
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui (Radix UI)",
      "React Query",
      "React Hook Form",
      "Zod",
      "Supabase (PostgreSQL)",
      "n8n",
      "Ollama (LLM local)",
      "Google Gemini API",
      "Docker Compose",
      "Redis",
      "Vitest",
    ],
    highlights: [
      "Arquitetura multi-perfil com Row-Level Security via PostgreSQL",
      "Separação clara entre camada de aplicação e orquestração de IA",
      "Engenharia de prompt em camadas com validação por JSON Schema",
      "Webhooks bidirecionais com fila de processamento e retentativa idempotente",
      "Stack Docker self-hosted: Postgres + n8n + Ollama + Redis em ambiente isolado",
      "24+ migrations versionadas no Supabase com auditoria completa",
      "Paywall implementado na jornada do paciente para proteção de conteúdo IA",
      "Testes automatizados com Vitest cobrindo lógica de negócio",
      "Containerização desde o dia 1 (paridade dev/prod)",
    ],
    impact: [
      "Redução do tempo de criação de plano de ~40min para <2min",
      "Produto em operação comercial com clientes pagantes",
      "Plataforma multi-perfil suportando paciente, nutricionista, personal trainer e admin",
      "Arquitetura escalável horizontalmente sem refactor",
      "Time-to-market reduzido: do whiteboard ao MVP em produção em ciclo curto",
    ],
    context:
      "Atuação end-to-end: levantamento de requisitos com nutricionistas, decisões arquiteturais com visão de produto, implementação backend, integração com IA em produção e operação de infra containerizada. Maturidade para escolher quando NÃO usar IA (validação clínica, autenticação, billing — tudo isso é código determinístico).",
    featured: true,
  },

  /* ============================================================
   * 2. PCDF/IML — Automação documental em ambiente crítico
   * ============================================================ */
  {
    id: "pcdf-iml",
    title: "Fatiador de Documentos — PCDF/IML",
    tagline: "Triagem documental crítica em ambiente governamental sob sigilo",
    category: "automation",
    status: "completed",
    engagement: "internal",
    client: "Polícia Civil do Distrito Federal · Instituto de Medicina Legal",
    role: "Engenheira de Software (cobertura de férias na divisão administrativa)",
    period: "2026",
    confidential: true,
    problem:
      "A divisão administrativa do IML recebia mensalmente lotes massivos de documentos digitalizados — folhas de ponto, escalas de serviço, atestados, abonos, declarações — que precisavam ser segmentados servidor por servidor para arquivamento na rede corporativa. O processo manual consumia horas de profissionais qualificados em tarefa repetitiva, com risco humano de erro em ambiente onde erro de arquivamento tem consequência administrativa e jurídica.",
    solution:
      "Aplicação desktop em Python com interface gráfica Tkinter, projetada para operar dentro de perímetro de segurança rígido: zero dependência de cloud, determinismo absoluto, auditabilidade total. A arquitetura interna implementa uma máquina de estado com paridade duplex que mantém memória do 'dono atual' das páginas, herda identidade entre frente e verso de scanner duplex, descarta páginas em branco silenciosamente, e roteia páginas órfãs para revisão manual.",
    stack: [
      "Python 3.12+",
      "Tkinter (UI desktop nativa)",
      "PyMuPDF (extração palavra-a-palavra)",
      "pypdf (manipulação)",
      "Threading + Queue (UI responsiva)",
      "Pathlib (caminhos UNC cross-platform)",
      "Linux Debian (desenvolvimento)",
      "Windows Server (deploy)",
    ],
    highlights: [
      "Máquina de estado com paridade duplex para tratamento de scanner frente/verso",
      "Reescrita arquitetural completa: v1 (watchdog + pdfplumber) → v2 (state machine + PyMuPDF)",
      "Quatro camadas de segurança auditadas para operação em rede corporativa",
      "Detecção precoce de falha de rede (aborto antes de gravação)",
      "Reconhecimento de pastas existentes com normalização robusta (capitalização, acentos, espaços, hífens)",
      "Idempotência de processamento (reprocessar lote não duplica)",
      "Monitor de MAX_PATH para antecipar limite histórico de 260 chars do Windows",
      "Sistema versionado semanticamente (v5.2.3-STABLE em produção)",
      "Logs estruturados auditáveis sem expor conteúdo de PII",
    ],
    impact: [
      "Conversão de processo manual de horas em operação de segundos",
      "Eliminação total de erros de digitação em nomes de arquivo e roteamento de pasta",
      "Padronização garantida em 100% dos arquivos gravados",
      "Histórico de processamento auditável via log estruturado",
      "Liberação de horas qualificadas para atividades-fim de perícia",
      "Compliance com LGPD e governança de dados sensíveis",
    ],
    context:
      "Projeto desenvolvido durante cobertura de férias na divisão administrativa do IML. A engenharia foi avaliada por aquilo que não pode falhar: documentos confidenciais, perímetro de segurança rígido, contexto jurídico. Maturidade para entender que automação em ambiente regulado não é sobre fazer rápido — é sobre fazer auditável, reprodutível e seguro.",
    featured: true,
  },

  /* ============================================================
   * 3. SISTERS LIVE — Pipeline ETL com idempotência
   * ============================================================ */
  {
    id: "sisters-live",
    title: "Pipeline Sisters Live",
    tagline: "Captação automatizada com ETL, idempotência e nurturing",
    category: "data-pipeline",
    status: "live",
    engagement: "contracting",
    client: "Sisters Live Marketing",
    role: "Engenheira de Automação (PJ)",
    period: "2025",
    problem:
      "Cliente precisava conectar captação de leads via Facebook Lead Ads, banco de dados próprio e plataforma de mensageria (BotConversa) sem investir em ferramentas pagas de iPaaS. Operação manual gerava perda de leads, atrasos na nutrição comercial e ausência de tratamento de duplicidade — leads repetidos consumiam atendimento sem retorno proporcional.",
    solution:
      "Pipeline ETL automatizado usando Make como orquestrador, com tratamento robusto de dados, deduplicação via códigos HTTP semânticos e roteamento condicional. Sanitização e normalização de PII (CPF, telefone, email, estado) aplicadas no payload antes da persistência. Fluxo de nurturing pós-captação implementado em BotConversa com sequência temporal personalizada e múltiplos pontos de contato.",
    stack: [
      "Make (Integromat)",
      "Facebook Lead Ads API",
      "MySQL",
      "BotConversa",
      "HTTP REST",
      "Google Sheets (analytics)",
      "Regex (sanitização)",
      "JSON parsing",
    ],
    highlights: [
      "Pipeline ETL completo: Extract (Facebook) → Transform (sanitização) → Load (MySQL + BotConversa)",
      "Idempotência via códigos HTTP semânticos (409 Conflict = lead duplicado)",
      "Separação clara entre erros técnicos (HTTP 4xx≠409) e regra de negócio",
      "Sanitização de PII: CPF (remove máscara), telefone (extrai 11 dígitos finais), estado (sigla uppercase)",
      "Normalização de strings: nome em uppercase, empresa com remoção de espaços",
      "Throttling estratégico com sleep entre etapas para respeitar limites de API",
      "Fluxo de nurturing automatizado com mensagens personalizadas e timing programado",
      "Roteamento condicional para múltiplos destinos (3 Google Sheets distintos por estado do lead)",
    ],
    impact: [
      "Captação 24/7 sem intervenção manual",
      "Eliminação de leads perdidos por falha humana",
      "Redução do tempo de primeiro contato com lead",
      "Cliente economizou em ferramentas pagas equivalentes (Zapier Premium, HubSpot, etc.)",
      "Nurturing automatizado liberou time comercial para conversões quentes",
    ],
    featured: true,
  },
];

/* ----------------------------------------------------------------
 * HELPERS — Funções utilitárias pra consumir os dados
 * ---------------------------------------------------------------- */

/** Retorna apenas projetos marcados como featured (destaques da home) */
export const featuredProjects = PROJECTS.filter((p) => p.featured);

/** Retorna projetos por categoria */
export const projectsByCategory = (category: ProjectCategory) =>
  PROJECTS.filter((p) => p.category === category);

/** Retorna um projeto específico pelo id */
export const getProjectById = (id: string) =>
  PROJECTS.find((p) => p.id === id);

/** Retorna projetos confidenciais */
export const confidentialProjects = PROJECTS.filter((p) => p.confidential);

/** Total de stacks únicos usados (útil pra stats no site) */
export const allStackTechnologies = Array.from(
  new Set(PROJECTS.flatMap((p) => p.stack))
).sort();