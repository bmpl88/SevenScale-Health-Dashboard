# ⚙️ MVP Backend Configuration - Estado Atual

> **Configuração atual do backend Node.js + Express + Supabase funcionando**

## 📊 STATUS ATUAL

**✅ FUNCIONANDO:**
- Node.js + Express server
- Supabase PostgreSQL conectado
- OpenAI SDK 5.7.0 instalado
- Environment variables configuradas
- APIs básicas testadas

**⚙️ PRÓXIMO:** Implementar AgentConsolidator GPT-4

---

## 🛠️ STACK TÉCNICO ATUAL

### **Dependencies (package.json):**
```json
{
  "name": "sevenscale-backend",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@supabase/supabase-js": "^2.39.7",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "helmet": "^8.1.0",
    "morgan": "^1.10.0",
    "openai": "^5.7.0",
    "winston": "^3.11.0"
  }
}
```

### **Environment Variables (.env):**
```bash
# Supabase Configuration
SUPABASE_URL=https://irotiorxyayknzkpskve.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OpenAI Configuration  
OPENAI_API_KEY=sk-proj-NmRCKy5xI4_kL9uEaIdb2FFbjH4S19eNBCAXXBz_Q41...

# Backend Configuration
NODE_ENV=development
PORT=8000
HOST=0.0.0.0
```

---

## 📂 ESTRUTURA ATUAL

### **Arquivos Funcionando:**
```
backend/
├── server.js                 ✅ Express server
├── lib/
│   ├── database.js           ✅ Supabase integration
│   └── logger.js             ✅ Winston logging
├── routes/
│   ├── auth.js               ✅ Authentication
│   ├── clients.js            ✅ Client CRUD
│   ├── dashboard.js          ✅ Dashboard data
│   └── (outros...)           ✅ APIs básicas
└── .env                      ✅ Environment variables
```

### **Database Service (lib/database.js):**
```javascript
// Já implementado e funcionando:
export const dbService = {
  async saveAgentInsights(clientId, insights, agentType = 'mvp-consolidator'),
  async getLatestInsights(clientId),
  async getClientSummary(),
  async testConnection()
};
```

---

## 🤖 IMPLEMENTAÇÃO AGENTE CONSOLIDADOR

### **1. Criar serviço AgentConsolidator:**

```javascript
// services/agentConsolidator.js
import OpenAI from 'openai';
import { dbService } from '../lib/database.js';
import logger from '../lib/logger.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class AgentConsolidator {
  
  async processClientData(clientId) {
    try {
      logger.info(`🤖 Processing client data: ${clientId}`);
      
      // 1. Coleta dados (mock por enquanto)
      const consolidatedData = await this.collectClientData(clientId);
      
      // 2. Processa com GPT-4
      const insights = await this.generateInsights(consolidatedData);
      
      // 3. Salva no Supabase (usando função existente)
      await dbService.saveAgentInsights(clientId, insights, 'mvp-consolidator');
      
      logger.info(`✅ Insights generated for client: ${clientId}`);
      return insights;
      
    } catch (error) {
      logger.error(`❌ Agent Consolidator error: ${error.message}`);
      throw error;
    }
  }

  async collectClientData(clientId) {
    // Por enquanto, dados mock realistas
    // Será substituído pelas integrações reais
    return {
      client: {
        id: clientId,
        name: "Dr. Silva - Cardiologia",
        specialty: "Cardiologia",
        location: "São Paulo, SP"
      },
      period: "últimos 30 dias",
      hubspot: {
        leads: 45,
        conversoes: 12,
        pipeline_value: "R$ 89.000",
        conversion_rate: "26.7%"
      },
      google_analytics: {
        sessions: 2340,
        users: 1890,
        conversions: 28,
        bounce_rate: "45%"
      },
      meta_ads: {
        impressoes: 15000,
        clicks: 450,
        conversions: 18,
        cpa: "R$ 156",
        roas: 2.8
      },
      google_calendar: {
        agendamentos: 28,
        cancelamentos: 3,
        ocupacao: "85%",
        no_shows: 2
      },
      whatsapp: {
        mensagens_enviadas: 156,
        mensagens_respondidas: 134,
        taxa_resposta: "86%",
        tempo_resposta_medio: "12min"
      }
    };
  }

  async generateInsights(data) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: this.getSystemPrompt()
        },
        {
          role: "user",
          content: JSON.stringify(data)
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      logger.error('GPT-4 response parsing error:', parseError);
      throw new Error('Invalid JSON response from GPT-4');
    }
  }

  getSystemPrompt() {
    return `
Você é um especialista em growth marketing médico da SevenScale.

Analise os dados consolidados de uma clínica médica e gere insights acionáveis.

REGRAS:
1. Responda SEMPRE em JSON estruturado
2. Gere 3-5 insights específicos e acionáveis
3. Inclua action items priorizados
4. Calcule ROI quando possível
5. Identifique gargalos e oportunidades
6. Seja específico para a especialidade médica

ESTRUTURA DA RESPOSTA:
{
  "insights": [
    "Insight específico com número/métrica",
    "Comparação com benchmarks do setor",
    "Identificação de gargalo ou oportunidade"
  ],
  "action_items": [
    "Ação específica e implementável",
    "Priorizada por impacto/esforço"
  ],
  "roi_analysis": {
    "total_investment": "R$ valor",
    "total_revenue": "R$ valor", 
    "roi_percent": "número%",
    "comparison": "descrição vs setor"
  },
  "alerts": [
    "Alerta crítico se houver"
  ],
  "score": número de 1-100
}

FOQUE EM:
- Métricas específicas da especialidade
- Oportunidades de otimização imediatas
- ROI mensurável e demonstrável
- Ações que podem ser implementadas em 1-2 semanas
`;
  }
}
```

### **2. Criar endpoints API:**

```javascript
// routes/agent.js
import express from 'express';
import { AgentConsolidator } from '../services/agentConsolidator.js';
import { dbService } from '../lib/database.js';
import logger from '../lib/logger.js';

const router = express.Router();
const agent = new AgentConsolidator();

/**
 * @route POST /api/v1/agent/process/:clientId
 * @desc Processar dados cliente e gerar insights
 */
router.post('/process/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const insights = await agent.processClientData(clientId);
    
    res.json({
      success: true,
      clientId,
      insights,
      processedAt: new Date().toISOString()
    });
    
  } catch (error) {
    logger.error(`Agent process error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route GET /api/v1/agent/insights/:clientId
 * @desc Obter últimos insights do cliente
 */
router.get('/insights/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const insights = await dbService.getLatestInsights(clientId);
    
    if (!insights) {
      return res.status(404).json({
        success: false,
        message: 'No insights found for this client'
      });
    }
    
    res.json({
      success: true,
      insights: insights.insights_data,
      processedAt: insights.processed_at
    });
    
  } catch (error) {
    logger.error(`Get insights error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route POST /api/v1/agent/process-all
 * @desc Processar todos os clientes
 */
router.post('/process-all', async (req, res) => {
  try {
    // Buscar todos clientes ativos (mock por enquanto)
    const clients = [
      { id: '1', name: 'Dr. Silva - Cardiologia' },
      { id: '2', name: 'Clínica Derma Plus' },
      { id: '3', name: 'OdontoVita Centro' }
    ];
    
    const results = [];
    
    for (const client of clients) {
      try {
        const insights = await agent.processClientData(client.id);
        results.push({
          clientId: client.id,
          clientName: client.name,
          success: true,
          insights
        });
      } catch (error) {
        results.push({
          clientId: client.id,
          clientName: client.name,
          success: false,
          error: error.message
        });
      }
    }
    
    res.json({
      success: true,
      totalClients: clients.length,
      processed: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    });
    
  } catch (error) {
    logger.error(`Process all error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
```

### **3. Atualizar server.js:**

```javascript
// Adicionar no server.js
import agentRouter from './routes/agent.js';

// Registrar rota
app.use('/api/v1/agent', agentRouter);
```

---

## 🧪 TESTE RÁPIDO

### **1. Testar processamento:**
```bash
curl -X POST http://localhost:8000/api/v1/agent/process/1
```

### **2. Buscar insights:**
```bash
curl http://localhost:8000/api/v1/agent/insights/1
```

### **3. Processar todos:**
```bash
curl -X POST http://localhost:8000/api/v1/agent/process-all
```

---

## 📋 PRÓXIMOS PASSOS

### **Esta Semana:**
1. **Implementar AgentConsolidator** conforme código acima
2. **Testar com dados mock** - validar GPT-4 insights
3. **Conectar frontend** - exibir insights no dashboard
4. **Refinar prompts** - melhorar qualidade insights

### **Próxima Semana:**
1. **Substituir dados mock** por integrações reais
2. **Automação diária** - cron jobs
3. **Error handling** robusto
4. **Performance optimization**

---

**🎯 Resultado:** **Agente Consolidador funcionando** com **GPT-4 + dados mock** gerando **insights médicos reais** em **1 semana**.

*Configuração criada: Junho 2025 - SevenScale MVP Backend*