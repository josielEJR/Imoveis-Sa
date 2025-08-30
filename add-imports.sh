#!/bin/bash

echo "📥 Adicionando imports do API_URLS em todos os arquivos JSX..."

# Verificar se estamos na pasta raiz
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na pasta raiz do projeto"
    exit 1
fi

# Contador de arquivos processados
count=0

# Processar cada arquivo JSX
find interface/src -name "*.jsx" -type f | while read -r file; do
    echo "📝 Processando: $file"
    
    # Verificar se já tem import do API_URLS
    if grep -q "import.*API_URLS" "$file"; then
        echo "   ⏭️  Já tem import, pulando..."
        continue
    fi
    
    # Calcular o caminho relativo para o config/api.js
    relative_path=$(echo "$file" | sed 's|interface/src/||')
    depth=$(echo "$relative_path" | tr -cd '/' | wc -c)
    
    # Construir o caminho de import
    if [ $depth -eq 0 ]; then
        import_path="config/api"
    elif [ $depth -eq 1 ]; then
        import_path="../config/api"
    elif [ $depth -eq 2 ]; then
        import_path="../../config/api"
    elif [ $depth -eq 3 ]; then
        import_path="../../../config/api"
    elif [ $depth -eq 4 ]; then
        import_path="../../../../config/api"
    else
        import_path="../../../../config/api"
    fi
    
    # Adicionar import no início do arquivo (após outros imports)
    # Encontrar a última linha de import
    last_import_line=$(grep -n "^import" "$file" | tail -1 | cut -d: -f1 2>/dev/null || echo "0")
    
    if [ "$last_import_line" -gt 0 ]; then
        # Adicionar após a última linha de import
        sed -i "${last_import_line}a\\
import { API_URLS } from '${import_path}';" "$file"
        echo "   ✅ Import adicionado: import { API_URLS } from '${import_path}';"
    else
        # Se não há imports, adicionar no início
        sed -i "1i\\
import { API_URLS } from '${import_path}';" "$file"
        echo "   ✅ Import adicionado no início: import { API_URLS } from '${import_path}';"
    fi
    
    count=$((count + 1))
done

echo ""
echo "🎉 Processo concluído!"
echo "📊 Arquivos processados: $count"
echo ""
echo "📋 Próximos passos:"
echo "   1. Verificar se os imports foram adicionados corretamente"
echo "   2. Fazer o build do frontend"
echo "   3. Fazer o deploy"
echo ""
echo "💡 Dica: Verifique alguns arquivos para confirmar que os imports estão corretos"
