import { CONTEXTO_GABRIELLE } from "@/lib/data/sobre-ia";

export const runtime = "nodejs";

// Modelo gratuito no OpenRouter. Pra trocar por outro gratuito:
// "google/gemini-2.0-flash-exp:free", "deepseek/deepseek-chat-v3-0324:free",
// "qwen/qwen-2.5-72b-instruct:free", etc.
const MODELO = "meta-llama/llama-3.3-70b-instruct:free";

type Msg = { role?: string; content?: string };

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

    // Conversa comeca com o usuario (descarta a saudacao inicial da IA).
    while (conversa.length && conversa[0].role !== "user") {
      conversa.shift();
    }

    if (conversa.length === 0) {
      return Response.json({
        reply: "Pode perguntar o que quiser sobre a Gabrielle! 😊",
      });
    }

    const messages = [
      { role: "system", content: CONTEXTO_GABRIELLE },
      ...conversa,
    ];

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://portfolio-gabrielle-one.vercel.app",
        "X-Title": "Portfolio Gabrielle",
      },
      body: JSON.stringify({
        model: MODELO,
        messages,
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (reply) {
      return Response.json({ reply });
    }

    // DEBUG temporario: revela o motivo se ainda falhar.
    console.error("OPENROUTER RESPONSE:", JSON.stringify(data));
    const motivo = data?.error?.message || JSON.stringify(data).slice(0, 300);
    return Response.json({ reply: `DEBUG (status ${res.status}): ${motivo}` });
  } catch (e) {
    return Response.json({ reply: `DEBUG catch: ${String(e).slice(0, 200)}` });
  }
}