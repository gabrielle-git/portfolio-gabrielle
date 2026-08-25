import { contact } from "@/content/contact";
import { profile } from "@/content/profile";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a className={styles.link} href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className={styles.link} href={profile.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className={styles.link} href={`mailto:${contact.email}`}>
          Email
        </a>
      </div>
      <span className={styles.note}>This portfolio is also a project.</span>
    </footer>
  );
}
