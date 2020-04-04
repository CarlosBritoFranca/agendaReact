const { User } = require("../models");

class UserController {
  async index(req, res) {
    const user = await User.findAll();
    return res.status(200).json(user);
  }
  async store(req, res) {
    const { email } = req.body; //pega o email do corpo da requisição
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
    return res.status(200).json(user);
  }
  async show(req, res) {
    return res.status(200).json({ ok: true });
  }
  async update(req, res) {
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
  async delte(req, res) {
    return res.status(200).json({ ok: true });
  }
}

module.exports = new UserController();
