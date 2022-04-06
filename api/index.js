const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
const config = require('../config/defaut.json')
const NaoEncontrado = require('./erros/NaoEncontrado')

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')
app.use ('./api/rotas/fornecedores', roteador) 

app.use((erro,requisicao, resposta,proximo)=> {
    if (erro instanceof NaoEncontrado){
        resposta.status(404)
    } else {
        resposta.status(400)
    }
    resposta.send(
        JSON.stringify({
            mensagem: erro.message,
            erro: erro.idErro
        })
    )
})

app.listen(config.api.porta, () => console.log('A API está funcionando!!!'))
