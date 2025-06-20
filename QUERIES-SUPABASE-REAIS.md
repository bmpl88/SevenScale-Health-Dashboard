# 🔍 QUERIES SUPABASE - DADOS REAIS
**Criado:** 20 Junho 2025  
**Objetivo:** Queries SQL personalizadas para estrutura real do banco

---

## 📊 **ESTRUTURA REAL IDENTIFICADA**

### **Tabelas Principais (6):**
- `clinicas` (3 registros)
- `agentes_clinicas` 
- `agentes_impulso_logs` (0 registros)
- `projetos_impulso`
- `metricas_historicas`
- `integracoes_status`

### **Views Funcionais (2):**
- `vw_dashboard_kpis` ✅
- `vw_pipeline_impulso` ✅

---

## 🎯 **QUERIES ESSENCIAIS TESTADAS**

### **1. KPIs Consolidados (FUNCIONANDO):**
```sql
SELECT 
  COUNT(*) as total_clinicas,
  AVG(roi_atual) as roi_medio,
  SUM(receita_mensal_atual) as receita_total,
  AVG(taxa_conversao_atual) as taxa_conversao_media
FROM clinicas;
```
**Resultado Real:**
- Total clínicas: 3
- ROI médio: 225.17%
- Receita total: R$ 207.700
- Taxa conversão: 19.17%

### **2. View Dashboard KPIs (FUNCIONANDO):**
```sql
SELECT * FROM vw_dashboard_kpis;
```
**Dados das 3 Clínicas:**
- Clínica Derma Recife: ROI 198.75%
- OdontoVita Salvador: ROI 189.25%  
- CardioCenter Fortaleza: ROI 287.50%

### **3. View Pipeline IMPULSO® (FUNCIONANDO):**
```sql
SELECT * FROM vw_pipeline_impulso;
```
**Pipeline Ativo:**
- PROTOTIPAR: 45.8% progresso
- LAPIDAR: 78.2% progresso
- OTIMIZAR: 94.5% progresso

---

## 🚀 **QUERIES COMPLETAS PARA DASHBOARD**

### **Clínicas Detalhadas:**
```sql
SELECT 
  id, nome, cnpj, email, telefone, cidade, estado,
  roi_atual, pacientes_mes_atual, receita_mensal_atual,
  taxa_conversao_atual, nps_atual, status, plano,
  created_at, updated_at
FROM clinicas
ORDER BY roi_atual DESC;
```

### **Agentes por Clínica:**
```sql
SELECT 
  ac.clinica_id, c.nome as clinica_nome,
  ac.agente_tipo, ac.status, ac.progresso_implementacao,
  ac.baseline_valor, ac.meta_valor, ac.valor_atual
FROM agentes_clinicas ac
LEFT JOIN clinicas c ON ac.clinica_id = c.id
ORDER BY ac.clinica_id, ac.prioridade_implementacao;
```

### **Logs Agentes (quando houver dados):**
```sql
SELECT 
  ail.clinica_id, c.nome as clinica_nome,
  ail.agente_nome, ail.insights_gerados,
  ail.acoes_recomendadas, ail.confianca_score,
  ail.status, ail.created_at
FROM agentes_impulso_logs ail
LEFT JOIN clinicas c ON ail.clinica_id = c.id
WHERE ail.created_at >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY ail.created_at DESC;
```

---

## 📊 **RESULTADOS REAIS OBTIDOS**

### **Performance das Clínicas:**
1. **CardioCenter Fortaleza** 🥇
   - ROI: 287.50% (líder absoluto)
   - Receita: R$ 89.500/mês
   - Pacientes: 456/mês
   - NPS: 8

2. **Clínica Derma Recife** 🥈
   - ROI: 198.75% (sólida)
   - Receita: R$ 52.400/mês
   - Pacientes: 280/mês
   - NPS: 6

3. **OdontoVita Salvador** 🥉
   - ROI: 189.25% (crescendo)
   - Receita: R$ 65.800/mês
   - Pacientes: 320/mês
   - NPS: 7

### **Pipeline IMPULSO® Ativo:**
- **3 projetos** em execução
- **Progresso médio:** 72.8%
- **Fase mais avançada:** OTIMIZAR (94.5%)
- **Próxima entrega:** Projeto em fase OTIMIZAR

---

## ✅ **QUERIES VALIDADAS E FUNCIONAIS**

Todas essas queries foram testadas e retornam dados reais do Supabase da SevenScale. Use-as no código React para integração completa.

---

*Queries desenvolvidas e testadas por Bruno Monteiro & Claude - 20/06/2025*