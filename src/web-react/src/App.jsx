
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import Tabs from './components/Tabs';
import KeywordsPanel from './components/KeywordsPanel';
import ResponsesPanel from './components/ResponsesPanel';
import AISettingsPanel from './components/AISettingsPanel';
import BehaviorPanel from './components/BehaviorPanel';
import StatusPanel from './components/StatusPanel';
import Alert from './components/Alert';
import TestComponent from './components/TestComponent';
import { useConfig } from './hooks/useConfig';

function App() {
  const {
    config,
    setConfig,
    companyInfo,
    alert,
    setAlert,
    loading,
    saveConfiguration,
    resetConfiguration
  } = useConfig();

  const handleConfigUpdate = (newConfig) => {
    setConfig(newConfig);
  };

  const handleAlertClose = () => {
    setAlert(prev => ({ ...prev, visible: false }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <Header />
        <StatusBar companyName={companyInfo.name} uptime={companyInfo.uptime} />
        <div className="p-8">
          <TestComponent />
          
          <Alert
            message={alert.message}
            type={alert.type}
            visible={alert.visible}
            onClose={handleAlertClose}
          />
          
          <Tabs>
            <div id="keywords">
              <KeywordsPanel config={config} onUpdateConfig={handleConfigUpdate} />
            </div>
            <div id="responses">
              <ResponsesPanel config={config} onUpdateConfig={handleConfigUpdate} />
            </div>
            <div id="ai-settings">
              <AISettingsPanel config={config} onUpdateConfig={handleConfigUpdate} />
            </div>
            <div id="behavior">
              <BehaviorPanel config={config} onUpdateConfig={handleConfigUpdate} />
            </div>
            <div id="status">
              <StatusPanel config={config} />
            </div>
          </Tabs>

          <div className="mt-8 text-center">
            <button
              onClick={saveConfiguration}
              className="bg-green-500 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all transform hover:-translate-y-0.5 mr-4"
            >
              💾 Guardar Configuración
            </button>
            <button
              onClick={resetConfiguration}
              className="bg-red-500 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all transform hover:-translate-y-0.5"
            >
              🔄 Restablecer por Defecto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
