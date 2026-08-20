"use client";

import { motion } from "framer-motion";
import { experienceIntro, experienceStages } from "@/content/experience";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import styles from "./Experience.module.css";

/**
 * Editorial timeline — not job cards. Reacts to scroll (a light reveal per
 * stage), but every stage is present in the DOM regardless of motion —
 * with prefers-reduced-motion the content just appears without the fade.
 */
export function Experience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={styles.section} id="experience" aria-labelledby="experience-title">
      <div className={styles.head}>
        <span className={styles.eyebrow}>{experienceIntro.eyebrow}</span>
        <h2 className={styles.title} id="experience-title">
          {experienceIntro.title}
        </h2>
        <p className={styles.subtitle}>{experienceIntro.subtitle}</p>
      </div>

      <div className={styles.stages}>
        {experienceStages.map((stage) => (
          <motion.div
            key={stage.id}
            className={styles.stage}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
          >
            <div className={styles.stageLabelCol}>
              <span className={styles.stageLabel}>{stage.label}</span>
              <span className={styles.stageTitle}>{stage.title}</span>
            </div>

            <div className={styles.entries}>
              {stage.entries.map((entry) => (
                <div className={styles.entry} key={`${entry.role}-${entry.period}`}>
                  <div className={styles.entryTop}>
                    <span className={styles.entryRole}>{entry.role}</span>
                    <span className={styles.entryPeriod}>{entry.period}</span>
                  </div>
                  {entry.client ? <span className={styles.entryClient}>{entry.client}</span> : null}
                  <p className={styles.entryNote}>{entry.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
