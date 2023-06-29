const { Sequelize } = require("sequelize");

const CompanyService = require("../services/CompanyService");
const bcrypt = require("bcrypt");

const Helper = require("../helpers/helperFunctions");

const Company = require("../models/Company");
const User = require("../models/User");
const Address = require("../models/Address");
const Menu = require("../models/Menu");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Contacts = require("../models/Contact");
const Schedules = require("../models/Schedules");

//  UPLOAD
// const multer = require('multer');
// const upload = require('../helpers/storage');
// const uploadImage = upload.single('image')

const CompanyController = {
  findAll: async (req, res) => {
    try {
      const autentication = Helper.retonaToken(req);
      if (!autentication.id) {
        throw new Error(`Usuário não autenticado!`);
      }

      const filter = {
        where: {
          users_id: autentication.id,
        },
      };

      const { page, limit } = req.query;

      const retPaginate = Helper.getPadinate(page, limit);

      const attributes = {
        ...filter,
        attributes: [
          "id",
          "name",
          "description",
          "photo",
          "createdAt",
          "updatedAt",
        ],
        order: [["name", "ASC"]],
        include: [
          {
            attributes: ["id", "status", "createdAt", "updatedAt"],
            order: [["name", "ASC"]],
            model: Menu,
            include: [
              {
                attributes: ["id", "name", "status", "createdAt", "updatedAt"],
                order: [["name", "ASC"]],
                model: Category,
                include: [
                  {
                    attributes: [
                      "id",
                      "name",
                      "description",
                      "photo",
                      "price",
                      "createdAt",
                      "updatedAt",
                    ],
                    model: Product,
                  },
                ],
              },
            ],
          },
          {
            attributes: [
              "id",
              "zipcode",
              "address",
              "number",
              "country",
              "createdAt",
              "updatedAt",
            ],
            model: Address,
          },
        ],
      };

      const where = {
        ...attributes,
        limit: retPaginate.limit,
        offset: retPaginate.offset,
      };

      const company = await Company.findAndCountAll(where);

      const data = Helper.formataPaginacao(company, retPaginate.limit);

      const retorno = {
        ...data,
        status: true,
        message: ``,
      };
      setTimeout(() => {}, 5000);
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
      const autentication = Helper.retonaToken(req);
      if (!autentication.id) {
        throw new Error(`Usuário não autenticado!`);
      }

      const options = {
        where: {
          id: req.params.id,
          users_id: autentication.id,
        },
        attributes: [
          "id",
          "name",
          "description",
          "photo",
          "createdAt",
          "updatedAt",
        ],
        order: [["name", "ASC"]],
        include: [
          {
            attributes: [
              "id",
              "zipcode",
              "address",
              "number",
              "neighborhood",
              "city",
              "country",
              "createdAt",
              "updatedAt",
            ],
            model: Address,
          },
          {
            attributes: ["id", "status", "createdAt", "updatedAt"],
            order: [["name", "ASC"]],
            model: Menu,
            include: [
              {
                attributes: ["id", "name", "status", "createdAt", "updatedAt"],
                order: [["name", "ASC"]],
                model: Category,
                include: [
                  {
                    attributes: [
                      "id",
                      "name",
                      "description",
                      "photo",
                      "price",
                      "createdAt",
                      "updatedAt",
                    ],
                    model: Product,
                  },
                ],
              },
            ],
          },
          {
            attributes: [
              "id",
              "contact",
              "type",
              [
                Sequelize.literal(
                  `CASE 
                  WHEN type = "EMA" THEN "E-mail" 
                  WHEN type = "TEL" THEN "Telefone" 
                  WHEN type = "CEL" THEN "Celular" 
                  WHEN type = "WHA" THEN "Whatsapp" 
                  END`
                ),
                "type_formated",
              ],
              "createdAt",
              "updatedAt",
            ],
            model: Contacts,
          },
          {
            attributes: [
              "id",
              "day",
              "start",
              "end",
              [
                Sequelize.literal(
                  `CASE 
                      WHEN day = "DOM" THEN "Domingo" 
                      WHEN day = "SEG" THEN "Segunda"
                      WHEN day = "TER" THEN "Terça"
                      WHEN day = "QUA" THEN "Quarta"
                      WHEN day = "QUI" THEN "Quinta"
                      WHEN day = "SEX" THEN "Sexta"
                      WHEN day = "SAB" THEN "Sábado"
                    END`
                ),
                "day_formated",
              ],
              "createdAt",
              "updatedAt",
            ],
            model: Schedules,
          },
        ],
      };

      const company = await Company.findOne(options);

      if (!company) {
        throw new Error(`Estabelecimento não encontrado!`);
      }

      const retorno = {
        data: company,
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
      const autentication = Helper.retonaToken(req);
      if (!autentication.id) {
        throw new Error(`Usuário não autenticado!`);
      }

      const ret = CompanyService.validaDados(req.body);

      if (!ret.status) {
        throw new Error(ret.message);
      }

      let payload = {
        name: req.body.name,
        description: req.body.description ?? null,
        status: req.body.status ?? "ATI",
        users_id: autentication.id,
      };

      const company = await Company.create(payload);

      const retorno = {
        data: company,
        status: true,
        message: `Cadastro realizado com sucesso!`,
      };
      res.status(200).json(retorno);
    } catch (error) {
      let message = error.message;
      console.log(error);
      if ((error.errors[0].message = "email must be unique")) {
        message = `O e-mail ${req.body.email} já está cadastrado!`;
      }
      const retorno = {
        data: [],
        status: false,
        message: error,
      };
      res.status(400).json(retorno);
    }
  },

  update: async (req, res) => {
    try {
      const ret = CompanyService.validaDados(req.body, true);

      if (!ret.status) {
        throw new Error(ret.message);
      }

      const options = {
        where: {
          id: req.params.id,
        },
      };
      const payload = {
        name: req.body.name,
        description: req.body.description,
      };

      await Company.update(payload, options);

      const attributes = {
        ...options,
        attributes: [
          "id",
          "name",
          "description",
          "photo",
          "createdAt",
          "updatedAt",
        ],
        order: [["name", "ASC"]],
      };

      const company = await Company.findOne(attributes);

      if (!company) {
        throw new Error(`Estabelecimento não encontrado!`);
      }

      const retorno = {
        data: company,
        status: true,
        message: `Estabelecimento atualizado com sucesso!`,
      };

      res.status(200).json(retorno);
    } catch (error) {
      let message = error.message;
      const retorno = {
        data: [],
        status: false,
        message: message,
      };
      res.status(400).json(retorno);
    }
  },

  updateStatus: async (req, res) => {
    try {
      if (!req.params.id) {
        throw new Error("Informe o id do usuário!");
      }

      if (!req.body.password) {
        throw new Error("Informe a senha!");
      }

      const options = {
        where: {
          id: req.params.id,
        },
      };
      const playload = {
        password: bcrypt.hashSync(req.body.password, 8),
      };

      await User.update(playload, options);

      const optionsFind = {
        where: {
          id: req.params.id,
        },
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "mobile",
          "createdAt",
          "updatedAt",
        ],
      };

      const user = await User.findOne(optionsFind);

      if (!user) {
        throw new Error(`Usuário não encontrado!`);
      }

      const retorno = {
        data: user,
        status: true,
        message: `Senha atualizada com sucesso!`,
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

  uploadImage: async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("Informe a imagem!");
      } else {
        const payload = {
          photo: req.file.path,
        };

        const options = {
          where: {
            id: req.params.id,
          },
        };

        await Company.update(payload, options);

        const retorno = {
          data: {
            id: req.params.id,
            image: payload.photo,
          },
          status: true,
          message: `Imagem atualizada com sucesso!`,
        };

        res.status(200).json(retorno);
      }
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
        },
      };

      await User.destroy(options);

      const retorno = {
        data: [],
        status: true,
        message: `Usuário excluído com sucesso!`,
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

module.exports = CompanyController;
