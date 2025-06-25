#!/bin/bash

# ========================================
# SEVENSCALE MVP - HEALTH CHECK
# Verifica se todos os serviços estão funcionando
# ========================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[CHECK]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

echo "🔍 SevenScale MVP - Health Check"
echo "================================"
echo ""

# Check if backend is running
check_backend() {
    print_status "Verificando backend (porta 8001)..."
    
    if curl -f -s http://localhost:8001/api/mvp/health > /dev/null; then
        print_success "Backend respondendo"
        
        # Get health check details
        HEALTH_DATA=$(curl -s http://localhost:8001/api/mvp/health)
        echo "   Detalhes: $HEALTH_DATA"
        
        return 0
    else
        print_error "Backend não está respondendo"
        return 1
    fi
}

# Check if frontend is running
check_frontend() {
    print_status "Verificando frontend (porta 3001)..."
    
    if curl -f -s http://localhost:3001 > /dev/null; then
        print_success "Frontend respondendo"
        return 0
    else
        print_error "Frontend não está respondendo"
        return 1
    fi
}

# Check database connection
check_database() {
    print_status "Verificando conexão Supabase..."
    
    RESPONSE=$(curl -s http://localhost:8001/api/mvp/clients)
    if echo "$RESPONSE" | grep -q '"success":true'; then
        print_success "Supabase conectado"
        
        # Count clients
        CLIENT_COUNT=$(echo "$RESPONSE" | grep -o '"total":[0-9]*' | cut -d':' -f2)
        echo "   Clientes encontrados: $CLIENT_COUNT"
        
        return 0
    else
        print_error "Problema na conexão Supabase"
        echo "   Response: $RESPONSE"
        return 1
    fi
}

# Check GPT-4 connection
check_gpt4() {
    print_status "Verificando conexão GPT-4..."
    
    RESPONSE=$(curl -s http://localhost:8001/api/mvp/agent/status)
    if echo "$RESPONSE" | grep -q '"gpt4_connection":"connected"'; then
        print_success "GPT-4 conectado"
        return 0
    else
        print_error "Problema na conexão GPT-4"
        echo "   Response: $RESPONSE"
        return 1
    fi
}

# Check environment variables
check_env() {
    print_status "Verificando variáveis de ambiente..."
    
    if [ -f "mvp-backend/.env" ]; then
        ENV_FILE="mvp-backend/.env"
        
        if grep -q "SUPABASE_URL=" "$ENV_FILE" && [ -n "$(grep SUPABASE_URL= $ENV_FILE | cut -d'=' -f2)" ]; then
            print_success "SUPABASE_URL configurada"
        else
            print_error "SUPABASE_URL não configurada"
        fi
        
        if grep -q "OPENAI_API_KEY=" "$ENV_FILE" && [ -n "$(grep OPENAI_API_KEY= $ENV_FILE | cut -d'=' -f2)" ]; then
            print_success "OPENAI_API_KEY configurada"
        else
            print_error "OPENAI_API_KEY não configurada"
        fi
    else
        print_error "Arquivo .env não encontrado em mvp-backend/"
    fi
}

# Check processes
check_processes() {
    print_status "Verificando processos Node.js..."
    
    BACKEND_PROCESS=$(ps aux | grep "[n]ode.*mvp-backend" | wc -l)
    FRONTEND_PROCESS=$(ps aux | grep "[n]ode.*mvp-frontend" | wc -l)
    
    if [ "$BACKEND_PROCESS" -gt 0 ]; then
        print_success "Processo backend detectado ($BACKEND_PROCESS)"
    else
        print_warning "Nenhum processo backend detectado"
    fi
    
    if [ "$FRONTEND_PROCESS" -gt 0 ]; then
        print_success "Processo frontend detectado ($FRONTEND_PROCESS)"
    else
        print_warning "Nenhum processo frontend detectado"
    fi
}

# Main health check
main() {
    BACKEND_OK=0
    FRONTEND_OK=0
    DATABASE_OK=0
    GPT4_OK=0
    
    # Check environment first
    check_env
    echo ""
    
    # Check processes
    check_processes
    echo ""
    
    # Check services
    if check_backend; then
        BACKEND_OK=1
    fi
    echo ""
    
    if check_frontend; then
        FRONTEND_OK=1
    fi
    echo ""
    
    if [ "$BACKEND_OK" -eq 1 ]; then
        if check_database; then
            DATABASE_OK=1
        fi
        echo ""
        
        if check_gpt4; then
            GPT4_OK=1
        fi
        echo ""
    fi
    
    # Summary
    echo "📊 RESUMO DO HEALTH CHECK"
    echo "========================"
    
    TOTAL_CHECKS=4
    PASSED_CHECKS=$(($BACKEND_OK + $FRONTEND_OK + $DATABASE_OK + $GPT4_OK))
    
    echo "Backend:   $([ $BACKEND_OK -eq 1 ] && echo '✅' || echo '❌')"
    echo "Frontend:  $([ $FRONTEND_OK -eq 1 ] && echo '✅' || echo '❌')"
    echo "Database:  $([ $DATABASE_OK -eq 1 ] && echo '✅' || echo '❌')"
    echo "GPT-4:     $([ $GPT4_OK -eq 1 ] && echo '✅' || echo '❌')"
    echo ""
    echo "Status: $PASSED_CHECKS/$TOTAL_CHECKS checks passaram"
    
    if [ "$PASSED_CHECKS" -eq "$TOTAL_CHECKS" ]; then
        print_success "🎉 TODOS OS SERVIÇOS FUNCIONANDO!"
        echo "Dashboard: http://localhost:3001/mvp/dashboard"
        exit 0
    else
        print_error "❌ Alguns serviços com problema"
        echo ""
        echo "🔧 SOLUÇÕES:"
        
        if [ "$BACKEND_OK" -eq 0 ]; then
            echo "- Inicie o backend: cd mvp-backend && npm run dev"
        fi
        
        if [ "$FRONTEND_OK" -eq 0 ]; then
            echo "- Inicie o frontend: cd mvp-frontend && npm run dev"
        fi
        
        if [ "$DATABASE_OK" -eq 0 ]; then
            echo "- Verifique configuração Supabase no .env"
            echo "- Execute mvp-database-schema.sql no Supabase"
        fi
        
        if [ "$GPT4_OK" -eq 0 ]; then
            echo "- Verifique OPENAI_API_KEY no .env"
            echo "- Confirme se tem créditos OpenAI"
        fi
        
        exit 1
    fi
}

# Run main function
main