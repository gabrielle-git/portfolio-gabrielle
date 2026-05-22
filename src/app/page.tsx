import { Hero } from "@/components/hero/Hero";
import { SmoothScroll } from "@/components/effects/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main>
        <Hero />
      </main>
    </>
  );
}