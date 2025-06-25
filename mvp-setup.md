# 🚀 SevenScale MVP - Setup Completo

> **Guia para rodar o MVP isolado do zero**

## 📋 Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- **Conta Supabase** (grátis)
- **API Key OpenAI** (GPT-4)

---

## 🗄️ 1. SETUP SUPABASE

### **1.1 Criar Projeto**
```bash
# 1. Ir para https://supabase.com
# 2. Criar novo projeto
# 3. Anotar URL e API Keys
```

### **1.2 Executar Script SQL**
```sql
-- Copiar e colar no Supabase SQL Editor:
-- (Ver arquivo: mvp-database-schema.sql)

-- Tabelas MVP:
-- ✅ mvp_clients
-- ✅ mvp_agent_insights  
-- ✅ mvp_client_integrations
-- ✅ mvp_integration_data
```

---

## 🔧 2. SETUP BACKEND

### **2.1 Instalar Dependências**
```bash
cd mvp-backend/
npm install
```

### **2.2 Configurar Ambiente**
```bash
cp .env.example .env
```

**Editar .env:**
```env
PORT=8001
NODE_ENV=development

# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima

# OpenAI
OPENAI_API_KEY=sk-sua-chave-gpt4
```

### **2.3 Rodar Backend**
```bash
npm run dev

# ✅ Servidor rodando: http://localhost:8001
# ✅ Health check: http://localhost:8001/api/mvp/health
```

---

## 🎨 3. SETUP FRONTEND

### **3.1 Instalar Dependências**
```bash
cd mvp-frontend/
npm install
```

### **3.2 Configurar Ambiente**
```bash
cp .env.example .env
```

**Editar .env:**
```env
# Backend MVP
VITE_MVP_API_URL=http://localhost:8001/api/mvp
```

### **3.3 Rodar Frontend**
```bash
npm run dev

# ✅ Frontend rodando: http://localhost:3001
# ✅ Dashboard MVP: http://localhost:3001/mvp/dashboard
```

---

## 🧪 4. TESTAR MVP

### **4.1 Health Check**
```bash
curl http://localhost:8001/api/mvp/health

# Response esperado:
# {
#   "status": "MVP Backend Online",
#   "clients_active": 3,
#   "integrations": 6
# }
```

### **4.2 Testar Clientes**
```bash
curl http://localhost:8001/api/mvp/clients

# Deve retornar 3 clientes:
# - Dr. Silva
# - CardioVida  
# - Dermatologia Plus
```

### **4.3 Testar Agente**
```bash
curl http://localhost:8001/api/mvp/agent/status

# Deve mostrar:
# - GPT-4: connected
# - Database: connected
```

---

## 🎯 5. USAR MVP

### **5.1 Acessar Dashboard**
```
1. Abrir: http://localhost:3001/mvp/dashboard
2. Ver 3 clientes ativos
3. Clicar em "Processar Insights"
4. Aguardar GPT-4 gerar insights
```

### **5.2 Ver Cliente Individual**
```
1. Ir em "Clientes"
2. Clicar "Ver Dashboard" em qualquer cliente
3. Ver métricas + insights + integrações
4. Processar insights individuais
```

### **5.3 Gerenciar Integrações**
```
1. Ir em "Integrações"
2. Selecionar cliente
3. Ver status das 6 integrações core
4. Conectar/sincronizar APIs
```

---

## 🚀 6. DEPLOY (OPCIONAL)

### **6.1 Backend (Railway/Heroku)**
```bash
# Build
npm run build

# Deploy
npm start

# Variáveis necessárias:
# - SUPABASE_URL
# - SUPABASE_ANON_KEY  
# - OPENAI_API_KEY
```

### **6.2 Frontend (Vercel/Netlify)**
```bash
# Build
npm run build

# Deploy pasta dist/
# Configurar VITE_MVP_API_URL para backend deployed
```

---

## 🛠️ 7. TROUBLESHOOTING

### **Erro: Supabase Connection**
```bash
# Verificar:
# 1. URL e API Key corretas
# 2. Tabelas MVP criadas
# 3. RLS policies (se houver)
```

### **Erro: GPT-4 API**
```bash
# Verificar:
# 1. API Key válida
# 2. Créditos OpenAI
# 3. Acesso ao modelo GPT-4
```

### **Erro: CORS Frontend**
```bash
# Backend já configurado para:
# - http://localhost:3001
# - http://localhost:5174
# 
# Se usar porta diferente, atualizar cors em server.js
```

---

## ✅ 8. CHECKLIST FINAL

**Backend:**
- [ ] Health check responde
- [ ] 3 clientes retornados
- [ ] GPT-4 conectado
- [ ] Supabase conectado

**Frontend:**
- [ ] Dashboard carrega
- [ ] Clientes listados
- [ ] Integrações aparecem
- [ ] Navegação funciona

**Integração:**
- [ ] Frontend → Backend API
- [ ] Backend → Supabase
- [ ] Backend → GPT-4
- [ ] Insights gerados

---

**🎯 RESULTADO: MVP SevenScale 100% funcional!**

*Setup criado: Junho 2025 - SevenScale MVP Isolado*