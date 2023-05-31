const express = require('express');
const routes = express.Router();
const autenticacaoMiddleware = require('./middlewares/tokenjwt');
const uplodImage = require('./middlewares/upload');

// Rotas de Login
const LoginRouter = require('./routes/LoginRouter');
const LoginController = require('./controllers/LoginController');
LoginRouter(routes, LoginController, autenticacaoMiddleware);

// Rotas de Users
const UserRouter = require('./routes/UserRouter');
const UsersController = require('./controllers/UsersController');
UserRouter(routes, UsersController, autenticacaoMiddleware);

// Rotas de Company
const CompanyRouter = require('./routes/CompanyRouter');
const CompaniesController = require('./controllers/CompaniesController');
CompanyRouter(routes, CompaniesController, autenticacaoMiddleware);

// Rotas de Address
const AddressRouter = require('./routes/AddressRouter');
const AddressesController = require('./controllers/AddressesController');
AddressRouter(routes, AddressesController, autenticacaoMiddleware);

// IMPORTA ROTAS

// Rotas de Menu
const MenuRouter = require('./routes/MenuRouter');
const MenuController = require('./controllers/MenuController');
MenuRouter(routes, MenuController, autenticacaoMiddleware);

// Rotas de Contact
const ContactRouter = require('./routes/ContactRouter');
const ContactController = require('./controllers/ContactController');
ContactRouter(routes, ContactController, autenticacaoMiddleware);

module.exports = routes;