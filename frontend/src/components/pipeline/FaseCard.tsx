import React from 'react';
import { Card, Tag } from 'antd';
import { FaseDetalhada } from '../../types/pipeline.types';

interface FaseCardProps {
  fase: FaseDetalhada;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  loading: boolean;
}

export const FaseCard: React.FC<FaseCardProps> = ({ fase, isExpanded, onToggleExpansion, loading }) => {
  return (
    <Card 
      style={{
        borderRadius: '12px', 
        border: '1px solid #e2e8f0', 
        background: 'white', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', 
        position: 'relative', 
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isExpanded ? 'scale(1.02)' : 'scale(1)'
      }}
      onClick={onToggleExpansion}
    >
      <div style={{
        position: 'absolute', 
        top: '0', 
        left: '0', 
        width: '100%', 
        height: '4px', 
        background: fase.cor
      }} />
      
      <div style={{ padding: '20px' }}>
        {/* Header da Fase */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px' }}>{fase.icone}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ 
                fontSize: '11px', 
                color: '#64748b', 
                textTransform: 'uppercase', 
                letterSpacing: '0.8px', 
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif'
              }}>
                Fase {fase.posicao}
              </div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: fase.cor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontSize: '10px', fontWeight: '700' }}>
                  {fase.posicao}
                </span>
              </div>
            </div>
            <div style={{ 
              fontSize: '17px', 
              fontWeight: '700', 
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '22px',
              letterSpacing: '-0.01em'
            }}>
              {fase.titulo}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '32px', 
              fontWeight: '800', 
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.03em',
              lineHeight: '36px'
            }}>
              {loading ? '-' : fase.clinicas}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#64748b',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              {fase.clinicas === 1 ? 'clínica' : 'clínicas'}
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ 
            fontSize: '15px', 
            color: '#64748b', 
            lineHeight: '22px', 
            margin: '0',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400'
          }}>
            {fase.descricao}
          </p>
        </div>

        {/* Métricas da Fase */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px', 
          marginBottom: '16px',
          padding: '16px',
          background: '#F8FAFC',
          borderRadius: '8px'
        }}>
          <div>
            <div style={{ 
              fontSize: '10px', 
              color: '#64748b', 
              textTransform: 'uppercase', 
              letterSpacing: '0.8px', 
              marginBottom: '6px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600'
            }}>
              Tempo Médio
            </div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.01em'
            }}>
              {fase.tempoMedio} dias
            </div>
          </div>
          <div>
            <div style={{ 
              fontSize: '10px', 
              color: '#64748b', 
              textTransform: 'uppercase', 
              letterSpacing: '0.8px', 
              marginBottom: '6px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600'
            }}>
              Status
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: fase.clinicas > 0 ? '#10B981' : '#CBD5E1'
              }} />
              <span style={{ 
                fontSize: '13px', 
                color: fase.clinicas > 0 ? '#059669' : '#64748b', 
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif'
              }}>
                {fase.clinicas > 0 ? 'Ativa' : 'Aguardando'}
              </span>
            </div>
          </div>
        </div>

        {/* Detalhes Expandidos */}
        {isExpanded && (
          <div style={{ 
            borderTop: '1px solid #e2e8f0', 
            paddingTop: '16px',
            animation: 'fadeIn 0.3s ease'
          }}>
            {/* Critérios */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: '700', 
                color: '#1e293b', 
                marginBottom: '8px',
                fontFamily: 'Inter, sans-serif'
              }}>
                ✅ Critérios de Conclusão:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {fase.criterios.map((criterio, idx) => (
                  <div key={idx} style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    fontFamily: 'Inter, sans-serif',
                    paddingLeft: '8px',
                    fontWeight: '400'
                  }}>
                    • {criterio}
                  </div>
                ))}
              </div>
            </div>

            {/* Entregáveis */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: '700', 
                color: '#1e293b', 
                marginBottom: '8px',
                fontFamily: 'Inter, sans-serif'
              }}>
                📋 Entregáveis:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {fase.entregaveis.map((entregavel, idx) => (
                  <Tag 
                    key={idx} 
                    style={{ 
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      border: `1px solid ${fase.cor}30`,
                      background: `${fase.cor}10`,
                      color: fase.cor
                    }}
                  >
                    {entregavel}
                  </Tag>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: '700', 
                color: '#1e293b', 
                marginBottom: '8px',
                fontFamily: 'Inter, sans-serif'
              }}>
                📊 KPIs Monitorados:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {fase.kpis.map((kpi, idx) => (
                  <Tag 
                    key={idx} 
                    style={{ 
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      background: '#F1F5F9',
                      color: '#475569',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    {kpi}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Indicador de Expansão */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '12px',
          fontSize: '11px',
          color: '#64748b',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500'
        }}>
          {isExpanded ? '▲ Clique para fechar detalhes' : '▼ Clique para ver detalhes'}
        </div>
      </div>
    </Card>
  );
};
