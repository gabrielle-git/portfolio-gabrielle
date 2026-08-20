import type { Metadata } from "next";
import "@/styles/v3-tokens.css";
import { Header } from "@/components/v3/Header/Header";
import { Hero } from "@/components/v3/Hero/Hero";
import { FeaturedCase } from "@/components/v3/FeaturedCase/FeaturedCase";
import { SelectedSystems } from "@/components/v3/SelectedSystems/SelectedSystems";
import { Experience } from "@/components/v3/Experience/Experience";
import { About } from "@/components/v3/About/About";
import { AskMyPortfolio } from "@/components/v3/AskMyPortfolio/AskMyPortfolio";
import { Contact } from "@/components/v3/Contact/Contact";
import { UnderTheHood } from "@/components/v3/UnderTheHood/UnderTheHood";
import { Footer } from "@/components/v3/Footer/Footer";
import styles from "./page.module.css";

/**
 * V3 preview route — Sprint V3 "complete core experience". Deliberately
 * noindex: work-in-progress surface, not meant to compete with / in search
 * results. See docs/V3-MIGRATION-PLAN.md.
 *
 * Home order: Header → Hero → 01 Multi-pet Care (Visual↔Inspect) →
 * 02 Selected Systems (IML/RELPREV/Registro) → 03 Experience → 04 About →
 * 05 Ask My Portfolio → 06 Contact → 07 Under the Hood (incl.
 * InteractionIndex, reused here rather than between Hero and projects) →
 * Footer.
 *
 * Still not implemented (next phase): nothing removed from scope here, but
 * IML/RELPREV/Registro won't get a full case page (`/cases/[id]`-equivalent
 * on V3) yet — only their Home-section presence.
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
        <SelectedSystems />
        <Experience />
        <About />
        <AskMyPortfolio />
        <Contact />
        <UnderTheHood />
      </main>
      <Footer />
    </div>
  );
}
