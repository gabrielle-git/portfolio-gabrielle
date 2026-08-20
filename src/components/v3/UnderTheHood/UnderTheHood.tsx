"use client";

import { InteractionIndex } from "@/components/v3/InteractionIndex/InteractionIndex";
import { useCommandPalette } from "@/components/v3/CommandPalette/CommandPaletteContext";
import { underTheHood } from "@/content/underTheHood";
import { profile } from "@/content/profile";
import styles from "./UnderTheHood.module.css";

/** Explains the portfolio itself — a small system map, not bento cards. InteractionIndex (built earlier, unused until now) lives here. */
export function UnderTheHood() {
  const { setOpen } = useCommandPalette();

  return (
    <section className={styles.section} id="under-the-hood" aria-labelledby="uth-title">
      <div className={styles.head}>
        <span className={styles.eyebrow}>{underTheHood.eyebrow}</span>
        <h2 className={styles.title} id="uth-title">
          {underTheHood.title}
        </h2>
        <p className={styles.subtitle}>{underTheHood.subtitle}</p>
      </div>

      <div className={styles.maps}>
        <div className={styles.map}>
          <div className={styles.mapChain}>
            {underTheHood.contentMap.map((node, index) => (
              <div key={node.id} className={styles.mapNode}>
                <span className={styles.mapLabel}>{node.label}</span>
                <span className={styles.mapDetail}>{node.detail}</span>
                {index < underTheHood.contentMap.length - 1 ? <div className={styles.mapArrow}>↓</div> : null}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.map}>
          <div className={styles.mapChain}>
            {underTheHood.motionMap.map((node, index) => (
              <div key={node.id} className={styles.mapNode}>
                <span className={styles.mapLabel}>{node.label}</span>
                <span className={styles.mapDetail}>{node.detail}</span>
                {index < underTheHood.motionMap.length - 1 ? <div className={styles.mapArrow}>→</div> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.stackRow}>
        {underTheHood.stack.map((tech) => (
          <span key={tech} className={styles.stackItem}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.linkRow}>
        <a className={styles.link} href={profile.links.github} target="_blank" rel="noreferrer">
          {underTheHood.links.viewSource}
        </a>
        <button type="button" className={styles.linkBtn} onClick={() => setOpen(true)}>
          {underTheHood.links.openCommandMenu}
        </button>
      </div>

      <InteractionIndex />
    </section>
  );
}
