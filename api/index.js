const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
const config = require('../config/defaut.json')

app.use(bodyParser.json)

const roteador = require('./rotas/fornecedores')
app.use ('./api/rotas/fornecedores', roteador) 

app.listen(config.api.porta, () => console.log('A API está funcionando!!!'))
