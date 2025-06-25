# 🔗 MVP Integrações - 6 APIs Core

> **Integrações essenciais que alimentam o Agente Consolidador com dados médicos**

## 📊 VISÃO GERAL

### **6 Integrações Estratégicas:**
1. **HubSpot CRM** - Pipeline vendas + automação marketing
2. **Google Analytics** - Tráfego + comportamento pacientes
3. **Meta Ads** - Performance Facebook/Instagram
4. **Google Calendar** - Agendamentos + disponibilidade  
5. **WhatsApp Business** - Comunicação pacientes
6. **RD Station CRM** - CRM brasileiro (Fase 2)

### **Objetivo:**
Consolidar dados de **múltiplas fontes** em **JSON único** para o **Agente Consolidador GPT-4** processar e gerar **insights médicos acionáveis**.

---

## 🎯 FASE 1 - 5 INTEGRAÇÕES INICIAIS

### **1. HubSpot CRM**

#### **Dados Coletados:**
```json
{
  "hubspot": {
    "leads": 45,
    "conversoes": 12,
    "pipeline_value": "R$ 89.000",
    "lead_sources": ["Google Ads", "Indicação", "Site"],
    "conversion_rate": "26.7%",
    "avg_deal_size": "R$ 7.416",
    "sales_cycle_days": 18,
    "top_campaigns": [
      {"name": "Cardiologia SP", "leads": 23, "conversions": 8},
      {"name": "Check-up Preventivo", "leads": 12, "conversions": 3}
    ]
  }
}
```

#### **API Implementation:**
```javascript
// integrations/hubspot.js
import axios from 'axios';

export class HubSpotIntegration {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.hubapi.com';
  }

  async getClientData(clientId, period = 30) {
    try {
      const [contacts, deals, campaigns] = await Promise.all([
        this.getContacts(period),
        this.getDeals(period), 
        this.getCampaigns(period)
      ]);

      return {
        leads: contacts.total,
        conversoes: deals.closed_won,
        pipeline_value: deals.total_value,
        lead_sources: this.extractSources(contacts),
        conversion_rate: this.calculateConversionRate(contacts, deals),
        avg_deal_size: deals.avg_size,
        sales_cycle_days: deals.avg_cycle,
        top_campaigns: campaigns.top_performers
      };
    } catch (error) {
      logger.error('HubSpot integration error:', error);
      throw error;
    }
  }
}
```

#### **Insights Gerados:**
- Taxa conversão vs média do setor
- ROI por canal de aquisição  
- Gargalos no pipeline vendas
- Oportunidades automação

---

### **2. Google Analytics**

#### **Dados Coletados:**
```json
{
  "google_analytics": {
    "sessions": 2340,
    "users": 1890,
    "conversions": 28,
    "conversion_rate": "1.2%",
    "avg_session_duration": "3:24",
    "bounce_rate": "45%",
    "top_pages": [
      {"page": "/cardiologia", "views": 456, "conversions": 8},
      {"page": "/agendamento", "views": 234, "conversions": 12},
      {"page": "/contato", "views": 189, "conversions": 5}
    ],
    "traffic_sources": {
      "organic": 45,
      "paid": 30, 
      "direct": 15,
      "social": 10
    },
    "device_breakdown": {
      "mobile": 65,
      "desktop": 30,
      "tablet": 5
    }
  }
}
```

#### **API Implementation:**
```javascript
// integrations/googleAnalytics.js
import { google } from 'googleapis';

export class GoogleAnalyticsIntegration {
  constructor(credentials) {
    this.analytics = google.analytics('v3');
    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly']
    });
  }

  async getClientData(clientId, period = 30) {
    const authClient = await this.auth.getClient();
    google.options({ auth: authClient });

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - period * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    // Implementar coleta dados específicos
    const response = await this.analytics.data.ga.get({
      'ids': `ga:${clientId}`,
      'start-date': startDate,
      'end-date': endDate,
      'metrics': 'ga:sessions,ga:users,ga:goalCompletions',
      'dimensions': 'ga:source,ga:medium,ga:pagePath'
    });

    return this.processAnalyticsData(response.data);
  }
}
```

#### **Insights Gerados:**
- Páginas com maior conversão
- Fontes tráfego mais eficazes
- Comportamento pacientes por device
- Oportunidades SEO/conteúdo

---

### **3. Meta Ads (Facebook/Instagram)**

#### **Dados Coletados:**
```json
{
  "meta_ads": {
    "impressoes": 15000,
    "clicks": 450,
    "conversions": 18,
    "ctr": "3.0%",
    "cpa": "R$ 156",
    "roas": 2.8,
    "spent": "R$ 2.808",
    "revenue_attributed": "R$ 7.862",
    "campaigns": [
      {
        "name": "Cardiologia - Checkup",
        "impressions": 8500,
        "clicks": 255,
        "conversions": 12,
        "cpa": "R$ 142",
        "roas": 3.2
      }
    ],
    "audiences": {
      "best_performing": "Homens 35-55 SP Capital",
      "age_breakdown": {"25-34": 20, "35-44": 45, "45-54": 25, "55+": 10}
    }
  }
}
```

#### **API Implementation:**
```javascript
// integrations/metaAds.js
import { FacebookAdsApi, AdAccount } from 'facebook-nodejs-business-sdk';

export class MetaAdsIntegration {
  constructor(accessToken, adAccountId) {
    this.api = FacebookAdsApi.init(accessToken);
    this.adAccount = new AdAccount(adAccountId);
  }

  async getClientData(clientId, period = 30) {
    const since = new Date(Date.now() - period * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];
    
    const campaigns = await this.adAccount.getCampaigns([
      'name', 'objective', 'status'
    ], {
      time_range: { since, until: new Date().toISOString().split('T')[0] }
    });

    const insights = await this.adAccount.getInsights([
      'impressions', 'clicks', 'conversions', 'spend', 'ctr', 'cpa'
    ], {
      time_range: { since, until: new Date().toISOString().split('T')[0] }
    });

    return this.processMetaData(campaigns, insights);
  }
}
```

#### **Insights Gerados:**
- CPA vs benchmarks setor médico
- Audiências com maior ROI
- Horários/dias mais eficazes
- Otimizações criativo/targeting

---

### **4. Google Calendar**

#### **Dados Coletados:**
```json
{
  "google_calendar": {
    "agendamentos": 28,
    "cancelamentos": 3,
    "no_shows": 2,
    "ocupacao_percent": 85,
    "receita_agendamentos": "R$ 8.400",
    "horarios_pico": ["09:00-11:00", "14:00-16:00"],
    "tipos_consulta": {
      "primeira_consulta": 12,
      "retorno": 14,
      "emergencia": 2
    },
    "tempo_medio_consulta": 45,
    "intervalos_disponiveis": 23,
    "conversion_agendamento": "78%"
  }
}
```

#### **API Implementation:**
```javascript
// integrations/googleCalendar.js
import { google } from 'googleapis';

export class GoogleCalendarIntegration {
  constructor(credentials) {
    this.calendar = google.calendar('v3');
    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly']
    });
  }

  async getClientData(clientId, period = 30) {
    const authClient = await this.auth.getClient();
    google.options({ auth: authClient });

    const timeMin = new Date(Date.now() - period * 24 * 60 * 60 * 1000).toISOString();
    const timeMax = new Date().toISOString();

    const events = await this.calendar.events.list({
      calendarId: `${clientId}@sevenscale.com.br`,
      timeMin,
      timeMax,
      maxResults: 1000,
      singleEvents: true,
      orderBy: 'startTime'
    });

    return this.processCalendarData(events.data.items);
  }
}
```

#### **Insights Gerados:**
- Taxa ocupação vs capacidade
- Horários com maior demanda
- Padrões cancelamento/no-show
- Oportunidades otimização agenda

---

### **5. WhatsApp Business**

#### **Dados Coletados:**
```json
{
  "whatsapp": {
    "mensagens_enviadas": 156,
    "mensagens_respondidas": 134,
    "taxa_resposta": "86%",
    "tempo_resposta_medio": "12min",
    "conversas_iniciadas": 67,
    "conversas_finalizadas": 45,
    "agendamentos_whatsapp": 18,
    "automacoes_ativas": 5,
    "satisfaction_score": 4.3,
    "tipos_mensagem": {
      "agendamento": 45,
      "duvidas": 78,
      "resultados": 23,
      "cancelamento": 10
    }
  }
}
```

#### **API Implementation:**
```javascript
// integrations/whatsapp.js
import axios from 'axios';

export class WhatsAppIntegration {
  constructor(token, phoneNumberId) {
    this.token = token;
    this.phoneNumberId = phoneNumberId;
    this.baseURL = 'https://graph.facebook.com/v18.0';
  }

  async getClientData(clientId, period = 30) {
    try {
      const analytics = await axios.get(
        `${this.baseURL}/${this.phoneNumberId}/analytics`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
          params: {
            start: Math.floor((Date.now() - period * 24 * 60 * 60 * 1000) / 1000),
            end: Math.floor(Date.now() / 1000),
            granularity: 'DAY'
          }
        }
      );

      return this.processWhatsAppData(analytics.data);
    } catch (error) {
      logger.error('WhatsApp integration error:', error);
      throw error;
    }
  }
}
```

#### **Insights Gerados:**
- Tempo resposta vs expectativa pacientes
- Taxa conversão WhatsApp → agendamento
- Eficácia automações ativas
- Oportunidades melhoria atendimento

---

## 🚀 FASE 2 - RD STATION CRM

### **6. RD Station CRM**

#### **Dados Coletados:**
```json
{
  "rd_station": {
    "leads_qualificados": 23,
    "score_medio": 75,
    "taxa_nutricao": "67%",
    "funil_conversao": [45, 28, 18, 12],
    "emails_enviados": 234,
    "emails_abertos": 156,
    "emails_clicados": 45,
    "automacoes_ativas": 8,
    "segmentacoes": [
      {"nome": "Interesse Cardiologia", "leads": 34},
      {"nome": "Agendamento Pendente", "leads": 12}
    ],
    "lifecycle_stage": {
      "lead": 34,
      "mql": 23, 
      "sql": 15,
      "customer": 8
    }
  }
}
```

#### **Justificativa RD Station:**
- **🇧🇷 Mercado Brasileiro:** CRM muito usado por médicos/clínicas no Brasil
- **💰 Custo-benefício:** Alternativa nacional ao HubSpot
- **🔄 Complementaridade:** Clientes podem usar RD + HubSpot diferentes fins
- **📈 Market Share:** Significativo no segmento SMB médico

---

## ⚡ IMPLEMENTAÇÃO TÉCNICA

### **Consolidador de Integrações:**
```javascript
// services/integrationsConsolidator.js
export class IntegrationsConsolidator {
  constructor() {
    this.hubspot = new HubSpotIntegration();
    this.analytics = new GoogleAnalyticsIntegration();
    this.metaAds = new MetaAdsIntegration();
    this.calendar = new GoogleCalendarIntegration();
    this.whatsapp = new WhatsAppIntegration();
    this.rdStation = new RDStationIntegration();
  }

  async consolidateClientData(clientId) {
    try {
      const [hubspot, analytics, metaAds, calendar, whatsapp, rdStation] = 
        await Promise.allSettled([
          this.hubspot.getClientData(clientId),
          this.analytics.getClientData(clientId),
          this.metaAds.getClientData(clientId),
          this.calendar.getClientData(clientId),
          this.whatsapp.getClientData(clientId),
          this.rdStation.getClientData(clientId)
        ]);

      return {
        client: await this.getClientInfo(clientId),
        period: "últimos 30 dias",
        hubspot: hubspot.status === 'fulfilled' ? hubspot.value : null,
        google_analytics: analytics.status === 'fulfilled' ? analytics.value : null,
        meta_ads: metaAds.status === 'fulfilled' ? metaAds.value : null,
        google_calendar: calendar.status === 'fulfilled' ? calendar.value : null,
        whatsapp: whatsapp.status === 'fulfilled' ? whatsapp.value : null,
        rd_station: rdStation.status === 'fulfilled' ? rdStation.value : null,
        consolidated_at: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Integration consolidation error:', error);
      throw error;
    }
  }
}
```

### **Error Handling Robusto:**
```javascript
// middleware/integrationErrorHandler.js
export const handleIntegrationErrors = (integration, error) => {
  const errorMap = {
    'rate_limit_exceeded': 'API rate limit - retry in 1h',
    'invalid_token': 'Token expirado - reautenticar',
    'insufficient_permissions': 'Permissões insuficientes',
    'service_unavailable': 'Serviço temporariamente indisponível'
  };

  logger.warn(`${integration} integration warning:`, {
    error: errorMap[error.code] || error.message,
    timestamp: new Date().toISOString(),
    retry_strategy: 'exponential_backoff'
  });

  // Retorna dados vazios mas permite processamento continuar
  return null;
};
```

---

## 📋 CRONOGRAMA IMPLEMENTAÇÃO

### **Semana 1-2: Core Setup**
- [ ] Setup básico 5 integrações
- [ ] Credenciais e autenticação
- [ ] Testes conexão APIs
- [ ] Error handling básico

### **Semana 3-4: Data Collection**
- [ ] Implementar coleta dados específicos
- [ ] Estruturar JSON consolidado
- [ ] Testes com dados reais
- [ ] Rate limiting e cache

### **Semana 5-6: Integration + Agent**
- [ ] Conectar com Agente Consolidador
- [ ] Processamento automático
- [ ] Validação insights gerados
- [ ] Performance optimization

### **Semana 7-8: RD Station + Polish**
- [ ] Adicionar RD Station CRM
- [ ] Refinamento error handling
- [ ] Monitoring e alertas
- [ ] Documentação completa

---

**🎯 Resultado:** **6 integrações robustas** alimentando **Agente Consolidador** com **dados consolidados** para gerar **insights médicos acionáveis diários**.

*Documentação criada: Junho 2025 - SevenScale MVP Integrações*