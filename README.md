# Portfolio Pessoal - Gabriel Lima

Portfólio visual construído em Vue 3 com foco nas páginas **Works** e **About**, inspirado na direção estética aprovada (fundo imersivo, tipografia forte e contraste alto).

## Objetivo

Apresentar os projetos de Gabriel Lima em uma experiência web moderna, responsiva e pronta para deploy em VPS via Docker.

## Stack

- **Frontend**: Vue 3, Vue Router, Vuex
- **Visual/Motion**: Three.js, GSAP
- **Build**: Vite
- **Qualidade**: Vitest, Vue Test Utils, ESLint
- **Deploy**: Docker + Nginx (SPA fallback)

## Páginas entregues

- `/works`
- `/about`
- `/` redireciona para `/works`

## Conteúdo atual (fase 1)

- **Sobre**: informações profissionais de Gabriel de Souza Lima (arquitetura de soluções, IA, integrações e automação).
- **Projetos exibidos**:
  - **Lima Retratos**
    - Front: https://limaretratos.flowstechai.com/
    - Docs API: https://docs.limaretratos.flowstechai.com/
    - Skills: https://skills.limaretratos.flowstechai.com/
  - **SDR Virtual (IA Conversacional - Proposta Completa)**
    - Projeto: https://sdr.flowstechai.com/

## Estrutura principal

```text
src/
  components/
    BackgroundCanvas.vue
    TopMenu.vue
    WorksRail.vue
  data/
    works.js
  router/
    index.js
  store/
    index.js
  styles/
    main.css
  views/
    AboutView.vue
    WorksView.vue
  App.vue
  main.js
tests/
  app.spec.js
  router.spec.js
Dockerfile
nginx.conf
PRD.md
Spec.md
```

## Requisitos

- Node.js 22+
- npm 10+
- Docker (opcional para execução containerizada)

## Executar localmente

```bash
npm install
npm run dev
```

Aplicação: `http://localhost:5173`

## Qualidade

```bash
npm run lint
npm run test
npm run build
```

## Build e execução com Docker

```bash
docker build -t portfolio-gabriel:latest .
docker run --rm -p 8080:80 portfolio-gabriel:latest
```

Aplicação em container: `http://localhost:8080`

## Segurança (Nginx)

Configuração inclui headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `Content-Security-Policy` básica para site estático

## Observações de escopo

- Não há backend nesta fase.
- Não há banco de dados/cache nesta fase.
- O conteúdo dos projetos é estático em `src/data/works.js`.

## Licença

Uso privado do projeto de portfólio.
