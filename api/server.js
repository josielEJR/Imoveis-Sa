const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const routes = require('./router')
const { initDatabase } = require('./init-database')

const app = express()
const port = process.env.PORT || 3001

// Configurar CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://imoveis-sa.onrender.com', 'https://www.imoveis-sa.onrender.com']
        : true,
    credentials: true
}))

// Configurar CSP headers mais permissivos
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
        "style-src 'self' 'unsafe-inline' https: data:; " +
        "font-src 'self' https: data:; " +
        "img-src 'self' data: https: blob:; " +
        "connect-src 'self' https: ws: wss:; " +
        "media-src 'self' data: https:; " +
        "object-src 'none'; " +
        "frame-src 'self' https:;"
    )
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// API routes (incluindo health check)
app.use('/api', routes)

// Servir arquivos estáticos do frontend (sempre)
app.use(express.static(path.join(__dirname, '../interface/dist')))

// Para todas as outras rotas, servir o index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../interface/dist/index.html'))
})

// Inicializar banco de dados e depois iniciar servidor
async function startServer() {
    try {
        console.log('🚀 Iniciando servidor...')
        
        // Inicializar banco de dados
        await initDatabase()
        
        // Iniciar servidor após inicializar banco
        app.listen(port, () => { 
            console.log('✅ Servidor iniciado na porta', port)
            console.log('🎉 Aplicação pronta para uso!')
        })
        
    } catch (error) {
        console.error('❌ Erro ao inicializar servidor:', error)
        process.exit(1)
    }
}

// Iniciar servidor
startServer()
