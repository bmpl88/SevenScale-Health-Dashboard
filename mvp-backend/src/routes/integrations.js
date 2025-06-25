// SevenScale MVP - Routes Integrações
const express = require('express');
const { mvpDatabase } = require('../config/database');
const router = express.Router();

// GET /api/mvp/integrations/:clientId - Buscar integrações de um cliente
router.get('/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const integrations = await mvpDatabase.getIntegrations(clientId);
    
    // Calcular estatísticas
    const totalIntegrations = integrations.length;
    const connectedIntegrations = integrations.filter(i => i.status === 'connected').length;
    const errorIntegrations = integrations.filter(i => i.status === 'error').length;
    
    res.json({
      success: true,
      data: {
        integrations,
        summary: {
          total: totalIntegrations,
          connected: connectedIntegrations,
          error: errorIntegrations,
          disconnected: totalIntegrations - connectedIntegrations - errorIntegrations,
          coverage_percentage: totalIntegrations > 0 ? Math.round((connectedIntegrations / totalIntegrations) * 100) : 0
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Integrations Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar integrações',
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
    
    // Simular sincronização (em produção, aqui ficaria a lógica real de cada API)
    const syncResult = await simulateIntegrationSync(integration_type);
    
    // Atualizar status no banco
    const updatedIntegration = await mvpDatabase.updateIntegrationStatus(
      clientId, 
      integration_type, 
      syncResult.status
    );
    
    res.json({
      success: true,
      data: {
        integration: updatedIntegration,
        sync_result: syncResult
      },
      message: `Sincronização ${syncResult.status} para ${integration_type}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Sync Integration Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha na sincronização',
      message: error.message
    });
  }
});

// POST /api/mvp/integrations/:clientId/connect - Conectar nova integração
router.post('/:clientId/connect', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const { integration_type, credentials } = req.body;
    
    if (!integration_type) {
      return res.status(400).json({
        success: false,
        error: 'integration_type é obrigatório'
      });
    }
    
    // Validar credenciais (simulado)
    const validationResult = await validateIntegrationCredentials(integration_type, credentials);
    
    if (!validationResult.valid) {
      return res.status(400).json({
        success: false,
        error: 'Credenciais inválidas',
        details: validationResult.error
      });
    }
    
    // Salvar integração
    const { supabase } = require('../config/database');
    const { data, error } = await supabase
      .from('mvp_client_integrations')
      .upsert({
        client_id: clientId,
        integration_type,
        status: 'connected',
        credentials: credentials ? JSON.stringify(credentials) : null,
        last_sync: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({
      success: true,
      data: data,
      message: `Integração ${integration_type} conectada com sucesso`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Connect Integration Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao conectar integração',
      message: error.message
    });
  }
});

// DELETE /api/mvp/integrations/:clientId/:integrationType - Desconectar integração
router.delete('/:clientId/:integrationType', async (req, res) => {
  try {
    const { clientId, integrationType } = req.params;
    
    const updatedIntegration = await mvpDatabase.updateIntegrationStatus(
      clientId, 
      integrationType, 
      'disconnected'
    );
    
    res.json({
      success: true,
      data: updatedIntegration,
      message: `Integração ${integrationType} desconectada`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Disconnect Integration Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao desconectar integração',
      message: error.message
    });
  }
});

// GET /api/mvp/integrations/:clientId/:integrationType/data - Buscar dados de integração específica
router.get('/:clientId/:integrationType/data', async (req, res) => {
  try {
    const { clientId, integrationType } = req.params;
    const { period = '30_days', limit = 10 } = req.query;
    
    const { supabase } = require('../config/database');
    const { data, error } = await supabase
      .from('mvp_integration_data')
      .select('*')
      .eq('client_id', clientId)
      .eq('integration_type', integrationType)
      .eq('data_period', period)
      .order('collected_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    res.json({
      success: true,
      data: {
        integration_type: integrationType,
        period,
        records: data,
        total: data.length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Integration Data Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar dados da integração',
      message: error.message
    });
  }
});

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

// Simular sincronização de integração
async function simulateIntegrationSync(integrationType) {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simular sucesso/erro baseado no tipo
  const successRate = {
    hubspot: 0.9,
    google_analytics: 0.95,
    meta_ads: 0.8,
    google_calendar: 0.9,
    whatsapp: 0.85,
    rd_station: 0.75
  };
  
  const rate = successRate[integrationType] || 0.8;
  const isSuccess = Math.random() < rate;
  
  return {
    status: isSuccess ? 'connected' : 'error',
    message: isSuccess ? 'Sincronização bem-sucedida' : 'Erro na sincronização',
    data_collected: isSuccess ? Math.floor(Math.random() * 1000) + 100 : 0,
    sync_duration: Math.floor(Math.random() * 3000) + 500
  };
}

// Validar credenciais de integração
async function validateIntegrationCredentials(integrationType, credentials) {
  // Simular validação
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!credentials) {
    return { valid: false, error: 'Credenciais não fornecidas' };
  }
  
  // Simular validação específica por tipo
  switch (integrationType) {
    case 'hubspot':
      return { valid: !!credentials.api_key, error: credentials.api_key ? null : 'API Key HubSpot inválida' };
    case 'google_analytics':
      return { valid: !!credentials.view_id, error: credentials.view_id ? null : 'View ID Google Analytics inválido' };
    case 'meta_ads':
      return { valid: !!credentials.access_token, error: credentials.access_token ? null : 'Access Token Meta inválido' };
    default:
      return { valid: true, error: null };
  }
}

module.exports = router;