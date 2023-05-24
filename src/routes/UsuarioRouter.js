
module.exports = (routes, controller, autenticacaoMiddleware) => {
    routes.get('/usuarios', autenticacaoMiddleware, controller.obterTodos);
    routes.get('/usuarios/:id', autenticacaoMiddleware, controller.obterUnico);
    routes.post('/usuarios', autenticacaoMiddleware, controller.inserir);
    routes.put('/usuarios/:id', autenticacaoMiddleware, controller.atualizar);
    routes.patch('/usuarios/:id', autenticacaoMiddleware, controller.atualizarSenha);
    routes.delete('/usuarios/:id', autenticacaoMiddleware, controller.excluir);
}