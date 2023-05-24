const helper = require('../helpers/helperFunctions');

module.exports = {
    
    validaDados: (dados) => {
        let retorno = { status: true, msg: '' };

        const { nome } = dados;

        if (!nome) {
            return retorno = {
                status: false,
                msg: 'Nome é um campo obrigatórios'
            }
        }


        return retorno;
    },
    
    validaSituacao: (situacao) => {
        let retorno = { status: true, msg: '' };

        const situacaoDefault = ['ATI', 'ARQ'];

        if (!situacao) {

            return retorno = {
                status: false,
                msg: 'Situação não informada!'

            }
        }

        if (!situacaoDefault.includes(situacao)) {
            
            return retorno = {
                status: false,
                msg: 'Situação inválida!'
            
            }
        }

        return retorno;
    },

}