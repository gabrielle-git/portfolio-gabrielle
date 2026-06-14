import type { ArchData } from "@/components/cases/ArchitectureDiagram";

/**
 * Arquiteturas dos cases, indexadas pelo id do projeto.
 * Para adicionar/editar um diagrama, é só mexer aqui.
 */
export const ARCHITECTURES: Record<string, ArchData> = {
  // ───────────── RELPREV / DOA ─────────────
  "doa-relprev": {
    liveLabel: "Arquitetura · fluxo de dados",
    overview:
      "Ferramenta local, offline-first, num único arquivo HTML aberto no Edge. Passe o mouse (ou toque) nos blocos para ver o que cada parte faz.",
    layers: [
      {
        id: "auth", name: "Autenticação · RBAC", tag: "01", hex: "#a78bfa",
        text: "text-violet-300", border: "border-violet-400/30", bg: "bg-violet-500/[0.07]", dot: "bg-violet-400",
        flowLabel: "sessão validada",
        nodes: [
          { id: "login", label: "Login · matrícula ou nome", detail: "Entra com matrícula OU nome + senha. Sem servidor — tudo roda no próprio navegador." },
          { id: "hash", label: "Web Crypto · hash SHA-256", detail: "Senhas nunca ficam em texto puro: são transformadas em hash via Web Crypto API." },
          { id: "rbac", label: "Papéis · admin / comum", detail: "Acesso por papel: admin gerencia e aprova solicitações; comum registra e consulta." },
          { id: "recover", label: "Código de recuperação", detail: "Gera um código (RLPV-XXXX-XXXX) — a única forma de recuperar a senha do admin offline." },
        ],
      },
      {
        id: "ui", name: "Interface · single-file HTML", tag: "02", hex: "#22d3ee",
        text: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-500/[0.07]", dot: "bg-cyan-400",
        flowLabel: "registra ocorrência",
        nodes: [
          { id: "form", label: "Formulário adaptativo", detail: "Os campos mudam conforme a natureza: Em voo, Manutenção (solo) ou Pessoa." },
          { id: "dash", label: "Dashboard · gráficos SVG nativos", detail: "Indicadores e gráficos desenhados em SVG puro, sem nenhuma biblioteca externa." },
          { id: "filters", label: "Filtros · período & relatórios", detail: "Filtra por mês/intervalo e exporta PNG dos gráficos, PDF do painel e planilha Excel." },
        ],
      },
      {
        id: "risk", name: "Motor de risco", tag: "03", hex: "#fbbf24",
        text: "text-amber-300", border: "border-amber-400/30", bg: "bg-amber-500/[0.07]", dot: "bg-amber-400",
        flowLabel: "classifica e persiste",
        nodes: [
          { id: "gp", label: "Gravidade × Probabilidade", detail: "Combina gravidade e probabilidade para calcular o nível de risco automaticamente." },
          { id: "matrix", label: "Matriz de risco 4×4", detail: "Classifica em Baixo, Médio, Alto ou Crítico e destaca as ocorrências mais sérias." },
          { id: "factors", label: "Fatores contribuintes + barreiras", detail: "Registra o que contribuiu para a ocorrência e quais barreiras falharam." },
        ],
      },
      {
        id: "persist", name: "Persistência híbrida", tag: "04", hex: "#34d399",
        text: "text-emerald-300", border: "border-emerald-400/30", bg: "bg-emerald-500/[0.07]", dot: "bg-emerald-400",
        nodes: [
          { id: "idb", label: "IndexedDB · espelho offline", detail: "Cópia local no navegador — o painel funciona 100% offline, sem internet." },
          { id: "fs", label: "File System Access · pasta de rede", detail: "Grava o JSON direto numa pasta de rede compartilhada (showSaveFilePicker), sem servidor." },
          { id: "sync", label: "Auto-save + sync 30s", detail: "Salva a cada alteração e relê a pasta sozinho a cada 30s para sincronizar entre os PCs." },
          { id: "backup", label: "Backup / Restore manual", detail: "Exporta e importa um arquivo de cópia de segurança a qualquer momento." },
        ],
      },
    ],
  },

  // ───────────── NUTRIAPROVA ─────────────
  nutriaprova: {
    liveLabel: "Arquitetura · IA + automação",
    overview:
      "SaaS de nutrição guiada por IA conectando paciente, nutricionista e personal. Passe o mouse (ou toque) nos blocos para ver o que cada parte faz.",
    layers: [
      {
        id: "ui", name: "Interface · React + Vite", tag: "01", hex: "#22d3ee",
        text: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-500/[0.07]", dot: "bg-cyan-400",
        flowLabel: "solicita geração",
        nodes: [
          { id: "perfis", label: "4 perfis · paciente / nutri / personal / admin", detail: "Três perfis de uso (paciente, nutricionista, personal) + um perfil admin restrito, acessível só com o seu e-mail." },
          { id: "ui", label: "shadcn/ui + Tailwind · glassmorphism", detail: "Frontend em React + Vite com componentes shadcn/ui, Tailwind e visual de vidro (glassmorphism)." },
          { id: "pede", label: "Solicita plano alimentar", detail: "O profissional dispara a geração de um plano alimentar guiado por IA com um clique." },
        ],
      },
      {
        id: "n8n", name: "Automação · n8n", tag: "02", hex: "#f472b6",
        text: "text-pink-300", border: "border-pink-400/30", bg: "bg-pink-500/[0.07]", dot: "bg-pink-400",
        flowLabel: "consulta a IA",
        nodes: [
          { id: "webhook", label: "Webhook · recebe a solicitação", detail: "Um webhook do n8n recebe a solicitação do app — o frontend nunca fala direto com a IA." },
          { id: "workflow", label: "Workflows · orquestram o fluxo", detail: "Os workflows validam os dados, montam o prompt e coordenam a chamada à IA passo a passo." },
          { id: "docker", label: "Self-hosted (Docker)", detail: "O n8n roda auto-hospedado em Docker — controle total do fluxo e das credenciais." },
        ],
      },
      {
        id: "ia", name: "IA · Gemini", tag: "03", hex: "#a78bfa",
        text: "text-violet-300", border: "border-violet-400/30", bg: "bg-violet-500/[0.07]", dot: "bg-violet-400",
        flowLabel: "persiste & retorna",
        nodes: [
          { id: "gemini", label: "Gemini API · gera o plano", detail: "A API do Gemini gera o plano alimentar a partir dos dados do paciente e do prompt montado pelo n8n." },
          { id: "json", label: "Resposta estruturada (JSON)", detail: "A resposta volta em formato estruturado (JSON), pronta pra ser salva e renderizada no app." },
        ],
      },
      {
        id: "supabase", name: "Supabase · dados & auth", tag: "04", hex: "#34d399",
        text: "text-emerald-300", border: "border-emerald-400/30", bg: "bg-emerald-500/[0.07]", dot: "bg-emerald-400",
        nodes: [
          { id: "auth", label: "Auth · login por papel", detail: "Autenticação por papel (paciente / nutri / personal / admin) — cada um entra direto no seu espaço." },
          { id: "pg", label: "Postgres · pacientes, planos, métricas", detail: "Banco Postgres guarda pacientes, os planos gerados e as métricas de acompanhamento." },
          { id: "rls", label: "RLS · cada perfil vê só o seu", detail: "Row Level Security garante, no próprio banco, que cada perfil só enxerga os dados que pode acessar." },
        ],
      },
    ],
  },

  // ───────────── SISTERS LIVE ─────────────
  "sisters-live": {
    liveLabel: "Arquitetura · pipeline ETL",
    overview:
      "Pipeline de captação 24/7: o lead entra pela Meta, é saneado no Make, gravado na API do cliente e nutrido no WhatsApp — com auditoria e alerta pros casos de falha. Passe o mouse (ou toque) nos blocos.",
    layers: [
      {
        id: "captacao", name: "Captação · Meta Lead Ads", tag: "01", hex: "#60a5fa",
        text: "text-blue-300", border: "border-blue-400/30", bg: "bg-blue-500/[0.07]", dot: "bg-blue-400",
        flowLabel: "webhook",
        nodes: [
          { id: "form", label: "Formulário Lead Ads · CPF, cargo, empresa", detail: "Os leads chegam de um formulário de anúncios no Facebook/Meta, com campos como CPF, cargo e empresa." },
          { id: "trigger", label: "Dispara por webhook", detail: "Cada novo lead aciona o Make na hora, via webhook — captação rodando 24/7, sem intervenção." },
        ],
      },
      {
        id: "make", name: "Orquestração · Make", tag: "02", hex: "#a78bfa",
        text: "text-violet-300", border: "border-violet-400/30", bg: "bg-violet-500/[0.07]", dot: "bg-violet-400",
        flowLabel: "grava no banco",
        nodes: [
          { id: "uf", label: "Normalização de UF", detail: "Padroniza o estado (UF) pro formato que a API do cliente exige — parte das 'máscaras' de transformação." },
          { id: "regex", label: "Limpeza de CPF / telefone (regex)", detail: "Limpa e valida CPF e telefone com regex, removendo ruído antes de enviar pra frente." },
          { id: "valida", label: "Validação de campos", detail: "Confere se o lead está completo e consistente; o que falha vai pra trilha de auditoria." },
        ],
      },
      {
        id: "api", name: "Banco do cliente · API", tag: "03", hex: "#34d399",
        text: "text-emerald-300", border: "border-emerald-400/30", bg: "bg-emerald-500/[0.07]", dot: "bg-emerald-400",
        flowLabel: "roteia por resultado",
        nodes: [
          { id: "api", label: "API Movimento Vida 360", detail: "Integração direta com a API do banco de dados próprio do cliente — sistema de terceiro com schema rígido." },
          { id: "persist", label: "Persiste o lead saneado", detail: "O lead já limpo e validado é gravado na base do cliente; a resposta define o próximo passo." },
        ],
      },
      {
        id: "pos", name: "Pós-processamento", tag: "04", hex: "#fbbf24",
        text: "text-amber-300", border: "border-amber-400/30", bg: "bg-amber-500/[0.07]", dot: "bg-amber-400",
        nodes: [
          { id: "bot", label: "Sucesso → BotConversa (WhatsApp)", detail: "Deu certo (201)? O lead entra num fluxo de nurturing no WhatsApp via BotConversa, com janela de horário comercial." },
          { id: "sheets", label: "Erro → Google Sheets (auditoria)", detail: "Lead rejeitado ou erro (409)? Vai pra uma planilha de auditoria pra revisão manual — nada se perde." },
          { id: "alerta", label: "Alerta de e-mail · monitora a API", detail: "Falha crítica dispara alerta por e-mail — monitoramento proativo pra quando a API do cliente instabiliza." },
        ],
      },
    ],
  },

  // ───────────── DIÁRIO / REGISTRO ─────────────
  "diario-pcdf": {
    liveLabel: "Arquitetura · app local",
    overview:
      "App pessoal pra registrar setores, pessoas e entradas de diário numa hierarquia organizacional, com a persistência já preparada pra ir pra nuvem. Passe o mouse (ou toque) nos blocos.",
    layers: [
      {
        id: "ui", name: "Interface · React + Vite", tag: "01", hex: "#22d3ee",
        text: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-500/[0.07]", dot: "bg-cyan-400",
        flowLabel: "modela os dados",
        nodes: [
          { id: "forms", label: "Formulários · Setor, Pessoa, Entrada", detail: "Telas de cadastro de setor, pessoa e entradas de diário — o fluxo do dia a dia do registro." },
          { id: "state", label: "Estado controlado nativo (sem libs)", detail: "Formulários com estado controlado do próprio React, sem bibliotecas externas de form." },
          { id: "stack", label: "React + Vite + TypeScript", detail: "Base moderna e tipada, com tudo em português ponta a ponta." },
        ],
      },
      {
        id: "modelo", name: "Modelo de dados", tag: "02", hex: "#a78bfa",
        text: "text-violet-300", border: "border-violet-400/30", bg: "bg-violet-500/[0.07]", dot: "bg-violet-400",
        flowLabel: "persiste",
        nodes: [
          { id: "hier", label: "Hierarquia em 3 níveis", detail: "Estrutura organizacional em três níveis, modelando como as unidades se encaixam." },
          { id: "catalogo", label: "Catálogo de unidades", detail: "Um catálogo completo das unidades, reaproveitado nos cadastros pra manter tudo consistente." },
          { id: "vinculo", label: "Vínculo flexível (pessoa ↔ lotação)", detail: "Um modelo de Vínculo flexível liga pessoas às suas lotações, cobrindo casos fora do padrão." },
        ],
      },
      {
        id: "persist", name: "Persistência", tag: "03", hex: "#34d399",
        text: "text-emerald-300", border: "border-emerald-400/30", bg: "bg-emerald-500/[0.07]", dot: "bg-emerald-400",
        nodes: [
          { id: "abstr", label: "Camada de storage abstraída", detail: "Toda gravação passa por uma camada de abstração — trocar a fonte de dados não mexe no resto do app." },
          { id: "local", label: "localStorage hoje · pronta pro Supabase", detail: "Hoje guarda local (localStorage); a abstração já foi desenhada pra migrar pro Supabase sem reescrever." },
        ],
      },
    ],
  },

  // ───────────── PCDF · IML (abstrato/confidencial) ─────────────
  "pcdf-iml": {
    liveLabel: "Arquitetura · pipeline de triagem",
    overview:
      "Sistema desktop em Python que lê, classifica e organiza documentos digitalizados em lote — de forma robusta e à prova de erro. (Visão de alto nível; detalhes sensíveis omitidos.) Passe o mouse (ou toque) nos blocos.",
    layers: [
      {
        id: "ui", name: "Interface · desktop", tag: "01", hex: "#22d3ee",
        text: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-500/[0.07]", dot: "bg-cyan-400",
        flowLabel: "lê o documento",
        nodes: [
          { id: "app", label: "App desktop em Python (Tkinter)", detail: "Aplicação de mesa em Python com interface em Tkinter, usada pelo operador." },
          { id: "fila", label: "Fila de triagem", detail: "O operador acompanha os documentos em uma fila de processamento, com status de cada um." },
        ],
      },
      {
        id: "leitura", name: "Leitura · PyMuPDF", tag: "02", hex: "#a78bfa",
        text: "text-violet-300", border: "border-violet-400/30", bg: "bg-violet-500/[0.07]", dot: "bg-violet-400",
        flowLabel: "identifica e classifica",
        nodes: [
          { id: "extrai", label: "Extrai texto e posições (PyMuPDF)", detail: "Com PyMuPDF, o sistema lê o PDF digitalizado e extrai não só o texto, mas a posição de cada elemento." },
          { id: "duplex", label: "Trata digitalização frente e verso", detail: "Lida com documentos digitalizados em frente e verso, tratando cada lado corretamente." },
        ],
      },
      {
        id: "triagem", name: "Triagem · máquina de estados", tag: "03", hex: "#fbbf24",
        text: "text-amber-300", border: "border-amber-400/30", bg: "bg-amber-500/[0.07]", dot: "bg-amber-400",
        flowLabel: "organiza a saída",
        nodes: [
          { id: "fsm", label: "Máquina de estados (duplex)", detail: "Uma máquina de estados conduz o documento por cada etapa do processo de forma previsível." },
          { id: "ancora", label: "Ancoragem posicional · titular correto", detail: "Usa a posição dos elementos pra identificar o titular certo do documento, sem confundir com outras assinaturas." },
          { id: "classe", label: "Classificação por categoria", detail: "Cada documento é classificado pela sua categoria, automaticamente." },
        ],
      },
      {
        id: "saida", name: "Roteamento · saída organizada", tag: "04", hex: "#34d399",
        text: "text-emerald-300", border: "border-emerald-400/30", bg: "bg-emerald-500/[0.07]", dot: "bg-emerald-400",
        nodes: [
          { id: "rota", label: "Encaminha ao destino correto", detail: "Cada documento é encaminhado automaticamente ao destino certo, conforme sua classificação." },
          { id: "lote", label: "Processamento em lote, à prova de erro", detail: "Processa grandes volumes de uma vez, com tratamento de erros pra não travar nem perder documento." },
        ],
      },
    ],
  },
};