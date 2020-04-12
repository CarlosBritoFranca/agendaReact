const { Contact, User } = require("../models");
const Yup = require("yup");

class ContactController {
  async index(req, res) {
    const user_id = req.userId;
    const data = await Contact.findAll({
      where: {
        user_id,
      },
      // include: [
      //   {
      //     association: "contacts",
      //   },
      //   {
      //     association: "addresses",
      //   },
      // ],
    });

    return res.status(200).json(data);
  }

  async store(req, res) {
    //Validação de dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      main_email: Yup.string().email().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "A validação dos dados falhou !!!" });
    }
    const user_id = req.userId;
    const { main_email, name } = req.body;
    const existContact = await Contact.findOne({
      where: { main_email: main_email },
    });
    if (existContact) {
      return res.status(401).json({ error: "Contato já esta Cadastrado!!!" });
    }
    const data = { name, main_email, user_id };

    const contact = await Contact.create(data);
    return res.status(200).json(contact);
  }

  async show(req, res) {
    const id = req.params.id;

    const data = await Contact.findOne({
      where: {
        id,
      },
      include: [
        {
          association: "contacts",
        },
        {
          association: "addresses",
        },
      ],
    });
    if (!data) {
      return res.status(401).json({ error: "Contato não cadastrado" });
    }
    return res.status(200).json(data);
  }

  async update(req, res) {
    //Validação de dados
    const schema = yup.object().shape({
      name: yup.string(),
      main_mail: yup.string().email(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "A validação dos dados Falhou!!!" });
    }
    const user_id = req.userId;
    const id = req.params.id;

    const data = await Contact.findOne({
      where: {
        id,
        user_id,
      },
    });
    if (!data) {
      return res.status(401).json({ error: "Contato não encontrado!!!" });
    }

    const contact = await data.update(req.body);
    return res.status(200).json(contact);
  }

  async delete(req, res) {
    const user_id = req.userId;
    const id = req.params.id;
    const data = await Contact.findOne({
      where: {
        id,
        user_id,
      },
    });
    if (!data) {
      return res.status(401).json({ error: "Contato não encontrado!!!" });
    }
    await data.destroy(data);
    return res.status(200).json({ message: "Contato deletado com sucesso!!!" });
  }
}

module.exports = new ContactController();
