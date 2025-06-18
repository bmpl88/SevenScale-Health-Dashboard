import { useState, useEffect, useCallback } from 'react';
import type { 
  ApiResponse, 
  UseApiOptions, 
  UseMutationOptions,
  Clinica,
  AgenteImpulso,
  ProjetoImpulso,
  DashboardData,
  InsightAgente,
  PaginationParams,
  LoadingState
} from '../types';

// Cliente API base
class ApiClient {
  private baseURL: string;

  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Métodos CRUD genéricos
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseURL}${endpoint}`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return this.request<T>(url.pathname + url.search);
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Instância global do cliente API
const apiClient = new ApiClient();

// Hook genérico para requisições GET
export function useApi<T>(
  endpoint: string,
  options: UseApiOptions<T> = {}
) {
  const [state, setState] = useState<LoadingState & { data: T | null }>({
    data: options.initialData || null,
    isLoading: false,
    error: undefined,
    lastUpdated: undefined,
  });

  const fetchData = useCallback(async () => {
    if (!options.enabled && options.enabled !== undefined) return;

    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const response = await apiClient.get<T>(endpoint);
      
      if (response.success && response.data) {
        setState({
          data: response.data,
          isLoading: false,
          error: undefined,
          lastUpdated: new Date(),
        });
        options.onSuccess?.(response.data);
      } else {
        throw new Error(response.error || 'Erro desconhecido');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro na requisição';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      options.onError?.(errorMessage);
    }
  }, [endpoint, options.enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, options.refetchInterval]);

  return {
    ...state,
    refetch: fetchData,
  };
}

// Hook para mutations (POST, PUT, DELETE)
export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options: UseMutationOptions<TData, TVariables> = {}
) {
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    error: undefined,
  });

  const mutate = useCallback(async (variables: TVariables) => {
    setState({ isLoading: true, error: undefined });

    try {
      const response = await mutationFn(variables);
      
      if (response.success && response.data) {
        setState({ isLoading: false, error: undefined });
        options.onSuccess?.(response.data, variables);
        return response.data;
      } else {
        throw new Error(response.error || 'Erro na mutação');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro na mutação';
      setState({ isLoading: false, error: errorMessage });
      options.onError?.(errorMessage, variables);
      throw error;
    } finally {
      options.onSettled?.();
    }
  }, [mutationFn, options]);

  return {
    ...state,
    mutate,
  };
}

// Hooks específicos para entidades

// Hook para Dashboard
export function useDashboard(options: UseApiOptions<DashboardData> = {}) {
  return useApi<DashboardData>('/dashboard', {
    refetchInterval: 30000, // Atualiza a cada 30 segundos
    ...options,
  });
}

// Hook para Clínicas
export function useClinicas(params?: PaginationParams & { search?: string }) {
  return useApi<Clinica[]>('/clinicas', {
    initialData: [],
    ...params && { endpoint: `/clinicas?${new URLSearchParams(params as any).toString()}` }
  });
}

export function useClinica(id: string, options: UseApiOptions<Clinica> = {}) {
  return useApi<Clinica>(`/clinicas/${id}`, {
    enabled: !!id,
    ...options,
  });
}

export function useCreateClinica() {
  return useMutation(
    (data: Partial<Clinica>) => apiClient.post<Clinica>('/clinicas', data)
  );
}

export function useUpdateClinica() {
  return useMutation(
    ({ id, ...data }: Partial<Clinica> & { id: string }) => 
      apiClient.put<Clinica>(`/clinicas/${id}`, data)
  );
}

export function useDeleteClinica() {
  return useMutation(
    (id: string) => apiClient.delete<void>(`/clinicas/${id}`)
  );
}

// Hook para Agentes
export function useAgentes(options: UseApiOptions<AgenteImpulso[]> = {}) {
  return useApi<AgenteImpulso[]>('/agentes', {
    initialData: [],
    refetchInterval: 5000, // Atualiza a cada 5 segundos
    ...options,
  });
}

export function useAgente(id: string, options: UseApiOptions<AgenteImpulso> = {}) {
  return useApi<AgenteImpulso>(`/agentes/${id}`, {
    enabled: !!id,
    ...options,
  });
}

export function useUpdateAgenteConfig() {
  return useMutation(
    ({ id, configuracao }: { id: string; configuracao: Record<string, any> }) =>
      apiClient.patch<AgenteImpulso>(`/agentes/${id}/config`, { configuracao })
  );
}

export function useToggleAgente() {
  return useMutation(
    ({ id, ativo }: { id: string; ativo: boolean }) =>
      apiClient.patch<AgenteImpulso>(`/agentes/${id}/toggle`, { ativo })
  );
}

// Hook para Projetos
export function useProjetos(params?: PaginationParams & { clinicaId?: string }) {
  return useApi<ProjetoImpulso[]>('/projetos', {
    initialData: [],
    ...params && { endpoint: `/projetos?${new URLSearchParams(params as any).toString()}` }
  });
}

export function useProjeto(id: string, options: UseApiOptions<ProjetoImpulso> = {}) {
  return useApi<ProjetoImpulso>(`/projetos/${id}`, {
    enabled: !!id,
    ...options,
  });
}

export function useCreateProjeto() {
  return useMutation(
    (data: Partial<ProjetoImpulso>) => apiClient.post<ProjetoImpulso>('/projetos', data)
  );
}

export function useUpdateProjeto() {
  return useMutation(
    ({ id, ...data }: Partial<ProjetoImpulso> & { id: string }) =>
      apiClient.put<ProjetoImpulso>(`/projetos/${id}`, data)
  );
}

export function useUpdateProjetoFase() {
  return useMutation(
    ({ id, fase, observacoes }: { id: string; fase: string; observacoes?: string }) =>
      apiClient.patch<ProjetoImpulso>(`/projetos/${id}/fase`, { fase, observacoes })
  );
}

// Hook para Insights
export function useInsights(params?: PaginationParams & { agenteId?: string }) {
  return useApi<InsightAgente[]>('/insights', {
    initialData: [],
    refetchInterval: 10000, // Atualiza a cada 10 segundos
    ...params && { endpoint: `/insights?${new URLSearchParams(params as any).toString()}` }
  });
}

export function useMarcarInsightLido() {
  return useMutation(
    (id: string) => apiClient.patch<InsightAgente>(`/insights/${id}/lido`, {})
  );
}

// Hook para Estatísticas
export function useEstatisticas(periodo?: '7d' | '30d' | '90d' | '1y') {
  return useApi(`/estatisticas${periodo ? `?periodo=${periodo}` : ''}`, {
    refetchInterval: 60000, // Atualiza a cada minuto
  });
}

// Hook para Relatórios
export function useGerarRelatorio() {
  return useMutation(
    (params: { tipo: string; filtros: Record<string, any>; formato: string }) =>
      apiClient.post('/relatorios', params)
  );
}

// Hook para configurações
export function useConfiguracoes() {
  return useApi('/configuracoes', {
    refetchInterval: 60000,
  });
}

export function useUpdateConfiguracao() {
  return useMutation(
    ({ chave, valor }: { chave: string; valor: any }) =>
      apiClient.patch(`/configuracoes/${chave}`, { valor })
  );
}

// Hooks utilitários
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback((newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setStoredValue] as const;
}

// Export da instância do cliente para uso direto quando necessário
export { apiClient };