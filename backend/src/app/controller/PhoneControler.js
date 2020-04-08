const { Phone } = require("../models");
class PhoneController {
  async index(req, res) {
    return res.status(200).json({ ok: true });
  }
  async store(req, res) {
    return res.status(200).json({ ok: true });
  }
  async show(req, res) {
    return res.status(200).json({ ok: true });
  }
  async update(req, res) {
    return res.status(200).json({ ok: true });
  }
  async delete(req, res) {
    return res.status(200).json({ ok: true });
  }
}
module.exports = new PhoneController();
