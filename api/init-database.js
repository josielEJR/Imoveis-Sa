const pool = require('./database')
const fs = require('fs')
const path = require('path')

console.log('🚀 Inicializando banco de dados PostgreSQL...')

async function initDatabase() {
    try {
        // Verificar conexão
        console.log('✅ Testando conexão...')
        const result = await pool.query('SELECT NOW()')
        console.log('✅ Conexão OK:', result.rows[0].now)

        // Verificar se as tabelas já existem
        console.log('\n📋 Verificando tabelas existentes...')
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `)
        
        const existingTables = tables.rows.map(t => t.table_name)
        console.log('📊 Tabelas encontradas:', existingTables)

        // Scripts SQL para executar
        const sqlFiles = [
            '01_consultores.sql',
            '02_clientes.sql', 
            '03_imoveis.sql',
            '04_visitas.sql',
            '05_imagens.sql',
            '06_favoritos.sql'
        ]

        // Executar cada script SQL
        for (const sqlFile of sqlFiles) {
            const tableName = sqlFile.replace('.sql', '').replace(/^\d+_/, '')
            
            // Pular se a tabela já existe
            if (existingTables.includes(tableName)) {
                console.log(`⏭️  Tabela ${tableName} já existe, pulando...`)
                continue
            }

            console.log(`🔨 Executando ${sqlFile}...`)
            
            try {
                const sqlPath = path.join(__dirname, 'tabelas-postgres', sqlFile)
                const sqlContent = fs.readFileSync(sqlPath, 'utf8')
                
                // Executar o SQL
                await pool.query(sqlContent)
                console.log(`✅ ${sqlFile} executado com sucesso!`)
                
            } catch (error) {
                console.error(`❌ Erro ao executar ${sqlFile}:`, error.message)
                // Continuar com os próximos scripts
            }
        }

        // Verificar resultado final
        console.log('\n📊 Verificação final das tabelas...')
        const finalTables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `)
        
        console.log('🎯 Tabelas criadas:')
        finalTables.rows.forEach(table => {
            console.log(`   - ${table.table_name}`)
        })

        // Verificar dados nas tabelas principais
        if (finalTables.rows.some(t => t.table_name === 'consultores')) {
            const count = await pool.query('SELECT COUNT(*) as total FROM consultores')
            console.log(`📊 Consultores: ${count.rows[0].total} registros`)
        }

        if (finalTables.rows.some(t => t.table_name === 'clientes')) {
            const count = await pool.query('SELECT COUNT(*) as total FROM clientes')
            console.log(`📊 Clientes: ${count.rows[0].total} registros`)
        }

        if (finalTables.rows.some(t => t.table_name === 'imoveis')) {
            const count = await pool.query('SELECT COUNT(*) as total FROM imoveis')
            console.log(`📊 Imóveis: ${count.rows[0].total} registros`)
        }

        console.log('\n🎉 Banco de dados inicializado com sucesso!')

    } catch (error) {
        console.error('❌ Erro ao inicializar banco:', error.message)
        console.error('Detalhes:', error)
    }
}

// Executar se este arquivo for executado diretamente
if (require.main === module) {
    initDatabase()
}

module.exports = { initDatabase }
