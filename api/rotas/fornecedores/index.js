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

roteador.get('/:idFornecedor', async (requisicao,resposta) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor ({ id : id})
        await fornecedor.carregar()
        resposta.send(
            JSON.stringify(fornecedor)
        )
    }
    catch(erro){
        resposta.send(
            JSON.stringify({
               mensagem : erro.message 
            })
        )
    }
})

module.exports = roteador