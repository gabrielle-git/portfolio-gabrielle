import { Fraunces } from "next/font/google";
import { CommandPaletteProvider } from "@/components/v3/CommandPalette/CommandPaletteContext";
import { CommandPalette } from "@/components/v3/CommandPalette/CommandPalette";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal"],
});

/**
 * Route-scoped layout for /v3 only — does not touch the shared root layout.
 * Loads an editorial serif (Fraunces) so V3 has typographic contrast instead
 * of Syne carrying every display role alone.
 *
 * CommandPaletteProvider/CommandPalette live here (not in page.tsx) so the
 * palette is reachable from anywhere on /v3 — Header's ⌘K trigger and
 * Under the Hood's "OPEN COMMAND MENU" link both call useCommandPalette()
 * from wherever they are in the tree.
 */
export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={fraunces.variable}>
      <CommandPaletteProvider>
        {children}
        <CommandPalette />
      </CommandPaletteProvider>
    </div>
  );
}
