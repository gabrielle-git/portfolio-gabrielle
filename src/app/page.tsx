import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/30 blur-3xl rounded-full" />
            <Image
              src="/avatar.jpeg"
              alt="Gabrielle Campelo"
              width={200}
              height={200}
              priority
              className="relative rounded-full border-2 border-accent/30 shadow-2xl"
            />
          </div>
        </div>

        <h1
          className="text-7xl font-bold mb-4 text-gradient"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          Gabrielle Campelo
        </h1>

        <p className="text-xl text-fg-muted mb-2">Software Engineer</p>

        <p className="text-sm font-mono text-accent mt-4 cursor-blink">
          backend · automação · ia
        </p>
      </div>
    </main>
  );
}