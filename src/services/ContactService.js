// const helper = require('../helpers/helperFunctions');

module.exports = {
    
    validaDados: (dados) => {
        let retorno = { status: true, msg: '' };

        const { contact, type } = dados;

        if (!contact) {
            return retorno = {
                status: false,
                message: 'Contato é um campo obrigatórios'
            }
        }

        if (['EMA', 'PHO', 'CEL', 'WAP'].indexOf(type) === -1) {
            return retorno = {
                status: false,
                message: 'Informe um tipo de contato válido.'
            }
        }


        return retorno;
    }

}