const Cardapios = require('../models/Cardapios');
const CardapiosService = require('../services/CardapiosService');
const Helper = require('../helpers/helperFunctions');

module.exports = {

    obterTodos: async (req, res) => {
        let json = { error: '', data: [], success: '' };

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        const cardapioss = await Cardapios.obterTodos(usuarioSessao);
        let retorno = [];
        if (Object.keys(cardapioss).length > 0) {
            cardapioss.forEach(cardapios => {
                retorno.push({
                    id: cardapios.id,
                    nome: cardapios.nome,
                    inclusao: cardapios.inclusao,
                    inclusao_formatada: cardapios.inclusao_formatada,
                    estabelecimento: {
                        id: cardapios.estabelecimento_id,
                        nome: cardapios.estabelecimento_nome,
                        logo: cardapios.estabelecimento_logo,
                        descricao: cardapios.estabelecimento_descricao,
                        situacao: cardapios.estabelecimento_situacao,
                        situacao_formatada: cardapios.estabelecimento_situacao_formatada,
                        inclusao: cardapios.estabelecimento_inclusao,
                        inclusao_formatada: cardapios.estabelecimento_inclusao_formatada,
                    },
                    usuario:{
                        id: cardapios.usuario_id
                    }
                })
            });
        }
        json.data = retorno;
        json.success = `Cardapioss obtidos com sucesso!`;

        return res.status(200).json(json)
    },

    obterUnico: async (req, res) => {
        let json = { error: '', data: [], success: '' };

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        let id = req.params.id;
        let cardapioss = await Cardapios.obterUnico(id, usuarioSessao);

        let retorno = [];
        if (Object.keys(cardapioss).length > 0) {
            cardapioss.forEach(cardapios => {
                retorno.push({
                    id: cardapios.id,
                    nome: cardapios.nome,
                    inclusao: cardapios.inclusao,
                    inclusao_formatada: cardapios.inclusao_formatada,
                    estabelecimento: {
                        id: cardapios.estabelecimento_id,
                        nome: cardapios.estabelecimento_nome,
                        logo: cardapios.estabelecimento_logo,
                        descricao: cardapios.estabelecimento_descricao,
                        situacao: cardapios.estabelecimento_situacao,
                        situacao_formatada: cardapios.estabelecimento_situacao_formatada,
                        inclusao: cardapios.estabelecimento_inclusao,
                        inclusao_formatada: cardapios.estabelecimento_inclusao_formatada,
                    },
                    usuario:{
                        id: cardapios.usuario_id
                    }
                })
            });
        }
        json.data = retorno;
        json.success = `Cardapios obtido com sucesso!`;

        return res.status(200).json(json)
    },

    inserir: async (req, res) => {
        let json = { error: '', data: {}, success: '' };

        const ret = CardapiosService.validaDados(req.body);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        let dados = {
            usuario: usuarioSessao,
            estabelecimento: req.body.estabelecimento,
            nome: req.body.nome
        }

        const cardapiosId = await Cardapios.inserir(dados);

        if (!cardapiosId.insertId) {
            json.error = `Erro ao tentar cadastrar usuário.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        json.success = `Cardapios cadastrado com sucesso!`;

        json.data = { id: cardapiosId.insertId, ...dados};

        return res.status(201).json(json);
    },

    atualizar: async (req, res) => {
        let json = { error: '', data: {}, success: '' };
        
        const ret = CardapiosService.validaDados(req.body);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        let id = req.params.id;
        let dados = {
            estabelecimento: req.body.estabelecimento,
            nome: req.body.nome
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        const cardapios = await Cardapios.atualizar(id, dados, usuarioSessao);

        if (cardapios.affectedRows == 0) {
            json.error = `Erro ao tentar atualizar usuário.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        json.success = `Dados atualizados com sucesso!`;

        json.data = {id: id,...dados};

        res.status(200).json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', data: {}, success: '' };

        if (!req.params.id) {
           json.error = 'Informe o cardapio!';
            return res.status(400).json(json);
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        const cardapios = await Cardapios.excluir(req.params.id, usuarioSessao);

        if (cardapios.affectedRows == 0) {
            json.error = `Erro ao tentar atualizar senha.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        v

        res.json(json);
    }

}