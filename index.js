const config = require('./src/config/config');
const whatsappService = require('./src/services/whatsappService');

// Banner de inicio
console.log(`
╔══════════════════════════════════════════════════════════╗
║                    🤖 AyudIA Bot 🤖                      ║
║                                                          ║
║  Asistente virtual para ${config.company.name.padEnd(30)} ║
║  Entorno: ${config.NODE_ENV.padEnd(45)} ║
╚══════════════════════════════════════════════════════════╝
`);

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando bot...');
  
  try {
    await whatsappService.destroy();
    console.log('✅ Bot cerrado correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al cerrar:', error.message);
    process.exit(1);
  }
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
  console.error('❌ Error no capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada:', reason);
});

// Iniciar el bot
async function startBot() {
  try {
    console.log(`🚀 Iniciando AyudIA Bot...`);
    console.log(`🏢 Empresa: ${config.company.name}`);
    console.log(`🤖 Modelo: ${config.ollama.model}`);
    console.log(`🌐 Ollama URL: ${config.ollama.baseUrl}`);
    
    await whatsappService.initialize();
    
  } catch (error) {
    console.error('❌ Error al iniciar el bot:', error.message);
    process.exit(1);
  }
}

// Iniciar
startBot();
