const ResponsesPanel = ({ config, onUpdateConfig }) => {
  const handleResponseChange = (category, value) => {
    const newConfig = { ...config };
    if (!newConfig.autoResponses) newConfig.autoResponses = {};
    newConfig.autoResponses[category] = value;
    onUpdateConfig(newConfig);
  };

  const responseCategories = [
    {
      key: 'greeting',
      label: 'Respuesta de Saludo:',
      placeholder: 'Respuesta cuando detecte saludos...'
    },
    {
      key: 'farewell',
      label: 'Respuesta de Despedida:',
      placeholder: 'Respuesta cuando detecte despedidas...'
    },
    {
      key: 'help',
      label: 'Respuesta de Ayuda:',
      placeholder: 'Respuesta cuando pidan ayuda...'
    },
    {
      key: 'contact',
      label: 'Respuesta de Contacto:',
      placeholder: 'Respuesta cuando pidan información de contacto...'
    },
    {
      key: 'services',
      label: 'Respuesta de Servicios:',
      placeholder: 'Respuesta cuando pregunten por servicios...'
    }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">💬 Respuestas Automáticas</h3>
      <p className="text-gray-600 mb-6">
        Personalice las respuestas que el bot enviará automáticamente al detectar palabras clave.
      </p>
      
      <div className="space-y-5">
        {responseCategories.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block mb-2 font-semibold text-gray-700">
              {label}
            </label>
            <textarea
              rows="3"
              value={config.autoResponses?.[key] || ''}
              onChange={(e) => handleResponseChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-colors focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsesPanel;
