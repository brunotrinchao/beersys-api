const Usuario = require('../models/Usuario');
const UsuarioService = require('../services/UsuarioService');
const crypto = require('crypto');


module.exports = {

    obterTodos: async (req, res) => {
        const usuarios = await Usuario.obterTodos();
        return res.status(200).json(usuarios)
    },

    obterUnico: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let usuario = await Usuario.obterUnico(id);

        if (usuario) {
            json.result = usuario
        }

        return res.status(200).json(json)
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        const ret = UsuarioService.validaDados(req.body);

        if (!ret.status) {
            json.error = ret.msg;
            return res.status(400).json(json);
        }

        let nome = req.body.nome;
        let email = req.body.email;
        let senha = crypto.createHash('sha1').update(req.body.senha).digest('hex');
        let foto = req.body.foto ?? '';

        const usuarioId = await Usuario.inserir(nome, email, senha, foto);

        json.result = {
            id: usuarioId.insertId,
            nome: nome,
            email: email,
            foto: foto,
        };

        return res.status(201).json(json);
    },

    atualizar: async (req, res) => {
        let json = { error: '', result: {} };

        let codigo = req.params.id;
        let modelo = req.body.modelo;
        let placa = req.body.placa;

        if (codigo && modelo && placa) {
            await Usuario.atualizar(codigo, modelo, placa);

            json.result = {
                id: codigo,
                descricao: modelo,
                placa: placa,
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', result: {} };

        await Usuario.excluir(req.params.id);

        res.json(json);
    }

}