// SevenScale MVP - Página Integrações
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Settings,
  Play
} from 'lucide-react';
import { useMVP } from '../context/MVPContext';
import { mvpApi } from '../services/mvpApi';

interface Integration {
  type: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  priority: 'high' | 'medium' | 'low';
}

const integracoesMVP: Integration[] = [
  {
    type: 'hubspot',
    name: 'HubSpot CRM',
    description: 'Pipeline vendas + automação marketing',
    icon: '🎯',
    status: 'disconnected',
    priority: 'high'
  },
  {
    type: 'google_analytics',
    name: 'Google Analytics',
    description: 'Tráfego website + conversões',
    icon: '📊',
    status: 'disconnected',
    priority: 'high'
  },
  {
    type: 'meta_ads',
    name: 'Meta Ads',
    description: 'Performance Facebook/Instagram ads',
    icon: '📱',
    status: 'disconnected',
    priority: 'high'
  },
  {
    type: 'google_calendar',
    name: 'Google Calendar',
    description: 'Agendamentos + disponibilidade',
    icon: '📅',
    status: 'disconnected',
    priority: 'medium'
  },
  {
    type: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Comunicação pacientes + engagement',
    icon: '💬',
    status: 'disconnected',
    priority: 'medium'
  },
  {
    type: 'rd_station',
    name: 'RD Station',
    description: 'CRM brasileiro + lead nurturing',
    icon: '🚀',
    status: 'disconnected',
    priority: 'low'
  }
];

const Integracoes = () => {
  const { clients } = useMVP();
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [integrations, setIntegrations] = useState<Integration[]>(integracoesMVP);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    if (clients.length > 0 && !selectedClient) {
      setSelectedClient(clients[0].id);
    }
  }, [clients, selectedClient]);

  useEffect(() => {
    if (selectedClient) {
      loadIntegrations();
    }
  }, [selectedClient]);

  const loadIntegrations = async () => {
    if (!selectedClient) return;
    
    setLoading(true);
    try {
      // Simular carregamento das integrações
      // Em produção, buscar do backend: mvpApi.getIntegrations(selectedClient)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular algumas integrações conectadas
      const updatedIntegrations = integracoesMVP.map(integration => {
        const random = Math.random();
        if (random > 0.7) {
          return {
            ...integration,
            status: 'connected' as const,
            lastSync: new Date().toISOString()
          };
        } else if (random > 0.8) {
          return {
            ...integration,
            status: 'error' as const
          };
        }
        return integration;
      });
      
      setIntegrations(updatedIntegrations);
    } catch (error) {
      console.error('Erro ao carregar integrações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (integrationType: string) => {
    if (!selectedClient) return;
    
    setSyncing(integrationType);
    try {
      // Simular sincronização
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Atualizar status
      setIntegrations(prev => 
        prev.map(int => 
          int.type === integrationType 
            ? { ...int, status: 'connected', lastSync: new Date().toISOString() }
            : int
        )
      );
    } catch (error) {
      console.error('Erro na sincronização:', error);
    } finally {
      setSyncing(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Conectado';
      case 'error': return 'Erro';
      default: return 'Desconectado';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-orange-500';
      default: return 'border-l-blue-500';
    }
  };

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const errorCount = integrations.filter(i => i.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrações MVP</h1>
          <p className="text-gray-600">Gerencie as 6 integrações core do MVP</p>
        </div>
        <button
          onClick={loadIntegrations}
          disabled={loading}
          className="btn-secondary flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Client Selector */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Selecionar Cliente</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {connectedCount} de {integrations.length} conectadas
            </span>
            {errorCount > 0 && (
              <span className="text-sm text-red-600">
                {errorCount} com erro
              </span>
            )}
          </div>
        </div>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="input w-full max-w-md"
        >
          <option value="">Selecione um cliente...</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.nome_clinica} - {client.especialidade}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conectadas</p>
              <p className="text-2xl font-bold text-gray-900">{connectedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Com Erro</p>
              <p className="text-2xl font-bold text-gray-900">{errorCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cobertura</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((connectedCount / integrations.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations List */}
      {selectedClient ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Integrações Disponíveis</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {integrations.map((integration) => (
              <div key={integration.type} className={`p-6 border-l-4 ${getPriorityColor(integration.priority)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{integration.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                      {integration.lastSync && (
                        <p className="text-xs text-gray-500 mt-1">
                          Última sync: {new Date(integration.lastSync).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(integration.status)}`}>
                      {getStatusIcon(integration.status)}
                      <span>{getStatusText(integration.status)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSync(integration.type)}
                        disabled={syncing === integration.type}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        {syncing === integration.type ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Sincronizando...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Conectar</span>
                          </>
                        )}
                      </button>
                      
                      <button className="btn-secondary">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Selecione um Cliente
          </h3>
          <p className="text-gray-600">
            Escolha um cliente para visualizar e gerenciar suas integrações
          </p>
        </div>
      )}
    </div>
  );
};

export default Integracoes;