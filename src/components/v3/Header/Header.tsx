import { profile } from "@/content/profile";
import styles from "./Header.module.css";

/**
 * V3 header.
 *
 * Nav items only become links once their target section exists on the page
 * (see docs/V3-MIGRATION-PLAN.md "CTA" — no anchors to nowhere). PROJECTS
 * points at the Featured Case (real, built). EXPERIENCE/ABOUT stay as plain
 * text until those sections are built in a later phase.
 *
 * The ⌘K badge is visual-only in Fase 1 — Command Palette behavior is
 * explicitly out of scope. It's a non-interactive <span>, not a dead button.
 */
export function Header() {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.eyebrow}>
        {profile.eyebrow}
      </a>
      <nav aria-label="Principal">
        <ul className={styles.nav}>
          <li>
            <a href="#featured-case" className={styles.navLink}>
              PROJECTS
            </a>
          </li>
          <li>
            <span className={styles.navLinkInert} title="Em breve">
              EXPERIENCE
            </span>
          </li>
          <li>
            <span className={styles.navLinkInert} title="Em breve">
              ABOUT
            </span>
          </li>
        </ul>
      </nav>
      <span className={styles.kbd} title="Command Palette — em breve" aria-hidden="true">
        ⌘K
      </span>
    </header>
  );
}
