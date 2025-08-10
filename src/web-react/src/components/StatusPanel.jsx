import { useState, useEffect } from 'react';
import { mockAPI } from '../utils/mockAPI';

const isDevelopment = import.meta.env.DEV;

const StatusPanel = ({ config }) => {
  const [systemStatus, setSystemStatus] = useState({
    botStatus: 'Activo',
    uptime: '--',
    environment: '--',
    company: '--'
  });

  const [ollamaStatus, setOllamaStatus] = useState({
    connected: false,
    url: '--',
    model: '--',
    testing: false
  });

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const loadStatus = async () => {
    try {
      let status;
      
      if (isDevelopment) {
        status = await mockAPI.getStatus();
      } else {
        const response = await fetch('/api/status');
        status = await response.json();
      }
      
      setSystemStatus({
        botStatus: 'Activo',
        uptime: formatUptime(status.uptime),
        environment: status.environment,
        company: status.company
      });
    } catch (error) {
      console.error('Error cargando estado:', error);
    }
  };

  const testOllamaConnection = async () => {
    setOllamaStatus(prev => ({ ...prev, testing: true }));
    
    try {
      let result;
      
      if (isDevelopment) {
        result = await mockAPI.testOllama();
      } else {
        const response = await fetch('/api/test-ollama');
        result = await response.json();
      }
      
      setOllamaStatus({
        connected: result.connected,
        url: result.url || '--',
        model: result.model || '--',
        testing: false
      });
    } catch (error) {
      setOllamaStatus({
        connected: false,
        url: '--',
        model: '--',
        testing: false
      });
    }
  };

  useEffect(() => {
    loadStatus();
    testOllamaConnection();
    
    // Actualizar estado cada 30 segundos
    const interval = setInterval(() => {
      loadStatus();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">📊 Estado del Sistema</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Información General</h4>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Estado:</span>
              <span className="text-green-600 font-semibold">{systemStatus.botStatus}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Tiempo activo:</span>
              <span className="text-gray-800">{systemStatus.uptime}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Entorno:</span>
              <span className="text-gray-800">{systemStatus.environment}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Empresa:</span>
              <span className="text-gray-800">{systemStatus.company}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Ollama IA</h4>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Estado:</span>
              <span className={`font-semibold ${ollamaStatus.connected ? 'text-green-600' : 'text-red-600'}`}>
                {ollamaStatus.connected ? '✅ Conectado' : '❌ Desconectado'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">URL:</span>
              <span className="text-gray-800 text-sm">{ollamaStatus.url}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Modelo:</span>
              <span className="text-gray-800">{ollamaStatus.model}</span>
            </div>
          </div>
          
          <button
            onClick={testOllamaConnection}
            disabled={ollamaStatus.testing}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
          >
            {ollamaStatus.testing ? '🔄 Probando...' : '🔄 Probar Conexión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
