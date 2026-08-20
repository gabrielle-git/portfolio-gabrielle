import { profile } from "@/content/profile";
import styles from "./Header.module.css";

/**
 * V3 header. The ⌘K badge is visual-only in Fase 1 — Command Palette
 * behavior is explicitly out of scope (see docs/V3-MIGRATION-PLAN.md 13-B).
 * It's a non-interactive <span>, not a dead button, so it doesn't announce
 * itself as focusable/actionable to keyboard or screen-reader users yet.
 */
export function Header() {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.eyebrow}>
        {profile.eyebrow}
      </a>
      <nav aria-label="Principal">
        <ul className={styles.nav}>
          {profile.nav.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className={styles.navLink}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className={styles.kbd} title="Command Palette — em breve" aria-hidden="true">
        ⌘K
      </span>
    </header>
  );
}
