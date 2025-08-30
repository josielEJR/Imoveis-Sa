const express = require('express')
const router = express.Router()
const pool = require('../database')
const jwt = require('jsonwebtoken')
const authconsultor = require('../middleware/authConsultor')
const path = require('path')

// conexão a tabela "consultor"
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM consultores`, (err, results) => {
        if (err) {
            console.error('Erro ao buscar consultores:', err)
            return res.status(500).json({ error: 'Erro ao buscar consultores' })
        }
        res.json(results.rows)
    })
})

// rota para login de consultor
router.post('/login', (req, res) => {
    const { consultor_email, senha } = req.body;

    pool.query('SELECT * FROM consultores WHERE consultor_email = $1', [consultor_email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar consultor no banco de dados' });
        }

        if (results.rows.length === 0 || results.rows[0].senha !== senha) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ consultorId: results.rows[0].consultorid }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
})

// rota para cadastrar consultores
router.post('/cadastrar', (req, res) => {

    const { nome, consultor_email, senha, cpf, celular, whatsApp } = req.body

    pool.query(`SELECT * FROM consultores`, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao verificar consultores existentes' })
        }

        let estaPresente = false
        results.rows.forEach(val => {
            if (val.consultor_email === consultor_email || val.cpf === cpf) {
                estaPresente = true
            }
        })

        if (estaPresente) {
            res.send({ mensagem: "usuário ja esta cadastrado" })
        } else {
            pool.query(
                'INSERT INTO consultores (nome, consultor_email, senha, cpf, celular, whatsapp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING consultorid', 
                [nome, consultor_email, senha, cpf, celular, whatsApp], 
                (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ error: 'Erro ao cadastrar consultor' })
                    }
                    const newId = result.rows[0].consultorid
                    res.send({ userID: newId, nome, consultor_email, senha, cpf, celular, whatsApp })
                }
            )
        }
    })
})

router.get('/busca', (req, res) => {
    const { consultor_email } = req.query

    if (!consultor_email) {
        return res.status(400).json({ error: 'Parametro email é obrigatorio' })
    }

    pool.query('SELECT * FROM consultores WHERE consultor_email = $1', [consultor_email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar por consultores:', err)
            return res.status(500).json({ error: 'Erro ao buscar por consultores' })
        }
        if (results.rows.length === 0) {
            return res.status(500).json({ error: 'Nenhum consultor cadastrado com este email' })
        }

        res.status(200).json(results.rows)
    })
})

// Rota para buscar imóveis por cliente (apenas para o consultor autenticado) 
router.get('/meus-imoveis', authconsultor, (req, res) => {

    const consultorId = req.consultorId

    if (consultorId == undefined) {
        return { mensagem: "O usuário não tem permissão para cadastrar um imóvel" }
    }

    pool.query('SELECT * FROM imoveis WHERE consultorid = $1', [consultorId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóveis:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis' })
        }
        if (results.rows.length === 0) {
            return res.status(500).json({ error: 'Nenhum imóvel cadastrado para este consultor' })
        }

        res.status(200).json(results.rows)
    })
})

router.get('/buscarconsultorid', (req, res) => {
    const consultorId = req.query.id

    let sqlQuery = 'SELECT * FROM consultores WHERE consultorid = $1'
    pool.query(sqlQuery, [consultorId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar consultor por id:', err)
            return res.status(500).json({ error: 'Erro ao buscar consultor por id ' })
        }
        res.json(results.rows)
    })
})

router.get('/imagensconsultores/:id', (req, res) => {
    const id = req.params.id.trim()
    const caminhoImagem = path.join(__dirname, '../imagens-corretor', `foto${id}.jpg`)
    
    res.sendFile(caminhoImagem, (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err)
            res.status(404).send('Imagem não encontrada')
        }
    })
})

module.exports = router