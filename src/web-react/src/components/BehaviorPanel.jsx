const CheckboxGroup = ({ id, label, checked, onChange }) => (
  <div className="flex items-center gap-3 mb-4">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
    />
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
  </div>
);

const BehaviorPanel = ({ config, onUpdateConfig }) => {
  const handleBehaviorChange = (key, value) => {
    const newConfig = { ...config };
    if (!newConfig.botBehavior) newConfig.botBehavior = {};
    newConfig.botBehavior[key] = value;
    onUpdateConfig(newConfig);
  };

  const behavior = config.botBehavior || {};

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">⚙️ Configuración de Comportamiento</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Detección de Palabras Clave</h4>
          
          <CheckboxGroup
            id="use-keyword-detection"
            label="Activar detección de palabras clave"
            checked={behavior.useKeywordDetection || false}
            onChange={(value) => handleBehaviorChange('useKeywordDetection', value)}
          />
          
          <CheckboxGroup
            id="fallback-to-ai"
            label="Usar IA si no detecta palabras clave"
            checked={behavior.fallbackToAI || false}
            onChange={(value) => handleBehaviorChange('fallbackToAI', value)}
          />
        </div>

        <div className="bg-white rounded-lg p-5 shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Interacción</h4>
          
          <CheckboxGroup
            id="auto-greeting"
            label="Saludo automático"
            checked={behavior.autoGreeting || false}
            onChange={(value) => handleBehaviorChange('autoGreeting', value)}
          />
          
          <CheckboxGroup
            id="typing-indicator"
            label="Mostrar indicador 'escribiendo...'"
            checked={behavior.typingIndicator || false}
            onChange={(value) => handleBehaviorChange('typingIndicator', value)}
          />
          
          <CheckboxGroup
            id="business-hours-only"
            label="Responder solo en horario comercial"
            checked={behavior.businessHoursOnly || false}
            onChange={(value) => handleBehaviorChange('businessHoursOnly', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BehaviorPanel;
