const moment = require('moment');

class Utils {
  /**
   * Formatea un número de teléfono
   */
  static formatPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/\D/g, '');
  }

  /**
   * Obtiene la hora actual formateada
   */
  static getCurrentTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * Verifica si es horario de atención
   */
  static isBusinessHours() {
    const now = moment();
    const hour = now.hour();
    const day = now.day(); // 0 = domingo, 6 = sábado
    
    // Lunes a Viernes (1-5), de 9 AM a 6 PM
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  }

  /**
   * Sanitiza texto para logging
   */
  static sanitizeForLog(text) {
    if (!text) return '';
    return text.replace(/[\r\n\t]/g, ' ').substring(0, 500);
  }

  /**
   * Genera un ID único para sesiones
   */
  static generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Valida si un mensaje es comando
   */
  static isCommand(message) {
    return message.startsWith('/') || message.startsWith('!');
  }

  /**
   * Extrae el comando del mensaje
   */
  static extractCommand(message) {
    if (!this.isCommand(message)) return null;
    
    const parts = message.substring(1).split(' ');
    return {
      command: parts[0].toLowerCase(),
      args: parts.slice(1)
    };
  }

  /**
   * Trunca texto largo
   */
  static truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
}

module.exports = Utils;
