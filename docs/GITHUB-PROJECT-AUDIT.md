# GitHub Project Audit — Portfolio Readiness

> Auditoria inicial dos repositórios mais relevantes para a vitrine pública e para os cases da V3. Atualizar quando um README, arquitetura ou estado do projeto mudar.

## Escala

- **KEEP / PIN** — já funciona bem como vitrine.
- **POLISH** — bom projeto; documentação precisa de pequenos ajustes.
- **UPDATE NOW** — projeto forte, mas README atual transmite informação desatualizada.
- **VERIFY** — claims importantes ainda precisam ser validados no código.
- **LEGACY / ARCHIVE LATER** — não usar como fonte atual.

## 1. Perfil `gabrielle-git/gabrielle-git`

**Status:** UPDATE NOW

### Problema

O README do perfil ainda posiciona Gabrielle principalmente como “Analista de Sistemas & Estudante de Engenharia de Software”, enfatizando Make.com, Spring MVC, Bootstrap, jQuery, CloudSim e ferramentas que não representam mais a melhor vitrine do trabalho atual.

### Ação recomendada

Reescrever o profile README em torno de:

- backend / systems / automation;
- Python;
- APIs;
- Auth / RLS / PostgreSQL;
- offline-first;
- IA aplicada com fallback determinístico;
- projetos principais com links reais;
- formação sem transformar o README em currículo completo.

Evitar linguagem genérica como “apaixonada por tecnologia”.

## 2. `CatCare`

**Status:** UPDATE NOW

### Pontos fortes

- projeto público e ativo;
- multi-pet;
- Next.js + Supabase;
- Auth;
- PostgreSQL;
- RLS;
- households;
- papéis owner/caregiver/viewer;
- storage privado;
- domínio rico (saúde, peso, neonatal, despesas, compras, memórias etc.).

### Problemas do README atual

1. Título ainda é `CatCare — versão Codex`.
2. Descrição ainda fala em “vários gatos”, apesar do produto já ter sido generalizado para pets.
3. A seção de setup lista apenas migrations `0001` a `0006`, enquanto o repositório já possui muitas migrations posteriores.
4. “Próximos cortes” inclui funcionalidades que já existem ou evoluíram.
5. O README ainda contém contexto operacional de desenvolvimento (`porta 3100`, pasta separada, “versão Codex”) que não pertence à vitrine pública.
6. `package.json` ainda usa várias dependências como `latest`, reduzindo reprodutibilidade do projeto.

### Ação recomendada

Depois do feature freeze:

- reescrever README do zero;
- usar o nome oficial futuro do produto;
- adicionar screenshot real;
- explicar problema, arquitetura, modelo multi-household, autorização, RLS e Storage;
- adicionar diagrama ERD/C4 sanitizado;
- documentar setup por migration runner/CLI em vez de manter lista manual que envelhece;
- adicionar testes e CI antes de vendê-lo como case final de segurança;
- fixar versões das dependências.

## 3. `registro`

**Status:** POLISH

### Pontos fortes

O README já explica bem:

- problema real;
- modelo de domínio;
- Setor/Pessoa/Entrada;
- hierarquia;
- Supabase + RLS;
- decisões arquiteturais;
- live demo.

### Divergências atuais

O README ainda cita:

- Vite 6, enquanto o `package.json` atual usa Vite 8;
- uma decisão de formulários “sem React Hook Form”, mas o `package.json` atual já inclui `react-hook-form`, `@hookform/resolvers` e `zod`;
- o link da autora está com Markdown duplicado/malformado.

O `package.json` atual também já inclui TanStack Query, que não aparece na stack documentada.

### Ação recomendada

- atualizar stack real;
- revisar a seção “Decisões arquiteturais” contra o código atual;
- corrigir link da autora;
- adicionar screenshot/diagrama do modelo de relações;
- considerar testes automatizados e CI, pois hoje não há script de teste no `package.json`.

## 4. `nutriaprova`

**Status:** VERIFY + REWRITE

### Pontos fortes

O README comunica proposta de produto e papel da IA com validação profissional.

O projeto possui stack substancial no `package.json`, incluindo React, Vite, Supabase, TanStack Query, React Hook Form, Zod, Framer Motion, Vitest e diversos componentes Radix.

### Problemas

- README é mais material de marketing do que documentação técnica;
- não explica como executar localmente;
- não mostra arquitetura;
- não documenta testes apesar de existir Vitest;
- não apresenta segurança/autorização;
- não diferencia claramente claims verificáveis de posicionamento comercial;
- a integração Gemini citada no README precisa ser conferida no código atual antes de virar claim forte do portfolio.

### Ação recomendada

Reestruturar README em:

1. problema;
2. produto;
3. arquitetura;
4. fluxo paciente/nutricionista;
5. IA e limites;
6. dados/auth;
7. testes;
8. setup;
9. screenshots;
10. limitações.

Só publicar métricas de tempo, clientes ou impacto após fonte verificável.

## 5. `pe-atras`

**Status:** KEEP / PIN

### Pontos fortes

É atualmente o README mais completo da vitrine pública.

Ele documenta:

- problema real;
- arquitetura determinística + IA;
- fallback sem IA;
- rate limiting;
- testes;
- evals;
- métricas do classificador;
- privacidade/LGPD;
- limitações;
- setup;
- variáveis de ambiente;
- ADRs;
- build e deploy.

O `package.json` confirma Next.js, React e Vitest.

### Ação recomendada

- manter;
- talvez reduzir pequenas repetições do README em uma futura edição, sem perder a profundidade técnica;
- considerar esse repositório como referência de qualidade para reescrever os outros READMEs.

## 6. `automacao-arquivos-iml`

**Status:** UPDATE BEFORE PUBLIC / CASE SOURCE

### Pontos fortes

README demonstra bem:

- problema operacional;
- Python;
- PyMuPDF;
- filesystem/rede;
- idempotência;
- validação;
- máquina de estado;
- auditabilidade;
- impacto horas -> segundos.

### Problemas

- repositório é privado, mas README contém detalhes institucionais que não devem migrar para um case público sem sanitização;
- há exemplo de caminho de rede corporativa;
- há matrícula da autora no README;
- o README diz `5.2.3-STABLE`, enquanto existe uma versão posterior 5.3.0-FINAL fora deste estado do repo;
- o texto diz que o código foi publicado em portfólio pessoal, mas o repositório atualmente é privado.

### Ação recomendada

- manter privado enquanto houver conteúdo institucional;
- atualizar repo para a versão final real antes de tratá-lo como source of truth;
- remover/sanitizar caminho de rede, matrícula e qualquer dado institucional desnecessário;
- preparar case público sanitizado, não necessariamente abrir o source completo;
- usar arquitetura e snippets conceituais sem dados reais.

## 7. `PetControl`

**Status:** LEGACY / ARCHIVE LATER

### Motivo

É uma linha anterior do produto de cuidados de pets. O README descreve arquitetura baseada em `app_states` JSONB, modo local e um conjunto de dados específicos que não representam a arquitetura atual usada pelo CatCare.

### Ação recomendada

- não usar como source of truth do case atual;
- manter privado por enquanto;
- arquivar ou marcar explicitamente como legado quando CatCare receber nome oficial e documentação final.

## Ordem de prioridade

1. **Profile README** — corrigir primeiro; é a porta de entrada do GitHub.
2. **CatCare README** — projeto estratégico e público, atualmente muito desatualizado.
3. **Registro README** — pequenos ajustes de stack/arquitetura.
4. **IML** — sincronizar versão e sanitizar antes de qualquer exposição pública.
5. **NutriAprova** — validar claims e reconstruir README técnico.
6. **Pé Atrás** — manter como referência; só polish opcional.
7. **PetControl** — tratar como legado.

## Padrão mínimo para repositórios públicos estratégicos

Todo projeto principal deveria ter:

- [ ] uma frase clara do problema;
- [ ] live demo quando possível;
- [ ] screenshot/GIF real;
- [ ] stack atualizada;
- [ ] arquitetura resumida;
- [ ] decisões técnicas relevantes;
- [ ] setup reproduzível;
- [ ] `.env.example` sem secrets;
- [ ] testes/validação documentados;
- [ ] limitações honestas;
- [ ] privacidade/segurança quando aplicável;
- [ ] link para portfolio;
- [ ] nenhuma métrica não verificável;
- [ ] nenhuma informação institucional ou pessoal que não precise ser pública.
