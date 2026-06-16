import type { Metadata } from "next";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { VisitTracker } from "@/components/analytics/VisitTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gabrielle Campelo · Software Engineer",
  description:
    "Engenheira de Software com foco em backend, automação e integração de agentes de IA.",
  keywords: [
    "Gabrielle Campelo",
    "Software Engineer",
    "Backend",
    "Automação",
    "Agentes de IA",
    "Node.js",
    "TypeScript",
    "Python",
    "Brasília",
  ],
  authors: [{ name: "Gabrielle Campelo" }],
  creator: "Gabrielle Campelo",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://portfolio-gabrielle-one.vercel.app",
    title: "Gabrielle Campelo · Software Engineer",
    description: "Backend · Automação · IA",
    siteName: "Gabrielle Campelo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabrielle Campelo · Software Engineer",
    description: "Backend · Automação · IA",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/avatar.png", apple: "/avatar.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} antialiased`}
      >
        {children}
        <CommandPalette />
        <VisitTracker />
      </body>
    </html>
  );
}