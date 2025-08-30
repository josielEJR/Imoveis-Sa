# 🐘 Configuração PostgreSQL no Render - Passo a Passo

## ✅ O que já foi configurado:
- ✅ Driver PostgreSQL instalado (`pg`)
- ✅ `database.js` atualizado para PostgreSQL
- ✅ `package.json` atualizado
- ✅ `render.yaml` configurado

## 📋 Passo a Passo Completo

### 🔧 Passo 1: Criar Banco PostgreSQL no Render

1. **Acesse**: https://dashboard.render.com/
2. **Clique**: "New +" → "PostgreSQL"
3. **Configure**:
   - **Name**: `imoveis-sa-db`
   - **Database**: `websiteInfo`
   - **User**: deixe padrão ou escolha um nome
   - **Region**: mais próxima dos usuários
   - **PostgreSQL Version**: `15`
   - **Plan**: `Free`

### 🔑 Passo 2: Obter Credenciais de Conexão

Após criar o banco, você verá:
- **Host**: `dpg-xxxxx-a.oregon-postgres.render.com`
- **Port**: `5432`
- **Database**: `websiteInfo`
- **User**: `seu_usuario`
- **Password**: `sua_senha`

### ⚙️ Passo 3: Configurar Variáveis de Ambiente no Render

No seu serviço web no Render, configure:

```
DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=websiteInfo
NODE_ENV=production
PORT=10000
```

### 🗄️ Passo 4: Criar Tabelas no PostgreSQL

**IMPORTANTE**: As tabelas MySQL precisam ser convertidas para PostgreSQL!

#### Opção A: Usar pgAdmin (Recomendado)
1. Acesse: https://www.pgadmin.org/
2. Conecte ao seu banco usando as credenciais
3. Execute os scripts SQL convertidos

#### Opção B: Usar psql (Terminal)
```bash
psql -h seu-host -U seu-usuario -d websiteInfo
```

### 📝 Passo 5: Scripts SQL Convertidos

Criei uma pasta `api/tabelas-postgres/` com os scripts convertidos.

**Exemplo de conversão MySQL → PostgreSQL**:
```sql
-- MySQL
CREATE TABLE consultores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- PostgreSQL
CREATE TABLE consultores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);
```

### 🚀 Passo 6: Deploy

1. **Commit** das alterações
2. **Push** para o repositório
3. **Render** fará deploy automático

## 🔍 Verificar Funcionamento

Após o deploy, verifique os logs:
- ✅ "Conectado ao banco de dados PostgreSQL!"
- ❌ Sem erros de conexão

## 🆘 Solução de Problemas

### Erro: "relation does not exist"
- **Causa**: Tabelas não foram criadas
- **Solução**: Execute os scripts SQL no PostgreSQL

### Erro: "connection refused"
- **Causa**: Credenciais incorretas
- **Solução**: Verifique variáveis de ambiente

### Erro: "SSL required"
- **Causa**: Render requer SSL
- **Solução**: Já configurado no código

## 📚 Próximos Passos

1. ✅ Criar banco PostgreSQL no Render
2. ✅ Configurar variáveis de ambiente
3. ✅ Executar scripts SQL para criar tabelas
4. ✅ Fazer deploy
5. ✅ Testar conexão

## 💡 Dicas

- **Backup**: Sempre faça backup antes de migrar
- **Teste**: Teste localmente primeiro
- **Logs**: Monitore os logs do Render
- **SSL**: Render requer SSL para conexões de banco
