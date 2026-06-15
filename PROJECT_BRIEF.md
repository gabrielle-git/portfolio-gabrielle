# Portfolio · Gabrielle Campelo

Vitrine profissional pública construída em Next.js 16, focada em apresentar projetos técnicos sem exposição de repositórios privados.

---

## Status

**Em desenvolvimento ativo** · Deploy contínuo via Vercel · [portfolio-gabrielle-one.vercel.app](https://portfolio-gabrielle-one.vercel.app)

---

## Objetivo

Apresentar a trajetória técnica como **Engenheira de Software** com foco em backend, automação e integração de agentes de IA, captando oportunidades em vagas Pleno e projetos freelance. Substitui a necessidade de expor código de projetos sob NDA.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS 4 + CSS variables |
| Animações | Framer Motion |
| Smooth scroll | Lenis |
| Tipografia | Geist Sans + Pixelify Sans + JetBrains Mono |
| Deploy | Vercel (CI/CD automático) |
| Backend (futuro) | Resend (formulário de contato) |

---

## Identidade visual

**Conceito:** Cyberpunk elegante. Dark-first, paleta roxa elétrica como acento, microinterações com propósito.

**Paleta principal:**
- bg-primary: #0a0a0a (fundo)
- accent-primary: #a78bfa (acento elétrico)
- text-primary: #fafafa (texto)

**Princípios:**
- Cada animação tem razão funcional ou narrativa
- Performance é parte do design
- Detalhe acima de decoração

---

## Cases featured

1. **NutriAprova** — SaaS B2B com IA generativa (Tech Lead)
2. **Fatiador PCDF/IML** — Automação documental crítica em órgão governamental
3. **Pipeline Sisters Live** — ETL com idempotência via códigos HTTP semânticos
4. **Diário PCDF** (em desenvolvimento) — App de gestão de cobertura de férias
5. **DOA Manutenção** (planejamento) — Dashboard analítico de aeronaves

---

## Roadmap

- [x] Setup Next.js 16 + Tailwind 4 + TypeScript
- [x] Sistema de design (tokens, fonts, animações)
- [x] Estrutura tipada dos cases
- [x] Layout global com SEO e Open Graph
- [x] Hero refinado (avatar, status bar, identidade, stack agrupada)
- [x] Deploy automático Vercel
- [ ] Seção Cases (cards com tilt 3D + spotlight)
- [ ] Seção Sobre + foto
- [ ] Seção Contato (formulário funcional via Resend)
- [ ] Microinterações finais (cursor custom, partículas, easter eggs)
- [ ] Domínio próprio
- [ ] Open Graph image customizada
- [ ] Acessibilidade WCAG AA
- [ ] Lighthouse Performance >= 95

---

## Estrutura de pastas

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/                # Route handlers (futuro)
├── components/
│   ├── effects/            # AuroraBackground, SmoothScroll, Typewriter
│   ├── hero/               # Hero, HeroAvatar, HeroIdentity, HeroStatusBar
│   ├── sections/           # Cases, Sobre, Contato (futuro)
│   └── ui/                 # Button, Badge
├── lib/
│   ├── utils.ts            # Helper cn()
│   └── data/
│       └── projects.ts     # Fonte única de verdade dos cases
├── hooks/                  # Custom React hooks
└── types/                  # Tipos compartilhados
```

---

## Convenções

- **Componentes:** PascalCase, um por arquivo
- **Imports:** absolutos via @/
- **Commits:** Conventional Commits (feat:, fix:, chore:, docs:, refactor:)
- **Comentários:** curtos, em inglês, focados em "por quê" (não "o quê")

---

## Confidencialidade

Projetos com NDA ou sigilo institucional (PCDF/IML, NutriAprova interno) são apresentados focando em **arquitetura, decisões técnicas e impacto** — sem exposição de código, screenshots sensíveis ou conteúdo protegido.

---

## Como rodar localmente

```
npm install
npm run dev
```

Servidor sobe em http://localhost:3000

---

## Licença

Código-fonte: MIT
Conteúdo (textos, imagens, projetos): © Helena Gabrielle da Cunha Campêlo