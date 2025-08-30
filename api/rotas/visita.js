const express = require('express')
const router = express.Router()
const pool = require('../database')
const authCliente = require('../middleware/authCliente')
const nodemailer = require('nodemailer')
require('dotenv').config()

//Configuração do nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'juninhojoka11@gmail.com',
        pass: 'juninhojr11'
    }
})

// função para enviar e-mail
function enviarEmail(remetente, destinatario, imovelID, corpoCliente, dataVisita) {
    const mailOptions = {
        from: remetente,
        to: destinatario,
        subject: 'Solicitação de visita',
        html: `
            <p> Olá</p>
            <p>O cliente solicitou uma visita para o seguinte imóvel:</p>
            <a href="http://localhost:3000/imovel?id=${imovelID}">Página do imóvel</a>
            <p>Aqui estão algumas informações do cliente:</p>
            <pre>${corpoCliente}</pre>
            <p>A visita está agendada para a data ${dataVisita}.</p>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error)
        } else {
            console.log('Email enviado com sucesso:', info.response)
        }
    })
}

// Rota para verificar a disponibilidade e agendar visita 
router.post('/', authCliente, (req, res) => {
    const { imoveisID, data_visita } = req.body
    const clienteId = req.clienteId

    const sql = ` INSERT INTO visitas (clienteid, imoveisid, data_visita) VALUES ($1, $2, $3) RETURNING visitaid`

    pool.query(sql, [clienteId, imoveisID, data_visita], (err, results) => {
        if (err) {
            console.error('Erro ao agendar a visita: ', err)
            return res.status(500).json({ error: 'Erro ao agendar a visita' })
        }
        // Após o agendamento buscando informações para enviar o email
        const consultaImovel = `
        SELECT *
        FROM imoveis
        WHERE imoveisid = $1
    `;
        pool.query(consultaImovel, [imoveisID], (err, resultsImovel) => {
            if (err) {
                console.error('Erro ao buscar informações no imóvel:', err)
                return res.status(500).json({ error: 'Erro ao buscar informações no imóvel' })
            }

            const consultaCliente = `
            SELECT * 
            FROM clientes
            WHERE clienteid = $1
        `
            pool.query(consultaCliente, [clienteId], (err, resultsCliente) => {
                if (err) {
                    console.error('Erro ao buscar inforamções do cliente')
                    return res.status(500).json({ error: 'Erro ao buscar inforamções do cliente' })
                }
                if (resultsImovel.rows.length > 0 && resultsCliente.rows.length > 0) {
                    const corpoImovel = JSON.stringify(resultsImovel.rows[0], null, 2);
                    const corpoCliente = JSON.stringify(resultsCliente.rows[0], null, 2)

                    enviarEmail(process.env.EMAIL_DESTINATARIO, corpoImovel, corpoCliente, data_visita)

                    res.json({ message: 'Visita agendada com sucesso ' })
                } else {
                    res.status(404).json({ error: 'Imóvel ou cliente não encontrado ' })
                }
            })
        })
    })
})

router.get('/visitas', (req, res) => {
    const {clienteID, consultorID} = req.query

    let query = "SELECT v.visitaid, ci.clienteid, i.imoveisid, co.consultorid, v.data_visita, v.comentario, i.tipo, i.endereco, i.numero, i.bairro, i.cidade, i.cep, i.quartos, i.banheiros, i.preco_venda, i.preco_aluguel, i.tamanho, i.disponibilidade, i.vagas, co.nome AS nome_consultor, co.consultor_email, ci.email AS cliente_email, ci.nome AS nome_cliente FROM visitas AS v JOIN imoveis AS i ON v.imoveisid = i.imoveisid JOIN clientes AS ci ON v.clienteid = ci.clienteid JOIN consultores AS co ON v.consultorid = co.consultorid"

    if(clienteID){
        query += ` WHERE v.clienteid = $1`
        pool.query(query, [clienteID], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }
            res.send(result.rows)
        })
    }else if(consultorID){
        query += ` WHERE v.consultorid = $1`
        pool.query(query, [consultorID], (err, result) => {
            if(err){
                return res.status(500).send(err)
            }
            res.send(result.rows)
        })
    } else {
        pool.query(query, (err, result) => {
            if(err){
                return res.status(500).send(err)
            }
            res.send(result.rows)
        })
    }
})

router.get('/getconsultores', (req, res) => {
    const {clienteID} = req.query

    let query = "SELECT DISTINCT c.consultorid, c.nome, c.consultor_email FROM visitas JOIN consultores AS c ON visitas.consultorid = c.consultorid WHERE clienteid = $1"

    pool.query(query, [clienteID], (err, result) => {
        if(err){
            return res.status(500).send(err)
        }
        res.send(result.rows)
    })
})

router.post('/agendarvisita', (req, res) => {
    const { clienteID, consultorID, imovelID, data_visita, comentario, nome, email } = req.body

    let dados_cliente
    let consultorEmail

    // Verifica se a data já está reservada
    pool.query("SELECT * FROM visitas WHERE imoveisid = $1 AND data_visita = $2", [imovelID, data_visita], (err, result) => {
        if(result.rows.length > 0) {
            return res.send(JSON.stringify({agendado: false, mensagem: "A data solicitada já está reservada"}))
        }
        if (clienteID) {
            pool.query("SELECT nome, email, celular FROM clientes WHERE clienteid = $1", [clienteID], (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                dados_cliente = `
                    Nome: ${result.rows[0].nome},
                    Email: ${result.rows[0].email},
                    Telefone: ${result.rows[0].celular}
                `
            })
        } else {
            // Se o cliente não está cadastrado, usa o nome e email fornecidos
            dados_cliente = `
                Nome: ${nome},
                Email: ${email}
            `
        }
        pool.query("SELECT consultor_email FROM consultores WHERE consultorid = $1", [consultorID], (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            consultorEmail = result.rows[0].consultor_email
        })
        // Insere a visita no banco de dados
        pool.query(
            "INSERT INTO visitas (clienteid, imoveisid, consultorid, data_visita, comentario) VALUES ($1, $2, $3, $4, $5) RETURNING visitaid",
            [clienteID || null, imovelID, consultorID, data_visita, comentario], // clienteID pode ser null
            (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                // Envia o email após agendar
                enviarEmail("juninhojoka11@gmail.com", consultorEmail, imovelID, dados_cliente, data_visita, comentario)
                return res.send({ agendado: true })
            }
        )
    })
})

router.get('/cancelarvisita/:id', (req, res) => {
    const visitaId = req.params.id

    const query = "SELECT * FROM visitas WHERE visitaid = $1"
    pool.query(query, [visitaId], (err, result) => {
        if(err){
            return res.status(500).send(err)
        }

        res.send(result.rows)
    })
})

module.exports = router