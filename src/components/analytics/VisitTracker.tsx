"use client";

import { useEffect } from "react";

/**
 * Rastreia a visita sem nada na tela: mede quanto tempo a pessoa ficou e
 * envia pra /api/visita quando ela sai (ou troca de aba). Usa sendBeacon,
 * que é confiável mesmo com a aba fechando. Envia só uma vez por sessão.
 */
export function VisitTracker() {
  useEffect(() => {
    const start = Date.now();
    let enviado = false;

    const enviar = () => {
      if (enviado) return;
      enviado = true;

      const payload = JSON.stringify({
        duracao_segundos: Math.round((Date.now() - start) / 1000),
        fuso: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || "",
      });

      try {
        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon("/api/visita", blob);
        } else {
          fetch("/api/visita", {
            method: "POST",
            body: payload,
            keepalive: true,
            headers: { "Content-Type": "application/json" },
          });
        }
      } catch {
        /* ignora */
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") enviar();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", enviar);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", enviar);
    };
  }, []);

  return null;
}