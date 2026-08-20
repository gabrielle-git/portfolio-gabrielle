"use client";

import { profile } from "@/content/profile";
import { useCommandPalette } from "@/components/v3/CommandPalette/CommandPaletteContext";
import styles from "./Header.module.css";

/**
 * V3 header. PROJECTS/EXPERIENCE/ABOUT are now real anchors — those
 * sections exist as of the Sprint V3 build (they were inert placeholders
 * before that). The ⌘K control now actually opens the Command Palette.
 */
export function Header() {
  const { setOpen } = useCommandPalette();

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
            <a href="#experience" className={styles.navLink}>
              EXPERIENCE
            </a>
          </li>
          <li>
            <a href="#about" className={styles.navLink}>
              ABOUT
            </a>
          </li>
        </ul>
      </nav>
      <button type="button" className={styles.kbd} onClick={() => setOpen(true)} aria-label="Abrir command palette">
        ⌘K
      </button>
    </header>
  );
}
