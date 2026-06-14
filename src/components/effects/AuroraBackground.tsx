export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Glows estáticos (gradientes — sem blur, sem animação) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 38% at 18% 12%, rgba(139,92,246,0.16), transparent 62%)," +
            "radial-gradient(42% 38% at 86% 88%, rgba(34,211,238,0.08), transparent 62%)," +
            "radial-gradient(60% 50% at 50% 45%, rgba(109,40,217,0.06), transparent 72%)",
        }}
      />

      {/* Grão */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vinheta */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 40%, transparent 58%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}