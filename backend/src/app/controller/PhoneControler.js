const { Phone, Contact } = require("../models");
const yup = require("yup");
class PhoneController {
  async index(req, res) {
    const { contact_id } = req.params;

    const phones = await Phone.findAll({
      where: {
        contact_id,
      },
    });

    return res.status(200).json(phones);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      type: yup.string().required(),
      phones: yup.string().required().min(10),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "A validação dos dados falhou !!!" });
    }
    const { contact_id } = req.params;
    const contact = await Contact.findOne({
      where: {
        id: contact_id,
      },
    });
    if (!contact) {
      return res.status(401).json({ error: "Contato não encontrado!!!" });
    }
    const { type, phones } = req.body;

    await Phone.create({
      type,
      phones,
      contact_id,
    });

    return res.status(200).json({
      type,
      phones,
      contact_id,
    });
  }
  async show(req, res) {
    return res.status(200).json({ ok: true });
  }
  async update(req, res) {
    const schema = yup.object().shape({
      type: yup.string(),
      phones: yup.string().min(10),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "A validação dos dados falhou !!!" });
    }
    const { contact_id } = req.params;
    const { id } = req.params;

    const phones = await Phone.findOne({
      where: {
        contact_id,
        id,
      },
    });

    const data = await phones.update(req.body);
    return res.status(200).json(data);
  }
  async delete(req, res) {
    const { contact_id } = req.params;
    const { id } = req.params;

    const phones = await Phone.findOne({
      where: {
        contact_id,
        id,
      },
    });
    if (!phones) {
      return res.status(401).json({ error: "Contato não cadastrado" });
    }

    await phones.destroy();

    return res
      .status(200)
      .json({ message: "Contato excluido com sucesso!!!!" });
  }
}
module.exports = new PhoneController();
