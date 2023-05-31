module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/companies/:companyId/menu', autenticacaoMiddleware, controller.findAll);
    routes.get('/companies/:companyId/menu/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/companies/:companyId/menu', autenticacaoMiddleware, controller.create);
    routes.put('/companies/:companyId/menu/:id', autenticacaoMiddleware, controller.update);
    routes.delete('/companies/:companyId/menu/:id', autenticacaoMiddleware, controller.delete);
}