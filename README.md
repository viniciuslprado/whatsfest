# WhatsFest

> Plataforma moderna para descobrir, divulgar e gerenciar eventos e festas da sua região.

---

## 🚀 Deploy

### Backend (Render)
- Deploy automático via `render.yaml`
- Banco: PostgreSQL gratuito (Render)

### Frontend (Vercel)
- Deploy automático via `vercel.json`
- Conexão direta com backend Render

### Variáveis de Ambiente
**Backend:**
- `DATABASE_URL` (PostgreSQL Render)
- `ADMIN_KEY` (gerada pelo Render)
- `NODE_ENV=production`
- `PORT=10000`

**Frontend:**
- `VITE_API_BASE_URL` (aponta para backend Render)

---

## 🛠 Desenvolvimento Local

```bash
# Instalar dependências
npm run install-deps

# Rodar backend + frontend juntos
npm run dev

# Build de produção
npm run build
```

---

## 🔑 Acesso Admin
As credenciais de acesso admin devem ser configuradas via variáveis de ambiente no backend. Consulte a equipe responsável para obter acesso.

---

## 🌟 Funcionalidades
- Calendário interativo de eventos
- Filtros por nome, cidade e data
- Geolocalização automática
- Painel administrativo completo