          <TextArea
                            value={novaAnotacao}
                            onChange={(e) => setNovaAnotacao(e.target.value)}
                            placeholder="Digite sua anotação aqui..."
                            rows={3}
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              marginBottom: '12px'
                            }}
                          />
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <Button size="small" icon={<UploadIcon size={14} />}>
                                Anexar
                              </Button>
                              <Select
                                defaultValue="observacao"
                                size="small"
                                style={{ width: 120 }}
                              >
                                <Option value="observacao">📝 Observação</Option>
                                <Option value="acao">⚡ Ação</Option>
                                <Option value="feedback">💬 Feedback</Option>
                                <Option value="tecnico">🔧 Técnico</Option>
                                <Option value="processo">📋 Processo</Option>
                              </Select>
                            </div>
                            <Button
                              type="primary"
                              size="small"
                              onClick={adicionarAnotacao}
                              disabled={!novaAnotacao.trim()}
                              style={{
                                background: '#FF7A00',
                                borderColor: '#FF7A00',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: '600'
                              }}
                            >
                              Adicionar
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Lista de anotações */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {getAnotacoesFiltradas().length === 0 ? (
                          <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            color: '#94A3B8',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px'
                          }}>
                            {filtroTipo !== 'todos' || filtroPrioridade !== 'todas' 
                              ? '🔍 Nenhuma anotação encontrada com os filtros aplicados'
                              : '📝 Nenhuma anotação ainda. Adicione a primeira anotação acima!'
                            }
                          </div>
                        ) : (
                          getAnotacoesFiltradas().map((anotacao) => {
                            const { data, hora } = formatarDataHora(anotacao.data);
                            return (
                              <div
                                key={anotacao.id}
                                style={{
                                  background: 'white',
                                  border: '1px solid #E2E8F0',
                                  borderRadius: '8px',
                                  padding: '16px',
                                  position: 'relative'
                                }}
                              >
                                {/* Header da anotação */}
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'flex-start',
                                  marginBottom: '12px'
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '16px' }}>
                                      {getTipoIcon(anotacao.tipo)}
                                    </span>
                                    <div>
                                      <div style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#1e293b',
                                        fontFamily: 'Inter, sans-serif'
                                      }}>
                                        {anotacao.autor}
                                      </div>
                                      <div style={{
                                        fontSize: '12px',
                                        color: '#64748b',
                                        fontFamily: 'Inter, sans-serif'
                                      }}>
                                        {data} às {hora}
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                      width: '8px',
                                      height: '8px',
                                      borderRadius: '50%',
                                      background: getPrioridadeCor(anotacao.prioridade)
                                    }} />
                                    <Tag
                                      style={{
                                        fontSize: '10px',
                                        fontFamily: 'Inter, sans-serif',
                                        textTransform: 'capitalize',
                                        border: 'none',
                                        background: '#F1F5F9',
                                        color: '#475569'
                                      }}
                                    >
                                      {anotacao.tipo}
                                    </Tag>
                                    <Button
                                      type="text"
                                      size="small"
                                      icon={<Trash2 size={12} />}
                                      onClick={() => removerAnotacao(anotacao.id)}
                                      style={{ color: '#EF4444' }}
                                    />
                                  </div>
                                </div>

                                {/* Conteúdo da anotação */}
                                <div style={{
                                  fontSize: '14px',
                                  color: '#374151',
                                  fontFamily: 'Inter, sans-serif',
                                  lineHeight: '20px',
                                  marginBottom: anotacao.anexos.length > 0 ? '12px' : '0'
                                }}>
                                  {anotacao.conteudo}
                                </div>

                                {/* Anexos */}
                                {anotacao.anexos.length > 0 && (
                                  <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '6px'
                                  }}>
                                    {anotacao.anexos.map((anexo, index) => (
                                      <Tag
                                        key={index}
                                        style={{
                                          fontSize: '11px',
                                          fontFamily: 'Inter, sans-serif',
                                          background: '#EFF6FF',
                                          color: '#1D4ED8',
                                          border: '1px solid #DBEAFE',
                                          cursor: 'pointer'
                                        }}
                                        onClick={() => message.info(`Baixando: ${anexo}`)}
                                      >
                                        📎 {anexo}
                                      </Tag>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Estatísticas das anotações */}
                      {getAnotacoesFiltradas().length > 0 && (
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
                            📊 Resumo das Anotações
                          </div>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                            gap: '12px',
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif'
                          }}>
                            <div>
                              <span style={{ color: '#64748b' }}>Total: </span>
                              <span style={{ fontWeight: '600', color: '#1e293b' }}>
                                {anotacoes[modalClinica?.id]?.length || 0}
                              </span>
                            </div>
                            <div>
                              <span style={{ color: '#64748b' }}>Alta prioridade: </span>
                              <span style={{ fontWeight: '600', color: '#EF4444' }}>
                                {anotacoes[modalClinica?.id]?.filter(a => a.prioridade === 'alta').length || 0}
                              </span>
                            </div>
                            <div>
                              <span style={{ color: '#64748b' }}>Com anexos: </span>
                              <span style={{ fontWeight: '600', color: '#3B82F6' }}>
                                {anotacoes[modalClinica?.id]?.filter(a => a.anexos.length > 0).length || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }
              ]}
            />
          </div>
        )}
      </Modal>

      {/* Call to Action - HIERARQUIA H3 */}
      <Card style={{ 
        borderRadius: '12px', 
        textAlign: 'center', 
        padding: '48px', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        border: '2px dashed #cbd5e1' 
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          color: '#64748b', 
          marginBottom: '12px',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.01em'
        }}>
          🎯 Quer acelerar o crescimento da sua clínica?
        </div>
        <div style={{ 
          color: '#94a3b8', 
          marginBottom: '20px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          fontWeight: '400'
        }}>
          Conheça a metodologia IMPULSO® e transforme sua clínica em até 90 dias
        </div>
        <Button 
          type="primary" 
          size="large"
          style={{ 
            background: 'linear-gradient(135deg, #FF7A00 0%, #1A202C 100%)',
            border: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            fontSize: '16px',
            height: '48px',
            padding: '0 32px'
          }}
        >
          Agendar Consultoria Gratuita
        </Button>
      </Card>
    </div>
  );
};

export default PipelineImpulsoPage;