const roteador = require('express').Router()
const tabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')


roteador.get('./api/rotas/fornecedores', async(requisicao, resposta) => {
    const resultados = await tabelaFornecedor.listar()
    resposta.send(JSON.stringify(resultados))
})

roteador.post('./api/rotas/fornecedores', async (requisicao,resposta) => {
    const dadosRecebidos = requisicao.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    resposta.send (
        JSON.stringify(fornecedor)
    )
} )

module.exports = roteador