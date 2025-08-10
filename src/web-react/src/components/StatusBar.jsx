const StatusBar = ({ companyName, uptime }) => (
  <div className="bg-gray-800 px-8 py-4 flex flex-col md:flex-row justify-between items-center text-white">
    <div className="flex items-center gap-2 mb-2 md:mb-0">
      <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
      <span>Bot Activo</span>
    </div>
    <div>{companyName || 'Cargando...'}</div>
    <div>Uptime: {uptime || '--'}</div>
  </div>
);

export default StatusBar;
