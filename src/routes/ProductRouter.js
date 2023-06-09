const { products } = require('../helpers/storage');
const multer = require('multer');
const limits = {
  fileSize: 500 * 1024,
  files: 3,
};

const upload = multer({storage:products, limits: limits});

module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/companies/:companyId/menus/:menuId/category/:categoryId/products', autenticacaoMiddleware, controller.findAll);
    routes.get('/companies/:companyId/menus/:menuId/category/:categoryId/products/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/companies/:companyId/menus/:menuId/category/:categoryId/products', autenticacaoMiddleware, controller.create);
    routes.put('/companies/:companyId/menus/:menuId/category/:categoryId/products/:id', autenticacaoMiddleware, controller.update);
    routes.delete('/companies/:companyId/menus/:menuId/category/:categoryId/products/:id', autenticacaoMiddleware, controller.delete);
}