const { Pool } = require('pg')
require('dotenv').config()
console.log('🔍 Teste de Conectividade PostgreSQL')
console.log('=====================================')

// Verificar variáveis de ambiente
console.log('\n📋 Variáveis de Ambiente:')
console.log('DB_HOST:', process.env.DB_HOST)
console.log('DB_PORT:', process.env.DB_PORT || '5432 (padrão)')
console.log('DB_USER:', process.env.DB_USER)
console.log('DB_NAME:', process.env.DB_NAME)
console.log('NODE_ENV:', process.env.NODE_ENV)

// Testar diferentes configurações
const configs = [
    {
        name: 'SSL Obrigatório',
        config: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false,
                require: true
            },
            connectionTimeoutMillis: 10000
        }
    },
    {
        name: 'SSL Opcional',
        config: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false
            },
            connectionTimeoutMillis: 10000
        }
    },
    {
        name: 'Sem SSL',
        config: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: false,
            connectionTimeoutMillis: 10000
        }
    },
    {
        name: 'String de Conexão SSL',
        config: {
            connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}?sslmode=require`,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 10000
        }
    }
]

async function testConfig(config, index) {
    console.log(`\n🔄 Testando Configuração ${index + 1}: ${config.name}`)
    
    try {
        const pool = new Pool(config.config)
        
        // Testar conexão
        const client = await pool.connect()
        const result = await client.query('SELECT NOW() as current_time, version() as pg_version')
        
        console.log('✅ SUCESSO!')
        console.log('   Hora atual:', result.rows[0].current_time)
        console.log('   Versão PostgreSQL:', result.rows[0].pg_version.split(' ')[1])
        
        client.release()
        await pool.end()
        
        return { success: true, config: config.name }
        
    } catch (error) {
        console.log('❌ FALHOU!')
        console.log('   Código:', error.code)
        console.log('   Mensagem:', error.message)
        console.log('   Detalhes:', error.detail)
        
        return { success: false, config: config.name, error: error.message }
    }
}

async function runTests() {
    console.log('\n🚀 Iniciando testes de conectividade...\n')
    
    const results = []
    
    for (let i = 0; i < configs.length; i++) {
        const result = await testConfig(configs[i], i)
        results.push(result)
        
        // Aguardar um pouco entre testes
        if (i < configs.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000))
        }
    }
    
    // Resumo dos resultados
    console.log('\n📊 RESUMO DOS TESTES:')
    console.log('=====================')
    
    const successful = results.filter(r => r.success)
    const failed = results.filter(r => !r.success)
    
    if (successful.length > 0) {
        console.log('\n✅ CONFIGURAÇÕES QUE FUNCIONARAM:')
        successful.forEach(r => console.log(`   - ${r.config}`))
        
        console.log('\n💡 RECOMENDAÇÃO:')
        console.log(`   Use a configuração: "${successful[0].config}"`)
    }
    
    if (failed.length > 0) {
        console.log('\n❌ CONFIGURAÇÕES QUE FALHARAM:')
        failed.forEach(r => console.log(`   - ${r.config}: ${r.error}`))
    }
    
    if (successful.length === 0) {
        console.log('\n🚨 NENHUMA CONFIGURAÇÃO FUNCIONOU!')
        console.log('   Verifique:')
        console.log('   - Credenciais do banco')
        console.log('   - Status do banco no Render')
        console.log('   - Região do banco vs serviço')
        console.log('   - Firewall/restrições de rede')
    }
}

// Executar testes se este arquivo for executado diretamente
if (require.main === module) {
    runTests().catch(console.error)
}

module.exports = { testConfig, runTests }
