import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// Apenas REGISTRA a visita no banco. O email agora é um resumo diário
// (rota /api/resumo-diario), pra não encher o inbox.
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));

    const duracao =
      typeof body?.duracao_segundos === "number"
        ? Math.max(0, Math.round(body.duracao_segundos))
        : null;
    const fuso = typeof body?.fuso === "string" ? body.fuso.slice(0, 80) : null;
    const referrer =
      typeof body?.referrer === "string" ? body.referrer.slice(0, 300) : null;

    // Grava usando a service_role (SÓ no servidor — nunca exposta).
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && serviceKey) {
      const admin = createClient(url, serviceKey);
      await admin
        .from("visitas")
        .insert({ duracao_segundos: duracao, fuso, referrer });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false });
  }
}