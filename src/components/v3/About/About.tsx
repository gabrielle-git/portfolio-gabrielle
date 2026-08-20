import { about } from "@/content/about";
import styles from "./About.module.css";

export function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <div className={styles.grid}>
        <div>
          <span className={styles.eyebrow}>{about.eyebrow}</span>
          <h2 className={styles.title} id="about-title">
            {about.title}
          </h2>
          <p className={styles.intro}>{about.intro}</p>
          <p className={styles.closing}>{about.closing}</p>
        </div>

        <ul className={styles.questions}>
          {about.questions.map((question) => (
            <li key={question} className={styles.question}>
              {question}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
