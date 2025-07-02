require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Archivo para configuraciones dinámicas
const configFile = path.join(__dirname, '../../data/bot-config.json');

// Configuración por defecto
const defaultBotConfig = {
  // Palabras clave y respuestas automáticas
  keywords: {
    greeting: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'hi'],
    farewell: ['adiós', 'bye', 'nos vemos', 'hasta luego', 'chau'],
    help: ['ayuda', 'help', 'información', 'info'],
    contact: ['contacto', 'teléfono', 'email', 'dirección'],
    services: ['servicios', 'productos', 'qué hacen', 'que ofrecen']
  },
  
  // Respuestas automáticas
  autoResponses: {
    greeting: "¡Hola! 👋 Soy el asistente virtual de {company_name}. ¿En qué puedo ayudarte hoy?",
    farewell: "¡Hasta luego! 👋 Que tengas un excelente día. Recuerda que estoy aquí para ayudarte cuando lo necesites.",
    help: "Puedo ayudarte con información sobre {company_name}, nuestros servicios, horarios de atención y datos de contacto. ¿Qué te gustaría saber?",
    contact: "📞 Teléfono: {company_phone}\n📧 Email: {company_email}\n🌐 Web: {company_website}\n📍 Dirección: {company_address}",
    services: "Nuestros principales servicios incluyen:\n{company_services}\n\n¿Te gustaría más información sobre algún servicio en particular?"
  },
  
  // Configuraciones del modelo IA
  aiSettings: {
    temperature: 0.7,
    maxTokens: 500,
    responseStyle: 'profesional', // profesional, casual, técnico
    includeEmojis: true,
    maxResponseLength: 500
  },
  
  // Configuraciones de comportamiento
  botBehavior: {
    useKeywordDetection: true,
    fallbackToAI: true,
    saveConversations: false,
    autoGreeting: true,
    businessHoursOnly: false,
    typingIndicator: true
  }
};

// Cargar configuración dinámica
function loadBotConfig() {
  try {
    if (fs.existsSync(configFile)) {
      const data = fs.readFileSync(configFile, 'utf8');
      return { ...defaultBotConfig, ...JSON.parse(data) };
    }
  } catch (error) {
    console.warn('Error cargando configuración del bot, usando por defecto:', error.message);
  }
  return defaultBotConfig;
}

// Guardar configuración dinámica
function saveBotConfig(newConfig) {
  try {
    // Crear directorio data si no existe
    const dataDir = path.dirname(configFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(configFile, JSON.stringify(newConfig, null, 2));
    return true;
  } catch (error) {
    console.error('Error guardando configuración:', error.message);
    return false;
  }
}

const config = {
  // Entorno
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  PANEL_PORT: process.env.PANEL_PORT || 3001,
  
  // Ollama
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    model: process.env.OLLAMA_MODEL || 'gemma3n:e4b',
  },
  
  // Información de la empresa
  company: {
    name: process.env.COMPANY_NAME || 'Mi Empresa',
    description: process.env.COMPANY_DESCRIPTION || 'Una empresa dedicada a brindar excelentes servicios',
    phone: process.env.COMPANY_PHONE || '+1234567890',
    email: process.env.COMPANY_EMAIL || 'contacto@miempresa.com',
    website: process.env.COMPANY_WEBSITE || 'https://miempresa.com',
    address: process.env.COMPANY_ADDRESS || 'Calle Principal 123, Ciudad, País',
    workingHours: process.env.COMPANY_WORKING_HOURS || 'Lunes a Viernes de 9:00 AM a 6:00 PM',
    services: process.env.COMPANY_SERVICES || 'Desarrollo de software, Consultoría tecnológica, Soporte técnico'
  },
  
  // Configuración dinámica del bot
  bot: loadBotConfig(),
  
  // Métodos para manejar configuración
  updateBotConfig: function(newConfig) {
    this.bot = { ...this.bot, ...newConfig };
    return saveBotConfig(this.bot);
  },
  
  reloadBotConfig: function() {
    this.bot = loadBotConfig();
    return this.bot;
  }
};

module.exports = config;
