import { interactions } from "@/content/interactions";
import styles from "./InteractionIndex.module.css";

/**
 * Editorial index row — hairline-separated, not the old four rounded-corner
 * cards. Only entries with a real `href` are links; the rest are visually
 * present but inert until their section ships (see
 * src/content/interactions.ts and docs/V3-MIGRATION-PLAN.md "CTA").
 */
export function InteractionIndex() {
  return (
    <section className={styles.section} aria-labelledby="interaction-system-title">
      <span className={styles.eyebrow}>INTERACTION SYSTEM</span>
      <h2 className={styles.title} id="interaction-system-title">
        O próprio site também é um projeto.
      </h2>
      <p className={styles.subtitle}>
        Interações que ajudam a navegar, comparar e entender decisões técnicas.
      </p>

      <div className={styles.grid}>
        {interactions.map((item) => (
          <div key={item.id} className={styles.item}>
            {item.href ? (
              <a href={item.href} className={styles.itemTitle}>
                {item.title}
              </a>
            ) : (
              <span className={styles.itemTitleInert} title="Em breve">
                {item.title}
              </span>
            )}
            <span className={styles.itemSubtitle}>{item.subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
