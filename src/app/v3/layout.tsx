import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal"],
});

/**
 * Route-scoped layout for /v3 only — does not touch the shared root layout.
 * Loads an editorial serif (Fraunces) so V3 has typographic contrast instead
 * of Syne carrying every display role alone (correction pass, "TIPOGRAFIA").
 * Fraunces at normal style/medium weight reads as contemporary editorial,
 * not wedding-invite or fashion-portfolio decorative.
 */
export default function V3Layout({ children }: { children: React.ReactNode }) {
  return <div className={fraunces.variable}>{children}</div>;
}
