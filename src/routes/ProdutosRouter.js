module.exports = (routes, controller, { autenticacaoMiddleware, uplodImage }) => {
    routes.get('/produtos', autenticacaoMiddleware, controller.obterTodos);
    routes.get('/produtos/:id', autenticacaoMiddleware, controller.obterUnico);
    routes.post('/produtos', [autenticacaoMiddleware, uplodImage.single('foto')], controller.inserir);
    routes.put('/produtos/:id', autenticacaoMiddleware, controller.atualizar);
    routes.delete('/produtos/:id', autenticacaoMiddleware, controller.excluir);
}