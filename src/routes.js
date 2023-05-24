const express = require('express');
const routes = express.Router();
const autenticacaoMiddleware = require('./middlewares/tokenjwt');

// Rotas de Login
const LoginRouter = require('./routes/LoginRouter');
const LoginController = require('./controllers/LoginController');
LoginRouter(routes, LoginController, autenticacaoMiddleware);

// Rotas de Usuários
const UsuarioRouter = require('./routes/UsuarioRouter');
const UsuarioController = require('./controllers/UsuarioController');
UsuarioRouter(routes, UsuarioController, autenticacaoMiddleware);


module.exports = routes;