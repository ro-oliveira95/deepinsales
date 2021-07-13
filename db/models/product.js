const { v4: uuid } = require("uuid");
const { User, SalesRecord } = require("./");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rgb: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      category: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      seller: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      curr_total_sells: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      curr_total_visits: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      conversion_rate: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      is_buy_box: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      catalogue_id: {
        type: DataTypes.TEXT,
      },
      ml_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        allowNull: false,
      },
    },
    { tableName: "products" }
  );

  Product.beforeCreate((product) => (product.id = uuid()));

  Product.associate = function (models) {
    Product.belongsTo(models.User, { foreignKey: "user_id" });
    Product.hasMany(models.SaleRecord, {
      foreignKey: "product_id",
      as: "records",
    });
  };

  return Product;
};
