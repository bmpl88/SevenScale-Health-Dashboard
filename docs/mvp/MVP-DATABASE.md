# 🗄️ MVP Database Schema - Supabase

> **Schema otimizado para MVP Tier 1 - Tabelas essenciais para Agente Consolidador**

## 📊 OVERVIEW

**Database:** Supabase PostgreSQL  
**Objetivo:** Armazenar clientes, insights do agente e integrações para MVP  
**Limite MVP:** 10 clientes máximo  

---

## 🏗️ TABELAS ESSENCIAIS

### **1. clients - Tabela Principal**
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_clinica VARCHAR(255) NOT NULL,
  especialidade VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  email_contato VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  website VARCHAR(255),
  status VARCHAR(20) DEFAULT 'operational' CHECK (status IN ('operational', 'attention', 'critical')),
  revenue VARCHAR(50), -- "R$ 89.5k" format
  patients INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_especialidade ON clients(especialidade);
```

### **2. agent_insights - Insights GPT-4**
```sql
CREATE TABLE agent_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  agent_type VARCHAR(50) DEFAULT 'mvp-consolidator',
  insights_data JSONB NOT NULL, -- Insights estruturados do GPT-4
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_agent_insights_client ON agent_insights(client_id);
CREATE INDEX idx_agent_insights_processed ON agent_insights(processed_at DESC);
CREATE INDEX idx_agent_insights_status ON agent_insights(status);
```

### **3. client_integrations - APIs Conectadas**
```sql
CREATE TABLE client_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  integration_type VARCHAR(50) NOT NULL, -- 'hubspot', 'analytics', 'meta_ads', etc.
  status VARCHAR(20) DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'error')),
  credentials JSONB, -- API keys criptografadas
  last_sync TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(client_id, integration_type)
);

-- Índices
CREATE INDEX idx_integrations_client ON client_integrations(client_id);
CREATE INDEX idx_integrations_status ON client_integrations(status);
```

### **4. integration_data - Dados Coletados APIs**
```sql
CREATE TABLE integration_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  integration_type VARCHAR(50) NOT NULL,
  data_period VARCHAR(20) DEFAULT '30_days', -- '7_days', '30_days', '90_days'
  raw_data JSONB NOT NULL, -- Dados das APIs
  collected_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Particionamento por data para performance
  PARTITION BY RANGE (collected_at)
);

-- Índices
CREATE INDEX idx_integration_data_client ON integration_data(client_id);
CREATE INDEX idx_integration_data_type ON integration_data(integration_type);
CREATE INDEX idx_integration_data_period ON integration_data(data_period);
```

---

## 📊 DADOS DE EXEMPLO

### **Clientes MVP:**
```sql
INSERT INTO clients (nome_clinica, especialidade, cidade, email_contato, telefone, website, status, revenue, patients) VALUES
('Dr. Silva - Cardiologia', 'Cardiologia', 'São Paulo, SP', 'contato@cardiosilva.com.br', '(11) 99999-9999', 'cardiosilva.com.br', 'operational', 'R$ 89.5k', 150),
('Clínica Derma Plus', 'Dermatologia', 'Rio de Janeiro, RJ', 'contato@dermaplus.com.br', '(21) 88888-8888', 'dermaplus.com.br', 'operational', 'R$ 52.4k', 89),
('OdontoVita Centro', 'Odontologia', 'Belo Horizonte, MG', 'contato@odontovita.com.br', '(31) 77777-7777', 'odontovita.com.br', 'attention', 'R$ 65.8k', 203);
```

### **Integrações de Exemplo:**
```sql
INSERT INTO client_integrations (client_id, integration_type, status, last_sync) VALUES
((SELECT id FROM clients WHERE email_contato = 'contato@cardiosilva.com.br'), 'hubspot', 'connected', NOW()),
((SELECT id FROM clients WHERE email_contato = 'contato@cardiosilva.com.br'), 'google_analytics', 'connected', NOW()),
((SELECT id FROM clients WHERE email_contato = 'contato@cardiosilva.com.br'), 'meta_ads', 'error', NOW() - INTERVAL '2 hours');
```

### **Insights GPT-4 de Exemplo:**
```sql
INSERT INTO agent_insights (client_id, insights_data) VALUES
((SELECT id FROM clients WHERE email_contato = 'contato@cardiosilva.com.br'), '{
  "insights": [
    "Taxa de conversão 26% acima da média do setor",
    "CPA Meta Ads otimizado - oportunidade reduzir 15%",
    "Gargalo: 3h entre agendamento e confirmação"
  ],
  "action_items": [
    "Implementar confirmação automática WhatsApp",
    "Reduzir público Meta Ads para CPA < R$ 130"
  ],
  "roi_analysis": {
    "total_investment": "R$ 31.000",
    "total_revenue": "R$ 89.000",
    "roi_percent": "287%"
  }
}'::jsonb);
```

---

## 🔧 QUERIES ÚTEIS MVP

### **Dashboard Operacional:**
```sql
-- Status geral clientes
SELECT 
  COUNT(*) as total_clients,
  COUNT(*) FILTER (WHERE status = 'operational') as operational,
  COUNT(*) FILTER (WHERE status = 'attention') as attention,
  COUNT(*) FILTER (WHERE status = 'critical') as critical
FROM clients;

-- Últimos insights processados
SELECT 
  c.nome_clinica,
  ai.processed_at,
  ai.insights_data->>'roi_analysis' as roi
FROM agent_insights ai
JOIN clients c ON ai.client_id = c.id
ORDER BY ai.processed_at DESC
LIMIT 10;
```

### **Status Integrações:**
```sql
-- Integrações por cliente
SELECT 
  c.nome_clinica,
  ci.integration_type,
  ci.status,
  ci.last_sync
FROM clients c
LEFT JOIN client_integrations ci ON c.id = ci.client_id
ORDER BY c.nome_clinica, ci.integration_type;

-- Resumo integrações
SELECT 
  integration_type,
  COUNT(*) as total_clients,
  COUNT(*) FILTER (WHERE status = 'connected') as connected
FROM client_integrations
GROUP BY integration_type;
```

### **Performance Agente:**
```sql
-- Insights processados por dia
SELECT 
  DATE(processed_at) as date,
  COUNT(*) as insights_generated,
  COUNT(DISTINCT client_id) as clients_processed
FROM agent_insights
WHERE processed_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(processed_at)
ORDER BY date DESC;
```

---

## ⚡ OTIMIZAÇÕES MVP

### **Índices Compostos:**
```sql
-- Performance queries dashboard
CREATE INDEX idx_insights_client_date ON agent_insights(client_id, processed_at DESC);
CREATE INDEX idx_integrations_client_status ON client_integrations(client_id, status);
```

### **Views Úteis:**
```sql
-- View: Cliente com último insight
CREATE VIEW client_latest_insights AS
SELECT 
  c.*,
  ai.insights_data,
  ai.processed_at as last_insight_at
FROM clients c
LEFT JOIN LATERAL (
  SELECT insights_data, processed_at
  FROM agent_insights
  WHERE client_id = c.id
  ORDER BY processed_at DESC
  LIMIT 1
) ai ON true;

-- View: Status integrações por cliente
CREATE VIEW client_integrations_summary AS
SELECT 
  c.id as client_id,
  c.nome_clinica,
  COUNT(ci.id) as total_integrations,
  COUNT(ci.id) FILTER (WHERE ci.status = 'connected') as connected_integrations,
  ROUND(
    (COUNT(ci.id) FILTER (WHERE ci.status = 'connected')::decimal / GREATEST(COUNT(ci.id), 1)) * 100, 
    1
  ) as connection_percentage
FROM clients c
LEFT JOIN client_integrations ci ON c.id = ci.client_id
GROUP BY c.id, c.nome_clinica;
```

---

## 🔒 SEGURANÇA

### **RLS (Row Level Security):**
```sql
-- Habilitar RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_integrations ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (ajustar conforme auth)
CREATE POLICY "Users can view their own clients" ON clients
  FOR SELECT USING (auth.uid() = created_by);
```

### **Criptografia Credentials:**
```sql
-- Função para criptografar API keys
CREATE OR REPLACE FUNCTION encrypt_credentials(credentials JSONB)
RETURNS JSONB AS $$
BEGIN
  -- Implementar criptografia das credenciais APIs
  RETURN credentials;
END;
$$ LANGUAGE plpgsql;
```

---

## 📋 CHECKLIST IMPLEMENTAÇÃO

### **Fase 1 - Setup Básico:**
- [ ] Criar tabelas principais
- [ ] Inserir dados de teste (3 clientes)
- [ ] Configurar índices básicos
- [ ] Testar queries essenciais

### **Fase 2 - Otimização:**
- [ ] Criar views úteis
- [ ] Implementar RLS
- [ ] Configurar backup automático
- [ ] Monitoring performance

### **Fase 3 - Produção:**
- [ ] Criptografia credenciais
- [ ] Logs auditoria
- [ ] Políticas retenção dados
- [ ] Monitoring alertas

---

**🎯 Resultado:** Schema Supabase otimizado para **MVP Tier 1** com **performance**, **segurança** e **escalabilidade** para até **10 clientes**.

*Schema criado: Junho 2025 - SevenScale MVP Database*