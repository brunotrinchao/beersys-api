
module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/estabelecimentos', autenticacaoMiddleware, controller.obterTodos);
    routes.get('/estabelecimentos/:id', autenticacaoMiddleware, controller.obterUnico);
    routes.post('/estabelecimentos', autenticacaoMiddleware, controller.inserir);
    routes.put('/estabelecimentos/:id', autenticacaoMiddleware, controller.atualizar);
    routes.patch('/estabelecimentos/:id/situacao', autenticacaoMiddleware, controller.atualizarSituacao);
    routes.patch('/estabelecimentos/:id/logo', autenticacaoMiddleware, controller.atualizarLogo);
    routes.delete('/estabelecimentos/:id', autenticacaoMiddleware, controller.excluir);
}