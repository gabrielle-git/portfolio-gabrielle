import { contact } from "@/content/contact";
import { profile } from "@/content/profile";
import styles from "./Contact.module.css";

/** Short — no big form, no fake metrics, no testimonials. Real links only. */
export function Contact() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <div className={styles.panel}>
        <div>
          <span className={styles.eyebrow}>{contact.eyebrow}</span>
          <h2 className={styles.title} id="contact-title">
            {contact.title}
          </h2>
        </div>

        <div className={styles.links}>
          <a className={styles.link} href={`mailto:${contact.email}`}>
            EMAIL
          </a>
          <a className={styles.link} href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN
          </a>
          <a className={styles.link} href={profile.links.github} target="_blank" rel="noreferrer">
            GITHUB
          </a>
          {contact.cvAvailable ? (
            <a className={styles.link} href="/cv.pdf" target="_blank" rel="noreferrer">
              CV
            </a>
          ) : (
            <span className={styles.linkInert} title="Em breve">
              CV
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
