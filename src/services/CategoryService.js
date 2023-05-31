// const helper = require('../helpers/helperFunctions');

module.exports = {
    
    validaDados: (dados) => {
        let retorno = { status: true, msg: '' };

        const { name, status } = dados;

        if (!name) {
            return retorno = {
                status: false,
                message: 'O Nome da categoria é obrigatórios'
            }
        }

        return retorno;
    },

    validaStatus: (status) => {
        let retorno = { status: true, msg: '' };

        if (['ATI', 'INA'].indexOf(status) === -1) {
            return retorno = {
                status: false,
                 message: 'Informe um status válido.'
            }
        }


        return retorno;
    }

}