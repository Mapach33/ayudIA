# 🤖 AyudIA - Asistente Virtual para WhatsApp

Un bot inteligente de WhatsApp que funciona como asistente virtual de empresa, utilizando Ollama para generar respuestas contextuales y personalizadas.

## ✨ Características

- 🤖 **IA Contextual**: Respuestas inteligentes usando Ollama con contexto empresarial
- 📱 **WhatsApp Integration**: Conexión completa con WhatsApp Web
- 📊 **Logging Avanzado**: Sistema completo de logs para conversaciones y errores
- 🏢 **Contexto Empresarial**: Información personalizable de la empresa
- 🔧 **Modo Desarrollo**: Logs detallados con números de teléfono
- ⚙️ **Configuración Flexible**: Variables de entorno para fácil personalización

## 🚀 Instalación

1. **Clonar y configurar**:
```bash
git clone <tu-repo>
cd ayudIA
bun install  # o npm install
```

2. **Configurar variables de entorno**:
```bash
cp .env.example .env
```

3. **Editar el archivo `.env`** con la información de tu empresa:
```env
COMPANY_NAME=Tu Empresa
COMPANY_DESCRIPTION=Descripción de tu empresa
COMPANY_PHONE=+1234567890
COMPANY_EMAIL=contacto@tuempresa.com
# ... más configuraciones
```

4. **Iniciar Ollama** (debe estar corriendo):
```bash
ollama serve
# En otra terminal:
ollama pull gemma3n:e4b  # o tu modelo preferido
```

## 🎮 Uso

### Modo Desarrollo
```bash
bun dev  # o npm run dev
```
- Muestra logs detallados en consola
- Incluye números de teléfono en los logs
- Recarga automática con nodemon

### Modo Producción
```bash
bun start  # o npm start
```

### Primera ejecución
1. Ejecuta el bot
2. Escanea el código QR con tu WhatsApp
3. El bot estará listo para recibir mensajes

## 📁 Estructura del Proyecto

```
ayudIA/
├── src/
│   ├── config/
│   │   └── config.js          # Configuración central
│   ├── services/
│   │   ├── ollamaService.js   # Servicio de IA
│   │   └── whatsappService.js # Servicio de WhatsApp
│   └── utils/
│       ├── logger.js          # Sistema de logging
│       └── utils.js           # Utilidades generales
├── logs/                      # Archivos de log
├── data/                      # Datos de sesión
├── .env                       # Variables de entorno
└── index.js                   # Punto de entrada
```

## 📝 Logging

El bot genera varios tipos de logs:

- **conversations.log**: Todas las conversaciones
- **error.log**: Errores del sistema
- **combined.log**: Todos los eventos

### En modo desarrollo:
- Logs en consola con colores
- Números de teléfono visibles
- Detalles de cada interacción

## ⚙️ Configuración

### Variables de Entorno Principales

```env
# Ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma3n:e4b

# Empresa
COMPANY_NAME=Mi Empresa
COMPANY_DESCRIPTION=Una empresa...
COMPANY_PHONE=+1234567890
COMPANY_EMAIL=contacto@empresa.com
COMPANY_WEBSITE=https://empresa.com
COMPANY_ADDRESS=Dirección comercial
COMPANY_BUSINESS_HOURS=Lunes a Viernes 9-18

# Logging
LOG_LEVEL=info
LOG_MAX_FILES=5
LOG_MAX_SIZE=10m
```

## 🤖 Funcionalidades del Bot

- **Respuestas Inteligentes**: Utiliza el contexto de la empresa
- **Información Empresarial**: Proporciona datos de contacto y servicios
- **Horarios de Atención**: Responde según configuración
- **Manejo de Errores**: Respuestas amigables en caso de problemas
- **Logging Completo**: Registra todas las interacciones

## 🛠️ Comandos de Desarrollo

```bash
bun dev          # Modo desarrollo con recarga automática
bun start        # Modo producción
bun run lint     # Verificar código
bun run lint:fix # Corregir código automáticamente
```

## 🔧 Personalización

### Modificar el Prompt del Asistente

Edita `src/services/ollamaService.js` en el método `buildSystemPrompt()` para personalizar cómo responde el bot.

### Agregar Nuevas Funcionalidades

1. Crear nuevos servicios en `src/services/`
2. Agregar utilidades en `src/utils/`
3. Actualizar la configuración en `src/config/config.js`

## 📋 Requisitos

- Node.js 16+ o Bun
- Ollama instalado y corriendo
- Modelo de IA descargado (gemma3n:e4b recomendado)

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama de feature
3. Commit de cambios
4. Push a la rama
5. Crear Pull Request

## 📄 Licencia

ISC License
Bot de whatsapp para resolver preguntas simples
