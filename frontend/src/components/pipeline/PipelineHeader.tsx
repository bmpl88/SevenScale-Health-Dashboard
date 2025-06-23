import React from 'react';
import { Card, Statistic, Progress } from 'antd';
import { Workflow } from 'lucide-react';
import { MetricasPipeline } from '../../types/pipeline.types';

interface PipelineHeaderProps {
  metricas: MetricasPipeline;
  loading: boolean;
}

export const PipelineHeader: React.FC<PipelineHeaderProps> = ({ metricas, loading }) => {
  return (
    <>
      {/* FONTE INTER IMPLEMENTADA via Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      
      <div style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #FF7A00 0%, #1A202C 100%)', 
          borderRadius: '16px', 
          padding: '40px', 
          color: 'white',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Workflow size={36} color="white" />
            </div>
            <div>
              <h1 style={{ 
                fontSize: '42px', 
                fontWeight: '800', 
                margin: '0 0 12px 0', 
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.03em',
                lineHeight: '48px'
              }}>
                Pipeline Método IMPULSO® Health
              </h1>
              <p style={{ 
                fontSize: '18px', 
                margin: '0', 
                opacity: '0.9',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                lineHeight: '26px'
              }}>
                Metodologia proprietária SevenScale em 7 fases para transformação digital de clínicas médicas
              </p>
            </div>
          </div>
        </div>

        {/* Métricas do Pipeline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '8px' }}>
            <Statistic
              title={<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Taxa de Sucesso</span>}
              value={loading ? 0 : metricas.taxaSucesso}
              suffix="%"
              valueStyle={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: '800', 
                color: '#10B981',
                letterSpacing: '-0.02em',
                fontSize: '32px'
              }}
            />
            <div style={{ marginTop: '10px' }}>
              <Progress 
                percent={loading ? 0 : metricas.taxaSucesso} 
                strokeColor="#10B981" 
                showInfo={false}
                size="small"
              />
            </div>
          </Card>

          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '8px' }}>
            <Statistic
              title={<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Tempo Médio/Fase</span>}
              value={loading ? 0 : metricas.tempoMedioTotal}
              suffix="dias"
              valueStyle={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: '800', 
                color: '#3B82F6',
                letterSpacing: '-0.02em',
                fontSize: '32px'
              }}
            />
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              🚀 15% mais rápido que benchmark
            </div>
          </Card>

          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '8px' }}>
            <Statistic
              title={<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Clínicas Ativas</span>}
              value={loading ? 0 : metricas.clinicasAtivas}
              suffix={`/${metricas.capacidadeMaxima}`}
              valueStyle={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: '800', 
                color: '#FF7A00',
                letterSpacing: '-0.02em',
                fontSize: '32px'
              }}
            />
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              💡 {metricas.capacidadeMaxima - metricas.clinicasAtivas} vagas disponíveis
            </div>
          </Card>

          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '8px' }}>
            <Statistic
              title={<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>ROI Médio Final</span>}
              value={loading ? 0 : metricas.roiMedioFinal}
              suffix="%"
              valueStyle={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: '800', 
                color: '#8B5CF6',
                letterSpacing: '-0.02em',
                fontSize: '32px'
              }}
            />
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
              📈 +105% vs ROI inicial
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
