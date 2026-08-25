"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { commandActions, type CommandAction } from "@/content/commandPalette";
import { searchPortfolio } from "@/lib/search";
import { referenceAction } from "@/content/askMyPortfolio";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import { useCommandPalette } from "./CommandPaletteContext";
import styles from "./CommandPalette.module.css";

interface PaletteItem {
  id: string;
  label: string;
  hint: string;
  href: string;
  external?: boolean;
}

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || (el as HTMLElement).isContentEditable;
}

function toItem(action: CommandAction): PaletteItem {
  return { id: action.id, label: action.label, hint: action.hint ?? (action.external ? "external" : ""), href: action.href, external: action.external };
}

/**
 * Cmd+K (macOS) / Ctrl+K (elsewhere), plus "/" when focus isn't in a field.
 * Editorial search list, not a terminal — reuses the exact same
 * searchPortfolio() as Ask My Portfolio for technical queries, so there's
 * one search implementation behind both surfaces.
 *
 * This outer component owns only `open` (from context) and focus restore —
 * it never needs to reset query/selection state itself, because the actual
 * search UI (PaletteBody) fully unmounts when closed and mounts fresh each
 * time it opens, which resets its local state for free. That sidesteps the
 * React Compiler's set-state-in-effect and ref-during-render rules, which a
 * naive "reset on open" effect tripped on.
 */
export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const triggerRef = useRef<Element | null>(null);

  // Global shortcut listener — always mounted so ⌘K/Ctrl+K/"/" work
  // regardless of whether the palette itself is open.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!open);
        return;
      }
      if (event.key === "/" && !open && !isTypingTarget(document.activeElement)) {
        event.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  // Capture/restore focus around the open state — a genuine side effect,
  // no setState involved.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
    } else if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onMouseDown={() => setOpen(false)}>
      <PaletteBody onClose={() => setOpen(false)} />
    </div>
  );
}

function PaletteBody({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const items: PaletteItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return commandActions.map(toItem);
    }
    const staticMatches = commandActions.filter((a) => a.label.toLowerCase().includes(q)).map(toItem);

    const searchMatches = searchPortfolio(query, 5).map((r) => ({
      id: `search-${r.id}`,
      label: r.title,
      hint: referenceAction[r.href.replace("#", "")] ?? "VIEW SECTION",
      href: r.href,
    }));

    const seen = new Set(staticMatches.map((m) => m.href));
    return [...staticMatches, ...searchMatches.filter((m) => !seen.has(m.href))];
  }, [query]);

  const activate = (item: PaletteItem) => {
    onClose();
    if (item.external) {
      window.open(item.href, "_blank", "noreferrer");
      return;
    }
    document
      .getElementById(item.href.replace("#", ""))
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = items[activeIndex];
      if (item) activate(item);
    }
  };

  return (
    <motion.div
      className={styles.panel}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={onKeyDown}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.18 }}
    >
      <div className={styles.inputRow}>
        <span className={styles.prompt} aria-hidden="true">
          ⌘K
        </span>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-palette-list"
          aria-activedescendant={items[activeIndex] ? `cmd-${items[activeIndex].id}` : undefined}
          placeholder="Buscar projetos, seções ou termos técnicos…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
        />
        <span className={styles.esc}>ESC</span>
      </div>

      {items.length === 0 ? (
        <p className={styles.empty}>Nada encontrado. Tente RLS, Python, offline, backend…</p>
      ) : (
        <ul className={styles.list} id="command-palette-list" role="listbox">
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                id={`cmd-${item.id}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={`${styles.item} ${index === activeIndex ? styles.itemActive : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => activate(item)}
              >
                <span className={styles.itemLabel}>{item.label}</span>
                <span className={styles.itemHint}>{item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
