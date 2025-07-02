const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('../config/config');

class ConfigPanel {
  constructor() {
    this.app = express();
    this.port = config.PANEL_PORT;
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../web')));
  }

  setupRoutes() {
    // Obtener configuración actual
    this.app.get('/api/config', (req, res) => {
      try {
        const currentConfig = {
          company: config.company,
          bot: config.bot,
          ollama: config.ollama
        };
        res.json(currentConfig);
      } catch (error) {
        res.status(500).json({ error: 'Error obteniendo configuración' });
      }
    });

    // Actualizar configuración del bot
    this.app.post('/api/config/bot', (req, res) => {
      try {
        const { keywords, autoResponses, aiSettings, botBehavior } = req.body;
        
        const newConfig = {};
        if (keywords) newConfig.keywords = keywords;
        if (autoResponses) newConfig.autoResponses = autoResponses;
        if (aiSettings) newConfig.aiSettings = aiSettings;
        if (botBehavior) newConfig.botBehavior = botBehavior;

        const success = config.updateBotConfig(newConfig);
        
        if (success) {
          res.json({ 
            success: true, 
            message: 'Configuración actualizada correctamente',
            config: config.bot 
          });
        } else {
          res.status(500).json({ error: 'Error guardando configuración' });
        }
      } catch (error) {
        res.status(400).json({ error: 'Datos de configuración inválidos' });
      }
    });

    // Reiniciar configuración a valores por defecto
    this.app.post('/api/config/reset', (req, res) => {
      try {
        config.reloadBotConfig();
        res.json({ 
          success: true, 
          message: 'Configuración reiniciada a valores por defecto',
          config: config.bot 
        });
      } catch (error) {
        res.status(500).json({ error: 'Error reiniciando configuración' });
      }
    });

    // Estado del bot
    this.app.get('/api/status', (req, res) => {
      res.json({
        status: 'running',
        uptime: process.uptime(),
        company: config.company.name,
        model: config.ollama.model,
        environment: config.NODE_ENV
      });
    });

    // Probar conexión con Ollama
    this.app.get('/api/test-ollama', async (req, res) => {
      try {
        const ollamaService = require('./ollamaService');
        const isHealthy = await ollamaService.healthCheck();
        res.json({ 
          connected: isHealthy,
          url: config.ollama.baseUrl,
          model: config.ollama.model
        });
      } catch (error) {
        res.status(500).json({ 
          connected: false, 
          error: error.message 
        });
      }
    });

    // Servir la aplicación web
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../web/index.html'));
    });
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`🎛️  Panel de configuración disponible en: http://localhost:${this.port}`);
    });
    return this.server;
  }

  stop() {
    if (this.server) {
      this.server.close();
    }
  }
}

module.exports = ConfigPanel;
