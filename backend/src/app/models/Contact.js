module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    name: DataTypes.STRING,
    main_email: DataTypes.STRING,
  });

  Contact.associate = (models) => {
    Contact.hasMany(models.Address, {
      foreignKey: "contact_id",
      as: "addresses",
    });
    Contact.associate = (models) => {
      Contact.hasMany(models.Phone, {
        foreignKey: "contact_id",
        as: "contact_phone",
      });
    };
  };
  return Contact;
};
