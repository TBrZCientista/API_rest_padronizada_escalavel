const Modelo = require('./modeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar(){
        return Modelo.findAll()
    },
    inserir(fornecedor){
        return Modelo.create(fornecedor)
    },
    async pegarPorId(id){
        const encontrado = await Modelo.findOne({
            where: {
                id : id
            }
        })
        if(!encontrado) {
            throw new NaoEncontrado()
        }

        return encontrado
    },
    
    atualizar (id, dadosparaAtualizar){
        return Modelo.update(
            dadosparaAtualizar,{
                where: {id : id}
            }
        )
    },

    remover (id){
        return Modelo.destroy({
            where: {id :id} 
        })
    }
}