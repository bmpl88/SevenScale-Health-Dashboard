# 📡 SevenScale MVP - API Documentation

> **Documentação completa da API do MVP isolado**

## 🏗️ Base URL

```
http://localhost:8001/api/mvp
```

---

## 🔍 Health Check

### `GET /health`

Verifica status geral do sistema MVP.

**Response:**
```json
{
  "status": "MVP Backend Online",
  "timestamp": "2025-06-25T21:30:00Z",
  "version": "1.0.0",
  "clients_active": 3,
  "integrations": 6
}
```

---

## 👥 Clients

### `GET /clients`

Lista todos os clientes MVP.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nome_clinica": "Dr. Silva - Clínica Médica",
      "especialidade": "Clínica Médica",
      "cidade": "São Paulo, SP",
      "email_contato": "contato@silva-clinica.com.br",
      "telefone": "(11) 99999-9999",
      "website": "silva-clinica.com.br",
      "status": "operational",
      "revenue": "R$ 285k",
      "patients": 78,
      "performance": 87,
      "created_at": "2025-06-25T20:00:00Z"
    }
  ],
  "total": 3,
  "timestamp": "2025-06-25T21:30:00Z"
}
```

### `GET /clients/:id`

Busca cliente específico.

**Parameters:**
- `id` (string): UUID do cliente

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "nome_clinica": "Dr. Silva - Clínica Médica",
    "especialidade": "Clínica Médica",
    "cidade": "São Paulo, SP",
    "status": "operational",
    "performance": 87,
    "revenue": "R$ 285k",
    "patients": 78
  },
  "timestamp": "2025-06-25T21:30:00Z"
}
```

### `POST /clients`

Cria novo cliente MVP.

**Body:**
```json
{
  "nome_clinica": "Nova Clínica",
  "especialidade": "Cardiologia",
  "cidade": "Rio de Janeiro, RJ",
  "email_contato": "contato@novaclinica.com.br",
  "telefone": "(21) 99999-9999",
  "website": "novaclinica.com.br"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "nome_clinica": "Nova Clínica",
    "status": "operational",
    "performance": 0,
    "patients": 0
  },
  "message": "Cliente MVP criado com sucesso",
  "timestamp": "2025-06-25T21:30:00Z"
}
```

### `GET /clients/:id/dashboard`

Dashboard consolidado do cliente.

**Response:**
```json
{
  "success": true,
  "data": {
    "client": {
      "id": "uuid",
      "nome_clinica": "Dr. Silva",
      "performance": 87
    },
    "insights": {
      "latest": {
        "insights_data": {
          "insights": ["Taxa conversão 26% acima média"],
          "action_items": ["Implementar WhatsApp automático"],
          "roi_analysis": {
            "roi_percent": "300%",
            "total_revenue": "R$ 285.000"
          }
        },
        "processed_at": "2025-06-25T21:00:00Z"
      },
      "total": 5
    },
    "integrations": {
      "active": 4,
      "total": 5,
      "percentage": 80,
      "list": [
        {
          "integration_type": "hubspot",
          "status": "connected",
          "last_sync": "2025-06-25T21:00:00Z"
        }
      ]
    },
    "status": {
      "overall": "operational",
      "performance": 87,
      "health": "good"
    }
  },
  "timestamp": "2025-06-25T21:30:00Z"
}
```

---

## 🤖 Agent

### `GET /agent/status`

Status do agente consolidador.

**Response:**
```json
{
  "success": true,
  "data": {
    "agent_status": "active",
    "gpt4_connection": "connected",
    "database_connection": "connected",
    "clients_total": 3,
    "clients_active": 3,
    "last_check": "2025-06-25T21:30:00Z"
  },
  "timestamp": "2025-06-25T21:30:00Z"
}
```

### `POST /agent/process/:clientId`

Processa insights para cliente específico.

**Parameters:**
- `clientId` (string): UUID do cliente

**Response:**
```json
{
  "success": true,
  "data": {
    "insight": {
      "id": "insight-uuid",
      "client_id": "client-uuid",
      "agent_type": "consolidator",
      "insights_data": {
        "insights": [
          "Taxa de conversão 26% acima da média do setor",
          "CPA Meta Ads otimizado - oportunidade reduzir 15%"
        ],
        "action_items": [
          "Implementar confirmação automática WhatsApp",
          "Reduzir público Meta Ads para CPA < R$ 130"
        ],
        "roi_analysis": {
          "total_investment": "R$ 95.000",
          "total_revenue": "R$ 285.000",
          "roi_percent": "300%",
          "performance_score": 87
        },
        "status_summary": {
          "overall_health": "very_good",
          "integrations_active": 4,
          "integrations_error": 1
        }
      },
      "status": "completed",
      "processed_at": "2025-06-25T21:30:00Z"
    },
    "generated_insights": {
      "insights": [...],
      "action_items": [...],
      "roi_analysis": {...}
    }
  },
  "message": "Insights processados para Dr. Silva - Clínica Médica",
  "timestamp": "2025-06-25T21:30:00Z"
}
```

### `POST /agent/process-all`

Processa insights para todos os clientes.

**Response:**
```json
{
  "success": true,
  "data": {
    "processed": 3,
    "successful": 3,
    "failed": 0,
    "results": [
      {
        "client_id": "uuid-1",
        "client_name": "Dr. Silva",
        "status": "success",
        "insight_id": "insight-uuid-1"
      },
      {
        "client_id": "uuid-2",
        "client_name": "CardioVida",
        "status": "success",
        "insight_id": "insight-uuid-2"
      },
      {
        "client_id": "uuid-3",
        "client_name": "Dermatologia Plus",
        "status": "success",
        "insight_id": "insight-uuid-3"
      }
    ]
  },
  "message": "Processamento em lote concluído",
  "timestamp": "2025-06-25T21:30:00Z"
}
```

---

## 💡 Insights

### `GET /insights/:clientId`

Busca insights de um cliente.

**Parameters:**
- `clientId` (string): UUID do cliente

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "insight-uuid",
      "client_id": "client-uuid",
      "agent_type": "consolidator",
      "insights_data": {
        "insights": ["Insight 1", "Insight 2"],
        "action_items": ["Ação 1", "Ação 2"],
        "roi_analysis": {
          "roi_percent": "300%"
        }
      },
      "processed_at": "2025-06-25T21:00:00Z",
      "status": "completed"
    }
  ],
  "total": 1,
  "timestamp": "2025-06-25T21:30:00Z"
}
```

### `GET /insights/:clientId/latest`

Último insight de um cliente.

### `POST /insights/:clientId`

Cria novo insight.

**Body:**
```json
{
  "insights_data": {
    "insights": ["Novo insight"],
    "action_items": ["Nova ação"]
  },
  "agent_type": "consolidator"
}
```

### `GET /insights/:clientId/summary`

Resumo dos insights de um cliente.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_insights": 5,
    "last_processed": "2025-06-25T21:00:00Z",
    "avg_confidence": 0.92,
    "critical_issues": 1,
    "opportunities": 4,
    "status": "active",
    "frequency": "daily"
  },
  "timestamp": "2025-06-25T21:30:00Z"
}
```

---

## 🔗 Integrations

### `GET /integrations/:clientId`

Busca integrações de um cliente.

**Response:**
```json
{
  "success": true,
  "data": {
    "integrations": [
      {
        "id": "integration-uuid",
        "client_id": "client-uuid",
        "integration_type": "hubspot",
        "status": "connected",
        "last_sync": "2025-06-25T21:00:00Z",
        "created_at": "2025-06-25T20:00:00Z"
      }
    ],
    "stats": {
      "total": 5,
      "connected": 4,
      "disconnected": 0,
      "errors": 1,
      "coverage_percentage": 80
    }
  },
  "timestamp": "2025-06-25T21:30:00Z"
}
```

### `POST /integrations/:clientId/sync`

Sincroniza integração específica.

**Body:**
```json
{
  "integration_type": "hubspot"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "integration-uuid",
    "integration_type": "hubspot",
    "status": "connected",
    "last_sync": "2025-06-25T21:30:00Z"
  },
  "message": "Integração hubspot sincronizada com sucesso",
  "timestamp": "2025-06-25T21:30:00Z"
}
```

### `POST /integrations/:clientId/setup`

Configura todas as 6 integrações core.

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "integration_type": "hubspot",
        "status": "configured",
        "message": "Pronto para conectar"
      }
    ],
    "summary": {
      "total": 6,
      "successful": 6,
      "failed": 0
    }
  },
  "message": "Setup completo: 6 configuradas, 0 com erro",
  "timestamp": "2025-06-25T21:30:00Z"
}
```

### `GET /integrations`

Estatísticas gerais das integrações.

---

## 📊 Error Responses

Todos os endpoints podem retornar os seguintes erros:

### `400 Bad Request`
```json
{
  "success": false,
  "error": "Dados obrigatórios: nome_clinica, especialidade, email_contato"
}
```

### `404 Not Found`
```json
{
  "success": false,
  "error": "Cliente MVP não encontrado",
  "message": "Record not found"
}
```

### `500 Internal Server Error`
```json
{
  "success": false,
  "error": "Falha ao processar insights MVP",
  "message": "OpenAI API timeout"
}
```

---

## 🔑 Authentication

**MVP não possui autenticação** - é uma versão de desenvolvimento local.

Para produção, implementar:
- JWT tokens
- API keys
- Rate limiting
- CORS restrito

---

## 📈 Rate Limits

**MVP sem rate limits** - desenvolvimento local.

Produção recomendada:
- 100 requests/minute por IP
- 1000 requests/hour por cliente
- Throttling em endpoints GPT-4

---

## 🧪 Testing

### cURL Examples:

```bash
# Health check
curl http://localhost:8001/api/mvp/health

# Listar clientes
curl http://localhost:8001/api/mvp/clients

# Status do agente
curl http://localhost:8001/api/mvp/agent/status

# Processar insights
curl -X POST http://localhost:8001/api/mvp/agent/process/CLIENT_UUID

# Sincronizar integração
curl -X POST http://localhost:8001/api/mvp/integrations/CLIENT_UUID/sync \
  -H "Content-Type: application/json" \
  -d '{"integration_type": "hubspot"}'
```

---

**📚 Documentação atualizada: Junho 2025 - SevenScale MVP API v1.0**