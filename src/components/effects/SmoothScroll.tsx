"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    // Corrige a tela branca ao voltar pelo navegador (bfcache):
    // quando a página é restaurada do cache, as animações do Framer Motion
    // ficam congeladas escondidas. Recarregar garante um render limpo.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", onPageShow);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}