"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { catCare } from "@/content/projects";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import { CatCareInspect } from "./CatCareInspect";
import { CatCareVisual } from "./CatCareVisual";
import styles from "./FeaturedCase.module.css";

type Mode = "visual" | "inspect";

/**
 * Visual ↔ Inspect — the portfolio's signature interaction.
 *
 * Both modes render the *same* case, from two lenses: Visual is the product,
 * Inspect is the engineering behind it. Both panels are always mounted,
 * stacked in the same grid cell, and cross-fade/flip via `animate` driven by
 * `mode` — deliberately NOT AnimatePresence's mount/unmount + exit-then-enter
 * ("mode=wait") pattern, which was tried first and found to hang: framer-motion
 * never resolved the exit animation in this app's setup, so the outgoing
 * panel got stuck on screen forever while the toggle buttons still updated
 * correctly (verified directly in DOM — aria-selected flipped, panel content
 * didn't). Driving `animate` on two permanently-mounted elements sidesteps
 * that failure mode entirely and is the standard, more reliable pattern for
 * a two-state toggle transition.
 *
 * The inactive panel is marked `inert` so it's unreachable by keyboard/screen
 * reader while hidden. With prefers-reduced-motion, transform/duration are
 * dropped — the content still swaps instantly and correctly.
 */
export function FeaturedCase() {
  const [mode, setMode] = useState<Mode>("visual");
  const prefersReducedMotion = useReducedMotion();
  const tabsId = useId();

  return (
    <section className={styles.section} id="featured-case">
      <div className={styles.head}>
        <div>
          <span className={styles.eyebrow}>{catCare.eyebrow}</span>
          <h2 className={styles.title}>{catCare.title}</h2>
          <p className={styles.tagline}>{catCare.tagline}</p>
        </div>

        <div className={styles.toggle} role="tablist" aria-label={`${catCare.title} — modo de visualização`}>
          <button
            type="button"
            role="tab"
            id={`${tabsId}-visual`}
            aria-selected={mode === "visual"}
            aria-controls={`${tabsId}-panel-visual`}
            className={`${styles.toggleBtn} ${mode === "visual" ? styles.toggleBtnActive : ""}`}
            onClick={() => setMode("visual")}
          >
            VISUAL
          </button>
          <button
            type="button"
            role="tab"
            id={`${tabsId}-inspect`}
            aria-selected={mode === "inspect"}
            aria-controls={`${tabsId}-panel-inspect`}
            className={`${styles.toggleBtn} ${mode === "inspect" ? styles.toggleBtnActive : ""}`}
            onClick={() => setMode("inspect")}
          >
            INSPECT
          </button>
        </div>
      </div>

      <div className={styles.stage}>
        {(["visual", "inspect"] as const).map((panelMode) => {
          const active = mode === panelMode;
          return (
            <motion.div
              key={panelMode}
              id={`${tabsId}-panel-${panelMode}`}
              role="tabpanel"
              aria-labelledby={`${tabsId}-${panelMode}`}
              aria-hidden={!active}
              inert={!active}
              className={styles.panel}
              animate={
                prefersReducedMotion
                  ? { opacity: active ? 1 : 0 }
                  : {
                      opacity: active ? 1 : 0,
                      rotateX: active ? 0 : panelMode === "visual" ? 8 : -8,
                      y: active ? 0 : panelMode === "visual" ? -10 : 10,
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
              }
              style={{ zIndex: active ? 1 : 0 }}
            >
              {panelMode === "visual" ? <CatCareVisual /> : <CatCareInspect />}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
