// SevenScale MVP - Routes Clientes Isolados
const express = require('express');
const { mvpDatabase } = require('../config/database');
const router = express.Router();

// GET /api/mvp/clients - Listar todos os clientes MVP
router.get('/', async (req, res) => {
  try {
    const clients = await mvpDatabase.getClients();
    
    res.json({
      success: true,
      data: clients,
      total: clients.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Clients Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar clientes MVP',
      message: error.message
    });
  }
});

// GET /api/mvp/clients/:id - Buscar cliente específico
router.get('/:id', async (req, res) => {
  try {
    const client = await mvpDatabase.getClient(req.params.id);
    
    res.json({
      success: true,
      data: client,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Client Error:', error);
    res.status(404).json({
      success: false,
      error: 'Cliente MVP não encontrado',
      message: error.message
    });
  }
});

// POST /api/mvp/clients - Criar novo cliente MVP
router.post('/', async (req, res) => {
  try {
    const { nome_clinica, especialidade, cidade, email_contato, telefone, website } = req.body;
    
    // Validação básica
    if (!nome_clinica || !especialidade || !email_contato) {
      return res.status(400).json({
        success: false,
        error: 'Dados obrigatórios: nome_clinica, especialidade, email_contato'
      });
    }

    const clientData = {
      nome_clinica,
      especialidade,
      cidade,
      email_contato,
      telefone,
      website,
      status: 'operational',
      performance: 0,
      patients: 0
    };

    const newClient = await mvpDatabase.createClient(clientData);
    
    res.status(201).json({
      success: true,
      data: newClient,
      message: 'Cliente MVP criado com sucesso',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Create Client Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao criar cliente MVP',
      message: error.message
    });
  }
});

// GET /api/mvp/clients/:id/dashboard - Dashboard específico do cliente
router.get('/:id/dashboard', async (req, res) => {
  try {
    const clientId = req.params.id;
    
    // Buscar dados consolidados do cliente
    const [client, insights, integrations] = await Promise.all([
      mvpDatabase.getClient(clientId),
      mvpDatabase.getInsights(clientId),
      mvpDatabase.getIntegrations(clientId)
    ]);

    // Calcular métricas
    const activeIntegrations = integrations.filter(i => i.status === 'connected').length;
    const totalIntegrations = integrations.length;
    const latestInsight = insights[0] || null;

    const dashboardData = {
      client,
      insights: {
        latest: latestInsight,
        total: insights.length
      },
      integrations: {
        active: activeIntegrations,
        total: totalIntegrations,
        percentage: totalIntegrations > 0 ? Math.round((activeIntegrations / totalIntegrations) * 100) : 0,
        list: integrations
      },
      status: {
        overall: client.status,
        performance: client.performance,
        health: activeIntegrations >= 3 ? 'good' : 'attention'
      }
    };
    
    res.json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Client Dashboard Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar dashboard do cliente MVP',
      message: error.message
    });
  }
});

module.exports = router;