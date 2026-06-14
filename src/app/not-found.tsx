import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        <span className="font-mono text-xs tracking-widest uppercase text-[var(--accent-primary)]/70">
          erro 404
        </span>

        <h1 className="text-6xl sm:text-7xl font-semibold leading-none">
          <span className="text-gradient">404</span>
        </h1>

        <p className="text-white/50 leading-relaxed">
          Essa rota não existe (ou foi movida). Acontece até nos melhores
          sistemas. 🛰️
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5 px-5 py-2.5 text-sm font-mono text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Voltar pro início
        </Link>
      </div>
    </main>
  );
}