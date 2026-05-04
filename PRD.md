# PRD - Portfolio (Fase 1)

> Objetivo: converter pedido em requisito implementável com base no código real.

## 1. Contexto e Evidências

- Problema de negócio: não existe ainda um site de portfólio publicável para apresentar os projetos de Gabriel Lima com estética premium.
- Quem é impactado: Gabriel Lima (autor), recrutadores/clientes e visitantes do portfólio.
- Estado atual comprovado no código (arquivos + comportamento):
  - Repositório contém apenas governança/skills (`AGENTS.md`, `skills/`, `scripts/`).
  - Não existe frontend, backend, roteador, Dockerfile ou documentação de produto.
- Limitações técnicas observadas:
  - Projeto inicia do zero.
  - Necessário manter escopo limitado à fase 1 (`works` e `about`).

## 2. Objetivo da Entrega

- Resultado esperado (mensurável):
  - Aplicação Vue 3 funcional com rotas `/works` e `/about`.
  - Rota `/` redirecionando para `/works`.
  - Build, lint e testes automatizados passando.
  - Dockerfile + Nginx com fallback SPA para deploy em VPS.
  - README público completo, sem segredos.
- Valor esperado para usuário/negócio:
  - Portfólio pronto para publicação com linguagem visual alinhada à referência aprovada (proposta 1).
- Fora de escopo explícito:
  - Backend Java/Spring Boot.
  - Banco de dados, cache e autenticação.
  - CMS administrativo.
  - Outras páginas além de `works` e `about`.

## 3. Escopo Técnico Inicial

- Áreas do sistema envolvidas:
  - Frontend SPA (Vue + Router + Vuex).
  - Camada visual (layout, animações, fundo dinâmico).
  - Testes automatizados.
  - Containerização e documentação.
- Arquivos que devem ser lidos:
  - `AGENTS.md`
  - `skills/sdd-*/SKILL.md`
  - `skills/front-ux-ui-design/SKILL.md`
- Arquivos que podem ser alterados:
  - Arquivos novos de frontend, Docker, testes e README na raiz do projeto.
- Dependências/restrições:
  - Stack aprovada: Vue 3 + Vite + Vue Router + Vuex + Three.js + GSAP.
  - Páginas obrigatórias: `works` e `about`.
  - Entrega sem informações confidenciais.

## 4. Requisitos Funcionais

1. RF-01: Estrutura de navegação do portfólio
- Regra: a aplicação deve ter menu com acesso a `works` e `about`, destacando seção ativa.
- Evidência de validação: teste automatizado valida presença dos links e seleção correta por rota.

2. RF-02: Página Works
- Regra: exibir coleção de projetos com interação visual e detalhes curtos.
- Evidência de validação: teste automatizado confirma renderização da lista de projetos.

3. RF-03: Página About
- Regra: exibir texto institucional e links públicos do autor.
- Evidência de validação: teste automatizado confirma renderização de título e descrição.

4. RF-04: Roteamento principal
- Regra: `/` deve redirecionar para `/works`; `/about` deve abrir seção About.
- Evidência de validação: teste automatizado de roteamento.

5. RF-05: Deploy em VPS
- Regra: conter `Dockerfile` e configuração Nginx para servir SPA com fallback de rotas.
- Evidência de validação: build Docker local e validação de arquivos de infraestrutura.

## 5. Requisitos Não Funcionais

- Segurança:
  - Sem segredos no código/README.
  - Headers de segurança no Nginx (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP básica).
- Performance:
  - Interface fluida em desktop e móvel.
  - Bundle otimizado por Vite para produção.
- Confiabilidade:
  - Testes automatizados para rotas e render crítico.
  - Build reproduzível via Docker.
- Manutenibilidade:
  - Componentização Vue.
  - Código legível, escopo incremental e README com instruções.

## 6. Critérios de Aceitação (Testáveis)

1. Critério: Aplicação com páginas obrigatórias
- Como validar: executar aplicação e navegar em `/works` e `/about`.
- Resultado esperado: ambas páginas renderizam corretamente e menu alterna estado ativo.

2. Critério: Redirecionamento inicial
- Como validar: acessar `/`.
- Resultado esperado: redirecionamento automático para `/works`.

3. Critério: Qualidade local
- Como validar: executar `npm run lint`, `npm run test`, `npm run build`.
- Resultado esperado: comandos concluem com sucesso.

4. Critério: Prontidão de deploy
- Como validar: construir imagem via `docker build`.
- Resultado esperado: build da imagem sem erro com Nginx servindo SPA.

5. Critério: Documentação pública
- Como validar: revisar `README.md`.
- Resultado esperado: instruções completas sem exposição de segredo/token/credencial.

## 7. Premissas, Riscos e Dúvidas Abertas

- Premissas adotadas:
  - Fase 1 sem backend e sem persistência.
  - Conteúdo de projetos pode iniciar com dados estáticos.
  - Fidelidade visual será "alta inspiração" da referência aprovada, sem copiar assets proprietários.
- Riscos (com impacto):
  - Risco de escopo crescer para além de `works/about`.
  - Risco de performance se efeitos visuais forem excessivos.
  - Risco de regressão visual em mobile sem testes manuais por breakpoint.
- Dúvidas que bloqueiam fase 2:
  - Nenhuma dúvida bloqueante para iniciar Spec da fase 1.

## 8. Definição de Pronto para Fase 2 (PRD -> Spec)

- [x] Escopo e fora de escopo sem ambiguidade relevante.
- [x] Critérios de aceitação verificáveis.
- [x] Restrições técnicas documentadas.
- [x] Riscos críticos explicitados.

## 9. PRD - Fase Benchmark Samsy

> Objetivo: evoluir a experiência visual atual com base no benchmark documentado em
> `docs/benchmark-samsy-ninja.md`, preservando conteúdo próprio e sem copiar assets,
> marcas ou código proprietário da referência.

### Contexto e evidências

- Referência aprovada: `https://samsy.ninja/`.
- Documento base: `docs/benchmark-samsy-ninja.md`.
- Estado atual: o portfólio já possui Vue 3, Vite, Three.js, GSAP, rotas `/works` e `/about`,
  porém ainda se apresenta como uma UI de painel/card sobre um canvas.
- Lacuna principal: aproximar a experiência de um ambiente full-canvas com UI mínima,
  vermelho/preto dominante, palco visual em Works e About editorial sem card.

### Requisitos funcionais adicionais

1. RF-06: Menu superior reduzido ao escopo do projeto
- Regra: exibir somente `WORKS` e `ABOUT`, com estado ativo em pill vermelha. A aba `EXPLORE` da referência não deve ser clonada nesta fase.
- Evidência: teste de renderização confirma `WORKS`/`ABOUT` e ausência de `EXPLORE`.

2. RF-07: Works como palco visual
- Regra: a página Works deve apresentar o projeto ativo como media stage dominante, com ações `INFOS` e `VISIT`, e sequenciador inferior compacto.
- Evidência: teste confirma presença de `data-testid="work-stage-visual"`, ações e barras do sequenciador.

3. RF-08: About editorial imersivo
- Regra: a página About deve remover o card/painel central e renderizar texto aberto em composição editorial.
- Evidência: teste confirma presença de `data-testid="about-editorial"` e ausência de `.about-content`.

4. RF-09: Works com comportamento de ambiente/jogo
- Regra: o palco de Works deve responder ao movimento global do mouse com deslocamento e inclinação perceptíveis do painel ativo na direção do ponteiro; as setas esquerda/direita do teclado devem alternar entre projetos mesmo sem foco manual em botões.
- Evidência: teste automatizado valida navegação por teclado no `document` e mudança de variáveis CSS do painel por movimento real de mouse.

5. RF-10: Atmosfera Works sem elementos inventados
- Regra: remover barras/bolas inferiores globais; substituir linhas horizontais por gotas discretas descendo de cima para baixo, reforçar piso preto glossy/espelhado com reflexos borrados do painel principal e dos painéis de fundo, luzes vermelhas/cyan e múltiplos painéis de fundo em camadas animadas com estética fiel ao benchmark.
- Evidência: teste confirma ausência de `.hud-bars`, presença de gotas reais no DOM, no mínimo oito painéis de fundo, piso refletivo dedicado e reflexos dos painéis; screenshot valida chuva, reflexos e composição.

6. RF-11: Assets visuais sob demanda
- Regra: vídeos/imagens específicos de painéis devem ser solicitados ao usuário um por um antes de substituir placeholders, para evitar interpretação incorreta de vídeos como imagens estáticas.
- Evidência: documentação mantém lista de assets pendentes e próximos pedidos.

7. RF-12: Painel principal como vídeo limpo em loop
- Regra: o painel central do projeto ativo em Works deve renderizar um vídeo real, sem som, com reprodução automática, loop contínuo e `playsinline`; efeitos visuais decorativos internos ao painel não devem substituir ou cobrir o vídeo.
- Evidência: teste automatizado confirma presença de `data-testid="work-stage-video"` com `autoplay`, `muted`, `loop`, `playsinline` e ausência dos rótulos decorativos internos anteriores.

### Critérios de aceitação adicionais

- Preto e vermelho dominam a UI.
- Cyan/azul ficam restritos à atmosfera do canvas.
- Works não usa lista de cards como elemento principal.
- About não usa card envolvendo todo o conteúdo.
- A navegação não exibe `EXPLORE`.
- Works responde às setas do teclado.
- Works inclina/desloca o painel ativo na direção do mouse.
- Works não exibe barras/bolas inferiores globais.
- Works apresenta chuva discreta vertical, múltiplos painéis de fundo animáveis e piso preto refletivo/glossy.
- Painel central de Works exibe vídeo limpo em loop, sem som e sem efeitos internos decorativos.
- Layout continua navegável em desktop e mobile sem overflow horizontal.
- `npm run lint`, `npm run test` e `npm run build` concluem com sucesso.
