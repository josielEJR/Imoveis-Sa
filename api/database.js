const mysql = require('mysql')

console.log('Começando a conexão com o banco de dados ...')

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'database',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'websiteInfo',
})
connection.connect(err => {
    if (err) {
        console.log('Error ao se conectar com o banco de dados:', err)
        process.exit(1)
    }
    return console.log('conectado ao banco de dados !')
})

module.exports = connection