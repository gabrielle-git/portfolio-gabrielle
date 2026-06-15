import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const MEU_EMAIL = "gabrielle.campelo.dev@gmail.com";

function fmt(s: number | null): string {
  if (s == null) return "—";
  const m = Math.floor(s / 60);
  const seg = s % 60;
  return m > 0 ? `${m}m ${seg}s` : `${seg}s`;
}

export async function GET(req: Request) {
  // Protege o cron: só executa com o segredo certo (o Vercel manda no header).
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!url || !serviceKey || !resendKey) {
    return Response.json({ ok: false, motivo: "faltam variáveis de ambiente" });
  }

  const admin = createClient(url, serviceKey);
  const desde = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await admin
    .from("visitas")
    .select("created_at, duracao_segundos, fuso, referrer")
    .gte("created_at", desde)
    .order("created_at", { ascending: false });

  if (error) return Response.json({ ok: false, error: error.message });

  const visitas = data ?? [];
  const total = visitas.length;

  // Sem visita = sem email (não enche o inbox à toa).
  if (total === 0) {
    return Response.json({ ok: true, total: 0, enviado: false });
  }

  const comTempo = visitas.filter(
    (v) => typeof v.duracao_segundos === "number"
  ) as { duracao_segundos: number }[];
  const soma = comTempo.reduce((acc, v) => acc + v.duracao_segundos, 0);
  const media = comTempo.length ? Math.round(soma / comTempo.length) : 0;

  const linhas = visitas
    .map((v) => {
      const hora = new Date(v.created_at).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });
      return `<tr>
        <td style="padding:6px 10px;border-bottom:1px solid #ececec">${hora}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #ececec">${fmt(
          v.duracao_segundos as number | null
        )}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #ececec">${
          v.fuso ?? "—"
        }</td>
        <td style="padding:6px 10px;border-bottom:1px solid #ececec">${
          v.referrer || "acesso direto"
        }</td>
      </tr>`;
    })
    .join("");

  const html = `
    <div style="font-family:sans-serif;color:#1a1a1a;max-width:640px">
      <h2 style="margin:0 0 4px">Resumo de visitas · últimas 24h</h2>
      <p style="color:#666;margin:0 0 16px">Portfólio · Gabrielle Campelo</p>
      <div style="display:flex;gap:24px;margin-bottom:20px">
        <div><div style="font-size:28px;font-weight:700">${total}</div>
          <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px">visitas</div></div>
        <div><div style="font-size:28px;font-weight:700">${fmt(media)}</div>
          <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px">tempo médio</div></div>
      </div>
      <table style="border-collapse:collapse;font-size:13px;width:100%">
        <tr>
          <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #333">Quando (Brasília)</th>
          <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #333">Tempo</th>
          <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #333">Região</th>
          <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #333">Veio de</th>
        </tr>
        ${linhas}
      </table>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfólio <onboarding@resend.dev>",
      to: MEU_EMAIL,
      subject: `📊 ${total} visita(s) nas últimas 24h · tempo médio ${fmt(media)}`,
      html,
    }),
  });

  return Response.json({ ok: true, total, media });
}