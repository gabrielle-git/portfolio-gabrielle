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
 * V3 preview route. Home order: Header -> Hero -> 01 Multi-pet Care
 * (Visual/Inspect) -> 02 Selected Systems (IML/RELPREV/Registro) ->
 * 03 Experience -> 04 About -> 05 Ask My Portfolio -> 06 Contact ->
 * 07 Under the Hood -> Footer. InteractionIndex exists as a component but
 * isn't rendered anywhere yet (pre-release trim — it repeated concepts
 * already demonstrated on the page).
 *
 * Metadata below is written as the real production metadata (title,
 * OpenGraph, Twitter, canonical) so it's ready when this route replaces /
 * — that hasn't happened yet, so `robots` stays noindex/nofollow in the
 * meantime. Flip only `robots` at promotion time; nothing else here should
 * need to change.
 *
 * Still not implemented (next phase): IML/RELPREV/Registro don't get a full
 * case page (`/cases/[id]`-equivalent on V3) yet — only their Home-section
 * presence.
 */
const V3_URL = "https://portfolio-gabrielle-one.vercel.app/v3";

export const metadata: Metadata = {
  title: "Gabrielle Campelo · Software Engineer",
  description:
    "Engenheira de software backend-first — sistemas, automação e segurança, com a interface pensada para quem usa.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: V3_URL,
    title: "Gabrielle Campelo · Software Engineer",
    description: "Backend-first. Product-minded.",
    siteName: "Gabrielle Campelo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabrielle Campelo · Software Engineer",
    description: "Backend-first. Product-minded.",
  },
  alternates: { canonical: V3_URL },
  icons: { icon: "/avatar.png", apple: "/avatar.png" },
  // Still a preview — set this to { index: true, follow: true } only when
  // /v3 actually replaces / as the published home page.
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
