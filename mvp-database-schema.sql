-- ========================================
-- SEVENSCALE MVP - DATABASE SCHEMA ISOLADO
-- Execute no Supabase SQL Editor
-- ========================================

-- 🚨 IMPORTANTE: Schema MVP completamente separado do projeto maior

-- ========================================
-- 1. LIMPAR TABELAS MVP ANTERIORES (se existirem)
-- ========================================
DROP TABLE IF EXISTS mvp_integration_data CASCADE;
DROP TABLE IF EXISTS mvp_client_integrations CASCADE;
DROP TABLE IF EXISTS mvp_agent_insights CASCADE;
DROP TABLE IF EXISTS mvp_clients CASCADE;
DROP VIEW IF EXISTS mvp_client_dashboard_view CASCADE;

-- ========================================
-- 2. CRIAR TABELAS MVP ISOLADAS
-- ========================================

-- TABELA 1: mvp_clients (CLIENTES MVP)
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

-- TABELA 2: mvp_agent_insights (INSIGHTS GPT-4)
CREATE TABLE mvp_agent_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES mvp_clients(id) ON DELETE CASCADE,
  agent_type VARCHAR(50) DEFAULT 'consolidator',
  insights_data JSONB NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABELA 3: mvp_client_integrations (STATUS APIS)
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

-- TABELA 4: mvp_integration_data (DADOS COLETADOS)
CREATE TABLE mvp_integration_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES mvp_clients(id) ON DELETE CASCADE,
  integration_type VARCHAR(50) NOT NULL,
  data_period VARCHAR(20) DEFAULT '30_days',
  raw_data JSONB NOT NULL,
  collected_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 3. ÍNDICES PARA PERFORMANCE
-- ========================================
CREATE INDEX idx_mvp_clients_status ON mvp_clients(status);
CREATE INDEX idx_mvp_clients_especialidade ON mvp_clients(especialidade);
CREATE INDEX idx_mvp_agent_insights_client ON mvp_agent_insights(client_id);
CREATE INDEX idx_mvp_agent_insights_processed ON mvp_agent_insights(processed_at DESC);
CREATE INDEX idx_mvp_client_integrations_client ON mvp_client_integrations(client_id);
CREATE INDEX idx_mvp_client_integrations_status ON mvp_client_integrations(status);
CREATE INDEX idx_mvp_integration_data_client ON mvp_integration_data(client_id);
CREATE INDEX idx_mvp_integration_data_type ON mvp_integration_data(integration_type);

-- ========================================
-- 4. INSERIR DADOS MVP DE EXEMPLO
-- ========================================

-- Clientes MVP (3 clínicas reais)
INSERT INTO mvp_clients (nome_clinica, especialidade, cidade, email_contato, telefone, website, status, revenue, patients, performance) VALUES
('Dr. Silva - Clínica Médica', 'Clínica Médica', 'São Paulo, SP', 'contato@clinicasilva.com.br', '(11) 99999-9999', 'clinicasilva.com.br', 'operational', 'R$ 285k', 78, 87),
('CardioVida - Cardiologia', 'Cardiologia', 'São Paulo, SP', 'contato@cardiovida.com.br', '(11) 98888-8888', 'cardiovida.com.br', 'operational', 'R$ 320k', 95, 92),
('Dermatologia Plus', 'Dermatologia', 'Rio de Janeiro, RJ', 'contato@dermaplus.com.br', '(21) 97777-7777', 'dermaplus.com.br', 'operational', 'R$ 295k', 82, 89)
ON CONFLICT (email_contato) DO NOTHING;

-- Integrações MVP
INSERT INTO mvp_client_integrations (client_id, integration_type, status, last_sync) VALUES
-- Dr. Silva
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@clinicasilva.com.br'), 'hubspot', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@clinicasilva.com.br'), 'google_analytics', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@clinicasilva.com.br'), 'meta_ads', 'error', NOW() - INTERVAL '2 hours'),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@clinicasilva.com.br'), 'google_calendar', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@clinicasilva.com.br'), 'whatsapp', 'connected', NOW()),

-- CardioVida
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), 'hubspot', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), 'google_analytics', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), 'meta_ads', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), 'google_calendar', 'connected', NOW()),

-- Dermatologia Plus
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@dermaplus.com.br'), 'hubspot', 'disconnected', NULL),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@dermaplus.com.br'), 'google_analytics', 'connected', NOW()),
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@dermaplus.com.br'), 'whatsapp', 'connected', NOW())
ON CONFLICT (client_id, integration_type) DO NOTHING;

-- Insights GPT-4 de exemplo
INSERT INTO mvp_agent_insights (client_id, insights_data) VALUES
-- Dr. Silva
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@clinicasilva.com.br'), '{
  "insights": [
    "Taxa de conversão 26% acima da média do setor",
    "Meta Ads apresentando instabilidade - requer atenção",
    "Performance WhatsApp excelente: 86% taxa resposta",
    "Horário 14-16h tem 40% mais conversões"
  ],
  "action_items": [
    "URGENTE: Corrigir integração Meta Ads",
    "Implementar confirmação automática WhatsApp",
    "Aumentar budget Google Ads (+25%)",
    "Criar campanha remarketing horário nobre"
  ],
  "roi_analysis": {
    "total_investment": "R$ 95.000",
    "total_revenue": "R$ 285.000",
    "roi_percent": "300%",
    "performance_score": 87,
    "sector_comparison": "187% acima da média"
  },
  "status_summary": {
    "overall_health": "very_good",
    "integrations_active": 4,
    "integrations_error": 1,
    "critical_issues": 1
  },
  "alerts": [
    "Meta Ads desconectada há 2 horas",
    "Oportunidade: Otimizar horário 14-16h"
  ]
}'::jsonb),

-- CardioVida
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@cardiovida.com.br'), '{
  "insights": [
    "Melhor performance do portfólio: 92/100",
    "Todas integrações funcionando perfeitamente",
    "ROI superior: 356% vs média 200%",
    "Taxa conversão cardiologia: 22% (excelente)"
  ],
  "action_items": [
    "Expandir budget Meta Ads (+30%)",
    "Implementar automação follow-up pós-consulta",
    "Criar campanhas segmentadas por idade",
    "Otimizar landing page procedimentos"
  ],
  "roi_analysis": {
    "total_investment": "R$ 90.000",
    "total_revenue": "R$ 320.000",
    "roi_percent": "356%",
    "performance_score": 92,
    "sector_comparison": "256% acima da média"
  },
  "status_summary": {
    "overall_health": "excellent",
    "integrations_active": 4,
    "integrations_error": 0,
    "critical_issues": 0
  },
  "recommendations": [
    "Modelo de sucesso para replicar",
    "Expandir para outras especialidades"
  ]
}'::jsonb),

-- Dermatologia Plus
((SELECT id FROM mvp_clients WHERE email_contato = 'contato@dermaplus.com.br'), '{
  "insights": [
    "HubSpot desconectado afeta pipeline",
    "Performance ainda boa: 89/100",
    "WhatsApp engajamento alto: 91%",
    "Oportunidade: Reconectar CRM urgente"
  ],
  "action_items": [
    "CRÍTICO: Reconectar HubSpot CRM hoje",
    "Configurar Meta Ads para dermatologia",
    "Implementar automação agendamento",
    "Criar campanha procedimentos estéticos"
  ],
  "roi_analysis": {
    "total_investment": "R$ 85.000",
    "total_revenue": "R$ 295.000",
    "roi_percent": "347%",
    "performance_score": 89,
    "potential_improvement": "+15% com HubSpot"
  },
  "status_summary": {
    "overall_health": "good",
    "integrations_active": 2,
    "integrations_error": 0,
    "critical_issues": 1
  },
  "alerts": [
    "HubSpot desconectado há 3 dias",
    "Perda estimada: R$ 12k sem CRM"
  ]
}'::jsonb)
ON CONFLICT DO NOTHING;

-- ========================================
-- 5. CRIAR VIEW DASHBOARD CONSOLIDADA
-- ========================================
CREATE VIEW mvp_client_dashboard_view AS
SELECT 
  c.id,
  c.nome_clinica as clinic_name,
  c.especialidade as specialty,
  c.cidade as city,
  c.email_contato,
  c.status,
  c.performance,
  c.revenue,
  c.patients,
  
  -- Integrações
  COUNT(ci.id) as total_integrations,
  COUNT(ci.id) FILTER (WHERE ci.status = 'connected') as active_integrations,
  
  -- Último insight
  ai.insights_data->>'status_summary' as latest_status,
  ai.processed_at as last_insight_at,
  
  -- ROI do último insight
  (ai.insights_data->'roi_analysis'->>'roi_percent') as roi_percent,
  
  -- Data de criação
  c.created_at,
  c.updated_at
  
FROM mvp_clients c
LEFT JOIN mvp_client_integrations ci ON c.id = ci.client_id
LEFT JOIN LATERAL (
  SELECT insights_data, processed_at
  FROM mvp_agent_insights
  WHERE client_id = c.id
  ORDER BY processed_at DESC
  LIMIT 1
) ai ON true
GROUP BY c.id, c.nome_clinica, c.especialidade, c.cidade, c.email_contato, c.status, c.performance, c.revenue, c.patients, c.created_at, c.updated_at, ai.insights_data, ai.processed_at;

-- ========================================
-- 6. VERIFICAÇÃO FINAL
-- ========================================

-- Contar registros criados
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
-- 7. RESULTADO ESPERADO
-- ========================================

/*
Se tudo funcionou corretamente, você deve ver:

📊 TABELAS CRIADAS:
- mvp_clients: 3 records
- mvp_agent_insights: 3 records  
- mvp_client_integrations: 12 records
- mvp_integration_data: 0 records (será populada pelo backend)

🏥 CLIENTES:
- CardioVida: Performance 92, ROI 356%
- Dermatologia Plus: Performance 89, ROI 347%  
- Dr. Silva: Performance 87, ROI 300%

🔗 INTEGRAÇÕES:
- Total: 12 integrações configuradas
- Ativas: 9 integrações conectadas
- Erros: 1 (Meta Ads Dr. Silva)

✅ MVP DATABASE PRONTO PARA USO!
*/

-- ========================================
-- 🎯 PRÓXIMO PASSO: RODAR BACKEND
-- ========================================

/*
Agora execute:

1. cd mvp-backend/
2. npm install
3. cp .env.example .env
4. # Configurar SUPABASE_URL e OPENAI_API_KEY
5. npm run dev
6. # Testar: curl http://localhost:8001/api/mvp/health

🚀 Backend vai conectar automaticamente nessas tabelas!
*/