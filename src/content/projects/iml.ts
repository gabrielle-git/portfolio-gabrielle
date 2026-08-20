import type { InspectCodeSample, ProjectContent } from "../types";

/**
 * IML — a Python document-automation pipeline built for institutional use.
 * The repository is confidential (private, not independently cloneable —
 * confirmed in the original portfolio audit: pcdf-iml is marked
 * `confidential: true`). Facts below come directly from the project owner
 * as explicitly verified, not from an independent code read like CatCare's.
 * No document counts, institution names, file paths, or record numbers are
 * used anywhere — the code sample is deliberately conceptual/sanitized.
 */

export interface PipelineStage {
  id: string;
  label: string;
  detail: string;
}

export const imlPipeline: PipelineStage[] = [
  { id: "pdf", label: "PDF", detail: "Documento entra no pipeline em ambiente Windows/rede." },
  { id: "validate", label: "VALIDATE", detail: "Pré-validação do arquivo antes de qualquer processamento." },
  { id: "extract", label: "EXTRACT", detail: "Extração de conteúdo via PyMuPDF." },
  { id: "resolve", label: "RESOLVE", detail: "Identificação e resolução de inconsistências no documento." },
  { id: "classify", label: "CLASSIFY", detail: "Classificação determinística — regras, não heurística probabilística." },
  { id: "route", label: "ROUTE", detail: "Roteamento para o destino correto conforme a classificação." },
  { id: "audit", label: "AUDIT", detail: "Log de auditoria registra cada etapa do processamento." },
];

export const imlMetric = {
  label: "TEMPO DE PROCESSAMENTO",
  from: "hours",
  to: "seconds",
  note: "Redução verificada pela própria autora ao substituir a triagem manual pelo pipeline.",
};

const codeSample: InspectCodeSample = {
  source: "conceitual — sanitizado, sem caminhos/nomes/matrículas reais",
  language: "ts",
  code: `def classify(document: Document) -> Route:
    if not document.is_valid():
        raise ValidationError("reprovado na pre-validacao")

    fields = extract_fields(document)      # PyMuPDF
    resolved = resolve_identifiers(fields)
    route = deterministic_rules.match(resolved)

    audit_log.record(document.id, route)
    return route`,
};

export const imlInspect = {
  heading: "Pipeline / automation",
  annotation: "DETERMINISTIC ROUTING",
  reveals: [
    { id: "rules", label: "deterministic rules", detail: "Classificação por regras fixas, não por modelo probabilístico — mesmo documento, mesma rota, sempre." },
    { id: "validation", label: "validation", detail: "Nenhum documento avança sem passar pela pré-validação." },
    { id: "errors", label: "error handling", detail: "Falhas de validação/extração interrompem o fluxo em vez de produzir um resultado incorreto silencioso." },
    { id: "audit", label: "auditability", detail: "Cada etapa grava um registro de auditoria — o caminho de um documento é reconstruível depois." },
    { id: "threading", label: "threading", detail: "Processamento concorrente via threading em Python, para lidar com lotes sem serializar tudo." },
    { id: "fs", label: "filesystem/network context", detail: "Opera sobre pasta de rede em ambiente Windows institucional, não um servidor dedicado." },
  ],
  codeSample,
};

export const iml: ProjectContent = {
  id: "iml",
  status: "verified",
  kind: "pipeline",
  title: "IML",
  eyebrow: "02 / SELECTED SYSTEMS",
  tagline: "Automação Python que tirou a triagem de documentos de horas para segundos.",
  tags: ["python", "automation", "backend", "security"],
  links: {},
  sourceNote:
    "Repositório confidencial/privado — não auditável diretamente (mesma classificação já registrada no portfólio antigo: confidential: true). Fatos confirmados diretamente pela autora, não por leitura independente de código; nenhuma contagem de documentos, nome de instituição, caminho de arquivo ou matrícula é usada em nenhum lugar.",
};
