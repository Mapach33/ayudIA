const winston = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Configuración de formatos
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = '';
    if (Object.keys(meta).length > 0) {
      metaStr = ` ${JSON.stringify(meta)}`;
    }
    return `${timestamp} [${level}]: ${message}${metaStr}`;
  })
);

// Crear el logger
const logger = winston.createLogger({
  level: config.NODE_ENV === 'development' ? 'debug' : 'info',
  format: logFormat,
  transports: [
    // Archivo para errores
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Archivo para todos los logs
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Archivo específico para conversaciones
    new winston.transports.File({
      filename: path.join(logsDir, 'conversations.log'),
      level: 'info',
      maxsize: 10485760, // 10MB
      maxFiles: 10
    })
  ]
});

// Agregar console transport solo en desarrollo
if (config.NODE_ENV === 'development') {
  logger.add(new winston.transports.Console({
    format: consoleFormat
  }));
}

// Métodos de logging personalizados
class Logger {
  static info(message, meta = {}) {
    logger.info(message, meta);
  }

  static error(message, meta = {}) {
    logger.error(message, meta);
  }

  static warn(message, meta = {}) {
    logger.warn(message, meta);
  }

  static debug(message, meta = {}) {
    logger.debug(message, meta);
  }

  // Método para errores (compatibilidad)
  static logError(error, meta = {}) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    logger.error(errorMessage, {
      ...meta,
      stack: errorStack,
      timestamp: new Date().toISOString()
    });
  }

  // Log específico para conversaciones
  static logConversation(phoneNumber, userMessage, botResponse, meta = {}) {
    const conversationData = {
      phoneNumber: phoneNumber.replace(/\D/g, ''), // Solo números
      userMessage: userMessage.substring(0, 1000), // Limitar longitud
      botResponse: botResponse.substring(0, 1000), // Limitar longitud
      timestamp: new Date().toISOString(),
      ...meta
    };

    logger.info('CONVERSATION', conversationData);

    // En desarrollo, mostrar en consola
    if (config.NODE_ENV === 'development') {
      console.log(`📱 ${phoneNumber} → ${userMessage.substring(0, 100)}...`);
      console.log(`🤖 Bot → ${botResponse.substring(0, 100)}...`);
    }
  }

  // Log para acciones del usuario
  static logUserAction(phoneNumber, action, details = {}) {
    const actionData = {
      phoneNumber: phoneNumber.replace(/\D/g, ''), // Solo números
      action: action,
      details: details,
      timestamp: new Date().toISOString()
    };

    logger.info('USER_ACTION', actionData);

    // En desarrollo, mostrar en consola
    if (config.NODE_ENV === 'development') {
      console.log(`👤 Acción de ${phoneNumber}: ${action}`);
    }
  }

  // Log para eventos del sistema
  static logSystem(event, data = {}) {
    logger.info(`SYSTEM_${event}`, {
      timestamp: new Date().toISOString(),
      ...data
    });
  }

  // Log para métricas
  static logMetrics(metrics) {
    logger.info('METRICS', {
      timestamp: new Date().toISOString(),
      ...metrics
    });
  }
}

module.exports = Logger;