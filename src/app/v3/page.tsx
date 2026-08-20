import type { Metadata } from "next";
import "@/styles/v3-tokens.css";
import { Header } from "@/components/v3/Header/Header";
import { Hero } from "@/components/v3/Hero/Hero";
import { FeaturedCase } from "@/components/v3/FeaturedCase/FeaturedCase";
import styles from "./page.module.css";

/**
 * V3 preview route — Fase 1 scope only (Header, Hero, CatCare Featured Case
 * with Visual↔Inspect). Deliberately noindex: this is a work-in-progress
 * surface, not meant to compete with / in search results while incomplete.
 * See docs/V3-MIGRATION-PLAN.md section 13-A/B.
 */
export const metadata: Metadata = {
  title: "V3 preview · Gabrielle Campelo",
  description: "Preview em construção da V3 do portfólio — não é a versão publicada.",
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return (
    <div className={`v3Root ${styles.page}`}>
      <Header />
      <main>
        <Hero />
        <FeaturedCase />
      </main>
    </div>
  );
}
