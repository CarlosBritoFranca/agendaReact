module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    name: DataTypes.STRING,
    main_email: DataTypes.STRING,
  });
  return Contact;
};
