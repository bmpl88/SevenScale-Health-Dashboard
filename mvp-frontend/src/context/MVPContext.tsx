// SevenScale MVP - Context Isolado
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mvpApi } from '../services/mvpApi';

interface Client {
  id: string;
  nome_clinica: string;
  especialidade: string;
  cidade: string;
  email_contato: string;
  status: 'operational' | 'attention' | 'critical';
  performance: number;
  revenue: string;
  patients: number;
}

interface MVPContextType {
  clients: Client[];
  loading: boolean;
  error: string | null;
  agentStatus: any;
  refreshClients: () => Promise<void>;
  refreshAgentStatus: () => Promise<void>;
}

const MVPContext = createContext<MVPContextType | undefined>(undefined);

export const MVPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agentStatus, setAgentStatus] = useState(null);

  const refreshClients = async () => {
    try {
      setLoading(true);
      const response = await mvpApi.getClients();
      setClients(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar clientes');
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshAgentStatus = async () => {
    try {
      const response = await mvpApi.getAgentStatus();
      setAgentStatus(response.data);
    } catch (err) {
      console.error('Error fetching agent status:', err);
    }
  };

  useEffect(() => {
    refreshClients();
    refreshAgentStatus();
  }, []);

  const value: MVPContextType = {
    clients,
    loading,
    error,
    agentStatus,
    refreshClients,
    refreshAgentStatus
  };

  return (
    <MVPContext.Provider value={value}>
      {children}
    </MVPContext.Provider>
  );
};

export const useMVP = () => {
  const context = useContext(MVPContext);
  if (context === undefined) {
    throw new Error('useMVP must be used within a MVPProvider');
  }
  return context;
};