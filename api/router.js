const express = require('express')
const app = express.Router()
const path = require('path')

// Health check para o wait-on
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/imoveis', require('./rotas/imoveis'))
app.use('/visita', require('./rotas/visita'))
app.use('/consultores', require('./rotas/consultores'))
app.use('/clientes', require('./rotas/clientes'))

app.use((req, res, next) => {
    console.log(`Requisição para: ${req.url}`);
    next();
  })

app.use('/imagens', express.static(path.join(__dirname, 'imagens')))
app.use('/imagens-imovel', express.static(path.join(__dirname, 'imagens-imovel')))
app.use('/imagens-corretor', express.static(path.join(__dirname, 'imagens-corretor')))

module.exports = app