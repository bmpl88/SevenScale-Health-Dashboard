              { name: 'Outros', value: 82, color: 'bg-gray-400' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Intelligence Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Business Intelligence Health - Insights Automatizados</h3>
            <p className="text-sm text-gray-500">Processamento de dados multi-fonte para clínicas e consultórios</p>
          </div>
          <div className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">Sistema Ativo</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Cpu className="w-8 h-8 text-green-600" />
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+24.1%</span>
            </div>
            <p className="text-sm text-green-600 mb-1">Processamento IA</p>
            <p className="text-2xl font-bold text-gray-900">2.847</p>
            <p className="text-xs text-gray-500">análises/dia</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-8 h-8 text-blue-600" />
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">98.7%</span>
            </div>
            <p className="text-sm text-blue-600 mb-1">Integridade Dados</p>
            <p className="text-2xl font-bold text-gray-900">156TB</p>
            <p className="text-xs text-gray-500">processados</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Link className="w-8 h-8 text-yellow-600" />
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+18.3%</span>
            </div>
            <p className="text-sm text-yellow-600 mb-1">APIs Conectadas</p>
            <p className="text-2xl font-bold text-gray-900">47</p>
            <p className="text-xs text-gray-500">integrações ativas</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-8 h-8 text-orange-600" />
              <span className="text-sm text-gray-600">Tempo real</span>
            </div>
            <p className="text-sm text-orange-600 mb-1">Uptime Sistema</p>
            <p className="text-2xl font-bold text-gray-900">99.9%</p>
            <p className="text-xs text-gray-500">disponibilidade</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgentes = () => (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Agentes IMPULSO® Health</h1>
            <p className="text-blue-100 text-lg">Inteligência Artificial especializada em 7 fases para transformação digital de clínicas</p>
          </div>
        </div>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-lg">100%</span>
          </div>
          <div>
            <p className="text-gray-600 font-medium text-sm mb-1">Agentes Ativos</p>
            <p className="text-3xl font-bold text-gray-900">7/7</p>
            <p className="text-sm text-green-600">Operacional</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-lg">+12%</span>
          </div>
          <div>
            <p className="text-gray-600 font-medium text-sm mb-1">Processamentos Hoje</p>
            <p className="text-3xl font-bold text-gray-900">1.847</p>
            <p className="text-sm text-blue-600">análises</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-lg">+8%</span>
          </div>
          <div>
            <p className="text-gray-600 font-medium text-sm mb-1">Insights Gerados</p>
            <p className="text-3xl font-bold text-gray-900">156</p>
            <p className="text-sm text-purple-600">relatórios</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
            <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-lg">+15%</span>
          </div>
          <div>
            <p className="text-gray-600 font-medium text-sm mb-1">Clínicas Impactadas</p>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-sm text-orange-600">clientes</p>
          </div>
        </div>
      </div>

      {/* Os 7 Agentes */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Os 7 Agentes IMPULSO®</h3>
            <p className="text-gray-500">Especialistas em inteligência artificial para cada fase da transformação</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Configurar Agentes
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              name: 'INVESTIGAR', 
              icon: Search, 
              status: 'Ativo', 
              uptime: '99.2%', 
              processing: '156 análises de dados',
              lastAction: 'Análise CardioCenter (há 12 min)',
              performance: '94% precisão',
              color: 'blue',
              statusColor: 'green'
            },
            { 
              name: 'MAPEAR', 
              icon: Map, 
              status: 'Ativo', 
              uptime: '98.7%', 
              processing: '89 mapeamentos de processo',
              lastAction: 'Estratégia DermaClinic (há 8 min)',
              performance: '92% precisão',
              color: 'green',
              statusColor: 'green'
            },
            { 
              name: 'PROTOTIPAR', 
              icon: Wrench, 
              status: 'Processando', 
              uptime: '78% Load', 
              processing: '12 cenários ativos',
              lastAction: 'MVP SmileCare (há 2 min)',
              performance: '89% precisão',
              color: 'yellow',
              statusColor: 'yellow'
            },
            { 
              name: 'UTILIZAR', 
              icon: Rocket, 
              status: 'Ativo', 
              uptime: '99.8%', 
              processing: '34 automações ativas',
              lastAction: 'Deploy CardioVital (há 15 min)',
              performance: '96% sucesso',
              color: 'purple',
              statusColor: 'green'
            },
            { 
              name: 'LAPIDAR', 
              icon: Gem, 
              status: 'Ativo', 
              uptime: '97.3%', 
              processing: '67 processos em análise',
              lastAction: 'Otimização OftalmoCenter (há 5 min)',
              performance: '91% melhoria',
              color: 'pink',
              statusColor: 'green'
            },
            { 
              name: 'SISTEMATIZAR', 
              icon: Cog, 
              status: 'Ativo', 
              uptime: '98.9%', 
              processing: '23 workflows criados',
              lastAction: 'Sistema PediatriaPlus (há 20 min)',
              performance: '93% automação',
              color: 'indigo',
              statusColor: 'green'
            },
            { 
              name: 'OTIMIZAR', 
              icon: Gauge, 
              status: 'Ativo', 
              uptime: '99.5%', 
              processing: '45 KPIs identificados',
              lastAction: 'ROI boost NeuroClinic (há 3 min)',
              performance: '97% impacto',
              color: 'red',
              statusColor: 'green'
            }
          ].map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-200 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-${agent.color}-100 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 text-${agent.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{agent.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          agent.statusColor === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <span className={`text-xs px-2 py-1 rounded ${
                          agent.statusColor === 'green' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {agent.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Uptime: {agent.uptime}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Processando:</p>
                    <p className="text-sm font-medium text-gray-900">{agent.processing}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Última ação:</p>
                    <p className="text-sm font-medium text-gray-900">{agent.lastAction}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Performance:</p>
                    <p className="text-sm font-medium text-green-600">{agent.performance}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>Monitorar</span>
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 p-2 border border-gray-200 rounded-lg">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 p-2 border border-gray-200 rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights Recentes */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Insights Recentes</h3>
            <p className="text-gray-500">Descobertas automáticas dos agentes nas últimas 24h</p>
          </div>
          <button className="text-blue-600 text-sm hover:text-blue-700 border border-blue-200 px-4 py-2 rounded-lg">
            Ver Todos
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            {
              agent: 'OTIMIZAR',
              icon: Gauge,
              color: 'green',
              title: 'Oportunidade de ROI Detectada',
              description: 'Agente OTIMIZAR detectou oportunidade +23% ROI na CardioCenter através de otimização de campanhas Meta Ads',
              time: 'há 15 minutos',
              impact: 'Alto Impacto',
              impactColor: 'red'
            },
            {
              agent: 'MAPEAR',
              icon: Map,
              color: 'blue',
              title: 'Gargalo Identificado',
              description: 'Agente MAPEAR identificou gargalo no atendimento DermaClinic - tempo médio de espera 40% acima da média',
              time: 'há 32 minutos',
              impact: 'Médio Impacto',
              impactColor: 'yellow'
            },
            {
              agent: 'INVESTIGAR',
              icon: Search,
              color: 'purple',
              title: 'Padrão Anômalo Detectado',
              description: 'Agente INVESTIGAR encontrou padrão anômalo nos dados de conversão do Hospital Santa Clara - requer análise',
              time: 'há 1 hora',
              impact: 'Médio Impacto',
              impactColor: 'yellow'
            },
            {
              agent: 'UTILIZAR',
              icon: Rocket,
              color: 'orange',
              title: 'Implementação Concluída',
              description: 'Agente UTILIZAR finalizou implementação de automação de agendamento na Clínica Ortopédica Plus',
              time: 'há 2 horas',
              impact: 'Sucesso',
              impactColor: 'green'
            },
            {
              agent: 'LAPIDAR',
              icon: Gem,
              color: 'pink',
              title: 'Otimização Aplicada',
              description: 'Agente LAPIDAR aplicou 12 otimizações no funil de conversão do Centro Pediátrico Alegria',
              time: 'há 3 horas',
              impact: 'Sucesso',
              impactColor: 'green'
            }
          ].map((insight, index) => {
            const IconComponent = insight.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 bg-${insight.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-5 h-5 text-${insight.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 text-sm">{insight.agent}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{insight.time}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        insight.impactColor === 'red' ? 'bg-red-100 text-red-800' :
                        insight.impactColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {insight.impact}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );