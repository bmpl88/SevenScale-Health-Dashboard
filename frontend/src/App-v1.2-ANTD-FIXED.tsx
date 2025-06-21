import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space, Grid } from 'antd';
import {
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  RefreshCw,
  Target,
  Filter,
  Download,
  Calendar
} from 'lucide-react';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

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
  const screens = useBreakpoint();

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
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header FASE 2 */}
      <Card 
        className="text-white border-0"
        style={{
          background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255, 122, 0, 0.2)' }}
            >
              <Target className="w-8 h-8" style={{ color: '#FF7A00' }} />
            </div>
            <div>
              <Title level={1} className="!text-white !mb-2">
                FASE 2: Strategic Insight
              </Title>
              <Text className="text-gray-300 text-lg">
                Análise estratégica de gargalos e crescimento do ROI nas 3 clínicas
              </Text>
            </div>
          </div>
        </Space>
      </Card>

      {/* Componente 1: Gargalos por Fase IMPULSO® */}
      <Card title="🔍 Gargalos por Fase IMPULSO®" className="shadow-sm">
        <Text type="secondary" className="block mb-6">
          Identificação de bottlenecks na metodologia para otimização
        </Text>
        
        <div className="flex justify-end gap-2 mb-6">
          <Button icon={<Filter className="w-4 h-4" />}>
            Filtrar
          </Button>
          <Button type="primary" icon={<Download className="w-4 h-4" />}>
            Exportar
          </Button>
        </div>

        {/* Funil de Conversão */}
        <Card title="Funil de Conversão IMPULSO®" className="bg-gray-50 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-2">
            {gargalosPorFase.map((fase, index) => (
              <Card
                key={index}
                size="small"
                className={`text-center border-2 ${
                  fase.eficiencia === 'Baixa' ? 'border-red-400' : 
                  fase.eficiencia === 'Média' ? 'border-orange-400' : 'border-green-400'
                }`}
              >
                <Text strong className="text-xs text-gray-600 block mb-2">
                  {fase.fase}
                </Text>
                <Title 
                  level={3} 
                  className={`!mb-1 ${
                    fase.eficiencia === 'Baixa' ? '!text-red-600' : 
                    fase.eficiencia === 'Média' ? '!text-orange-600' : '!text-green-600'
                  }`}
                >
                  {fase.taxa_conversao}%
                </Title>
                <Text type="secondary" className="text-xs">
                  {fase.tempo_medio} dias
                </Text>
                {fase.projetos_travados > 3 && (
                  <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded mt-1">
                    ⚠️ {fase.projetos_travados} travados
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>

        {/* Tabela de Análise Detalhada */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Fase</th>
                <th className="p-3 text-center text-sm font-semibold text-gray-700">Tempo Médio</th>
                <th className="p-3 text-center text-sm font-semibold text-gray-700">Taxa Conversão</th>
                <th className="p-3 text-center text-sm font-semibold text-gray-700">Projetos Travados</th>
                <th className="p-3 text-center text-sm font-semibold text-gray-700">Eficiência</th>
                <th className="p-3 text-center text-sm font-semibold text-gray-700">Ação</th>
              </tr>
            </thead>
            <tbody>
              {gargalosPorFase.map((fase, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3 font-semibold text-gray-900">{fase.fase}</td>
                  <td className="p-3 text-center text-gray-600">{fase.tempo_medio} dias</td>
                  <td className="p-3 text-center">
                    <span className={`font-semibold ${
                      fase.taxa_conversao >= 85 ? 'text-green-600' : 
                      fase.taxa_conversao >= 75 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {fase.taxa_conversao}%
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      fase.projetos_travados > 5 ? 'bg-red-100 text-red-700' : 
                      fase.projetos_travados > 2 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {fase.projetos_travados}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      fase.eficiencia === 'Alta' ? 'bg-green-100 text-green-700' : 
                      fase.eficiencia === 'Média' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {fase.eficiencia}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {fase.eficiencia === 'Baixa' && (
                      <Button size="small" danger>
                        Otimizar
                      </Button>
                    )}
                    {fase.eficiencia === 'Média' && (
                      <Button size="small" type="default">
                        Monitorar
                      </Button>
                    )}
                    {fase.eficiencia === 'Alta' && (
                      <Text className="text-green-600 text-xs font-semibold">
                        ✓ OK
                      </Text>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Componente 2: ROI Timeline */}
      <Card title="📈 ROI Improvement Timeline" className="shadow-sm">
        <Text type="secondary" className="block mb-6">
          Comprovação da eficácia da metodologia SevenScale nas 3 clínicas
        </Text>
        
        <div className="flex justify-end mb-6">
          <Button icon={<Calendar className="w-4 h-4" />}>
            Período
          </Button>
        </div>

        {/* Cards de Crescimento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {clinicasReais.map((clinica, index) => {
            const crescimentoROI = ((clinica.roi_atual - clinica.baseline_roi) / clinica.baseline_roi * 100);
            const crescimentoReceita = ((clinica.receita_mensal_atual - clinica.baseline_receita) / clinica.baseline_receita * 100);
            
            return (
              <Card
                key={index}
                className="text-white border-0"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
                }}
                bodyStyle={{ padding: '28px' }}
              >
                <Space direction="vertical" size="large" className="w-full">
                  <div>
                    <Title level={4} className="!text-white !mb-1 !text-xl">
                      {clinica.nome}
                    </Title>
                    <Text className="text-white opacity-80 text-xs">
                      Início: {new Date(clinica.data_inicio).toLocaleDateString('pt-BR')}
                    </Text>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Text className="text-white opacity-80 text-xs block mb-1">
                        ROI Baseline
                      </Text>
                      <Title level={3} className="!text-white !mb-0">
                        {clinica.baseline_roi}%
                      </Title>
                    </div>
                    <div>
                      <Text className="text-white opacity-80 text-xs block mb-1">
                        ROI Atual
                      </Text>
                      <Title level={3} className="!text-white !mb-0">
                        {clinica.roi_atual}%
                      </Title>
                    </div>
                  </div>
                  
                  <Card className="bg-white bg-opacity-10 border-0">
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-white text-sm">Crescimento ROI</Text>
                      <Text className="text-white font-bold text-lg">
                        +{crescimentoROI.toFixed(1)}%
                      </Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text className="text-white text-sm">Crescimento Receita</Text>
                      <Text className="text-white font-bold text-lg">
                        +{crescimentoReceita.toFixed(1)}%
                      </Text>
                    </div>
                  </Card>
                </Space>
              </Card>
            );
          })}
        </div>

        {/* Comparativo vs Mercado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="text-center border-2 border-green-200"
            style={{ background: '#F0FFF4' }}
            bodyStyle={{ padding: '28px' }}
          >
            <Title level={4} className="!mb-4">
              🏆 Performance SevenScale
            </Title>
            <Title level={1} className="!text-green-600 !mb-3">
              225.17%
            </Title>
            <Text className="text-gray-600 font-medium">
              ROI médio das 3 clínicas
            </Text>
          </Card>
          
          <Card 
            className="text-center border-2 border-red-200"
            style={{ background: '#FFF5F5' }}
            bodyStyle={{ padding: '28px' }}
          >
            <Title level={4} className="!mb-4">
              📊 Média do Mercado
            </Title>
            <Title level={1} className="!text-red-600 !mb-3">
              142.8%
            </Title>
            <Text className="text-gray-600 font-medium">
              Setor saúde brasileiro
            </Text>
          </Card>
        </div>
      </Card>

      {/* Próximas Oportunidades */}
      <Card 
        className="text-white border-0"
        style={{
          background: 'linear-gradient(135deg, #FF7A00 0%, #FF8C42 100%)',
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Title level={3} className="!text-white !mb-4">
          🎯 Próximas Oportunidades de Otimização
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Title level={4} className="!text-white !mb-2">
              Fase IMPLEMENTAR
            </Title>
            <Text className="text-white opacity-90">
              8 projetos travados - Oportunidade de reduzir tempo médio em 35%
            </Text>
          </div>
          <div>
            <Title level={4} className="!text-white !mb-2">
              Fase SISTEMATIZAR
            </Title>
            <Text className="text-white opacity-90">
              6 projetos travados - Automatização pode aumentar eficiência em 28%
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderDashboard = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Space direction="vertical" size="large" className="w-full">
        {/* Header com métricas principais */}
        <Card 
          className="text-white border-0"
          style={{
            background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
          }}
          bodyStyle={{ padding: '32px' }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <Title level={1} className="!text-white !mb-2">
                🏥 SevenScale Health Dashboard
              </Title>
              <Text className="text-gray-300 text-lg">
                Transformação digital para clínicas médicas com IA especializada
              </Text>
            </div>
            <Button
              size="large"
              loading={loading}
              onClick={refresh}
              style={{
                background: '#FF7A00',
                borderColor: '#FF7A00',
                color: 'white'
              }}
              icon={<RefreshCw className="w-4 h-4" />}
            >
              {loading ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </div>
          <Text type="secondary" className="text-gray-400 text-sm mt-4 block">
            Última atualização: {lastUpdate.toLocaleString('pt-BR')}
          </Text>
        </Card>

        {/* KPIs Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hoverable className="transition-all duration-200 hover:shadow-lg">
            <Space direction="vertical" className="w-full">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-semibold">
                  +0%
                </span>
              </div>
              <Title level={1} className="!mb-1">
                {kpis.total_clinicas}
              </Title>
              <Text type="secondary" className="font-medium">
                Clínicas Ativas
              </Text>
            </Space>
          </Card>

          <Card hoverable className="transition-all duration-200 hover:shadow-lg">
            <Space direction="vertical" className="w-full">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-semibold">
                  +125%
                </span>
              </div>
              <Title level={1} className="!mb-1">
                {kpis.roi_medio.toFixed(1)}%
              </Title>
              <Text type="secondary" className="font-medium">
                ROI Médio
              </Text>
            </Space>
          </Card>

          <Card hoverable className="transition-all duration-200 hover:shadow-lg">
            <Space direction="vertical" className="w-full">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-semibold">
                  +81%
                </span>
              </div>
              <Title level={1} className="!mb-1">
                R$ {(kpis.receita_total / 1000).toFixed(0)}K
              </Title>
              <Text type="secondary" className="font-medium">
                Receita Total/Mês
              </Text>
            </Space>
          </Card>

          <Card hoverable className="transition-all duration-200 hover:shadow-lg">
            <Space direction="vertical" className="w-full">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-xs font-semibold">
                  +27%
                </span>
              </div>
              <Title level={1} className="!mb-1">
                {kpis.taxa_conversao_media.toFixed(1)}%
              </Title>
              <Text type="secondary" className="font-medium">
                Taxa Conversão
              </Text>
            </Space>
          </Card>
        </div>

        {/* Clínicas Grid */}
        <Card title="Portfolio de Clínicas" className="shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicasReais.map((clinica, index) => (
              <Card
                key={index}
                hoverable
                className="bg-gray-50 transition-all duration-200 hover:shadow-md"
                bodyStyle={{ padding: '24px' }}
              >
                <Space direction="vertical" size="middle" className="w-full">
                  <div className="flex justify-between items-start">
                    <Title level={4} className="!mb-0 !text-lg">
                      {clinica.nome}
                    </Title>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      clinica.status === 'ativo' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {clinica.status}
                    </span>
                  </div>
                  
                  <Space direction="vertical" size="small" className="w-full">
                    <div className="flex justify-between items-center">
                      <Text type="secondary" className="font-medium">ROI</Text>
                      <span className="bg-green-50 text-green-600 px-2 py-1 rounded font-bold text-lg">
                        {clinica.roi_atual}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text type="secondary" className="font-medium">Receita</Text>
                      <Text strong className="text-lg">
                        R$ {(clinica.receita_mensal_atual / 1000).toFixed(0)}K
                      </Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text type="secondary" className="font-medium">Conversão</Text>
                      <Text strong className="text-lg">
                        {clinica.taxa_conversao_atual}%
                      </Text>
                    </div>
                  </Space>
                  
                  <Button type="primary" block size="large">
                    Ver Detalhes
                  </Button>
                </Space>
              </Card>
            ))}
          </div>
        </Card>
      </Space>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', component: renderDashboard },
    { id: 'strategic', label: '🎯 Strategic Insight', component: renderStrategicInsight },
    { id: 'clientes', label: '👥 Clientes', component: () => <div className="p-6">Em desenvolvimento...</div> },
    { id: 'pipeline', label: '⚡ Pipeline', component: () => <div className="p-6">Em desenvolvimento...</div> },
    { id: 'agentes', label: '🤖 Agentes Core', component: () => <div className="p-6">Em desenvolvimento...</div> },
    { id: 'relatorios', label: '📈 Relatórios', component: () => <div className="p-6">Em desenvolvimento...</div> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-8">
            <Title level={3} className="!mb-0 !text-gray-900">
              SevenScale Health
            </Title>
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  type={activeTab === tab.id ? 'primary' : 'text'}
                  onClick={() => setActiveTab(tab.id)}
                  className="font-medium"
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>
        {tabs.find(tab => tab.id === activeTab)?.component()}
      </main>
    </div>
  );
};

export default SevenScaleHealthDashboard;