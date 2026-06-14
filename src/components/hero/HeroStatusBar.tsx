"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Pill({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-default bg-bg-secondary/30 backdrop-blur-sm ${className}`}
    >
      <span className="text-fg-dim">{label}</span>
      {children}
    </div>
  );
}

export function HeroStatusBar() {
  // Placeholders no 1º render (evita mismatch de hidratação); preenchidos no cliente.
  const [time, setTime] = useState("--:--:--");
  const [uptime, setUptime] = useState("00:00:00");
  const [fps, setFps] = useState<number | null>(null);
  const [visitas, setVisitas] = useState<number | null>(null);

  useEffect(() => {
    // Hora local do visitante + tempo na página
    const start = Date.now();
    const clock = setInterval(() => {
      setTime(new Date().toLocaleTimeString("pt-BR", { hour12: false }));
      const el = Math.floor((Date.now() - start) / 1000);
      const hh = String(Math.floor(el / 3600)).padStart(2, "0");
      const mm = String(Math.floor((el % 3600) / 60)).padStart(2, "0");
      const ss = String(el % 60).padStart(2, "0");
      setUptime(`${hh}:${mm}:${ss}`);
    }, 1000);

    // FPS real: mede quantos frames a máquina do visitante renderiza por segundo
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      frames++;
      if (now - last >= 1000) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      clearInterval(clock);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Contador de visitas real (Supabase). Conta 1x por sessão; senão só lê.
  useEffect(() => {
    let cancel = false;
    (async () => {
      const KEY = "visita_contada";
      try {
        const jaContou =
          typeof window !== "undefined" && sessionStorage.getItem(KEY);

        if (!jaContou) {
          const inc = await supabase.rpc("increment_visitas");
          if (!inc.error && inc.data != null) {
            if (!cancel) setVisitas(Number(inc.data));
            try {
              sessionStorage.setItem(KEY, "1");
            } catch {
              /* sessionStorage indisponível */
            }
            return;
          }
        }

        const sel = await supabase
          .from("contadores")
          .select("valor")
          .eq("id", "visitas")
          .single();
        if (!sel.error && sel.data && !cancel) setVisitas(Number(sel.data.valor));
      } catch {
        /* Supabase indisponível — mantém o placeholder "—" */
      }
    })();

    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div className="flex items-center justify-between w-full text-xs font-mono tracking-widest uppercase">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-accent bg-accent/5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-accent font-semibold">online</span>
        </div>

        <Pill label="região" className="hidden md:flex">
          <span className="text-accent font-semibold normal-case">
            Águas Claras · Brasília-DF
          </span>
        </Pill>

        <Pill label="hora" className="hidden sm:flex">
          <span className="text-accent tabular-nums font-semibold">{time}</span>
        </Pill>
      </div>

      <div className="flex items-center gap-3">
        <Pill label="visitas" className="hidden md:flex">
          <span className="text-accent tabular-nums font-semibold">
            {visitas == null ? "—" : visitas.toLocaleString("pt-BR")}
          </span>
        </Pill>

        <Pill label="fps" className="hidden lg:flex">
          <span className="text-[#5eead4] tabular-nums font-semibold">
            {fps ?? "—"}
          </span>
        </Pill>

        <Pill label="na página" className="hidden lg:flex">
          <span className="text-[#22d3ee] tabular-nums font-semibold">{uptime}</span>
        </Pill>

        <Pill label="v">
          <span className="text-accent font-semibold">2.0.0</span>
        </Pill>
      </div>
    </div>
  );
}