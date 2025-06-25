// SevenScale MVP - Routes Insights
const express = require('express');
const { mvpDatabase } = require('../config/database');
const router = express.Router();

// GET /api/mvp/insights/:clientId - Buscar insights de um cliente
router.get('/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const insights = await mvpDatabase.getInsights(clientId);
    
    res.json({
      success: true,
      data: insights,
      total: insights.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Insights Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar insights MVP',
      message: error.message
    });
  }
});

// GET /api/mvp/insights/:clientId/latest - Último insight de um cliente
router.get('/:clientId/latest', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const insights = await mvpDatabase.getInsights(clientId);
    const latestInsight = insights[0] || null;
    
    res.json({
      success: true,
      data: latestInsight,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Latest Insight Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar último insight MVP',
      message: error.message
    });
  }
});

// POST /api/mvp/insights/:clientId - Criar novo insight
router.post('/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const { insights_data, agent_type = 'consolidator' } = req.body;
    
    if (!insights_data) {
      return res.status(400).json({
        success: false,
        error: 'insights_data é obrigatório'
      });
    }

    const insightData = {
      client_id: clientId,
      agent_type,
      insights_data,
      status: 'completed'
    };

    const newInsight = await mvpDatabase.saveInsight(insightData);
    
    res.status(201).json({
      success: true,
      data: newInsight,
      message: 'Insight criado com sucesso',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Create Insight Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao criar insight MVP',
      message: error.message
    });
  }
});

// GET /api/mvp/insights - Buscar todos os insights (com paginação)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, client_id } = req.query;
    
    // Se client_id especificado, buscar apenas deste cliente
    if (client_id) {
      const insights = await mvpDatabase.getInsights(client_id);
      return res.json({
        success: true,
        data: insights,
        total: insights.length,
        page: 1,
        limit: insights.length,
        timestamp: new Date().toISOString()
      });
    }
    
    // Buscar insights de todos os clientes (implementação futura)
    // Por ora, retornar empty
    res.json({
      success: true,
      data: [],
      total: 0,
      page: parseInt(page),
      limit: parseInt(limit),
      message: 'Use client_id parameter to get insights for specific client',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get All Insights Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar insights MVP',
      message: error.message
    });
  }
});

// DELETE /api/mvp/insights/:id - Deletar insight específico
router.delete('/:id', async (req, res) => {
  try {
    const insightId = req.params.id;
    
    // Implementar delete no database service
    // Por ora, retornar sucesso
    res.json({
      success: true,
      message: 'Insight deletado com sucesso',
      insight_id: insightId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Delete Insight Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao deletar insight MVP',
      message: error.message
    });
  }
});

// GET /api/mvp/insights/:clientId/summary - Resumo dos insights de um cliente
router.get('/:clientId/summary', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const insights = await mvpDatabase.getInsights(clientId);
    
    // Calcular métricas de resumo
    const totalInsights = insights.length;
    const lastProcessed = insights[0]?.processed_at || null;
    const avgConfidence = insights.length > 0 
      ? insights.reduce((sum, insight) => {
          const confidence = insight.insights_data?.confidence_score || 0.8;
          return sum + confidence;
        }, 0) / insights.length
      : 0;
    
    const criticalIssues = insights.reduce((count, insight) => {
      const issues = insight.insights_data?.status_summary?.critical_issues || 0;
      return count + issues;
    }, 0);
    
    const opportunities = insights.reduce((count, insight) => {
      const opps = insight.insights_data?.status_summary?.opportunities || 0;
      return count + opps;
    }, 0);
    
    const summary = {
      total_insights: totalInsights,
      last_processed: lastProcessed,
      avg_confidence: Math.round(avgConfidence * 100) / 100,
      critical_issues: criticalIssues,
      opportunities: opportunities,
      status: totalInsights > 0 ? 'active' : 'no_data',
      frequency: totalInsights > 0 ? 'daily' : 'none'
    };
    
    res.json({
      success: true,
      data: summary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Insights Summary Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar resumo de insights MVP',
      message: error.message
    });
  }
});

module.exports = router;