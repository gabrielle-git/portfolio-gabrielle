"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { PageBackground } from "@/components/effects/PageBackground";
import { TerminalPanel } from "@/components/terminal/TerminalPanel";

/**
 * The legacy site (dark background, Navbar, terminal/AI panel) is preserved
 * exactly as-is — nothing here is deleted or altered (see
 * docs/V3-MIGRATION-PLAN.md "Legado"). These wrappers only decide *where*
 * they mount: everywhere except /v3, which defines its own light, editorial
 * chrome (src/components/v3/Header) per the approved Figma direction.
 *
 * Split into Start/End (rather than one component) to preserve the exact
 * DOM order from the original root layout — PageBackground+Navbar before
 * {children}, TerminalPanel after — in case paint/stacking order matters
 * anywhere in the legacy CSS.
 *
 * A pathname check here is deliberately simpler than splitting the app into
 * two root layouts (which App Router does support via route groups) —
 * Fase 1 favors the additive, low-risk option. Revisit if /v3 becomes the
 * only surface.
 */
export function LegacyChromeStart() {
  const pathname = usePathname();
  if (pathname?.startsWith("/v3")) return null;

  return (
    <>
      <PageBackground />
      <Navbar />
    </>
  );
}

export function LegacyChromeEnd() {
  const pathname = usePathname();
  if (pathname?.startsWith("/v3")) return null;

  return <TerminalPanel />;
}
