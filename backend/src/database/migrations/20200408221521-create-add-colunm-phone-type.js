"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("phones", "type", Sequelize.STRING, {
      after: "id",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("phones", "type");
  },
};
