const Usuario = require('../models/Usuario');
const UsuarioService = require('../services/UsuarioService');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

module.exports = {

    obterTodos: async (req, res) => {
        try {
            const usuario = await Usuario.findAll();
            res.json(usuario);
        } catch (error) {
            console.log(error)
        }
    },

    obterUnico: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            res.json(usuario);
        } catch (error) {
            console.log(error)
        }
    },

    inserir: async (req, res) => {
        try {
        const ret = UsuarioService.validaDados(req.body);

        if (!ret.status) {
            return res.status(400).json(json);
        }

        let dados = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            celular: req.body.celular,
            senha: bcrypt.hashSync(req.body.senha, 8),
            perfil_id: req.body.perfil_id
        }
            
            const usuario = await Usuario.create(dados);

            //  TODO: Remover campo 'senha' do objeto 'usuario
            
            res.json(usuario);
        } catch (error) {
            console.log(error)
        }
    },

    atualizar: async (req, res) => {

        try{
        
         const ret = UsuarioService.validaDados(req.body, true);

        if (!ret.status) {
            return res.status(400).json(ret);
        }

        const opcoes = {
            where: {
                id: req.params.id
            }
        }
        const dados = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            celular: req.body.celular,
        }
            
        await Usuario.update(dados, opcoes);


        const usuario = await Usuario.findByPk(req.params.id);
        //  TODO: Remover campo 'senha' do objeto 'usuario
        res.json(usuario);
        } catch (error) {
            console.log(error)
        }
    },

    atualizarSenha: async (req, res) => {
        try{
         let json = { error: '', data: {}, success: '' };
        if (!req.params.id) {
            json.error = 'Informe o usuário!';
            return res.status(400).json(json);
        }
        
        if (!req.body.senha) {
            json.error = 'Senha é obrigatório!';
            return res.status(400).json(json);
        }

        const opcoes = {
            where: {
                id: req.params.id
            }
        }
        const dados = {
            senha: bcrypt.hashSync(req.body.senha, 8)
        }
            
        await Usuario.update(dados, opcoes);


        const usuario = await Usuario.findByPk(req.params.id);
        //  TODO: Remover campo 'senha' do objeto 'usuario
        res.json(usuario);
        } catch (error) {
            console.log(error)
        }

    },

    excluir: async (req, res) => {
        try{
        let json = { error: '', data: {}, success: '' };

        if (!req.params.id) {
            json.error = 'Informe o id do usuário!';
            return res.status(400).json(json);
        }
            
        const opcoes = {
            where: {
                id: req.params.id,
                perfil_id: {
                    [Op.ne]: 1
                }
            }
        }
            
            await Usuario.destroy(opcoes);

            const usuario = await Usuario.findAll();
            
            res.json(usuario);
        } catch (error) {
            console.log(error)
        }
    }

}