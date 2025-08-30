const express = require('express')
const router = express.Router()
const pool = require('../database')
const authconsultor = require('../middleware/authConsultor')
const path = require('path')

// conexão com a tabela "imoveis"
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM imoveis`, (err, results) => {
        if (err) {
            console.error('Erro ao buscar infomações:', err)
            res.status(500).json({ error: 'Erro ao buscar informações no banco de dados' })
            return
        }

        res.json(results.rows)
    })
})

// Rota para buscar imóveis
router.get('/busca', (req, res) => {

    const { tipo, bairro, cidade, quartos, banheiros, precoVendaMin, precoVendaMax, precoAluguelMin, precoAluguelMax, qualidadeMax, qualidadeMin } = req.query
    const disponibilidade = req.query.disponibilidade ? req.query.disponibilidade.split(',') : []

    let sqlQuery = 'SELECT * FROM imoveis WHERE 1=1'
    const params = []
    let paramCount = 0

    if (tipo) {
        const tipos = tipo.split(',').map(t => `'${t.trim()}'`).join(',')
        sqlQuery += ` AND tipo IN (${tipos})`
    }

    if (bairro) {
        const bairros = bairro.split(',').map(b => `'${b.trim()}'`).join(',');
        sqlQuery += ` AND bairro IN (${bairros})`
    }

    if (cidade) {
        sqlQuery += ` AND cidade = $${++paramCount}`
        params.push(cidade)
    }

    if (quartos) {
        sqlQuery += ` AND quartos = $${++paramCount}`
        params.push(quartos)
    }

    if (banheiros) {
        sqlQuery += ` AND banheiros = $${++paramCount}`
        params.push(banheiros)
    }

    if (disponibilidade.length) {
        const dispoConditions = disponibilidade.map(d => `(disponibilidade = '${d}' OR disponibilidade = 'venda_e_aluguel')`).join(' OR ');
        sqlQuery += ` AND (${dispoConditions})`;
    }

    if (precoVendaMin && precoVendaMax) {
        sqlQuery += ` AND preco_venda BETWEEN $${++paramCount} AND $${++paramCount}`
        params.push(precoVendaMin, precoVendaMax)
    } else if (precoVendaMin) {
        sqlQuery += ` AND preco_venda >= $${++paramCount}`
        params.push(precoVendaMin)
    } else if (precoVendaMax) {
        sqlQuery += ` AND preco_venda <= $${++paramCount}`
        params.push(precoVendaMax)
    }

    if (precoAluguelMin && precoAluguelMax) {
        sqlQuery += ` AND preco_aluguel BETWEEN $${++paramCount} AND $${++paramCount}`
        params.push(precoAluguelMin, precoAluguelMax)
    } else if (precoAluguelMin) {
        sqlQuery += ` AND preco_aluguel >= $${++paramCount}`
        params.push(precoAluguelMin)
    } else if (precoAluguelMax) {
        sqlQuery += ` AND preco_aluguel <= $${++paramCount}`
        params.push(precoAluguelMax)
    }

    if (qualidadeMin && qualidadeMax) {
        sqlQuery += ` AND qualidade BETWEEN $${++paramCount} AND $${++paramCount}`
        params.push(qualidadeMin, qualidadeMax)
    } else if (qualidadeMin) {
        sqlQuery += ` AND qualidade >= $${++paramCount}`
        params.push(qualidadeMin)
    } else if (qualidadeMax) {
        sqlQuery += ` AND qualidade <= $${++paramCount}`
        params.push(qualidadeMax)
    }

    pool.query(sqlQuery, params, (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóveis:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis' })
        }

        res.json(results.rows)
    })
})

// rota para adicionar imoveis 
router.post('/adicionar', (req, res) => {
    
    const { tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, disponibilidade, qualidade, tamanho } = req.body;

    // Validar dados recebidos (validação simples)
    if (!tipo || !endereco || !numero || !bairro || !cidade || !cep || !quartos || !banheiros || !descricao || !preco_venda || !disponibilidade || !qualidade || !tamanho) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const imovel = {
        tipo,
        endereco,
        numero,
        bairro,
        cidade,
        cep,
        quartos: parseInt(quartos),
        banheiros: parseInt(banheiros),
        descricao,
        preco_aluguel: preco_aluguel === "null" || preco_aluguel === "0" ? null : parseFloat(preco_aluguel),
        preco_venda: preco_venda === "null" || preco_venda === "0" ? null : parseFloat(preco_venda),
        disponibilidade,
        qualidade,
        tamanho: parseFloat(tamanho),
        
    };

    pool.query('INSERT INTO imoveis (tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, disponibilidade, qualidade, tamanho) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING imoveisid', 
        [imovel.tipo, imovel.endereco, imovel.numero, imovel.bairro, imovel.cidade, imovel.cep, imovel.quartos, imovel.banheiros, imovel.descricao, imovel.preco_venda, imovel.preco_aluguel, imovel.disponibilidade, imovel.qualidade, imovel.tamanho], 
        (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar imóvel:', err);
                return res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
            }
            const newId = result.rows[0].imoveisid;
            console.log('Imóvel cadastrado com sucesso! ID:', newId);
            res.status(201).json({ id: newId, message: 'Imóvel cadastrado com sucesso!', imovel });
        });
})

// Rota de deletar imóvel 
router.delete('/deletar/:id', authconsultor, (req, res) => {
    const imovelID = req.params.id
    const consultorId = req.consultorId

    if (consultorId == undefined) {
        return { mensagem: "O usuário não tem permissão para cadastrar um imóvel" }
    }

    // Verificar se o imovel com ID especificado existe
    pool.query('SELECT * FROM imoveis WHERE imoveisid = $1 AND consultorid = $2', [imovelID, consultorId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel:', err)
            return res.status(500).json({ error: 'Erro ao bucar imóvel' })
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Você não tem permissão para deletar esse imovel ' })
        }

        const imovel = results.rows[0]

        // Se o imovel existe, executa aquery para deleta-lo
        pool.query('DELETE FROM imoveis WHERE imoveisid = $1', [imovelID], (err, result) => {
            if (err) {
                console.error('Erro ao deletar imóvel:', err)
                return res.status(500).json({ error: 'Erro ao deletar imóvel' })
            }

            console.log('Imovel deletado com sucesso!')
            res.status(200).json({ message: 'Imovel deletado com sucesso!', imovelDeletado: imovel })
        })
    })
})

// Rota de atualizar imóvel
router.put('/atualizar/:id', authconsultor, (req, res) => {
    const imovelID = req.params.id
    const consultorId = req.consultorId

    if (consultorId == undefined) {
        return { mensagem: "O usuário não tem permissão para cadastrar um imóvel" }
    }

    // Parâmetros para atualizar
    const { tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, tamanho, qualidade, disponibilidade } = req.body

    if (!tipo || !endereco || !numero || !bairro || !cidade || !cep || !quartos || !banheiros || !descricao || !preco_venda || !preco_aluguel || tamanho == null || !qualidade || !disponibilidade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    pool.query('SELECT * FROM imoveis WHERE imoveisid = $1 AND consultorid = $2', [imovelID, consultorId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar o imóvel no banco de dados' })
        }
        if (results.rows.length === 0) {
            return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para atualizar esse imóvel' })
        }
        const imovelAtualizado = {
            tipo,
            endereco,
            numero,
            bairro,
            cidade,
            cep,
            quartos: parseInt(quartos),
            banheiros: parseInt(banheiros),
            descricao,
            preco_aluguel: preco_aluguel === "null" || preco_aluguel === "0" ? null : parseFloat(preco_aluguel),
            preco_venda: preco_venda === "null" || preco_venda === "0" ? null : parseFloat(preco_venda),
            qualidade,
            disponibilidade,
            tamanho: parseFloat(tamanho)
        }

        pool.query('UPDATE imoveis SET tipo = $1, endereco = $2, numero = $3, bairro = $4, cidade = $5, cep = $6, quartos = $7, banheiros = $8, descricao = $9, preco_venda = $10, preco_aluguel = $11, tamanho = $12, qualidade = $13, disponibilidade = $14 WHERE imoveisid = $15', 
            [imovelAtualizado.tipo, imovelAtualizado.endereco, imovelAtualizado.numero, imovelAtualizado.bairro, imovelAtualizado.cidade, imovelAtualizado.cep, imovelAtualizado.quartos, imovelAtualizado.banheiros, imovelAtualizado.descricao, imovelAtualizado.preco_venda, imovelAtualizado.preco_aluguel, imovelAtualizado.tamanho, imovelAtualizado.qualidade, imovelAtualizado.disponibilidade, imovelID], 
            (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar imóvel:', err)
                    return res.status(500).json({ error: 'Erro ao atualizar imóvel' })
                }
                if (result.rowCount === 0) {
                    return res.status(404).json({ error: 'Imóvel não encontrado' })
                }
                console.log('Imóvel atualizado com sucesso!')
                return res.status(200).json({ message: 'Imóvel atualizado com sucesso!', imovelAtualizado })
            })
    })
})

// Rotas de disponibilidade {venda e aluguel }
// Rota para separar disponibilidade de venda
router.get('/venda', (req, res) => {
    let sqlQuery = 'SELECT * FROM imoveis WHERE disponibilidade IN (\'venda\', \'venda_e_aluguel\')'

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel para venda:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis para a venda' })
        }
        console.log('Imóvel buscado com sucesso!')
        res.json(results.rows)
    })
})

// Rota para separar disponibilidade de aluguel
router.get('/aluguel', (req, res) => {
    let sqlQuery = 'SELECT * FROM imoveis WHERE disponibilidade IN (\'aluguel\', \'venda_e_aluguel\')'

    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel para aluguel:', err)
            return res.status(500).json({ error: 'Erro ao buscar imóveis para a aluguel' })
        }
        res.json(results.rows)
    })
})

//rota para pegar todas as cidades disponíveis
router.get('/cidades', (req, res) => {
    let sqlQuery = 'SELECT DISTINCT cidade FROM imoveis ORDER BY cidade ASC'
    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cidades disponíveis: ', err)
            return res.status(500).json({ error: 'Erro ao buscar cidades disponíveis' })
        }
        res.json(results.rows)
    })
})

// rota para pegar as cidades disponíveis dos imóveis a venda
router.get('/cidadesvenda', (req, res) => {
    let sqlQuery = 'SELECT DISTINCT cidade FROM imoveis WHERE disponibilidade = \'venda\' OR disponibilidade = \'venda_e_aluguel\' ORDER BY cidade ASC'
    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cidades disponíveis: ', err)
            return res.status(500).json({ error: 'Erro ao buscar cidades disponíveis' })
        }
        res.json(results.rows)
    })
})

// rota para pegar as cidades disponíveis dos imóveis para alugar
router.get('/cidadesaluguel', (req, res) => {
    let sqlQuery = 'SELECT DISTINCT cidade FROM imoveis WHERE disponibilidade = \'aluguel\' OR disponibilidade = \'venda_e_aluguel\' ORDER BY cidade ASC'
    pool.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cidades disponíveis: ', err)
            return res.status(500).json({ error: 'Erro ao buscar cidades disponíveis' })
        }
        res.json(results.rows)
    })
})

// rota para pegar o imóvel por id 
router.get('/buscarimovelid', (req, res) => {
    const imovelID = req.query.id;

    let sqlQuery = `
        SELECT i.*, STRING_AGG(img.url, ',') as imagens 
        FROM imoveis i
        LEFT JOIN imagens img ON i.imoveisid = img.imoveisid
        WHERE i.imoveisid = $1
        GROUP BY i.imoveisid
    `
    pool.query(sqlQuery, [imovelID], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóvel por id:', err);
            return res.status(500).json({ error: 'Erro ao buscar imóvel por id' })
        }
        res.json(results.rows);
    })
})

router.get('/ordenarimovelqualidade', (req, res) => {
    let sqlQuery = 'SELECT * FROM imoveis ORDER BY qualidade DESC'
    pool.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar imóveis por qualidade ' })
        }

        res.json(results.rows)
    })
})

router.get('/porConsultor', (req, res) => {
    const { consultorId } = req.query

    if (!consultorId) {
        return res.status(400).json({ error: 'ConsultorId é obrigatório' });
    }

    const sqlQuery = 'SELECT * FROM imoveis WHERE consultorid = $1'
    pool.query(sqlQuery, [consultorId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar imóveis:', err);
            return res.status(500).json({ error: 'Erro ao buscar imóveis' })
        }

        res.json(results.rows)
    })
})

// rota para buscar imagem por id do imovel 
router.get('/imagensimovel/:id', (req, res) => {
    const id = req.params.id.trim()
    const caminhoImagem = path.join(__dirname, '../imagens-imovel', `imovel${id}.jpg`)

    console.log(caminhoImagem)

    res.sendFile(caminhoImagem, (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err)
            res.status(404).send('Imagem não encontrada')
        }
    })
})

// adicionar e pegar os imoveis marcados como favoritos pelos usuarios
router.get('/favoritos', (req, res) => {
    const { clienteID } = req.query

    const query = 'SELECT * FROM imoveis WHERE imoveisid IN (SELECT imovelid FROM favoritos WHERE clienteid = $1)'

    pool.query(query, [clienteID], (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.json(results.rows)
    })
})

router.post('/adicionarimovelfavorito', (req, res) => {
    const { clienteID, imovelID } = req.body

    const query = 'INSERT INTO favoritos (clienteid, imovelid) VALUES ($1, $2)'

    pool.query(query, [clienteID, imovelID], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(201).send('Produto adicionado aos favoritos')
    })
})

router.delete('/removerimovelfavorito', (req, res) => {
    const { clienteID, imovelID } = req.body

    const query = "DELETE FROM favoritos WHERE clienteid = $1 AND imovelid = $2"

    pool.query(query, [clienteID, imovelID], (err, result) =>{
        if(err){
            return res.status(500).send(err)
        }
        res.send('Produto removido dos favoritos')
    })
})

module.exports = router