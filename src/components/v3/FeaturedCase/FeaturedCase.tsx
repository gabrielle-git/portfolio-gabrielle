"use client";

import { useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { catCare } from "@/content/projects";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import { CatCareInspect } from "./CatCareInspect";
import { CatCareVisual } from "./CatCareVisual";
import styles from "./FeaturedCase.module.css";

type Mode = "visual" | "inspect";

const TABS: { id: Mode; label: string }[] = [
  { id: "visual", label: "VISUAL" },
  { id: "inspect", label: "INSPECT" },
];

/**
 * Visual ↔ Inspect — the portfolio's signature interaction.
 *
 * Correction pass (Fase 1.1): the toggle is now plain text with an
 * underline on the active tab (matching the current Figma), not pill
 * buttons. The transition dropped the rotateX/"card flip" feeling — that
 * read as spectacle, not "the same system seen through a different lens".
 * It's now a controlled crossfade with a small vertical shift only.
 *
 * Both panels stay permanently mounted, stacked in the same grid cell,
 * animated via `animate` (not AnimatePresence's mount/unmount + exit-then-
 * enter) — that approach was tried first and found to hang: framer-motion
 * never resolved the exit animation in this app's setup, leaving the
 * outgoing panel stuck on screen while the toggle state itself updated
 * correctly. Driving `animate` on two permanently-mounted elements
 * sidesteps that failure mode and is the more reliable pattern here.
 *
 * Full ARIA tabs keyboard pattern: ArrowLeft/ArrowRight/Home/End move focus
 * and activate (roving tabindex), not just click.
 */
export function FeaturedCase() {
  const [mode, setMode] = useState<Mode>("visual");
  const prefersReducedMotion = useReducedMotion();
  const tabsId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activate = (index: number) => {
    const tab = TABS[index];
    setMode(tab.id);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        activate((index + 1) % TABS.length);
        break;
      case "ArrowLeft":
        event.preventDefault();
        activate((index - 1 + TABS.length) % TABS.length);
        break;
      case "Home":
        event.preventDefault();
        activate(0);
        break;
      case "End":
        event.preventDefault();
        activate(TABS.length - 1);
        break;
    }
  };

  return (
    <section className={styles.section} id="featured-case">
      <div className={styles.head}>
        <div>
          <span className={styles.eyebrow}>{catCare.eyebrow}</span>
          <h2 className={styles.title}>{catCare.title}</h2>
          <p className={styles.tagline}>{catCare.tagline}</p>
        </div>

        <div className={styles.toggle} role="tablist" aria-label={`${catCare.title} — modo de visualização`}>
          {TABS.map((tab, index) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${tabsId}-${tab.id}`}
                aria-selected={active}
                aria-controls={`${tabsId}-panel-${tab.id}`}
                tabIndex={active ? 0 : -1}
                className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                onClick={() => setMode(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.stage}>
        {TABS.map((tab) => {
          const active = mode === tab.id;
          return (
            <motion.div
              key={tab.id}
              id={`${tabsId}-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`${tabsId}-${tab.id}`}
              aria-hidden={!active}
              inert={!active}
              className={styles.panel}
              animate={
                prefersReducedMotion
                  ? { opacity: active ? 1 : 0 }
                  : { opacity: active ? 1 : 0, y: active ? 0 : 8 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
              }
              style={{ zIndex: active ? 1 : 0 }}
            >
              {tab.id === "visual" ? <CatCareVisual /> : <CatCareInspect />}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
