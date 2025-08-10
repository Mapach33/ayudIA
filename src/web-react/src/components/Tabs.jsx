import { useState } from 'react';

const tabList = [
  { id: 'keywords', label: '🔤 Palabras Clave' },
  { id: 'responses', label: '💬 Respuestas' },
  { id: 'ai-settings', label: '🧠 IA Settings' },
  { id: 'behavior', label: '⚙️ Comportamiento' },
  { id: 'status', label: '📊 Estado' },
];

const Tabs = ({ children }) => {
  const [active, setActive] = useState('keywords');

  return (
    <>
      <div className="flex border-b-2 border-gray-100 mb-8">
        {tabList.map(tab => (
          <button
            key={tab.id}
            className={`px-6 py-3 text-base font-medium transition-colors border-none bg-none focus:outline-none ${active === tab.id ? 'text-blue-500 border-b-4 border-blue-500 font-bold' : 'text-gray-500'}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {children.map(child =>
        child.props.id === active ? (
          <div key={child.props.id} className="block">{child}</div>
        ) : null
      )}
    </>
  );
};

export default Tabs;
