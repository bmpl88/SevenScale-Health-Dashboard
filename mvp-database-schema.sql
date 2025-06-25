-- ========================================
-- SEVENSCALE MVP - DATABASE SCHEMA
-- Execute este script no Supabase SQL Editor
-- ========================================

-- Limpar tabelas MVP anteriores (se existirem)
DROP TABLE IF EXISTS mvp_integration_data CASCADE;
DROP TABLE IF EXISTS mvp_agent_insights CASCADE;
DROP TABLE IF EXISTS mvp_client_integrations CASCADE;
DROP TABLE IF EXISTS mvp_clients CASCADE;
DROP VIEW IF EXISTS mvp_client_dashboard_view CASCADE;

-- ========================================
-- 1. TABELA PRINCIPAL: mvp_clients
-- ========================================
CREATE TABLE mvp_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_clinica VARCHAR(255) NOT NULL,
  especialidade VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  email_contato VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  website VARCHAR(255),
  status VARCHAR(20) DEFAULT 'operational' CHECK (status IN ('operational', 'attention', 'critical')),
  revenue VARCHAR(50),
  patients INTEGER DEFAULT 0,
  performance INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_mvp_clients_status ON mvp_clients(status);
CREATE INDEX idx_mvp_clients_especialidade ON mvp_clients(especialidade);
CREATE INDEX idx_mvp_clients_created ON mvp_clients(created_at DESC);

-- ========================================
-- 2. TABELA: mvp_agent_insights (GPT-4)
-- ========================================
CREATE TABLE mvp_agent_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES mvp_clients(id) ON DELETE CASCADE,
  agent_type VARCHAR(50) DEFAULT 'consolidator',
  insights_data JSONB NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_mvp_agent_insights_client ON mvp_agent_insights(client_id);
CREATE INDEX idx_mvp_agent_insights_processed ON mvp_agent_insights(processed_at DESC);
CREATE INDEX idx_mvp_agent_insights_status ON mvp_agent_insights(status);

-- ========================================
-- 3. TABELA: mvp_client_integrations
-- ========================================
CREATE TABLE mvp_client_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES mvp_clients(id) ON DELETE CASCADE,
  integration_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'error')),
  credentials JSONB,
  last_sync TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(client_id, integration_type)
);

-- Índices
CREATE INDEX idx_mvp_integrations_client ON mvp_client_integrations(client_id);
CREATE INDEX idx_mvp_integrations_status ON mvp_client_integrations(status);
CREATE INDEX idx_mvp_integrations_type ON mvp_client_integrations(integration_type);

-- ========================================
-- 4. TABELA: mvp_integration_data
-- ========================================
CREATE TABLE mvp_integration_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES mvp_clients(id) ON DELETE CASCADE,
  integration_type VARCHAR(50) NOT NULL,
  data_period VARCHAR(20) DEFAULT '30_days',
  raw_data JSONB NOT NULL,
  collected_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_mvp_integration_data_client ON mvp_integration_data(client_id);
CREATE INDEX idx_mvp_integration_data_type ON mvp_integration_data(integration_type);
CREATE INDEX idx_mvp_integration_data_period ON mvp_integration_data(data_period);
CREATE INDEX idx_mvp_integration_data_collected ON mvp_integration_data(collected_at DESC);

-- ========================================
-- 5. VIEW CONSOLIDADA: mvp_client_dashboard_view
-- ========================================
CREATE OR REPLACE VIEW mvp_client_dashboard_view AS
SELECT 
  c.id,
  c.nome_clinica as clinic_name,
  c.especialidade as specialty,
  c.cidade as city,
  c.email_contato,
  c.telefone,
  c.website,
  c.status,
  c.performance,
  c.revenue,
  c.patients,
  c.created_at,
  
  -- Integrações
  COUNT(ci.id) as total_integrations,
  COUNT(ci.id) FILTER (WHERE ci.status = 'connected') as active_integrations,
  
  -- Último insight
  ai.insights_data as latest_insights,
  ai.processed_at as last_insight_at,
  
  -- ROI do último insight
  (ai.insights_data->'roi_analysis'->>'roi_percent') as roi_percent,
  
  -- Status summary do último insight
  ai.insights_data->'status_summary' as status_summary
  
FROM mvp_clients c
LEFT JOIN mvp_client_integrations ci ON c.id = ci.client_id
LEFT JOIN LATERAL (
  SELECT insights_data, processed_at
  FROM mvp_agent_insights
  WHERE client_id = c.id
  ORDER BY processed_at DESC
  LIMIT 1
) ai ON true
GROUP BY 
  c.id, c.nome_clinica, c.especialidade, c.cidade, c.email_contato, 
  c.telefone, c.website, c.status, c.performance, c.revenue, 
  c.patients, c.created_at, ai.insights_data, ai.processed_at;

-- ========================================
-- 6. DADOS DE EXEMPLO MVP
-- ========================================

-- Inserir 3 clientes MVP
INSERT INTO mvp_clients (nome_clinica, especialidade, cidade, email_contato, telefone, website, status, revenue, patients, performance) VALUES
('Dr. Silva - Clínica Médica', 'Clínica Médica', 'São Paulo, SP', 'contato@silva-clinica.com.br', '(11) 99999-9999', 'silva-clinica.com.br', 'operational', 'R$ 285k', 78, 87),
('Clínica CardioVida', 'Cardiologia', 'São Paulo, SP', 'contato@cardiovida.com.br', '(11) 98888-8888', 'cardiovida.com.br', 'operational', 'R$ 320k', 95, 92),
('Dermatologia Plus', 'Dermatologia', 'Rio de Janeiro, RJ', 'admin@dermaplus.com.br', '(21) 97777-7777', 'dermaplus.com.br', 'operational', 'R$ 295k', 82, 89)
ON CONFLICT (email_contato) DO NOTHING;

-- Inserir integrações de exemplo
INSERT INTO mvp_client_integrations (client_id, integration_type, status, last_sync) VALUES
-- Dr. Silva (5 integrações)
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@silva-clinica.com.br'), 'hubspot', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@silva-clinica.com.br'), 'google_analytics', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@silva-clinica.com.br'), 'meta_ads', 'error', NOW() - INTERVAL '2 hours'),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@silva-clinica.com.br'), 'google_calendar', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@silva-clinica.com.br'), 'whatsapp', 'connected', NOW()),

-- CardioVida (4 integrações)
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), 'hubspot', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), 'google_analytics', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), 'meta_ads', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), 'google_calendar', 'connected', NOW()),

-- Dermatologia Plus (3 integrações)
((SELECT id FROM mvp_clients WHERE email_contato = 'admin@dermaplus.com.br'), 'hubspot', 'disconnected', NULL),
((SELECT id FROM mvp_clients WHERE email_contato = 'admin@dermaplus.com.br'), 'google_analytics', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'admin@dermaplus.com.br'), 'whatsapp', 'connected', NOW())
ON CONFLICT (client_id, integration_type) DO NOTHING;

-- Inserir insights de exemplo
INSERT INTO mvp_agent_insights (client_id, insights_data) VALUES
-- Dr. Silva
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@silva-clinica.com.br'), '{
  "insights": [
    "Taxa de conversão 26% acima da média do setor",
    "Meta Ads com erro crítico - impacto na geração de leads",
    "WhatsApp automation gerando 40% mais agendamentos",
    "Performance geral excelente: 87/100"
  ],
  "action_items": [
    "URGENTE: Corrigir integração Meta Ads",
    "Implementar confirmação automática WhatsApp",
    "Otimizar campanhas Google Ads (+25% budget)",
    "Criar automação follow-up 24h pós-consulta"
  ],
  "roi_analysis": {
    "total_investment": "R$ 95.000",
    "total_revenue": "R$ 285.000",
    "roi_percent": "300%",
    "performance_score": 87,
    "monthly_growth": "15%"
  },
  "status_summary": {
    "overall_health": "very_good",
    "integrations_active": 4,
    "integrations_error": 1,
    "critical_issues": 1,
    "opportunities": 3
  },
  "alerts": [
    "Meta Ads desconectado há 2 horas",
    "Taxa de cancelamento subiu 8% última semana"
  ]
}'::jsonb),

-- CardioVida
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), '{
  "insights": [
    "MELHOR performance do portfólio: 92/100",
    "Todas integrações funcionando perfeitamente",
    "ROI excepcional: 356% vs média 200%",
    "Capacidade agenda próxima do limite (95%)"
  ],
  "action_items": [
    "Expandir agenda: +30% slots manhã",
    "Aumentar budget Meta Ads (+40%)",
    "Implementar lista de espera automatizada",
    "Criar campanha referral para cardiologistas"
  ],
  "roi_analysis": {
    "total_investment": "R$ 90.000",
    "total_revenue": "R$ 320.000",
    "roi_percent": "356%",
    "performance_score": 92,
    "monthly_growth": "22%"
  },
  "status_summary": {
    "overall_health": "excellent",
    "integrations_active": 4,
    "integrations_error": 0,
    "critical_issues": 0,
    "opportunities": 4
  },
  "recommendations": [
    "Modelo de sucesso para replicar em outras clínicas",
    "Considerar expansão para segunda unidade"
  ]
}'::jsonb),

-- Dermatologia Plus
((SELECT id FROM mvp_clients WHERE email_contato = 'admin@dermaplus.com.br'), '{
  "insights": [
    "HubSpot desconectado impactando pipeline",
    "Performance boa (89/100) apesar da integração faltante",
    "WhatsApp com alta taxa engajamento (94%)",
    "Potencial crescimento 40% com HubSpot ativo"
  ],
  "action_items": [
    "CRÍTICO: Reconectar HubSpot CRM imediatamente",
    "Configurar Meta Ads para procedimentos estéticos",
    "Implementar automação pós-procedimento",
    "Criar funil de skincare products"
  ],
  "roi_analysis": {
    "total_investment": "R$ 85.000",
    "total_revenue": "R$ 295.000",
    "roi_percent": "347%",
    "performance_score": 89,
    "monthly_growth": "12%",
    "potential_with_hubspot": "486%"
  },
  "status_summary": {
    "overall_health": "good",
    "integrations_active": 2,
    "integrations_error": 0,
    "critical_issues": 1,
    "opportunities": 3
  },
  "urgency": {
    "hubspot_reconnection": "high",
    "estimated_lost_revenue": "R$ 45.000/mês"
  }
}'::jsonb)
ON CONFLICT DO NOTHING;

-- Inserir dados de integração de exemplo
INSERT INTO mvp_integration_data (client_id, integration_type, data_period, raw_data) VALUES
-- Dr. Silva - HubSpot
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@silva-clinica.com.br'), 'hubspot', '30_days', '{
  "leads": 45,
  "conversions": 12,
  "pipeline_value": 89500,
  "lead_sources": ["Google Ads", "Indicação", "Site", "WhatsApp"],
  "conversion_rate": 26.7,
  "avg_deal_size": 7458,
  "sales_cycle_days": 12
}'::jsonb),

-- CardioVida - Meta Ads
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), 'meta_ads', '30_days', '{
  "impressions": 25000,
  "clicks": 750,
  "conversions": 32,
  "cpa": 156.25,
  "roas": 3.56,
  "ctr": 3.0,
  "audience_size": 850000,
  "top_performing_ad": "Checkup Cardiológico Completo"
}'::jsonb),

-- Dermatologia Plus - Google Analytics
((SELECT id FROM mvp_clients WHERE email_contato = 'admin@dermaplus.com.br'), 'google_analytics', '30_days', '{
  "sessions": 3420,
  "users": 2890,
  "conversions": 45,
  "bounce_rate": 28.5,
  "avg_session_duration": 185,
  "top_pages": ["/procedimentos-esteticos", "/skincare", "/agendamento"],
  "conversion_rate": 1.56,
  "organic_traffic": 68
}'::jsonb)
ON CONFLICT DO NOTHING;

-- ========================================
-- 7. VERIFICAÇÃO FINAL
-- ========================================

-- Verificar criação das tabelas
SELECT 'mvp_clients' as table_name, count(*) as records FROM mvp_clients
UNION ALL
SELECT 'mvp_agent_insights' as table_name, count(*) as records FROM mvp_agent_insights
UNION ALL  
SELECT 'mvp_client_integrations' as table_name, count(*) as records FROM mvp_client_integrations
UNION ALL
SELECT 'mvp_integration_data' as table_name, count(*) as records FROM mvp_integration_data;

-- Testar view consolidada
SELECT 
  clinic_name,
  specialty,
  status,
  performance,
  revenue,
  total_integrations,
  active_integrations,
  roi_percent
FROM mvp_client_dashboard_view
ORDER BY performance DESC;

-- ========================================
-- SUCESSO! MVP DATABASE PRONTO
-- ========================================

-- Resultado esperado:
-- ✅ 3 clientes MVP
-- ✅ 12 integrações configuradas
-- ✅ 3 insights gerados
-- ✅ 3 dados de integração
-- ✅ View consolidada funcionando