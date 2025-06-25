// SevenScale MVP - Componente Client Card
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Activity,
  Users,
  DollarSign,
  ExternalLink
} from 'lucide-react';

interface ClientCardProps {
  client: {
    id: string;
    nome_clinica: string;
    especialidade: string;
    cidade: string;
    email_contato: string;
    telefone?: string;
    website?: string;
    status: 'operational' | 'attention' | 'critical';
    performance: number;
    revenue: string;
    patients: number;
  };
  showActions?: boolean;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, showActions = true }) => {
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

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 75) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
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

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{client.cidade}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{client.email_contato}</span>
          </div>
          {client.telefone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{client.telefone}</span>
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Activity className={`w-4 h-4 ${getPerformanceColor(client.performance)}`} />
            </div>
            <p className={`text-lg font-semibold ${getPerformanceColor(client.performance)}`}>
              {client.performance}
            </p>
            <p className="text-xs text-gray-600">Performance</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{client.patients}</p>
            <p className="text-xs text-gray-600">Pacientes</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{client.revenue}</p>
            <p className="text-xs text-gray-600">Revenue</p>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="space-y-2">
            <Link
              to={`/cliente/${client.id}`}
              className="w-full btn-primary text-center block"
            >
              Ver Dashboard
            </Link>
            
            <div className="flex items-center space-x-2">
              <Link
                to={`/integracoes?client=${client.id}`}
                className="flex-1 btn-secondary text-center text-sm"
              >
                Integrações
              </Link>
              
              {client.website && (
                <a
                  href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm p-2"
                  title="Visitar website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCard;