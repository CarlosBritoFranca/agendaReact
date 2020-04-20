const { Address, Contact } = require("../models");

class AddressController {
  async index(req, res) {
    const { contact_id } = req.params;

    const address = await Address.findAll({
      where: {
        contact_id,
      },
    });

    return res.status(200).json(address);
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
    const { contact_id, id } = req.params;
    const address = await Address.findOne({
      where: {
        contact_id,
        id,
      },
    });
    if (!address) {
      return res.status(401).json({ error: "Endereço não encontrado" });
    }
    return res.status(200).json(address);
  }
  async update(req, res) {
    const { contact_id, id } = req.params;
    const address = await Address.findOne({
      where: {
        contact_id,
        id,
      },
    });

    const newAddress = await address.update(req.body);

    return res.status(200).json(newAddress);
  }
  async delete(req, res) {
    const { contact_id } = req.params;
    const { id } = req.params;
    const address = await Address.findOne({
      where: {
        contact_id,
        id,
      },
    });
    await address.destroy();
    return res.status(200).json({ message: "Edereço excluido com sucesso!!!" });
  }
}

module.exports = new AddressController();
