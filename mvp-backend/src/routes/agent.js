// SevenScale MVP - Routes Agente Consolidador
const express = require('express');
const { mvpDatabase } = require('../config/database');
const { generateMVPInsights, testGPT4Connection } = require('../config/openai');
const router = express.Router();

// GET /api/mvp/agent/status - Status do agente MVP
router.get('/status', async (req, res) => {
  try {
    // Testar conexões
    const [clients, gptTest] = await Promise.all([
      mvpDatabase.getClients(),
      testGPT4Connection().catch(err => err.message)
    ]);

    const status = {
      agent_status: 'active',
      gpt4_connection: typeof gptTest === 'string' && gptTest.includes('MVP') ? 'connected' : 'error',
      database_connection: 'connected',
      clients_total: clients.length,
      clients_active: clients.filter(c => c.status === 'operational').length,
      last_check: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Agent Status Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao verificar status do agente MVP',
      message: error.message
    });
  }
});

// POST /api/mvp/agent/process/:clientId - Processar insights para cliente específico
router.post('/process/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    
    // Buscar dados do cliente
    const [client, integrations] = await Promise.all([
      mvpDatabase.getClient(clientId),
      mvpDatabase.getIntegrations(clientId)
    ]);

    // Simular dados consolidados das APIs (MVP)
    const consolidatedData = {
      client: {
        name: client.nome_clinica,
        specialty: client.especialidade,
        location: client.cidade,
        performance: client.performance,
        revenue: client.revenue,
        patients: client.patients
      },
      period: "últimos 30 dias",
      integrations_status: integrations.reduce((acc, int) => {
        acc[int.integration_type] = int.status;
        return acc;
      }, {}),
      // Dados simulados para MVP
      hubspot: {
        leads: 45,
        conversions: 12,
        pipeline_value: 89500,
        conversion_rate: 26.7
      },
      google_analytics: {
        sessions: 2340,
        users: 1890,
        conversions: 28,
        bounce_rate: 34.5
      },
      meta_ads: {
        impressions: 15000,
        clicks: 450,
        conversions: 18,
        cpa: 156,
        roas: 2.8
      }
    };

    // Gerar insights com GPT-4
    const insights = await generateMVPInsights(consolidatedData);

    // Salvar insights no banco
    const savedInsight = await mvpDatabase.saveInsight({
      client_id: clientId,
      agent_type: 'consolidator',
      insights_data: insights,
      status: 'completed'
    });
    
    res.json({
      success: true,
      data: {
        insight: savedInsight,
        generated_insights: insights
      },
      message: `Insights processados para ${client.nome_clinica}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Agent Process Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao processar insights MVP',
      message: error.message
    });
  }
});

// POST /api/mvp/agent/process-all - Processar todos os clientes
router.post('/process-all', async (req, res) => {
  try {
    const clients = await mvpDatabase.getClients();
    const results = [];

    for (const client of clients) {
      try {
        // Processar cada cliente (versão simplificada)
        const integrations = await mvpDatabase.getIntegrations(client.id);
        
        const consolidatedData = {
          client: {
            name: client.nome_clinica,
            specialty: client.especialidade,
            performance: client.performance
          },
          integrations_count: integrations.length,
          active_integrations: integrations.filter(i => i.status === 'connected').length
        };

        const insights = await generateMVPInsights(consolidatedData);
        
        const savedInsight = await mvpDatabase.saveInsight({
          client_id: client.id,
          agent_type: 'consolidator',
          insights_data: insights,
          status: 'completed'
        });

        results.push({
          client_id: client.id,
          client_name: client.nome_clinica,
          status: 'success',
          insight_id: savedInsight.id
        });
      } catch (error) {
        results.push({
          client_id: client.id,
          client_name: client.nome_clinica,
          status: 'error',
          error: error.message
        });
      }
    }
    
    res.json({
      success: true,
      data: {
        processed: results.length,
        successful: results.filter(r => r.status === 'success').length,
        failed: results.filter(r => r.status === 'error').length,
        results
      },
      message: 'Processamento em lote concluído',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Agent Process All Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha no processamento em lote MVP',
      message: error.message
    });
  }
});

module.exports = router;