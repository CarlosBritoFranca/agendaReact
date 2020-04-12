const Yup = require("yup");
const { User } = require("../models");

const Mail = require("../../lib/Mail");

class UserController {
  //Listar Usuarios
  async index(req, res) {
    const user = await User.findAll();
    return res.status(200).json(user);
  }
  //Salvar usuario
  async store(req, res) {
    //Validação de dados com Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "A validação dos dados falhou !!!" });
    }
    const { name, email, password } = req.body; //pega o email do corpo da requisição
    //verifica se o email já esta cadastrados
    const userExist = await User.findOne({
      where: {
        email: email,
      },
    });
    if (userExist) {
      return res.status(400).json({ error: "E-mail já cadastrado !!!" });
    }
    const user = await User.create(req.body);

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: "Agenda criada",
      template: "create",
      context: {
        name: name,
        email: email,
        password: password,
      },
    });

    return res.status(200).json(user);
  }
  //Mostrar 1 usuario
  async show(req, res) {
    return res.status(200).json({ ok: true });
  }
  //Atualizar usuario
  async update(req, res) {
    //Validação de dados com Yup
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "A validação dos dados falhou !!!" });
    }
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });
      if (userExist) {
        return res.status(400).json({ error: "E-mail já cadastrado !!!" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Password não confere!!!" });
    }

    const new_user = await user.update(req.body);

    return res.status(200).json(new_user);
  }
  //Deeletar usuario
  async delte(req, res) {
    return res.status(200).json({ ok: true });
  }
}

module.exports = new UserController();
