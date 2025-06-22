import React, { useState, useEffect } from 'react';
import { Layout, Card, Menu, Space, Avatar, Input, Badge, Dropdown, Progress, Statistic, Button, Tag } from 'antd';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Calendar,
  Search,
  Bell,
  Settings,
  User,
  BarChart3,
  Brain,
  Workflow,
  Clock,
  CheckCircle,
  ArrowRight,
  Activity,
  Target
} from 'lucide-react';

const { Header, Content } = Layout;

// Hook simulado para dados do Pipeline Supabase
const usePipelineData = () => {
  const [data, setData] = useState({
    pipelineDetalhado: [],
    clinicasPipeline: [],
    metricas: {},
    loading: true
  });

  useEffect(() => {
    setTimeout(() => {
      setData({
        pipelineDetalhado: [
          { 
            fase: 'INVESTIGAR', 
            icone: '🔍', 
            cor: '#3B82F6',
            posicao: 1,
            clinicas: 0,
            tempoMedio: 7,
            titulo: 'Diagnosticar & Investigar',
            descricao: 'Análise profunda da situação atual da clínica, identificação de gargalos operacionais e mapeamento do perfil ideal de clientes (ICP).',
            criterios: ['Auditoria operacional completa', 'Definição ICP médico', 'Análise concorrência local', 'Identificação oportunidades'],
            entregaveis: ['Relatório diagnóstico', 'ICP detalhado', 'Plano estratégico inicial'],
            kpis: ['ROI atual', 'Taxa conversão', 'CAC por canal', 'LTV paciente']
          },
          { 
            fase: 'MAPEAR', 
            icone: '🗺️', 
            cor: '#10B981',
            posicao: 2,
            clinicas: 0,
            tempoMedio: 5,
            titulo: 'Arquitetar & Mapear',
            descricao: 'Desenho de fluxos otimizados, criação de funis de conversão personalizados e definição da jornada ideal do paciente.',
            criterios: ['Mapeamento jornada paciente', 'Funis conversão desenhados', 'Processos otimizados', 'Automações planejadas'],
            entregaveis: ['Fluxogramas detalhados', 'Funis conversão', 'Wireframes sistema'],
            kpis: ['Taxa engajamento', 'Tempo jornada', 'Points conversão', 'Drop-off rate']
          },
          { 
            fase: 'PROTOTIPAR', 
            icone: '⚡', 
            cor: '#F59E0B',
            posicao: 3,
            clinicas: 0,
            tempoMedio: 12,
            titulo: 'Prototipar & Testar',
            descricao: 'Desenvolvimento de MVPs, implementação de testes A/B médicos e validação de hipóteses com dados reais.',
            criterios: ['MVPs desenvolvidos', 'Testes A/B ativos', 'Hipóteses validadas', 'Métricas coletadas'],
            entregaveis: ['Protótipos funcionais', 'Relatórios A/B tests', 'Validações hipóteses'],
            kpis: ['Conversion rate', 'A/B test results', 'User feedback', 'Performance MVP']
          },
          { 
            fase: 'UTILIZAR', 
            icone: '🏗️', 
            cor: '#EF4444',
            posicao: 4,
            clinicas: 0,
            tempoMedio: 18,
            titulo: 'Implementar & Utilizar',
            descricao: 'Deploy das soluções validadas, configuração de automações de follow-up e integração completa dos sistemas.',
            criterios: ['Deploy realizado', 'Automações ativas', 'Sistemas integrados', 'Equipe treinada'],
            entregaveis: ['Sistema em produção', 'Automações configuradas', 'Treinamento equipe'],
            kpis: ['Uptime sistema', 'Automações ativas', 'Adoção equipe', 'Eficiência operacional']
          },
          { 
            fase: 'LAPIDACAO', 
            icone: '💎', 
            cor: '#8B5CF6',
            posicao: 5,
            clinicas: 1,
            tempoMedio: 15,
            titulo: 'Lapidar & Otimizar ML',
            descricao: 'Aplicação de machine learning para otimização contínua, previsão de demanda e personalização do atendimento.',
            criterios: ['ML modelos ativos', 'Previsões demanda', 'Otimização contínua', 'Personalização ativa'],
            entregaveis: ['Modelos ML produção', 'Dashboard preditivo', 'Otimizações automáticas'],
            kpis: ['Accuracy modelos', 'Previsão demanda', 'ROI otimizações', 'Satisfação paciente']
          },
          { 
            fase: 'SISTEMATIZAR', 
            icone: '⚙️', 
            cor: '#06B6D4',
            posicao: 6,
            clinicas: 1,
            tempoMedio: 8,
            titulo: 'Sistematizar & Escalar',
            descricao: 'Criação de protocolos replicáveis, implementação de programas de referência e sistematização completa dos processos.',
            criterios: ['Protocolos documentados', 'Referral program ativo', 'Processos sistematizados', 'Escalabilidade testada'],
            entregaveis: ['Manual processos', 'Programa referência', 'Sistema escalável'],
            kpis: ['Referrals gerados', 'Processos padronizados', 'Tempo onboarding', 'Escalabilidade']
          },
          { 
            fase: 'OTIMIZAR', 
            icone: '🎯', 
            cor: '#FF7A00',
            posicao: 7,
            clinicas: 1,
            tempoMedio: 30,
            titulo: 'Monitorar & Otimizar',
            descricao: 'Analytics 24/7, identificação automática de oportunidades de growth e otimização contínua baseada em dados.',
            criterios: ['Analytics 24/7 ativo', 'Oportunidades identificadas', 'Growth contínuo', 'ROI maximizado'],
            entregaveis: ['Dashboard analytics', 'Alertas automáticos', 'Relatórios growth'],
            kpis: ['ROI total', 'Growth rate', 'Oportunidades detectadas', 'Performance 24/7']
          }
        ],
        clinicasPipeline: [
          {
            id: 2,
            nome: "Clínica Derma Recife", 
            fase_atual: "LAPIDACAO",
            posicao_fase: 5,
            tempo_na_fase: 23,
            roi_atual: 198.75,
            pacientes_mes: 623,
            progresso_fase: 78,
            proxima_acao: "Implementar modelo ML previsão demanda",
            responsavel: "Agente LAPIDADOR",
            data_entrada_fase: "2025-05-30",
            historico_fases: [
              { fase: "INVESTIGAR", entrada: "2025-04-15", saida: "2025-04-22", duracao: 7 },
              { fase: "MAPEAR", entrada: "2025-04-22", saida: "2025-04-27", duracao: 5 },
              { fase: "PROTOTIPAR", entrada: "2025-04-27", saida: "2025-05-09", duracao: 12 },
              { fase: "UTILIZAR", entrada: "2025-05-09", saida: "2025-05-27", duracao: 18 },
              { fase: "LAPIDACAO", entrada: "2025-05-30", saida: null, duracao: 23 }
            ]
          },
          {
            id: 3,
            nome: "OdontoVita Salvador",
            fase_atual: "SISTEMATIZAR", 
            posicao_fase: 6,
            tempo_na_fase: 12,
            roi_atual: 189.25,
            pacientes_mes: 711,
            progresso_fase: 45,
            proxima_acao: "Criar manual processos replicáveis",
            responsavel: "Agente SISTEMATIZADOR",
            data_entrada_fase: "2025-06-10",
            historico_fases: [
              { fase: "INVESTIGAR", entrada: "2025-03-20", saida: "2025-03-27", duracao: 7 },
              { fase: "MAPEAR", entrada: "2025-03-27", saida: "2025-04-01", duracao: 5 },
              { fase: "PROTOTIPAR", entrada: "2025-04-01", saida: "2025-04-13", duracao: 12 },
              { fase: "UTILIZAR", entrada: "2025-04-13", saida: "2025-05-01", duracao: 18 },
              { fase: "LAPIDACAO", entrada: "2025-05-01", saida: "2025-05-16", duracao: 15 },
              { fase: "SISTEMATIZAR", entrada: "2025-06-10", saida: null, duracao: 12 }
            ]
          },
          {
            id: 1,
            nome: "CardioCenter Fortaleza",
            fase_atual: "OTIMIZAR",
            posicao_fase: 7,
            tempo_na_fase: 45,
            roi_atual: 287.5,
            pacientes_mes: 856,
            progresso_fase: 85,
            proxima_acao: "Análise oportunidades growth Q3",
            responsavel: "Agente MONITOR",
            data_entrada_fase: "2025-05-08",
            historico_fases: [
              { fase: "INVESTIGAR", entrada: "2025-02-01", saida: "2025-02-08", duracao: 7 },
              { fase: "MAPEAR", entrada: "2025-02-08", saida: "2025-02-13", duracao: 5 },
              { fase: "PROTOTIPAR", entrada: "2025-02-13", saida: "2025-02-25", duracao: 12 },
              { fase: "UTILIZAR", entrada: "2025-02-25", saida: "2025-03-15", duracao: 18 },
              { fase: "LAPIDACAO", entrada: "2025-03-15", saida: "2025-03-30", duracao: 15 },
              { fase: "SISTEMATIZAR", entrada: "2025-03-30", saida: "2025-04-07", duracao: 8 },
              { fase: "OTIMIZAR", entrada: "2025-05-08", saida: null, duracao: 45 }
            ]
          }
        ],
        metricas: {
          taxaSucesso: 87,
          tempoMedioTotal: 12.8,
          clinicasAtivas: 3,
          capacidadeMaxima: 15,
          fasesMaisRapidas: ["MAPEAR", "SISTEMATIZAR"],
          fasesGargalo: ["UTILIZAR", "OTIMIZAR"],
          roiMedioFinal: 225
        },
        loading: false
      });
    }, 1000);
  }, []);

  return data;
};

const PipelineImpulsoPage = () => {
  const { pipelineDetalhado, clinicasPipeline, metricas, loading } = usePipelineData();
  const [faseExpandida, setFaseExpandida] = useState(null);

  const renderFaseCard = (fase) => {
    const isExpanded = faseExpandida === fase.fase;
    return (
      <Card 
        key={fase.fase} 
        style={{
          borderRadius: '12px', 
          border: '1px solid #e2e8f0', 
          background: 'white', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', 
          position: 'relative', 
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: isExpanded ? 'scale(1.02)' : 'scale(1)'
        }}
        onClick={() => setFaseExpandida(isExpanded ? null : fase.fase)}
      >
        <div style={{
          position: 'absolute', 
          top: '0', 
          left: '0', 
          width: '100%', 
          height: '4px', 
          background: fase.cor
        }} />
        
        <div style={{ padding: '20px' }}>
          {/* Header da Fase - HIERARQUIA H3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>{fase.icone}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#64748b', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.8px', 
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Fase {fase.posicao}
                </div>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: fase.cor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '10px', fontWeight: '700' }}>
                    {fase.posicao}
                  </span>
                </div>
              </div>
              <div style={{ 
                fontSize: '17px', 
                fontWeight: '700', 
                color: '#1e293b',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '22px',
                letterSpacing: '-0.01em'
              }}>
                {fase.titulo}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: '800', 
                color: '#1e293b',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.03em',
                lineHeight: '36px'
              }}>
                {loading ? '-' : fase.clinicas}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#64748b',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                {fase.clinicas === 1 ? 'clínica' : 'clínicas'}
              </div>
            </div>
          </div>

          {/* Descrição - HIERARQUIA BODY */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ 
              fontSize: '15px', 
              color: '#64748b', 
              lineHeight: '22px', 
              margin: '0',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400'
            }}>
              {fase.descricao}
            </p>
          </div>

          {/* Métricas da Fase - HIERARQUIA H5 */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '12px', 
            marginBottom: '16px',
            padding: '16px',
            background: '#F8FAFC',
            borderRadius: '8px'
          }}>
            <div>
              <div style={{ 
                fontSize: '10px', 
                color: '#64748b', 
                textTransform: 'uppercase', 
                letterSpacing: '0.8px', 
                marginBottom: '6px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600'
              }}>
                Tempo Médio
              </div>
              <div style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#1e293b',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.01em'
              }}>
                {fase.tempoMedio} dias
              </div>
            </div>
            <div>
              <div style={{ 
                fontSize: '10px', 
                color: '#64748b', 
                textTransform: 'uppercase', 
                letterSpacing: '0.8px', 
                marginBottom: '6px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600'
              }}>
                Status
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: fase.clinicas > 0 ? '#10B981' : '#CBD5E1'
                }} />
                <span style={{ 
                  fontSize: '13px', 
                  color: fase.clinicas > 0 ? '#059669' : '#64748b', 
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {fase.clinicas > 0 ? 'Ativa' : 'Aguardando'}
                </span>
              </div>
            </div>
          </div>

          {/* Detalhes Expandidos */}
          {isExpanded && (
            <div style={{ 
              borderTop: '1px solid #e2e8f0', 
              paddingTop: '16px',
              animation: 'fadeIn 0.3s ease'
            }}>
              {/* Critérios - HIERARQUIA H6 */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  color: '#1e293b', 
                  marginBottom: '8px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  ✅ Critérios de Conclusão:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {fase.criterios.map((criterio, idx) => (
                    <div key={idx} style={{ 
                      fontSize: '12px', 
                      color: '#64748b',
                      fontFamily: 'Inter, sans-serif',
                      paddingLeft: '8px',
                      fontWeight: '400'
                    }}>
                      • {criterio}
                    </div>
                  ))}
                </div>
              </div>

              {/* Entregáveis - HIERARQUIA H6 */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  color: '#1e293b', 
                  marginBottom: '8px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  📋 Entregáveis:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {fase.entregaveis.map((entregavel, idx) => (
                    <Tag 
                      key={idx} 
                      style={{ 
                        fontSize: '11px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500',
                        border: `1px solid ${fase.cor}30`,
                        background: `${fase.cor}10`,
                        color: fase.cor
                      }}
                    >
                      {entregavel}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* KPIs - HIERARQUIA H6 */}
              <div>
                <div style={{ 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  color: '#1e293b', 
                  marginBottom: '8px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  📊 KPIs Monitorados:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {fase.kpis.map((kpi, idx) => (
                    <Tag 
                      key={idx} 
                      style={{ 
                        fontSize: '11px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500',
                        background: '#F1F5F9',
                        color: '#475569',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      {kpi}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Indicador de Expansão - HIERARQUIA CAPTION */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '12px',
            fontSize: '11px',
            color: '#64748b',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500'
          }}>
            {isExpanded ? '▲ Clique para fechar detalhes' : '▼ Clique para ver detalhes'}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div style={{ 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      letterSpacing: '-0.01em'
    }}>
      {/* FONTE INTER IMPLEMENTADA via Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
          
      {/* Header da Página - HIERARQUIA H1 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #FF7A00 0%, #1A202C 100%)', 
          borderRadius: '16px', 
          padding: '40px', 
          color: 'white',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Workflow size={36} color="white" />
            </div>
            <div>
              <h1 style={{ 
                fontSize: '42px', 
                fontWeight: '800', 
                margin: '0 0 12px 0', 
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.03em',
                lineHeight: '48px'
              }}>
                Pipeline Método IMPULSO® Health
              </h1>
              <p style={{ 
                fontSize: '18px', 
                margin: '0', 
                opacity: '0.9',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                lineHeight: '26px'
              }}>
                Metodologia proprietária SevenScale em 7 fases para transformação digital de clínicas médicas
              </p>
            </div>
          </div>
        </div>

        {/* Métricas do Pipeline - HIERARQUIA H4 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '8px' }}>
            <Statistic
              title={<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Taxa de Sucesso</span>}
              value={loading ? 0 : metricas.taxaSucesso}
              suffix="%"
              valueStyle={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: '800', 
                color: '#10B981',
                letterSpacing: '-0.02em',
                fontSize: '32px'
              }}
            />
            <div style={{ marginTop: '10px' }}>
              <Progress 
                percent={loading ? 0 : metricas.taxaSucesso} 
                strokeColor="#10B981" 
                showInfo={false}
                size="small"
              />
            </div>
          </Card>

          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '8px' }}>
            <Statistic
              title={<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Tempo Médio/Fase</span>}
              value={loading ? 0 : metricas.tempoMedioTotal}
              suffix="dias"
              valueStyle={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: '800', 
                color: '#3B82F6',
                letterSpacing: '-0.02em',
                fontSize: '32px'
              }}
            />
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              🚀 15% mais rápido que benchmark
            </div>
          </Card>

          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '8px' }}>
            <Statistic
              title={<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Clínicas Ativas</span>}
              value={loading ? 0 : metricas.clinicasAtivas}
              suffix={`/${metricas.capacidadeMaxima}`}
              valueStyle={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: '800', 
                color: '#FF7A00',
                letterSpacing: '-0.02em',
                fontSize: '32px'
              }}
            />
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              💡 {metricas.capacidadeMaxima - metricas.clinicasAtivas} vagas disponíveis
            </div>
          </Card>

          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '8px' }}>
            <Statistic
              title={<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>ROI Médio Final</span>}
              value={loading ? 0 : metricas.roiMedioFinal}
              suffix="%"
              valueStyle={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: '800', 
                color: '#8B5CF6',
                letterSpacing: '-0.02em',
                fontSize: '32px'
              }}
            />
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              📈 +105% vs ROI inicial
            </div>
          </Card>
        </div>
      </div>

      {/* Pipeline Visual das 7 Fases - HIERARQUIA H2 */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#1e293b', 
            margin: '0 0 12px 0',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '34px'
          }}>
            As 7 Fases do Método IMPULSO®
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#64748b', 
            margin: '0',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',
            lineHeight: '24px'
          }}>
            Clique em cada fase para ver detalhes completos da metodologia
          </p>
        </div>

        {/* Primeira linha - 4 fases */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {pipelineDetalhado.slice(0, 4).map((fase) => renderFaseCard(fase))}
        </div>

        {/* Segunda linha - 3 fases */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px',
          justifyContent: 'center'
        }}>
          {pipelineDetalhado.slice(4, 7).map((fase) => renderFaseCard(fase))}
        </div>
      </div>

      {/* Clínicas no Pipeline - HIERARQUIA H2 */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#1e293b', 
            margin: '0 0 12px 0',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '34px'
          }}>
            Clínicas Ativas no Pipeline
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#64748b', 
            margin: '0',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',
            lineHeight: '24px'
          }}>
            Acompanhamento detalhado do progresso de cada clínica na metodologia IMPULSO®
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {clinicasPipeline.map((clinica) => {
            const faseAtual = pipelineDetalhado.find(f => f.fase === clinica.fase_atual);
            return (
              <Card 
                key={clinica.id} 
                style={{
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  background: 'white', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute', 
                  top: '0', 
                  left: '0', 
                  width: '4px', 
                  height: '100%', 
                  background: faseAtual?.cor || '#CBD5E1'
                }} />
                
                <div style={{ padding: '28px', paddingLeft: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                        <h3 style={{ 
                          fontSize: '22px', 
                          fontWeight: '700', 
                          color: '#1e293b', 
                          margin: '0',
                          fontFamily: 'Inter, sans-serif',
                          letterSpacing: '-0.01em'
                        }}>
                          {clinica.nome}
                        </h3>
                        <Tag 
                          style={{ 
                            background: `${faseAtual?.cor}15`,
                            color: faseAtual?.cor,
                            border: `1px solid ${faseAtual?.cor}30`,
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '600',
                            fontSize: '12px',
                            padding: '4px 8px'
                          }}
                        >
                          {faseAtual?.icone} {clinica.fase_atual}
                        </Tag>
                      </div>
                      <div style={{ 
                        fontSize: '15px', 
                        color: '#64748b', 
                        marginBottom: '6px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500'
                      }}>
                        🎯 <strong>Próxima ação:</strong> {clinica.proxima_acao}
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#64748b',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '400'
                      }}>
                        👤 Responsável: {clinica.responsavel} • ⏱️ {clinica.tempo_na_fase} dias na fase
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right', minWidth: '140px' }}>
                      <div style={{ 
                        fontSize: '28px', 
                        fontWeight: '800', 
                        color: '#10B981',
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '-0.02em',
                        lineHeight: '32px'
                      }}>
                        {clinica.roi_atual}%
                      </div>
                      <div style={{ 
                        fontSize: '13px', 
                        color: '#64748b',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500'
                      }}>
                        ROI Atual
                      </div>
                    </div>
                  </div>

                  {/* Progress da Fase */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ 
                        fontSize: '13px', 
                        color: '#64748b',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '600'
                      }}>
                        Progresso da Fase {faseAtual?.titulo}
                      </span>
                      <span style={{ 
                        fontSize: '13px', 
                        color: '#1e293b',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '700'
                      }}>
                        {clinica.progresso_fase}%
                      </span>
                    </div>
                    <Progress 
                      percent={clinica.progresso_fase} 
                      strokeColor={faseAtual?.cor}
                      trailColor="#f1f5f9"
                      showInfo={false}
                    />
                  </div>

                  {/* Métricas da Clínica - HIERARQUIA H5 */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                    gap: '20px',
                    padding: '20px',
                    background: '#F8FAFC',
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: '10px', 
                        color: '#64748b', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.8px', 
                        marginBottom: '6px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '600'
                      }}>
                        Pacientes/Mês
                      </div>
                      <div style={{ 
                        fontSize: '18px', 
                        fontWeight: '700', 
                        color: '#1e293b',
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '-0.01em'
                      }}>
                        {clinica.pacientes_mes.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '10px', 
                        color: '#64748b', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.8px', 
                        marginBottom: '6px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '600'
                      }}>
                        Posição Pipeline
                      </div>
                      <div style={{ 
                        fontSize: '18px', 
                        fontWeight: '700', 
                        color: faseAtual?.cor,
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '-0.01em'
                      }}>
                        {clinica.posicao_fase}/7
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '10px', 
                        color: '#64748b', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.8px', 
                        marginBottom: '6px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '600'
                      }}>
                        Data Entrada
                      </div>
                      <div style={{ 
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: '#1e293b',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {new Date(clinica.data_entrada_fase).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <Button 
                      size="middle"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500'
                      }}
                    >
                      Ver Histórico
                    </Button>
                    <Button 
                      type="primary"
                      size="middle"
                      style={{ 
                        background: faseAtual?.cor,
                        borderColor: faseAtual?.cor,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '600'
                      }}
                    >
                      Acompanhar
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action - HIERARQUIA H3 */}
      <Card style={{ 
        borderRadius: '12px', 
        textAlign: 'center', 
        padding: '48px', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        border: '2px dashed #cbd5e1' 
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          color: '#64748b', 
          marginBottom: '12px',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.01em'
        }}>
          🎯 Quer acelerar o crescimento da sua clínica?
        </div>
        <div style={{ 
          color: '#94a3b8', 
          marginBottom: '20px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          fontWeight: '400'
        }}>
          Conheça a metodologia IMPULSO® e transforme sua clínica em até 90 dias
        </div>
        <Button 
          type="primary" 
          size="large"
          style={{ 
            background: 'linear-gradient(135deg, #FF7A00 0%, #1A202C 100%)',
            border: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            fontSize: '16px',
            height: '48px',
            padding: '0 32px'
          }}
        >
          Agendar Consultoria Gratuita
        </Button>
      </Card>
    </div>
  );
};

export default PipelineImpulsoPage;