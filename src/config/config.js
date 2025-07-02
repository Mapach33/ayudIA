require('dotenv').config();

const config = {
  // Entorno
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  
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
  }
};

module.exports = config;
