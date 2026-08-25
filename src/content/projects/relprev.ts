import type { ProjectContent } from "../types";

/**
 * RELPREV — an offline-first operational panel. Repository is not public
 * (no accessible URL found in this session or the original portfolio
 * audit). Facts below come directly from the project owner as explicitly
 * verified. No PCDF content, matrículas, credentials or personal data are
 * referenced anywhere.
 */

export type RelprevState = "online" | "offline" | "restore";

export interface RelprevStateContent {
  id: RelprevState;
  label: string;
  title: string;
  detail: string;
}

export const relprevStates: RelprevStateContent[] = [
  {
    id: "online",
    label: "ONLINE",
    title: "network storage connected",
    detail: "Aplicação single-file rodando no navegador (Edge), sem instalação — lê e grava direto numa pasta de rede via File System Access API.",
  },
  {
    id: "offline",
    label: "OFFLINE",
    title: "IndexedDB / local mirror continua",
    detail: "Se a rede cai, um mirror local em IndexedDB assume — a operação não para, sem servidor e sem dependências de runtime.",
  },
  {
    id: "restore",
    label: "RESTORE",
    title: "reconecta e realinha",
    detail: "Ao reconectar, backup/restore realinha o mirror local com a pasta de rede — os dados voltam para o fluxo esperado.",
  },
];

export const relprevInspect = {
  heading: "Offline-first / resilience",
  annotation: "ZERO SERVER RUNTIME",
  flow: [
    { id: "browser", label: "Browser", detail: "App single-file, sem instalação, roda direto no Edge." },
    { id: "fsa", label: "File System Access", detail: "Lê/escreve numa pasta de rede via File System Access API — sem backend próprio." },
    { id: "indexeddb", label: "IndexedDB mirror", detail: "Mirror local que assume quando a rede falha." },
    { id: "network", label: "Network storage", detail: "Pasta de rede como fonte de verdade quando online." },
    { id: "backup", label: "Backup / restore", detail: "Restaura e realinha o mirror local após reconexão." },
  ],
  propertiesLabel: "SYSTEM PROPERTIES",
  properties: [
    {
      id: "resilience",
      label: "Resiliência operacional",
      detail: "Offline-first, com persistência local e continuidade operacional mesmo sem rede.",
    },
    {
      id: "access",
      label: "Autenticação e acesso",
      detail: "Hash de senha via Web Crypto, com controle de papéis (RBAC).",
    },
  ],
};

export const relprev: ProjectContent = {
  id: "relprev",
  status: "verified",
  kind: "resilience",
  title: "RELPREV",
  eyebrow: "02 / SELECTED SYSTEMS",
  tagline: "Painel operacional que continua funcionando quando a rede cai.",
  tags: ["offline-first", "security", "backend", "frontend"],
  links: {},
  sourceNote:
    "Repositório sem URL pública confirmada nesta sessão. Fatos confirmados diretamente pela autora, não por leitura independente de código: single-file, roda no browser (Edge) sem instalação, File System Access API, armazenamento em pasta de rede, mirror local offline via IndexedDB, backup/restore, Web Crypto, RBAC, zero dependências de runtime/servidor no modo original. Nenhum conteúdo institucional, matrícula, credencial ou dado pessoal é referenciado.",
};
