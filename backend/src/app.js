const express = require("express");
const cors = require("cors");

const routes = require("./routes");

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
  }
  routes() {
    this.server.use(cors());
    this.server.use(routes);
  }
}

module.exports = new App().server;
