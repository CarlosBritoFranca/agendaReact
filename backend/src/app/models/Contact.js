module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    name: DataTypes.STRING,
    main_email: DataTypes.STRING,
  });

  Contact.associate = (models) => {
    Contact.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Contact.hasMany(models.Phone, {
      foreignKey: "contact_id",
      as: "phones",
    });
    Contact.hasMany(models.Address, {
      foreignKey: "contact_id",
      as: "addresses",
    });
    Contact.belongsTo(models.File, {
      foreignKey: "avatar_id",
      key: "id",
    });
  };
  return Contact;
};
