import { Hero } from "@/components/hero/Hero";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CasesSection } from "@/components/cases/CasesSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main>
        <Hero />
        <CasesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}