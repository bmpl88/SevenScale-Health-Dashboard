// Tipos para API Responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// Tipos para Filtros
export interface FiltroClinicas {
  status?: 'ativo' | 'inativo' | 'suspenso';
  especialidade?: string;
  crescimentoMin?: number;
  crescimentoMax?: number;
  pacientesMin?: number;
  pacientesMax?: number;
}

export interface FiltroProjetos {
  clinicaId?: string;
  faseAtual?: TipoAgente;
  status?: StatusFase;
  prioridade?: PrioridadeProjeto;
  responsavel?: string;
  dataInicioMin?: Date;
  dataInicioMax?: Date;
}

export interface FiltroInsights {
  agenteId?: string;
  impacto?: 'baixo' | 'medio' | 'alto' | 'critico';
  categoria?: 'oportunidade' | 'problema' | 'melhoria' | 'alerta';
  visualizado?: boolean;
  dataMin?: Date;
  dataMax?: Date;
}

// Tipos para Formulários
export interface FormClinica {
  nome: string;
  especialidade: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  cnpj?: string;
  responsavel?: string;
}

export interface FormProjeto {
  nome: string;
  clinicaId: string;
  faseAtual: TipoAgente;
  prioridade: PrioridadeProjeto;
  responsavel: string;
  roiProjetado: string;
  dataPrevisaoTermino: Date;
  proximoMarco: string;
  observacoes?: string;
}

export interface FormAgente {
  tipo: TipoAgente;
  configuracao: Record<string, any>;
  status?: 'ativo' | 'inativo';
}

// Tipos para Dashboard
export interface DashboardData {
  metricas: MetricasGerais;
  performanceClinicas: PerformanceClinica[];
  roiMensal: number[];
  statusAutomacoes: {
    nome: string;
    valor: number;
    cor: string;
  }[];
  integracoes: Integracao[];
  agentesStatus: AgenteImpulso[];
  atividadesRecentes: AtividadeRecente[];
  insightsRecentes: InsightAgente[];
}

// Tipos para Configurações
export interface ConfiguracaoSistema {
  id: string;
  chave: string;
  valor: any;
  tipo: 'string' | 'number' | 'boolean' | 'object' | 'array';
  descricao: string;
  categoria: 'geral' | 'agentes' | 'integracoes' | 'notificacoes';
  editavel: boolean;
  updatedAt: Date;
  updatedBy: string;
}

// Tipos para Notificações
export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'sucesso' | 'aviso' | 'erro';
  prioridade: 'baixa' | 'media' | 'alta';
  usuarioId: string;
  lida: boolean;
  acao?: {
    label: string;
    url: string;
  };
  createdAt: Date;
  expiresAt?: Date;
}

// Tipos para Webhooks
export interface WebhookEvent {
  id: string;
  evento: string;
  dados: Record<string, any>;
  origem: string;
  processado: boolean;
  tentativas: number;
  proximaTentativa?: Date;
  createdAt: Date;
  processedAt?: Date;
  erro?: string;
}

// Tipos para Logs
export interface LogSistema {
  id: string;
  nivel: 'debug' | 'info' | 'warn' | 'error';
  modulo: string;
  acao: string;
  usuarioId?: string;
  ip?: string;
  userAgent?: string;
  dados?: Record<string, any>;
  duracao?: number;
  timestamp: Date;
}

// Tipos para Backup e Auditoria
export interface LogAuditoria {
  id: string;
  entidade: string;
  entidadeId: string;
  acao: 'create' | 'update' | 'delete';
  dadosAnteriores?: Record<string, any>;
  dadosNovos?: Record<string, any>;
  usuarioId: string;
  ip: string;
  timestamp: Date;
}

// Tipos para Relatórios
export interface RelatorioBase {
  id: string;
  nome: string;
  tipo: 'clinicas' | 'projetos' | 'agentes' | 'financeiro' | 'performance';
  parametros: Record<string, any>;
  formato: 'pdf' | 'excel' | 'csv' | 'json';
  status: 'gerando' | 'pronto' | 'erro';
  arquivo?: string;
  usuarioId: string;
  createdAt: Date;
  completedAt?: Date;
}

// Tipos Utilitários
export type OrderBy<T> = {
  [K in keyof T]?: 'asc' | 'desc';
};

export type WhereClause<T> = {
  [K in keyof T]?: T[K] | T[K][] | {
    eq?: T[K];
    ne?: T[K];
    gt?: T[K];
    gte?: T[K];
    lt?: T[K];
    lte?: T[K];
    in?: T[K][];
    nin?: T[K][];
    like?: string;
    ilike?: string;
  };
};

export type SelectFields<T> = {
  [K in keyof T]?: boolean;
};

// Tipos para Estados da UI
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  lastUpdated?: Date;
}

export interface TableState<T> {
  data: T[];
  loading: LoadingState;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sorting: {
    field?: keyof T;
    direction?: 'asc' | 'desc';
  };
  filters: Record<string, any>;
  selected: string[];
}

// Tipos para Context/Store
export interface AppState {
  usuario: Usuario | null;
  clinicas: TableState<Clinica>;
  projetos: TableState<ProjetoImpulso>;
  agentes: TableState<AgenteImpulso>;
  insights: TableState<InsightAgente>;
  integracoes: TableState<Integracao>;
  notificacoes: Notificacao[];
  dashboardData: DashboardData | null;
  configuracoes: ConfiguracaoSistema[];
}

// Tipos para Hooks Customizados
export interface UseApiOptions<T> {
  initialData?: T;
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: string, variables: TVariables) => void;
  onSettled?: () => void;
}

// Export default de todos os tipos principais
export type {
  // Principais entidades
  Clinica,
  AgenteImpulso,
  ProjetoImpulso,
  InsightAgente,
  Integracao,
  Usuario,
  
  // Enums
  TipoAgente,
  StatusFase,
  PrioridadeProjeto,
  
  // API
  ApiResponse,
  PaginationParams,
  
  // Formulários
  FormClinica,
  FormProjeto,
  FormAgente,
  
  // Dashboard
  DashboardData,
  MetricasGerais,
  
  // Estados
  LoadingState,
  TableState,
  AppState
};