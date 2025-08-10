import { useState, useEffect } from 'react';
import { mockAPI } from '../utils/mockAPI';

// Función para detectar si estamos en desarrollo
const isDevelopment = import.meta.env.DEV;

export const useConfig = () => {
  const [config, setConfig] = useState({
    keywords: {},
    autoResponses: {},
    aiSettings: {
      temperature: 0.7,
      maxTokens: 500,
      responseStyle: 'profesional',
      includeEmojis: false
    },
    botBehavior: {
      useKeywordDetection: false,
      fallbackToAI: false,
      autoGreeting: false,
      typingIndicator: false,
      businessHoursOnly: false
    }
  });

  const [companyInfo, setCompanyInfo] = useState({
    name: 'Cargando...',
    uptime: '--'
  });

  const [alert, setAlert] = useState({
    message: '',
    type: 'success',
    visible: false
  });

  const [loading, setLoading] = useState(true);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, visible: false }));
    }, 5000);
  };

  const loadConfiguration = async () => {
    try {
      let data;
      
      if (isDevelopment) {
        // Usar mock API en desarrollo
        data = await mockAPI.getConfig();
      } else {
        // Usar API real en producción
        const response = await fetch('/api/config');
        data = await response.json();
      }
      
      if (data.company) {
        setCompanyInfo({
          name: data.company.name,
          uptime: data.uptime || '--'
        });
      }
      
      if (data.bot) {
        setConfig(data.bot);
      }
      
      setLoading(false);
    } catch (error) {
      showAlert('Error cargando configuración: ' + error.message, 'error');
      setLoading(false);
    }
  };

  const saveConfiguration = async () => {
    try {
      let result;
      
      if (isDevelopment) {
        result = await mockAPI.saveConfig(config);
      } else {
        const response = await fetch('/api/config/bot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(config)
        });
        result = await response.json();
      }
      
      if (result.success) {
        showAlert('✅ Configuración guardada correctamente', 'success');
        setConfig(result.config);
      } else {
        showAlert('❌ Error guardando configuración', 'error');
      }
    } catch (error) {
      showAlert('❌ Error: ' + error.message, 'error');
    }
  };

  const resetConfiguration = async () => {
    if (window.confirm('¿Está seguro de que desea restablecer la configuración a los valores por defecto?')) {
      try {
        let result;
        
        if (isDevelopment) {
          result = await mockAPI.resetConfig();
        } else {
          const response = await fetch('/api/config/reset', {
            method: 'POST'
          });
          result = await response.json();
        }
        
        if (result.success) {
          showAlert('✅ Configuración restablecida correctamente', 'success');
          setConfig(result.config);
        } else {
          showAlert('❌ Error restableciendo configuración', 'error');
        }
      } catch (error) {
        showAlert('❌ Error: ' + error.message, 'error');
      }
    }
  };

  useEffect(() => {
    loadConfiguration();
  }, []);

  return {
    config,
    setConfig,
    companyInfo,
    alert,
    setAlert,
    loading,
    showAlert,
    saveConfiguration,
    resetConfiguration
  };
};
