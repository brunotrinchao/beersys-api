// const helper = require('../helpers/helperFunctions');

module.exports = {
    
    validaDados: (dados) => {
        let retorno = { status: true, msg: '' };

        const { nome, price } = dados;

        if (!nome) {
            return retorno = {
                status: false,
                message: 'Nome é obrigatórios'
            }
        }

        if (!price) {
            return retorno = {
                status: false,
                message: 'Preço é obrigatórios'
            }
        }


        return retorno;
    }

}