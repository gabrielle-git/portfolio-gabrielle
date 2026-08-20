"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import styles from "./Hero.module.css";

/**
 * Editorial hero — correction pass (Fase 1.1).
 *
 * Deliberately removed from the first pass: decorative blobs/glow, the
 * status pill, the "01 / human" tag, the build/test/ship rail, and the
 * floating backend-first/product-minded badges. Those read as generic
 * AI-portfolio template decoration; the current Figma (node 8:2) drops all
 * of them in favor of a flat, editorial frame. See
 * docs/V3-MIGRATION-PLAN.md for the full before/after.
 *
 * Fase 1.2: "ASK MY PORTFOLIO" is removed from the composition entirely
 * (not just inert) — an unbuilt feature shouldn't occupy a CTA slot at all.
 * It comes back once Ask My Portfolio ships. Vertical space after the CTA
 * row is deliberately tight so the Featured Case starts entering the first
 * viewport on common desktop heights.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className={styles.hero} id="hero">
      <motion.div className={styles.grid} {...reveal}>
        <div className={styles.textCol}>
          <span className={styles.availability}>{profile.availability}</span>

          <h1 className={styles.name}>
            {profile.firstName}
            <br />
            <span className={styles.nameAccent}>{profile.lastName}</span>
          </h1>

          <p className={styles.role}>{profile.role}</p>
          <p className={styles.statement}>{profile.statement}</p>
          <p className={styles.subStatement}>{profile.subStatement}</p>

          <div className={styles.ctaRow}>
            <a href="#featured-case" className={styles.ctaPrimary}>
              {profile.cta.exploreSystems}
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaGhost}
            >
              {profile.cta.github}
            </a>
          </div>
        </div>

        <div className={styles.photoCol}>
          <div className={styles.photoFrame}>
            <span className={styles.photoLabel}>{profile.photoPlaceholder.label}</span>
            <span className={styles.photoHint}>{profile.photoPlaceholder.hint}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
