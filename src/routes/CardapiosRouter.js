module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/cardapios', autenticacaoMiddleware, controller.obterTodos);
    routes.get('/cardapios/:id', autenticacaoMiddleware, controller.obterUnico);
    routes.post('/cardapios', autenticacaoMiddleware, controller.inserir);
    routes.put('/cardapios/:id', autenticacaoMiddleware, controller.atualizar);
    routes.delete('/cardapios/:id', autenticacaoMiddleware, controller.excluir);
}