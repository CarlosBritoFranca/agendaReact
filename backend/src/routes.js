const multer = require("multer");
const multerConfig = require("./config/multer");
const { Router } = require("express");
const routes = new Router();

const upload = multer(multerConfig);

const authMiddleware = require("./app/middleware/auth");

const UserController = require("./app/controller/UserController");
const SessionController = require("./app/controller/SessionController");
const FileController = require("./app/controller/FileController");
const ContactController = require("./app/controller/ContactController");
const PhoneController = require("./app/controller/PhoneControler");
const AddressController = require("./app/controller/AddressController");

//Rotas da aplicação

routes.post("/sessions", SessionController.store);
//Rotas de usuarios
routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.use(authMiddleware); //Middleware de criação da sessão do usuario

routes.put("/users", UserController.update);
routes.delete("/users", UserController.delte);
//Rota de criação de avatar
routes.post("/files", upload.single("file"), FileController.store);

//Rotas de Contatos
routes.get("/contacts", ContactController.index);
routes.post("/contacts", ContactController.store);
routes.get("/contacts/show/:id", ContactController.show);
routes.put("/contacts/:id", ContactController.update);
routes.delete("/contacts/:id", ContactController.delete);

//Rotas de Telefones do contato
routes.get("/contacts/:contact_id/phones", PhoneController.index);
routes.post("/contacts/:contact_id/phones", PhoneController.store);
routes.get("/contacts/:contact_id/show/:id", PhoneController.show);
routes.put("/contacts/:contact_id/phones/:id", PhoneController.update);
routes.delete("/contacts/:contact_id/phones/:id", PhoneController.delete);

//Rota de Endereços
routes.get("/contacts/:contact_id/address", AddressController.index);
routes.post("/contacts/:contact_id/address", AddressController.store);
routes.put("/contacts/:contact_id/address/:id", AddressController.update);
routes.delete("/contacts/:contact_id/address/:id", AddressController.delete);

module.exports = routes;
