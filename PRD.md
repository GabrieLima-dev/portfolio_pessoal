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
