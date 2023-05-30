const Company = require('../models/Company');
const User = require('../models/User');
const Address = require('../models/Address');
const CompanyService = require('../services/CompanyService');
const bcrypt = require('bcrypt');
const db = require('../config/dbSequelize');

const Helper = require('../helpers/helperFunctions');

module.exports = {

    findAll: async (req, res) => {
        try {
            const { page, limit } = req.query;

            const retPaginate = Helper.getPadinate(page, limit);

            const attributes = {
                attributes: ['id', 'name', 'description', 'photo', 'createdAt', 'updatedAt'],
                order: [['name', 'ASC']],
                include: [
                    {
                        attributes: ['id', 'name', 'email', 'phone', 'mobile', 'createdAt', 'updatedAt'],
                        model: User,
                    },
                    {
                        attributes: ['id', 'zipcode', 'address', 'number', 'country', 'createdAt', 'updatedAt'],
                        model: Address,
                    }
                ]
            }

            const where = {...attributes, limit: retPaginate.limit, offset: retPaginate.offset };

            const company = await Company.findAndCountAll(where);

            const data = Helper.formataPaginacao(company, retPaginate.limit);

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
                attributes: ['id', 'name', 'description', 'photo', 'createdAt', 'updatedAt'],
                include: [
                    {
                        attributes: ['id', 'name', 'email', 'phone', 'mobile', 'createdAt', 'updatedAt'],
                        model: User,
                    }
                ]
            }
            const company = await Company.findOne(options);

            if (!company) {
                throw new Error(`Estabelecimento não encontrado!`);
            }

            const retorno = {
                data: company,
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
            const autentication = Helper.retonaToken(req);
            if (!autentication.id) {
                throw new Error(`Usuário não autenticado!`);
            }

            const ret = CompanyService.validaDados(req.body);

            if (!ret.status) {
                throw new Error(ret.message );
            }

            let payload = {
                name: req.body.name,
                description: req.body.description ?? null,
                photo: req.body.photo ?? null,
                users_id: autentication.id,
            }

            const company = await Company.create(payload);

            const retorno = {
                data: company,
                status: true,
                menssage: `Cadastro realizado com sucesso!`
            }
            res.status(200).json(retorno);
        } catch (error) {
            let message = error.message;

            if (error.errors[0].message = "email must be unique") {
                message = `O e-mail ${req.body.email} já está cadastrado!`;
            }
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
            const ret = UserService.validaDados(req.body, true);

            if (!ret.status) {
                throw new Error(ret.message );
            }

            const options = {
                where: {
                    id: req.params.id
                }
            }
            const payload = {
                name: req.body.nome,
                email: req.body.email,
                phone: req.body.phone,
                mobile: req.body.mobile,
            }
                
            await User.update(payload, options);

            const optionsFind = {
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'name', 'email', 'phone', 'mobile', 'createdAt', 'updatedAt']
            }

            const user = await User.findOne(optionsFind);

            if (!user) {
                throw new Error(`Usuário não encontrado!`);
            }
                
            const retorno = {
                data: user,
                status: true,
                menssage: `Usuário atualizado com sucesso!`
            }

            res.status(200).json(retorno);
        } catch (error) {
            let message = error.message;
            if (error.errors[0].type) {
                message = `O e-mail ${req.body.email} já está cadastrado!`;
            }
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
            
            if (!req.body.password) {
                throw new Error('Informe a senha!');
            }

            const options = {
                where: {
                    id: req.params.id
                }
            }
            const playload = {
                password: bcrypt.hashSync(req.body.password, 8)
            }
                
            await User.update(playload, options);

            const optionsFind = {
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'name', 'email', 'phone', 'mobile', 'createdAt', 'updatedAt']
            }

            const user = await User.findOne(optionsFind);

            if (!user) {
                throw new Error(`Usuário não encontrado!`);
            }
                
            const retorno = {
                    data: user,
                    status: true,
                    menssage: `Senha atualizada com sucesso!`
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
                
            await User.destroy(options);

            const retorno = {
                    data: [],
                    status: true,
                    menssage: `Usuário excluído com sucesso!`
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