"use strict";
const { v4: uuid } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        id: uuid(),
        name: "31",
        rgb: [20, 100, 70],
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: "1a95e9dc-482e-4727-8e08-a622773a4b42",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
