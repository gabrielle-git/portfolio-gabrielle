# Portfolio V3 — Living Handbook

> Documento vivo. Atualizar junto com o código sempre que uma decisão estrutural, visual, de conteúdo ou de produto mudar.

## 1. Objetivo do projeto

O portfólio não é tratado como uma landing page estática. Ele é um produto demonstrativo cujo comportamento deve evidenciar capacidade de frontend, enquanto os cases evidenciam backend, arquitetura, automação, dados, segurança e raciocínio de sistemas.

Princípio central:

**A experiência prova frontend. Os cases provam backend.**

O público principal é composto por recrutadores de tecnologia, engineering managers e pessoas avaliando vagas de backend, full stack, automação, DevOps e sistemas.

A percepção desejada é: **“ela constrói sistemas”**, não apenas “ela faz interfaces bonitas”.

## 2. Estado atual

- Repositório: `gabrielle-git/portfolio-gabrielle`
- Branch de trabalho: `feat/portfolio-v3`
- Rota de preview: `/v3`
- A V3 continua `noindex` enquanto estiver em construção.
- A home legada continua preservada até a V3 passar pela auditoria final.

Ordem atual da V3:

1. Header
2. Hero
3. Featured Case — Multi-pet Care
4. Selected Systems — IML, RELPREV e Registro
5. Experience
6. About
7. Ask My Portfolio
8. Contact
9. Under the Hood
10. Footer

## 3. Stack atual

### Aplicação

- Next.js 16
- React 19
- TypeScript
- CSS Modules
- CSS Custom Properties / design tokens
- Framer Motion
- Vercel

### Portfolio AI

- Route Handler server-side
- busca local determinística sobre `src/content`
- OpenRouter como enriquecimento opcional
- fallback local obrigatório quando o provider estiver indisponível

### Legado ainda presente no repositório

O `package.json` ainda contém dependências utilizadas pelo portfólio antigo, incluindo Three.js / React Three Fiber, tsParticles e Lenis. Elas não devem ser consideradas automaticamente parte da arquitetura V3. Antes do lançamento final, verificar se entram no bundle da V3 e remover ou isolar apenas quando a home antiga deixar de depender delas.

## 4. Arquitetura de conteúdo

A V3 evita conteúdo técnico hardcoded diretamente nos componentes.

A fonte principal é `src/content/`.

Objetivo da source of truth:

- alimentar a Home;
- alimentar os cases;
- alimentar a busca local;
- alimentar o Ask My Portfolio;
- alimentar o Command Palette;
- reduzir divergência entre UI e respostas da IA.

Regra de conteúdo:

**O portfólio antigo não é fonte primária de verdade.**

Claims de cargo, senioridade, stack, resultado, métrica, segurança ou arquitetura devem ser conferidos contra o projeto real, documentação confiável ou outro registro verificável antes de serem expostos publicamente.

## 5. Arquitetura da Portfolio AI

Fluxo conceitual:

```text
src/content
   |
   v
local search
   |
   +----> resultado determinístico / fallback
   |
   v
LLM enrichment (OpenRouter)
   |
   v
resposta curta + referências internas
```

Decisões:

- não usar vector database neste estágio;
- não usar embeddings/RAG sem necessidade comprovada;
- não deixar a LLM ser a única forma de navegar;
- não expor model IDs, provider errors, stack traces ou secrets ao cliente;
- perguntas devem deep-linkar para evidência real no portfólio.

Exemplos de intenção:

- `RLS` -> Multi-pet Care / Registro
- `Python` -> IML
- `offline` -> RELPREV
- `backend` -> cases com maior evidência de backend
- `automation` -> IML e experiências correlatas

## 6. Estratégia dos cases

Os cases não devem compartilhar uma única apresentação genérica.

### Multi-pet Care

Função no portfólio: provar produto full stack e regras de autorização.

Interação assinatura: **Visual / Inspect**.

- Visual: janela fiel ao produto real.
- Inspect: arquitetura, domínio, RLS, roles e código técnico verificável.

Nome de exibição atual `Multi-pet Care` é provisório. O `id`, repositório e URL continuam ligados ao projeto CatCare até existir nome oficial.

### IML

Função: provar Python, automação, processamento de documentos, regras determinísticas, auditoria e contexto de rede/filesystem.

Visual: pipeline interativo de processamento de documentos.

Não expor caminhos de rede, matrículas, nomes, dados institucionais ou conteúdo sensível.

### RELPREV

Função: provar resiliência operacional e arquitetura offline-first.

Visual: mudança de estado ONLINE / OFFLINE / RESTORE, mostrando continuidade da operação.

### Registro

Função: provar modelagem de domínio, relações, Auth, PostgreSQL e RLS.

Visual: navegação entre hierarquia, pessoas, entradas e contexto.

## 7. Sistema visual atual

### Direção

- editorial + engenharia;
- feminina sem estereótipos;
- tecnológica sem estética cyber/terminal;
- superfícies planas;
- hairlines;
- radius baixo;
- pouca decoração gratuita;
- nenhuma linguagem de “template SaaS” genérico.

### Paleta atual — light

Base atual definida em `src/styles/v3-tokens.css`:

- background principal: creme muito claro;
- ink: ameixa quase preta;
- accent principal: roxo profundo;
- accent secundário: azul;
- status: sage;
- inspect: superfície escura própria.

A paleta atual é uma base, não uma decisão final. Próxima exploração visual deve buscar **mais profundidade tonal**, contraste e personalidade sem voltar para neon/glow/cyber.

### Próxima exploração de cores

Objetivo:

- manter o creme como identidade possível no modo claro;
- tornar o roxo mais profundo e menos “pastel”;
- adicionar um tom vinho/berry ou indigo profundo como contraste editorial;
- permitir superfícies pontuais mais densas nos cases;
- evitar arco-íris de cores por seção.

As alterações devem acontecer via tokens, não via cores hardcoded espalhadas.

## 8. Tipografia

Estado atual:

- Geist — body/interface;
- Geist Mono — conteúdo técnico/mono;
- Syne — display geométrico;
- Fraunces — serif editorial.

A combinação ainda está em avaliação. Fraunces e/ou Syne podem ser substituídas se a hierarquia visual continuar parecendo genérica ou se a serif parecer inadequada à identidade desejada.

Critério para próxima escolha:

- display deve ter personalidade sem parecer portfolio de moda/luxo;
- body deve ser muito legível;
- mono deve ser usada apenas onde a informação é realmente técnica;
- no máximo 3 famílias ativas na experiência final, preferencialmente 2 + mono.

## 9. Dark mode — direção planejada

Dark mode deve ser um tema real, não apenas `filter` ou inversão da página clara.

Implementação desejada:

```text
semantic tokens
   |
   +-- light theme
   |
   +-- dark theme
```

A UI não deve duplicar arquivos CSS por tema.

Tokens semânticos sugeridos:

- `--surface-page`
- `--surface-raised`
- `--surface-technical`
- `--text-primary`
- `--text-muted`
- `--border-subtle`
- `--accent-primary`
- `--accent-secondary`

Dark mode desejado:

- preto/ameixa quase preto, não preto puro em todas as superfícies;
- roxo/berry/indigo saturado com controle;
- texto quente/off-white;
- diagramas mantendo contraste WCAG;
- cases de produto preservando a identidade visual do produto quando apropriado.

Preferência futura: toggle explícito + `prefers-color-scheme` como default inicial, persistindo escolha localmente.

## 10. Motion e efeitos

Princípio: **efeito só permanece se comunicar estado, relação ou profundidade.**

Aprovado conceitualmente:

- Visual / Inspect;
- progressão do pipeline IML;
- mudança ONLINE/OFFLINE do RELPREV;
- exploração de relações no Registro;
- Command Palette;
- transições discretas da Portfolio AI;
- linhas/conectores técnicos em CSS/SVG.

Evitar:

- fade-up universal;
- blobs;
- glow gratuito;
- tilt 3D sem função;
- partículas;
- parallax apenas decorativo;
- cursor customizado que atrapalhe usabilidade;
- emojis e Unicode decorative arrows.

Efeitos a explorar posteriormente:

- line-drawing de arquitetura ao entrar em viewport;
- spotlight muito sutil em superfícies técnicas;
- shared-layout transition entre resumo e detalhe de um case;
- microinteração de foco em nós de diagrama;
- scroll progress discreto para cases longos;
- mudança de tema com transição curta e `prefers-reduced-motion` respeitado.

## 11. Acessibilidade

Obrigatório:

- teclado completo;
- foco visível;
- `prefers-reduced-motion`;
- sem overflow horizontal;
- contraste adequado em light/dark;
- controles com semântica correta;
- diagramas com nome/descrição acessível quando necessário.

Acessibilidade não é etapa de acabamento; faz parte dos componentes desde a implementação.

## 12. O que NÃO fazer

- inventar métricas;
- inventar cargos;
- usar cargo informal como se fosse vínculo formal;
- expor informações institucionais sensíveis;
- transformar todos os projetos em cards iguais;
- usar badge clouds como substituto de narrativa;
- criar terminal fake;
- usar emojis como iconografia;
- usar Unicode arrows como decoração;
- depender da IA para navegação básica;
- trocar stack apenas por novidade.

## 13. Processo de trabalho

Fluxo desejado para alterações relevantes:

1. identificar problema/objetivo;
2. registrar decisão no `docs/DECISION-LOG.md`;
3. implementar na branch;
4. testar visual + teclado + reduced motion;
5. atualizar este Handbook se a arquitetura ou regra global mudou;
6. só então promover para produção.

## 14. Checklist para adicionar um novo projeto

Antes de inserir um case:

- [ ] repositório/projeto real foi auditado;
- [ ] stack foi confirmada;
- [ ] claims técnicos foram confirmados;
- [ ] métricas possuem fonte ou foram removidas;
- [ ] dados sensíveis foram sanitizados;
- [ ] existe uma razão clara para o projeto estar no portfólio;
- [ ] a apresentação visual demonstra algo diferente dos cases existentes;
- [ ] o conteúdo entrou em `src/content`;
- [ ] local search encontra o case pelos termos técnicos relevantes;
- [ ] Portfolio AI pode referenciar o case sem inventar contexto.

## 15. Próximas frentes

1. content truth audit completo;
2. revisão visual consolidada;
3. experimentar paleta mais profunda;
4. revisar a dupla Syne/Fraunces;
5. implementar dark mode por tokens;
6. testar OpenRouter real no preview;
7. colocar foto real;
8. escolher CV público genérico;
9. SEO/OG final;
10. migrar V3 para `/` somente após aprovação final.
