# 🤖 AyudIA - Asistente Virtual para WhatsApp

Un bot inteligente de WhatsApp que funciona como asistente virtual de empresa, utilizando Ollama para generar respuestas contextuales y personalizadas, con un **Panel de Configuración Web** para gestión sin código.

## ✨ Características

- 🤖 **IA Contextual**: Respuestas inteligentes usando Ollama con contexto empresarial
- 📱 **WhatsApp Integration**: Conexión completa con WhatsApp Web
- 🎛️ **Panel de Configuración Web**: Interfaz visual para configurar el bot sin código
- 🔤 **Palabras Clave Dinámicas**: Sistema configurable de detección de palabras clave
- 💬 **Respuestas Automáticas**: Respuestas predefinidas personalizables
- 🧠 **Configuración IA**: Ajustes del modelo (temperatura, tokens, estilo)
- ⚙️ **Comportamiento Configurable**: Control total del comportamiento del bot
- 🏢 **Contexto Empresarial**: Información personalizable de la empresa
- � **Monitoreo en Tiempo Real**: Estado del sistema y conexiones

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
PANEL_PORT=3001
# ... más configuraciones
```

4. **Iniciar Ollama** (debe estar corriendo):
```bash
ollama serve
# En otra terminal:
ollama pull gemma3n:e4b  # o tu modelo preferido
```

## 🎮 Uso

### Iniciar el Bot
```bash
bun start  # o npm start
```

### Acceder al Panel de Configuración
Una vez iniciado el bot, el panel estará disponible en:
```
http://localhost:3001
```

O usar el comando:
```bash
bun run panel  # Abre el panel automáticamente
```

### Primera configuración
1. Ejecuta el bot con `bun start`
2. Escanea el código QR con tu WhatsApp
3. Abre el panel en `http://localhost:3001`
4. Configura palabras clave, respuestas y comportamiento
5. ¡El bot está listo para funcionar!

## 🎛️ Panel de Configuración

### 🔤 **Palabras Clave**
- Gestiona palabras que activan respuestas automáticas
- Categorías: Saludos, Despedidas, Ayuda, Contacto, Servicios
- Agregar/eliminar palabras dinámicamente

### 💬 **Respuestas Automáticas**
- Personaliza las respuestas para cada categoría
- Usa placeholders: `{company_name}`, `{company_phone}`, etc.
- Respuestas inmediatas sin IA

### 🧠 **Configuración IA**
- **Temperatura**: Control de creatividad (0.0 - 1.0)
- **Tokens máximos**: Longitud de respuesta (100 - 1000)
- **Estilo**: Profesional, Casual, Técnico
- **Emojis**: Incluir o no emojis en respuestas

### ⚙️ **Comportamiento**
- **Detección de palabras clave**: Activar/desactivar
- **Fallback a IA**: Usar IA si no detecta palabras clave
- **Saludo automático**: Mensaje inicial automático
- **Indicador de escritura**: Mostrar "escribiendo..."
- **Horario comercial**: Responder solo en horarios específicos

### 📊 **Monitoreo**
- Estado del bot en tiempo real
- Conexión con Ollama
- Tiempo de actividad
- Información del sistema

## 📁 Estructura del Proyecto

```
ayudIA/
├── src/
│   ├── config/
│   │   └── config.js          # Configuración central + dinámica
│   ├── services/
│   │   ├── ollamaService.js   # Servicio de IA + palabras clave
│   │   ├── whatsappService.js # Servicio de WhatsApp
│   │   └── configPanel.js     # Servidor del panel web
│   ├── utils/
│   │   └── utils.js           # Utilidades generales
│   └── web/
│       └── index.html         # Panel de configuración web
├── data/
│   └── bot-config.json        # Configuración dinámica guardada
└── index.js                   # Punto de entrada
```

## � Configuración Avanzada

### Variables de Entorno Principales

```env
# Panel de configuración
PANEL_PORT=3001

# Ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma3n:e4b

# Empresa (se pueden editar desde el panel)
COMPANY_NAME=Mi Empresa
COMPANY_DESCRIPTION=Una empresa...
COMPANY_PHONE=+1234567890
COMPANY_EMAIL=contacto@empresa.com
COMPANY_WEBSITE=https://empresa.com
COMPANY_ADDRESS=Dirección comercial
COMPANY_WORKING_HOURS=Lunes a Viernes 9-18
COMPANY_SERVICES=Servicio1,Servicio2,Servicio3
```

### Configuración Dinámica
El archivo `data/bot-config.json` almacena:
- Palabras clave personalizadas
- Respuestas automáticas
- Configuración de IA
- Comportamiento del bot

## 🛠️ Comandos de Desarrollo

```bash
bun dev          # Modo desarrollo con recarga automática
bun start        # Modo producción
bun run panel    # Abrir panel de configuración
bun run lint     # Verificar código
bun run lint:fix # Corregir código automáticamente
```

## � Flujo de Funcionamiento

1. **Usuario envía mensaje** → WhatsApp recibe
2. **Detección de palabras clave** → Si encuentra coincidencia
3. **Respuesta automática** → Envía respuesta predefinida
4. **O Fallback a IA** → Si no hay coincidencia y está habilitado
5. **Respuesta de Ollama** → Genera respuesta contextual
6. **Aplicar filtros** → Estilo, emojis, longitud
7. **Enviar respuesta** → Usuario recibe mensaje

## 🎯 Casos de Uso

### Respuestas Rápidas
- "Hola" → Respuesta de saludo automática
- "Contacto" → Información de contacto inmediata
- "Servicios" → Lista de servicios de la empresa

### Consultas Complejas
- Preguntas técnicas → Procesadas por IA
- Solicitudes específicas → Respuesta contextual
- Conversación natural → IA con contexto empresarial

## 📱 Acceso al Panel

### Desde la red local:
```
http://tu-ip-local:3001
```

### Características del panel:
- ✅ Responsive (móvil y desktop)
- ✅ Tiempo real
- ✅ Sin necesidad de reiniciar el bot
- ✅ Configuración visual
- ✅ Prueba de conexiones
- ✅ Backup/restore de configuración

## 🔒 Seguridad

- Panel solo accesible localmente por defecto
- No almacena datos sensibles de WhatsApp
- Configuraciones encriptadas en archivos locales
- Variables de entorno para datos sensibles

## 📋 Requisitos

- Node.js 16+ o Bun
- Ollama instalado y corriendo
- Modelo de IA descargado (gemma3n:e4b recomendado)
- Navegador web moderno para el panel

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama de feature
3. Commit de cambios
4. Push a la rama
5. Crear Pull Request

## 📄 Licencia

ISC License

---

### 🚀 **¡Configuración sin código!**
Gestiona todo desde el panel web - no necesitas tocar archivos de configuración.
Bot de whatsapp para resolver preguntas simples
