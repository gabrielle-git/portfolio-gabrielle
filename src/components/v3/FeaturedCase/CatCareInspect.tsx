import { Fragment } from "react";
import { catCareInspect } from "@/content/projects";
import { ConnectorRight } from "@/components/v3/shared/Connector";
import styles from "./CatCareInspect.module.css";

/**
 * Every fact rendered here is traceable to github.com/gabrielle-git/CatCare
 * (see src/content/projects/catcare.ts and docs/V3-MIGRATION-PLAN.md section
 * 3). Correction pass (Fase 1.1): dropped the "SECURE PATH" pill and the
 * "WHAT THIS PROVES" pill-cloud — those read as badge decoration. Flow steps
 * are now label-only boxes (the longer verified description moves to a
 * native `title` tooltip instead of a paragraph inside every box); roles
 * and domain hierarchy are plain annotated text, matching the current
 * Figma's flat, non-terminal treatment of this panel.
 */
export function CatCareInspect() {
  const i = catCareInspect;

  return (
    <div className={styles.inspect}>
      <div className={styles.headRow}>
        <h3 className={styles.heading}>{i.heading}</h3>
        <span className={styles.annotation}>{i.annotation}</span>
      </div>

      <div className={styles.flowRow} role="list" aria-label="Fluxo de requisição">
        {i.flow.map((step, index) => (
          <Fragment key={step.id}>
            <div className={styles.flowStep} role="listitem" title={step.detail}>
              <span className={styles.flowLabel}>{step.label}</span>
            </div>
            {index < i.flow.length - 1 ? (
              <span className={styles.flowArrow}>
                <ConnectorRight />
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>

      <div className={styles.domainRow} aria-label="Hierarquia de domínio">
        {i.domain.map((node, index) => (
          <span key={node.id}>
            <span className={styles.domainNode} title={node.detail}>
              {node.label}
            </span>
            {index < i.domain.length - 1 ? (
              <span className={styles.domainArrow}>
                <ConnectorRight />
              </span>
            ) : null}
          </span>
        ))}
      </div>

      <p className={styles.rolesRow}>
        {i.roles.map((role, index) => (
          <span key={role.id}>
            <span className={styles.roleLabel}>{role.label}</span>: {role.description}
            {index < i.roles.length - 1 ? <span className={styles.rolesSep}>   </span> : null}
          </span>
        ))}
      </p>

      <div className={styles.grid}>
        <div className={styles.codeBlock}>
          <span className={styles.codeSource}>{i.codeSample.source}</span>
          <pre className={styles.codePre}>
            <code>{i.codeSample.code}</code>
          </pre>
        </div>

        <div className={styles.evidenceBox}>
          <span className={styles.evidenceLabel}>{i.evidenceLabel}</span>
          <p className={styles.evidenceList}>{i.evidence.join(" · ")}</p>
          <p className={styles.note}>{i.note}</p>
        </div>
      </div>
    </div>
  );
}
