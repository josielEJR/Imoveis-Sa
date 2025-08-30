#!/bin/bash

echo "🔧 Corrigindo URLs da API no frontend..."

# Verificar se estamos na pasta raiz
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na pasta raiz do projeto"
    exit 1
fi

# Substituir URLs hardcoded por referências ao arquivo de configuração
echo "📝 Substituindo URLs hardcoded..."

# Substituir fetch('http://localhost:3001/...') por fetch(API_URLS.XXX)
find interface/src -name "*.jsx" -type f -exec sed -i 's|fetch("http://localhost:3001/consultores"|fetch(API_URLS.CONSULTORES|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|fetch("http://localhost:3001/clientes"|fetch(API_URLS.CLIENTES|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|fetch("http://localhost:3001/imoveis"|fetch(API_URLS.IMOVEIS|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|fetch("http://localhost:3001/visita"|fetch(API_URLS.VISITAS|g' {} \;

# Substituir URLs específicas
find interface/src -name "*.jsx" -type f -exec sed -i 's|http://localhost:3001/consultores|API_URLS.CONSULTORES|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|http://localhost:3001/clientes|API_URLS.CLIENTES|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|http://localhost:3001/imoveis|API_URLS.IMOVEIS|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|http://localhost:3001/visita|API_URLS.VISITAS|g' {} \;

# Substituir URLs de imagens
find interface/src -name "*.jsx" -type f -exec sed -i 's|http://localhost:3001/consultores/imagensconsultores|API_URLS.CONSULTORES_IMAGEM|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|http://localhost:3001/clientes/imagensclientes|API_URLS.CLIENTES_IMAGEM|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|http://localhost:3001/imoveis/imagensimovel|API_URLS.IMOVEIS_IMAGEM|g' {} \;

echo "✅ URLs corrigidas!"
echo "📋 Agora você precisa:"
echo "   1. Importar API_URLS em cada arquivo JSX"
echo "   2. Substituir as URLs hardcoded pelas constantes"
echo "   3. Fazer o build e deploy"
