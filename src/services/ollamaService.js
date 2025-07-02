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

      const response = await axios.post(`${this.baseUrl}/api/chat`, {
        model: this.model,
        stream: false,
        messages: [
          {
            role: 'system',
            content: this.systemPrompt
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 500
        }
      });

      const botResponse = response.data.message.content;
      
      return botResponse;

    } catch (error) {
      console.error('❌ Error con Ollama:', error.message);
      throw new Error('Error al generar respuesta con Ollama');
    }
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
