# WhatsFest - Plataforma de Eventos

Uma plataforma moderna para descobrir e organizar eventos e festas da sua região.

## 🚀 Deploy 

### Deploy no Render (Backend)

O backend está configurado para deploy no Render usando o arquivo `render.yaml`:
- **Backend**: `https://whatsfest-backend.onrender.com`
- **Database**: PostgreSQL gratuito no Render

### Deploy no Vercel (Frontend)

O frontend está configurado para deploy no Vercel:
- **Frontend**: Deploy automático via `vercel.json`
- **Conecta automaticamente ao backend no Render**

### Configuração dos Deploys

**Render (Backend):**
1. Conecte seu repositório ao Render
2. O `render.yaml` será detectado automaticamente
3. Backend + Database serão criados

**Vercel (Frontend):**
1. Conecte seu repositório ao Vercel
2. O `vercel.json` configura o build automaticamente
3. Frontend aponta para backend no Render

### Variáveis de Ambiente

O deploy está configurado para usar as seguintes variáveis:

**Backend:**
- `DATABASE_URL`: Conecta automaticamente ao PostgreSQL
- `ADMIN_KEY`: Gerada automaticamente pelo Render
- `NODE_ENV`: production
- `PORT`: 10000

**Frontend:**
- `VITE_API_BASE_URL`: Aponta para o backend no Render

## 🛠 Desenvolvimento Local

```bash
# Instalar dependências
npm run install-deps

# Desenvolvimento (backend + frontend)
npm run dev

# Build de produção
npm run build
```

## 📝 Configuração do Banco

O banco PostgreSQL será criado automaticamente no Render com:
- Nome: `whatsfest`
- Usuário: `whatsfest_user`
- Plano: Free
- Região: Oregon

## 🔑 Acesso Admin

- Username: `admin`
- Password: `admin123`

## 🌟 Funcionalidades

- 📅 Calendário interativo de eventos
- 🔍 Filtros por nome, cidade e data
- 📍 Geolocalização automática
- 👨‍💼 Painel administrativo
- 📱 Interface responsiva
- 🎨 Design moderno com glass morphism

## 📂 Estrutura do Projeto

```
whatsfest/
├── backend/          # API Node.js + Express + Prisma
├── frontend/         # React + TypeScript + Vite
├── render.yaml       # Configuração do Render
└── package.json      # Scripts do projeto
```