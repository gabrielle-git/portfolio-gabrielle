"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { registro, registroHierarchy, registroInspect } from "@/content/projects";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import { ConnectorDown } from "@/components/v3/shared/Connector";
import shared from "./shared.module.css";
import styles from "./RegistroSystem.module.css";

/**
 * Registro — relationships/context. Distinct from IML (pipeline) and
 * RELPREV (state toggle): a navigable hierarchy of nodes, not a screenshot
 * card. Clicking a node reveals what it actually means in the real domain
 * model (Setor/Pessoa/EntradaDiario — read directly from the repo).
 */
export function RegistroSystem() {
  const [activeId, setActiveId] = useState(registroHierarchy[0].id);
  const prefersReducedMotion = useReducedMotion();
  const active = registroHierarchy.find((n) => n.id === activeId) ?? registroHierarchy[0];

  return (
    <div className={shared.system} id="registro">
      <div className={shared.head}>
        <span className={shared.eyebrow}>KNOWLEDGE SYSTEM / PERSONAL WORKFLOW</span>
        <h3 className={shared.title}>{registro.title}</h3>
        <p className={shared.tagline}>{registro.tagline}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.graph} role="tablist" aria-label="Hierarquia de relações do Registro">
          <div className={styles.nodeRow}>
            {registroHierarchy.map((node, index) => (
              <Fragment key={node.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeId === node.id}
                  aria-controls="registro-node-detail"
                  className={`${styles.nodeBtn} ${activeId === node.id ? styles.nodeActive : ""}`}
                  onClick={() => setActiveId(node.id)}
                >
                  {node.label}
                </button>
                {index < registroHierarchy.length - 1 ? (
                  <span className={styles.connector}>
                    <ConnectorDown />
                  </span>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>

        <motion.div
          id="registro-node-detail"
          role="tabpanel"
          className={styles.detail}
          key={active.id}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
        >
          <span className={styles.detailLabel}>{active.label}</span>
          <p className={styles.detailBody}>{active.detail}</p>
        </motion.div>

        <div className={styles.inspect}>
          <p className={styles.inspectHeading}>{registroInspect.heading}</p>
          {registroInspect.flow.map((step) => (
            <div key={step.id} className={styles.inspectStep}>
              <span className={styles.inspectLabel}>{step.label}</span>
              <span className={styles.inspectDetail}>{step.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {registro.links.repo ? (
        <a className={styles.sourceLink} href={registro.links.repo} target="_blank" rel="noreferrer">
          SOURCE
        </a>
      ) : null}
    </div>
  );
}
