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
