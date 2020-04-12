const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        },
      },
    }
  );

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };
  User.associate = (models) => {
    User.belongsTo(models.File, {
      foreignKey: "avatar_id",
      as: "avatar",
    });
    User.hasMany(models.Contact, {
      as: "contacts",
      foreignKey: "user_id",
    });
  };

  return User;
};
