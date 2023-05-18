module.exports = (routes, controller) => {
    routes.get('/usuarios', controller.obterTodos);
    routes.get('/usuarios/:id', controller.obterUnico);
    routes.post('/usuarios', controller.inserir);
    routes.put('/usuarios/:id', controller.atualizar);
    routes.delete('/usuarios/:id', controller.excluir);
}