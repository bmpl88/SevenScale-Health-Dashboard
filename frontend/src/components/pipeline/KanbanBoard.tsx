import React from 'react';
import { FaseDetalhada, ClinicaPipeline } from '../../types/pipeline.types';
import { ClinicaKanbanCard } from './ClinicaKanbanCard';

interface KanbanBoardProps {
  pipelineDetalhado: FaseDetalhada[];
  clinicasPipeline: ClinicaPipeline[];
  onClinicaSelect: (clinica: ClinicaPipeline) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  pipelineDetalhado, 
  clinicasPipeline, 
  onClinicaSelect 
}) => {
  return (
    <div style={{ marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid #e2e8f0' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '4px',
            height: '32px',
            background: 'linear-gradient(to bottom, #FF7A00, #1A202C)',
            borderRadius: '2px'
          }} />
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#1e293b', 
            margin: '0',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '34px'
          }}>
            Clínicas Ativas no Pipeline
          </h2>
        </div>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: '0 0 0 28px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '400',
          lineHeight: '24px'
        }}>
          Kanban visual do progresso das clínicas através das 7 fases da metodologia IMPULSO®
        </p>
      </div>

      {/* Kanban Board */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        overflowX: 'auto',
        paddingBottom: '16px',
        minHeight: '500px'
      }}>
        {pipelineDetalhado.map((fase) => {
          const clinicasNaFase = clinicasPipeline.filter(c => c.fase_atual === fase.fase);
          
          return (
            <div 
              key={fase.fase}
              style={{
                minWidth: '280px',
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #E2E8F0'
              }}
            >
              {/* Header da Coluna */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: fase.cor
                  }} />
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1e293b',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {fase.icone} {fase.fase}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#64748b',
                    background: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {clinicasNaFase.length}
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  Fase {fase.posicao} • {fase.tempoMedio} dias médio
                </div>
              </div>

              {/* Cards das Clínicas */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {clinicasNaFase.map((clinica) => (
                  <ClinicaKanbanCard
                    key={clinica.id}
                    clinica={clinica}
                    fase={fase}
                    onSelect={() => onClinicaSelect(clinica)}
                  />
                ))}

                {/* Card Placeholder para fases vazias */}
                {clinicasNaFase.length === 0 && (
                  <div style={{
                    borderRadius: '8px',
                    border: '2px dashed #CBD5E1',
                    background: 'white',
                    padding: '24px',
                    textAlign: 'center',
                    color: '#94A3B8',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    Nenhuma clínica nesta fase
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legenda do Kanban */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: '#F8FAFC',
        borderRadius: '8px',
        border: '1px solid #E2E8F0'
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '8px',
          fontFamily: 'Inter, sans-serif'
        }}>
          💡 Como usar o Kanban:
        </div>
        <div style={{
          fontSize: '12px',
          color: '#64748b',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '400',
          lineHeight: '18px'
        }}>
          • Cada coluna representa uma fase da metodologia IMPULSO® • 
          Cards mostram o progresso das clínicas • 
          Números nas colunas indicam quantas clínicas estão em cada fase • 
          Clique nos cards para abrir detalhes completos da clínica
        </div>
      </div>
    </div>
  );
};
