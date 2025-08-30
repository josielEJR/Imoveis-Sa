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

// Tentar diferentes configurações SSL
let pool;
try {
    // Primeira tentativa: SSL com configuração padrão
    pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false,
            require: true
        },
        connectionTimeoutMillis: 15000,
        idleTimeoutMillis: 30000,
        max: 20
    });
    console.log('✅ Pool criado com SSL obrigatório');
} catch (error) {
    console.log('⚠️ Erro na primeira tentativa, tentando sem SSL...');
    try {
        // Segunda tentativa: sem SSL
        pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectionTimeoutMillis: 15000,
            idleTimeoutMillis: 30000,
            max: 20
        });
        console.log('✅ Pool criado sem SSL');
    } catch (error2) {
        console.error('❌ Falha em ambas as tentativas:', error2);
        process.exit(1);
    }
}

// Teste de conexão com retry
let connectionAttempts = 0;
const maxAttempts = 3;

function testConnection() {
    connectionAttempts++;
    console.log(`🔄 Tentativa ${connectionAttempts} de ${maxAttempts}...`);
    
    pool.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.error(`❌ Tentativa ${connectionAttempts} falhou:`)
            console.error('Código:', err.code)
            console.error('Mensagem:', err.message)
            console.error('Detalhes:', err.detail)
            console.error('Dica:', err.hint)
            
            if (connectionAttempts < maxAttempts) {
                console.log(`⏳ Aguardando 5 segundos antes da próxima tentativa...`)
                setTimeout(testConnection, 5000);
            } else {
                console.error('❌ Todas as tentativas falharam. Servidor continuará rodando sem banco.')
                console.error('❌ Verifique as configurações de SSL e conectividade.')
            }
            return
        }
        console.log('✅ Conectado ao banco de dados PostgreSQL!', res.rows[0])
        console.log('✅ Conexão estabelecida com sucesso!')
    })
}

// Primeira tentativa
testConnection();

// Tratamento de erros de conexão
pool.on('error', (err) => {
    console.error('❌ Erro no pool de conexões:', err)
})

pool.on('connect', () => {
    console.log('✅ Nova conexão estabelecida com PostgreSQL')
})

module.exports = pool