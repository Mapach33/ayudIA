const Alert = ({ message, type, visible, onClose }) => {
  if (!visible) return null;

  const bgColor = type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700';

  return (
    <div className={`${bgColor} border rounded-lg p-4 mb-5 flex justify-between items-center`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-lg font-bold hover:opacity-70"
      >
        ×
      </button>
    </div>
  );
};

export default Alert;
