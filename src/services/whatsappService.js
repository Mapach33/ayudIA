const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const config = require('../config/config');
const ollamaService = require('./ollamaService');

class WhatsAppService {
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: { 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      },
    });

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    // Evento QR
    this.client.on('qr', (qr) => {
      console.log('\n🔗 Escanea este QR con tu WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    // Evento ready
    this.client.on('ready', async () => {
      console.log('✅ Bot de WhatsApp listo!');
      
      // Verificar conexión con Ollama
      const ollamaStatus = await ollamaService.healthCheck();
      if (ollamaStatus) {
        console.log('✅ Conexión con Ollama establecida');
      } else {
        console.log('❌ Error de conexión con Ollama');
      }
    });

    // Evento de mensajes
    this.client.on('message', async (message) => {
      try {
        // Ignorar mensajes propios
        if (message.fromMe) return;

        // Obtener información del contacto
        const contact = await message.getContact();
        const phoneNumber = contact.number;
        const contactName = contact.pushname || contact.name || 'Usuario';

        // Log del mensaje recibido en desarrollo
        if (config.NODE_ENV === 'development') {
          console.log(`\n📱 Mensaje de ${contactName} (${phoneNumber}): ${message.body}`);
        }

        // Mostrar indicador de "escribiendo..." si está habilitado
        if (config.bot.botBehavior.typingIndicator) {
          await message.reply('⏳ Escribiendo...');
        }

        // Generar respuesta con Ollama
        const response = await ollamaService.generateResponse(message.body, phoneNumber);

        // Enviar respuesta
        await message.reply(response);

        // Log en desarrollo
        if (config.NODE_ENV === 'development') {
          console.log(`🤖 Respuesta enviada a ${contactName}: ${response}\n`);
        }

      } catch (error) {
        console.error('❌ Error en WhatsApp Service:', error.message);
        
        // Enviar mensaje de error al usuario
        await message.reply('❌ Disculpa, ocurrió un error. Por favor intenta nuevamente.');
      }
    });

    // Evento de desconexión
    this.client.on('disconnected', (reason) => {
      console.log('❌ WhatsApp desconectado:', reason);
    });

    // Evento de error de autenticación
    this.client.on('auth_failure', (msg) => {
      console.error('❌ Error de autenticación:', msg);
    });
  }

  async initialize() {
    try {
      console.log('🚀 Iniciando bot de WhatsApp...');
      await this.client.initialize();
    } catch (error) {
      console.error('❌ Error al inicializar WhatsApp:', error.message);
      throw error;
    }
  }

  async destroy() {
    try {
      await this.client.destroy();
      console.log('✅ Cliente de WhatsApp cerrado correctamente');
    } catch (error) {
      console.error('❌ Error al cerrar WhatsApp:', error.message);
    }
  }

  getClient() {
    return this.client;
  }
}

module.exports = new WhatsAppService();
