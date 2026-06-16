import { ImageResponse } from "next/og";

export const alt = "Gabrielle Campelo · Engenheira de Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const accent = "#a78bfa";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 78% 26%, rgba(139,92,246,0.26), transparent 55%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        {/* Cantos estilo HUD */}
        <div style={{ position: "absolute", top: 40, left: 40, width: 48, height: 48, borderLeft: `2px solid ${accent}`, borderTop: `2px solid ${accent}`, opacity: 0.55 }} />
        <div style={{ position: "absolute", top: 40, right: 40, width: 48, height: 48, borderRight: `2px solid ${accent}`, borderTop: `2px solid ${accent}`, opacity: 0.55 }} />
        <div style={{ position: "absolute", bottom: 40, left: 40, width: 48, height: 48, borderLeft: `2px solid ${accent}`, borderBottom: `2px solid ${accent}`, opacity: 0.55 }} />
        <div style={{ position: "absolute", bottom: 40, right: 40, width: 48, height: 48, borderRight: `2px solid ${accent}`, borderBottom: `2px solid ${accent}`, opacity: 0.55 }} />

        {/* Label do topo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
          <div style={{ width: 44, height: 2, backgroundColor: accent, marginRight: 14 }} />
          <div style={{ fontSize: 24, color: accent, letterSpacing: 6 }}>// PORTFÓLIO</div>
        </div>

        {/* Nome */}
        <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
          Gabrielle Campelo
        </div>

        {/* Cargo */}
        <div style={{ fontSize: 44, color: "rgba(250,250,250,0.7)", marginTop: 14 }}>
          Engenheira de Software
        </div>

        {/* Tags */}
        <div style={{ fontSize: 28, color: accent, marginTop: 30, letterSpacing: 1 }}>
          Backend · Automação · IA · Sistemas críticos
        </div>

        {/* Rodapé: status + url */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 54 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 23, color: "rgba(250,250,250,0.5)" }}>
            <div style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: "#34d399", marginRight: 12 }} />
            disponível para novos desafios
          </div>
          <div style={{ fontSize: 22, color: "rgba(250,250,250,0.4)" }}>
            portfolio-gabrielle-one.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}