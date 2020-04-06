const multer = require("multer");
const multerConfig = require("./config/multer");
const { Router } = require("express");
const routes = new Router();

const upload = multer(multerConfig);

const authMiddleware = require("./app/middleware/auth");

const UserController = require("./app/controller/UserController");
const SessionController = require("./app/controller/SessionController");
const FileController = require("./app/controller/FileController");

//Rotas da aplicação

routes.post("/sessions", SessionController.store);

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);
routes.delete("/users", UserController.delte);

routes.post("/files", upload.single("file"), FileController.store);

module.exports = routes;
