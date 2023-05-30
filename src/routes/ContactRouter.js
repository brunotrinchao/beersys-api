module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/contacts', autenticacaoMiddleware, controller.findAll);
    routes.get('/contacts/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/contacts', autenticacaoMiddleware, controller.create);
    routes.put('/contacts/:id', autenticacaoMiddleware, controller.update);
    routes.delete('/contacts/:id', autenticacaoMiddleware, controller.delete);
}