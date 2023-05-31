module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/companies/:companyId/contacts', autenticacaoMiddleware, controller.findAll);
    routes.get('/companies/:companyId/contacts/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/companies/:companyId/contacts', autenticacaoMiddleware, controller.create);
    routes.put('/companies/:companyId/contacts/:id', autenticacaoMiddleware, controller.update);
    routes.delete('/companies/:companyId/contacts/:id', autenticacaoMiddleware, controller.delete);
}