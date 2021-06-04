"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sales_records", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      total_sells: {
        type: Sequelize.DataTypes.INTEGER,
      },
      total_visits: {
        type: Sequelize.DataTypes.INTEGER,
      },
      daily_sells: {
        type: Sequelize.DataTypes.INTEGER,
      },
      daily_visits: {
        type: Sequelize.DataTypes.INTEGER,
      },
      product_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: "products",
          },
          key: "id",
        },
      },
      timestamp: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sales_records");
  },
};
