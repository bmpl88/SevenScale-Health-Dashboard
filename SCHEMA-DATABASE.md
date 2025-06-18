# 🗄️ ESTRUTURA DO BANCO DE DADOS - SUPABASE

**Schema Completo para Dashboard do Cliente**

Data: Janeiro 2025  
Versão: v1.1.0-schema

## 🏗️ TABELAS PRINCIPAIS

### 📋 **1. CLÍNICAS (clinicas)**

```sql
CREATE TABLE clinicas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Dados Básicos
  nome VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  
  -- Endereço
  endereco_completo TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(10),
  
  -- Configurações
  timezone VARCHAR(50) DEFAULT 'America/Sao_Paulo',
  logo_url TEXT,
  cores_tema JSONB,
  
  -- Status
  ativo BOOLEAN DEFAULT true,
  plano VARCHAR(50) DEFAULT 'basic',
  
  -- Integrações
  hubspot_api_key TEXT,
  google_calendar_config JSONB,
  calendly_config JSONB,
  n8n_webhook_url TEXT
);
```

### 👨‍⚕️ **2. MÉDICOS (medicos)**

```sql
CREATE TABLE medicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id UUID REFERENCES clinicas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Dados Pessoais
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  
  -- Dados Profissionais
  crm VARCHAR(20) NOT NULL,
  especialidades TEXT[] DEFAULT '{}',
  
  -- Configurações de Agenda
  horario_inicio TIME DEFAULT '08:00',
  horario_fim TIME DEFAULT '18:00',
  dias_trabalho INTEGER[] DEFAULT '{1,2,3,4,5}', -- 1=Segunda, 7=Domingo
  duracao_consulta INTEGER DEFAULT 30, -- minutos
  intervalo_consultas INTEGER DEFAULT 15, -- minutos
  
  -- Integrações
  google_calendar_id TEXT,
  calendly_username TEXT,
  
  -- Status
  ativo BOOLEAN DEFAULT true,
  disponivel_whatsapp BOOLEAN DEFAULT true
);
```

### 🩺 **3. SERVIÇOS (servicos)**

```sql
CREATE TABLE servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id UUID REFERENCES clinicas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Dados Básicos
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  categoria VARCHAR(100),
  
  -- Pricing
  valor_particular DECIMAL(10,2),
  aceita_convenio BOOLEAN DEFAULT false,
  valores_convenio JSONB, -- {unimed: 150.00, bradesco: 120.00}
  
  -- Configurações
  duracao_minutos INTEGER DEFAULT 30,
  requer_preparo BOOLEAN DEFAULT false,
  instrucoes_preparo TEXT,
  materiais_necessarios TEXT[],
  
  -- Médicos que atendem
  medicos_habilitados UUID[] DEFAULT '{}',
  
  -- Status
  ativo BOOLEAN DEFAULT true,
  disponivel_whatsapp BOOLEAN DEFAULT true,
  destaque BOOLEAN DEFAULT false
);
```

### 🎁 **4. PROMOÇÕES (promocoes)**

```sql
CREATE TABLE promocoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id UUID REFERENCES clinicas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Dados Básicos
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  tipo VARCHAR(50), -- 'desconto_percentual', 'desconto_valor', 'pacote', 'gratis'
  
  -- Configurações da Promoção
  valor_desconto DECIMAL(10,2),
  percentual_desconto INTEGER,
  
  -- Aplicabilidade
  servicos_incluidos UUID[],
  medicos_incluidos UUID[],
  
  -- Segmentação
  idade_minima INTEGER,
  idade_maxima INTEGER,
  genero VARCHAR(20), -- 'masculino', 'feminino', 'todos'
  primeira_consulta BOOLEAN DEFAULT false,
  
  -- Período
  data_inicio DATE,
  data_fim DATE,
  dias_semana INTEGER[], -- [1,2,3,4,5] para seg-sex
  horario_inicio TIME,
  horario_fim TIME,
  
  -- Limites
  quantidade_maxima INTEGER,
  quantidade_usada INTEGER DEFAULT 0,
  valor_minimo_compra DECIMAL(10,2),
  
  -- Status
  ativo BOOLEAN DEFAULT true,
  disponivel_whatsapp BOOLEAN DEFAULT true
);
```

### 📊 **5. MÉTRICAS DIÁRIAS (metricas_diarias)**

```sql
CREATE TABLE metricas_diarias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id UUID REFERENCES clinicas(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Agendamentos
  total_agendamentos INTEGER DEFAULT 0,
  agendamentos_confirmados INTEGER DEFAULT 0,
  agendamentos_cancelados INTEGER DEFAULT 0,
  agendamentos_remarcados INTEGER DEFAULT 0,
  
  -- Conversão
  leads_recebidos INTEGER DEFAULT 0,
  leads_convertidos INTEGER DEFAULT 0,
  taxa_conversao DECIMAL(5,2) DEFAULT 0,
  
  -- Financeiro
  receita_total DECIMAL(10,2) DEFAULT 0,
  receita_particular DECIMAL(10,2) DEFAULT 0,
  receita_convenio DECIMAL(10,2) DEFAULT 0,
  
  -- Campanhas
  investimento_ads DECIMAL(10,2) DEFAULT 0,
  impressoes_ads INTEGER DEFAULT 0,
  cliques_ads INTEGER DEFAULT 0,
  ctr_ads DECIMAL(5,2) DEFAULT 0,
  
  -- Satisfação
  nps_score INTEGER,
  avaliacoes_recebidas INTEGER DEFAULT 0,
  
  UNIQUE(clinica_id, data)
);
```

### 📅 **6. AGENDAMENTOS (agendamentos)**

```sql
CREATE TABLE agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id UUID REFERENCES clinicas(id) ON DELETE CASCADE,
  medico_id UUID REFERENCES medicos(id),
  servico_id UUID REFERENCES servicos(id),
  promocao_id UUID REFERENCES promocoes(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Dados do Paciente
  paciente_nome VARCHAR(255) NOT NULL,
  paciente_telefone VARCHAR(20),
  paciente_email VARCHAR(255),
  paciente_cpf VARCHAR(14),
  paciente_idade INTEGER,
  paciente_genero VARCHAR(20),
  
  -- Dados do Agendamento
  data_agendamento DATE NOT NULL,
  horario_inicio TIME NOT NULL,
  horario_fim TIME NOT NULL,
  
  -- Valores
  valor_total DECIMAL(10,2),
  valor_desconto DECIMAL(10,2) DEFAULT 0,
  forma_pagamento VARCHAR(50),
  tipo_atendimento VARCHAR(50), -- 'particular', 'convenio'
  convenio_nome VARCHAR(100),
  
  -- Status
  status VARCHAR(50) DEFAULT 'agendado', -- 'agendado', 'confirmado', 'realizado', 'cancelado', 'faltou'
  
  -- Origem
  origem VARCHAR(50), -- 'whatsapp', 'site', 'telefone', 'presencial'
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  
  -- Observações
  observacoes TEXT,
  
  -- Integrações
  google_event_id TEXT,
  calendly_event_id TEXT,
  hubspot_deal_id TEXT
);
```

### 🤖 **7. LOGS DOS AGENTES (agentes_logs)**

```sql
CREATE TABLE agentes_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id UUID REFERENCES clinicas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Identificação do Agente
  agente_nome VARCHAR(100) NOT NULL, -- 'DIAGNOSTICADOR', 'ARQUITETO_CLINICO', etc.
  agente_versao VARCHAR(20) DEFAULT '1.0',
  
  -- Processamento
  dados_entrada JSONB,
  insights_gerados JSONB,
  acoes_recomendadas JSONB,
  
  -- Performance
  tempo_processamento INTEGER, -- milissegundos
  confianca_score DECIMAL(3,2), -- 0 a 1
  
  -- Status
  status VARCHAR(50) DEFAULT 'sucesso', -- 'sucesso', 'erro', 'processando'
  erro_message TEXT
);
```

### 📱 **8. INTERAÇÕES WHATSAPP (whatsapp_interacoes)**

```sql
CREATE TABLE whatsapp_interacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinica_id UUID REFERENCES clinicas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Dados do Contato
  telefone VARCHAR(20) NOT NULL,
  nome VARCHAR(255),
  
  -- Interação
  tipo_interacao VARCHAR(50), -- 'mensagem_recebida', 'mensagem_enviada', 'agendamento', 'cancelamento'
  conteudo_mensagem TEXT,
  
  -- Contexto
  intent VARCHAR(100), -- 'agendar_consulta', 'cancelar_agendamento', 'informacoes_servico'
  entidades_extraidas JSONB,
  
  -- Resultado
  acao_executada VARCHAR(100),
  agendamento_id UUID REFERENCES agendamentos(id),
  
  -- Bot Performance
  bot_confianca DECIMAL(3,2),
  tempo_resposta INTEGER -- milissegundos
);
```

---

## 🔗 RELACIONAMENTOS E ÍNDICES

### **FOREIGN KEYS:**
```sql
-- Já definidas nas tabelas acima
```

### **ÍNDICES PRINCIPAIS:**
```sql
-- Performance para consultas frequentes
CREATE INDEX idx_agendamentos_clinica_data ON agendamentos(clinica_id, data_agendamento);
CREATE INDEX idx_metricas_clinica_data ON metricas_diarias(clinica_id, data);
CREATE INDEX idx_whatsapp_telefone ON whatsapp_interacoes(telefone);
CREATE INDEX idx_agentes_logs_clinica_agente ON agentes_logs(clinica_id, agente_nome);
CREATE INDEX idx_servicos_clinica_ativo ON servicos(clinica_id, ativo);
CREATE INDEX idx_medicos_clinica_ativo ON medicos(clinica_id, ativo);
```

---

## 🔄 TRIGGERS E AUTOMAÇÕES

### **1. ATUALIZAÇÃO AUTOMÁTICA DE TIMESTAMPS:**
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar em todas as tabelas com updated_at
CREATE TRIGGER update_clinicas_updated_at BEFORE UPDATE ON clinicas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medicos_updated_at BEFORE UPDATE ON medicos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_servicos_updated_at BEFORE UPDATE ON servicos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ... (continuar para outras tabelas)
```

### **2. ATUALIZAÇÃO AUTOMÁTICA DE MÉTRICAS:**
```sql
CREATE OR REPLACE FUNCTION atualizar_metricas_diarias()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualizar contador de agendamentos quando novo agendamento é criado
    INSERT INTO metricas_diarias (clinica_id, data, total_agendamentos)
    VALUES (NEW.clinica_id, NEW.data_agendamento, 1)
    ON CONFLICT (clinica_id, data)
    DO UPDATE SET 
        total_agendamentos = metricas_diarias.total_agendamentos + 1,
        updated_at = now();
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_atualizar_metricas_agendamento 
    AFTER INSERT ON agendamentos 
    FOR EACH ROW EXECUTE FUNCTION atualizar_metricas_diarias();
```

### **3. VALIDAÇÕES DE NEGÓCIO:**
```sql
CREATE OR REPLACE FUNCTION validar_agendamento()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar se horário está disponível
    IF EXISTS (
        SELECT 1 FROM agendamentos 
        WHERE medico_id = NEW.medico_id 
        AND data_agendamento = NEW.data_agendamento 
        AND status NOT IN ('cancelado')
        AND (
            (NEW.horario_inicio >= horario_inicio AND NEW.horario_inicio < horario_fim) OR
            (NEW.horario_fim > horario_inicio AND NEW.horario_fim <= horario_fim)
        )
    ) THEN
        RAISE EXCEPTION 'Horário já está ocupado para este médico';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_validar_agendamento 
    BEFORE INSERT OR UPDATE ON agendamentos 
    FOR EACH ROW EXECUTE FUNCTION validar_agendamento();
```

---

## 🔐 ROW LEVEL SECURITY (RLS)

### **POLÍTICAS DE SEGURANÇA:**
```sql
-- Ativar RLS em todas as tabelas
ALTER TABLE clinicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE promocoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE metricas_diarias ENABLE ROW LEVEL SECURITY;

-- Política: Usuários só veem dados da própria clínica
CREATE POLICY "Usuários veem apenas dados da própria clínica" ON clinicas
    FOR ALL USING (id = (current_setting('app.current_user_clinic_id'))::uuid);

CREATE POLICY "Médicos por clínica" ON medicos
    FOR ALL USING (clinica_id = (current_setting('app.current_user_clinic_id'))::uuid);

-- (Continuar para todas as tabelas...)
```

---

## 📊 VIEWS PARA RELATÓRIOS

### **1. DASHBOARD PRINCIPAL:**
```sql
CREATE VIEW vw_dashboard_principal AS
SELECT 
    c.id as clinica_id,
    c.nome as clinica_nome,
    COUNT(DISTINCT m.id) as total_medicos,
    COUNT(DISTINCT s.id) as total_servicos,
    COUNT(DISTINCT CASE WHEN a.data_agendamento = CURRENT_DATE THEN a.id END) as agendamentos_hoje,
    SUM(CASE WHEN md.data = CURRENT_DATE THEN md.receita_total ELSE 0 END) as receita_hoje,
    AVG(md.taxa_conversao) as taxa_conversao_media
FROM clinicas c
LEFT JOIN medicos m ON c.id = m.clinica_id AND m.ativo = true
LEFT JOIN servicos s ON c.id = s.clinica_id AND s.ativo = true
LEFT JOIN agendamentos a ON c.id = a.clinica_id AND a.data_agendamento >= CURRENT_DATE - INTERVAL '30 days'
LEFT JOIN metricas_diarias md ON c.id = md.clinica_id AND md.data >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY c.id, c.nome;
```

### **2. PERFORMANCE DOS MÉDICOS:**
```sql
CREATE VIEW vw_performance_medicos AS
SELECT 
    m.id as medico_id,
    m.nome as medico_nome,
    COUNT(a.id) as total_atendimentos,
    AVG(a.valor_total) as ticket_medio,
    SUM(a.valor_total) as receita_total,
    COUNT(CASE WHEN a.status = 'realizado' THEN 1 END) as atendimentos_realizados,
    COUNT(CASE WHEN a.status = 'cancelado' THEN 1 END) as cancelamentos
FROM medicos m
LEFT JOIN agendamentos a ON m.id = a.medico_id 
    AND a.data_agendamento >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY m.id, m.nome;
```

---

**🎯 Resultado:** Schema completo e otimizado para suportar todas as funcionalidades do Dashboard do Cliente, integração com os 7 Agentes IMPULSO® Health e automação do WhatsApp Bot via N8N.

*Base de dados robusta, escalável e segura para o SevenScale Health Dashboard*