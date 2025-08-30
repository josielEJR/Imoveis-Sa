const { Pool } = require('pg')

console.log('Começando a conexão com o banco de dados PostgreSQL...')

// Debug: Verificar variáveis de ambiente
console.log('Variáveis de ambiente:')
console.log('DB_HOST:', process.env.DB_HOST)
console.log('DB_PORT:', process.env.DB_PORT)
console.log('DB_USER:', process.env.DB_USER)
console.log('DB_NAME:', process.env.DB_NAME)
console.log('NODE_ENV:', process.env.NODE_ENV)

// Verificar se todas as variáveis necessárias estão definidas
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error('❌ Variáveis de ambiente obrigatórias não definidas!')
    console.error('Verifique: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME')
    process.exit(1)
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
        require: true
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 20
})

// Teste de conexão
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Erro ao conectar com o banco de dados:')
        console.error('Código:', err.code)
        console.error('Mensagem:', err.message)
        console.error('Detalhes:', err.detail)
        console.error('Dica:', err.hint)
        
        // Não encerrar o processo, apenas logar o erro
        console.error('❌ Falha na conexão com banco, mas servidor continuará rodando')
        return
    }
    console.log('✅ Conectado ao banco de dados PostgreSQL!', res.rows[0])
})

// Tratamento de erros de conexão
pool.on('error', (err) => {
    console.error('❌ Erro no pool de conexões:', err)
})

pool.on('connect', () => {
    console.log('✅ Nova conexão estabelecida com PostgreSQL')
})

module.exports = pool