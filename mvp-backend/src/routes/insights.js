// SevenScale MVP - Routes Insights
const express = require('express');
const { mvpDatabase } = require('../config/database');
const router = express.Router();

// GET /api/mvp/insights/:clientId - Buscar insights de um cliente
router.get('/:clientId', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const { limit = 10, offset = 0 } = req.query;
    
    const insights = await mvpDatabase.getInsights(clientId);
    
    // Paginar resultados
    const paginatedInsights = insights.slice(offset, offset + parseInt(limit));
    
    res.json({
      success: true,
      data: {
        insights: paginatedInsights,
        total: insights.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get Insights Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar insights',
      message: error.message
    });
  }
});

// GET /api/mvp/insights/:clientId/latest - Último insight do cliente
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
      error: 'Falha ao buscar último insight',
      message: error.message
    });
  }
});

// GET /api/mvp/insights/:clientId/summary - Resumo dos insights
router.get('/:clientId/summary', async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const insights = await mvpDatabase.getInsights(clientId);
    
    if (insights.length === 0) {
      return res.json({
        success: true,
        data: {
          total_insights: 0,
          latest_insight: null,
          insights_this_week: 0,
          average_confidence: 0
        }
      });
    }
    
    // Calcular estatísticas
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const insightsThisWeek = insights.filter(insight => 
      new Date(insight.processed_at) >= oneWeekAgo
    ).length;
    
    const summary = {
      total_insights: insights.length,
      latest_insight: insights[0],
      insights_this_week: insightsThisWeek,
      last_processed: insights[0]?.processed_at,
      client_id: clientId
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
      error: 'Falha ao gerar resumo dos insights',
      message: error.message
    });
  }
});

// DELETE /api/mvp/insights/:insightId - Deletar insight específico
router.delete('/:insightId', async (req, res) => {
  try {
    const { supabase } = require('../config/database');
    const insightId = req.params.insightId;
    
    const { error } = await supabase
      .from('mvp_agent_insights')
      .delete()
      .eq('id', insightId);
    
    if (error) throw error;
    
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
      error: 'Falha ao deletar insight',
      message: error.message
    });
  }
});

// GET /api/mvp/insights - Buscar todos os insights (para dashboard global)
router.get('/', async (req, res) => {
  try {
    const { supabase } = require('../config/database');
    const { limit = 20, status = 'completed' } = req.query;
    
    let query = supabase
      .from('mvp_agent_insights')
      .select(`
        *,
        mvp_clients!inner(
          nome_clinica,
          especialidade,
          cidade
        )
      `)
      .order('processed_at', { ascending: false })
      .limit(limit);
    
    if (status !== 'all') {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    res.json({
      success: true,
      data: {
        insights: data,
        total: data.length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MVP Get All Insights Error:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao buscar insights globais',
      message: error.message
    });
  }
});

module.exports = router;