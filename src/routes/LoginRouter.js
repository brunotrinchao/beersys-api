module.exports = (routes, controller, autenticacaoMiddleware) => {
  routes.post("/login", controller.login);
  routes.get("/verify-token", controller.verifyToken);
};
