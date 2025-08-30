const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./router')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Health check para o wait-on
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/', routes)


app.listen(port, () => { 
   console.log('server started at port ' + port)
})
