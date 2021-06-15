const uuid = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const SaleRecord = sequelize.define(
    "SaleRecord",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      total_sells: {
        type: DataTypes.INTEGER,
      },
      total_visits: {
        type: DataTypes.INTEGER,
      },
      daily_sells: {
        type: DataTypes.INTEGER,
      },
      daily_visits: {
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: "products",
          },
          key: "id",
        },
      },
    },
    {
      tableName: "sales_records",
      timestamps: true,
      updatedAt: false,
      createdAt: "timestamp",
    }
  );

  SaleRecord.beforeCreate((user) => (user.id = uuid()));

  SaleRecord.associate = function (models) {
    SaleRecord.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return SaleRecord;
};
