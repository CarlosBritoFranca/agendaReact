const { Contact } = require("../models");

class ContactController {
  async index(req, res) {
    const data = await Contact.findAll();
    return res.status(200).json(data);
  }
  async store(req, res) {
    const { main_email } = req.body;
    const existContact = await Contact.findOne({
      where: { main_email: main_email },
    });
    if (existContact) {
      return res.status(401).json({ error: "Contato já esta Cadastrado!!!" });
    }

    const contact = await Contact.create(req.body);
    return res.status(200).json(contact);
  }
  async show(req, res) {
    const id = req.params.id;
    const data = await Contact.findOne({ where: { id } });
    return res.status(200).json(data);
  }
  async update(req, res) {
    const id = req.params.id;
    const data = await Contact.findOne({ where: { id } });
    await data.update(req.body);
    return res.status(200).json(data);
  }
  async delete(req, res) {
    const id = req.params.id;
    const data = await Contact.findOne({ where: { id } });
    await data.destroy(data);
    return res.status(200).json({ message: "Contato deletado com sucesso!!!" });
  }
}

module.exports = new ContactController();
