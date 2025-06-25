// SevenScale MVP - Componente KPI Card
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  loading?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-600',
  trend,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="flex items-center">
          <div className="p-2 bg-gray-200 rounded-lg">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${iconColor.replace('text-', 'bg-').replace('600', '100')}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        {trend && (
          <div className={`text-right ${
            trend.positive !== false ? 'text-green-600' : 'text-red-600'
          }`}>
            <div className="flex items-center justify-end space-x-1">
              <span className="text-sm font-medium">
                {trend.positive !== false ? '+' : ''}{trend.value}%
              </span>
            </div>
            <p className="text-xs text-gray-500">{trend.label}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;