const { File } = require("../models");

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });

    return res.status(200).json(file);
  }
}

module.exports = new FileController();
