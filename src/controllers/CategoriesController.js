const Category = require('../models/Category');

const CategoryService = require('../services/CategoryService');
const bcrypt = require('bcrypt');
const db = require('../config/dbSequelize');

const Helper = require('../helpers/helperFunctions');

module.exports = {

    findAll: async (req, res) => {
        try {
            const filter = {
                where: {
                    categories_id: req.params.companyId
                }
            }


            const { page, limit } = req.query;

            const retPaginate = Helper.getPadinate(page, limit);

            const attributes = {
                ...filter,
                attributes: ['id', 'name', 'status', 'createdAt', 'updatedAt'],
                order: [['name', 'ASC']],
                include: [
                    // {,
                    // }
                ]
            }

            const where = {...attributes, limit: retPaginate.limit, offset: retPaginate.offset };

            const category = await Category.findAndCountAll(where);

            const data = Helper.formataPaginacao(category, retPaginate.limit);

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
                attributes: ['id', 'name', 'status', 'createdAt', 'updatedAt'],
                include: [
                    // {
                    // }
                ]
            }
            const category = await Category.findOne(options);

            if (!category) {
                throw new Error(`Categoria não encontrado!`);
            }

            const retorno = {
                data: category,
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

            const ret = CategoryService.validaDados(req.body);

            if (!ret.status) {
                throw new Error(ret.message );
            }
            
            if (typeof req.body.status !== 'undefined') {
                const retStatus = CategoryService.validaStatus(req.body)
                if (!retStatus.status) {
                    throw new Error(retStatus.message);
                }
            }

            let payload = {
                name: req.body.name,
                status: req.body.status ?? 'ATI',
                menus_id: req.params.menuId,
            }

            const category = await Category.create(payload);

            const retorno = {
                data: category,
                status: true,
                menssage: `Cadastro realizado com sucesso!`
            }
            res.status(200).json(retorno);
        } catch (error) {
            console.log(error)
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
            // const ret = CategoryService.validaDados(req.body, true);


            const options = {
                where: {
                    id: req.params.id
                }
            }
            const payload = {
            }
                
            await Category.update(payload, options);

            const optionsFind = {
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'createdAt', 'updatedAt']
            }

            const category = await Category.findOne(optionsFind);

            if (!category) {
                throw new Error(`[NOME] não encontrado!`);
            }
                
            const retorno = {
                data: category,
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

    updateStatus: async (req, res) => {
        try{

            if (!req.params.id) {
                throw new Error('Informe o id do usuário!');
            }

            const options = {
                where: {
                    id: req.params.id,
                    menus_id: req.params.menuId,
                }
            }
                
            await Category.update(playload, options);

            const optionsFind = {
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'name', 'status', 'createdAt', 'updatedAt']
            }

            const category = await Category.findOne(optionsFind);

            if (!category) {
                throw new Error(`Categoria não encontrado!`);
            }
                
            const retorno = {
                    data: user,
                    status: true,
                    menssage: `Status da categoria atualizado com sucesso!`
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
                
            await Category.destroy(options);

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