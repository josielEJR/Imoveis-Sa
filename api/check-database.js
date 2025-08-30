const pool = require('./database')

console.log('🔍 Verificando estrutura do banco de dados...')

async function checkDatabase() {
    try {
        // Verificar se o banco está conectando
        console.log('✅ Testando conexão...')
        const result = await pool.query('SELECT NOW()')
        console.log('✅ Conexão OK:', result.rows[0].now)

        // Verificar tabelas existentes
        console.log('\n📋 Verificando tabelas...')
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `)
        
        console.log('📊 Tabelas encontradas:')
        if (tables.rows.length === 0) {
            console.log('❌ Nenhuma tabela encontrada!')
        } else {
            tables.rows.forEach(table => {
                console.log(`   - ${table.table_name}`)
            })
        }

        // Verificar estrutura da tabela consultores (se existir)
        if (tables.rows.some(t => t.table_name === 'consultores')) {
            console.log('\n🔍 Estrutura da tabela consultores:')
            const structure = await pool.query(`
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns
                WHERE table_name = 'consultores'
                ORDER BY ordinal_position
            `)
            
            structure.rows.forEach(col => {
                console.log(`   - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'NOT NULL'})`)
            })

            // Verificar dados
            console.log('\n📊 Dados na tabela consultores:')
            const data = await pool.query('SELECT COUNT(*) as total FROM consultores')
            console.log(`   Total de registros: ${data.rows[0].total}`)
            
            if (data.rows[0].total > 0) {
                const sample = await pool.query('SELECT * FROM consultores LIMIT 3')
                console.log('   Amostra dos dados:')
                sample.rows.forEach(row => {
                    console.log(`     - ID: ${row.consultorid}, Nome: ${row.nome}`)
                })
            }
        }

        // Verificar estrutura da tabela clientes (se existir)
        if (tables.rows.some(t => t.table_name === 'clientes')) {
            console.log('\n🔍 Estrutura da tabela clientes:')
            const structure = await pool.query(`
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns
                WHERE table_name = 'clientes'
                ORDER BY ordinal_position
            `)
            
            structure.rows.forEach(col => {
                console.log(`   - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'NOT NULL'})`)
            })

            // Verificar dados
            const data = await pool.query('SELECT COUNT(*) as total FROM clientes')
            console.log(`   Total de registros: ${data.rows[0].total}`)
        }

        // Verificar estrutura da tabela imoveis (se existir)
        if (tables.rows.some(t => t.table_name === 'imoveis')) {
            console.log('\n🔍 Estrutura da tabela imoveis:')
            const structure = await pool.query(`
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns
                WHERE table_name = 'imoveis'
                ORDER BY ordinal_position
            `)
            
            structure.rows.forEach(col => {
                console.log(`   - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'NOT NULL'})`)
            })

            // Verificar dados
            const data = await pool.query('SELECT COUNT(*) as total FROM imoveis')
            console.log(`   Total de registros: ${data.rows[0].total}`)
        }

    } catch (error) {
        console.error('❌ Erro ao verificar banco:', error.message)
        console.error('Detalhes:', error)
    } finally {
        await pool.end()
    }
}

// Executar se este arquivo for executado diretamente
if (require.main === module) {
    checkDatabase()
}

module.exports = { checkDatabase }
