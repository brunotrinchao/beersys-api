const User = require('../models/User');
const Permission = require('../models/Permission');
const Helper = require('../helpers/helperFunctions');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {

    login: async (req, res) => {
        try {
            if (!Helper.validaEmail(req.body.email)) {
                throw new Error(`E-mail inválido!`);
            }
        
            const options = {
                where: {
                    email: req.body.email,
                },
                attributes: ['id', 'name', 'email', 'password'],
                include: [
                    {
                        attributes: ['id', 'key', 'name'],
                        model: Permission,
                    }
                ]
            }

            const user = await User.findOne(options);

            if (!user) {
                throw new Error(`Usuário não encontrado!`);
            }

            var passValidate = bcrypt.compareSync(req.body.password, user.dataValues.password);

            if (!passValidate) {
                throw new Error(`Senha inválida!`);
            }

            // TODO: Adicionar ao token outras informacoes do usuario
            console.log(user.dataValues);

            var token = jwt.sign(user.dataValues, process.env.JWT_TOKEN, {
                expiresIn: '3d' // expires in 3 days
            });
    
            return res.status(200).json({token})

        } catch (error) {
            const retorno = {
                data: [],
                status: false,
                menssage: error.message
            }
            res.status(400).json(retorno);
        }
        },
}