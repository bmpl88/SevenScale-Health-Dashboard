import React, { useState } from 'react';
import { FaseDetalhada } from '../../types/pipeline.types';
import { FaseCard } from './FaseCard';

interface FasesOverviewProps {
  pipelineDetalhado: FaseDetalhada[];
  loading: boolean;
}

export const FasesOverview: React.FC<FasesOverviewProps> = ({ pipelineDetalhado, loading }) => {
  const [faseExpandida, setFaseExpandida] = useState<string | null>(null);

  const handleToggleExpansion = (fase: string) => {
    setFaseExpandida(faseExpandida === fase ? null : fase);
  };

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
            As 7 Fases do Método IMPULSO®
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
          Clique em cada fase para ver detalhes completos da metodologia
        </p>
      </div>

      {/* Primeira linha - 4 fases */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        {pipelineDetalhado.slice(0, 4).map((fase) => (
          <FaseCard
            key={fase.fase}
            fase={fase}
            isExpanded={faseExpandida === fase.fase}
            onToggleExpansion={() => handleToggleExpansion(fase.fase)}
            loading={loading}
          />
        ))}
      </div>

      {/* Segunda linha - 3 fases */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px',
        justifyContent: 'center'
      }}>
        {pipelineDetalhado.slice(4, 7).map((fase) => (
          <FaseCard
            key={fase.fase}
            fase={fase}
            isExpanded={faseExpandida === fase.fase}
            onToggleExpansion={() => handleToggleExpansion(fase.fase)}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};
