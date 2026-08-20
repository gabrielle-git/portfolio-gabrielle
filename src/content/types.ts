/**
 * Shared types for the V3 content layer (src/content).
 *
 * This is the structured source of truth for Home, cases, Visual/Inspect,
 * Portfolio AI and local search. It replaces the old free-floating
 * combination of src/lib/data/projects.ts (structured but stale) and
 * src/lib/data/sobre-ia.ts (a single prompt string).
 *
 * `status` tracks whether a project's content has been verified against its
 * real repository/deployment (see docs/V3-MIGRATION-PLAN.md section 4) or is
 * still a structural placeholder awaiting its own audit pass.
 */

export type ContentStatus = "verified" | "placeholder";

export interface ProjectRole {
  id: string;
  label: string;
  description: string;
}

export interface DomainNode {
  id: string;
  label: string;
  detail?: string;
}

export interface InspectFlowStep {
  id: string;
  label: string;
  detail: string;
}

export interface InspectCodeSample {
  source: string;
  language: "ts" | "sql";
  code: string;
}

export interface ProjectLinks {
  live?: string;
  repo?: string;
}

/** Tags used by local/fallback search (see Fase 4 — Portfolio AI). */
export type ProjectTag =
  | "python"
  | "typescript"
  | "nextjs"
  | "supabase"
  | "postgresql"
  | "rls"
  | "auth"
  | "automation"
  | "backend"
  | "frontend"
  | "offline-first"
  | "ai";

export interface ProjectContent {
  id: string;
  status: ContentStatus;
  title: string;
  eyebrow: string;
  tagline: string;
  tags: ProjectTag[];
  links: ProjectLinks;
  /** Human-readable pointer to where this content was verified, or why it's still a placeholder. */
  sourceNote: string;
}
