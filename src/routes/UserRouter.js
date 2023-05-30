
module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/users', autenticacaoMiddleware, controller.findAll);
    routes.get('/users/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/users', autenticacaoMiddleware, controller.create);
    routes.put('/users/:id', autenticacaoMiddleware, controller.update);
    routes.patch('/users/:id/password', autenticacaoMiddleware, controller.updatePassword);
    routes.delete('/users/:id', autenticacaoMiddleware, controller.delete);
}