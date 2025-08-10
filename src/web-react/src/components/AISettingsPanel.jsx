const RangeInput = ({ label, value, min, max, step, onChange, unit = '', description }) => (
  <div className="mb-5">
    <label className="block mb-2 font-semibold text-gray-700">
      {label}: <span className="text-blue-500 font-bold">{value}{unit}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
    />
    {description && <small className="text-gray-600">{description}</small>}
  </div>
);

const AISettingsPanel = ({ config, onUpdateConfig }) => {
  const handleAISetting = (key, value) => {
    const newConfig = { ...config };
    if (!newConfig.aiSettings) newConfig.aiSettings = {};
    newConfig.aiSettings[key] = value;
    onUpdateConfig(newConfig);
  };

  const aiSettings = config.aiSettings || {};

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">🧠 Configuración de Inteligencia Artificial</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Parámetros del Modelo</h4>
          
          <RangeInput
            label="Creatividad (Temperature)"
            value={aiSettings.temperature || 0.7}
            min={0}
            max={1}
            step={0.1}
            onChange={(value) => handleAISetting('temperature', value)}
            description="Menor = más predecible, Mayor = más creativo"
          />
          
          <RangeInput
            label="Longitud Máxima de Respuesta"
            value={aiSettings.maxTokens || 500}
            min={100}
            max={1000}
            step={50}
            unit=" tokens"
            onChange={(value) => handleAISetting('maxTokens', value)}
          />
        </div>

        <div className="bg-white rounded-lg p-5 shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Estilo de Respuesta</h4>
          
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">Estilo:</label>
            <select
              value={aiSettings.responseStyle || 'profesional'}
              onChange={(e) => handleAISetting('responseStyle', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-colors focus:border-blue-500 focus:outline-none"
            >
              <option value="profesional">Profesional</option>
              <option value="casual">Casual</option>
              <option value="técnico">Técnico</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="include-emojis"
              checked={aiSettings.includeEmojis || false}
              onChange={(e) => handleAISetting('includeEmojis', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="include-emojis" className="text-sm font-medium text-gray-700">
              Incluir emojis en respuestas
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettingsPanel;
