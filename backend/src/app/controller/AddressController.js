const { Address, Contact } = require("../models");

class AddressController {
  async index(req, res) {
    return res.status(200).json({ ok: true });
  }
  async store(req, res) {
    const { contact_id } = req.params;
    console.log(contact_id);
    const {
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city,
      uf,
      type,
    } = req.body;
    const contact = await Contact.findByPk(contact_id);
    if (!contact) {
      return res.status(401).json({ error: "Contato não cadastrado !!!" });
    }

    const address = await Address.create({
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city,
      uf,
      type,
      contact_id,
    });

    return res.status(200).json(address);
  }
  async show(req, res) {
    return res.status(200).json({ ok: true });
  }
  async update(req, res) {
    const { contact_id } = req.params;

    const contact = await Contact.findByPk(contact_id, {
      include: { association: "addresses" },
    });
    if (!contact) {
      return res.status(401).json({ error: "Contato não cadastrado !!!" });
    }

    return res.status(200).json({ ok: true });
  }
  async delete(req, res) {
    return res.status(200).json({ ok: true });
  }
}

module.exports = new AddressController();
