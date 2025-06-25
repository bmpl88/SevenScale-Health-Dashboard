// SevenScale MVP - Dashboard Cliente Individual
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Activity, 
  TrendingUp, 
  Users, 
  DollarSign,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Zap,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { mvpApi } from '../services/mvpApi';
import { useMVP } from '../context/MVPContext';

interface ClientDashboardData {
  client: any;
  insights: {
    latest: any;
    total: number;
  };
  integrations: {
    active: number;
    total: number;
    percentage: number;
    list: any[];
  };
  status: {
    overall: string;
    performance: number;
    health: string;
  };
}

const DashboardCliente = () => {
  const { id } = useParams<{ id: string }>();
  const { clients } = useMVP();
  const [dashboardData, setDashboardData] = useState<ClientDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingInsights, setProcessingInsights] = useState(false);

  const client = clients.find(c => c.id === id);

  useEffect(() => {
    if (id) {
      loadDashboardData();
    }
  }, [id]);

  const loadDashboardData = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await mvpApi.getClientDashboard(id);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessInsights = async () => {
    if (!id) return;
    
    setProcessingInsights(true);
    try {
      await mvpApi.processClientInsights(id);
      await loadDashboardData(); // Recarregar dados
      alert('Insights processados com sucesso!');
    } catch (error) {
      alert('Erro ao processar insights');
    } finally {
      setProcessingInsights(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100';
      case 'attention': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'good': return 'text-green-600';
      case 'attention': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-600">Carregando dashboard...</span>
      </div>
    );
  }

  if (!client || !dashboardData) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Cliente não encontrado</h3>
        <p className="text-gray-600 mb-6">Este cliente não existe ou não está disponível no MVP.</p>
        <Link to="/clientes" className="btn-primary">
          Voltar para Clientes
        </Link>
      </div>
    );
  }

  const { insights, integrations, status } = dashboardData;
  const latestInsight = insights.latest;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/clientes" className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.nome_clinica}</h1>
            <p className="text-gray-600">{client.especialidade} • {client.cidade}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status.overall)}`}>
            {status.overall === 'operational' ? 'Operacional' : 
             status.overall === 'attention' ? 'Atenção' : 'Crítico'}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={loadDashboardData}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Atualizar</span>
          </button>
          
          <button
            onClick={handleProcessInsights}
            disabled={processingInsights}
            className="btn-primary flex items-center space-x-2"
          >
            {processingInsights ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <Activity className="w-4 h-4" />
                <span>Processar Insights</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Performance</p>
              <p className="text-2xl font-bold text-gray-900">{status.performance}/100</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{client.revenue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pacientes</p>
              <p className="text-2xl font-bold text-gray-900">{client.patients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Integrações</p>
              <p className="text-2xl font-bold text-gray-900">
                {integrations.active}/{integrations.total}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Insights */}
      {latestInsight && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Últimos Insights</h2>
            <span className="text-sm text-gray-600">
              {new Date(latestInsight.processed_at).toLocaleString()}
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Insights */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">📊 Insights Identificados</h3>
              <ul className="space-y-2">
                {latestInsight.insights_data?.insights?.map((insight: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{insight}</span>
                  </li>
                )) || []}
              </ul>
            </div>
            
            {/* Action Items */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">🎯 Ações Recomendadas</h3>
              <ul className="space-y-2">
                {latestInsight.insights_data?.action_items?.map((action: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                )) || []}
              </ul>
            </div>
          </div>
          
          {/* ROI Analysis */}
          {latestInsight.insights_data?.roi_analysis && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">💰 Análise ROI</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Investimento Total</p>
                    <p className="font-semibold">{latestInsight.insights_data.roi_analysis.total_investment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Receita Total</p>
                    <p className="font-semibold">{latestInsight.insights_data.roi_analysis.total_revenue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ROI</p>
                    <p className="font-semibold text-green-600">{latestInsight.insights_data.roi_analysis.roi_percent}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Integrations Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Status das Integrações</h2>
          <Link 
            to="/integracoes" 
            className="text-orange-500 hover:text-orange-600 text-sm font-medium"
          >
            Gerenciar →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.list.map((integration) => (
            <div key={integration.integration_type} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 capitalize">
                  {integration.integration_type.replace('_', ' ')}
                </h3>
                <div className={`w-3 h-3 rounded-full ${
                  integration.status === 'connected' ? 'bg-green-400' :
                  integration.status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                }`}></div>
              </div>
              <p className="text-sm text-gray-600 capitalize">
                {integration.status === 'connected' ? 'Conectado' :
                 integration.status === 'error' ? 'Erro' : 'Desconectado'}
              </p>
              {integration.last_sync && (
                <p className="text-xs text-gray-500 mt-1">
                  Sync: {new Date(integration.last_sync).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCliente;