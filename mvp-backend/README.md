# 🚀 SevenScale MVP - Backend Isolado

> **Backend Node.js + Express + GPT-4 completamente isolado do projeto maior**

## 🎯 Objetivo

Backend MVP focado em **3 clínicas**, **1 agente consolidador** e **6 integrações**. Sem confusão com projeto maior!

## 🏗️ Arquitetura

```
src/
├── server.js              # Servidor principal MVP
├── config/
│   ├── database.js         # Supabase MVP isolado
│   └── openai.js          # GPT-4 configuração
├── routes/
│   ├── clients.js         # CRUD 3 clínicas
│   ├── insights.js        # Insights GPT-4
│   ├── integrations.js    # Status 6 APIs
│   └── agent.js           # Agente Consolidador
└── services/              # Serviços APIs (futuro)
```

## 🚀 Quick Start

```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
cp .env.example .env
# Editar .env com suas credenciais

# 3. Rodar MVP
npm run dev

# 4. Testar
curl http://localhost:8001/api/mvp/health
```

## 📊 Endpoints MVP

### **Health Check**
```bash
GET /api/mvp/health
# Status do backend MVP
```

### **Clientes**
```bash
GET /api/mvp/clients
# Listar 3 clínicas

GET /api/mvp/clients/:id
# Cliente específico

POST /api/mvp/clients
# Criar novo cliente

GET /api/mvp/clients/:id/dashboard
# Dashboard completo do cliente
```

### **Agente Consolidador**
```bash
GET /api/mvp/agent/status
# Status agente + GPT-4

POST /api/mvp/agent/process/:clientId
# Processar insights cliente específico

POST /api/mvp/agent/process-all
# Processar todos os clientes
```

### **Integrações**
```bash
GET /api/mvp/integrations/:clientId
# Status das 6 integrações

POST /api/mvp/integrations/:clientId/sync
# Sincronizar APIs
```

## 🎯 Dados MVP

**3 Clínicas Ativas:**
- Dr. Silva (Clínica Médica) - ROI 300%
- CardioVida (Cardiologia) - ROI 356%  
- Dermatologia Plus - ROI 347%

**6 Integrações Core:**
- HubSpot CRM
- Google Analytics
- Meta Ads
- Google Calendar
- WhatsApp Business
- RD Station

## 🔧 Configuração

### **Variáveis Obrigatórias:**
```env
PORT=8001
SUPABASE_URL=sua-url
SUPABASE_ANON_KEY=sua-chave
OPENAI_API_KEY=sua-chave-gpt4
```

### **Banco MVP (Supabase):**
- `mvp_clients` - 3 clínicas
- `mvp_agent_insights` - Insights GPT-4
- `mvp_client_integrations` - Status APIs
- `mvp_integration_data` - Dados coletados

## 🤖 Agente Consolidador

**Fluxo:**
1. Coleta dados das 6 APIs
2. Consolida em JSON
3. Envia para GPT-4
4. Gera insights específicos
5. Salva no Supabase

**Output GPT-4:**
```json
{
  "insights": ["Taxa conversão 26% acima média"],
  "action_items": ["Implementar WhatsApp automático"],
  "roi_analysis": {"roi_percent": "300%"},
  "status_summary": {"overall_health": "excellent"}
}
```

## 🚀 Deploy

```bash
# Build
npm run build

# Start produção
npm start
```

---

**🎯 FOCO: Backend MVP isolado - sem dependências do projeto maior!**