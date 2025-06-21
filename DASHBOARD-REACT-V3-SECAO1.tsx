import React, { useState, useEffect } from 'react';
import { Layout, Card, Statistic, Menu, Space, Avatar, Input, Badge, Dropdown } from 'antd';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Calendar,
  Search,
  Bell,
  Settings,
  User,
  BarChart3,
  Brain,
  Workflow
} from 'lucide-react';

const { Header, Content } = Layout;

// Hook simulado para dados do Supabase (substitua pela sua implementação real)
const useSupabaseData = () => {
  const [data, setData] = useState({
    clinicas: [],
    loading: true
  });

  useEffect(() => {
    // Simular dados reais do Supabase
    setTimeout(() => {
      setData({
        clinicas: [
          {
            id: 1,
            nome: "CardioCenter Fortaleza",
            roi_atual: 287.5,
            pacientes_mes_atual: 856,
            receita_mensal: 89500
          },
          {
            id: 2,
            nome: "Clínica Derma Recife", 
            roi_atual: 198.75,
            pacientes_mes_atual: 623,
            receita_mensal: 52400
          },
          {
            id: 3,
            nome: "OdontoVita Salvador",
            roi_atual: 189.25,
            pacientes_mes_atual: 711,
            receita_mensal: 65800
          }
        ],
        loading: false
      });
    }, 1000);
  }, []);

  return data;
};

const SevenScaleDashboard = () => {
  const { clinicas, loading } = useSupabaseData();
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  // Cálculos das métricas em tempo real
  const totalClinicas = clinicas.length;
  const totalPacientes = clinicas.reduce((sum, c) => sum + c.pacientes_mes_atual, 0);
  const roiMedio = clinicas.length > 0 
    ? Math.round(clinicas.reduce((sum, c) => sum + c.roi_atual, 0) / clinicas.length)
    : 0;
  const totalConsultas = Math.round(totalPacientes * 1.5); // Estimativa

  const menuItems = [
    {
      key: 'dashboard',
      icon: <BarChart3 size={16} />,
      label: 'Dashboard',
    },
    {
      key: 'clinicas',
      icon: <Building2 size={16} />,
      label: 'Clínicas',
    },
    {
      key: 'agentes-ia',
      icon: <Brain size={16} />,
      label: 'Agentes IA',
    },
    {
      key: 'agentes-impulso',
      icon: <Brain size={16} />,
      label: 'Agentes IMPULSO®',
      badge: 'Novo!',
    },
    {
      key: 'pipeline',
      icon: <Workflow size={16} />,
      label: 'Pipeline IMPULSO®',
      badge: 'Novo!',
    },
    {
      key: 'relatorios',
      icon: <TrendingUp size={16} />,
      label: 'Relatórios',
    },
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<User size={14} />}>
        Perfil
      </Menu.Item>
      <Menu.Item key="settings" icon={<Settings size={14} />}>
        Configurações
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header Horizontal */}
      <Header 
        style={{ 
          background: 'white',
          padding: '0 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid #e2e8f0',
          height: '80px'
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          height: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '280px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #FF7A00 0%, #1A202C 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Brain size={24} color="white" />
            </div>
            <div>
              <div style={{ 
                color: '#1e293b', 
                fontSize: '18px', 
                fontWeight: '600',
                lineHeight: '20px'
              }}>
                SevenScale Health
              </div>
              <div style={{ 
                color: '#64748b', 
                fontSize: '12px',
                lineHeight: '14px'
              }}>
                Transformação Digital
              </div>
            </div>
          </div>

          {/* Navegação Central */}
          <div style={{ flex: 1, margin: '0 12px', minWidth: '700px' }}>
            <Menu
              mode="horizontal"
              selectedKeys={[selectedMenu]}
              onClick={({ key }) => setSelectedMenu(key)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}
              overflowedIndicator={null}
              triggerSubMenuAction="click"
            >
              {menuItems.map(item => (
                <Menu.Item 
                  key={item.key} 
                  icon={React.cloneElement(item.icon, { size: 16 })}
                  style={{ 
                    borderRadius: '6px',
                    margin: '0 2px',
                    color: selectedMenu === item.key ? '#FF7A00' : '#64748b',
                    height: '50px',
                    lineHeight: '50px',
                    padding: '0 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 'auto',
                    flex: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span style={{ marginLeft: '6px', fontSize: '16px', fontWeight: '500' }}>
                    {item.label}
                    {item.badge && (
                      <Badge 
                        count={item.badge} 
                        style={{ 
                          backgroundColor: '#FF7A00',
                          fontSize: '10px',
                          marginLeft: '6px'
                        }} 
                      />
                    )}
                  </span>
                </Menu.Item>
              ))}
            </Menu>
          </div>

          {/* Actions */}
          <Space size="medium" style={{ minWidth: '300px', justifyContent: 'flex-end', display: 'flex' }}>
            <Input
              placeholder="Pesquisar..."
              prefix={<Search size={16} style={{ color: '#999' }} />}
              style={{
                width: '200px',
                height: '36px',
                borderRadius: '18px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            />
            <Badge count={3} size="small" style={{ display: 'flex', alignItems: 'center' }}>
              <Bell size={20} style={{ color: '#64748b', cursor: 'pointer', display: 'block' }} />
            </Badge>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar 
                size={36}
                style={{ 
                  backgroundColor: '#FF7A00',
                  cursor: 'pointer',
                  border: '2px solid #f1f5f9',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                BM
              </Avatar>
            </Dropdown>
          </Space>
        </div>
      </Header>

      {/* Content */}
      <Content style={{ padding: '24px' }}>
        {/* Cards de Métricas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Card 1: Clínicas Ativas */}
          <Card 
            style={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Building2 size={28} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                  Clínicas Ativas
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', lineHeight: '36px', color: '#1e293b' }}>
                  {loading ? '-' : totalClinicas}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#FF7A00',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '600'
                }}>
                  <TrendingUp size={12} />
                  +15% vs mês anterior
                </div>
              </div>
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#64748b', 
              marginTop: '12px',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '12px'
            }}>
              🟢 Clínicas transformadas digitalmente
            </div>
          </Card>

          {/* Card 2: Pacientes/Mês */}
          <Card 
            style={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={28} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                  Pacientes/Mês
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', lineHeight: '36px', color: '#1e293b' }}>
                  {loading ? '-' : totalPacientes.toLocaleString()}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#FF7A00',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '600'
                }}>
                  <TrendingUp size={12} />
                  +23% crescimento
                </div>
              </div>
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#64748b', 
              marginTop: '12px',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '12px'
            }}>
              🟢 Pacientes atendidos mensalmente
            </div>
          </Card>

          {/* Card 3: ROI Médio */}
          <Card 
            style={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #FF7A00 0%, #E65100 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp size={28} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                  ROI Médio
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', lineHeight: '36px', color: '#1e293b' }}>
                  {loading ? '-' : `${roiMedio}%`}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#FF7A00',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '600'
                }}>
                  <TrendingUp size={12} />
                  +18% este mês
                </div>
              </div>
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#64748b', 
              marginTop: '12px',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '12px'
            }}>
              🟢 Retorno sobre investimento
            </div>
          </Card>

          {/* Card 4: Consultas/Mês */}
          <Card 
            style={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar size={28} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                  Consultas/Mês
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', lineHeight: '36px', color: '#1e293b' }}>
                  {loading ? '-' : totalConsultas.toLocaleString()}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#FF7A00',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '600'
                }}>
                  <TrendingUp size={12} />
                  +20% agendamentos
                </div>
              </div>
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#64748b', 
              marginTop: '12px',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '12px'
            }}>
              🟢 Consultas agendadas mensalmente
            </div>
          </Card>
        </div>

        {/* Placeholder para próximas seções */}
        <Card style={{ 
          borderRadius: '12px',
          textAlign: 'center',
          padding: '40px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: '2px dashed #cbd5e1'
        }}>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>
            🚀 Próximas Seções
          </div>
          <div style={{ color: '#94a3b8' }}>
            Receita Clínicas • Performance Agentes • Especialidades + Trends
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default SevenScaleDashboard;