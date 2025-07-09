# NLW Agents

Projeto desenvolvido durante o evento **NLW (Next Level Week)** da Rocketseat, focado em criar uma aplicação de IA com interface moderna e backend robusto.

## 🚀 Tecnologias Utilizadas

### Backend
- **Fastify** - Framework web rápido para Node.js
- **Drizzle ORM** - ORM TypeScript-first para PostgreSQL
- **PostgreSQL** - Banco de dados relacional com extensão pgvector
- **Zod** - Validação de schemas TypeScript
- **Docker** - Containerização do banco de dados

### Frontend
- **React 19** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento da aplicação
- **TanStack Query** - Gerenciamento de estado do servidor
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones

### Ferramentas
- **Biome** - Linter e formatter
- **Docker Compose** - Orquestração de containers

## 📁 Estrutura do Projeto

```
let-me-ask-ia/
├── server/          # Backend Fastify + Drizzle ORM
├── web/            # Frontend React + Vite
└── README.md
```

## ⚙️ Configuração e Setup

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Git

### Backend

1. **Clone o repositório**
```bash
git clone <repository-url>
cd let-me-ask-ia/server
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na pasta server/
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

4. **Suba o banco de dados**
```bash
docker-compose up -d
```

5. **Execute as migrações**
```bash
npm run db:seed
```

6. **Inicie o servidor**
```bash
npm run dev
```

### Frontend

1. **Navegue para a pasta web**
```bash
cd ../web
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

## 🛠️ Scripts Disponíveis

### Backend
- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run start` - Inicia o servidor em produção
- `npm run db:seed` - Executa o seed do banco de dados
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código

## 🎯 Funcionalidades

- Interface moderna e responsiva
- Sistema de salas para interação com IA
- Validação robusta de dados
- Banco de dados otimizado com PostgreSQL
- Arquitetura escalável com Fastify

---

Desenvolvido com 💜 durante o NLW da Rocketseat 