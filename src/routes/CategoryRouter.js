const { categories } = require('../helpers/storage');
const multer = require('multer');
const limits = {
  fileSize: 500 * 1024,
  files: 3,
};

const upload = multer({storage:categories, limits: limits});

module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/companies/:companyId/menus/:menuId/category', autenticacaoMiddleware, controller.findAll);
    routes.get('/companies/:companyId/menus/:menuId/category/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/companies/:companyId/menus/:menuId/category', autenticacaoMiddleware, controller.create);
    routes.put('/companies/:companyId/menus/:menuId/category/:id', autenticacaoMiddleware, controller.update);
    routes.patch('/companies/:companyId/menus/:menuId/category/:id', autenticacaoMiddleware, controller.updateStatus);
    routes.patch('/companies/:companyId/menus/:menuId/category/:id/image', [autenticacaoMiddleware, upload.single('image')], controller.uploadImage);
    routes.delete('/companies/:companyId/menus/:menuId/category/:id', autenticacaoMiddleware, controller.delete);
}