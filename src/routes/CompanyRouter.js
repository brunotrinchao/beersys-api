
module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/companies', autenticacaoMiddleware, controller.findAll);
    routes.get('/companies/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/companies', autenticacaoMiddleware, controller.create);
    routes.put('/companies/:id', autenticacaoMiddleware, controller.update);
    routes.patch('/companies/:id/status', autenticacaoMiddleware, controller.updateStatus);
    routes.delete('/companies/:id', autenticacaoMiddleware, controller.delete);
}