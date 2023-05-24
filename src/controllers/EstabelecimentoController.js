const Estabelecimento = require('../models/Estabelecimento');
const EstabelecimentoService = require('../services/EstabelecimentoService');
const Helper = require('../helpers/helperFunctions');

module.exports = {

    obterTodos: async (req, res) => {
        let json = { error: '', data: [], success: '' };

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        const estabelecimentos = await Estabelecimento.obterTodos(usuarioSessao);
        let retorno = [];
        if (Object.keys(estabelecimentos).length > 0) {
            estabelecimentos.forEach(estabelecimento => {
                retorno.push({
                    id: estabelecimento.id,
                    nome: estabelecimento.nome,
                    logo: estabelecimento.logo,
                    descricao: estabelecimento.descricao,
                    situacao: estabelecimento.situacao,
                    situacao_formatada: estabelecimento.situacao_formatada,
                    inclusao: estabelecimento.inclusao,
                    inclusao_formatada: estabelecimento.inclusao_formatada,
                    usuario: {
                        id: estabelecimento.usuario_id,
                        nome: estabelecimento.usuario_nome,
                        email: estabelecimento.usuario_email,
                        celular: estabelecimento.usuario_celular,
                        telefone: estabelecimento.usuario_telefone,
                        inclusao: estabelecimento.usuario_inclusao,
                        inclusao_formatada: estabelecimento.usuario_inclusao_formatada
                    },
                    endereco:{
                        id: estabelecimento.endereco_id,
                        rua: estabelecimento.endereco_rua,
                        numero: estabelecimento.endereco_numero,
                        bairro: estabelecimento.endereco_bairro,
                        cep: estabelecimento.endereco_cep,
                        complemento: estabelecimento.endereco_complemento,
                        cidade: estabelecimento.endereco_cidade,
                        inclusao: estabelecimento.endereco_inclusao,
                        inclusao_formatada: estabelecimento.endereco_inclusao_formatada
                    }
                })
            });
        }
        json.data = retorno;
        json.success = `Estabelecimento obtido com sucesso!`;

        return res.status(200).json(json)
    },

    obterUnico: async (req, res) => {
        let json = { error: '', data: [], success: '' };

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        let id = req.params.id;
        let estabelecimentos = await Estabelecimento.obterUnico(id, usuarioSessao);

        let retorno = [];
        if (Object.keys(estabelecimentos).length > 0) {
            estabelecimentos.forEach(estabelecimento => {
                retorno.push({
                    id: estabelecimento.id,
                    nome: estabelecimento.nome,
                    logo: estabelecimento.logo,
                    descricao: estabelecimento.descricao,
                    situacao: estabelecimento.situacao,
                    situacao_formatada: estabelecimento.situacao_formatada,
                    inclusao: estabelecimento.inclusao,
                    inclusao_formatada: estabelecimento.inclusao_formatada,
                    usuario: {
                        id: estabelecimento.usuario_id,
                        nome: estabelecimento.usuario_nome,
                        email: estabelecimento.usuario_email,
                        celular: estabelecimento.usuario_celular,
                        telefone: estabelecimento.usuario_telefone,
                        inclusao: estabelecimento.usuario_inclusao,
                        inclusao_formatada: estabelecimento.usuario_inclusao_formatada
                    },
                    endereco:{
                        id: estabelecimento.endereco_id,
                        rua: estabelecimento.endereco_rua,
                        numero: estabelecimento.endereco_numero,
                        bairro: estabelecimento.endereco_bairro,
                        cep: estabelecimento.endereco_cep,
                        complemento: estabelecimento.endereco_complemento,
                        cidade: estabelecimento.endereco_cidade,
                        inclusao: estabelecimento.endereco_inclusao,
                        inclusao_formatada: estabelecimento.endereco_inclusao_formatada
                    }
                })
            });
        }
        json.data = retorno;
        json.success = `Estabelecimentos obtidos com sucesso!`;

        return res.status(200).json(json)
    },

    inserir: async (req, res) => {
        let json = { error: '', data: {}, success: '' };

        const ret = EstabelecimentoService.validaDados(req.body);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        let dados = {
            usuario: usuarioSessao,
            nome: req.body.nome,
            logo: req.body.logo ?? null,
            descricao: req.body.descricao
        }

        const estabelecimentoId = await Estabelecimento.inserir(dados);

        if (!estabelecimentoId.insertId) {
            json.error = `Erro ao tentar cadastrar usuário.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        json.success = `Estabelecimento cadastrado com sucesso!`;

        json.data = { id: estabelecimentoId.insertId, ...dados};

        return res.status(201).json(json);
    },

    atualizar: async (req, res) => {
        let json = { error: '', data: {}, success: '' };
        
        const ret = EstabelecimentoService.validaDados(req.body);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        let id = req.params.id;
        let dados = {
            nome: req.body.nome,
            descricao: req.body.descricao
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        const estabelecimento = await Estabelecimento.atualizar(id, dados, usuarioSessao);

        if (estabelecimento.affectedRows == 0) {
            json.error = `Erro ao tentar atualizar usuário.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        json.success = `Dados atualizados com sucesso!`;

        json.data = {id: id,...dados};

        res.status(200).json(json);
    },

    atualizarLogo: async (req, res) => {
        let json = { error: '', data: [], success: '' };
        
        let id = req.params.id;
        let logo = req.body.logo;

        if (!id) {
            json.error = 'Informe o estabelecimento!';
            return res.status(400).json(json);
        }
        
        if (!logo) {
            json.error = 'Logo não informado!';
            return res.status(400).json(json);
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        let estabelecimento = await Estabelecimento.atualizarLogo(id, logo, usuarioSessao);

        if (estabelecimento.affectedRows == 0) {
            json.error = `Erro ao tentar atualizar senha.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        json.success = `Logo atualizado com sucesso!`;

        res.status(200).json(json);
    },

    atualizarSituacao: async (req, res) => {
        let json = { error: '', data: [], success: '' };
        
        let id = req.params.id;
        let situacao = req.body.situacao;

        const ret = EstabelecimentoService.validaSituacao(situacao);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        if (!id) {
            json.error = 'Informe o estabelecimento!';
            return res.status(400).json(json);
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        let estabelecimento = await Estabelecimento.atualizaSituacao(id, situacao, usuarioSessao);

        if (estabelecimento.affectedRows == 0) {
            json.error = `Erro ao tentar atualizar senha.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        const tipoSituacao = situacao == 'ATI' ? 'Restaurado' : 'Arquivado';

        json.success = `Estabelecimento ${tipoSituacao} com sucesso!`;

        res.status(200).json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', data: {}, success: '' };

        if (!req.params.id) {
           json.error = 'Informe o estabelecimento!';
            return res.status(400).json(json);
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        const estabelecimento = await Estabelecimento.excluir(req.params.id, usuarioSessao);

        if (estabelecimento.affectedRows == 0) {
            json.error = `Erro ao tentar atualizar senha.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        v

        res.json(json);
    }

}