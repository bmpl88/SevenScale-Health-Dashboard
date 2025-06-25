#!/bin/bash

# SevenScale MVP - Script de Inicialização
# Execute: chmod +x mvp-start.sh && ./mvp-start.sh

echo "🚀 Iniciando SevenScale MVP..."
echo "=====================================\n"

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ e tente novamente."
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale npm e tente novamente."
    exit 1
fi

echo "✅ Node.js $(node --version) encontrado"
echo "✅ npm $(npm --version) encontrado\n"

# Verificar se estamos no diretório correto
if [ ! -d "mvp-backend" ] || [ ! -d "mvp-frontend" ]; then
    echo "❌ Diretórios MVP não encontrados. Execute este script na raiz do projeto."
    exit 1
fi

# Função para verificar se uma porta está em uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Verificar portas
echo "🔍 Verificando portas..."
if check_port 8001; then
    echo "⚠️  Porta 8001 (backend) já está em uso"
    read -p "Deseja continuar mesmo assim? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

if check_port 3001; then
    echo "⚠️  Porta 3001 (frontend) já está em uso"
    read -p "Deseja continuar mesmo assim? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "\n📦 ETAPA 1: Configurando Backend MVP..."
cd mvp-backend

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependências do backend..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Falha na instalação das dependências do backend"
        exit 1
    fi
else
    echo "✅ Dependências do backend já instaladas"
fi

# Verificar arquivo .env
if [ ! -f ".env" ]; then
    echo "⚠️  Arquivo .env não encontrado"
    if [ -f ".env.example" ]; then
        echo "📋 Copiando .env.example para .env..."
        cp .env.example .env
        echo "\n⚙️  CONFIGURE SEU .env AGORA:"
        echo "   - SUPABASE_URL=sua-url-supabase"
        echo "   - SUPABASE_ANON_KEY=sua-chave-supabase"
        echo "   - OPENAI_API_KEY=sua-chave-openai"
        echo "\n📝 Editando .env..."
        
        # Abrir editor padrão ou nano
        if command -v code &> /dev/null; then
            code .env
        elif command -v nano &> /dev/null; then
            nano .env
        else
            echo "\n📝 Edite o arquivo .env manualmente em: $(pwd)/.env"
        fi
        
        read -p "\nPressione Enter quando terminar de configurar o .env..." -r
    else
        echo "❌ Arquivo .env.example não encontrado"
        exit 1
    fi
else
    echo "✅ Arquivo .env encontrado"
fi

echo "\n🎨 ETAPA 2: Configurando Frontend MVP..."
cd ../mvp-frontend

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependências do frontend..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Falha na instalação das dependências do frontend"
        exit 1
    fi
else
    echo "✅ Dependências do frontend já instaladas"
fi

# Verificar arquivo .env
if [ ! -f ".env" ]; then
    echo "📋 Criando .env do frontend..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Arquivo .env criado para o frontend"
    fi
fi

cd ..

echo "\n🚀 ETAPA 3: Iniciando Serviços MVP..."
echo "=====================================\n"

# Função para iniciar backend em background
start_backend() {
    echo "🔧 Iniciando backend MVP (porta 8001)..."
    cd mvp-backend
    npm run dev > ../mvp-backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    # Aguardar backend inicializar
    echo "⏳ Aguardando backend inicializar..."
    for i in {1..30}; do
        if curl -s http://localhost:8001/api/mvp/health > /dev/null 2>&1; then
            echo "✅ Backend MVP online!"
            return 0
        fi
        sleep 1
        echo -n "."
    done
    echo "\n❌ Backend não conseguiu inicializar em 30 segundos"
    return 1
}

# Função para iniciar frontend em background
start_frontend() {
    echo "\n🎨 Iniciando frontend MVP (porta 3001)..."
    cd mvp-frontend
    npm run dev > ../mvp-frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    
    # Aguardar frontend inicializar
    echo "⏳ Aguardando frontend inicializar..."
    for i in {1..20}; do
        if curl -s http://localhost:3001 > /dev/null 2>&1; then
            echo "✅ Frontend MVP online!"
            return 0
        fi
        sleep 1
        echo -n "."
    done
    echo "\n❌ Frontend não conseguiu inicializar em 20 segundos"
    return 1
}

# Iniciar serviços
start_backend
if [ $? -eq 0 ]; then
    start_frontend
    if [ $? -eq 0 ]; then
        echo "\n🎉 MVP SEVENSCALE ONLINE!"
        echo "=====================================\n"
        echo "🔧 Backend:  http://localhost:8001"
        echo "🎨 Frontend: http://localhost:3001"
        echo "📊 Dashboard: http://localhost:3001/mvp/dashboard"
        echo "\n📋 Health Check:"
        echo "   curl http://localhost:8001/api/mvp/health"
        echo "\n📝 Logs:"
        echo "   Backend:  tail -f mvp-backend.log"
        echo "   Frontend: tail -f mvp-frontend.log"
        echo "\n⏹️  Para parar: Ctrl+C ou kill $BACKEND_PID $FRONTEND_PID"
        echo "\n🎯 Pressione Ctrl+C para parar todos os serviços..."
        
        # Aguardar Ctrl+C
        trap "echo '\n🛑 Parando serviços MVP...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '✅ Serviços parados'; exit 0" INT
        
        # Manter script rodando
        while true; do
            sleep 1
        done
    else
        echo "❌ Falha ao iniciar frontend"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
else
    echo "❌ Falha ao iniciar backend"
    exit 1
fi