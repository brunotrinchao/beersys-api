const User = require("../models/User");
const Permission = require("../models/Permission");
const Helper = require("../helpers/helperFunctions");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      if (!Helper.validaEmail(req.body.email)) {
        throw new Error(`E-mail inválido!`);
      }

      let retorno = {
        token: null,
        status: false,
        message: "",
      };

      const options = {
        where: {
          email: req.body.email,
        },
        attributes: ["id", "name", "email", "password"],
        include: [
          {
            attributes: ["id", "key", "name"],
            model: Permission,
          },
        ],
      };

      const user = await User.findOne(options);

      if (!user) {
        retorno.message = `Usuário não encontrado!`;
        return res.status(200).json(retorno);
      }

      var passValidate = bcrypt.compareSync(
        req.body.password,
        user.dataValues.password
      );

      if (!passValidate) {
        retorno.message = `Senha inválida!`;
        return res.status(200).json(retorno);
      }

      // TODO: Adicionar ao token outras informacoes do usuario
      console.log(user);

      var token = jwt.sign(user.dataValues, process.env.JWT_TOKEN, {
        expiresIn: "3d", // expires in 3 days
      });

      if (token) {
        retorno.token = token;
        retorno.status = true;
      }

      return res.status(200).json(retorno);
    } catch (error) {
      const retorno = {
        data: [],
        status: false,
        message: error.message,
      };
      res.status(400).json(retorno);
    }
  },
  verifyToken: async (req, res) => {
    try {
      const token = req.headers["authorization"];
      let retorno = {
        code: 401,
        status: false,
        message: null,
      };
      if (!token) {
        retorno.message = "Token não informado";
        retorno.status = false;
        return res.status(401).send(retorno);
      }

      jwt.verify(token, process.env.JWT_TOKEN, function (err, decoded) {
        if (err) {
          throw new Error("Token inválido");
        }
        retorno.code = 200;
        retorno.status = true;
        retorno.message = "Token válido";
        return res.status(200).json(retorno);
      });
    } catch (error) {
      next(error);
    }
  },
};
