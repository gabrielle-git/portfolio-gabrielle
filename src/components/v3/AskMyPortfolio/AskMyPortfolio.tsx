"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { askMyPortfolio, referenceAction } from "@/content/askMyPortfolio";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import styles from "./AskMyPortfolio.module.css";

interface Reference {
  title: string;
  href: string;
}

interface AskResponse {
  answer: string;
  references: Reference[];
  source: "ai" | "local";
}

/**
 * Ask My Portfolio — part of the page, not a floating chat bubble. Local
 * search always resolves the query (see src/lib/search); the LLM only
 * enriches phrasing when reachable, so this never shows a dead screen —
 * the API route (src/app/api/portfolio-ai) guarantees a normal 200 either
 * way.
 */
export function AskMyPortfolio() {
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [result, setResult] = useState<AskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const inputId = useId();

  const ask = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    setLastQuery(trimmed);
    try {
      const res = await fetch("/api/portfolio-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      const data: AskResponse = await res.json();
      setResult(data);
    } catch {
      setResult({
        answer: "Não consegui buscar agora. Tente termos como RLS, Python, offline, Supabase ou backend.",
        references: [],
        source: "local",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section} id="ask-my-portfolio" aria-labelledby="ask-title">
      <div className={styles.head}>
        <span className={styles.eyebrow}>{askMyPortfolio.eyebrow}</span>
        <h2 className={styles.title} id="ask-title">
          {askMyPortfolio.title}
        </h2>
        <p className={styles.subtitle}>{askMyPortfolio.subtitle}</p>
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          ask(query);
        }}
      >
        <label
          htmlFor={inputId}
          style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}
        >
          Pergunte ao portfólio
        </label>
        <input
          id={inputId}
          className={styles.input}
          type="text"
          placeholder={askMyPortfolio.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "…" : "ASK"}
        </button>
      </form>

      <div className={styles.suggestions}>
        {askMyPortfolio.suggestions.map((s) => (
          <button
            key={s}
            type="button"
            className={styles.suggestion}
            onClick={() => {
              setQuery(s);
              ask(s);
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {result ? (
        <motion.div
          key={lastQuery}
          className={styles.result}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}
          role="status"
          aria-live="polite"
        >
          <p className={styles.resultQuery}>&quot;{lastQuery}&quot;</p>
          <p className={styles.resultAnswer}>{result.answer}</p>

          {result.references.length > 0 ? (
            <div className={styles.refs}>
              {result.references.map((ref) => (
                <a key={ref.href + ref.title} href={ref.href} className={styles.ref}>
                  {ref.title}
                  <span className={styles.refArrow}>→</span>
                  {referenceAction[ref.href.replace("#", "")] ?? "VIEW SECTION"}
                </a>
              ))}
            </div>
          ) : null}

          <p className={styles.resultSource}>{result.source === "ai" ? "resposta enriquecida por IA" : "busca local"}</p>
        </motion.div>
      ) : (
        <p className={styles.status}>{loading ? "Buscando…" : "Escolha uma pergunta acima ou escreva a sua."}</p>
      )}
    </section>
  );
}
