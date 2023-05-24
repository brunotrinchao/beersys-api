const Usuario = require('../models/Usuario');
const UsuarioService = require('../services/UsuarioService');
const bcrypt = require('bcrypt');


module.exports = {

    obterTodos: async (req, res) => {
        let json = { error: '', data: [], success: '' };

        const usuarios = await Usuario.obterTodos();
        let retorno = [];
        if (Object.keys(usuarios).length > 0) {
            usuarios.forEach(usuario => {
                retorno.push({
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    inclusao: usuario.inclusao,
                    perfil: {
                        id: usuario.perfil_id,
                        nome: usuario.perfil_nome,
                        sigla: usuario.perfil_sigla
                    }
                })
            });
        }
        json.data = retorno;
        json.success = `Usuário obtido com sucesso!`;

        return res.status(200).json(json)
    },

    obterUnico: async (req, res) => {
        let json = { error: '', data: [], success: '' };

        let id = req.params.id;
        let usuarios = await Usuario.obterUnico(id);

        let retorno = [];
        if (Object.keys(usuarios).length > 0) {
            usuarios.forEach(usuario => {
                retorno.push({
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    inclusao: usuario.inclusao,
                    perfil: {
                        id: usuario.perfil_id,
                        nome: usuario.perfil_nome,
                        sigla: usuario.perfil_sigla
                    }
                })
            });
        }
        json.data = retorno;
        json.success = `Usuários obtidos com sucesso!`;

        return res.status(200).json(json)
    },

    inserir: async (req, res) => {
        let json = { error: '', data: {}, success: '' };

        const ret = UsuarioService.validaDados(req.body);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        let nome = req.body.nome;
        let email = req.body.email;
        let senha = bcrypt.hashSync(req.body.senha, 8);
        let perfil = req.body.perfil;

        const usuarioId = await Usuario.inserir(nome, email, senha, perfil);

        if (!usuarioId.insertId) {
            json.error = `Erro ao tentar cadastrar usuário.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        json.success = `Usuário cadastrado com sucesso!`;

        json.data = {
            id: usuarioId.insertId,
            nome: nome,
            email: email,
            perfil: perfil,
        };

        return res.status(201).json(json);
    },

    atualizar: async (req, res) => {
        let json = { error: '', data: {}, success: '' };
        
         const ret = UsuarioService.validaDados(req.body);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        let id = req.params.id;
        let dados = {
            nome: req.body.nome,
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha, 8),
            perfil: req.body.perfil,
        }

        const usuario = await Usuario.atualizar(id, dados);

        if (usuario.affectedRows == 0) {
            json.error = `Erro ao tentar atualizar usuário.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        json.success = `Usuário atualizado com sucesso!`;

        json.data = {
            id: id,
            nome: dados.nome,
            email: dados.email,
            perfil: dados.perfil,
        };

        res.status(200).json(json);
    },

    atualizarSenha: async (req, res) => {
        let json = { error: '', data: [], success: '' };
        
        if (!req.params.id) {
            json.error = 'Informe o usuário!';
            return res.status(400).json(json);
        }
        
        if (!req.body.senha) {
            json.error = 'Senha é obrigatório!';
            return res.status(400).json(json);
        }

        let id = req.params.id;
        let senha = bcrypt.hashSync(req.body.senha, 8);

        let usuario = await Usuario.atualizarSenha(id, senha);

        if (usuario.affectedRows == 0) {
            json.error = `Erro ao tentar atualizar senha.<br/>Entre em contato com o administrador do sistema.`;
            return res.status(400).json(json);
        }

        json.success = `Senha atualizada com sucesso!`;

        res.status(200).json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', data: {}, success: '' };

        if (!req.params.id) {
            json.error = 'Informe o id do usuário!';
            return res.status(400).json(json);
        }

        json.success = 'Usuário excluído com sucesso!';

        await Usuario.excluir(req.params.id);

        res.json(json);
    }

}