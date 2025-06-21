import React, { useState, useEffect } from 'react';
import {
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Map,
  Wrench,
  Rocket,
  Gem,
  Cog,
  Gauge,
  Bot,
  Eye,
  Settings,
  MoreHorizontal,
  Cpu,
  Database,
  Link,
  Globe,
  Server,
  BarChart3,
  Target,
  Calendar,
  Zap,
  Filter,
  Download
} from 'lucide-react';

// Simulação de dados das 3 clínicas reais
const clinicasReais = [
  {
    id: "174ccf0c-af81-4687-a07c-1076625ddafb",
    nome: "Clínica Derma Recife",
    roi_atual: 198.75,
    receita_mensal_atual: 52400,
    taxa_conversao_atual: 15.80,
    pacientes_mes_atual: 280,
    nps_atual: 6,
    status: "ativo",
    plano: "impulso_basic",
    baseline_roi: 89.5,
    baseline_receita: 28900,
    data_inicio: "2024-08-15"
  },
  {
    id: "aa4b6ecb-cc53-45e0-9769-84b277ab307b",
    nome: "OdontoVita Salvador",
    roi_atual: 189.25,
    receita_mensal_atual: 65800,
    taxa_conversao_atual: 18.20,
    pacientes_mes_atual: 320,
    nps_atual: 7,
    status: "ativo",
    plano: "impulso_basic",
    baseline_roi: 95.2,
    baseline_receita: 34600,
    data_inicio: "2024-09-01"
  },
  {
    id: "f0335ae3-557e-4297-8ab8-e19e368ce861",
    nome: "CardioCenter Fortaleza",
    roi_atual: 287.50,
    receita_mensal_atual: 89500,
    taxa_conversao_atual: 23.50,
    pacientes_mes_atual: 456,
    nps_atual: 8,
    status: "ativo",
    plano: "impulso_basic",
    baseline_roi: 112.3,
    baseline_receita: 48200,
    data_inicio: "2024-07-20"
  }
];

// Dados de gargalos por fase IMPULSO®
const gargalosPorFase = [
  {
    fase: "INVESTIGAR",
    tempo_medio: 4.2,
    taxa_conversao: 94.5,
    projetos_travados: 2,
    eficiencia: "Alta"
  },
  {
    fase: "MAPEAR", 
    tempo_medio: 6.8,
    taxa_conversao: 89.2,
    projetos_travados: 1,
    eficiencia: "Alta"
  },
  {
    fase: "PROTOTIPAR",
    tempo_medio: 12.5,
    taxa_conversao: 76.8,
    projetos_travados: 5,
    eficiencia: "Média"
  },
  {
    fase: "IMPLEMENTAR",
    tempo_medio: 18.7,
    taxa_conversao: 68.3,
    projetos_travados: 8,
    eficiencia: "Baixa"
  },
  {
    fase: "LAPIDAR",
    tempo_medio: 8.9,
    taxa_conversao: 82.1,
    projetos_travados: 3,
    eficiencia: "Média"
  },
  {
    fase: "SISTEMATIZAR",
    tempo_medio: 14.3,
    taxa_conversao: 71.4,
    projetos_travados: 6,
    eficiencia: "Baixa"
  },
  {
    fase: "OTIMIZAR",
    tempo_medio: 5.1,
    taxa_conversao: 91.7,
    projetos_travados: 1,
    eficiencia: "Alta"
  }
];

const SevenScaleHealthDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Calcular KPIs consolidados
  const kpis = {
    total_clinicas: clinicasReais.length,
    roi_medio: clinicasReais.reduce((acc, c) => acc + c.roi_atual, 0) / clinicasReais.length,
    receita_total: clinicasReais.reduce((acc, c) => acc + c.receita_mensal_atual, 0),
    taxa_conversao_media: clinicasReais.reduce((acc, c) => acc + c.taxa_conversao_atual, 0) / clinicasReais.length
  };

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setLoading(false);
    }, 1000);
  };

  const renderStrategicInsight = () => (
    <div className="space-y-8">
      {/* Header FASE 2 */}
      <div style={{
        background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'rgba(255, 122, 0, 0.2)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Target style={{ width: '32px', height: '32px', color: '#FF7A00' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
              FASE 2: Strategic Insight
            </h1>
            <p style={{ fontSize: '18px', color: '#E2E8F0', margin: 0 }}>
              Análise estratégica de gargalos e crescimento do ROI nas 3 clínicas
            </p>
          </div>
        </div>
      </div>

      {/* Componente 1: Gargalos por Fase IMPULSO® */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1A202C', margin: '0 0 8px 0' }}>
              🔍 Gargalos por Fase IMPULSO®
            </h3>
            <p style={{ color: '#718096', margin: 0 }}>
              Identificação de bottlenecks na metodologia para otimização
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              background: '#EDF2F7',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <Filter style={{ width: '16px', height: '16px' }} />
              Filtrar
            </button>
            <button style={{
              background: '#3182CE',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <Download style={{ width: '16px', height: '16px' }} />
              Exportar
            </button>
          </div>
        </div>

        {/* Funil de Conversão */}
        <div style={{
          background: '#F7FAFC',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1A202C', marginBottom: '16px' }}>
            Funil de Conversão IMPULSO®
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {gargalosPorFase.map((fase, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                border: fase.eficiencia === 'Baixa' ? '2px solid #F56565' : 
                        fase.eficiencia === 'Média' ? '2px solid #ED8936' : '2px solid #48BB78'
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#718096',
                  marginBottom: '8px'
                }}>
                  {fase.fase}
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: fase.eficiencia === 'Baixa' ? '#E53E3E' : 
                         fase.eficiencia === 'Média' ? '#DD6B20' : '#38A169',
                  marginBottom: '4px'
                }}>
                  {fase.taxa_conversao}%
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#A0AEC0'
                }}>
                  {fase.tempo_medio} dias
                </div>
                {fase.projetos_travados > 3 && (
                  <div style={{
                    background: '#FED7D7',
                    color: '#C53030',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginTop: '4px'
                  }}>
                    ⚠️ {fase.projetos_travados} travados
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tabela de Análise Detalhada */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F7FAFC' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4A5568' }}>
                  Fase
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#4A5568' }}>
                  Tempo Médio
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#4A5568' }}>
                  Taxa Conversão
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#4A5568' }}>
                  Projetos Travados
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#4A5568' }}>
                  Eficiência
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#4A5568' }}>
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {gargalosPorFase.map((fase, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: '#1A202C' }}>
                    {fase.fase}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', color: '#4A5568' }}>
                    {fase.tempo_medio} dias
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      color: fase.taxa_conversao >= 85 ? '#38A169' : 
                             fase.taxa_conversao >= 75 ? '#DD6B20' : '#E53E3E',
                      fontWeight: '600'
                    }}>
                      {fase.taxa_conversao}%
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      background: fase.projetos_travados > 5 ? '#FED7D7' : 
                                  fase.projetos_travados > 2 ? '#FEEBC8' : '#F0FFF4',
                      color: fase.projetos_travados > 5 ? '#C53030' : 
                             fase.projetos_travados > 2 ? '#DD6B20' : '#38A169',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {fase.projetos_travados}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      background: fase.eficiencia === 'Alta' ? '#F0FFF4' : 
                                  fase.eficiencia === 'Média' ? '#FEEBC8' : '#FED7D7',
                      color: fase.eficiencia === 'Alta' ? '#38A169' : 
                             fase.eficiencia === 'Média' ? '#DD6B20' : '#E53E3E',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {fase.eficiencia}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {fase.eficiencia === 'Baixa' && (
                      <button style={{
                        background: '#E53E3E',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 12px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}>
                        Otimizar
                      </button>
                    )}
                    {fase.eficiencia === 'Média' && (
                      <button style={{
                        background: '#DD6B20',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 12px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}>
                        Monitorar
                      </button>
                    )}
                    {fase.eficiencia === 'Alta' && (
                      <span style={{ color: '#38A169', fontSize: '12px', fontWeight: '600' }}>
                        ✓ OK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Componente 2: ROI Timeline */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1A202C', margin: '0 0 8px 0' }}>
              📈 ROI Improvement Timeline
            </h3>
            <p style={{ color: '#718096', margin: 0 }}>
              Comprovação da eficácia da metodologia SevenScale nas 3 clínicas
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              background: '#EDF2F7',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <Calendar style={{ width: '16px', height: '16px' }} />
              Período
            </button>
          </div>
        </div>

        {/* Cards de Crescimento */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px', 
          marginBottom: '32px' 
        }}>
          {clinicasReais.map((clinica, index) => {
            const crescimentoROI = ((clinica.roi_atual - clinica.baseline_roi) / clinica.baseline_roi * 100);
            const crescimentoReceita = ((clinica.receita_mensal_atual - clinica.baseline_receita) / clinica.baseline_receita * 100);
            
            return (
              <div key={index} style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '28px',
                color: 'white',
                boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    margin: '0 0 6px 0',
                    lineHeight: '1.3'
                  }}>
                    {clinica.nome}
                  </h4>
                  <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>
                    Início: {new Date(clinica.data_inicio).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '6px' }}>
                      ROI Baseline
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: '700' }}>
                      {clinica.baseline_roi}%
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '6px' }}>
                      ROI Atual
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: '700' }}>
                      {clinica.roi_atual}%
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  padding: '16px', 
                  background: 'rgba(255,255,255,0.1)', 
                  borderRadius: '12px' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '10px' 
                  }}>
                    <span style={{ fontSize: '14px' }}>Crescimento ROI</span>
                    <span style={{ fontSize: '18px', fontWeight: '700' }}>
                      +{crescimentoROI.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px' }}>Crescimento Receita</span>
                    <span style={{ fontSize: '18px', fontWeight: '700' }}>
                      +{crescimentoReceita.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Visual */}
        <div style={{
          background: '#F7FAFC',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1A202C', marginBottom: '20px' }}>
            Timeline de Crescimento (Últimos 12 meses)
          </h4>
          
          {/* Simulação de gráfico de linha */}
          <div style={{ position: 'relative', height: '200px', background: 'white', borderRadius: '8px', padding: '20px' }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px' }}>
              {/* Eixo Y */}
              <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '1px', background: '#E2E8F0' }} />
              
              {/* Eixo X */}
              <div style={{ position: 'absolute', left: '0', bottom: '0', right: '0', height: '1px', background: '#E2E8F0' }} />
              
              {/* Labels Y */}
              <div style={{ position: 'absolute', left: '-40px', top: '0', fontSize: '12px', color: '#718096' }}>300%</div>
              <div style={{ position: 'absolute', left: '-40px', top: '50%', fontSize: '12px', color: '#718096' }}>200%</div>
              <div style={{ position: 'absolute', left: '-40px', bottom: '0', fontSize: '12px', color: '#718096' }}>100%</div>
              
              {/* Labels X */}
              <div style={{ position: 'absolute', bottom: '-20px', left: '10%', fontSize: '12px', color: '#718096' }}>Jul</div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '30%', fontSize: '12px', color: '#718096' }}>Set</div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '50%', fontSize: '12px', color: '#718096' }}>Nov</div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '70%', fontSize: '12px', color: '#718096' }}>Jan</div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '90%', fontSize: '12px', color: '#718096' }}>Jun</div>
              
              {/* Pontos das clínicas */}
              <div style={{ position: 'absolute', left: '20%', bottom: '35%', width: '8px', height: '8px', background: '#3182CE', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', left: '40%', bottom: '50%', width: '8px', height: '8px', background: '#38A169', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', left: '80%', bottom: '75%', width: '8px', height: '8px', background: '#E53E3E', borderRadius: '50%' }} />
            </div>
          </div>
          
          {/* Legenda */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', background: '#3182CE', borderRadius: '50%' }} />
              <span style={{ fontSize: '14px', color: '#4A5568' }}>Derma Recife</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', background: '#38A169', borderRadius: '50%' }} />
              <span style={{ fontSize: '14px', color: '#4A5568' }}>OdontoVita</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', background: '#E53E3E', borderRadius: '50%' }} />
              <span style={{ fontSize: '14px', color: '#4A5568' }}>CardioCenter</span>
            </div>
          </div>
        </div>

        {/* Comparativo vs Mercado */}
        <div style={{ 
          marginTop: '32px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          <div style={{ 
            background: '#F0FFF4', 
            borderRadius: '16px', 
            padding: '28px',
            border: '2px solid #C6F6D5',
            textAlign: 'center'
          }}>
            <h5 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1A202C', 
              marginBottom: '16px' 
            }}>
              🏆 Performance SevenScale
            </h5>
            <div style={{ 
              fontSize: '40px', 
              fontWeight: '700', 
              color: '#38A169', 
              marginBottom: '12px' 
            }}>
              225.17%
            </div>
            <p style={{ 
              fontSize: '14px', 
              color: '#4A5568', 
              margin: 0,
              fontWeight: '500'
            }}>
              ROI médio das 3 clínicas
            </p>
          </div>
          
          <div style={{ 
            background: '#FFF5F5', 
            borderRadius: '16px', 
            padding: '28px',
            border: '2px solid #FED7D7',
            textAlign: 'center'
          }}>
            <h5 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1A202C', 
              marginBottom: '16px' 
            }}>
              📊 Média do Mercado
            </h5>
            <div style={{ 
              fontSize: '40px', 
              fontWeight: '700', 
              color: '#E53E3E', 
              marginBottom: '12px' 
            }}>
              142.8%
            </div>
            <p style={{ 
              fontSize: '14px', 
              color: '#4A5568', 
              margin: 0,
              fontWeight: '500'
            }}>
              Setor saúde brasileiro
            </p>
          </div>
        </div>
      </div>

      {/* Próximas Oportunidades */}
      <div style={{
        background: 'linear-gradient(135deg, #FF7A00 0%, #FF8C42 100%)',
        borderRadius: '16px',
        padding: '24px',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
          🎯 Próximas Oportunidades de Otimização
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
              Fase IMPLEMENTAR
            </h4>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
              8 projetos travados - Oportunidade de reduzir tempo médio em 35%
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
              Fase SISTEMATIZAR
            </h4>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
              6 projetos travados - Automatização pode aumentar eficiência em 28%
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header com métricas principais */}
      <div style={{
        background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 8px 0' }}>
              🏥 SevenScale Health Dashboard
            </h1>
            <p style={{ fontSize: '18px', color: '#E2E8F0', margin: 0 }}>
              Transformação digital para clínicas médicas com IA especializada
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={refresh}
              disabled={loading}
              style={{
                background: '#FF7A00',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              <RefreshCw style={{ width: '16px', height: '16px' }} />
              {loading ? 'Atualizando...' : 'Atualizar'}
            </button>
          </div>
        </div>
        
        <div style={{ fontSize: '14px', color: '#A0AEC0' }}>
          Última atualização: {lastUpdate.toLocaleString('pt-BR')}
        </div>
      </div>

      {/* KPIs Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          minHeight: '140px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#EBF8FF',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 style={{ width: '24px', height: '24px', color: '#3182CE' }} />
            </div>
            <span style={{ 
              background: '#E6FFFA', 
              color: '#38A169', 
              padding: '6px 12px', 
              borderRadius: '8px', 
              fontSize: '12px', 
              fontWeight: '600' 
            }}>
              +0%
            </span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#1A202C', marginBottom: '8px' }}>
            {kpis.total_clinicas}
          </div>
          <div style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>
            Clínicas Ativas
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          minHeight: '140px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#F0FFF4',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp style={{ width: '24px', height: '24px', color: '#38A169' }} />
            </div>
            <span style={{ 
              background: '#F0FFF4', 
              color: '#38A169', 
              padding: '6px 12px', 
              borderRadius: '8px', 
              fontSize: '12px', 
              fontWeight: '600' 
            }}>
              +125%
            </span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#1A202C', marginBottom: '8px' }}>
            {kpis.roi_medio.toFixed(1)}%
          </div>
          <div style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>
            ROI Médio
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          minHeight: '140px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#FFF5F5',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign style={{ width: '24px', height: '24px', color: '#F56565' }} />
            </div>
            <span style={{ 
              background: '#FFF5F5', 
              color: '#F56565', 
              padding: '6px 12px', 
              borderRadius: '8px', 
              fontSize: '12px', 
              fontWeight: '600' 
            }}>
              +81%
            </span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#1A202C', marginBottom: '8px' }}>
            R$ {(kpis.receita_total / 1000).toFixed(0)}K
          </div>
          <div style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>
            Receita Total/Mês
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          minHeight: '140px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#FEEBC8',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users style={{ width: '24px', height: '24px', color: '#ED8936' }} />
            </div>
            <span style={{ 
              background: '#FEEBC8', 
              color: '#DD6B20', 
              padding: '6px 12px', 
              borderRadius: '8px', 
              fontSize: '12px', 
              fontWeight: '600' 
            }}>
              +27%
            </span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#1A202C', marginBottom: '8px' }}>
            {kpis.taxa_conversao_media.toFixed(1)}%
          </div>
          <div style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>
            Taxa Conversão
          </div>
        </div>
      </div>

      {/* Clínicas Grid */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1A202C', marginBottom: '20px' }}>
          Portfolio de Clínicas
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {clinicasReais.map((clinica, index) => (
            <div key={index} style={{
              background: '#FAFAFA',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '20px' 
              }}>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#1A202C', 
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {clinica.nome}
                </h4>
                <span style={{
                  background: clinica.status === 'ativo' ? '#F0FFF4' : '#FFF5F5',
                  color: clinica.status === 'ativo' ? '#38A169' : '#F56565',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {clinica.status}
                </span>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '12px',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>ROI</span>
                  <span style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: '#38A169',
                    padding: '4px 8px',
                    background: '#F0FFF4',
                    borderRadius: '6px'
                  }}>
                    {clinica.roi_atual}%
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '12px',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>Receita</span>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1A202C' }}>
                    R$ {(clinica.receita_mensal_atual / 1000).toFixed(0)}K
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>Conversão</span>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#1A202C' }}>
                    {clinica.taxa_conversao_atual}%
                  </span>
                </div>
              </div>
              
              <button style={{
                width: '100%',
                background: '#3182CE',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}>
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', component: renderDashboard },
    { id: 'strategic', label: '🎯 Strategic Insight', component: renderStrategicInsight },
    { id: 'clientes', label: '👥 Clientes', component: () => <div>Em desenvolvimento...</div> },
    { id: 'pipeline', label: '⚡ Pipeline', component: () => <div>Em desenvolvimento...</div> },
    { id: 'agentes', label: '🤖 Agentes Core', component: () => <div>Em desenvolvimento...</div> },
    { id: 'relatorios', label: '📈 Relatórios', component: () => <div>Em desenvolvimento...</div> }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F7FAFC' }}>
      {/* Navigation */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#1A202C' }}>
              SevenScale Health
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeTab === tab.id ? '#3182CE' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#4A5568',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main style={{ padding: '24px' }}>
        {tabs.find(tab => tab.id === activeTab)?.component()}
      </main>
    </div>
  );
};

export default SevenScaleHealthDashboard;