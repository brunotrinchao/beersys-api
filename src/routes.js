const express = require('express');
const routes = express.Router();

const CarroController = require('./controllers/CarroController');

routes.get('/carros', CarroController.obterTodos);
routes.get('/carros/:id', CarroController.obterUnico);
routes.post('/carros', CarroController.inserir);
routes.put('/carros/:id', CarroController.atualizar);
routes.delete('/carros/:id', CarroController.excluir);

module.exports = routes;