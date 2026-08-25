"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { iml, imlInspect, imlMetric, imlPipeline } from "@/content/projects";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import shared from "./shared.module.css";
import styles from "./IMLSystem.module.css";

/**
 * IML — pipeline. Distinct from RELPREV (state toggle) and Registro
 * (relationship graph): a document visibly moving through deterministic
 * stages. Reacts to click/focus (select a stage, see what it does), not to
 * an auto-looping animation. "Engineering notes" is a click-to-reveal, not
 * a tab system — kept different from CatCare's Visual/Inspect on purpose.
 */
export function IMLSystem() {
  const [activeStage, setActiveStage] = useState(imlPipeline[0].id);
  const [notesOpen, setNotesOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const active = imlPipeline.find((s) => s.id === activeStage) ?? imlPipeline[0];

  return (
    <div className={shared.system} id="iml">
      <div className={shared.head}>
        <span className={shared.eyebrow}>PYTHON AUTOMATION / DOCUMENT PIPELINE</span>
        <h3 className={shared.title}>{iml.title}</h3>
        <p className={shared.tagline}>{iml.tagline}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.metricRow}>
          <span className={shared.eyebrow}>{imlMetric.label}</span>
          <div className={styles.metricBlocks}>
            <div className={styles.metricBlock}>
              <span className={styles.metricValue}>{imlMetric.before.value}</span>
              <span className={styles.metricDetail}>{imlMetric.before.detail}</span>
            </div>
            <span className={styles.metricLine} aria-hidden="true" />
            <div className={styles.metricBlock}>
              <span className={styles.metricValue}>{imlMetric.after.value}</span>
              <span className={styles.metricDetail}>{imlMetric.after.detail}</span>
            </div>
          </div>
          <span className={styles.metricNote}>{imlMetric.note}</span>
        </div>

        <div className={styles.pipeline} role="tablist" aria-label="Etapas do pipeline IML">
          {imlPipeline.map((stage, index) => (
            <Fragment key={stage.id}>
              <button
                type="button"
                role="tab"
                aria-selected={activeStage === stage.id}
                aria-controls="iml-stage-detail"
                className={`${styles.stageBtn} ${activeStage === stage.id ? styles.stageActive : ""} ${
                  index < imlPipeline.length - 1 ? styles.stageConnected : ""
                }`}
                onClick={() => setActiveStage(stage.id)}
              >
                {stage.label}
              </button>
            </Fragment>
          ))}
        </div>

        <motion.div
          id="iml-stage-detail"
          role="tabpanel"
          className={styles.detail}
          key={active.id}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
        >
          {active.detail}
        </motion.div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={notesOpen}
          aria-controls="iml-engineering-notes"
          onClick={() => setNotesOpen((v) => !v)}
        >
          {notesOpen ? "HIDE ENGINEERING NOTES" : "SHOW ENGINEERING NOTES"}
        </button>

        {notesOpen ? (
          <motion.div
            id="iml-engineering-notes"
            className={styles.notes}
            initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}
          >
            <ul className={styles.notesList}>
              {imlInspect.reveals.map((item) => (
                <li key={item.id} className={styles.notesItem}>
                  <span className={styles.notesLabel}>{item.label}</span>
                  <span className={styles.notesDetail}>{item.detail}</span>
                </li>
              ))}
            </ul>
            <div className={styles.codeBlock}>
              <span className={styles.codeSource}>{imlInspect.codeSample.source}</span>
              <pre className={styles.codePre}>
                <code>{imlInspect.codeSample.code}</code>
              </pre>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
