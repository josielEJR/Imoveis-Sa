const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const routes = require('./router')

const app = express()
const port = process.env.PORT || 3001

// Configurar CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://imoveis-sa.onrender.com', 'https://www.imoveis-sa.onrender.com']
        : true,
    credentials: true
}))

// Configurar CSP headers
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https:; " +
        "frame-src 'none';"
    )
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Health check para o wait-on
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', routes)

// Servir arquivos estáticos do frontend em produção
if (process.env.NODE_ENV === 'production') {
    // Servir arquivos estáticos do build
    app.use(express.static(path.join(__dirname, '../interface/dist')))
    
    // Para todas as outras rotas, servir o index.html (SPA)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../interface/dist/index.html'))
    })
}

app.listen(port, () => { 
   console.log('server started at port ' + port)
})
