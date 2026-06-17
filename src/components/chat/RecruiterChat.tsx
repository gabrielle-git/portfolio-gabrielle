"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X, Sparkles } from "lucide-react";

type Mensagem = { role: "user" | "assistant"; content: string };

const SAUDACAO: Mensagem = {
  role: "assistant",
  content:
    "Oi! 👋 Sou a assistente da Gabrielle. Pode me perguntar sobre a experiência, os projetos ou as habilidades dela.",
};

// Renderiza **negrito** (as quebras de linha ficam por conta do whitespace-pre-wrap).
function formatar(texto: string) {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith("**") && parte.endsWith("**") ? (
      <strong key={i}>{parte.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{parte}</span>
    )
  );
}

export function RecruiterChat() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([SAUDACAO]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const fimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, carregando, aberto]);

  const enviar = async () => {
    const pergunta = texto.trim();
    if (!pergunta || carregando) return;

    const novas: Mensagem[] = [...mensagens, { role: "user", content: pergunta }];
    setMensagens(novas);
    setTexto("");
    setCarregando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: novas }),
      });
      const data = await res.json();
      setMensagens((m) => [
        ...m,
        { role: "assistant", content: String(data?.reply ?? "...") },
      ]);
    } catch {
      setMensagens((m) => [
        ...m,
        { role: "assistant", content: "Tive um probleminha. Tenta de novo! 💜" },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  return (
    <>
      {!aberto && (
        <button
          onClick={() => setAberto(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-border-accent bg-bg-secondary/90 backdrop-blur px-4 py-3 text-sm font-medium text-accent shadow-lg hover:bg-accent/10 transition-colors"
          aria-label="Abrir chat com a IA"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Pergunte sobre mim</span>
        </button>
      )}

      {aberto && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[min(70vh,520px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-secondary shadow-2xl">
          <div className="flex items-center justify-between border-b border-border-default px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <div>
                <div className="text-sm font-semibold text-fg">Assistente IA</div>
                <div className="text-[10px] font-mono text-fg-dim">
                  treinada com este portfólio
                </div>
              </div>
            </div>
            <button
              onClick={() => setAberto(false)}
              className="text-fg-dim hover:text-fg transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-3"
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
                {m.role === "assistant" ? formatar(m.content) : m.content}
              </div>
            ))}
            {carregando && (
              <div className="self-start flex gap-1 rounded-xl border border-border-default bg-white/[0.04] px-3 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce" />
              </div>
            )}
            <div ref={fimRef} />
          </div>

          <div className="border-t border-border-default p-3 flex items-end gap-2">
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={onKey}
              rows={1}
              maxLength={500}
              placeholder="Pergunte sobre a Gabrielle..."
              className="flex-1 resize-none rounded-lg border border-border-default bg-bg-primary px-3 py-2 text-sm text-fg placeholder:text-fg-dim outline-none focus:border-border-accent max-h-24"
            />
            <button
              onClick={enviar}
              disabled={carregando || !texto.trim()}
              className="shrink-0 rounded-lg border border-border-accent bg-accent/15 p-2 text-accent hover:bg-accent/25 transition-colors disabled:opacity-40"
              aria-label="Enviar pergunta"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}