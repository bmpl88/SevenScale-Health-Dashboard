import { useState } from 'react';
import { message } from 'antd';
import { Anotacao, FiltroTipo, FiltroPrioridade } from '../types/pipeline.types';

export const useAnotacoes = () => {
  const [anotacoes, setAnotacoes] = useState<Record<number, Anotacao[]>>({
    1: [
      {
        id: 1,
        autor: "Bruno Monteiro",
        data: "2025-06-20T14:30:00",
        tipo: "observacao",
        conteudo: "Clínica com excelente potencial de crescimento. ROI atual de 287% demonstra eficácia da metodologia IMPULSO®.",
        anexos: [],
        prioridade: "alta"
      },
      {
        id: 2,
        autor: "Agente MONITOR",
        data: "2025-06-18T09:15:00",
        tipo: "acao",
        conteudo: "Identificada oportunidade de otimização no funil de conversão. Agendar reunião com equipe para Q3.",
        anexos: ["relatorio_q2.pdf"],
        prioridade: "media"
      },
      {
        id: 3,
        autor: "Dr. Carlos Silva",
        data: "2025-06-15T16:45:00",
        tipo: "feedback",
        conteudo: "Equipe muito satisfeita com os resultados. Pacientes elogiando a agilidade no atendimento.",
        anexos: [],
        prioridade: "baixa"
      }
    ],
    2: [
      {
        id: 4,
        autor: "Agente LAPIDADOR",
        data: "2025-06-21T11:20:00",
        tipo: "tecnico",
        conteudo: "Modelo ML de previsão de demanda 78% implementado. Aguardando dados históricos para calibração final.",
        anexos: ["modelo_ml_v2.py", "dataset_maio.csv"],
        prioridade: "alta"
      }
    ],
    3: [
      {
        id: 5,
        autor: "Agente SISTEMATIZADOR",
        data: "2025-06-19T13:10:00",
        tipo: "processo",
        conteudo: "Manual de processos 45% concluído. Foco atual: protocolos de atendimento e fluxos de emergência.",
        anexos: ["manual_v1.docx"],
        prioridade: "media"
      }
    ]
  });

  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState<FiltroPrioridade>('todas');

  const adicionarAnotacao = (clinicaId: number, conteudo: string) => {
    if (!conteudo.trim()) return;
    
    const novaAnotacaoObj: Anotacao = {
      id: Date.now(),
      autor: "Bruno Monteiro",
      data: new Date().toISOString(),
      tipo: "observacao",
      conteudo,
      anexos: [],
      prioridade: "media"
    };
    
    setAnotacoes(prev => ({
      ...prev,
      [clinicaId]: [...(prev[clinicaId] || []), novaAnotacaoObj]
    }));
    
    message.success('Anotação adicionada com sucesso!');
  };

  const removerAnotacao = (clinicaId: number, anotacaoId: number) => {
    setAnotacoes(prev => ({
      ...prev,
      [clinicaId]: prev[clinicaId]?.filter(a => a.id !== anotacaoId) || []
    }));
    
    message.success('Anotação removida com sucesso!');
  };

  const getAnotacoesFiltradas = (clinicaId: number): Anotacao[] => {
    const anotacoesClinica = anotacoes[clinicaId] || [];
    
    return anotacoesClinica.filter(anotacao => {
      const tipoMatch = filtroTipo === 'todos' || anotacao.tipo === filtroTipo;
      const prioridadeMatch = filtroPrioridade === 'todas' || anotacao.prioridade === filtroPrioridade;
      return tipoMatch && prioridadeMatch;
    }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  };

  const getTipoIcon = (tipo: Anotacao['tipo']): string => {
    switch(tipo) {
      case 'observacao': return '📝';
      case 'acao': return '⚡';
      case 'feedback': return '💬';
      case 'tecnico': return '🔧';
      case 'processo': return '📋';
      default: return '📌';
    }
  };

  const getPrioridadeCor = (prioridade: Anotacao['prioridade']): string => {
    switch(prioridade) {
      case 'alta': return '#EF4444';
      case 'media': return '#F59E0B';
      case 'baixa': return '#10B981';
      default: return '#6B7280';
    }
  };

  const formatarDataHora = (dataISO: string) => {
    const data = new Date(dataISO);
    return {
      data: data.toLocaleDateString('pt-BR'),
      hora: data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return {
    anotacoes,
    filtroTipo,
    setFiltroTipo,
    filtroPrioridade,
    setFiltroPrioridade,
    adicionarAnotacao,
    removerAnotacao,
    getAnotacoesFiltradas,
    getTipoIcon,
    getPrioridadeCor,
    formatarDataHora
  };
};
