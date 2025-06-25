// SevenScale MVP - Página Clientes
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  MapPin, 
  Mail, 
  Phone,
  TrendingUp,
  Users as UsersIcon,
  Activity
} from 'lucide-react';
import { useMVP } from '../context/MVPContext';

const Clientes = () => {
  const { clients, loading } = useMVP();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredClients = clients.filter(client =>
    client.nome_clinica.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.cidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'attention': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'Operacional';
      case 'attention': return 'Atenção';
      case 'critical': return 'Crítico';
      default: return 'Desconhecido';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-600">Carregando clientes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes MVP</h1>
          <p className="text-gray-600">{clients.length} clínicas ativas no MVP</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
          disabled={clients.length >= 10}
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Cliente</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por clínica, especialidade ou cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
              <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Performance Média</p>
              <p className="text-2xl font-bold text-gray-900">
                {clients.length > 0 
                  ? Math.round(clients.reduce((sum, c) => sum + c.performance, 0) / clients.length)
                  : 0
                }/100
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pacientes</p>
              <p className="text-2xl font-bold text-gray-900">
                {clients.reduce((sum, c) => sum + c.patients, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {client.nome_clinica}
                  </h3>
                  <p className="text-sm text-gray-600">{client.especialidade}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                  {getStatusText(client.status)}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {client.cidade}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email_contato}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{client.performance}</p>
                  <p className="text-xs text-gray-600">Performance</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{client.patients}</p>
                  <p className="text-xs text-gray-600">Pacientes</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{client.revenue}</p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
              </div>

              {/* Action */}
              <Link
                to={`/cliente/${client.id}`}
                className="w-full btn-primary text-center block"
              >
                Ver Dashboard
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Tente ajustar os termos de busca'
              : 'Adicione o primeiro cliente para começar'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              Adicionar Primeiro Cliente
            </button>
          )}
        </div>
      )}

      {/* Limit Notice */}
      {clients.length >= 10 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <Activity className="w-5 h-5 text-orange-500 mr-2" />
            <div>
              <p className="text-sm font-medium text-orange-800">
                Limite MVP Atingido
              </p>
              <p className="text-sm text-orange-700">
                Este MVP suporta até 10 clientes. Para mais clientes, migre para a versão completa.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;