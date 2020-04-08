module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define("Phone", {
    phone: DataTypes.STRING,
  });
  return Phone;
};
