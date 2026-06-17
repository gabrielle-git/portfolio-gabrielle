import { CONTEXTO_GABRIELLE } from "@/lib/data/sobre-ia";

export const runtime = "nodejs";

// Fila de modelos gratuitos: tenta um por um ate algum responder.
// Se um estiver lotado (429), pula pro proximo.
const MODELOS = [
  "deepseek/deepseek-chat-v3-0324",
  "deepseek/deepseek-chat-v3-0324:free",
  "google/gemini-2.0-flash-exp:free",
];

type Msg = { role?: string; content?: string };
type ChatMsg = { role: string; content: string };

async function chamar(model: string, apiKey: string, messages: ChatMsg[]) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://portfolio-gabrielle-one.vercel.app",
      "X-Title": "Portfolio Gabrielle",
    },
    body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 600 }),
  });
  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();
  return { reply: reply as string | undefined, status: res.status, data };
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return Response.json({
        reply: "DEBUG: OPENROUTER_API_KEY nao encontrada no ambiente.",
      });
    }

    const body = await req.json().catch(() => ({}));
    const msgs: Msg[] = Array.isArray(body?.messages) ? body.messages : [];

    const conversa = msgs
      .slice(-12)
      .map((m) => ({
        role: m?.role === "assistant" ? "assistant" : "user",
        content: String(m?.content ?? "").slice(0, 1000),
      }))
      .filter((m) => m.content.length > 0);

    while (conversa.length && conversa[0].role !== "user") conversa.shift();

    if (conversa.length === 0) {
      return Response.json({
        reply: "Pode perguntar o que quiser sobre a Gabrielle! 😊",
      });
    }

    const messages: ChatMsg[] = [
      { role: "system", content: CONTEXTO_GABRIELLE },
      ...conversa,
    ];

    let ultimo = "todos os modelos falharam";
    for (const model of MODELOS) {
      try {
        const r = await chamar(model, apiKey, messages);
        if (r.reply) return Response.json({ reply: r.reply });
        ultimo = `status ${r.status}: ${
          r.data?.error?.message || "sem resposta"
        } (modelo ${model})`;
        console.error("OPENROUTER FAIL:", model, JSON.stringify(r.data));
      } catch (e) {
        ultimo = `rede (${model}): ${String(e).slice(0, 100)}`;
      }
    }

    return Response.json({ reply: `DEBUG: ${ultimo}` });
  } catch (e) {
    return Response.json({ reply: `DEBUG catch: ${String(e).slice(0, 200)}` });
  }
}