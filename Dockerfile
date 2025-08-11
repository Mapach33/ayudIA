# Usar Node.js 18 LTS como imagen base
FROM node:18-alpine

# Instalar dependencias del sistema necesarias para WhatsApp Web
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

# Configurar variables de entorno para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Crear directorios necesarios para datos persistentes
RUN mkdir -p /usr/src/app/data/session && \
    chmod -R 755 /usr/src/app/data

# Exponer puerto para el panel de configuración
EXPOSE 3001

# Usuario no root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /usr/src/app
USER nextjs

# Comando de inicio
CMD ["npm", "start"]
