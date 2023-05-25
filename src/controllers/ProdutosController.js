const Produtos = require('../models/Produtos');
const ProdutosService = require('../services/ProdutosService');
const Helper = require('../helpers/helperFunctions');

module.exports = {

    obterTodos: async (req, res) => {
        let json = { error: '', data: [], success: '' };

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        const produtoss = await Produtos.obterTodos(usuarioSessao);
        let retorno = [];
        if (Object.keys(produtoss).length > 0) {
            produtoss.forEach(produtos => {
                retorno.push({
                    id: produtos.id,
                    nome: produtos.nome,
                    valor: produtos.valor,
                    descricao: produtos.descricao,
                    foto: produtos.foto,
                    inclusao: produtos.inclusao,
                    inclusao_formatada: produtos.inclusao_formatada,
                    cardapio: {
                        id: produtos.cardapio_id,
                        nome: produtos.cardapio_nome,
                        inclusao: produtos.cardapio_inclusao,
                        inclusao_formatada: produtos.cardapio_inclusao_formatada
                    },
                    estabelecimento: {
                        id: produtos.estabelecimento_id,
                        nome: produtos.estabelecimento_nome,
                        inclusao: produtos.estabelecimento_inclusao,
                        inclusao_formatada: produtos.estabelecimento_inclusao_formatada
                    }
                })
            });
        }
        json.data = retorno;
        json.success = `Produtoss obtidos com sucesso!`;

        return res.status(200).json(json)
    },

    obterUnico: async (req, res) => {
        let json = { error: '', data: [], success: '' };

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        let id = req.params.id;
        let produtoss = await Produtos.obterUnico(id, usuarioSessao);

        let retorno = [];
        if (Object.keys(produtoss).length > 0) {
            produtoss.forEach(produtos => {
                retorno.push({
                    id: produtos.id,
                    nome: produtos.nome,
                    valor: produtos.valor,
                    descricao: produtos.descricao,
                    foto: produtos.foto,
                    inclusao: produtos.inclusao,
                    inclusao_formatada: produtos.inclusao_formatada,
                    cardapio: {
                        id: produtos.cardapio_id,
                        nome: produtos.cardapio_nome,
                        inclusao: produtos.cardapio_inclusao,
                        inclusao_formatada: produtos.cardapio_inclusao_formatada
                    },
                    estabelecimento: {
                        id: produtos.estabelecimento_id,
                        nome: produtos.estabelecimento_nome,
                        inclusao: produtos.estabelecimento_inclusao,
                        inclusao_formatada: produtos.estabelecimento_inclusao_formatada
                    }
                })
            });
        }
        json.data = retorno;
        json.success = `Produtos obtido com sucesso!`;

        return res.status(200).json(json)
    },

    inserir: async (req, res) => {
        let json = { error: '', data: {}, success: '' };

        const ret = ProdutosService.validaDados(req.body);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        let dados = {
            usuario: usuarioSessao,
            cardapio: req.body.cardapio, 
            nome: req.body.nome, 
            valor: req.body.valor, 
            descricao: req.body.descricao ?? null, 
            foto: req.file.filename ?? null
        }

        const produtosId = await Produtos.inserir(dados);

        if (!produtosId.insertId) {
            json.error = `Erro ao tentar cadastrar usuário.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        json.success = `Produtos cadastrado com sucesso!`;

        json.data = { id: produtosId.insertId, ...dados};

        return res.status(201).json(json);
    },

    atualizar: async (req, res) => {
        let json = { error: '', data: {}, success: '' };
        
        const ret = ProdutosService.validaDados(req.body);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        let id = req.params.id;
        let dados = {
            cardapio: req.body.cardapio, 
            nome: req.body.nome, 
            valor: req.body.valor, 
            descricao: req.body.descricao, 
            foto: req.body.foto
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        const produtos = await Produtos.atualizar(id, dados, usuarioSessao);

        if (produtos.affectedRows == 0) {
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
           json.error = 'Informe o produtos!';
            return res.status(400).json(json);
        }

        const retToken = Helper.retonaToken(req);
        const usuarioSessao = retToken.id;

        const produtos = await Produtos.excluir(req.params.id, usuarioSessao);

        if (produtos.affectedRows == 0) {
            json.error = `Erro ao tentar atualizar senha.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        v

        res.json(json);
    }

}