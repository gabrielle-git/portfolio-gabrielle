"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import styles from "./Hero.module.css";

const railSteps = ["build", "test", "ship"];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const rise = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.decor} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobLavender}`} />
        <span className={`${styles.blob} ${styles.blobBlue}`} />
        <span className={`${styles.blob} ${styles.blobBlush}`} />
      </div>

      <div className={styles.grid}>
        <motion.div className={styles.textCol} {...rise(0)}>
          <span className={styles.availability}>{profile.availability}</span>

          <h1 className={styles.name}>
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>

          <p className={styles.role}>{profile.role}</p>
          <p className={styles.statement}>{profile.statement}</p>
          <p className={styles.subStatement}>{profile.subStatement}</p>

          <div className={styles.ctaRow}>
            <a href="#featured-case" className={styles.ctaPrimary}>
              {profile.cta.exploreSystems}
            </a>
            <a href="#ask-my-portfolio" className={styles.ctaSecondary}>
              {profile.cta.askPortfolio}
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaSecondary}
            >
              {profile.cta.github}
            </a>
          </div>
        </motion.div>

        <motion.div className={styles.photoCol} {...rise(0.15)}>
          <div className={styles.photoFrame}>
            <div className={styles.rail} aria-hidden="true">
              {railSteps.map((step) => (
                <span key={step} className={styles.railStep}>
                  {step}
                </span>
              ))}
            </div>

            <span className={styles.tagPill}>01 / human</span>

            <div className={styles.photoPlaceholder}>
              <span className={styles.photoLabel}>{profile.photoPlaceholder.label}</span>
              <span className={styles.photoHint}>{profile.photoPlaceholder.hint}</span>
            </div>

            <span className={`${styles.floatBadge} ${styles.floatBadgeTop}`}>
              {profile.badges[0]}
            </span>
            <span className={`${styles.floatBadge} ${styles.floatBadgeBottom}`}>
              {profile.badges[1]}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
