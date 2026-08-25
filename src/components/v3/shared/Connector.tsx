import styles from "./connectors.module.css";

/** Decorative flow/hierarchy connectors, drawn with CSS borders — no arrow glyphs. */
export function ConnectorRight() {
  return <span className={styles.chevronRight} aria-hidden="true" />;
}

export function ConnectorDown() {
  return <span className={styles.chevronDown} aria-hidden="true" />;
}
