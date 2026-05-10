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

## Governança de skills

- Versão ativa do pacote de skills: `4.4.0`.
- A skill `front-ux-ui-design` orienta criação e melhoria de interfaces frontend/UI/UX com exatamente 3 propostas visuais com links clicáveis antes de implementação.
- Documentação sincronizada em `doc_skills/readme.md` e `doc_skills/skills-workflow-guide.html`.

## Páginas entregues

- `/works`
- `/about`
- `/` redireciona para `/works`

## Experiência visual (fase 2)

- Cena 3D procedural em tempo real com Three.js.
- Pós-processamento com bloom para reforço neon/cyber.
- HUD visual com camadas de scanline, ruído e glitch.
- Câmera com animação dinâmica e resposta ao mouse.
- Rail de projetos com transições cinematográficas.

## Experiência visual (fase 3)

- Reflexo de piso em tempo real para profundidade de cena.
- Pós-processamento avançado com bloom, afterimage, film grain e RGB shift.
- HUD com camada cromática adicional.
- Sequenciador visual de projetos inspirado na referência.

## Experiência visual (fase benchmark Samsy)

- Benchmark documentado em `docs/benchmark-samsy-ninja.md`.
- Direção visual inspirada em `https://samsy.ninja/`, sem copiar assets, código ou marca da referência.
- UI global mais mínima, com preto dominante e vermelho `#ff0033` como acento principal.
- Menu superior reduzido ao escopo do projeto: apenas `WORKS / ABOUT`.
- Página **Works** reorganizada como palco visual central com vídeo principal, ações `INFOS`/`VISIT`, controle `Next / Prev`, sequenciador inferior e navegação global por setas do teclado.
- Works agora usa movimento global de mouse com inclinação/deslocamento perceptível no painel ativo, múltiplos painéis de fundo em camadas, chuva vertical discreta, luzes vermelhas/cyan e piso preto glossy com reflexos borrados.
- O painel principal de **Works** agora é um `<video>` limpo por projeto, configurado para rodar sem som em `autoplay`, `loop` e `playsinline`, sem efeitos decorativos internos sobre a mídia.
- As barras/bolas inferiores globais foram removidas porque não fazem parte do comportamento desejado para a referência.
- Os vídeos reais devem ser colocados em `public/videos/` com os nomes configurados em `src/data/works.js`.
- Página **About** convertida para um `operator dossier`, com posicionamento principal à esquerda e painéis técnicos escaneáveis à direita.

## Ajuste responsivo conservador

- Breakpoints intermediários adicionados para telas equivalentes a notebook 13", preservando a identidade visual atual.
- `Works` teve HUD, menu, intro e stage recalibrados para evitar colisão entre overlays.
- `About` teve título, coluna principal e painéis laterais reequilibrados para evitar palavras sobrepostas.
- Escopo limitado a tamanhos, larguras e espaçamentos, sem mudança de conteúdo.

## Ajuste pontual de Works

- `Works` recebeu compactação do entorno do `works-rail` para reduzir a necessidade de scroll vertical.
- O ajuste foi limitado a `padding`, altura mínima do stage e posição dos controles inferiores.
- `About` permaneceu inalterado nesse incremento.

## Rebalanceamento de About

- `About` recebeu redução de altura útil para diminuir a necessidade de scroll vertical.
- O ajuste foi concentrado no tamanho do título, no grid dos boxes técnicos e na área editorial.
- `Works` permaneceu inalterado nesse incremento.

## Ajuste fino de About

- Os 4 boxes técnicos foram reduzidos novamente e reposicionados mais para cima.
- O bloco principal do título ganhou mais respiro superior para descer um pouco na composição.
- `Works` continuou sem alterações nesse refinamento.

## Background cyber avenue

- O fundo base agora usa uma cena 3D de avenida cyber com skyline neon, profundidade urbana e terminais laterais exibindo códigos coloridos animados.
- A parte inferior do cenário recebeu um piso glossy reflexivo com linhas de fuga luminosas para reforçar a leitura de rua futurista.
- O shell ganhou uma intro cinematográfica curta antes de revelar a interface principal.


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
public/
  videos/
Dockerfile
nginx.conf
docs/
  benchmark-samsy-ninja.md
PRD.md
Spec.md
```

## Favicon

- Favicon vetorial transparente em `public/favicon.svg`, usando `GBRL` com a mesma direção cromática principal da home (`#ff0033`).

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
