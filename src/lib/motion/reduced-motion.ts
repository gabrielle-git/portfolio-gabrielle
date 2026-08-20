"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Single entry point for prefers-reduced-motion across V3 components.
 *
 * Re-exports framer-motion's hook (already proven correct in
 * src/components/cases/ArchitectureDiagram.tsx, the one place in the legacy
 * codebase that respects the preference) so every new V3 component imports
 * from one place instead of re-implementing a matchMedia listener.
 */
export const useReducedMotion = useFramerReducedMotion;

/** Picks between a full and a reduced transition based on user preference. */
export function motionSafe<T>(reduced: T, full: T, prefersReduced: boolean | null): T {
  return prefersReduced ? reduced : full;
}
