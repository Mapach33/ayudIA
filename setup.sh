#!/bin/bash

# Script para inicializar el proyecto
echo "🚀 Inicializando AyudIA..."

# Crear directorios si no existen
mkdir -p logs data

# Crear archivos de log vacíos
touch logs/error.log
touch logs/combined.log
touch logs/conversations.log

echo "📁 Directorios y archivos creados"

# Verificar si existe .env
if [ ! -f ".env" ]; then
    echo "⚠️  Archivo .env no encontrado, copiando desde .env.example"
    cp .env.example .env
    echo "✅ Archivo .env creado. Por favor configúralo antes de ejecutar el bot."
else
    echo "✅ Archivo .env encontrado"
fi

# Verificar si Ollama está corriendo
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "✅ Ollama está corriendo"
else
    echo "⚠️  Ollama no está corriendo. Inicia Ollama antes de ejecutar el bot:"
    echo "   ollama serve"
fi

echo "🎉 Inicialización completa!"
echo ""
echo "Para iniciar el bot:"
echo "  bun dev    # Modo desarrollo"
echo "  bun start  # Modo producción"
