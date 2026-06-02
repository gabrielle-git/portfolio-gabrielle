import { Hero } from "@/components/hero/Hero";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CasesSection } from "@/components/cases/CasesSection";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main>
        <Hero />
        <CasesSection />
      </main>
    </>
  );
}