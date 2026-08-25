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
  ia: ["ai"],
  "inteligencia artificial": ["ai"],
  // No project/experience entry is explicitly labeled "DevOps" (no such
  // claim exists to make) — this maps to infra/operations-adjacent tags
  // (automation, resilience, security) as the closest honest proximity,
  // not an invented specialization.
  devops: ["automation", "offline-first", "security"],
};

// Strips Unicode combining diacritical marks (U+0300-U+036F) left behind by
// NFD normalization, so "automação" and "automacao" match the same way.
const DIACRITICS_PATTERN = "[̀-ͯ]";
const DIACRITICS = new RegExp(DIACRITICS_PATTERN, "g");

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(DIACRITICS, "").trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Whole-word containment check. Plain `.includes()` on short keywords/tags
 * (e.g. "ai") false-matches inside unrelated words — "quAIs", "operacionAIs"
 * both contain "ai" as bare characters. Found via a real test: the query
 * "Quais projetos usam Python?" was pulling in an unrelated RELPREV
 * experience entry only because "operacionais" contains "ai". `\b` isn't
 * reliable across accented/Unicode word chars, so boundaries are checked
 * manually against non-alphanumeric neighbors instead.
 */
function includesWholeWord(haystack: string, needle: string): boolean {
  if (!needle) return false;
  const pattern = new RegExp(`(?:^|[^\\p{L}\\p{N}])${escapeRegExp(needle)}(?:$|[^\\p{L}\\p{N}])`, "u");
  return pattern.test(haystack);
}

function matchedTags(query: string): Set<ProjectTag> {
  const tags = new Set<ProjectTag>();
  for (const [keyword, mapped] of Object.entries(KEYWORD_TAGS)) {
    const needle = normalize(keyword);
    // Multi-word keywords ("row level security") are already unambiguous;
    // only single, short tokens need the stricter whole-word check.
    const matches = needle.includes(" ") ? query.includes(needle) : includesWholeWord(query, needle);
    if (matches) mapped.forEach((t) => tags.add(t));
  }
  return tags;
}

/**
 * All KEYWORD_TAGS keywords (Portuguese included — "ia", "automacao",
 * "seguranca"...) that map to at least one of the given tags. Experience
 * entries are free Portuguese text, not tagged data — checking them against
 * the bare English tag identifier ("ai", "auth") mostly never matches
 * Portuguese content ("IA generativa" doesn't contain "ai"; "autenticação"
 * doesn't contain "auth"). Checking against every synonym that resolves to
 * the matched tag(s) instead is what actually finds those mentions.
 */
function keywordsForTags(tagSet: Set<ProjectTag>): string[] {
  const keywords: string[] = [];
  for (const [keyword, mapped] of Object.entries(KEYWORD_TAGS)) {
    if (mapped.some((t) => tagSet.has(t))) keywords.push(normalize(keyword));
  }
  return keywords;
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

  const matchedKeywords = keywordsForTags(tags);

  for (const stage of experienceStages) {
    for (const entry of stage.entries) {
      const haystack = normalize(`${entry.contribution} ${entry.context ?? ""} ${entry.note} ${stage.label}`);
      let score = 0;
      if (haystack.includes(query)) score += 2;
      for (const keyword of matchedKeywords) {
        const found = keyword.includes(" ") ? haystack.includes(keyword) : includesWholeWord(haystack, keyword);
        if (found) score += 1;
      }
      if (score > 0) {
        // Title is the contribution, not `context` — a project already
        // matched by name reads as a near-duplicate next to "Registro ·
        // projeto pessoal"; the activity description is clearly distinct.
        results.push({
          id: `${stage.id}-${entry.context ?? entry.contribution}`,
          type: "experience",
          title: entry.contribution,
          description: entry.note,
          href: "#experience",
          score,
        });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
