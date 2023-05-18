const helper = require('../helpers/helperFunctions');

module.exports = {
    
    validaDados: (dados) => {
        let retorno = { status: true, msg: '' };

        const { nome, email, senha } = dados;

        if (!nome || !email || !senha) {
            return retorno = {
                status: false,
                msg: 'Todos os campos são obrigatórios'
            }
        }

        if (!helper.validaEmail(email)) {
            return retorno = {
                status: false,
                msg: 'E-mail inválido'
            }
        }

        return retorno;
    },

}