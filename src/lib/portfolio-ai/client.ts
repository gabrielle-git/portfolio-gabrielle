import { buildPortfolioContext } from "./context";

// Same free-tier fallback chain as the legacy src/app/api/chat/route.ts —
// reusing the pattern, not the file (that route stays untouched and keeps
// serving the legacy TerminalPanel chat).
const MODELS = [
  "deepseek/deepseek-chat-v3-0324",
  "deepseek/deepseek-chat-v3-0324:free",
  "google/gemini-2.0-flash-exp:free",
];

const TIMEOUT_MS = 8000;

/**
 * Enriches a query via OpenRouter. Returns null on ANY failure — missing
 * key, timeout, network error, non-2xx, empty completion — so the caller
 * always has a safe local-search fallback and never has to inspect a raw
 * provider error. Nothing here (model id, status code, provider message)
 * is ever propagated to the caller; failures are logged server-side only.
 */
export async function enrichWithLLM(query: string): Promise<string | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  const messages = [
    { role: "system", content: buildPortfolioContext() },
    { role: "user", content: query.slice(0, 300) },
  ];

  for (const model of MODELS) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://portfolio-gabrielle-one.vercel.app",
          "X-Title": "Portfolio Gabrielle — Ask My Portfolio",
        },
        body: JSON.stringify({ model, messages, temperature: 0.4, max_tokens: 260 }),
      });

      if (!res.ok) {
        console.error("[portfolio-ai] provider non-2xx", model, res.status);
        continue;
      }

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (reply) return reply;
      console.error("[portfolio-ai] empty completion", model);
    } catch (error) {
      console.error("[portfolio-ai] request failed", model, error instanceof Error ? error.message : error);
    } finally {
      clearTimeout(timeout);
    }
  }

  return null;
}
