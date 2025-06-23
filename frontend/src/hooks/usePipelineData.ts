import { useState, useEffect } from 'react';
import { PipelineData } from '../types/pipeline.types';

// Hook simulado para dados do Pipeline Supabase
export const usePipelineData = (): PipelineData => {
  const [data, setData] = useState<PipelineData>({
    pipelineDetalhado: [],
    clinicasPipeline: [],
    metricas: {
      taxaSucesso: 0,
      tempoMedioTotal: 0,
      clinicasAtivas: 0,
      capacidadeMaxima: 0,
      fasesMaisRapidas: [],
      fasesGargalo: [],
      roiMedioFinal: 0
    },
    loading: true
  });

  useEffect(() => {
    setTimeout(() => {
      setData({
        pipelineDetalhado: [
          { 
            fase: 'INVESTIGAR', 
            icone: '🔍', 
            cor: '#3B82F6',
            posicao: 1,
            clinicas: 0,
            tempoMedio: 7,
            titulo: 'Diagnosticar & Investigar',
            descricao: 'Análise profunda da situação atual da clínica, identificação de gargalos operacionais e mapeamento do perfil ideal de clientes (ICP).',
            criterios: ['Auditoria operacional completa', 'Definição ICP médico', 'Análise concorrência local', 'Identificação oportunidades'],
            entregaveis: ['Relatório diagnóstico', 'ICP detalhado', 'Plano estratégico inicial'],
            kpis: ['ROI atual', 'Taxa conversão', 'CAC por canal', 'LTV paciente']
          },
          { 
            fase: 'MAPEAR', 
            icone: '🗺️', 
            cor: '#10B981',
            posicao: 2,
            clinicas: 0,
            tempoMedio: 5,
            titulo: 'Arquitetar & Mapear',
            descricao: 'Desenho de fluxos otimizados, criação de funis de conversão personalizados e definição da jornada ideal do paciente.',
            criterios: ['Mapeamento jornada paciente', 'Funis conversão desenhados', 'Processos otimizados', 'Automações planejadas'],
            entregaveis: ['Fluxogramas detalhados', 'Funis conversão', 'Wireframes sistema'],
            kpis: ['Taxa engajamento', 'Tempo jornada', 'Points conversão', 'Drop-off rate']
          },
          { 
            fase: 'PROTOTIPAR', 
            icone: '⚡', 
            cor: '#F59E0B',
            posicao: 3,
            clinicas: 0,
            tempoMedio: 12,
            titulo: 'Prototipar & Testar',
            descricao: 'Desenvolvimento de MVPs, implementação de testes A/B médicos e validação de hipóteses com dados reais.',
            criterios: ['MVPs desenvolvidos', 'Testes A/B ativos', 'Hipóteses validadas', 'Métricas coletadas'],
            entregaveis: ['Protótipos funcionais', 'Relatórios A/B tests', 'Validações hipóteses'],
            kpis: ['Conversion rate', 'A/B test results', 'User feedback', 'Performance MVP']
          },
          { 
            fase: 'UTILIZAR', 
            icone: '🏗️', 
            cor: '#EF4444',
            posicao: 4,
            clinicas: 0,
            tempoMedio: 18,
            titulo: 'Implementar & Utilizar',
            descricao: 'Deploy das soluções validadas, configuração de automações de follow-up e integração completa dos sistemas.',
            criterios: ['Deploy realizado', 'Automações ativas', 'Sistemas integrados', 'Equipe treinada'],
            entregaveis: ['Sistema em produção', 'Automações configuradas', 'Treinamento equipe'],
            kpis: ['Uptime sistema', 'Automações ativas', 'Adoção equipe', 'Eficiência operacional']
          },
          { 
            fase: 'LAPIDACAO', 
            icone: '💎', 
            cor: '#8B5CF6',
            posicao: 5,
            clinicas: 1,
            tempoMedio: 15,
            titulo: 'Lapidar & Otimizar ML',
            descricao: 'Aplicação de machine learning para otimização contínua, previsão de demanda e personalização do atendimento.',
            criterios: ['ML modelos ativos', 'Previsões demanda', 'Otimização contínua', 'Personalização ativa'],
            entregaveis: ['Modelos ML produção', 'Dashboard preditivo', 'Otimizações automáticas'],
            kpis: ['Accuracy modelos', 'Previsão demanda', 'ROI otimizações', 'Satisfação paciente']
          },
          { 
            fase: 'SISTEMATIZAR', 
            icone: '⚙️', 
            cor: '#06B6D4',
            posicao: 6,
            clinicas: 1,
            tempoMedio: 8,
            titulo: 'Sistematizar & Escalar',
            descricao: 'Criação de protocolos replicáveis, implementação de programas de referência e sistematização completa dos processos.',
            criterios: ['Protocolos documentados', 'Referral program ativo', 'Processos sistematizados', 'Escalabilidade testada'],
            entregaveis: ['Manual processos', 'Programa referência', 'Sistema escalável'],
            kpis: ['Referrals gerados', 'Processos padronizados', 'Tempo onboarding', 'Escalabilidade']
          },
          { 
            fase: 'OTIMIZAR', 
            icone: '🎯', 
            cor: '#FF7A00',
            posicao: 7,
            clinicas: 1,
            tempoMedio: 30,
            titulo: 'Monitorar & Otimizar',
            descricao: 'Analytics 24/7, identificação automática de oportunidades de growth e otimização contínua baseada em dados.',
            criterios: ['Analytics 24/7 ativo', 'Oportunidades identificadas', 'Growth contínuo', 'ROI maximizado'],
            entregaveis: ['Dashboard analytics', 'Alertas automáticos', 'Relatórios growth'],
            kpis: ['ROI total', 'Growth rate', 'Oportunidades detectadas', 'Performance 24/7']
          }
        ],
        clinicasPipeline: [
          {
            id: 2,
            nome: "Clínica Derma Recife", 
            fase_atual: "LAPIDACAO",
            posicao_fase: 5,
            tempo_na_fase: 23,
            roi_atual: 198.75,
            pacientes_mes: 623,
            progresso_fase: 78,
            proxima_acao: "Implementar modelo ML previsão demanda",
            responsavel: "Agente LAPIDADOR",
            data_entrada_fase: "2025-05-30",
            historico_fases: [
              { fase: "INVESTIGAR", entrada: "2025-04-15", saida: "2025-04-22", duracao: 7 },
              { fase: "MAPEAR", entrada: "2025-04-22", saida: "2025-04-27", duracao: 5 },
              { fase: "PROTOTIPAR", entrada: "2025-04-27", saida: "2025-05-09", duracao: 12 },
              { fase: "UTILIZAR", entrada: "2025-05-09", saida: "2025-05-27", duracao: 18 },
              { fase: "LAPIDACAO", entrada: "2025-05-30", saida: null, duracao: 23 }
            ]
          },
          {
            id: 3,
            nome: "OdontoVita Salvador",
            fase_atual: "SISTEMATIZAR", 
            posicao_fase: 6,
            tempo_na_fase: 12,
            roi_atual: 189.25,
            pacientes_mes: 711,
            progresso_fase: 45,
            proxima_acao: "Criar manual processos replicáveis",
            responsavel: "Agente SISTEMATIZADOR",
            data_entrada_fase: "2025-06-10",
            historico_fases: [
              { fase: "INVESTIGAR", entrada: "2025-03-20", saida: "2025-03-27", duracao: 7 },
              { fase: "MAPEAR", entrada: "2025-03-27", saida: "2025-04-01", duracao: 5 },
              { fase: "PROTOTIPAR", entrada: "2025-04-01", saida: "2025-04-13", duracao: 12 },
              { fase: "UTILIZAR", entrada: "2025-04-13", saida: "2025-05-01", duracao: 18 },
              { fase: "LAPIDACAO", entrada: "2025-05-01", saida: "2025-05-16", duracao: 15 },
              { fase: "SISTEMATIZAR", entrada: "2025-06-10", saida: null, duracao: 12 }
            ]
          },
          {
            id: 1,
            nome: "CardioCenter Fortaleza",
            fase_atual: "OTIMIZAR",
            posicao_fase: 7,
            tempo_na_fase: 45,
            roi_atual: 287.5,
            pacientes_mes: 856,
            progresso_fase: 85,
            proxima_acao: "Análise oportunidades growth Q3",
            responsavel: "Agente MONITOR",
            data_entrada_fase: "2025-05-08",
            historico_fases: [
              { fase: "INVESTIGAR", entrada: "2025-02-01", saida: "2025-02-08", duracao: 7 },
              { fase: "MAPEAR", entrada: "2025-02-08", saida: "2025-02-13", duracao: 5 },
              { fase: "PROTOTIPAR", entrada: "2025-02-13", saida: "2025-02-25", duracao: 12 },
              { fase: "UTILIZAR", entrada: "2025-02-25", saida: "2025-03-15", duracao: 18 },
              { fase: "LAPIDACAO", entrada: "2025-03-15", saida: "2025-03-30", duracao: 15 },
              { fase: "SISTEMATIZAR", entrada: "2025-03-30", saida: "2025-04-07", duracao: 8 },
              { fase: "OTIMIZAR", entrada: "2025-05-08", saida: null, duracao: 45 }
            ]
          }
        ],
        metricas: {
          taxaSucesso: 87,
          tempoMedioTotal: 12.8,
          clinicasAtivas: 3,
          capacidadeMaxima: 15,
          fasesMaisRapidas: ["MAPEAR", "SISTEMATIZAR"],
          fasesGargalo: ["UTILIZAR", "OTIMIZAR"],
          roiMedioFinal: 225
        },
        loading: false
      });
    }, 1000);
  }, []);

  return data;
};
