# Desafio: API Bancária Assíncrona com FastAPI

API RESTful assíncrona para operações bancárias simples com FastAPI, SQLite, JWT Bearer, frontend React e documentação OpenAPI.

## Funcionalidades

- Cadastro de usuário com conta corrente criada automaticamente.
- Login com token JWT Bearer.
- Depósito autenticado com validação de valor positivo.
- Saque autenticado com validação de saldo.
- Extrato autenticado com saldo atual e histórico de transações.
- Frontend React com Home institucional/documental Dbank, paginas separadas de login/cadastro, painel de conta e footer com links sociais.
- Dockerfile multi-stage para deploy em VPS com Docker/EasyPanel servindo API e Front juntos.

## Stack

- Python 3.12
- FastAPI
- SQLAlchemy async
- SQLite + aiosqlite
- JWT com `python-jose`
- Pytest
- Ruff
- React + Vite
- OpenAPI nativo do FastAPI

## Configuracao

Crie um `.env` local a partir do exemplo:

```bash
cp .env.example .env
```

Variaveis principais:

```text
BANK_DATABASE_URL=sqlite+aiosqlite:///./bank.db
BANK_JWT_SECRET_KEY=change-this-secret-in-production
BANK_JWT_ALGORITHM=HS256
BANK_ACCESS_TOKEN_EXPIRE_MINUTES=60
FRONTEND_ORIGIN=http://localhost:5173
BANK_FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Nunca versione `.env`, banco local, dumps ou chaves reais.

Para evitar erro de CORS em desenvolvimento, mantenha em `BANK_FRONTEND_ORIGINS`
as origens usadas pelo navegador. `localhost` e `127.0.0.1` sao origens
diferentes para o browser.

## Como Rodar A API

Instale as dependencias:

```bash
pip install -r requirements.txt
```

Execute localmente:

```bash
uvicorn app.main:app --reload
```

Abra:

- API: `http://localhost:8000`
- Swagger/OpenAPI: `http://localhost:8000/docs`
- Healthcheck: `http://localhost:8000/health`

## Como Rodar O Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend usa `VITE_API_URL` quando definida. Em desenvolvimento, sem essa
variavel, ele chama `http://localhost:8000`. Em build de producao, sem essa
variavel, ele chama a API por caminho relativo no mesmo dominio.

## Deploy No EasyPanel Com API E Front Juntos

O `Dockerfile` do projeto usa build multi-stage:

1. A etapa Node executa `npm ci` e `npm run build` dentro de `frontend/`.
2. A etapa Python instala o backend e copia `frontend/dist`.
3. O FastAPI serve a API e tambem entrega a Home React no mesmo dominio.

No EasyPanel, publique o app a partir do Dockerfile e exponha a porta interna:

```text
8000
```

Variaveis recomendadas para producao:

```text
BANK_DATABASE_URL=sqlite+aiosqlite:////data/bank.db
BANK_JWT_SECRET_KEY=defina-uma-chave-forte-no-painel
BANK_JWT_ALGORITHM=HS256
BANK_ACCESS_TOKEN_EXPIRE_MINUTES=60
BANK_FRONTEND_ORIGINS=https://seu-dominio.com
```

Para manter o SQLite persistente entre recriacoes do container, crie um volume
persistente no EasyPanel apontando para:

```text
/data
```

Quando API e Front rodam no mesmo dominio, `VITE_API_URL` pode ficar vazia. O
frontend chamara a API por caminho relativo, por exemplo `/auth/login` e
`/accounts/statement`.

Depois do deploy, valide:

- Home: `https://seu-dominio.com/`
- Swagger/OpenAPI: `https://seu-dominio.com/docs`
- Healthcheck: `https://seu-dominio.com/health`

Fluxo visual principal:

1. Acesse a Home em `http://127.0.0.1:5173`.
2. Explore a apresentacao publica do Dbank, com explicacao do projeto, tecnologias, regras de negocio, mockups, link para o repositorio e `https://dbank.flowstechai.com/docs`.
3. Use a sidebar para abrir `Criar acesso` ou `Entrar`.
4. Informe `username` e senha.
5. Depois da autenticação, a tela `Conta` mostra saldo, depósito, saque e histórico com data e saldo após cada operação.

## Testes E Qualidade

```bash
pytest
ruff check .
```

## Endpoints Principais

### `POST /auth/register`

Payload:

```json
{
  "username": "gabriel",
  "password": "strong-pass"
}
```

### `POST /auth/login`

Payload:

```json
{
  "username": "gabriel",
  "password": "strong-pass"
}
```

### `GET /accounts/statement`

Requer header:

```text
Authorization: Bearer <token>
```

### `POST /accounts/deposit`

Payload:

```json
{
  "amount": "100.00"
}
```

### `POST /accounts/withdraw`

Payload:

```json
{
  "amount": "40.00"
}
```

## Docker

Build da API:

```bash
docker build -t desafio-api-bancaria .
```

Execucao:

```bash
docker run --env-file .env -p 8000:8000 desafio-api-bancaria
```

## VPS / EasyPanel

Baseline recomendado:

- Publicar apenas a API na porta interna `8000`.
- Configurar dominio/subdominio e SSL pelo EasyPanel.
- Definir segredos pelo painel, nunca no Git.
- Usar volume privado para persistir o SQLite se a entrega continuar usando SQLite.
- Manter firewall com portas `22`, `80` e `443`.
- Usar SSH por chave, root login desabilitado e Fail2Ban ativo.
- Configurar healthcheck em `/health`.

## Estrutura

```text
.
|-- app/
|   |-- api/
|   |-- core/
|   |-- db/
|   |-- models/
|   `-- schemas/
|-- frontend/
|-- tests/
|-- PRD.md
|-- Spec.md
|-- Dockerfile
|-- requirements.txt
`-- readme.md
```
