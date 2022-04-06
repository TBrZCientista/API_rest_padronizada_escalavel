const roteador = require('express').Router()
const tabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor



roteador.get('./api/rotas/fornecedores', async(requisicao, resposta) => {
    const resultados = await tabelaFornecedor.listar()
    resposta.status(200)
    const Serializador = new SerializadorFornecedor (
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        Serializador.serializar(resultados)
    )
})

roteador.post('./api/rotas/fornecedores', async (requisicao,resposta,proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        const Serializador = new SerializadorFornecedor (
            resposta.getHeader('Content-Type')
        )
        resposta.send (
            Serializador.serializar(fornecedor)
        )
    } catch (erro){
        proximo(erro)
    }   
} )

roteador.get('/:idFornecedor', async (requisicao,resposta,proximo) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor ({ id : id})
        await fornecedor.carregar()
        resposta.status(200)
        const Serializador = new SerializadorFornecedor (
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            Serializador.serializar(fornecedor)
        )
    }
    catch(erro){
      proximo(erro)
    }
})

roteador.put('/:idFornecedor', async (requisicao,resposta,proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, {id : id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.status(204)
        resposta.end()
    }
    catch(erro) {
       proximo(erro)
    }
})

roteador.delete('/:idFornecedor', async (requisicao,resposta,proximo) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({id :id})
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.end()
        resposta.status(204)
    } catch {
        proximo(erro)
    }
})

module.exports = roteador