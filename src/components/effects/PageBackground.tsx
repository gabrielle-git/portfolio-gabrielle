"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
}

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.4 + 0.3,
      opacity: Math.random() * 0.5 + 0.15,
      twinkleSpeed: Math.random() * 1.5 + 0.5,
      twinkleOffset: Math.random() * Math.PI * 2,
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 0.08 + 0.02,
      driftRadius: Math.random() * 18 + 4,
    }));

    let time = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      for (const star of stars) {
        const twinkle = 0.55 + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.45;
        const dx = Math.cos(star.driftAngle + time * star.driftSpeed) * star.driftRadius;
        const dy = Math.sin(star.driftAngle + time * star.driftSpeed * 0.7) * star.driftRadius * 0.6;

        ctx.beginPath();
        ctx.arc(star.x + dx, star.y + dy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 181, 253, ${star.opacity * twinkle})`;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Starfield animado */}
      <StarField />

      {/* Blob 1 — roxo superior esquerdo */}
      <div
        className="blob-1 absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: -180,
          left: -120,
          background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
          filter: "blur(72px)",
          willChange: "transform",
          animation: "blobFloat1 22s ease-in-out infinite",
        }}
      />

      {/* Blob 2 — ciano inferior direito */}
      <div
        className="blob-2 absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          bottom: "15%",
          right: -80,
          background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
          animation: "blobFloat2 28s ease-in-out infinite",
        }}
      />

      {/* Blob 3 — roxo escuro centro-baixo */}
      <div
        className="blob-3 absolute rounded-full"
        style={{
          width: 640,
          height: 640,
          top: "55%",
          left: "28%",
          background: "radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 70%)",
          filter: "blur(90px)",
          willChange: "transform",
          animation: "blobFloat3 19s ease-in-out infinite",
        }}
      />

      {/* Blob 4 — roxo claro top-right para equilibrar */}
      <div
        className="blob-4 absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: "8%",
          right: "10%",
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
          animation: "blobFloat4 24s ease-in-out infinite",
        }}
      />

      {/* Grão sutil */}
      <div
        className="absolute inset-0 opacity-[0.032] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
