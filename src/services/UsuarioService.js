const helper = require('../helpers/helperFunctions');

module.exports = {
    
    validaDados: (dados, update = false) => {
        let retorno = { status: true, msg: '' };

        const { nome, email, senha } = dados;


        if (!nome || !email || !senha) {
            return retorno = {
                status: false,
                msg: 'Todos os campos são obrigatórios!'
            }
        }

        if (update && typeof dados.perfil_id !== 'undefined') {
            return retorno = {
                status: false,
                msg: 'Perfil do usuário não informado'
            }
        }

        if (!helper.validaEmail(email)) {
            return retorno = {
                status: false,
                msg: 'E-mail inválido!'
            }
        }

        return retorno;
    },

}