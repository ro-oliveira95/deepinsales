const { v4: uuid } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rgb: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
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
    { tableName: "categories" }
  );

  Category.beforeCreate((category) => (category.id = uuid()));

  Category.associate = function (models) {
    Category.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Category;
};
