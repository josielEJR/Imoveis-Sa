# 🗄️ Scripts PostgreSQL para Imóveis SA

## ✅ Conversão Completa MySQL → PostgreSQL

Todos os scripts foram convertidos e estão prontos para uso no Render!

## 📁 Arquivos Convertidos

| Arquivo | Descrição | Principais Mudanças |
|---------|-----------|---------------------|
| `01_consultores.sql` | Tabela de consultores | `AUTO_INCREMENT` → `SERIAL` |
| `02_clientes.sql` | Tabela de clientes | `AUTO_INCREMENT` → `SERIAL` |
| `03_imoveis.sql` | Tabela de imóveis | `ENUM` → `CHECK constraints` |
| `04_visitas.sql` | Tabela de visitas | `DATETIME` → `TIMESTAMP` |
| `05_imagens.sql` | Tabela de imagens | `INT AUTO_INCREMENT` → `SERIAL` |
| `06_favoritos.sql` | Tabela de favoritos | `INT` → `INTEGER` |

## 🚀 Como Executar

### Opção 1: Script Completo (Recomendado)
```bash
psql -h seu-host -U seu-usuario -d websiteInfo -f 00_setup_completo.sql
```

### Opção 2: Scripts Individuais
```bash
# Conectar ao banco
psql -h seu-host -U seu-usuario -d websiteInfo

# Executar cada script
\i 01_consultores.sql
\i 02_clientes.sql
\i 03_imoveis.sql
\i 04_visitas.sql
\i 05_imagens.sql
\i 06_favoritos.sql
```

### Opção 3: pgAdmin (Interface Gráfica)
1. Abra o pgAdmin
2. Conecte ao seu banco PostgreSQL
3. Abra cada arquivo `.sql`
4. Execute cada script

## 🔧 Principais Mudanças na Conversão

### 1. **AUTO_INCREMENT → SERIAL**
```sql
-- MySQL
id INT AUTO_INCREMENT PRIMARY KEY

-- PostgreSQL
id SERIAL PRIMARY KEY
```

### 2. **ENUM → CHECK Constraints**
```sql
-- MySQL
disponibilidade ENUM('venda', 'aluguel', 'venda_e_aluguel')

-- PostgreSQL
disponibilidade VARCHAR(20) CHECK (disponibilidade IN ('venda', 'aluguel', 'venda_e_aluguel'))
```

### 3. **DATETIME → TIMESTAMP**
```sql
-- MySQL
data_visita DATETIME

-- PostgreSQL
data_visita TIMESTAMP
```

### 4. **USE database → Removido**
```sql
-- MySQL
USE websiteInfo;

-- PostgreSQL
-- Conectar diretamente ao banco
```

## 📋 Ordem de Execução

**IMPORTANTE**: Execute na ordem correta devido às foreign keys:

1. ✅ `01_consultores.sql` (sem dependências)
2. ✅ `02_clientes.sql` (sem dependências)
3. ✅ `03_imoveis.sql` (depende de consultores)
4. ✅ `04_visitas.sql` (depende de clientes, imóveis, consultores)
5. ✅ `05_imagens.sql` (depende de imóveis)
6. ✅ `06_favoritos.sql` (depende de clientes, imóveis)

## 🆘 Solução de Problemas

### Erro: "relation does not exist"
- **Causa**: Tabela não foi criada
- **Solução**: Execute os scripts na ordem correta

### Erro: "syntax error at or near"
- **Causa**: Comando MySQL não reconhecido
- **Solução**: Use os scripts convertidos para PostgreSQL

### Erro: "permission denied"
- **Causa**: Usuário sem permissões
- **Solução**: Verifique credenciais e permissões

## 🎯 Próximos Passos

1. ✅ Scripts convertidos
2. 🔄 Criar banco PostgreSQL no Render
3. 🔄 Configurar variáveis de ambiente
4. 🔄 Executar scripts SQL
5. 🔄 Fazer deploy

## 💡 Dicas

- **Backup**: Sempre faça backup antes de executar
- **Teste**: Teste em ambiente de desenvolvimento primeiro
- **Logs**: Monitore os logs durante a execução
- **Verificação**: Confirme que todas as tabelas foram criadas
