// const helper = require('../helpers/helperFunctions');

module.exports = {
    
    validaDados: (dados) => {
        let retorno = { status: true, msg: '' };

        const { estabelecimento, nome } = dados;

        if (!estabelecimento) {
            retorno.status = false;
            retorno.msg = 'Estabelecimento é um campo obrigatórios.<br/>';
        }

        if (!nome) {
            retorno.status = false;
            retorno.msg += 'Nome é um campo obrigatórios.<br/>';
        }

        return retorno;
    }

}