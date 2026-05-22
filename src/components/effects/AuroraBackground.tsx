"use client";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-accent-glow/15 blur-[120px] animate-pulse"
           style={{ animationDuration: '12s', animationDelay: '2s' }} />
      <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-accent-dim/10 blur-[150px] animate-pulse"
           style={{ animationDuration: '10s', animationDelay: '4s' }} />

      <div className="absolute inset-0 opacity-[0.015]" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
           }} />
    </div>
  );
}