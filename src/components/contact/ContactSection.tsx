"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const WEB3FORMS_ACCESS_KEY = "67de06b9-5cbb-4844-ba26-478f9f1f336f";
const LINKEDIN_URL = "https://www.linkedin.com/in/helena-gabrielle-da-cunha-campêlo/";
const GITHUB_URL = "https://github.com/gabrielle-git";
const EMAIL = "gabrielle.campelo.dev@gmail.com";

type Status = "idle" | "sending" | "success" | "error";

const LINKS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "in/gabrielle",
    href: LINKEDIN_URL,
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "gabrielle-git",
    href: GITHUB_URL,
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const nome = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const mensagem = String(formData.get("message") ?? "").trim();

    // Validação simples no cliente
    if (!nome || !email || !mensagem) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    // 1) Salva no Supabase (RLS: insert público, leitura bloqueada)
    const dbPromise = supabase.from("mensagens").insert({ nome, email, mensagem });

    // 2) Notifica por email (Web3Forms) — bônus, não bloqueia
    const emailPromise = fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "Novo contato pelo portfólio",
        from_name: "Portfólio Gabrielle",
        name: nome,
        email,
        message: mensagem,
      }),
    });

    try {
      const [dbResult, emailResult] = await Promise.allSettled([
        dbPromise,
        emailPromise,
      ]);

      const dbOk = dbResult.status === "fulfilled" && !dbResult.value.error;
      const emailOk = emailResult.status === "fulfilled" && emailResult.value.ok;

      if (dbResult.status === "fulfilled" && dbResult.value.error) {
        console.error("Supabase:", dbResult.value.error.message);
      }

      if (dbOk || emailOk) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-white/30 outline-none focus:border-[var(--accent-primary)]/50 focus:ring-1 focus:ring-[var(--accent-primary)]/30 transition-colors";

  return (
    <section id="contato" className="relative w-full py-24 px-6 overflow-hidden">
      {/* Linha decorativa */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-white/10" />

      {/* Glow de atmosfera */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto flex flex-col gap-12">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <span className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] tracking-widest uppercase">
            <span className="inline-block w-6 h-px bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]" />
            04 / contato
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[var(--text-primary)] leading-[1.05] tracking-tight">
            Vamos conversar
          </h2>
          <p className="text-white/45 text-sm sm:text-base max-w-lg leading-relaxed">
            Aberta a oportunidades remotas. Me manda uma mensagem por aqui ou pelos
            canais abaixo.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-start">
          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-primary)]/[0.04] transition-colors"
              >
                <span className="text-white/40 group-hover:text-[var(--accent-primary)] transition-colors">
                  {link.icon}
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-mono text-white/30 tracking-widest uppercase">
                    {link.label}
                  </span>
                  <span className="text-sm text-white/70 group-hover:text-[var(--text-primary)] transition-colors">
                    {link.value}
                  </span>
                </span>
              </a>
            ))}
          </motion.div>

          {/* Formulário */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input name="name" type="text" required placeholder="Seu nome" className={inputClass} />
            <input name="email" type="email" required placeholder="Seu email" className={inputClass} />
            <textarea name="message" required rows={4} placeholder="Sua mensagem" className={`${inputClass} resize-none`} />

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-medium text-[#0a0a0a] hover:bg-[var(--accent-glow)] disabled:opacity-60 transition-colors"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensagem"}
            </button>

            {status === "success" && (
              <p className="text-sm text-emerald-400">Mensagem enviada! Logo te respondo. 💜</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Algo deu errado. Tenta de novo ou me chama direto no email.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}