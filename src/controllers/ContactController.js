const Contact = require("../models/Contact");

const ContactService = require("../services/ContactService");
const bcrypt = require("bcrypt");
const db = require("../config/dbSequelize");

const Helper = require("../helpers/helperFunctions");

module.exports = {
  findAll: async (req, res) => {
    try {
      const filter = {
        where: {
          companies_id: req.params.companyId,
        },
      };

      const { page, limit } = req.query;

      const retPaginate = Helper.getPadinate(page, limit);

      const attributes = {
        ...filter,
        attributes: ["id", "contact", "type", "createdAt", "updatedAt"],
        order: [["id", "ASC"]],
        include: [
          // {,
          // }
        ],
      };

      const where = {
        ...attributes,
        limit: retPaginate.limit,
        offset: retPaginate.offset,
      };

      const contact = await Contact.findAndCountAll(where);

      const data = Helper.formataPaginacao(contact, retPaginate.limit);

      const retorno = {
        ...data,
        status: true,
        message: ``,
      };
      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: true,
        message: error.message,
      };
      res.status(400).json(retorno);
    }
  },

  findOne: async (req, res) => {
    try {
      const options = {
        where: {
          id: req.params.id,
          companies_id: req.params.companyId,
        },
        attributes: ["id", "contact", "type", "createdAt", "updatedAt"],
        include: [
          // {
          // }
        ],
      };
      const contact = await Contact.findOne(options);

      if (!contact) {
        throw new Error(`[NOME] não encontrado!`);
      }

      const retorno = {
        data: contact,
        status: true,
        message: ``,
      };

      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: false,
        message: error.message,
      };
      res.status(400).json(retorno);
    }
  },

  create: async (req, res) => {
    try {
      const ret = ContactService.validaDados(req.body);

      if (!ret.status) {
        throw new Error(ret.message);
      }

      let payload = {
        contact: req.body.contact,
        type: req.body.type,
        companies_id: req.params.companyId,
      };

      const contact = await Contact.create(payload);

      const retorno = {
        data: contact,
        status: true,
        message: `Cadastro realizado com sucesso!`,
      };
      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: false,
        message: error.message,
      };
      res.status(400).json(retorno);
    }
  },

  update: async (req, res) => {
    try {
      const ret = ContactService.validaDados(req.body, true);

      if (!ret.status) {
        throw new Error(ret.message);
      }

      const options = {
        where: {
          id: req.params.id,
          companies_id: req.params.companyId,
        },
      };
      const payload = {
        contact: req.body.contact,
        type: req.body.type,
      };

      await Contact.update(payload, options);

      const optionsFind = {
        where: {
          id: req.params.id,
        },
        attributes: ["id", "contact", "type", "createdAt", "updatedAt"],
      };

      const contact = await Contact.findOne(optionsFind);

      if (!contact) {
        throw new Error(`Contato não encontrado!`);
      }

      const retorno = {
        data: contact,
        status: true,
        message: `Contato atualizado com sucesso!`,
      };

      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: false,
        message: error.message,
      };
      res.status(400).json(retorno);
    }
  },

  delete: async (req, res) => {
    try {
      if (!req.params.id) {
        throw new Error("Informe o id do usuário!");
      }

      const options = {
        where: {
          id: req.params.id,
          companies_id: req.params.companyId,
        },
      };

      await Contact.destroy(options);

      const retorno = {
        data: [],
        status: true,
        message: `Contato excluído com sucesso!`,
      };

      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: false,
        message: error.message,
      };
      res.status(400).json(retorno);
    }
  },
};
