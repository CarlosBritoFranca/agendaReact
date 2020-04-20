const cep = require("cep-promise");

class CepAddress {
  show(req, res) {
    const zipcode = 14409109;

    cep(zipcode)
      .then((response) => {
        return res.json(response);
      })
      .catch((error) => {
        return res.json(error.errors[0].message);
      });
  }
}

module.exports = new CepAddress();
