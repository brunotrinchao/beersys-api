const helper = require('../helpers/helperFunctions');

module.exports = {
    
    validaDados: (dados, update = false) => {
        let retorno = { status: true, msg: '' };

        const { name, email, password } = dados;


        if (!name || !email && (update == false && !password)) {
            return retorno = {
                status: false,
                message: 'Todos os campos são obrigatórios!'
            }
        }

        if (update && typeof dados.permission_id !== 'undefined') {
            return retorno = {
                status: false,
                message: 'Perfil do usuário não informado'
            }
        }

        if (!helper.validaEmail(email)) {
            return retorno = {
                status: false,
                message: 'E-mail inválido!'
            }
        }

        return retorno;
    },

}