import { IMLSystem } from "./IMLSystem";
import { RELPREVSystem } from "./RELPREVSystem";
import { RegistroSystem } from "./RegistroSystem";
import styles from "./SelectedSystems.module.css";

/**
 * "Selected Systems" — IML, RELPREV and Registro. Deliberately three
 * different components (pipeline / state toggle / relationship graph), not
 * one generic ProjectCard rendered three times — see Sprint V3 "linguagem
 * dos projects".
 */
export function SelectedSystems() {
  return (
    <section className={styles.section} aria-labelledby="selected-systems-title">
      <div className={styles.intro}>
        <span className={styles.eyebrow}>02 / SELECTED SYSTEMS</span>
        <h2 className={styles.title} id="selected-systems-title">
          Cada projeto demonstra uma ideia diferente.
        </h2>
        <p className={styles.subtitle}>Automação documental, resiliência offline e um sistema de relações — três problemas diferentes, três formas de resolver.</p>
      </div>

      <IMLSystem />
      <RELPREVSystem />
      <RegistroSystem />
    </section>
  );
}
