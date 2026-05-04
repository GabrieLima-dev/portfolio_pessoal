# Spec - Portfolio Fase 1

> Objetivo: traduzir `PRD.md` aprovado em plano técnico executável e auditável.

## 1. Escopo Técnico

- PRD de origem: `PRD.md`
- Objetivo técnico:
  - Construir SPA Vue 3 com rotas `works/about`, direção visual inspirada na proposta 1 aprovada, testes automatizados, lint, build e deploy containerizado.
- Fora de escopo técnico:
  - Backend, banco/cache, autenticação, CMS.
  - Páginas adicionais além de `works` e `about`.

## 2. Matriz de Rastreabilidade (PRD -> Spec)

1. Requisito PRD: RF-01 Navegação Works/About
- Arquivo(s) alvo:
  - `src/App.vue`
  - `src/components/TopMenu.vue`
  - `src/router/index.js`
- Mudança proposta:
  - Layout base com menu fixo e estados ativos por rota.
- Critério de validação associado:
  - Teste unitário valida links e classe ativa.

2. Requisito PRD: RF-02 Página Works
- Arquivo(s) alvo:
  - `src/views/WorksView.vue`
  - `src/components/WorksRail.vue`
  - `src/data/works.js`
- Mudança proposta:
  - Renderizar lista interativa de projetos com destaque visual e navegação interna por cards.
- Critério de validação associado:
  - Teste unitário confirma renderização de projetos.

3. Requisito PRD: RF-03 Página About
- Arquivo(s) alvo:
  - `src/views/AboutView.vue`
- Mudança proposta:
  - Estruturar bloco institucional com texto e links públicos.
- Critério de validação associado:
  - Teste unitário confirma título e resumo renderizados.

4. Requisito PRD: RF-04 Redirecionamento inicial
- Arquivo(s) alvo:
  - `src/router/index.js`
  - `tests/router.spec.js`
- Mudança proposta:
  - Configurar rota `/` para redirecionar em SPA para `/works`.
- Critério de validação associado:
  - Teste de roteamento em memória.

5. Requisito PRD: RF-05 Deploy em VPS
- Arquivo(s) alvo:
  - `Dockerfile`
  - `nginx.conf`
  - `.dockerignore`
- Mudança proposta:
  - Build multi-stage e Nginx com fallback SPA + headers de segurança.
- Critério de validação associado:
  - `docker build` concluindo sem erro.

## 3. Mudanças por Arquivo

1. `package.json`
- O que mudar: definir scripts (`dev`, `build`, `lint`, `test`), dependências Vue/Three/GSAP e ferramentas de qualidade.
- Por que mudar: habilitar ciclo completo de desenvolvimento e validação.
- Risco de regressão: baixo (novo projeto).
- Mitigação: versões estáveis e testes de instalação/build.

2. `vite.config.js`, `index.html`
- O que mudar: configurar Vite + plugin Vue + ambiente de teste.
- Por que mudar: base do frontend e integração de testes.
- Risco de regressão: baixo.
- Mitigação: validação com `npm run build` e `npm run test`.

3. `src/main.js`, `src/App.vue`, `src/router/index.js`, `src/store/index.js`
- O que mudar: bootstrap da SPA, roteador, store, layout global e camada visual de fundo.
- Por que mudar: cumprir navegação, estado global e identidade visual.
- Risco de regressão: médio (roteamento/estado).
- Mitigação: testes de rota e smoke tests de render.

4. `src/components/*`, `src/views/*`, `src/styles/main.css`, `src/data/works.js`
- O que mudar: componentes visuais, páginas `works/about`, dataset inicial e estilos responsivos.
- Por que mudar: implementar experiência do usuário final.
- Risco de regressão: médio (responsividade/performance).
- Mitigação: validação manual em breakpoints e revisão de CSS.

5. `tests/*.spec.js`
- O que mudar: criar testes antes da implementação (TDD) para rotas e render principal.
- Por que mudar: garantir comportamento mínimo obrigatório.
- Risco de regressão: baixo.
- Mitigação: manter testes pequenos, objetivos e estáveis.

6. `Dockerfile`, `nginx.conf`, `.dockerignore`
- O que mudar: construir e servir app em VPS com fallback SPA.
- Por que mudar: prontidão de deploy.
- Risco de regressão: médio (config de roteamento no servidor).
- Mitigação: regra `try_files` e teste de build Docker.

7. `README.md`
- O que mudar: documentação operacional completa (rodar, testar, buildar, deployar).
- Por que mudar: requisito de documentação pública.
- Risco de regressão: baixo.
- Mitigação: revisão final sem segredos.

## 4. Regras de Implementação

- Simplicidade primeiro.
- Reaproveitar padrões existentes.
- Proibir escopo paralelo.
- Registrar desvio quando necessário.
- Aplicar TDD: escrever testes alvo primeiro (red), implementar (green), ajustar estrutura (refactor).

## 5. Cenários de Validação

- Cenário 1 (sucesso):
  - Navegação entre `works` e `about` com render correto.
- Cenário 2 (erro/limite):
  - Acesso em `/` redireciona para `/works`.
- Cenário 3 (regressão):
  - Build e lint passam após ajustes visuais.
- Evidências esperadas por cenário:
  - Saídas de `npm run test`, `npm run lint`, `npm run build` e `docker build`.

## 6. Critérios de Pronto (Fase 2 -> Fase 3)

1. Cada requisito do PRD está mapeado para arquivo.
2. Há cenários de validação suficientes.
3. Há plano de mitigação para regressões relevantes.
4. Spec está pequena/incremental e executável em uma entrega.

## 7. Spec - Fase Benchmark Samsy

### Escopo técnico

- Origem: `PRD.md` seção 9 e `docs/benchmark-samsy-ninja.md`.
- Objetivo técnico: refatorar camada visual de `Works` e `About` para uma experiência mais fiel ao benchmark, mantendo stack atual.
- Fora de escopo:
  - Copiar assets, logos, textos, shaders ou código do `samsy.ninja`.
  - Introduzir nova biblioteca de UI.
  - Criar backend, CMS ou novas páginas.

### Mudanças planejadas

1. Navegação e shell visual
- Arquivos alvo: `src/App.vue`, `src/components/TopMenu.vue`, `src/styles/main.css`.
- Mudança: reduzir leitura de dashboard, usar somente menu `WORKS / ABOUT`, remover barras/bolas HUD inferiores globais e reforçar preto/vermelho.
- Validação: teste confirma `WORKS`/`ABOUT`, ausência de `EXPLORE` e ausência de `.hud-bars`.

2. Works
- Arquivos alvo: `src/views/WorksView.vue`, `src/components/WorksRail.vue`, `src/styles/main.css`.
- Mudança: transformar o conteúdo em palco central com media visual dominante, título sobreposto, ações `INFOS`/`VISIT`, controle `Next / Prev`, sequenciador inferior, navegação global por teclado, inclinação/deslocamento global por mouse, múltiplos painéis de fundo em túnel animado, gotas verticais discretas e piso preto glossy com reflexos do painel principal e dos painéis de fundo.
- Validação: teste confirma stage visual, ações, renderização dos projetos, no mínimo oito painéis de fundo, gotas no DOM, piso refletivo, reflexos dos painéis, navegação por setas no `document` e alteração das variáveis de inclinação por mouse.

2.1. Painel principal de vídeo limpo
- Arquivos alvo: `src/components/WorksRail.vue`, `src/data/works.js`, `src/styles/main.css`, `tests/app.spec.js`.
- Mudança: substituir a mídia sintética interna do painel central por `<video>` real com `autoplay`, `muted`, `loop`, `playsinline` e `preload="metadata"`, usando caminhos configurados em `works.js`.
- Comportamento antes: painel central usava gradientes, labels e códigos visuais como simulação de mídia.
- Comportamento depois: painel central renderiza vídeo limpo do projeto ativo, sem rótulos decorativos internos; efeitos de cenário externos permanecem fora do vídeo.
- Validação: teste automatizado confirma o contrato do `<video>` e a remoção dos elementos `.work-media-label` e `.work-media-code`.

3. About
- Arquivos alvo: `src/views/AboutView.vue`, `src/styles/main.css`.
- Mudança: remover card/painel e criar composição editorial aberta com texto vermelho, links discretos e créditos.
- Validação: teste confirma `about-editorial` e ausência do antigo `.about-content`.

4. Canvas e atmosfera
- Arquivo alvo: `src/components/BackgroundCanvas.vue`.
- Mudança: ajustar textos, cores e comportamento de câmera/iluminação por rota para Works/ About, mantendo fallback em ambiente de teste.
- Validação: build de produção e smoke tests.

5. Documentação
- Arquivos alvo: `PRD.md`, `Spec.md`, `README.md`.
- Mudança: registrar fase benchmark, decisões visuais, correções Works-first, restrição sem `EXPLORE`, assets pendentes e comandos de validação.
- Validação: revisão textual sem segredos.

### Incremento Works-first aprovado

- Autorização explícita do usuário: "Aprovado, pode corrigir Works primeiro".
- Escopo do incremento:
  - Remover `EXPLORE` do topo.
  - Remover barras/bolas inferiores globais.
  - Corrigir Works para parecer um ambiente de jogo: painel principal com perspectiva forte, painéis de fundo em camadas, piso preto glossy com reflexos borrados, luzes vermelhas/cyan e chuva vertical discreta.
  - Adicionar navegação por `ArrowLeft` e `ArrowRight` em listener global no `document`.
  - Fazer o painel principal inclinar e deslocar na direção do mouse com movimento global de ponteiro.
  - Refazer painéis de fundo como video wall/LEDs integrados ao cenário, evitando aparência de cards estáticos.
  - Registrar assets pendentes para vídeos/imagens dos painéis; por enquanto usar placeholders gerados em CSS/HTML.
- Fora de escopo do incremento:
  - Recriar About.
  - Baixar vídeos da internet.
  - Publicar/commit/push.

### TDD e validação

- Red: atualizar `tests/app.spec.js` para os novos contratos visuais antes da implementação.
- Green: implementar Vue/CSS até testes passarem.
- Refactor: ajustar CSS, responsividade, motion e build sem ampliar escopo.
- Comandos planejados: `npm run test`, `npm run lint`, `npm run build`.

### Incremento vídeo limpo aprovado

- Autorização explícita do usuário: "Pode iniciar a execução: backend não altera, frontend é portfolio_pessoal, docs pode atualizar."
- Escopo do incremento:
  - Renderizar o painel principal como vídeo mudo em loop.
  - Manter o vídeo sem efeitos decorativos internos.
  - Registrar caminhos de assets em `src/data/works.js`.
  - Atualizar README com o local esperado dos vídeos reais.
- Fora de escopo:
  - Criar ou baixar o vídeo final do produto.
  - Alterar backend.
  - Publicar/commit/push.
