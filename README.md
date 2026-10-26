# Masterclass Test-Drive Da Carreira Tech

Landing page oficial da **Masterclass "Test-Drive da Carreira Tech"**, ministrada por Venicios Ribeiro.

O objetivo do projeto é oferecer um "test-drive" prático para quem deseja ingressar na área de tecnologia, ajudando a identificar o perfil ideal e evitar frustrações antes de investir tempo e dinheiro em cursos.

## 📊 Visão Geral

Este **aplicativo full-stack** combina:

- **Landing pages otimizadas** para conversão
- **Teste de aptidão** interativo com 10 perguntas (Lógica, Afinidade e Comportamental)
- **Relatórios em PDF** personalizados com gráficos e recomendações
- **Sistema de Autenticação** via whitelist de emails

## 🏗️ Arquitetura e Tecnologias

### Frontend (React SPA)

- **Core:** React 19, TypeScript, Vite 6
- **Estilo:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **PDF:** jsPDF

### Backend (Fastify API)

- **Core:** Node.js, Fastify
- **DB:** PostgreSQL, Prisma ORM
- **Valid:** TypeBox, JWT

### Infraestrutura

- **DevOps:** Docker, Docker Compose, Nginx

## 📁 Estrutura do Projeto

```
techcareer-test-drive/
├── 📂 components/          # Componentes React (landing pages, Teste)
├── 📂 services/            # API client e lógica de serviços
├── 📂 test/                # Lógica de negócio do teste (perguntas, scoring)
├── 📂 api/                 # Backend Fastify (server, plugins, routes)
│   └── prisma/             # Schema do banco de dados
├── 📂 supabase/            # Scripts de inicialização do DB
└── 📄 docker-compose.yml   # Orquestração de containers
```

## 🚀 Guia de Desenvolvimento

### 1. Preparação (Setup)

Pré-requisitos: Node.js 18+, Docker (opcional, mas recomendado).

```bash
# Clone e instale dependências
git clone <repo-url>
cd techcareer-test-drive
npm install        # Frontend
cd api && npm install && cd ..
```

### 2. Configuração (.env)

Crie o arquivo `.env.local` na raiz:

```env
# Frontend
VITE_API_URL=http://localhost:4000
# Backend
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/techcareer
JWT_SECRET=seu_segredo_aqui
CORS_ORIGIN=http://localhost:3000
```

### 3. Banco de Dados

```bash
# Na pasta /api
npm run prisma:generate
npm run prisma:migrate
```

### 4. Executando o Projeto

Você pode rodar o projeto de duas formas:

**Opção A: Docker (Recomendado)**

```bash
# Sobe banco, api e frontend juntos
docker compose --env-file .env.docker up --build
```

**Opção B: Manualmente (Terminais Separados)**

```bash
# Terminal 1 (Backend)
cd api && npm run dev

# Terminal 2 (Frontend)
npm run dev
```

### 📜 Comandos Disponíveis

| Escopo               | Comando                  | Descrição                          |
| -------------------- | ------------------------ | ---------------------------------- |
| **Geral**            | `npm run dev`            | Inicia servidor de desenvolvimento |
|                      | `npm run build`          | Gera build de produção             |
| **Backend** (`/api`) | `npm run prisma:studio`  | Interface visual do banco de dados |
|                      | `npm run prisma:migrate` | Executa migrações do banco         |
|                      | `npm run start`          | Inicia servidor de produção        |
|                      | `npm run build`          | Compila TypeScript                 |
| **Docker**           | `docker compose up`      | Inicia todos os serviços           |
|                      | `docker compose down`    | Para e remove containers           |

## 🔑 Autenticação e Segurança

O acesso ao teste é controlado por uma **whitelist de emails**:

1. O usuário insere o email.
2. O backend valida se o email consta na tabela `AuthorizedEmail`.
3. Se autorizado, um JWT é gerado.

**Para autorizar emails:** Use o `npm run prisma:studio` na pasta `api` ou insira diretamente no banco.

## 📝 Detalhes do Teste

O protocolo avalia 3 pilares para definir um dos **7 perfis técnicos** (ex: Front-End Specialist, Data Scientist):

1. **Áreas Técnicas (70%)**: Front, Back, Dados/IA.
2. **Comportamental (30%)**: Resiliência, Lógica, Proatividade.

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/minha-feature`
2. Commit: `git commit -m 'Minha feature'`
3. Push: `git push origin feature/minha-feature`
4. Abra um PR.

**Padrões:** ESM, TypeScript Strict (backend), PascalCase (componentes), camelCase (funções).

---

**Desenvolvido com ❤️ para a Masterclass Test-Drive**.
