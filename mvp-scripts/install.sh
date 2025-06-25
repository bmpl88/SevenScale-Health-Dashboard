#!/bin/bash

# ========================================
# SEVENSCALE MVP - SCRIPT DE INSTALAÇÃO
# Execute: chmod +x install.sh && ./install.sh
# ========================================

set -e  # Exit on any error

echo "🚀 SevenScale MVP - Instalação Automática"
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
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

# Check if Node.js is installed
check_node() {
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version)
        print_success "Node.js encontrado: $NODE_VERSION"
        
        # Check if version is 18+
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$MAJOR_VERSION" -ge 18 ]; then
            print_success "Versão do Node.js adequada (18+)"
        else
            print_error "Node.js versão 18+ necessária. Atual: $NODE_VERSION"
            exit 1
        fi
    else
        print_error "Node.js não encontrado. Instale Node.js 18+ primeiro."
        echo "Download: https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    if command -v npm >/dev/null 2>&1; then
        NPM_VERSION=$(npm --version)
        print_success "npm encontrado: $NPM_VERSION"
    else
        print_error "npm não encontrado."
        exit 1
    fi
}

# Install backend dependencies
install_backend() {
    print_status "Instalando dependências do backend..."
    cd mvp-backend
    
    if [ -f "package.json" ]; then
        npm install
        print_success "Dependências do backend instaladas"
        
        # Create .env if it doesn't exist
        if [ ! -f ".env" ]; then
            cp .env.example .env
            print_warning "Arquivo .env criado. CONFIGURE suas variáveis antes de continuar!"
        fi
    else
        print_error "package.json não encontrado no diretório mvp-backend"
        exit 1
    fi
    
    cd ..
}

# Install frontend dependencies
install_frontend() {
    print_status "Instalando dependências do frontend..."
    cd mvp-frontend
    
    if [ -f "package.json" ]; then
        npm install
        print_success "Dependências do frontend instaladas"
        
        # Create .env if it doesn't exist
        if [ ! -f ".env" ]; then
            cp .env.example .env
            print_warning "Arquivo .env criado no frontend"
        fi
    else
        print_error "package.json não encontrado no diretório mvp-frontend"
        exit 1
    fi
    
    cd ..
}

# Test backend
test_backend() {
    print_status "Testando configuração do backend..."
    cd mvp-backend
    
    # Check if all required env vars are set
    if [ -f ".env" ]; then
        if grep -q "SUPABASE_URL=" .env && grep -q "OPENAI_API_KEY=" .env; then
            print_success "Variáveis de ambiente configuradas"
        else
            print_warning "Configure SUPABASE_URL e OPENAI_API_KEY no arquivo .env"
        fi
    fi
    
    cd ..
}

# Create start scripts
create_scripts() {
    print_status "Criando scripts de inicialização..."
    
    # Backend start script
    cat > start-backend.sh << 'EOF'
#!/bin/bash
echo "🚀 Iniciando SevenScale MVP Backend..."
cd mvp-backend
npm run dev
EOF
    
    # Frontend start script
    cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "🎨 Iniciando SevenScale MVP Frontend..."
cd mvp-frontend
npm run dev
EOF
    
    # Full start script
    cat > start-mvp.sh << 'EOF'
#!/bin/bash
echo "🚀 Iniciando SevenScale MVP Completo..."
echo "Abrindo Backend em uma nova aba..."

# Start backend in background
cd mvp-backend && npm run dev &
BACKEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Aguardando backend inicializar..."
sleep 5

echo "Abrindo Frontend..."
cd ../mvp-frontend && npm run dev &
FRONTEND_PID=$!

echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "✅ MVP Iniciado com sucesso!"
echo "📊 Backend:  http://localhost:8001"
echo "🎨 Frontend: http://localhost:3001"
echo ""
echo "Para parar os serviços:"
echo "kill $BACKEND_PID $FRONTEND_PID"

# Wait for both processes
wait
EOF
    
    # Make scripts executable
    chmod +x start-backend.sh
    chmod +x start-frontend.sh
    chmod +x start-mvp.sh
    
    print_success "Scripts de inicialização criados"
}

# Main installation process
main() {
    echo ""
    print_status "Iniciando instalação do SevenScale MVP..."
    echo ""
    
    # Step 1: Check prerequisites
    print_status "Verificando pré-requisitos..."
    check_node
    check_npm
    echo ""
    
    # Step 2: Install backend
    print_status "Configurando backend..."
    install_backend
    echo ""
    
    # Step 3: Install frontend
    print_status "Configurando frontend..."
    install_frontend
    echo ""
    
    # Step 4: Test configuration
    print_status "Verificando configuração..."
    test_backend
    echo ""
    
    # Step 5: Create start scripts
    print_status "Criando scripts utilitários..."
    create_scripts
    echo ""
    
    # Final instructions
    echo "🎉 INSTALAÇÃO CONCLUÍDA COM SUCESSO!"
    echo "====================================="
    echo ""
    echo "📋 PRÓXIMOS PASSOS:"
    echo ""
    echo "1. Configure o Supabase:"
    echo "   - Execute o script mvp-database-schema.sql no Supabase"
    echo "   - Configure SUPABASE_URL e SUPABASE_ANON_KEY"
    echo ""
    echo "2. Configure OpenAI:"
    echo "   - Adicione OPENAI_API_KEY no mvp-backend/.env"
    echo ""
    echo "3. Inicie o MVP:"
    echo "   ./start-mvp.sh        # Inicia backend + frontend"
    echo "   ./start-backend.sh    # Apenas backend"
    echo "   ./start-frontend.sh   # Apenas frontend"
    echo ""
    echo "4. Acesse o dashboard:"
    echo "   🎨 Frontend: http://localhost:3001/mvp/dashboard"
    echo "   📊 Backend:  http://localhost:8001/api/mvp/health"
    echo ""
    echo "📚 Documentação completa: mvp-setup.md"
    echo ""
    print_success "Instalação finalizada!"
}

# Run main function
main