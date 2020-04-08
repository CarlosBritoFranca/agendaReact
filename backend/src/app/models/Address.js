module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    zipcode: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    complement: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    city: DataTypes.STRING,
    uf: DataTypes.STRING,
  });
  return Address;
};
