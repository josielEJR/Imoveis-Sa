const express = require('express')
const router = express.Router()
const pool = require('../database')
const jwt = require('jsonwebtoken')
const path = require('path')

// conexão a tabela "clientes"
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM clientes`, (err, results) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err)
            return res.status(500).json({ error: 'Erro ao buscar clientes' })
        }
        res.json(results.rows)
    })
})

// rota para login 
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
  
    pool.query('SELECT * FROM clientes WHERE email = $1', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuário no banco de dados' });
      }
  
      if (results.rows.length === 0 || results.rows[0].senha !== senha) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      const token = jwt.sign({ clienteId: results.rows[0].clienteid }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  })

// rota para cadastrar clientes
router.post('/cadastrar', (req, res) => {

    const { nome, email, senha, cpf, celular } = req.body

    pool.query(`SELECT * FROM clientes`, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao verificar clientes existentes' })
        }

        let estaPresente = false
        results.rows.forEach(val => {
            if (val.email === email || val.cpf === cpf ) {
                estaPresente = true
            }
        })

        if (estaPresente) {
            res.send({ mensagem: "usuário ja esta cadastrado" })
        } else {
            pool.query(
                'INSERT INTO clientes (nome, email, senha, cpf, celular) VALUES ($1, $2, $3, $4, $5) RETURNING clienteid', 
                [nome, email, senha, cpf, celular], 
                (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ error: 'Erro ao cadastrar cliente' })
                    }
                    const newId = result.rows[0].clienteid
                    res.send({ userID: newId, nome, email, senha, cpf, celular })
                }
            )
        }
    })
})

// Rota para buscar po email 
router.get('/busca', (req, res) => {
    const { email } = req.query

    if (!email) {
        return res.status(400).json({error: 'Parametro email é obrigatorio' })
    }

    pool.query('SELECT * FROM clientes WHERE email = $1', [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar por clientes:', err)
            return res.status(500).json({error: 'Erro ao buscar por clientes'})
        }
        if (results.rows.length === 0) {
            return res.status(500).json({ error: 'Nenhum cliente cadastrado com este email'})
        }

        res.status(200).json(results.rows)
    })
})

// rota para buscar foto por id 
router.get('/imagensclientes/:id', (req, res) => {
    const id = req.params.id.trim()
    const caminhoImagem = path.join(__dirname, '../imagens', `foto${id}.jpg`)
    
    console.log(caminhoImagem)
    
    res.sendFile(caminhoImagem, (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err)
            res.status(404).send('Imagem não encontrada')
        }
    })
})

module.exports = router