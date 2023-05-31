module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/companies/:companyId/menus/:menuId/category/:categoryId/products', autenticacaoMiddleware, controller.findAll);
    routes.get('/companies/:companyId/menus/:menuId/category/:categoryId/products/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/companies/:companyId/menus/:menuId/category/:categoryId/products', autenticacaoMiddleware, controller.create);
    routes.put('/companies/:companyId/menus/:menuId/category/:categoryId/products/:id', autenticacaoMiddleware, controller.update);
    routes.delete('/companies/:companyId/menus/:menuId/category/:categoryId/products/:id', autenticacaoMiddleware, controller.delete);
}