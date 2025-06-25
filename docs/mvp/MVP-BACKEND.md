# 🚀 MVP Backend - Agente Consolidador

> **Node.js + GPT-4 direto para processamento inteligente de dados médicos**

## 🏗️ ARQUITETURA BACKEND

### **Stack Técnica Atual:**
- **✅ Node.js + Express** - Servidor funcionando  
- **✅ Supabase PostgreSQL** - Database conectado
- **✅ APIs REST** - Endpoints básicos testados
- **⚙️ GPT-4 Integration** - A implementar
- **⚙️ 6 APIs Integrações** - A implementar

### **Fluxo de Processamento:**
```
APIs (6) → Node.js → JSON → GPT-4 → Insights → Supabase → Frontend
```

---

## 🤖 AGENTE CONSOLIDADOR

### **Conceito:**
**UM agente único** que substitui os 7 agentes especializados, focando no **resultado final** em vez do processo interno.

### **Processamento GPT-4:**
```javascript
// 1. Coleta dados de todas APIs
const consolidatedData = {
  client: clientInfo,
  period: "últimos 30 dias",
  hubspot: await getHubSpotData(clientId),
  analytics: await getGoogleAnalyticsData(clientId),
  metaAds: await getMetaAdsData(clientId),
  calendar: await getCalendarData(clientId),
  whatsapp: await getWhatsAppData(clientId),
  rdStation: await getRDStationData(clientId)
};

// 2. Envia para GPT-4
const gptResponse = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{
    role: "system",
    content: "Você é um especialista em growth marketing médico..."
  }, {
    role: "user", 
    content: JSON.stringify(consolidatedData)
  }],
  max_tokens: 2000
});

// 3. Salva insights no Supabase
await saveInsights(clientId, gptResponse.insights);
```

---

## 📊 ESTRUTURA DE DADOS

### **Input Consolidado (JSON):**
```json
{
  "client": {
    "name": "Dr. Silva - Cardiologia",
    "specialty": "Cardiologia",
    "location": "São Paulo, SP"
  },
  "period": "últimos 30 dias",
  "hubspot": {
    "leads": 45,
    "conversoes": 12,
    "pipeline_value": "R$ 89.000",
    "lead_sources": ["Google Ads", "Indicação", "Site"]
  },
  "google_analytics": {
    "sessions": 2340,
    "users": 1890,
    "conversions": 28,
    "top_pages": ["/cardiologia", "/agendamento", "/contato"]
  },
  "meta_ads": {
    "impressoes": 15000,
    "clicks": 450,
    "conversions": 18,
    "cpa": "R$ 156",
    "roas": 2.8
  },
  "google_calendar": {
    "agendamentos": 28,
    "cancelamentos": 3,
    "ocupacao_percent": 85,
    "horarios_pico": ["09:00-11:00", "14:00-16:00"]
  },
  "whatsapp": {
    "mensagens_enviadas": 156,
    "mensagens_respondidas": 134,
    "taxa_resposta": "86%",
    "tempo_resposta_medio": "12min"
  },
  "rd_station": {
    "leads_qualificados": 23,
    "score_medio": 75,
    "taxa_nutricao": "67%",
    "funil_conversao": [45, 28, 18, 12]
  }
}
```

### **Output GPT-4 (Estruturado):**
```json
{
  "insights": [
    "Taxa de conversão 26% acima da média do setor",
    "CPA Meta Ads otimizado - oportunidade reduzir 15%", 
    "Gargalo: 3h entre agendamento e confirmação",
    "WhatsApp response time excelente (12min vs média 45min)",
    "Horário 14-16h tem 40% mais conversões"
  ],
  "action_items": [
    "Implementar confirmação automática WhatsApp",
    "Reduzir público Meta Ads para CPA < R$ 130",
    "Criar automação follow-up 1h após agendamento",
    "Aumentar budget horário 14-16h (+30%)"
  ],
  "roi_analysis": {
    "total_investment": "R$ 31.000",
    "total_revenue": "R$ 89.000", 
    "roi_percent": "287%",
    "comparison": "187% acima da média do setor"
  },
  "alerts": [
    "Meta Ads CPA subiu 23% últimos 7 dias",
    "Taxa cancelamento aumentou 15% vs mês anterior"
  ],
  "recommendations": [
    "Implementar remarketing para visitantes /cardiologia", 
    "Criar landing page específica campanhas Meta",
    "Automatizar lembretes WhatsApp 24h antes consulta"
  ]
}
```

---

## 🔧 IMPLEMENTAÇÃO TÉCNICA

### **1. Integração GPT-4:**
```javascript
// config/openai.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default openai;
```

### **2. Serviço Agente Consolidador:**
```javascript
// services/agentConsolidator.js
import openai from '../config/openai.js';
import { dbService } from '../lib/database.js';

export class AgentConsolidator {
  
  async processClientData(clientId) {
    try {
      // 1. Coleta dados todas APIs
      const consolidatedData = await this.collectAllData(clientId);
      
      // 2. Processa com GPT-4
      const insights = await this.generateInsights(consolidatedData);
      
      // 3. Salva no Supabase
      await this.saveInsights(clientId, insights);
      
      return insights;
    } catch (error) {
      logger.error('Agent Consolidator error:', error);
      throw error;
    }
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

    return JSON.parse(response.choices[0].message.content);
  }

  getSystemPrompt() {
    return `
Você é um especialista em growth marketing médico da SevenScale.

Analise os dados consolidados e gere:
1. 3-5 insights específicos e acionáveis
2. Action items priorizados 
3. Análise ROI detalhada
4. Alertas críticos se houver
5. Recomendações de otimização

Foque em:
- Especialidade médica específica
- Gargalos no funil de conversão
- Oportunidades de otimização
- ROI mensurável
- Ações implementáveis

Responda sempre em JSON estruturado.
    `;
  }
}
```

### **3. APIs Endpoints:**
```javascript
// routes/agent.js
import { AgentConsolidator } from '../services/agentConsolidator.js';

const agent = new AgentConsolidator();

// Processar cliente específico
router.post('/process/:clientId', async (req, res) => {
  try {
    const insights = await agent.processClientData(req.params.clientId);
    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Processar todos clientes (automático)
router.post('/process-all', async (req, res) => {
  try {
    const results = await agent.processAllClients();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 💰 CUSTOS GPT-4

### **Estimativa Mensal:**
- **Input:** ~3k tokens/cliente/dia
- **Output:** ~800 tokens/cliente/dia  
- **Total:** 3.8k tokens/dia por cliente

**Custos (10 clientes):**
- **Tokens/mês:** 1.14M tokens
- **Custo/mês:** ~$34 USD
- **Custo/cliente:** ~$3.4 USD/mês

### **Vantagens:**
- ✅ **Context window 128k** - processa muito dado
- ✅ **Velocidade:** 2-5 segundos resposta
- ✅ **Custo baixo:** $0.03/1k tokens
- ✅ **Qualidade:** Insights médicos especializados

---

## 📋 PRÓXIMAS IMPLEMENTAÇÕES

### **Fase 1 - Core Agent (Semana 1-2):**
- [ ] Integração OpenAI GPT-4
- [ ] Serviço AgentConsolidator
- [ ] Endpoints básicos (/process)
- [ ] Sistema de prompts médicos

### **Fase 2 - APIs Integration (Semana 3-4):**
- [ ] Conectores 6 APIs
- [ ] Consolidação dados JSON
- [ ] Error handling robusto
- [ ] Rate limiting APIs

### **Fase 3 - Automação (Semana 5-6):**
- [ ] Processamento automático diário
- [ ] Sistema de alertas
- [ ] Histórico insights
- [ ] Performance monitoring

### **Fase 4 - Otimização (Semana 7-8):**
- [ ] Cache inteligente
- [ ] Prompts especializados por área médica
- [ ] A/B testing insights
- [ ] Métricas de eficácia

---

**🎯 Resultado:** Agente consolidador entregando **insights médicos diários** de **qualidade profissional** com **custo operacional baixo**.

*Documentação criada: Junho 2025 - SevenScale MVP Backend*