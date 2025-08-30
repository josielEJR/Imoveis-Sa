#!/bin/bash

echo "🔧 Corrigindo URLs finais da API..."

# Verificar se estamos na pasta raiz
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na pasta raiz do projeto"
    exit 1
fi

echo "📝 Substituindo URLs hardcoded por constantes..."

# Substituir fetch('API_URLS.XXX') por fetch(API_URLS.XXX)
find interface/src -name "*.jsx" -type f -exec sed -i "s|fetch('API_URLS\.|fetch(|g" {} \;
find interface/src -name "*.jsx" -type f -exec sed -i "s|fetch(\"API_URLS\.|fetch(|g" {} \;

# Substituir URLs específicas por constantes
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.CONSULTORES|API_URLS.CONSULTORES|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.CLIENTES|API_URLS.CLIENTES|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS|API_URLS.IMOVEIS|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.VISITAS|API_URLS.VISITAS|g' {} \;

# Substituir URLs de imagens
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.CONSULTORES/imagensconsultores|API_URLS.CONSULTORES_IMAGEM|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.CLIENTES/imagensclientes|API_URLS.CLIENTES_IMAGEM|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/imagensimovel|API_URLS.IMOVEIS_IMAGEM|g' {} \;

# Substituir URLs específicas de endpoints
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/busca|API_URLS.IMOVEIS_BUSCA|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/adicionar|API_URLS.IMOVEIS_ADICIONAR|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/ordenarimovelqualidade|API_URLS.IMOVEIS_ORDENAR_QUALIDADE|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/cidadesvenda|API_URLS.IMOVEIS_CIDADES_VENDA|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/cidadesaluguel|API_URLS.IMOVEIS_CIDADES_ALUGUEL|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/cidades|API_URLS.IMOVEIS_CIDADES|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/buscarimovelid|API_URLS.IMOVEIS_BUSCAR_ID|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/porConsultor|API_URLS.IMOVEIS_POR_CONSULTORES|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/favoritos|API_URLS.IMOVEIS_FAVORITOS|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/adicionarimovelfavorito|API_URLS.IMOVEIS_ADICIONAR_FAVORITO|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.IMOVEIS/removerimovelfavorito|API_URLS.IMOVEIS_REMOVER_FAVORITO|g' {} \;

find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.CONSULTORES/busca|API_URLS.CONSULTORES_BUSCA|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.CONSULTORES/buscarconsultorid|API_URLS.CONSULTORES_BUSCAR_ID|g' {} \;

find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.CLIENTES/login|API_URLS.CLIENTES_LOGIN|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.CLIENTES/cadastrar|API_URLS.CLIENTES_CADASTRAR|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.CLIENTES/busca|API_URLS.CLIENTES_BUSCA|g' {} \;

find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.VISITAS/visitas|API_URLS.VISITAS|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.VISITAS/getconsultores|API_URLS.VISITAS_GET_CONSULTORES|g' {} \;
find interface/src -name "*.jsx" -type f -exec sed -i 's|API_URLS\.VISITAS/agendarvisita|API_URLS.VISITAS_AGENDAR|g' {} \;

echo "✅ URLs corrigidas!"
echo "🎉 Agora você pode fazer o build e deploy!"
