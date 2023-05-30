
module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/companies/:companyId/addresses', autenticacaoMiddleware, controller.findAll);
    routes.get('/companies/:companyId/addresses/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/companies/:companyId/addresses', autenticacaoMiddleware, controller.create);
    routes.put('/companies/:companyId/addresses/:id', autenticacaoMiddleware, controller.update);
    routes.delete('/companies/:companyId/addresses/:id', autenticacaoMiddleware, controller.delete);
}