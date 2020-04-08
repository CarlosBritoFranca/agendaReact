"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("addresses", "type", Sequelize.STRING, {
      after: "id",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("addresses", "type");
  },
};
