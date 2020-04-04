const { Router } = require("express");
const routes = new Router();

const authMiddleware = require("./app/middleware/auth");

const UserController = require("./app/controller/UserController");
const SessionController = require("./app/controller/SessionController");

//Rotas da aplicação

routes.post("/sessions", SessionController.store);

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);
routes.delete("/users", UserController.delte);

module.exports = routes;
