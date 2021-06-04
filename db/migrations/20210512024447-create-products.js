"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("products", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      rgb: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
        allowNull: false,
      },
      category: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON),
      },
      seller: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
      },
      curr_total_sells: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
      },
      curr_total_visits: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
      },
      conversion_rate: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
      },
      is_buy_box: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      catalogue_id: {
        type: Sequelize.DataTypes.TEXT,
      },
      ml_id: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("products");
  },
};
