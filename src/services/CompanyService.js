const helper = require('../helpers/helperFunctions');

module.exports = {
    
    validaDados: (dados) => {
        let retorno = { status: true, msg: '' };

        const { name } = dados;


        if (!name) {
            return retorno = {
                status: false,
                message: 'Nome é obrigatório!'
            }
        }

        return retorno;
    },

}