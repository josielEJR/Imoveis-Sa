#!/bin/bash

echo "🚀 Iniciando build automático do projeto..."

# Verificar se estamos na pasta raiz
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na pasta raiz do projeto"
    exit 1
fi

echo "📦 Instalando dependências principais..."
npm install

echo "📦 Instalando dependências da API..."
cd api && npm install && cd ..

echo "📦 Instalando dependências do frontend..."
cd interface && npm install && cd ..

echo "🔨 Buildando o frontend..."
cd interface && npm run build && cd ..

echo "✅ Verificando se o build foi criado..."
if [ -d "interface/build" ]; then
    echo "✅ Pasta build criada com sucesso!"
    echo "📁 Conteúdo da pasta build:"
    ls -la interface/build/
else
    echo "❌ Erro: Pasta build não foi criada!"
    exit 1
fi

echo "🎉 Build concluído com sucesso!"
echo "🚀 O servidor pode ser iniciado com: node index.js"
