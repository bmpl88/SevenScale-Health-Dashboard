#!/bin/bash

# SevenScale MVP - Script de Testes
# Execute: chmod +x mvp-test.sh && ./mvp-test.sh

echo "🧪 Testando SevenScale MVP..."
echo "================================\n"

BASE_URL="http://localhost:8001/api/mvp"
FRONTEND_URL="http://localhost:3001"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para teste com feedback
test_endpoint() {
    local name="$1"
    local url="$2"
    local expected_status="$3"
    
    echo -n "🔍 Testando $name... "
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" "$url")
    http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo $response | sed -e 's/HTTPSTATUS\:.*//g')
    
    if [ "$http_code" -eq "$expected_status" ]; then
        echo -e "${GREEN}✅ OK${NC} ($http_code)"
        return 0
    else
        echo -e "${RED}❌ FALHOU${NC} ($http_code)"
        echo "   Resposta: $body"
        return 1
    fi
}

# Função para teste JSON
test_json_endpoint() {
    local name="$1"
    local url="$2"
    local json_field="$3"
    
    echo -n "📊 Testando $name... "
    
    response=$(curl -s "$url")
    
    if echo "$response" | jq -e ".$json_field" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ FALHOU${NC}"
        echo "   Campo '$json_field' não encontrado na resposta"
        return 1
    fi
}

# Verificar se jq está instalado
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq não encontrado. Alguns testes podem ser limitados.${NC}\n"
    HAS_JQ=false
else
    HAS_JQ=true
fi

# ========================================
# TESTES DE BACKEND
# ========================================
echo "🔧 TESTANDO BACKEND MVP"
echo "------------------------"

# Health check
test_endpoint "Health Check" "$BASE_URL/health" 200

# Clientes
test_endpoint "Listar Clientes" "$BASE_URL/clients" 200

if [ "$HAS_JQ" = true ]; then
    test_json_endpoint "Dados dos Clientes" "$BASE_URL/clients" "data"
fi

# Status do Agente
test_endpoint "Status do Agente" "$BASE_URL/agent/status" 200

if [ "$HAS_JQ" = true ]; then
    test_json_endpoint "Status GPT-4" "$BASE_URL/agent/status" "data.gpt4_connection"
fi

# Buscar cliente específico (assumindo que existe pelo menos 1)
if [ "$HAS_JQ" = true ]; then
    echo -n "🔍 Buscando primeiro cliente... "
    CLIENT_ID=$(curl -s "$BASE_URL/clients" | jq -r '.data[0].id // empty')
    
    if [ -n "$CLIENT_ID" ]; then
        echo -e "${GREEN}✅ OK${NC} (ID: $CLIENT_ID)"
        
        # Testar dashboard do cliente
        test_endpoint "Dashboard do Cliente" "$BASE_URL/clients/$CLIENT_ID/dashboard" 200
        
        # Testar integrações do cliente
        test_endpoint "Integrações do Cliente" "$BASE_URL/integrations/$CLIENT_ID" 200
        
        # Testar insights do cliente
        test_endpoint "Insights do Cliente" "$BASE_URL/insights/$CLIENT_ID" 200
    else
        echo -e "${RED}❌ FALHOU${NC} (Nenhum cliente encontrado)"
    fi
fi

# ========================================
# TESTES DE FRONTEND
# ========================================
echo "\n🎨 TESTANDO FRONTEND MVP"
echo "-------------------------"

test_endpoint "Frontend Carregando" "$FRONTEND_URL" 200
test_endpoint "Dashboard MVP" "$FRONTEND_URL/mvp" 200

# ========================================
# TESTES DE INTEGRAÇÃO
# ========================================
echo "\n🔗 TESTANDO INTEGRAÇÃO"
echo "-----------------------"

echo -n "🔄 Testando comunicação Frontend → Backend... "
# Simular chamada do frontend para backend
if curl -s "$BASE_URL/health" | grep -q "MVP Backend Online"; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ FALHOU${NC}"
fi

# ========================================
# TESTE FUNCIONAL COMPLETO
# ========================================
if [ "$HAS_JQ" = true ] && [ -n "$CLIENT_ID" ]; then
    echo "\n🎯 TESTE FUNCIONAL COMPLETO"
    echo "-----------------------------"
    
    echo -n "🤖 Testando processamento de insights... "
    
    # Tentar processar insights
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X POST "$BASE_URL/agent/process/$CLIENT_ID")
    http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
    
    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✅ OK${NC}"
        
        # Verificar se insights foram salvos
        echo -n "💾 Verificando insights salvos... "
        insights_response=$(curl -s "$BASE_URL/insights/$CLIENT_ID")
        
        if echo "$insights_response" | jq -e '.data.insights[0]' > /dev/null 2>&1; then
            echo -e "${GREEN}✅ OK${NC}"
        else
            echo -e "${YELLOW}⚠️  Parcial${NC} (Insights não encontrados)"
        fi
    else
        echo -e "${RED}❌ FALHOU${NC} ($http_code)"
    fi
fi

# ========================================
# RESUMO DOS TESTES
# ========================================
echo "\n📋 RESUMO DOS TESTES"
echo "====================="

# Verificar componentes principais
echo -n "🔧 Backend MVP: "
if curl -s "$BASE_URL/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ ONLINE${NC}"
else
    echo -e "${RED}❌ OFFLINE${NC}"
fi

echo -n "🎨 Frontend MVP: "
if curl -s "$FRONTEND_URL" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ ONLINE${NC}"
else
    echo -e "${RED}❌ OFFLINE${NC}"
fi

echo -n "🗄️  Banco de Dados: "
if curl -s "$BASE_URL/clients" | grep -q "success"; then
    echo -e "${GREEN}✅ CONECTADO${NC}"
else
    echo -e "${RED}❌ DESCONECTADO${NC}"
fi

echo -n "🤖 GPT-4: "
if [ "$HAS_JQ" = true ]; then
    gpt_status=$(curl -s "$BASE_URL/agent/status" | jq -r '.data.gpt4_connection // "unknown"')
    if [ "$gpt_status" = "connected" ]; then
        echo -e "${GREEN}✅ CONECTADO${NC}"
    else
        echo -e "${RED}❌ DESCONECTADO${NC}"
    fi
else
    echo -e "${YELLOW}❓ NÃO TESTADO${NC} (jq não disponível)"
fi

# Instruções finais
echo "\n🎯 PRÓXIMOS PASSOS"
echo "=================="
echo "✅ Se todos os testes passaram, seu MVP está funcionando!"
echo "🌐 Acesse: http://localhost:3001/mvp/dashboard"
echo "📊 Teste o processamento de insights no dashboard"
echo "🔗 Configure as integrações reais (HubSpot, Google, etc.)"
echo "\n📚 Documentação completa em: mvp-setup.md"
echo "🚀 Para deploy: consulte mvp-roadmap.md"

echo "\n✨ Teste concluído!"