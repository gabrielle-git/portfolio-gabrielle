import { enrichWithLLM } from "@/lib/portfolio-ai/client";
import { searchPortfolio, type SearchResult } from "@/lib/search";

export const runtime = "nodejs";

interface Reference {
  title: string;
  href: string;
}

function toReferences(results: SearchResult[]): Reference[] {
  return results.map((r) => ({ title: r.title, href: r.href }));
}

function localAnswer(query: string, results: SearchResult[]): string {
  if (results.length === 0) {
    return "Não encontrei um case correspondente na busca local. Tente termos como RLS, Python, offline, Supabase, backend ou automation.";
  }
  const top = results[0];
  const rest = results.slice(1, 3);
  let answer = `${top.title} — ${top.description}`;
  if (rest.length > 0) {
    answer += ` Também relacionado: ${rest.map((r) => r.title).join(", ")}.`;
  }
  return answer;
}

/**
 * Ask My Portfolio: local search runs first and always succeeds
 * deterministically; the LLM only enriches the phrasing when reachable.
 * The client never sees a dead screen, a provider error, a model id, or a
 * stack trace — every failure path here still returns a normal 200 with a
 * usable answer built from local search.
 */
export async function POST(req: Request) {
  let query = "";
  try {
    const body = await req.json();
    query = typeof body?.query === "string" ? body.query.slice(0, 300).trim() : "";
  } catch {
    query = "";
  }

  if (!query) {
    return Response.json({
      answer: "Pergunte algo como \"qual projeto demonstra mais backend?\" ou \"onde você usou RLS?\".",
      references: [],
      source: "local" as const,
    });
  }

  const results = searchPortfolio(query);
  const references = toReferences(results);

  try {
    const enriched = await enrichWithLLM(query);
    if (enriched) {
      return Response.json({ answer: enriched, references, source: "ai" as const });
    }
  } catch (error) {
    console.error("[portfolio-ai] unexpected enrichment error", error instanceof Error ? error.message : error);
  }

  return Response.json({ answer: localAnswer(query, results), references, source: "local" as const });
}
