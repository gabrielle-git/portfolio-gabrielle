import { cn } from "@/lib/utils";

export default function Home() {
  const isHighlighted = true;
  
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 
          className={cn(
            "text-6xl font-bold mb-4",
            isHighlighted && "text-gradient",  // ← classe aplicada condicionalmente
          )}
        >
          Gabrielle Campelo
        </h1>
        <p className="text-xl text-fg-muted">
          Software Engineer · Backend · Automação · IA
        </p>
        <p className="text-sm font-mono text-accent mt-8 cursor-blink">
          system online
        </p>
      </div>
    </main>
  );
}