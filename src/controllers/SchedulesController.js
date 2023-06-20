const Schedules = require("../models/Schedules");

// const SchedulesService = require('../services/SchedulesService');
const bcrypt = require("bcrypt");
const db = require("../config/dbSequelize");

const Helper = require("../helpers/helperFunctions");

module.exports = {
  findAll: async (req, res) => {
    try {
      const filter = {
        where: {},
      };

      const { page, limit } = req.query;

      const retPaginate = Helper.getPadinate(page, limit);

      const attributes = {
        ...filter,
        attributes: ["id", "day", "start", "end", "createdAt", "updatedAt"],
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

      const schedules = await Schedules.findAndCountAll(where);

      const data = Helper.formataPaginacao(schedules, retPaginate.limit);

      const retorno = {
        ...data,
        status: true,
        menssage: ``,
      };
      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: true,
        menssage: error.message,
      };
      res.status(400).json(retorno);
    }
  },

  findOne: async (req, res) => {
    try {
      const options = {
        where: {
          id: req.params.id,
        },
        attributes: ["id", "day", "start", "end", "createdAt", "updatedAt"],
        include: [
          // {
          // }
        ],
      };
      const schedules = await Schedules.findOne(options);

      if (!schedules) {
        throw new Error(`[NOME] não encontrado!`);
      }

      const retorno = {
        data: schedules,
        status: true,
        menssage: ``,
      };

      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: false,
        menssage: error.message,
      };
      res.status(400).json(retorno);
    }
  },

  create: async (req, res) => {
    try {
      // const ret = SchedulesService.validaDados(req.body);

      // if (!ret.status) {
      //     throw new Error(ret.message );
      // }

      let payload = {
        day: req.body.day,
        start: req.body.start,
        end: req.body.end,
      };

      const schedules = await Schedules.create(payload);

      const retorno = {
        data: schedules,
        status: true,
        menssage: `Cadastro realizado com sucesso!`,
      };
      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: false,
        menssage: error,
      };
      res.status(400).json(retorno);
    }
  },

  update: async (req, res) => {
    try {
      // const ret = SchedulesService.validaDados(req.body, true);

      const options = {
        where: {
          id: req.params.id,
        },
      };
      const payload = {};

      await Schedules.update(payload, options);

      const optionsFind = {
        where: {
          id: req.params.id,
        },
        attributes: ["id", "createdAt", "updatedAt"],
      };

      const schedules = await Schedules.findOne(optionsFind);

      if (!schedules) {
        throw new Error(`[NOME] não encontrado!`);
      }

      const retorno = {
        data: schedules,
        status: true,
        menssage: `[NOME] atualizado com sucesso!`,
      };

      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: false,
        menssage: message,
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
        },
      };

      await Schedules.destroy(options);

      const retorno = {
        data: [],
        status: true,
        menssage: `[NOME] excluído com sucesso!`,
      };

      res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: false,
        menssage: error.message,
      };
      res.status(400).json(retorno);
    }
  },
};
