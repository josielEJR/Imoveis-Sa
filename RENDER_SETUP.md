# Configuração do Deploy no Render

## Problema Resolvido ✅
- ✅ Arquivo `index.js` criado na raiz
- ✅ Configuração do servidor para usar `process.env.PORT`
- ✅ Variáveis de ambiente configuradas para banco de dados

## Configuração do Banco de Dados

### Opção 1: Banco MySQL Externo (Recomendado)
1. **PlanetScale** (gratuito): https://planetscale.com/
2. **Railway** (gratuito): https://railway.app/
3. **Clever Cloud** (gratuito): https://www.clever-cloud.com/

### Opção 2: Render PostgreSQL (Alternativa)
Se preferir usar PostgreSQL (que o Render oferece nativamente):
1. Crie um banco PostgreSQL no Render
2. Instale: `npm install mysql2` ou `npm install pg`
3. Atualize as variáveis de ambiente

## Variáveis de Ambiente no Render

No painel do Render, configure estas variáveis:

```
DB_HOST=seu-host-mysql.com
DB_PORT=3306
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=websiteInfo
NODE_ENV=production
PORT=10000
```

## Comandos de Deploy

- **Build Command**: `npm install && cd api && npm install`
- **Start Command**: `node index.js`

## Estrutura do Projeto

```
/
├── index.js          ← Ponto de entrada principal
├── api/
│   ├── server.js     ← Servidor Express
│   ├── database.js   ← Conexão com banco
│   └── package.json  ← Dependências da API
├── interface/        ← Frontend React
└── package.json      ← Dependências principais
```

## Próximos Passos

1. Escolha um provedor de banco MySQL
2. Configure as variáveis de ambiente no Render
3. Faça o deploy novamente
4. O erro de conexão com banco deve ser resolvido
