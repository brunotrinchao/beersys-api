const { companies } = require('../helpers/storage');
const multer = require('multer');
const limits = {
  fileSize: 500 * 1024,
  files: 3,
};

const upload = multer({storage:companies, limits: limits});

module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/companies', autenticacaoMiddleware, controller.findAll);
    routes.get('/companies/:id', autenticacaoMiddleware, controller.findOne);
    routes.post('/companies', autenticacaoMiddleware, controller.create);
    routes.put('/companies/:id', autenticacaoMiddleware, controller.update);
    routes.patch('/companies/:id/status', autenticacaoMiddleware, controller.updateStatus);
    routes.patch('/companies/:id/image', [autenticacaoMiddleware, upload.single('image')], controller.uploadImage);
    routes.delete('/companies/:id', autenticacaoMiddleware, controller.delete);
}