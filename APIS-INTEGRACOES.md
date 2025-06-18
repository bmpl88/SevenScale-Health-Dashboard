# 🔗 APIS E INTEGRAÇÕES - SEVENSCALE HEALTH

**Conectores e Webhooks para Ecossistema Completo**

Data: Janeiro 2025  
Versão: v1.1.0-integrations

## 🎯 ARQUITETURA DE INTEGRAÇÕES

### 📊 **FLUXO GERAL DE DADOS:**

```
DASHBOARD CLIENTE → SUPABASE → 7 AGENTES IA → N8N → WHATSAPP BOT
                      ↓           ↓              ↑        ↑
                 GOOGLE CAL   HUBSPOT       META ADS  GOOGLE ADS
                 CALENDLY     ANALYTICS     WEBHOOKS  WEBHOOKS
```

---

## 🤖 BACKEND PYTHON - ARQUITETURA API

### **1. ESTRUTURA DE PASTAS:**
```
backend/
├── 📁 app/
│   ├── 📁 api/
│   │   ├── 📁 v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── clinicas.py
│   │   │   │   ├── medicos.py
│   │   │   │   ├── servicos.py
│   │   │   │   ├── promocoes.py
│   │   │   │   ├── agendamentos.py
│   │   │   │   ├── agentes.py
│   │   │   │   └── webhooks.py
│   │   │   └── api.py
│   │   └── deps.py
│   ├── 📁 core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   ├── 📁 models/
│   │   ├── clinica.py
│   │   ├── medico.py
│   │   ├── servico.py
│   │   └── agendamento.py
│   ├── 📁 services/
│   │   ├── agentes/
│   │   │   ├── diagnosticador.py
│   │   │   ├── arquiteto_clinico.py
│   │   │   └── ...
│   │   ├── integrations/
│   │   │   ├── google_calendar.py
│   │   │   ├── calendly.py
│   │   │   ├── hubspot.py
│   │   │   └── n8n.py
│   │   └── whatsapp/
│   │       ├── bot_handler.py
│   │       └── message_processor.py
│   └── main.py
├── requirements.txt
└── Dockerfile
```

### **2. ENDPOINTS PRINCIPAIS:**

#### **📋 CLÍNICAS:**
```python
# /api/v1/clinicas
POST   /clinicas/                    # Criar clínica
GET    /clinicas/                    # Listar clínicas
GET    /clinicas/{id}                # Buscar clínica específica
PUT    /clinicas/{id}                # Atualizar clínica
DELETE /clinicas/{id}                # Deletar clínica
GET    /clinicas/{id}/dashboard      # Dashboard BI completo
GET    /clinicas/{id}/metricas       # Métricas em tempo real
```

#### **👨‍⚕️ MÉDICOS:**
```python
# /api/v1/medicos
POST   /medicos/                     # Cadastrar médico
GET    /medicos/                     # Listar médicos
GET    /medicos/{id}                 # Buscar médico específico
PUT    /medicos/{id}                 # Atualizar médico
GET    /medicos/{id}/agenda          # Agenda do médico
GET    /medicos/{id}/disponibilidade # Horários disponíveis
POST   /medicos/{id}/bloquear        # Bloquear horários
```

#### **🩺 SERVIÇOS:**
```python
# /api/v1/servicos
POST   /servicos/                    # Cadastrar serviço
GET    /servicos/                    # Listar serviços
GET    /servicos/{id}                # Buscar serviço específico
PUT    /servicos/{id}                # Atualizar serviço
POST   /servicos/{id}/ativar         # Ativar/desativar serviço
GET    /servicos/disponiveis         # Serviços disponíveis para WhatsApp
```

#### **🎁 PROMOÇÕES:**
```python
# /api/v1/promocoes
POST   /promocoes/                   # Criar promoção
GET    /promocoes/                   # Listar promoções
GET    /promocoes/{id}               # Buscar promoção específica
PUT    /promocoes/{id}               # Atualizar promoção
GET    /promocoes/ativas             # Promoções ativas
POST   /promocoes/{id}/aplicar       # Aplicar promoção
```

#### **📅 AGENDAMENTOS:**
```python
# /api/v1/agendamentos
POST   /agendamentos/                # Criar agendamento
GET    /agendamentos/                # Listar agendamentos
GET    /agendamentos/{id}            # Buscar agendamento específico
PUT    /agendamentos/{id}            # Atualizar agendamento
POST   /agendamentos/{id}/confirmar  # Confirmar agendamento
POST   /agendamentos/{id}/cancelar   # Cancelar agendamento
GET    /agendamentos/horarios        # Horários disponíveis
```

#### **🤖 AGENTES IA:**
```python
# /api/v1/agentes
POST   /agentes/processar            # Processar dados com todos os agentes
GET    /agentes/status               # Status dos 7 agentes
GET    /agentes/{nome}/insights      # Insights de agente específico
POST   /agentes/{nome}/executar      # Executar agente específico
GET    /agentes/logs                 # Logs de processamento
```

#### **📱 WEBHOOKS:**
```python
# /api/v1/webhooks
POST   /webhooks/whatsapp            # Webhook do WhatsApp (N8N)
POST   /webhooks/calendly            # Webhook do Calendly
POST   /webhooks/google-calendar     # Webhook Google Calendar
POST   /webhooks/hubspot             # Webhook HubSpot
POST   /webhooks/google-ads          # Webhook Google Ads
POST   /webhooks/meta-ads            # Webhook Meta Ads
```

---

## 📅 INTEGRAÇÃO GOOGLE CALENDAR

### **CONFIGURAÇÃO:**
```python
# services/integrations/google_calendar.py
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

class GoogleCalendarService:
    def __init__(self, credentials_json):
        self.credentials = Credentials.from_authorized_user_info(credentials_json)
        self.service = build('calendar', 'v3', credentials=self.credentials)
    
    async def criar_evento(self, medico_id, agendamento_data):
        evento = {
            'summary': f'Consulta - {agendamento_data["paciente_nome"]}',
            'start': {
                'dateTime': f'{agendamento_data["data"]}T{agendamento_data["horario_inicio"]}',
                'timeZone': 'America/Sao_Paulo',
            },
            'end': {
                'dateTime': f'{agendamento_data["data"]}T{agendamento_data["horario_fim"]}',
                'timeZone': 'America/Sao_Paulo',
            },
            'description': f'Paciente: {agendamento_data["paciente_nome"]}\nTelefone: {agendamento_data["paciente_telefone"]}'
        }
        
        result = self.service.events().insert(calendarId='primary', body=evento).execute()
        return result['id']
    
    async def listar_horarios_ocupados(self, medico_id, data_inicio, data_fim):
        events_result = self.service.events().list(
            calendarId='primary',
            timeMin=data_inicio,
            timeMax=data_fim,
            singleEvents=True,
            orderBy='startTime'
        ).execute()
        
        return events_result.get('items', [])
```

### **WEBHOOK CONFIGURATION:**
```python
# Webhook para receber atualizações do Google Calendar
@router.post("/webhooks/google-calendar")
async def google_calendar_webhook(request: Request):
    data = await request.json()
    
    # Processar evento do Google Calendar
    if data['eventType'] == 'created':
        await sincronizar_evento_criado(data)
    elif data['eventType'] == 'updated':
        await sincronizar_evento_atualizado(data)
    elif data['eventType'] == 'deleted':
        await sincronizar_evento_deletado(data)
    
    return {"status": "processed"}
```

---

## 📋 INTEGRAÇÃO CALENDLY

### **CONFIGURAÇÃO:**
```python
# services/integrations/calendly.py
import httpx

class CalendlyService:
    def __init__(self, api_token):
        self.api_token = api_token
        self.base_url = "https://api.calendly.com"
        self.headers = {
            "Authorization": f"Bearer {api_token}",
            "Content-Type": "application/json"
        }
    
    async def obter_eventos_agendados(self, user_uri):
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/scheduled_events",
                headers=self.headers,
                params={"user": user_uri}
            )
            return response.json()
    
    async def cancelar_evento(self, event_uuid, motivo="Cancelado via dashboard"):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/scheduled_events/{event_uuid}/cancellation",
                headers=self.headers,
                json={"reason": motivo}
            )
            return response.json()
```

### **WEBHOOK CALENDLY:**
```python
@router.post("/webhooks/calendly")
async def calendly_webhook(webhook_data: dict):
    event_type = webhook_data['event']
    payload = webhook_data['payload']
    
    if event_type == 'invitee.created':
        # Novo agendamento via Calendly
        await processar_agendamento_calendly(payload)
    elif event_type == 'invitee.canceled':
        # Cancelamento via Calendly
        await processar_cancelamento_calendly(payload)
    
    return {"status": "ok"}

async def processar_agendamento_calendly(payload):
    # Extrair dados do payload
    agendamento_data = {
        'paciente_nome': payload['name'],
        'paciente_email': payload['email'],
        'data_agendamento': payload['start_time'][:10],
        'horario_inicio': payload['start_time'][11:16],
        'horario_fim': payload['end_time'][11:16],
        'origem': 'calendly',
        'calendly_event_id': payload['uri']
    }
    
    # Salvar no banco de dados
    await criar_agendamento_from_calendly(agendamento_data)
    
    # Notificar os agentes IA
    await processar_com_agentes(agendamento_data)
```

---

## 💼 INTEGRAÇÃO HUBSPOT CRM

### **CONFIGURAÇÃO:**
```python
# services/integrations/hubspot.py
import httpx

class HubSpotService:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.hubapi.com"
        self.headers = {"Authorization": f"Bearer {api_key}"}
    
    async def criar_contato(self, paciente_data):
        contact_data = {
            "properties": {
                "firstname": paciente_data['nome'].split()[0],
                "lastname": " ".join(paciente_data['nome'].split()[1:]),
                "email": paciente_data['email'],
                "phone": paciente_data['telefone'],
                "hs_lead_status": "NEW",
                "fonte_lead": paciente_data.get('origem', 'dashboard')
            }
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/crm/v3/objects/contacts",
                headers=self.headers,
                json=contact_data
            )
            return response.json()
    
    async def criar_deal(self, agendamento_data):
        deal_data = {
            "properties": {
                "dealname": f"Consulta - {agendamento_data['paciente_nome']}",
                "amount": str(agendamento_data.get('valor_total', 0)),
                "dealstage": "appointmentscheduled",
                "pipeline": "default",
                "closedate": agendamento_data['data_agendamento']
            }
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/crm/v3/objects/deals",
                headers=self.headers,
                json=deal_data
            )
            return response.json()
    
    async def atualizar_metricas_leads(self, clinica_id):
        # Buscar leads do último mês
        filter_groups = [{
            "filters": [{
                "propertyName": "createdate",
                "operator": "GTE",
                "value": (datetime.now() - timedelta(days=30)).timestamp() * 1000
            }]
        }]
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/crm/v3/objects/contacts/search",
                headers=self.headers,
                json={"filterGroups": filter_groups}
            )
            
            leads_data = response.json()
            total_leads = leads_data.get('total', 0)
            
            # Atualizar métricas no banco
            await atualizar_metricas_hubspot(clinica_id, total_leads)
```

---

## 📊 INTEGRAÇÃO GOOGLE/META ADS

### **GOOGLE ADS API:**
```python
# services/integrations/google_ads.py
from google.ads.googleads.client import GoogleAdsClient

class GoogleAdsService:
    def __init__(self, credentials_path, customer_id):
        self.client = GoogleAdsClient.load_from_storage(credentials_path)
        self.customer_id = customer_id
    
    async def obter_metricas_campanhas(self, data_inicio, data_fim):
        ga_service = self.client.get_service("GoogleAdsService")
        
        query = f"""
            SELECT 
                campaign.name,
                metrics.impressions,
                metrics.clicks,
                metrics.cost_micros,
                metrics.conversions,
                segments.date
            FROM campaign 
            WHERE segments.date BETWEEN '{data_inicio}' AND '{data_fim}'
        """
        
        response = ga_service.search(customer_id=self.customer_id, query=query)
        
        metricas = []
        for row in response:
            metricas.append({
                'campanha': row.campaign.name,
                'impressoes': row.metrics.impressions,
                'cliques': row.metrics.clicks,
                'custo': row.metrics.cost_micros / 1000000,  # Converter de micros para reais
                'conversoes': row.metrics.conversions,
                'data': row.segments.date
            })
        
        return metricas
```

### **META ADS API:**
```python
# services/integrations/meta_ads.py
import httpx

class MetaAdsService:
    def __init__(self, access_token, account_id):
        self.access_token = access_token
        self.account_id = account_id
        self.base_url = "https://graph.facebook.com/v18.0"
    
    async def obter_metricas_campanhas(self, data_inicio, data_fim):
        params = {
            'access_token': self.access_token,
            'fields': 'campaign_name,impressions,clicks,spend,actions',
            'time_range': f'{{"since":"{data_inicio}","until":"{data_fim}"}}'
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/{self.account_id}/insights",
                params=params
            )
            
            return response.json()['data']
    
    async def criar_conversao_customizada(self, pixel_id, evento_data):
        url = f"{self.base_url}/{pixel_id}/events"
        
        payload = {
            'access_token': self.access_token,
            'data': [{
                'event_name': 'Lead',
                'event_time': int(evento_data['timestamp']),
                'user_data': {
                    'em': evento_data['email'],
                    'ph': evento_data['telefone']
                },
                'custom_data': {
                    'value': evento_data['valor'],
                    'currency': 'BRL'
                }
            }]
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload)
            return response.json()
```

---

## 🤖 INTEGRAÇÃO N8N + WHATSAPP

### **N8N WORKFLOW CONFIGURATION:**
```json
{
  "name": "SevenScale WhatsApp Bot",
  "nodes": [
    {
      "name": "Webhook WhatsApp",
      "type": "n8n-nodes-base.webhook",
      "webhookId": "sevenscale-whatsapp",
      "httpMethod": "POST"
    },
    {
      "name": "Process Message",
      "type": "n8n-nodes-base.function",
      "functionCode": `
        // Processar mensagem recebida
        const message = items[0].json.Body;
        const from = items[0].json.From;
        
        // Extrair intent usando NLP simples
        const intent = extractIntent(message);
        
        return [{
          json: {
            telefone: from,
            mensagem: message,
            intent: intent,
            timestamp: new Date()
          }
        }];
      `
    },
    {
      "name": "Consultar Dashboard API",
      "type": "n8n-nodes-base.httpRequest",
      "url": "{{$env.DASHBOARD_API_URL}}/api/v1/whatsapp/processar",
      "method": "POST"
    },
    {
      "name": "Enviar Resposta WhatsApp",
      "type": "n8n-nodes-base.twilio",
      "operation": "send"
    }
  ]
}
```

### **PYTHON API PARA N8N:**
```python
# services/whatsapp/bot_handler.py
class WhatsAppBotHandler:
    def __init__(self, db_session):
        self.db = db_session
    
    async def processar_mensagem(self, telefone: str, mensagem: str, intent: str):
        # Buscar clínica pelo telefone/configuração
        clinica = await self.obter_clinica_por_telefone(telefone)
        
        if not clinica:
            return {"resposta": "Desculpe, não consegui identificar sua clínica."}
        
        # Processar intent
        if intent == "agendar_consulta":
            return await self.processar_agendamento(clinica.id, telefone, mensagem)
        elif intent == "cancelar_agendamento":
            return await self.processar_cancelamento(clinica.id, telefone, mensagem)
        elif intent == "informacoes_servicos":
            return await self.listar_servicos(clinica.id)
        elif intent == "verificar_horarios":
            return await self.verificar_disponibilidade(clinica.id, mensagem)
        else:
            return await self.resposta_padrao(clinica.id)
    
    async def processar_agendamento(self, clinica_id: str, telefone: str, mensagem: str):
        # Extrair entidades da mensagem (nome, data preferida, etc.)
        entidades = await self.extrair_entidades(mensagem)
        
        # Buscar horários disponíveis
        horarios = await self.obter_horarios_disponiveis(
            clinica_id, 
            entidades.get('data_preferida'),
            entidades.get('medico_preferido')
        )
        
        if not horarios:
            return {
                "resposta": "Não temos horários disponíveis para essa data. Que tal estes horários alternativos?",
                "horarios_alternativos": await self.sugerir_horarios_alternativos(clinica_id)
            }
        
        # Sugerir horários
        resposta = "Temos os seguintes horários disponíveis:\n"
        for i, horario in enumerate(horarios[:3]):
            resposta += f"{i+1}. {horario['data']} às {horario['hora']} - Dr(a). {horario['medico']}\n"
        
        resposta += "\nResponda com o número do horário desejado ou digite OUTROS para ver mais opções."
        
        return {"resposta": resposta, "horarios": horarios}
    
    async def listar_servicos(self, clinica_id: str):
        servicos = await self.obter_servicos_ativos(clinica_id)
        promocoes = await self.obter_promocoes_ativas(clinica_id)
        
        resposta = "🏥 *Nossos Serviços:*\n\n"
        
        for servico in servicos:
            resposta += f"📋 *{servico.nome}*\n"
            resposta += f"💰 R$ {servico.valor_particular:.2f}\n"
            if servico.descricao:
                resposta += f"📝 {servico.descricao}\n"
            resposta += "\n"
        
        if promocoes:
            resposta += "\n🎁 *Promoções Ativas:*\n"
            for promocao in promocoes:
                resposta += f"🔥 {promocao.nome} - {promocao.descricao}\n"
        
        resposta += "\n💬 Para agendar, digite: *AGENDAR [SERVIÇO]*"
        
        return {"resposta": resposta}
```

---

## 🔄 SINCRONIZAÇÃO EM TEMPO REAL

### **WEBSOCKETS PARA UPDATES:**
```python
# Real-time updates via WebSockets
from fastapi import WebSocket
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
    
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
    
    async def broadcast_update(self, data: dict):
        for connection in self.active_connections:
            await connection.send_text(json.dumps(data))

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        manager.disconnect(websocket)

# Notificar updates quando dados mudam
async def notificar_update_dashboard(clinica_id: str, tipo: str, dados: dict):
    update_data = {
        "clinica_id": clinica_id,
        "tipo": tipo,
        "dados": dados,
        "timestamp": datetime.now().isoformat()
    }
    await manager.broadcast_update(update_data)
```

### **TRIGGERS DE ATUALIZAÇÃO:**
```python
# Triggers automáticos para sincronização
async def trigger_agentes_processamento(agendamento_data: dict):
    """Dispara processamento dos 7 agentes quando há novo agendamento"""
    
    # Enviar para fila de processamento
    await enviar_para_fila_agentes({
        "tipo": "novo_agendamento",
        "dados": agendamento_data,
        "clinica_id": agendamento_data["clinica_id"]
    })
    
    # Atualizar métricas em tempo real
    await atualizar_metricas_tempo_real(agendamento_data["clinica_id"])
    
    # Notificar dashboard via WebSocket
    await notificar_update_dashboard(
        agendamento_data["clinica_id"],
        "novo_agendamento",
        agendamento_data
    )
    
    # Atualizar bot WhatsApp com nova disponibilidade
    await atualizar_disponibilidade_bot(agendamento_data["medico_id"])
```

---

## 📋 DOCUMENTAÇÃO DAS APIS

### **SWAGGER/OPENAPI:**
```python
# Configuração do FastAPI com documentação automática
from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

app = FastAPI(
    title="SevenScale Health API",
    description="API completa para gestão de clínicas médicas com IA",
    version="1.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title="SevenScale Health Dashboard API",
        version="1.1.0",
        description="Endpoints para integração completa do ecossistema médico",
        routes=app.routes,
    )
    
    # Adicionar exemplos customizados
    openapi_schema["components"]["examples"] = {
        "AgendamentoExample": {
            "summary": "Exemplo de agendamento",
            "value": {
                "paciente_nome": "João Silva",
                "paciente_telefone": "+5511999999999",
                "data_agendamento": "2025-06-20",
                "horario_inicio": "14:00",
                "medico_id": "uuid-do-medico",
                "servico_id": "uuid-do-servico"
            }
        }
    }
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
```

---

**🎯 Resultado:** Ecossistema completo de APIs e integrações que conecta o Dashboard do Cliente com todas as ferramentas externas, permitindo fluxo de dados em tempo real e automação inteligente via WhatsApp Bot.

*SevenScale Health - Integrações robustas para transformação digital médica completa*