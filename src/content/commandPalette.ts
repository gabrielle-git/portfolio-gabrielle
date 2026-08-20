import { profile } from "./profile";

export interface CommandAction {
  id: string;
  label: string;
  hint?: string;
  href: string;
  external?: boolean;
}

/**
 * Static navigation actions. Technical queries (RLS, Python, offline…) are
 * NOT listed here — the palette runs those through the same searchPortfolio()
 * used by Ask My Portfolio, so there's one search implementation, not two.
 */
export const commandActions: CommandAction[] = [
  { id: "projects", label: "Projects", href: "#featured-case" },
  { id: "catcare", label: "Multi-pet Care", hint: "Visual ↔ Inspect", href: "#featured-case" },
  { id: "iml", label: "IML", hint: "pipeline", href: "#iml" },
  { id: "relprev", label: "RELPREV", hint: "offline-first", href: "#relprev" },
  { id: "registro", label: "Registro", hint: "relações", href: "#registro" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "about", label: "About", href: "#about" },
  { id: "ask", label: "Ask My Portfolio", href: "#ask-my-portfolio" },
  { id: "contact", label: "Contact", href: "#contact" },
  { id: "github", label: "GitHub", href: profile.links.github, external: true },
  { id: "linkedin", label: "LinkedIn", href: profile.links.linkedin, external: true },
];
