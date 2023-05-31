const Menu = require('../models/Menu');

// const MenuService = require('../services/MenuService');
const bcrypt = require('bcrypt');
const db = require('../config/dbSequelize');

const Helper = require('../helpers/helperFunctions');

module.exports = {

    findAll: async (req, res) => {
        try {
            const filter = {
                where: {}
            }


            const { page, limit } = req.query;

            const retPaginate = Helper.getPadinate(page, limit);

            const attributes = {
                ...filter,
                attributes: ['id', 'createdAt', 'updatedAt'],
                order: [['id', 'ASC']],
                include: [
                    // {,
                    // }
                ]
            }

            const where = {...attributes, limit: retPaginate.limit, offset: retPaginate.offset };

            const menu = await Menu.findAndCountAll(where);

            const data = Helper.formataPaginacao(menu, retPaginate.limit);

            const retorno = {
                ...data,
                status: true,
                menssage: ``
            }
            res.status(200).json(retorno);
        } catch (error) {
            const retorno = {
                data: [],
                status: true,
                menssage: error.message
            }
            res.status(400).json(retorno);
        }
    },

    findOne: async (req, res) => {
        try {

            const options = {
                where: {
                    id: req.params.id
                },
                 attributes: ['id', 'createdAt', 'updatedAt'],
                include: [
                    // {
                    // }
                ]
            }
            const menu = await Menu.findOne(options);

            if (!menu) {
                throw new Error(`[NOME] não encontrado!`);
            }

            const retorno = {
                data: menu,
                status: true,
                menssage: ``
            }

            res.status(200).json(retorno);
        } catch (error) {
            const retorno = {
                data: [],
                status: false,
                menssage: error.message
            }
            res.status(400).json(retorno);
        }
    },

    create: async (req, res) => {
        try {

            // const ret = MenuService.validaDados(req.body);

            // if (!ret.status) {
            //     throw new Error(ret.message );
            // }

            let payload = {
            }

            const menu = await Menu.create(payload);

            const retorno = {
                data: menu,
                status: true,
                menssage: `Cadastro realizado com sucesso!`
            }
            res.status(200).json(retorno);
        } catch (error) {
            const retorno = {
                data: [],
                status: false,
                menssage: error
            }
            res.status(400).json(retorno);
        }
    },

    update: async (req, res) => {
        try{
            // const ret = MenuService.validaDados(req.body, true);


            const options = {
                where: {
                    id: req.params.id
                }
            }
            const payload = {
            }
                
            await Menu.update(payload, options);

            const optionsFind = {
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'createdAt', 'updatedAt']
            }

            const menu = await Menu.findOne(optionsFind);

            if (!menu) {
                throw new Error(`[NOME] não encontrado!`);
            }
                
            const retorno = {
                data: menu,
                status: true,
                menssage: `[NOME] atualizado com sucesso!`
            }

            res.status(200).json(retorno);
        } catch (error) {
            const retorno = {
                data: [],
                status: false,
                menssage: message
            }
            res.status(400).json(retorno);
        }
    },

    delete: async (req, res) => {
        try{

            if (!req.params.id) {
                throw new Error('Informe o id do usuário!');
            }
                
            const options = {
                where: {
                    id: req.params.id
                }
            }
                
            await Menu.destroy(options);

            const retorno = {
                    data: [],
                    status: true,
                    menssage: `[NOME] excluído com sucesso!`
                }

            res.status(200).json(retorno);
        } catch (error) {
            const retorno = {
                data: [],
                status: false,
                menssage: error.message
            }
            res.status(400).json(retorno);
        }
    }

}