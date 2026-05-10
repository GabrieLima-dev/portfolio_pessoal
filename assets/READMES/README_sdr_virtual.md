# 🤖 SDR Virtual Inteligente

![Status](https://img.shields.io/badge/status-MVP%20em%20desenvolvimento-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![IA](https://img.shields.io/badge/IA-Maritaca%20Sabiazinho--3-yellow)
![Automation](https://img.shields.io/badge/Automation-n8n-orange)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20|%20SpringBoot-lightgrey)
![MessageAPI](https://img.shields.io/badge/WhatsApp-Evolution%20API-success)

---

## 📘 Sobre o Projeto

A **SDR Virtual Inteligente** é uma solução de **automação de pré-vendas** desenvolvida para atender leads via **WhatsApp** de forma **humanizada, eficiente e totalmente automática**.

O projeto visa reduzir custos operacionais e aumentar a produtividade de equipes comerciais, utilizando **Inteligência Artificial** e **orquestração de fluxos** com **n8n**.  

💡 O MVP foi desenhado para ser **totalmente funcional**, **modular** e **escalável**, podendo evoluir facilmente para integrações com **OpenAI (GPT-5)** ou outros modelos avançados de IA.

---

## 🎯 Objetivo

Desenvolver uma **SDR Virtual Inteligente** capaz de:
- Atender automaticamente leads via WhatsApp;
- Coletar informações, enviar imagens e realizar follow-ups automáticos;
- Gerar cadências personalizadas de comunicação;
- Operar com **baixo custo**, **alta performance** e **estrutura pronta para escalar**.

---

## 🧠 Tecnologias Utilizadas

| Camada | Tecnologia | Função |
|--------|-------------|--------|
| **IA** | [Maritaca AI – Sabiazinho-3](https://maritaca.ai) | Modelo leve e otimizado para português |
| **Automação** | [n8n (self-hosted)](https://n8n.io) | Orquestração de fluxos e integrações |
| **Proxy / TLS** | [Traefik](https://traefik.io/traefik/) | Reverse proxy com HTTPS (Let's Encrypt) e BasicAuth |
| **Mensageria** | [Evolution API](https://evolution-api.com) | Envio e recebimento de mensagens WhatsApp |
| **Banco de Dados** | PostgreSQL | Persistência e controle de cadências e contatos |
| **Fila** | Redis | Suporte ao queue mode do n8n (main + worker) |
| **Monitoramento** | [Uptime Kuma](https://github.com/louislam/uptime-kuma) | Monitoramento de disponibilidade, latência, SSL e alertas |
| **Backend (evolutivo)** | FastAPI (Python) / Spring Boot (Java) | API de controle e dashboards |
| **Infraestrutura** | VPS Contabo (4 vCPU / 8 GB RAM / 150 GB SSD / Ubuntu / Auto Backup / 1 IPv4) | Hospedagem do ambiente completo |
| **Storage** | Google Drive | Armazenamento gratuito de imagens |

---

## 🧱 Arquitetura do MVP

A arquitetura da SDR Virtual Inteligente foi desenhada para ser leve, modular e escalável, garantindo baixo custo e alta performance no MVP.
Cada componente conversa entre si de forma harmônica, garantindo fluidez e autonomia no atendimento via WhatsApp.

                💬 Usuário (WhatsApp)
                          │
                          ▼
                🌐 Evolution API (Gateway)
                          │
                          ▼
        ⚙️ n8n (Automação + IA Maritaca)
        ├── Fluxos de automação
        ├── Regras de follow-up
        └── Interação com a IA (Sabiazinho-3)
                          │
                          ▼
         🗄️ Banco de Dados (PostgreSQL)
        ├── Leads
        ├── Cadências
        └── Logs de atendimento
                          │
                          ▼
          ☁️ Google Drive (Armazenamento)
                └── Imagens e arquivos enviados

## 👉 Resumo da Comunicação entre os Componentes:
O usuário interage via WhatsApp, enviando mensagens, fotos ou dúvidas.
A Evolution API recebe essas mensagens e repassa ao n8n.
O n8n processa os dados, aciona a IA da Maritaca para gerar respostas inteligentes e aplica regras de cadência.
As informações são registradas no PostgreSQL (leads, status, logs).
Caso haja envio de mídia, as imagens são armazenadas no Google Drive.

## 🖥️ Operação Atual na VPS (Fev/2026)

> ⚠️ **Nota de segurança:** os nomes de banco, usuários, hosts, containers e senhas desta seção são **exemplos fictícios apenas para documentação**.

- **Traefik em produção** com HTTPS automático (Let's Encrypt) para os domínios públicos.
- **n8n em queue mode** com `n8n_main` + `n8n_worker`.
- **PostgreSQL central do projeto** (`db_sdr_exemplo`) com usuário dedicado do n8n (`n8n_user_exemplo`).
- **Redis dedicado** para fila e processamento assíncrono.
- **Backup/restore operacional** com scripts e envio para Google Drive (rclone).
- **Hardening básico de servidor** (UFW, Fail2Ban, SSH, cron e logrotate).
- **Monitoramento com Uptime Kuma** em `https://monitor.exemplo.com`.

### Estado real validado do PostgreSQL no EasyPanel (Mar/2026)

Durante a validação operacional na VPS, foi confirmado que o PostgreSQL em produção **não** está mais acessível por um container simples chamado `postgres`. No ambiente atual do EasyPanel/Docker Swarm, o nome do container é **dinâmico**, seguindo o padrão:

```bash
stack_sdr_postgres.1.<id_exemplo>
```

#### Informações confirmadas no ambiente atual

- **Banco principal atual:** `db_sdr_exemplo`
- **Usuário admin atual do PostgreSQL:** `db_admin_exemplo`
- **Container do PostgreSQL em produção:** `stack_sdr_postgres.1.<id_exemplo>`
- **n8n permanece dependente do banco `db_sdr_exemplo`**, então esse banco **não deve ser apagado ou recriado** sem planejamento, backup e validação de impacto.

> Importante: partes antigas da documentação ainda citam o usuário `sdr` e o container `postgres`. Esse registro representa uma fase anterior da infraestrutura. No estado atual validado da VPS, use o padrão de exemplo acima e substitua pelas credenciais reais apenas no ambiente seguro.

#### Comandos úteis de diagnóstico

Listar containers relacionados a Postgres/n8n/Redis:

```bash
docker ps -a --format "table {{.Names}}	{{.Image}}	{{.Status}}" | egrep 'n8n|redis|postgre|pg'
```

Entrar no PostgreSQL atual usando o container dinâmico do Swarm:

```bash
docker exec -it $(docker ps -q --filter name=stack_sdr_postgres.1) psql -U db_admin_exemplo -d db_sdr_exemplo
```

Validar usuário e banco conectados:

```sql
SELECT current_user, current_database();
```

Saída esperada:

```text
 current_user | current_database
--------------+------------------
 db_admin_exemplo | db_sdr_exemplo
```

#### Diretriz para novos projetos no mesmo Postgres

Para projetos novos hospedados na mesma VPS, a recomendação atual é **criar um banco separado** (ex.: `db_projeto_b_exemplo`) em vez de apenas criar uma schema dentro de `db_sdr_exemplo`.

Isso traz vantagens práticas:

- melhor isolamento entre projetos;
- backup e restore separados;
- menor risco de afetar o n8n;
- organização mais clara no EasyPanel/PostgreSQL.

A estratégia recomendada para este ambiente é:

- manter `db_sdr_exemplo` intacto para SDR + n8n;
- criar banco novo para cada produto/projeto relevante;
- usar usuário próprio por projeto sempre que possível.


### Acesso visual ao PostgreSQL via pgAdmin no EasyPanel (Mar/2026)

Para administração rápida do PostgreSQL pelo navegador, foi adotado o **pgAdmin** como interface visual no EasyPanel.

#### Motivo da adoção do pgAdmin

Durante a validação operacional, o acesso visual via `pgweb` não ficou funcional no cenário atual porque o serviço estava iniciando com configuração inconsistente e tentando abrir um banco inválido. Como o objetivo era ter uma interface visual estável e simples para uso diário, o caminho adotado foi subir um serviço dedicado de **pgAdmin** no próprio EasyPanel.

#### Estado validado do acesso visual

- **Serviço visual adotado:** `pgadmin`
- **Imagem Docker utilizada:** `dpage/pgadmin4:9.11.0`
- **Login do pgAdmin:** credencial própria da interface web (separada do PostgreSQL)
- **Servidor PostgreSQL cadastrado no pgAdmin:** `Postgres Exemplo`
- **Host interno do PostgreSQL no EasyPanel:** `stack_sdr_postgres`
- **Porta interna:** `5432`
- **Usuário administrativo validado no PostgreSQL:** `db_admin_exemplo`

> Importante: o login do **pgAdmin** não é o mesmo login do **PostgreSQL**. O pgAdmin possui usuário e senha próprios para entrar na interface web. Depois disso, dentro do pgAdmin, é cadastrado o servidor PostgreSQL com as credenciais reais do banco.

#### Cadastro validado do servidor no pgAdmin

Na tela **Registrar - Servidor** do pgAdmin, a conexão funcional foi validada com os seguintes dados:

```text
Nome: Postgres Exemplo
Host name/address: stack_sdr_postgres
Porta: 5432
Maintenance database: postgres
Username: db_admin_exemplo
Senha: [SENHA_EXEMPLO_APENAS]
```

#### Resultado prático

Com isso, o ambiente passou a ter acesso rápido pelo navegador para:

- visualizar bancos como `db_sdr_exemplo` e `db_projeto_b_exemplo`;
- navegar por schemas, tabelas, views e roles;
- executar queries SQL manualmente;
- administrar objetos do banco sem depender sempre do terminal na VPS.

#### Banco separado criado para um novo projeto (exemplo)

Dentro desse PostgreSQL central, foi validada também a criação de um banco separado para um projeto secundário:

- **Banco:** `db_projeto_b_exemplo`
- **Usuário dedicado:** `db_user_projeto_b_exemplo`

A diretriz atual fica assim:

- `db_sdr_exemplo` continua reservado ao ecossistema SDR + n8n;
- `db_projeto_b_exemplo` fica isolado como banco próprio;
- o pgAdmin passa a ser a interface visual padrão para administração rápida.

### O que é o Uptime Kuma?

O **Uptime Kuma** é uma ferramenta self-hosted de observabilidade para monitorar serviços e endpoints.  
No nosso ambiente ele é usado para:

- Verificar **disponibilidade** dos serviços (ex.: domínio do n8n e endpoints).
- Medir **latência** e acompanhar histórico de incidentes.
- Validar **status SSL/TLS** dos domínios.
- Disparar **alertas no Telegram** quando há indisponibilidade.
- Registrar eventos de monitoramento (logs de checks) para auditoria operacional.

> Observação: o Kuma monitora saúde/disponibilidade e eventos dos checks; logs detalhados de aplicação continuam sendo analisados via logs dos containers (`docker logs`).

## 🚀 Arquitetura Evolutiva da Solução

O projeto foi construído com base **modular e escalável**, permitindo evolução natural para um ecossistema distribuído:

- 🔹 **n8n Cloud Pro** para automações escaláveis;
- 🔹 **Banco isolado em PostgreSQL Cloud**;
- 🔹 **Portal administrativo (FastAPI ou Spring Boot)** com dashboards e controle de múltiplos clientes;
- 🔹 **Autenticação segura (JWT / OAuth2)** e controle de usuários;
- 🔹 **Integração com CRMs e ferramentas de marketing**;
- 🔹 **IA avançada (OpenAI / GPT-5)** para respostas mais humanas;
- 🔹 **Alta disponibilidade e escalabilidade horizontal**.

---

## 💰 Custos

### 💻 Desenvolvimento (Projeto Fechado)

### ☁️ Custos Mensais do MVP

| Serviço | Descrição | Valor (R$) |
|----------|------------|-----------:|
| Contabo (VPS + Banco + n8n) | Hospedagem completa | 59,78 |
| Maritaca AI (Sabiazinho-3) | API compatível com OpenAI | 1,00 |
| Google Drive | Armazenamento gratuito | 0,00 |
| Evolution API | Integração com WhatsApp | 0,00 |
| Número WhatsApp (chip pessoal) | Linha própria | 0,00 |
| **Total mensal (MVP)** |  | **≈ R$ 60,78** |

---

## 🧩 Pós-MVP (Escalabilidade e Produção)

| Serviço | Descrição | Valor (R$) |
|----------|------------|-----------:|
| Contabo | Infraestrutura completa (API, banco e backend) | 59,78 |
| N8N Cloud (Pro) | Automação e IA escalável | 350,00 |
| Google Drive (Storage) | Armazenamento em nuvem | 0,04/GB |
| OpenAI (GPT-5) | IA avançada para produção | 358,68 |
| Evolution API (Pro) | Envio de mídia e cadência profissional | 0,00 |
| Número WhatsApp (chip físico) | Linha dedicada | 20,00 |
| **Total estimado** |  | **≈ R$ 800,00/mês** |

---

## 🧰 Ferramentas de Desenvolvimento

- **Visual Studio Code** — Desenvolvimento e testes
- **Postman / Thunder Client** — Testes de APIs
- **dbdiagram.io / Figma** — Modelagem visual
- **Azure Data Studio** — Visualização e análise do banco de dados
- **Docker Compose** — Empacotamento e deploy local do n8n e Postgres

---

## 🗃️ Arquitetura do Banco de Dados

A modelagem atual segue o UML oficial do projeto, com tabelas operacionais, históricas e de apoio conectadas por chaves estrangeiras.

```text
cliente
├── Agente
├── contrato
├── cliente_configuracao
├── sdr_cliente_config
├── sdr_cliente_config_historico
├── sdr_contexto_cliente
├── sdr_contexto_cliente_historico
├── follow_up
├── sdr_leads
├── sdr_leads_historico
├── sdr_mensagens
├── sdr_produtos
├── blocked_list
├── whatsapp_account_update
└── usuario

produto
├── Agente
├── plano
├── contrato
└── (origem comercial)

status_contrato
└── contrato

crm
├── sdr_cliente_config
├── sdr_leads
└── sdr_leads_historico

canal
├── Agente
├── sdr_leads (id_canal_origem)
└── sdr_leads_historico (id_canal_anterior/id_canal_novo)

sdr_situacao_interna
├── sdr_leads
└── sdr_leads_historico

tipo_mensagem
└── sdr_mensagens

sdr_produtos
├── sdr_leads
└── sdr_imagem_produto
```

### Tabelas documentadas nesta versão

- **Cadastros base:** `cliente`, `Agente`, `produto`, `plano`, `status_contrato`, `contrato`, `crm`, `canal`, `sdr_situacao_interna`, `tipo_mensagem`.
- **Configurações e contexto:** `cliente_configuracao`, `sdr_cliente_config`, `sdr_cliente_config_historico`, `sdr_contexto_cliente`, `sdr_contexto_cliente_historico`.
- **Operação comercial:** `sdr_leads`, `sdr_leads_historico`, `sdr_mensagens`, `follow_up`, `sdr_produtos`, `sdr_imagem_produto`.
- **Segurança e governança:** `blocked_list`, `whatsapp_account_update`, `usuario`.
- **Relacionamentos ativos:** `docs/DB_SDR_VIRTUAL.sql` contém PKs e FKs alinhadas ao UML atual.

📄 **DDL base do projeto:** `docs/DB_SDR_VIRTUAL.sql`  
🗂️ **Observação:** os exemplos de usuário/senha/token no README e nas páginas de documentação são fictícios e servem apenas para referência.

---

## 📚 Documentação de Infra da VPS

- Portal de documentação técnica: `docs/index.html`
- DER e estrutura do banco: `docs/sections/der-estrutura-banco.html`
- Script DDL oficial: `docs/DB_SDR_VIRTUAL.sql`

---

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
