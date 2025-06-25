// SevenScale MVP - App Principal Isolado
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Integracoes from './pages/Integracoes';
import DashboardCliente from './pages/DashboardCliente';
import { MVPProvider } from './context/MVPContext';

function App() {
  return (
    <MVPProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="integracoes" element={<Integracoes />} />
            <Route path="cliente/:id" element={<DashboardCliente />} />
          </Route>
        </Routes>
      </div>
    </MVPProvider>
  );
}

export default App;