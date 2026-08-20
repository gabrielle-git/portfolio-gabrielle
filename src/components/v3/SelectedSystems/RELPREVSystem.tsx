"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { relprev, relprevInspect, relprevStates, type RelprevState } from "@/content/projects";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import shared from "./shared.module.css";
import styles from "./RELPREVSystem.module.css";

const DOT_CLASS: Record<RelprevState, string> = {
  online: "dotOnline",
  offline: "dotOffline",
  restore: "dotRestore",
};

/**
 * RELPREV — offline-first resilience. Distinct from IML (pipeline) and
 * Registro (relationship graph): a live state toggle. Clicking GO OFFLINE
 * actually changes the panel's state, not a passive diagram — the point is
 * to feel the system keep operating, not read about it.
 */
export function RELPREVSystem() {
  const [state, setState] = useState<RelprevState>("online");
  const prefersReducedMotion = useReducedMotion();
  const current = relprevStates.find((s) => s.id === state) ?? relprevStates[0];

  return (
    <div className={shared.system} id="relprev">
      <div className={shared.head}>
        <span className={shared.eyebrow}>OFFLINE-FIRST / RESILIENCE</span>
        <h3 className={shared.title}>{relprev.title}</h3>
        <p className={shared.tagline}>{relprev.tagline}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.statusPanel}>
          <div className={styles.statusRow}>
            <span className={`${styles.dot} ${styles[DOT_CLASS[state]]}`} aria-hidden="true" />
            <span className={styles.statusLabel}>{current.label}</span>
          </div>

          <motion.div
            key={state}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
          >
            <p className={styles.statusTitle}>{current.title}</p>
            <p className={styles.statusDetail}>{current.detail}</p>
          </motion.div>

          <div className={styles.controls} role="group" aria-label="Simular estado de conexão do RELPREV">
            {relprevStates.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`${styles.controlBtn} ${state === s.id ? styles.controlActive : ""}`}
                aria-pressed={state === s.id}
                onClick={() => setState(s.id)}
              >
                {s.id === "offline" ? "GO OFFLINE" : s.id === "restore" ? "RECONNECT / RESTORE" : "GO ONLINE"}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.inspect}>
          <div className={styles.inspectFlow}>
            {relprevInspect.flow.map((step) => (
              <div key={step.id} className={styles.inspectStep}>
                <span className={styles.inspectLabel}>{step.label}</span>
                <span className={styles.inspectDetail}>{step.detail}</span>
              </div>
            ))}
          </div>
          <div className={styles.factsRow}>
            {relprevInspect.facts.map((fact) => (
              <span key={fact} className={styles.fact}>
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
