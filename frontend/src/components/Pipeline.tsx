            <p className="text-xl font-bold text-gray-900">127</p>
            <p className="text-xs text-orange-600">dias/projeto</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">+18%</span>
          </div>
          <div>
            <p className="text-gray-600 font-medium text-xs mb-1">ROI Médio Gerado</p>
            <p className="text-xl font-bold text-gray-900">316%</p>
            <p className="text-xs text-purple-600">para clientes</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">156</span>
          </div>
          <div>
            <p className="text-gray-600 font-medium text-xs mb-1">Fases Completadas</p>
            <p className="text-xl font-bold text-gray-900">156</p>
            <p className="text-xs text-indigo-600">marcos atingidos</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-pink-600" />
            </div>
            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">12</span>
          </div>
          <div>
            <p className="text-gray-600 font-medium text-xs mb-1">Clientes no Pipeline</p>
            <p className="text-xl font-bold text-gray-900">12</p>
            <p className="text-xs text-pink-600">transformações ativas</p>
          </div>
        </div>
      </div>

      {/* Visão das 7 Fases IMPULSO® */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Visão das 7 Fases IMPULSO®</h3>
            <p className="text-gray-500">Fluxo conectado da metodologia proprietária</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-full bg-gray-200 rounded-full h-2 w-32">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: '71%' }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">71% Progresso</span>
          </div>
        </div>
        
        {/* Container otimizado para 7 cards */}
        <div className="relative">
          {/* Linha de progresso contínua de fundo */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 transform -translate-y-1/2">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-orange-500 transition-all duration-1000 rounded-full"
              style={{ width: '71%' }}
            />
          </div>
          
          {/* Grid otimizado para exatamente 7 fases */}
          <div className="grid grid-cols-7 gap-2 max-w-full mx-auto xl:gap-3">
            {fases.map((fase, index) => {
              const IconComponent = fase.icon;
              return (
                <React.Fragment key={fase.id}>
                  {/* Card da fase */}
                  <div className={`
                    relative rounded-lg p-3 xl:p-4 shadow-lg border-2 transition-all duration-300 hover:shadow-xl min-w-0
                    ${fase.concluida ? 'bg-green-50 border-green-200 hover:border-green-300' : 
                      fase.ativa ? 'bg-purple-50 border-purple-300 hover:border-purple-400' : 
                      'bg-white border-gray-200 hover:border-gray-300'}
                  `}>
                    {/* Indicador de status */}
                    <StatusIndicator 
                      concluido={fase.concluida}
                      ativo={fase.ativa}
                    />
                    
                    {/* Conteúdo do card */}
                    <div className="text-center pt-2">
                      <div className={`
                        w-8 h-8 xl:w-10 xl:h-10 mx-auto mb-2 xl:mb-3 rounded-lg flex items-center justify-center
                        ${fase.concluida ? 'bg-green-100' : 
                          fase.ativa ? 'bg-purple-100' : 'bg-gray-100'}
                      `}>
                        <IconComponent className={`
                          w-4 h-4 xl:w-5 xl:h-5
                          ${fase.concluida ? 'text-green-600' : 
                            fase.ativa ? 'text-purple-600' : 'text-gray-600'}
                        `} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-xs xl:text-sm mb-1 leading-tight">{fase.nome}</h3>
                      <p className="text-xs text-gray-600 mb-1">{fase.tempo}</p>
                      <p className="text-xs text-gray-500 mb-2">{fase.projetos} projetos</p>
                      <div className={`
                        text-xs px-2 py-1 rounded inline-block
                        ${fase.concluida ? 'bg-green-100 text-green-800' : 
                          fase.ativa ? 'bg-purple-100 text-purple-800' : 
                          'bg-gray-100 text-gray-600'}
                      `}>
                        {fase.concluida ? 'Concluída' : fase.ativa ? 'Em Andamento' : 'Pendente'}
                      </div>
                      <p className="text-xs text-gray-500 mt-2 leading-tight">{fase.status}</p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          
          {/* Legenda do fluxo */}
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Concluída</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                <span>Em Andamento</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span>Pendente</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-orange-500 rounded mr-2"></div>
                <span>Fluxo Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projetos Detalhados */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Projetos Detalhados</h3>
            <p className="text-sm text-gray-500">8 projetos ativos no pipeline IMPULSO®</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              + Novo Projeto
            </button>
            <button className="text-blue-600 text-sm hover:text-blue-700 border border-blue-200 px-4 py-2 rounded-lg">
              Ver Completos
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            { 
              name: 'CardioCenter Digital Transform', 
              clinic: 'Clínica CardioCenter', 
              phase: 'INVESTIGAR', 
              progress: 80, 
              responsible: 'Ana Silva', 
              roi: '+287%', 
              nextMilestone: 'Análise de dados concluída',
              timeline: '12 dias restantes',
              priority: 'high' 
            },
            { 
              name: 'DermaClinic Process Optimization', 
              clinic: 'DermaClinic Especializada', 
              phase: 'MAPEAR', 
              progress: 100, 
              responsible: 'Carlos Santos', 
              roi: '+156%', 
              nextMilestone: 'Mapeamento finalizado',
              timeline: 'Concluído',
              priority: 'medium' 
            },
            { 
              name: 'SmileCare MVP Development', 
              clinic: 'SmileCare Odontologia', 
              phase: 'PROTOTIPAR', 
              progress: 90, 
              responsible: 'Maria Costa', 
              roi: '+234%', 
              nextMilestone: 'Testes finais do protótipo',
              timeline: '3 dias restantes',
              priority: 'high' 
            },
            { 
              name: 'OftalmoCenter Implementation', 
              clinic: 'Centro Oftalmológico', 
              phase: 'UTILIZAR', 
              progress: 60, 
              responsible: 'João Oliveira', 
              roi: '+198%', 
              nextMilestone: 'Deploy em produção',
              timeline: '8 dias restantes',
              priority: 'medium' 
            }
          ].map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-500">{project.clinic}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.phase === 'INVESTIGAR' ? 'bg-blue-100 text-blue-800' :
                      project.phase === 'MAPEAR' ? 'bg-green-100 text-green-800' :
                      project.phase === 'PROTOTIPAR' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {project.phase}
                    </span>
                    <p className="text-sm font-bold text-gray-900 mt-1">{project.progress}%</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    project.priority === 'high' ? 'bg-red-500' : 
                    project.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Responsável</p>
                  <p className="text-sm font-medium text-gray-900">{project.responsible}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">ROI</p>
                  <p className="text-sm font-medium text-green-600">{project.roi}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Próximo Marco</p>
                  <p className="text-sm font-medium text-gray-900">{project.nextMilestone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Timeline</p>
                  <p className="text-sm font-medium text-gray-900">{project.timeline}</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default renderPipeline;