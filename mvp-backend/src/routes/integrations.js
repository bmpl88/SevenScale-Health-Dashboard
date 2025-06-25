// SevenScale MVP - Routes Integrações
const express = require('express');
const { mvpDatabase } = require('../config/database');
const router = express.Router();

// Lista das 6 integrações core do MVP
const CORE_INTEGRATIONS = [
  'hubspot',
  'google_analytics', 
  'meta_ads',
  'google_calendar',
  'whatsapp',
  'rd_station'
];

// GET /api/mvp/integrations/:clientId - Buscar integrações de um cliente
router.get('/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const integrations = await mvpDatabase.getIntegrations(clientId);
    
    // Calcular estatísticas
    const connected = integrations.filter(i => i.status === 'connected').length;
    const total = integrations.length;
    const errors = integrations.filter(i => i.status === 'error').length;
    
    res.json({
      success: true,
      data: {
        integrations,
        stats: {
          total,
          connected,
          disconnected: total - connected - errors,
          errors,
          coverage_percentage: total > 0 ? Math.round((connected / total) * 100) : 0
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Integrations Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar integrações MVP',
      message: error.message
    });
  }
});

// POST /api/mvp/integrations/:clientId/sync - Sincronizar integração específica
router.post('/:clientId/sync', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const { integration_type } = req.body;
    
    if (!integration_type) {
      return res.status(400).json({
        success: false,
        error: 'integration_type é obrigatório'
      });
    }
    
    if (!CORE_INTEGRATIONS.includes(integration_type)) {
      return res.status(400).json({
        success: false,
        error: `integration_type deve ser um dos: ${CORE_INTEGRATIONS.join(', ')}`
      });
    }
    
    // Simular sincronização (em produção, chamar APIs reais)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Atualizar status da integração
    const updatedIntegration = await mvpDatabase.updateIntegrationStatus(
      clientId, 
      integration_type, 
      'connected'
    );
    
    res.json({
      success: true,
      data: updatedIntegration,
      message: `Integração ${integration_type} sincronizada com sucesso`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Sync Integration Error:', error);
    
    // Em caso de erro, marcar integração como erro
    if (req.body.integration_type) {
      try {
        await mvpDatabase.updateIntegrationStatus(
          req.params.clientId,
          req.body.integration_type,
          'error'
        );
      } catch (updateError) {
        console.error('Error updating integration status:', updateError);
      }
    }
    
    res.status(500).json({
      success: false,
      error: 'Falha na sincronização da integração MVP',
      message: error.message
    });
  }
});

// POST /api/mvp/integrations/:clientId/setup - Configurar todas integrações core
router.post('/:clientId/setup', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const results = [];
    
    // Configurar todas as 6 integrações core
    for (const integrationType of CORE_INTEGRATIONS) {
      try {
        await mvpDatabase.updateIntegrationStatus(
          clientId,
          integrationType,
          'disconnected'
        );
        
        results.push({
          integration_type: integrationType,
          status: 'configured',
          message: 'Pronto para conectar'
        });
      } catch (error) {
        results.push({
          integration_type: integrationType,
          status: 'error',
          message: error.message
        });
      }
    }
    
    const successful = results.filter(r => r.status === 'configured').length;
    const failed = results.filter(r => r.status === 'error').length;
    
    res.json({
      success: true,
      data: {
        results,
        summary: {
          total: CORE_INTEGRATIONS.length,
          successful,
          failed
        }
      },
      message: `Setup completo: ${successful} configuradas, ${failed} com erro`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Setup Integrations Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha no setup das integrações MVP',
      message: error.message
    });
  }
});

// GET /api/mvp/integrations/:clientId/:integrationType - Buscar integração específica
router.get('/:clientId/:integrationType', async (req, res) => {
  try {
    const { clientId, integrationType } = req.params;
    
    const integrations = await mvpDatabase.getIntegrations(clientId);
    const integration = integrations.find(i => i.integration_type === integrationType);
    
    if (!integration) {
      return res.status(404).json({
        success: false,
        error: 'Integração não encontrada',
        integration_type: integrationType
      });
    }
    
    res.json({
      success: true,
      data: integration,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Integration Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar integração MVP',
      message: error.message
    });
  }
});

// PUT /api/mvp/integrations/:clientId/:integrationType - Atualizar integração
router.put('/:clientId/:integrationType', async (req, res) => {
  try {
    const { clientId, integrationType } = req.params;
    const { status, credentials, error_message } = req.body;
    
    if (!['connected', 'disconnected', 'error'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Status deve ser: connected, disconnected ou error'
      });
    }
    
    // Atualizar no banco (implementar método completo no database service)
    const updatedIntegration = await mvpDatabase.updateIntegrationStatus(
      clientId,
      integrationType,
      status
    );
    
    res.json({
      success: true,
      data: updatedIntegration,
      message: `Integração ${integrationType} atualizada para ${status}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Update Integration Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao atualizar integração MVP',
      message: error.message
    });
  }
});

// GET /api/mvp/integrations - Buscar status geral das integrações
router.get('/', async (req, res) => {
  try {
    // Buscar estatísticas gerais de todas as integrações
    // Por ora, retornar dados consolidados simulados
    const stats = {
      core_integrations: CORE_INTEGRATIONS,
      total_integrations: CORE_INTEGRATIONS.length,
      most_used: ['hubspot', 'google_analytics', 'whatsapp'],
      least_used: ['rd_station'],
      avg_connections_per_client: 3.5,
      status: 'operational'
    };
    
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Integrations Stats Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar estatísticas de integrações MVP',
      message: error.message
    });
  }
});

module.exports = router;