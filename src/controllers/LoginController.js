const Login = require('../models/Login');
const Helper = require('../helpers/helperFunctions');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {

    login: async (req, res) => {
        let json = { token: '', error: ''};

        if (!Helper.validaEmail(req.body.email)) {
            json.error = 'E-mail inválido!';
            return res.status(400).json(json);
        }

        let email = req.body.email;

        const usuario = await Login.login(email);

        if (usuario.length === 0) {
            json.error = 'Usuário não encontrado!';
            return res.status(404).json(json);
        }

        var senhaValida = bcrypt.compareSync(req.body.senha, usuario[0].senha);

        if (!senhaValida) {
            json.error = 'Senha inválida!';
            return res.status(401).json(json);
        }

        var token = jwt.sign(usuario[0], process.env.JWT_TOKEN, {
        expiresIn: 86400 // expira em 24 horas
        });
        json.token = token;
        
        return res.status(200).json(json)
    }

}