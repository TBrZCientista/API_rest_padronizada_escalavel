const roteador = require('express').Router()
const tabelaFornecedor = require('./TabelaFornecedor')


roteador.use('./api/rotas/fornecedores', async(requisicao, resposta) => {
    const resultados = await tabelaFornecedor.listar()
    resposta.send(JSON.stringify(resultados))
})

module.exports = roteador