import React from 'react';
import { Building2, Phone, Mail } from 'lucide-react';

const renderClientes = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Clientes SevenScale Health</h3>
          <p className="text-sm text-gray-500">Gestão de clínicas e centros médicos atendidos</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            + Nova Clínica
          </button>
          <button className="text-blue-600 text-sm hover:text-blue-700 border border-blue-200 px-4 py-2 rounded-lg">
            Exportar Lista
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Clínica São Roque', specialty: 'Cardiologia', patients: 1250, status: 'Ativo', growth: '+15%', color: 'bg-blue-500' },
          { name: 'Centro Médico Vida', specialty: 'Dermatologia', patients: 890, status: 'Ativo', growth: '+8%', color: 'bg-green-500' },
          { name: 'Hospital Santa Clara', specialty: 'Neurologia', patients: 2100, status: 'Ativo', growth: '+22%', color: 'bg-purple-500' },
          { name: 'Clínica Ortopédica Plus', specialty: 'Ortopedia', patients: 650, status: 'Ativo', growth: '+12%', color: 'bg-orange-500' },
          { name: 'Centro Pediátrico Alegria', specialty: 'Pediatria', patients: 1450, status: 'Ativo', growth: '+18%', color: 'bg-pink-500' },
          { name: 'Clínica Respirar Bem', specialty: 'Pneumologia', patients: 420, status: 'Ativo', growth: '+5%', color: 'bg-indigo-500' }
        ].map((clinic, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${clinic.color} rounded-lg flex items-center justify-center`}>
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{clinic.name}</h4>
                  <p className="text-sm text-gray-500">{clinic.specialty}</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{clinic.status}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pacientes</span>
                <span className="font-semibold text-gray-900">{clinic.patients.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Crescimento</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{clinic.growth}</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Ver Detalhes
              </button>
              <button className="text-gray-600 hover:text-gray-700 p-2">
                <Phone className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-700 p-2">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Atividade Recente dos Clientes</h3>
        <button className="text-blue-600 text-sm hover:text-blue-700">Ver Todas</button>
      </div>
      
      <div className="space-y-4">
        {[
          { title: 'Nova clínica implementada', subtitle: 'Clínica São Roque implementada através Sistema Saúde com sucesso', time: 'Completo', status: 'green' },
          { title: 'Expansão de serviços', subtitle: 'Centro Médico Vida adicionou novos serviços dermatológicos', time: 'Completo', status: 'green' },
          { title: 'Treinamento concluído', subtitle: 'Hospital Santa Clara finalizou treinamento dos agentes IMPULSO®', time: 'Completo', status: 'green' },
          { title: 'Integração em andamento', subtitle: 'Clínica Ortopédica Plus iniciando integração com pipeline', time: 'Processando', status: 'blue' },
          { title: 'Análise de performance', subtitle: 'Centro Pediátrico Alegria solicitou relatório de performance', time: 'Processando', status: 'blue' }
        ].map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              activity.status === 'green' ? 'bg-green-500' : 'bg-blue-500'
            }`} />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
              <p className="text-xs text-gray-500">{activity.subtitle}</p>
              <span className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                activity.status === 'green' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default renderClientes;