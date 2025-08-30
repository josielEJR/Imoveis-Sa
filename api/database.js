const { Pool } = require('pg')

console.log('Começando a conexão com o banco de dados PostgreSQL...')

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

// Teste de conexão
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Erro ao conectar com o banco de dados:', err)
        process.exit(1)
    }
    console.log('Conectado ao banco de dados PostgreSQL!', res.rows[0])
})

module.exports = pool