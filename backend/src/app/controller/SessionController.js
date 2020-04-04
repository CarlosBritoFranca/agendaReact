const jwt = require("jsonwebtoken");

const { User } = require("../models");

const authConfig = require("../../config/auth");

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Usuario não Cadastrado" });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Senha não confere!!!" });
    }
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
module.exports = new SessionControler();
