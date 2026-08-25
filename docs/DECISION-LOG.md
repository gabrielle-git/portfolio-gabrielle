# Portfolio V3 — Decision Log

> Registro resumido de decisões importantes. Cada entrada deve responder: **o que decidimos, por que, consequência e quando revisar**.

## D-001 — V3 permanece em Next.js

**Status:** accepted

**Decisão:** manter Next.js/React/TypeScript em vez de migrar a V3 para SvelteKit.

**Por quê:** o repositório já possui API de IA, SEO/metadata, deploy, dados estruturados e infraestrutura funcional. A reconstrução visual já é uma mudança grande; trocar framework ao mesmo tempo aumentaria risco sem benefício proporcional.

**Consequência:** a V3 reutiliza backend e infraestrutura existentes, mas a camada visual pode ser quase totalmente nova.

**Revisar quando:** apenas se surgir limitação técnica concreta do framework.

---

## D-002 — CSS Modules + design tokens para a V3

**Status:** accepted

**Decisão:** novos componentes V3 usam CSS Modules e CSS Custom Properties; Tailwind legado não é migrado em massa.

**Por quê:** a V3 exige composição editorial específica e manutenção clara de tokens. Evita longas strings utilitárias e uma refatoração desnecessária do legado.

**Consequência:** light/dark e futuras mudanças de paleta devem acontecer prioritariamente em tokens semânticos.

**Revisar quando:** se o sistema visual crescer a ponto de justificar outra camada de abstração.

---

## D-003 — Source of truth em `src/content`

**Status:** accepted

**Decisão:** conteúdo técnico e profissional da V3 deve ser estruturado fora dos componentes.

**Por quê:** o mesmo conteúdo precisa alimentar Home, cases, busca local, Portfolio AI e Command Palette sem duplicação.

**Consequência:** componentes devem renderizar dados, não virar fonte principal de claims profissionais.

**Revisar quando:** se o volume de conteúdo justificar CMS ou geração externa.

---

## D-004 — Código/projeto real prevalece sobre conteúdo do portfólio antigo

**Status:** accepted

**Decisão:** `src/lib/data/projects.ts` e READMEs antigos não são automaticamente fonte de verdade.

**Por quê:** projetos evoluem; o portfólio anterior contém descrições e versões potencialmente desatualizadas.

**Consequência:** cada case deve ser revalidado contra o projeto real antes de publicar stack, cargo, métrica ou arquitetura.

**Revisar quando:** nunca; é regra de integridade de conteúdo.

---

## D-005 — Multi-pet Care como display name provisório

**Status:** temporary

**Decisão:** o case do CatCare aparece como `Multi-pet Care` até existir nome oficial do produto.

**Por quê:** o sistema suporta diferentes pets e o nome CatCare comunica um escopo mais restrito do que o produto real.

**Consequência:** `id`, repo e live URL continuam CatCare. O nome público deve poder ser trocado em um único ponto.

**Revisar quando:** a marca oficial do produto for definida.

---

## D-006 — Visual / Inspect é interação assinatura

**Status:** accepted

**Decisão:** Multi-pet Care possui duas lentes do mesmo produto: experiência visual e engenharia.

**Por quê:** a interface prova frontend; o modo Inspect prova arquitetura, domínio, autorização, RLS e código.

**Consequência:** não usar flip 3D ou espetáculo gratuito. A transição deve comunicar mudança de perspectiva.

**Revisar quando:** após testes reais com recrutadores/usuários.

---

## D-007 — Cada sistema tem comportamento próprio

**Status:** accepted

**Decisão:** IML, RELPREV e Registro não usam um `ProjectCard` visual genérico.

**Por quê:** cada sistema deve provar um tipo diferente de raciocínio técnico.

- IML: pipeline.
- RELPREV: resiliência e mudança de estado.
- Registro: relações e contexto.

**Consequência:** pode haver infraestrutura compartilhada, mas não apresentação visual idêntica.

**Revisar quando:** se um novo case não acrescentar nova evidência técnica.

---

## D-008 — Portfolio AI com busca local obrigatória

**Status:** accepted

**Decisão:** a LLM enriquece, mas não substitui a busca local determinística.

**Por quê:** o portfólio deve continuar útil sem provider, quota ou rede externa; respostas também precisam apontar para evidência real.

**Consequência:** nenhum vector DB/RAG nesta fase. A busca local é compartilhada com Command Palette.

**Revisar quando:** apenas se a base de conteúdo crescer a ponto de a busca atual perder qualidade mensurável.

---

## D-009 — Sem emojis e sem Unicode decorative arrows

**Status:** accepted

**Decisão:** não usar emojis nem caracteres como `↗`, `↘`, `→`, `↓` como decoração de interface.

**Por quê:** eles estavam reforçando aparência de template e não pertencem à direção visual final.

**Consequência:** links comunicam interatividade por tipografia/hover; diagramas usam CSS/SVG para conectores.

**Revisar quando:** não previsto.

---

## D-010 — Paleta light atual é base, não versão final

**Status:** exploring

**Decisão:** manter temporariamente creme + ameixa/roxo + azul enquanto uma paleta de maior profundidade é explorada.

**Por quê:** a direção clara/editorial funciona, mas ainda pode ganhar contraste, densidade e personalidade.

**Próxima exploração:** roxo mais profundo, berry/vinho controlado, indigo e superfícies técnicas mais densas, sem neon/glow.

**Revisar quando:** no próximo visual polish sprint.

---

## D-011 — Tipografia atual está em avaliação

**Status:** exploring

**Decisão atual:** Geist + Syne + Fraunces + Geist Mono.

**Problema:** a combinação ainda não está visualmente aprovada; nem toda fonte está contribuindo para uma identidade coesa.

**Critério futuro:** máximo de 2 famílias principais + mono; display com personalidade de engenharia/editorial sem estética de moda/luxo.

**Revisar quando:** no próximo visual polish sprint.

---

## D-012 — Dark mode será token-based

**Status:** planned

**Decisão:** adicionar tema escuro por tokens semânticos, não duplicando CSS nem simplesmente invertendo cores.

**Por quê:** light e dark precisam parecer duas expressões do mesmo sistema visual.

**Direção:** fundo quase preto/ameixa, texto off-white e accents profundos; respeitar contraste e identidade dos cases.

**Revisar quando:** após consolidar a nova paleta e tipografia.

---

## D-013 — Motion deve ter função

**Status:** accepted

**Decisão:** animação existe para mostrar estado, relação, progressão ou profundidade.

**Manter:** Visual/Inspect, pipeline IML, RELPREV online/offline, relações Registro, Command Palette, AI result transition.

**Evitar:** fade-up universal, blobs, partículas, tilt 3D gratuito, parallax decorativo e cursor customizado invasivo.

**Revisar quando:** no polish de motion/performance.

---

## D-014 — V3 continua isolada até pré-lançamento completo

**Status:** accepted

**Decisão:** `/v3` permanece noindex e a home antiga continua ativa até auditoria factual, visual, IA, a11y, responsive, SEO e conteúdo final.

**Por quê:** evita colocar uma versão incompleta na frente de recrutadores e mecanismos de busca.

**Revisar quando:** checklist de produção estiver completo.

---

## Template para novas decisões

```md
## D-XXX — Título

**Status:** proposed | exploring | accepted | temporary | deprecated

**Decisão:**

**Por quê:**

**Consequência:**

**Revisar quando:**
```
