"use client";

import { useCommandPalette } from "@/components/v3/CommandPalette/CommandPaletteContext";
import { ConnectorDown } from "@/components/v3/shared/Connector";
import { underTheHood } from "@/content/underTheHood";
import { profile } from "@/content/profile";
import styles from "./UnderTheHood.module.css";

/**
 * Explains the portfolio itself — a small system map, not bento cards.
 *
 * Pre-release trim: dropped the subtitle (it just re-listed the same
 * concepts the two maps already show) and stopped rendering
 * InteractionIndex here — this section already said "this portfolio is
 * also a project" once; InteractionIndex repeated the same four concepts
 * a second time, and those interactions were already demonstrated earlier
 * on the page. The component itself is untouched, just not mounted.
 *
 * Both maps render as the same vertical chain, so both use the same down
 * connector.
 */
export function UnderTheHood() {
  const { setOpen } = useCommandPalette();

  return (
    <section className={styles.section} id="under-the-hood" aria-labelledby="uth-title">
      <div className={styles.head}>
        <span className={styles.eyebrow}>{underTheHood.eyebrow}</span>
        <h2 className={styles.title} id="uth-title">
          {underTheHood.title}
        </h2>
      </div>

      <div className={styles.maps}>
        <div className={styles.map}>
          <div className={styles.mapChain}>
            {underTheHood.contentMap.map((node, index) => (
              <div key={node.id} className={styles.mapNode}>
                <span className={styles.mapLabel}>{node.label}</span>
                <span className={styles.mapDetail}>{node.detail}</span>
                {index < underTheHood.contentMap.length - 1 ? (
                  <div className={styles.mapArrow}>
                    <ConnectorDown />
                  </div>
                ) : null}
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
                {index < underTheHood.motionMap.length - 1 ? (
                  <div className={styles.mapArrow}>
                    <ConnectorDown />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.stackLine}>
        <span className={styles.stackLabel}>{underTheHood.stackLabel}</span> {underTheHood.stack}
      </p>

      <div className={styles.linkRow}>
        <a className={styles.link} href={profile.links.github} target="_blank" rel="noreferrer">
          {underTheHood.links.viewSource}
        </a>
        <button type="button" className={styles.linkBtn} onClick={() => setOpen(true)}>
          {underTheHood.links.openCommandMenu}
        </button>
      </div>
    </section>
  );
}
