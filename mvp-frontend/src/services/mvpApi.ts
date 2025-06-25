// SevenScale MVP - API Service Isolado
import axios from 'axios';

// Base URL MVP específica (porta diferente do projeto maior)
const BASE_URL = import.meta.env.VITE_MVP_API_URL || 'http://localhost:8001/api/mvp';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logs MVP
api.interceptors.request.use(
  (config) => {
    console.log(`MVP API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('MVP API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`MVP API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('MVP API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Methods MVP
export const mvpApi = {
  // Health check MVP
  async healthCheck() {
    const response = await api.get('/health');
    return response.data;
  },

  // Clientes MVP
  async getClients() {
    const response = await api.get('/clients');
    return response.data;
  },

  async getClient(id: string) {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  async createClient(clientData: any) {
    const response = await api.post('/clients', clientData);
    return response.data;
  },

  async getClientDashboard(id: string) {
    const response = await api.get(`/clients/${id}/dashboard`);
    return response.data;
  },

  // Agente MVP
  async getAgentStatus() {
    const response = await api.get('/agent/status');
    return response.data;
  },

  async processClientInsights(clientId: string) {
    const response = await api.post(`/agent/process/${clientId}`);
    return response.data;
  },

  async processAllClients() {
    const response = await api.post('/agent/process-all');
    return response.data;
  },

  // Integrações MVP
  async getIntegrations(clientId: string) {
    const response = await api.get(`/integrations/${clientId}`);
    return response.data;
  },

  async syncIntegration(clientId: string, integrationType: string) {
    const response = await api.post(`/integrations/${clientId}/sync`, {
      integration_type: integrationType
    });
    return response.data;
  },

  // Insights MVP
  async getInsights(clientId: string) {
    const response = await api.get(`/insights/${clientId}`);
    return response.data;
  }
};

export default mvpApi;