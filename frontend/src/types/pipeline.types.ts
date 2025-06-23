// Tipos para Pipeline IMPULSO® Health
export interface FaseHistorico {
  fase: string;
  entrada: string;
  saida: string | null;
  duracao: number;
}

export interface ClinicaPipeline {
  id: number;
  nome: string;
  fase_atual: string;
  posicao_fase: number;
  tempo_na_fase: number;
  roi_atual: number;
  pacientes_mes: number;
  progresso_fase: number;
  proxima_acao: string;
  responsavel: string;
  data_entrada_fase: string;
  historico_fases: FaseHistorico[];
}

export interface FaseDetalhada {
  fase: string;
  icone: string;
  cor: string;
  posicao: number;
  clinicas: number;
  tempoMedio: number;
  titulo: string;
  descricao: string;
  criterios: string[];
  entregaveis: string[];
  kpis: string[];
}

export interface MetricasPipeline {
  taxaSucesso: number;
  tempoMedioTotal: number;
  clinicasAtivas: number;
  capacidadeMaxima: number;
  fasesMaisRapidas: string[];
  fasesGargalo: string[];
  roiMedioFinal: number;
}

export interface Anotacao {
  id: number;
  autor: string;
  data: string;
  tipo: 'observacao' | 'acao' | 'feedback' | 'tecnico' | 'processo';
  conteudo: string;
  anexos: string[];
  prioridade: 'alta' | 'media' | 'baixa';
}

export interface PipelineData {
  pipelineDetalhado: FaseDetalhada[];
  clinicasPipeline: ClinicaPipeline[];
  metricas: MetricasPipeline;
  loading: boolean;
}

export type FiltroTipo = 'todos' | 'observacao' | 'acao' | 'feedback' | 'tecnico' | 'processo';
export type FiltroPrioridade = 'todas' | 'alta' | 'media' | 'baixa';
