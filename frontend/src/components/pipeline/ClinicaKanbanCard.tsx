import React from 'react';
import { Card, Progress, Tag } from 'antd';
import { ClinicaPipeline, FaseDetalhada } from '../../types/pipeline.types';

interface ClinicaKanbanCardProps {
  clinica: ClinicaPipeline;
  fase: FaseDetalhada;
  onSelect: () => void;
}

export const ClinicaKanbanCard: React.FC<ClinicaKanbanCardProps> = ({ clinica, fase, onSelect }) => {
  return (
    <Card
      style={{
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        background: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      bodyStyle={{ padding: '16px' }}
      onClick={onSelect}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
      }}
    >
      {/* Header do Card */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '4px',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.01em',
          lineHeight: '20px'
        }}>
          {clinica.nome}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#64748b',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500'
        }}>
          👤 {clinica.responsavel}
        </div>
      </div>

      {/* ROI e Progress */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{
            fontSize: '11px',
            color: '#64748b',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            ROI Atual
          </span>
          <span style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#10B981',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.01em'
          }}>
            {clinica.roi_atual}%
          </span>
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{
              fontSize: '11px',
              color: '#64748b',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600'
            }}>
              Progresso da Fase
            </span>
            <span style={{
              fontSize: '11px',
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700'
            }}>
              {clinica.progresso_fase}%
            </span>
          </div>
          <Progress
            percent={clinica.progresso_fase}
            strokeColor={fase.cor}
            trailColor="#F1F5F9"
            showInfo={false}
            size="small"
          />
        </div>
      </div>

      {/* Métricas Resumidas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        marginBottom: '12px',
        padding: '8px',
        background: '#F8FAFC',
        borderRadius: '6px'
      }}>
        <div>
          <div style={{
            fontSize: '10px',
            color: '#64748b',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            marginBottom: '2px'
          }}>
            PACIENTES
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#1e293b',
            fontFamily: 'Inter, sans-serif'
          }}>
            {clinica.pacientes_mes.toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{
            fontSize: '10px',
            color: '#64748b',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            marginBottom: '2px'
          }}>
            DIAS NA FASE
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: fase.cor,
            fontFamily: 'Inter, sans-serif'
          }}>
            {clinica.tempo_na_fase}
          </div>
        </div>
      </div>

      {/* Próxima Ação */}
      <div style={{
        fontSize: '12px',
        color: '#64748b',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        lineHeight: '16px',
        marginBottom: '8px'
      }}>
        🎯 {clinica.proxima_acao}
      </div>

      {/* Status Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tag
          style={{
            background: `${fase.cor}15`,
            color: fase.cor,
            border: `1px solid ${fase.cor}30`,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            fontSize: '10px',
            padding: '2px 6px'
          }}
        >
          Fase {clinica.posicao_fase}/7
        </Tag>
        <div style={{
          fontSize: '11px',
          color: '#64748b',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500'
        }}>
          {new Date(clinica.data_entrada_fase).toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit' 
          })}
        </div>
      </div>
    </Card>
  );
};
