const TestComponent = () => {
  return (
    <div className="p-4 bg-blue-500 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">🎨 Test de Estilos</h2>
      <p className="text-sm">Si ves este texto con fondo azul, los estilos de Tailwind están funcionando correctamente.</p>
      <button className="mt-2 px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100 transition-colors">
        Botón de Prueba
      </button>
    </div>
  );
};

export default TestComponent;
