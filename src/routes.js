const express = require('express');
const routes = express.Router();

// Rotas de Usuários
const UsuarioRouter = require('./routes/UsuarioRouter');
const UsuarioController = require('./controllers/UsuarioController');
UsuarioRouter(routes, UsuarioController);


module.exports = routes;