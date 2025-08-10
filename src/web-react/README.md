# Panel de Configuración AyudIA - React

Esta es la migración completa del panel de configuración HTML a React con Vite y Tailwind CSS.

## 🚀 Características

- ✅ **Interfaz moderna**: Completamente rediseñada con React y Tailwind CSS
- ✅ **Gestión de estado**: Hooks personalizados para manejar la configuración
- ✅ **API integrada**: Soporte para APIs reales y mock para desarrollo
- ✅ **Componentes modulares**: Código organizado y reutilizable
- ✅ **Responsive**: Diseño adaptable para todos los dispositivos
- ✅ **Funcionalidad completa**: Todos los paneles migrados:
  - 🔤 Palabras Clave
  - 💬 Respuestas Automáticas
  - 🧠 Configuración de IA
  - ⚙️ Comportamiento del Bot
  - 📊 Estado del Sistema

## 🛠️ Tecnologías

- **React 19** - Framework de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS 4** - Framework de CSS utility-first
- **Custom Hooks** - Gestión de estado y lógica
- **Mock API** - Desarrollo sin backend

## 📦 Instalación y Desarrollo

```bash
# Navegar al directorio React
cd src/web-react

# Instalar dependencias
npm install
# o
bun install

# Ejecutar en modo desarrollo
npm run dev
# o
bun dev

# Construir para producción
npm run build
# o
bun build
```

## 🏗️ Estructura del Proyecto

```
src/web-react/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Header.jsx       # Encabezado
│   │   ├── StatusBar.jsx    # Barra de estado
│   │   ├── Tabs.jsx         # Sistema de pestañas
│   │   ├── Alert.jsx        # Alertas y notificaciones
│   │   ├── KeywordsPanel.jsx      # Panel de palabras clave
│   │   ├── ResponsesPanel.jsx     # Panel de respuestas
│   │   ├── AISettingsPanel.jsx    # Panel de configuración IA
│   │   ├── BehaviorPanel.jsx      # Panel de comportamiento
│   │   └── StatusPanel.jsx        # Panel de estado del sistema
│   ├── hooks/
│   │   └── useConfig.js     # Hook para gestión de configuración
│   ├── utils/
│   │   └── mockAPI.js       # APIs simuladas para desarrollo
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales y Tailwind
├── public/                  # Archivos estáticos
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Configuración

### Desarrollo vs Producción

La aplicación detecta automáticamente el entorno:

- **Desarrollo**: Usa `mockAPI.js` para simular las respuestas del servidor
- **Producción**: Se conecta a las APIs reales del backend

### APIs Esperadas

En producción, la aplicación espera las siguientes rutas de API:

- `GET /api/config` - Obtener configuración actual
- `POST /api/config/bot` - Guardar configuración del bot
- `POST /api/config/reset` - Restablecer configuración
- `GET /api/status` - Obtener estado del sistema
- `GET /api/test-ollama` - Probar conexión con Ollama

## 🎨 Personalización

### Colores y Estilos

Los colores principales se pueden cambiar en `tailwind.config.js` o directamente en los componentes.

### Mock Data

Para personalizar los datos de desarrollo, modifica `src/utils/mockAPI.js`.

## 🚀 Despliegue

Para integrar con el backend existente:

1. Construye la aplicación: `npm run build`
2. Los archivos estáticos se generan en `dist/`
3. Configura tu servidor para servir estos archivos
4. Asegúrate de que las rutas de API estén disponibles

## 📝 Migración Completada

### ✅ Características Migradas:

- [x] Diseño responsive completo
- [x] Sistema de pestañas funcional
- [x] Panel de palabras clave con CRUD
- [x] Panel de respuestas automáticas
- [x] Configuración de parámetros de IA
- [x] Configuración de comportamiento del bot
- [x] Panel de estado del sistema
- [x] Alertas y notificaciones
- [x] Gestión de estado con hooks
- [x] Mock API para desarrollo
- [x] Animaciones y transiciones
- [x] Validación de formularios
- [x] Persistencia de datos

### 🎯 Mejoras Implementadas:

- **Mejor UX**: Interfaz más intuitiva y moderna
- **Performance**: Renderizado optimizado con React
- **Mantenibilidad**: Código modular y bien estructurado
- **Escalabilidad**: Fácil agregar nuevas características
- **Responsividad**: Mejor adaptación a dispositivos móviles

## 🔄 Próximos Pasos

Para usar en producción:

1. Reemplaza las llamadas de `mockAPI` con las APIs reales
2. Configura el proxy de Vite si es necesario
3. Ajusta las rutas de API según tu backend
4. Personaliza los estilos según tu marca

¡La migración está completa y lista para usar! 🎉+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
