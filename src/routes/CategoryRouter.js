module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/companies/:companyId/menus/:menuId/category', autenticacaoMiddleware, controller.findAll);
    routes.get('/companies/:companyId/menus/:menuId/category/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/companies/:companyId/menus/:menuId/category', autenticacaoMiddleware, controller.create);
    routes.put('/companies/:companyId/menus/:menuId/category/:id', autenticacaoMiddleware, controller.update);
    routes.patch('/companies/:companyId/menus/:menuId/category/:id', autenticacaoMiddleware, controller.updateStatus);
    routes.delete('/companies/:companyId/menus/:menuId/category/:id', autenticacaoMiddleware, controller.delete);
}