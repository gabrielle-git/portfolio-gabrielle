import { catCare, catCareVisual } from "@/content/projects";
import styles from "./CatCareVisual.module.css";

/**
 * A convincing representation of the real CatCare home screen, not a clone
 * of the whole app. Content (pet names/weights, copy) matches the approved
 * Figma frame exactly — that content was authored by the project owner as
 * part of the design, not invented here. Only verified features are implied
 * (multi-pet, health, neonatal, agenda, weight — all confirmed in
 * docs/V3-MIGRATION-PLAN.md section 3).
 */
export function CatCareVisual() {
  const v = catCareVisual;

  return (
    <div className={styles.visual}>
      <div className={styles.homeCard}>
        <span className={styles.homeLabel}>{v.homeLabel}</span>
        <p className={styles.greeting}>{v.greeting}</p>
        <p className={styles.subheading}>{v.subheading}</p>

        <div className={styles.petRow}>
          {v.pets.map((pet) => (
            <div key={pet.name} className={styles.petCard}>
              <span className={styles.petAvatar} aria-hidden="true" />
              <span className={styles.petName}>{pet.name}</span>
              <span className={styles.petMeta}>{pet.meta}</span>
              <span className={styles.petMetric}>{pet.metric}</span>
            </div>
          ))}
        </div>

        <div className={styles.miniGrid}>
          <div className={styles.miniCard}>
            <span className={styles.miniLabel}>{v.nextCare.label}</span>
            <p className={styles.nextCareTitle}>{v.nextCare.title}</p>
            <span className={styles.nextCareWhen}>{v.nextCare.when}</span>
          </div>
          <div className={styles.miniCard}>
            <span className={styles.miniLabel}>{v.weightPanel.label}</span>
            <svg viewBox="0 0 120 32" className={styles.sparkline} aria-hidden="true">
              <polyline
                points="0,24 20,20 40,22 60,12 80,16 100,6 120,10"
                fill="none"
                stroke="var(--v3-purple)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.side}>
        <div>
          <span className={styles.whyLabel}>{v.whyItExists.label}</span>
          <p className={styles.whyTitle}>{v.whyItExists.title}</p>
          <p className={styles.whyBody}>{v.whyItExists.body}</p>
        </div>

        <div className={styles.linkRow}>
          {catCare.links.live ? (
            <a href={catCare.links.live} target="_blank" rel="noreferrer" className={`${styles.linkBtn} ${styles.linkPrimary}`}>
              {v.cta.live}
            </a>
          ) : null}
          {catCare.links.repo ? (
            <a href={catCare.links.repo} target="_blank" rel="noreferrer" className={`${styles.linkBtn} ${styles.linkSecondary}`}>
              {v.cta.source}
            </a>
          ) : null}
        </div>

        <p className={styles.hint}>
          <span className={styles.hintLabel}>{v.hint.label}</span>
          {v.hint.body}
        </p>
      </div>
    </div>
  );
}
