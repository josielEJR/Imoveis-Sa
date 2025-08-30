# 🔍 Teste de Conectividade PostgreSQL

## 🚀 Como Testar a Conexão

### Opção 1: Teste Automático (Recomendado)
```bash
cd api
node test-connection.js
```

Este comando irá:
- ✅ Testar 4 configurações diferentes de SSL
- ✅ Mostrar qual funciona melhor
- ✅ Dar diagnóstico detalhado de problemas
- ✅ Recomendar a melhor configuração

### Opção 2: Teste Manual
```bash
cd api
node -e "
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: 'postgresql://jr:sua_senha@dpg-xxxxx-a.oregon-postgres.render.com:5432/websiteinfo?sslmode=require',
    ssl: { rejectUnauthorized: false }
})
pool.query('SELECT NOW()', (err, res) => {
    if (err) console.error('❌ Erro:', err.message)
    else console.log('✅ Sucesso:', res.rows[0])
    process.exit()
})
"
```

## 📋 O que o Teste Verifica

1. **SSL Obrigatório** - Configuração mais restritiva
2. **SSL Opcional** - Configuração intermediária  
3. **Sem SSL** - Configuração menos segura
4. **String de Conexão SSL** - Configuração mais robusta

## 🔧 Configurações Testadas

### Configuração 1: SSL Obrigatório
```javascript
ssl: {
    rejectUnauthorized: false,
    require: true
}
```

### Configuração 2: SSL Opcional
```javascript
ssl: {
    rejectUnauthorized: false
}
```

### Configuração 3: Sem SSL
```javascript
ssl: false
```

### Configuração 4: String de Conexão (Recomendada)
```javascript
const connectionString = 'postgresql://usuario:senha@host:5432/banco?sslmode=require'
ssl: { rejectUnauthorized: false }
```

## 📊 Interpretando os Resultados

### ✅ SUCESSO
- **Hora atual**: Confirma que o banco está respondendo
- **Versão PostgreSQL**: Confirma compatibilidade

### ❌ FALHA
- **Código**: Código de erro específico
- **Mensagem**: Descrição do problema
- **Detalhes**: Informações adicionais

## 🚨 Problemas Comuns

### 1. **Connection terminated unexpectedly**
- **Causa**: Problema de SSL/TLS
- **Solução**: Usar string de conexão com `sslmode=require`

### 2. **no PostgreSQL user name specified**
- **Causa**: Variáveis de ambiente não lidas
- **Solução**: Verificar configuração no Render

### 3. **Connection timeout**
- **Causa**: Firewall ou latência de rede
- **Solução**: Verificar região do banco vs serviço

## 💡 Dicas de Debug

1. **Execute o teste** primeiro para identificar o problema
2. **Verifique as variáveis** de ambiente no Render
3. **Confirme o status** do banco PostgreSQL
4. **Teste a conectividade** externa se possível

## 🔄 Próximos Passos

1. **Execute**: `node test-connection.js`
2. **Analise** os resultados
3. **Use a configuração** que funcionou
4. **Faça deploy** das correções
5. **Monitore** os logs

## 📞 Se Nada Funcionar

1. **Verifique o status** do banco no Render
2. **Confirme a região** (deve ser a mesma)
3. **Recreie o banco** se necessário
4. **Teste com psql** externamente

---

**🎯 Execute o teste primeiro para diagnosticar o problema!**
