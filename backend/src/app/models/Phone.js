module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define("Phone", {
    phone: DataTypes.STRING,
    type: DataTypes.STRING,
  });

  Phone.associate = (models) => {
    Phone.belongsTo(models.Contact, {
      foreignKey: "contact_id",
      as: "phone_contact",
    });
  };
  return Phone;
};
