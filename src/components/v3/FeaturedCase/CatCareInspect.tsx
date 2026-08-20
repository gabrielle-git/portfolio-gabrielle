import { Fragment } from "react";
import { catCareInspect } from "@/content/projects";
import styles from "./CatCareInspect.module.css";

/**
 * Every fact rendered here is traceable to github.com/gabrielle-git/CatCare
 * (see src/content/projects/catcare.ts and docs/V3-MIGRATION-PLAN.md section
 * 3) — real function names, real migration file, real role model. Nothing
 * is illustrative pseudocode.
 */
export function CatCareInspect() {
  const i = catCareInspect;

  return (
    <div className={styles.inspect}>
      <span className={styles.secureBadge}>{i.secureBadge}</span>

      <div className={styles.flowRow} role="list" aria-label="Fluxo de requisição">
        {i.flow.map((step, index) => (
          <Fragment key={step.id}>
            <div className={styles.flowStep} role="listitem">
              <span className={styles.flowLabel}>{step.label}</span>
              <span className={styles.flowDetail}>{step.detail}</span>
            </div>
            {index < i.flow.length - 1 ? (
              <span className={styles.flowArrow} aria-hidden="true">
                →
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>

      <div>
        <div className={styles.domainRow} aria-label="Hierarquia de domínio">
          {i.domain.map((node, index) => (
            <span key={node.id}>
              <span className={styles.domainNode} title={node.detail}>
                {node.label}
              </span>
              {index < i.domain.length - 1 ? <span className={styles.domainArrow}> → </span> : null}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.rolesRow}>
        {i.roles.map((role) => (
          <span key={role.id} className={styles.roleChip}>
            <span className={styles.roleLabel}>{role.label}:</span>
            <span className={styles.roleDescription}>{role.description}</span>
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={styles.codeBlock}>
          <span className={styles.codeSource}>{i.codeSample.source}</span>
          <pre className={styles.codePre}>
            <code>{i.codeSample.code}</code>
          </pre>
        </div>

        <div className={styles.provesBox}>
          <span className={styles.provesLabel}>WHAT THIS PROVES</span>
          <ul className={styles.provesList}>
            {i.whatThisProves.map((item) => (
              <li key={item} className={styles.provesItem}>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.note}>{i.note}</p>
        </div>
      </div>
    </div>
  );
}
