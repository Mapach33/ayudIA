import { useState } from 'react';

const KeywordCard = ({ title, category, keywords, onAddKeyword, onRemoveKeyword }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAddKeyword(category, inputValue.trim().toLowerCase());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-md">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">{title}</h4>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Agregar palabra clave..."
          className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-colors focus:border-blue-500 focus:outline-none mb-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all transform hover:-translate-y-0.5"
        >
          Agregar
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords?.map((keyword, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1"
          >
            {keyword}
            <span
              onClick={() => onRemoveKeyword(category, keyword)}
              className="cursor-pointer bg-white/30 rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-white/50"
            >
              ×
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const KeywordsPanel = ({ config, onUpdateConfig }) => {
  const handleAddKeyword = (category, keyword) => {
    const newConfig = { ...config };
    if (!newConfig.keywords) newConfig.keywords = {};
    if (!newConfig.keywords[category]) newConfig.keywords[category] = [];
    
    if (!newConfig.keywords[category].includes(keyword)) {
      newConfig.keywords[category].push(keyword);
      onUpdateConfig(newConfig);
    }
  };

  const handleRemoveKeyword = (category, keyword) => {
    const newConfig = { ...config };
    if (newConfig.keywords && newConfig.keywords[category]) {
      newConfig.keywords[category] = newConfig.keywords[category].filter(k => k !== keyword);
      onUpdateConfig(newConfig);
    }
  };

  const keywordCategories = [
    { title: 'Saludos', category: 'greeting' },
    { title: 'Despedidas', category: 'farewell' },
    { title: 'Ayuda', category: 'help' },
    { title: 'Contacto', category: 'contact' },
    { title: 'Servicios', category: 'services' }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">🔤 Gestión de Palabras Clave</h3>
      <p className="text-gray-600 mb-6">
        Configure las palabras clave que el bot reconocerá para activar respuestas automáticas.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {keywordCategories.map(({ title, category }) => (
          <KeywordCard
            key={category}
            title={title}
            category={category}
            keywords={config.keywords?.[category] || []}
            onAddKeyword={handleAddKeyword}
            onRemoveKeyword={handleRemoveKeyword}
          />
        ))}
      </div>
    </div>
  );
};

export default KeywordsPanel;
