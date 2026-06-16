"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Home,
  Layers,
  User,
  Send,
  Download,
  Mail,
  CornerDownLeft,
} from "lucide-react";

const EMAIL = "gabrielle.campelo.dev@gmail.com";
const GITHUB = "https://github.com/gabrielle-git";
const LINKEDIN = "https://www.linkedin.com/in/helena-gabrielle-da-cunha-campêlo/";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  sub?: string;
  keywords?: string;
  icon: React.ReactNode;
  run: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const [copied, setCopied] = useState(false);

  // Abre/fecha com ⌘K / Ctrl+K; fecha com Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reseta ao abrir
  useEffect(() => {
    if (open) {
      setQuery("");
      setSel(0);
      setCopied(false);
    }
  }, [open]);

  const goSection = (id: string) => {
    setOpen(false);
    if (window.location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  const commands: Cmd[] = useMemo(
    () => [
      {
        id: "home",
        label: "Início",
        keywords: "topo home hero",
        icon: <Home size={16} />,
        run: () => {
          setOpen(false);
          if (window.location.pathname === "/")
            window.scrollTo({ top: 0, behavior: "smooth" });
          else router.push("/");
        },
      },
      {
        id: "cases",
        label: "Ver cases",
        keywords: "projetos trabalhos portfolio",
        icon: <Layers size={16} />,
        run: () => goSection("cases"),
      },
      {
        id: "sobre",
        label: "Sobre mim",
        keywords: "bio quem sou",
        icon: <User size={16} />,
        run: () => goSection("sobre"),
      },
      {
        id: "contato",
        label: "Contato",
        keywords: "falar mensagem",
        icon: <Send size={16} />,
        run: () => goSection("contato"),
      },
      {
        id: "cv",
        label: "Baixar CV",
        keywords: "currículo resume pdf",
        icon: <Download size={16} />,
        run: () => {
          setOpen(false);
          window.open("/cv.pdf", "_blank");
        },
      },
      {
        id: "github",
        label: "GitHub",
        hint: "↗",
        keywords: "código repositório",
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        ),
        run: () => {
          setOpen(false);
          window.open(GITHUB, "_blank");
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "↗",
        keywords: "rede profissional",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        ),
        run: () => {
          setOpen(false);
          window.open(LINKEDIN, "_blank");
        },
      },
      {
        id: "email",
        label: copied ? "Email copiado!" : "Copiar email",
        sub: EMAIL,
        keywords: "contato gmail",
        icon: <Mail size={16} />,
        run: async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            /* clipboard indisponível */
          }
        },
      },
    ],
    [router, copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      (c.label + " " + (c.keywords ?? "")).toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setSel((s) => Math.min(s, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const onInputKey = (e: React.KeyboardEvent) => {
    const n = Math.max(1, filtered.length);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => (s + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => (s - 1 + n) % n);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[sel]?.run();
    }
  };

  return (
    <>
      {/* Botão flutuante (também abre o menu — útil no celular) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu de comando"
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md px-3.5 py-2 font-mono text-[11px] text-white/50 hover:text-white hover:border-[var(--accent-primary)]/40 transition-colors"
      >
        <Search size={13} />
        <span className="hidden sm:inline">⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              className="relative w-full max-w-lg rounded-xl border border-white/10 bg-[var(--bg-secondary)]/95 backdrop-blur-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-60" />

              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
                <Search size={16} className="text-white/30 shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Buscar ou navegar…"
                  className="flex-1 bg-transparent outline-none text-sm text-[var(--text-primary)] placeholder:text-white/30"
                />
                <span className="hidden sm:block font-mono text-[10px] text-white/25 border border-white/10 rounded px-1.5 py-0.5">
                  esc
                </span>
              </div>

              {/* Lista */}
              <div className="max-h-[320px] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-white/30">
                    Nada encontrado.
                  </p>
                ) : (
                  filtered.map((c, i) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={c.run}
                      onMouseEnter={() => setSel(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                        i === sel
                          ? "bg-[var(--accent-primary)]/10 text-white"
                          : "text-white/60"
                      }`}
                    >
                      <span className={i === sel ? "text-[var(--accent-primary)]" : "text-white/40"}>
                        {c.icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block truncate">{c.label}</span>
                        {c.sub && (
                          <span className="block truncate font-mono text-[10px] text-white/35 normal-case">
                            {c.sub}
                          </span>
                        )}
                      </span>
                      {c.hint && (
                        <span className="font-mono text-[10px] text-white/30">{c.hint}</span>
                      )}
                      {i === sel && (
                        <CornerDownLeft size={13} className="text-white/30" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Rodapé */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/[0.06] font-mono text-[10px] text-white/30">
                <span>↑↓ navegar</span>
                <span>⏎ abrir</span>
                <span>esc fechar</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}