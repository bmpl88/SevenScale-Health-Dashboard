// SevenScale MVP - Servidor Backend Isolado
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8001; // Porta diferente do projeto maior

// Middlewares
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5174'], // Frontend MVP
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes MVP
app.use('/api/mvp/clients', require('./routes/clients'));
app.use('/api/mvp/insights', require('./routes/insights'));
app.use('/api/mvp/integrations', require('./routes/integrations'));
app.use('/api/mvp/agent', require('./routes/agent'));

// Health check MVP
app.get('/api/mvp/health', (req, res) => {
  res.json({
    status: 'MVP Backend Online',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    clients_active: 3,
    integrations: 6
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'MVP Endpoint not found',
    available_endpoints: [
      '/api/mvp/health',
      '/api/mvp/clients',
      '/api/mvp/insights',
      '/api/mvp/integrations',
      '/api/mvp/agent'
    ]
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('MVP Backend Error:', err);
  res.status(500).json({
    error: 'MVP Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start MVP Server
app.listen(PORT, () => {
  console.log(`🚀 SevenScale MVP Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/mvp/health`);
  console.log(`🎯 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;