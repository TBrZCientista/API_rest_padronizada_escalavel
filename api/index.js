const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
const config = require('../config/defaut.json')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')
app.use ('./api/rotas/fornecedores', roteador) 

app.use((erro,requisicao, resposta,proximo)=> {
    let status = 500
    
    if (erro instanceof NaoEncontrado){
        status = 404
    } 

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos){
        ststus = 400
    }
    
    resposta.status(status)
    resposta.send(
        JSON.stringify({
            mensagem: erro.message,
            erro: erro.idErro
        })
    )
})

app.listen(config.api.porta, () => console.log('A API está funcionando!!!'))
