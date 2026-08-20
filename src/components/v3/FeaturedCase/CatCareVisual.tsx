import { Cat } from "lucide-react";
import { catCare, catCareVisual } from "@/content/projects";
import styles from "./CatCareVisual.module.css";

/**
 * A condensed, faithful window into the real CatCare product — not an
 * invented dashboard. Card radius/shadow/border and the pet-avatar treatment
 * (rounded-square, lavender-soft, Cat icon) are copied from CatCare's own
 * src/app/globals.css and src/components/pet-avatar.tsx. Content is
 * CatCare's own verified demo dataset (see src/content/projects/catcare.ts).
 * The "Demonstração" badge matches the real app's own convention for when
 * it's showing mock data instead of a live household.
 */
function weightSparklinePoints(series: readonly number[]) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  return series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * w;
      const y = h - ((value - min) / range) * (h - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function CatCareVisual() {
  const v = catCareVisual;

  return (
    <div className={styles.visual}>
      <div className={styles.homeCard}>
        <div className={styles.homeHead}>
          <span className={styles.homeLabel}>{v.homeLabel}</span>
          <span className={styles.demoBadge}>{v.demoBadge}</span>
        </div>
        <p className={styles.greeting}>{v.greeting}</p>
        <p className={styles.subheading}>{v.subheading}</p>

        <div className={styles.petRow}>
          {v.pets.map((pet) => (
            <div key={pet.name} className={styles.petCard}>
              <span className={styles.petAvatar} aria-hidden="true">
                <Cat size={18} strokeWidth={2.2} />
              </span>
              <div className={styles.petInfo}>
                <span className={styles.petName}>{pet.name}</span>
                <span className={styles.petMeta}>
                  {pet.metric} · {pet.meta}
                </span>
              </div>
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
                points={weightSparklinePoints(v.weightSeries)}
                fill="none"
                stroke="var(--catcare-lavender-strong)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.side}>
        <p className={styles.narrativeTitle}>{v.narrative.title}</p>
        {v.narrative.beats.map((beat) => (
          <p key={beat} className={styles.narrativeBeat}>
            {beat}
          </p>
        ))}

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
      </div>
    </div>
  );
}
