
module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.post('/login', controller.login);
}