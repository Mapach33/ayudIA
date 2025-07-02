const axios = require('axios');
const config = require('../config/config');

class OllamaService {
  constructor() {
    this.baseUrl = config.ollama.baseUrl;
    this.model = config.ollama.model;
    this.systemPrompt = this.buildSystemPrompt();
  }

  buildSystemPrompt() {
    const company = config.company;
    return `Eres un asistente virtual de ${company.name}. 

INFORMACIÓN DE LA EMPRESA:
- Nombre: ${company.name}
- Descripción: ${company.description}
- Teléfono: ${company.phone}
- Email: ${company.email}
- Sitio web: ${company.website}
- Dirección: ${company.address}
- Horarios de atención: ${company.workingHours}

INSTRUCCIONES:
1. Responde siempre de manera profesional y amigable
2. Mantén las respuestas concisas pero informativas
3. Si te preguntan por información de la empresa, usa los datos proporcionados
4. Si no tienes información específica, ofrece alternativas de contacto
5. Ayuda con consultas generales relacionadas con los servicios de la empresa
6. Mantén un tono conversacional pero profesional
7. Si alguien necesita atención urgente, proporciona los datos de contacto

Recuerda que representas a ${company.name} en todo momento.`;
  }

  async generateResponse(userMessage, phoneNumber = null) {
    try {
      // Log del mensaje recibido en desarrollo
      if (config.NODE_ENV === 'development' && phoneNumber) {
        console.log(`🧠 Procesando mensaje de ${phoneNumber}: ${userMessage}`);
      }

      // Verificar si usar detección de palabras clave
      if (config.bot.botBehavior.useKeywordDetection) {
        const keywordResponse = this.checkKeywords(userMessage);
        if (keywordResponse) {
          return keywordResponse;
        }
        
        // Si no hay respuesta de palabras clave y no debe usar IA como fallback
        if (!config.bot.botBehavior.fallbackToAI) {
          return "Lo siento, no entendí tu mensaje. ¿Podrías ser más específico?";
        }
      }

      const response = await axios.post(`${this.baseUrl}/api/chat`, {
        model: this.model,
        stream: false,
        messages: [
          {
            role: 'system',
            content: this.buildSystemPrompt()
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        options: {
          temperature: config.bot.aiSettings.temperature || 0.7,
          top_p: 0.9,
          max_tokens: config.bot.aiSettings.maxTokens || 500
        }
      });

      let botResponse = response.data.message.content;
      
      // Aplicar configuraciones de estilo
      if (!config.bot.aiSettings.includeEmojis) {
        botResponse = botResponse.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
      }
      
      // Limitar longitud si está configurado
      if (config.bot.aiSettings.maxResponseLength && botResponse.length > config.bot.aiSettings.maxResponseLength) {
        botResponse = botResponse.substring(0, config.bot.aiSettings.maxResponseLength) + '...';
      }
      
      return botResponse;

    } catch (error) {
      console.error('❌ Error con Ollama:', error.message);
      throw new Error('Error al generar respuesta con Ollama');
    }
  }

  // Verificar palabras clave y devolver respuesta automática
  checkKeywords(message) {
    const lowerMessage = message.toLowerCase();
    const keywords = config.bot.keywords;
    const responses = config.bot.autoResponses;
    
    // Verificar cada categoría de palabras clave
    for (const [category, keywordList] of Object.entries(keywords)) {
      for (const keyword of keywordList) {
        if (lowerMessage.includes(keyword)) {
          let response = responses[category] || '';
          
          // Reemplazar placeholders con información de la empresa
          response = response.replace(/{company_name}/g, config.company.name);
          response = response.replace(/{company_phone}/g, config.company.phone);
          response = response.replace(/{company_email}/g, config.company.email);
          response = response.replace(/{company_website}/g, config.company.website);
          response = response.replace(/{company_address}/g, config.company.address);
          response = response.replace(/{company_services}/g, config.company.services);
          
          return response;
        }
      }
    }
    
    return null;
  }

  async healthCheck() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/tags`);
      return response.status === 200;
    } catch (error) {
      console.error('❌ Error verificando Ollama:', error.message);
      return false;
    }
  }

  updateSystemPrompt(newPrompt) {
    this.systemPrompt = newPrompt;
    console.log('✅ System prompt actualizado');
  }
}

module.exports = new OllamaService();
