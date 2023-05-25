const express = require('express');
const routes = express.Router();
const autenticacaoMiddleware = require('./middlewares/tokenjwt');
const uplodImage = require('./middlewares/upload');

// Rotas de Login
const LoginRouter = require('./routes/LoginRouter');
const LoginController = require('./controllers/LoginController');
LoginRouter(routes, LoginController, autenticacaoMiddleware);

// Rotas de Usuários
const UsuarioRouter = require('./routes/UsuarioRouter');
const UsuarioController = require('./controllers/UsuarioController');
UsuarioRouter(routes, UsuarioController, autenticacaoMiddleware);

// Rotas de Estabelecimento
const EstabelecimentoRouter = require('./routes/EstabelecimentoRouter');
const EstabelecimentoController = require('./controllers/EstabelecimentoController');
EstabelecimentoRouter(routes, EstabelecimentoController, autenticacaoMiddleware);

// IMPORTA ROTAS

// Rotas de Produtos
const ProdutosRouter = require('./routes/ProdutosRouter');
const ProdutosController = require('./controllers/ProdutosController');
ProdutosRouter(routes, ProdutosController, { autenticacaoMiddleware, uplodImage});

// Rotas de Cardapios
const CardapiosRouter = require('./routes/CardapiosRouter');
const CardapiosController = require('./controllers/CardapiosController');
CardapiosRouter(routes, CardapiosController, autenticacaoMiddleware);

module.exports = routes;