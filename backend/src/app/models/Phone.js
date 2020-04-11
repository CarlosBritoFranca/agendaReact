module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define("Phone", {
    phones: DataTypes.STRING,
    type: DataTypes.STRING,
  });
  Phone.associate = (models) => {
    Phone.belongsTo(models.Contact, {
      foreignKey: "contact_id",
      as: "phone",
    });
  };

  return Phone;
};
