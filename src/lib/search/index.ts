import { experienceStages } from "@/content/experience";
import { projects } from "@/content/projects";
import type { ProjectTag } from "@/content/types";

/**
 * Deterministic local search — no vector DB, no embeddings, no LLM call.
 * Powers Ask My Portfolio's fallback (and, when the LLM is reachable, the
 * facts it's allowed to enrich), the Command Palette's technical search,
 * and any future filter/link. One implementation, three surfaces — see
 * Sprint V3 instructions ("NÃO duplicar lógica").
 */

export interface SearchResult {
  id: string;
  type: "project" | "experience";
  title: string;
  description: string;
  href: string;
  score: number;
}

const SECTION_HREF: Record<string, string> = {
  catcare: "#featured-case",
  iml: "#iml",
  relprev: "#relprev",
  registro: "#registro",
};

/** Keyword -> tag synonyms, so "RLS", "row level security" etc. all resolve to the same tag. */
const KEYWORD_TAGS: Record<string, ProjectTag[]> = {
  rls: ["rls"],
  "row level security": ["rls"],
  "row-level security": ["rls"],
  python: ["python"],
  react: ["react"],
  typescript: ["typescript"],
  "next.js": ["nextjs"],
  nextjs: ["nextjs"],
  vite: ["vite"],
  offline: ["offline-first"],
  "offline-first": ["offline-first"],
  supabase: ["supabase"],
  postgres: ["postgresql"],
  postgresql: ["postgresql"],
  auth: ["auth"],
  "autenticacao": ["auth"],
  backend: ["backend"],
  frontend: ["frontend"],
  automation: ["automation"],
  "automacao": ["automation"],
  security: ["security"],
  "seguranca": ["security"],
  ai: ["ai"],
  "inteligencia artificial": ["ai"],
};

// Strips Unicode combining diacritical marks (U+0300-U+036F) left behind by
// NFD normalization, so "automação" and "automacao" match the same way.
const DIACRITICS_PATTERN = "[̀-ͯ]";
const DIACRITICS = new RegExp(DIACRITICS_PATTERN, "g");

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(DIACRITICS, "").trim();
}

function matchedTags(query: string): Set<ProjectTag> {
  const tags = new Set<ProjectTag>();
  for (const [keyword, mapped] of Object.entries(KEYWORD_TAGS)) {
    if (query.includes(normalize(keyword))) mapped.forEach((t) => tags.add(t));
  }
  return tags;
}

export function projectHref(id: string): string {
  return SECTION_HREF[id] ?? "#featured-case";
}

export function searchPortfolio(rawQuery: string, limit = 5): SearchResult[] {
  const query = normalize(rawQuery);
  if (!query) return [];

  const tags = matchedTags(query);
  const results: SearchResult[] = [];

  for (const project of projects) {
    if (project.status !== "verified") continue;
    let score = 0;
    const title = normalize(project.title);
    const tagline = normalize(project.tagline);

    if (title.includes(query)) score += 5;
    if (tagline.includes(query)) score += 1;
    for (const tag of project.tags) {
      if (tags.has(tag)) score += 3;
      if (normalize(tag).includes(query)) score += 2;
    }

    if (score > 0) {
      results.push({
        id: project.id,
        type: "project",
        title: project.title,
        description: project.tagline,
        href: projectHref(project.id),
        score,
      });
    }
  }

  for (const stage of experienceStages) {
    for (const entry of stage.entries) {
      const haystack = normalize(`${entry.role} ${entry.client ?? ""} ${entry.note} ${stage.label}`);
      let score = 0;
      if (haystack.includes(query)) score += 2;
      for (const tag of tags) {
        if (haystack.includes(normalize(tag))) score += 1;
      }
      if (score > 0) {
        results.push({
          id: `${stage.id}-${entry.client ?? entry.role}`,
          type: "experience",
          title: entry.client ?? entry.role,
          description: entry.note,
          href: "#experience",
          score,
        });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
