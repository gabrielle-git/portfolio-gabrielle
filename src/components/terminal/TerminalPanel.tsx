"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, TerminalSquare, Sparkles, Send, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────── types ─────────────────────────── */

type Tab = "terminal" | "ia";
type LineType = "system" | "prompt" | "output" | "error" | "success" | "dim";
type Line = { type: LineType; content: string };
type Mensagem = { role: "user" | "assistant"; content: string };

/* ──────────────────────── constants ──────────────────────────── */

const SAUDACAO: Mensagem = {
  role: "assistant",
  content:
    "Oi! 👋 Sou a assistente da Gabrielle. Pode me perguntar sobre a experiência, os projetos ou as habilidades dela.",
};

const CASES: Record<string, string> = {
  nutriaprova: "NutriAprova",
  "pcdf-iml": "Fatiador PCDF/IML",
  "doa-relprev": "RELPREV",
  "sisters-live": "Pipeline Sisters Live",
  "diario-pcdf": "Diário de Rotação PCDF",
};

const BOOT_SEQUENCE: Line[] = [
  { type: "system",  content: "GabrielleOS v2.1.0" },
  { type: "dim",     content: "─────────────────────────────────" },
  { type: "dim",     content: "[BOOT] carregando módulos..." },
  { type: "success", content: "[  OK] sistema online" },
  { type: "dim",     content: "" },
  { type: "output",  content: "Digite 'help' para ver os comandos." },
  { type: "dim",     content: "" },
];

const HELP_LINES: Line[] = [
  { type: "dim",    content: "─── navegação ───────────────────────" },
  { type: "output", content: "  home / top       → início da página" },
  { type: "output", content: "  skills           → seção de stack" },
  { type: "output", content: "  cases            → seção de projetos" },
  { type: "output", content: "  sobre            → sobre mim" },
  { type: "output", content: "  contato          → entre em contato" },
  { type: "dim",    content: "" },
  { type: "dim",    content: "─── cases disponíveis ───────────────" },
  { type: "output", content: "  case nutriaprova" },
  { type: "output", content: "  case pcdf-iml" },
  { type: "output", content: "  case doa-relprev" },
  { type: "output", content: "  case sisters-live" },
  { type: "output", content: "  case diario-pcdf" },
  { type: "dim",    content: "" },
  { type: "dim",    content: "─── utilidades ──────────────────────" },
  { type: "output", content: "  whois            → sobre a Gabrielle" },
  { type: "output", content: "  ls               → lista as seções" },
  { type: "output", content: "  date             → data e hora" },
  { type: "output", content: "  email            → copia o email" },
  { type: "output", content: "  github           → abre o GitHub" },
  { type: "output", content: "  linkedin         → abre o LinkedIn" },
  { type: "output", content: "  cv               → baixa o currículo" },
  { type: "output", content: "  ai / chat        → abre o chat com IA" },
  { type: "output", content: "  clear            → limpa o terminal" },
  { type: "dim",    content: "" },
];

const WHOIS_LINES: Line[] = [
  { type: "dim",     content: "─── whois gabriellecampelo ──────────" },
  { type: "success", content: "  Gabrielle Campelo" },
  { type: "output",  content: "  Engenheira de Software" },
  { type: "output",  content: "  Backend · Frontend · IA · Automação" },
  { type: "output",  content: "  Brasília-DF, Brasil" },
  { type: "dim",     content: "" },
  { type: "output",  content: "  gabrielle.campelo.dev@gmail.com" },
  { type: "dim",     content: "" },
];

/* ─────────────────────── IA message formatting ─────────────────── */

function formatarIA(texto: string) {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith("**") && parte.endsWith("**") ? (
      <strong key={i}>{parte.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{parte}</span>
    )
  );
}

/* ──────────────────────── line color map ────────────────────────── */

const lineClass: Record<LineType, string> = {
  system:  "text-accent font-semibold",
  prompt:  "text-fg/70",
  output:  "text-fg/85",
  error:   "text-red-400",
  success: "text-emerald-400",
  dim:     "text-fg-dim/60",
};

/* ═══════════════════════ TerminalPanel ══════════════════════════ */

export function TerminalPanel() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [tab, setTab] = useState<Tab>("terminal");

  /* terminal state */
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ia state */
  const [mensagens, setMensagens] = useState<Mensagem[]>([SAUDACAO]);
  const [textoIA, setTextoIA] = useState("");
  const [carregando, setCarregando] = useState(false);
  const iaEndRef = useRef<HTMLDivElement>(null);

  /* ── boot sequence ── */
  useEffect(() => {
    if (!open || booted) return;
    setBooted(true);
    let delay = 0;
    BOOT_SEQUENCE.forEach((line) => {
      delay += line.content === "" ? 60 : 130;
      setTimeout(() => setLines((prev) => [...prev, line]), delay);
    });
  }, [open, booted]);

  /* ── auto-scroll ── */
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    iaEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, carregando]);

  /* ── focus input when terminal opens ── */
  useEffect(() => {
    if (open && !minimised && tab === "terminal") {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open, minimised, tab]);

  /* ── add lines helper ── */
  const add = useCallback((...newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  /* ── command executor ── */
  const execute = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      add({ type: "prompt", content: `gabrielle@portfolio:~$ ${cmd}` });

      const parts = cmd.toLowerCase().split(/\s+/);
      const verb = parts[0];
      const arg = parts.slice(1).join("-");

      switch (verb) {
        case "help":
        case "?":
          add(...HELP_LINES);
          break;

        case "clear":
          setLines([]);
          break;

        case "home":
        case "top":
          window.scrollTo({ top: 0, behavior: "smooth" });
          add({ type: "success", content: "  ↑ indo para o início..." });
          break;

        case "skills":
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          add({ type: "success", content: "  → seção stack" });
          break;

        case "cases":
          document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });
          add({ type: "success", content: "  → seção cases" });
          break;

        case "sobre":
        case "about":
          document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
          add({ type: "success", content: "  → seção sobre" });
          break;

        case "contato":
        case "contact":
          document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
          add({ type: "success", content: "  → seção contato" });
          break;

        case "case":
          if (!arg) {
            add({ type: "error", content: "  uso: case <id>  (ex: case nutriaprova)" });
            break;
          }
          if (!CASES[arg]) {
            const ids = Object.keys(CASES).join(" | ");
            add({ type: "error",  content: `  case '${arg}' não encontrado.` });
            add({ type: "output", content: `  disponíveis: ${ids}` });
            break;
          }
          add({ type: "success", content: `  → abrindo ${CASES[arg]}...` });
          setTimeout(() => router.push(`/cases/${arg}`), 400);
          break;

        case "whois":
          add(...WHOIS_LINES);
          break;

        case "ls":
          add(
            { type: "dim",    content: "" },
            { type: "output", content: "  01  hero" },
            { type: "output", content: "  02  skills" },
            { type: "output", content: "  03  cases" },
            { type: "output", content: "  04  sobre" },
            { type: "output", content: "  05  contato" },
            { type: "dim",    content: "" },
          );
          break;

        case "date":
          add({
            type: "output",
            content: `  ${new Date().toLocaleString("pt-BR", { dateStyle: "full", timeStyle: "medium" })}`,
          });
          break;

        case "email":
          navigator.clipboard
            .writeText("gabrielle.campelo.dev@gmail.com")
            .then(() => add({ type: "success", content: "  ✓ email copiado para a área de transferência" }))
            .catch(() => add({ type: "output", content: "  gabrielle.campelo.dev@gmail.com" }));
          break;

        case "github":
        case "gh":
          window.open("https://github.com/gabriellecampelo", "_blank");
          add({ type: "success", content: "  ↗ abrindo GitHub..." });
          break;

        case "linkedin":
        case "li":
          window.open("https://linkedin.com/in/gabriellecampelo", "_blank");
          add({ type: "success", content: "  ↗ abrindo LinkedIn..." });
          break;

        case "cv":
        case "resume":
          window.open("/cv.pdf", "_blank");
          add({ type: "success", content: "  ↓ baixando CV..." });
          break;

        case "ai":
        case "chat":
          setTab("ia");
          add({ type: "success", content: "  → alternando para IA..." });
          break;

        case "tema":
        case "theme":
          add({ type: "dim", content: "  modo claro em desenvolvimento..." });
          add({ type: "output", content: "  [TODO] toggle de tema — em breve" });
          break;

        case "reboot":
          setLines([]);
          setBooted(false);
          setTimeout(() => {
            setBooted(false);
            let delay = 0;
            BOOT_SEQUENCE.forEach((line) => {
              delay += line.content === "" ? 60 : 130;
              setTimeout(() => setLines((prev) => [...prev, line]), delay);
            });
            setBooted(true);
          }, 100);
          break;

        default:
          add({
            type: "error",
            content: `  comando '${verb}' não encontrado. Digite 'help'.`,
          });
      }

      setCmdHistory((prev) => [cmd, ...prev.slice(0, 49)]);
      setHistIdx(-1);
    },
    [add, router]
  );

  /* ── keyboard handler ── */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(next); setInput(cmdHistory[next] ?? ""); }
    }
  };

  /* ── IA chat send ── */
  const enviarIA = async () => {
    const pergunta = textoIA.trim();
    if (!pergunta || carregando) return;
    const novas: Mensagem[] = [...mensagens, { role: "user", content: pergunta }];
    setMensagens(novas);
    setTextoIA("");
    setCarregando(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: novas }),
      });
      const data = await res.json();
      setMensagens((m) => [...m, { role: "assistant", content: String(data?.reply ?? "...") }]);
    } catch {
      setMensagens((m) => [...m, { role: "assistant", content: "Tive um probleminha. Tenta de novo! 💜" }]);
    } finally {
      setCarregando(false);
    }
  };

  /* ══════════════════════════ render ══════════════════════════ */

  return (
    <>
      {/* ── launcher button (always visible) ── */}
      <AnimatePresence>
        {(!open || minimised) && (
          <motion.button
            key="launcher"
            onClick={() => { setOpen(true); setMinimised(false); }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-border-accent bg-bg-secondary/90 backdrop-blur px-4 py-3 text-sm font-mono font-medium text-accent shadow-lg hover:bg-accent/10 transition-colors"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            aria-label="Abrir terminal"
          >
            <TerminalSquare className="w-4 h-4" />
            <span className="hidden sm:inline">terminal</span>
            <span className="hidden sm:inline text-fg-dim/50">·</span>
            <span className="hidden sm:flex items-center gap-1 text-fg-muted">
              <Sparkles className="w-3 h-3" />
              ia
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── panel ── */}
      <AnimatePresence>
        {open && !minimised && (
          <motion.div
            key="panel"
            className="fixed bottom-5 right-5 z-50 flex flex-col overflow-hidden rounded-xl border border-border-default bg-bg-primary shadow-2xl"
            style={{ width: "min(92vw, 460px)", height: "min(75vh, 540px)" }}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* ── window chrome ── */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle bg-bg-secondary/60 shrink-0">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setOpen(false)}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  aria-label="Fechar"
                />
                <button
                  onClick={() => setMinimised(true)}
                  className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-400 transition-colors"
                  aria-label="Minimizar"
                />
                <div className="w-3 h-3 rounded-full bg-border-default cursor-not-allowed" />
              </div>

              {/* ── tabs ── */}
              <div className="flex items-center gap-1 bg-bg-primary/60 rounded-lg p-0.5">
                <button
                  onClick={() => setTab("terminal")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                    tab === "terminal"
                      ? "bg-accent/15 text-accent"
                      : "text-fg-dim hover:text-fg-muted"
                  }`}
                >
                  <TerminalSquare className="w-3 h-3" />
                  terminal
                </button>
                <button
                  onClick={() => setTab("ia")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                    tab === "ia"
                      ? "bg-accent/15 text-accent"
                      : "text-fg-dim hover:text-fg-muted"
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  pergunte à ia
                </button>
              </div>

              <button
                onClick={() => setMinimised(true)}
                className="text-fg-dim hover:text-fg transition-colors"
                aria-label="Minimizar"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ── terminal tab ── */}
            {tab === "terminal" && (
              <div className="flex flex-col flex-1 overflow-hidden">
                <div
                  data-lenis-prevent
                  className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed"
                  onClick={() => inputRef.current?.focus()}
                >
                  {lines.map((line, i) => (
                    <div key={i} className={lineClass[line.type]}>
                      {line.content}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* ── input row ── */}
                <div className="flex items-center gap-2 border-t border-border-subtle px-4 py-2.5 shrink-0">
                  <span className="font-mono text-[12px] text-accent shrink-0">
                    gabrielle@portfolio:~$
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent font-mono text-[12px] text-fg outline-none caret-accent placeholder:text-fg-dim/40"
                    placeholder="help"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-label="Entrada de comando"
                  />
                </div>
              </div>
            )}

            {/* ── ia tab ── */}
            {tab === "ia" && (
              <div className="flex flex-col flex-1 overflow-hidden">
                <div
                  data-lenis-prevent
                  className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
                >
                  {mensagens.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "self-end bg-accent/15 text-fg border border-border-accent"
                          : "self-start bg-white/[0.04] text-fg/90 border border-border-default"
                      }`}
                    >
                      {m.role === "assistant" ? formatarIA(m.content) : m.content}
                    </div>
                  ))}
                  {carregando && (
                    <div className="self-start flex gap-1 rounded-xl border border-border-default bg-white/[0.04] px-3 py-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce" />
                    </div>
                  )}
                  <div ref={iaEndRef} />
                </div>

                <div className="border-t border-border-subtle p-3 flex items-end gap-2 shrink-0">
                  <textarea
                    value={textoIA}
                    onChange={(e) => setTextoIA(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviarIA(); }
                    }}
                    rows={1}
                    maxLength={500}
                    placeholder="Pergunte sobre a Gabrielle..."
                    className="flex-1 resize-none rounded-lg border border-border-default bg-bg-secondary px-3 py-2 text-sm text-fg placeholder:text-fg-dim outline-none focus:border-border-accent max-h-24"
                  />
                  <button
                    onClick={enviarIA}
                    disabled={carregando || !textoIA.trim()}
                    className="shrink-0 rounded-lg border border-border-accent bg-accent/15 p-2 text-accent hover:bg-accent/25 transition-colors disabled:opacity-40"
                    aria-label="Enviar pergunta"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
