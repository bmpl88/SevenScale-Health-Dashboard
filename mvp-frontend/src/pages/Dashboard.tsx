// SevenScale MVP - Dashboard Principal
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Users, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useMVP } from '../context/MVPContext';
import { mvpApi } from '../services/mvpApi';

const Dashboard = () => {
  const { clients, loading, agentStatus, refreshAgentStatus } = useMVP();
  const [processingInsights, setProcessingInsights] = useState(false);

  // Calcular métricas MVP
  const totalClients = clients.length;
  const operationalClients = clients.filter(c => c.status === 'operational').length;
  const attentionClients = clients.filter(c => c.status === 'attention').length;
  const averagePerformance = clients.length > 0 
    ? Math.round(clients.reduce((sum, c) => sum + c.performance, 0) / clients.length)
    : 0;

  const handleProcessAllInsights = async () => {
    setProcessingInsights(true);
    try {
      await mvpApi.processAllClients();
      await refreshAgentStatus();
      alert('Insights processados com sucesso!');
    } catch (error) {
      alert('Erro ao processar insights');
    } finally {
      setProcessingInsights(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-600">Carregando MVP...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header MVP */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard MVP</h1>
            <p className="text-gray-600">SevenScale Health Dashboard - Versão Isolada</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleProcessAllInsights}
              disabled={processingInsights}
              className={`px-4 py-2 rounded-lg font-medium ${
                processingInsights
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {processingInsights ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Processando...
                </div>
              ) : (
                'Processar Insights'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* KPIs MVP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clientes MVP</p>
              <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Operacionais</p>
              <p className="text-2xl font-bold text-gray-900">{operationalClients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Atenção</p>
              <p className="text-2xl font-bold text-gray-900">{attentionClients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Performance Média</p>
              <p className="text-2xl font-bold text-gray-900">{averagePerformance}/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status do Agente */}
      {agentStatus && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-orange-500" />
            Status do Agente Consolidador
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                agentStatus.gpt4_connection === 'connected' ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              <span className="text-sm">GPT-4: {agentStatus.gpt4_connection}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                agentStatus.database_connection === 'connected' ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              <span className="text-sm">Database: {agentStatus.database_connection}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm">Última verificação: {new Date(agentStatus.last_check).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Clientes MVP */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Clientes Ativos</h2>
            <Link
              to="/clientes"
              className="text-orange-500 hover:text-orange-600 font-medium text-sm"
            >
              Ver todos →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {clients.map((client) => (
            <div key={client.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    client.status === 'operational' ? 'bg-green-400' :
                    client.status === 'attention' ? 'bg-orange-400' : 'bg-red-400'
                  }`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{client.nome_clinica}</h3>
                    <p className="text-sm text-gray-600">{client.especialidade} • {client.cidade}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{client.revenue}</p>
                    <p className="text-xs text-gray-600">{client.patients} pacientes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{client.performance}/100</p>
                    <p className="text-xs text-gray-600">Performance</p>
                  </div>
                  <Link
                    to={`/cliente/${client.id}`}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    Ver Dashboard →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;