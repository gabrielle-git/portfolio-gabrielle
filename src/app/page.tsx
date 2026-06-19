import { Hero } from "@/components/hero/Hero";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { CasesSection } from "@/components/cases/CasesSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main>
        <Hero />
        <SkillsSection />
        <CasesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}