// Mock de datos para desarrollo
export const mockConfig = {
  company: {
    name: 'AyudIA Bot Demo'
  },
  bot: {
    keywords: {
      greeting: ['hola', 'buenas', 'buenos días'],
      farewell: ['adiós', 'hasta luego', 'nos vemos'],
      help: ['ayuda', 'necesito ayuda', 'soporte'],
      contact: ['contacto', 'teléfono', 'dirección'],
      services: ['servicios', 'qué hacen', 'productos']
    },
    autoResponses: {
      greeting: '¡Hola! Bienvenido a AyudIA. ¿En qué puedo ayudarte hoy?',
      farewell: '¡Hasta luego! Que tengas un excelente día.',
      help: 'Estoy aquí para ayudarte. ¿Qué necesitas saber?',
      contact: 'Puedes contactarnos al teléfono: +1234567890 o por email: contacto@ayudia.com',
      services: 'Ofrecemos asistencia virtual inteligente 24/7 para tu negocio.'
    },
    aiSettings: {
      temperature: 0.7,
      maxTokens: 500,
      responseStyle: 'profesional',
      includeEmojis: false
    },
    botBehavior: {
      useKeywordDetection: true,
      fallbackToAI: true,
      autoGreeting: false,
      typingIndicator: true,
      businessHoursOnly: false
    }
  }
};

export const mockStatus = {
  uptime: 3665, // segundos
  environment: 'desarrollo',
  company: 'AyudIA Bot Demo'
};

export const mockOllamaStatus = {
  connected: true,
  url: 'http://localhost:11434',
  model: 'llama2'
};

// Mock de las APIs
export const mockAPI = {
  async getConfig() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockConfig;
  },

  async saveConfig(config) {
    await new Promise(resolve => setTimeout(resolve, 300));
    // En un entorno real, aquí guardarías la configuración
    return { success: true, config };
  },

  async resetConfig() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, config: mockConfig.bot };
  },

  async getStatus() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockStatus;
  },

  async testOllama() {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockOllamaStatus;
  }
};
