const Product = require('../models/Product');

const ProductService = require('../services/ProductService');
const bcrypt = require('bcrypt');
const db = require('../config/dbSequelize');

const Helper = require('../helpers/helperFunctions');

module.exports = {

    findAll: async (req, res) => {
        try {
            const filter = {
                where: {
                    categories_id: req.params.categoryId
                }
            }

            const { page, limit } = req.query;

            const retPaginate = Helper.getPadinate(page, limit);

            const attributes = {
                ...filter,
                attributes: ['id', 'name', 'description', 'photo', 'price', 'createdAt', 'updatedAt'],
                order: [['id', 'ASC']],
                include: [
                    // {,
                    // }
                ]
            }

            const where = {...attributes, limit: retPaginate.limit, offset: retPaginate.offset };

            const product = await Product.findAndCountAll(where);

            const data = Helper.formataPaginacao(product, retPaginate.limit);

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
                    id: req.params.id,
                    categories_id: req.params.categoryId
                },
                attributes: ['id', 'name', 'description', 'photo', 'price', 'createdAt', 'updatedAt'],
                include: [
                    // {
                    // }
                ]
            }
            const product = await Product.findOne(options);

            if (!product) {
                throw new Error(`Produto não encontrado!`);
            }

            const retorno = {
                data: product,
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

            const ret = ProductService.validaDados(req.body);

            if (!ret.status) {
                throw new Error(ret.message );
            }

            let payload = {
                name: req.body.name,
                description: req.body.description ?? null,
                photo: req.body.photo ?? null,
                price: req.body.price,
                categories_id: req.params.categoryId
            }

            const product = await Product.create(payload);

            const retorno = {
                data: product,
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
            // const ret = ProductService.validaDados(req.body, true);


            const options = {
                where: {
                    id: req.params.id
                }
            }
            const payload = {
            }
                
            await Product.update(payload, options);

            const optionsFind = {
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'createdAt', 'updatedAt']
            }

            const product = await Product.findOne(optionsFind);

            if (!product) {
                throw new Error(`[NOME] não encontrado!`);
            }
                
            const retorno = {
                data: product,
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
                
            await Product.destroy(options);

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