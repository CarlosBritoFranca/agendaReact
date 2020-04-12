module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define("File", {
    name: DataTypes.STRING,
    path: DataTypes.STRING,
  });

  return File;
};
