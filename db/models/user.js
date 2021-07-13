const { v4: uuid } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { tableName: "users" }
  );

  User.beforeCreate((user) => (user.id = uuid()));

  User.associate = function (models) {
    User.hasMany(models.Product, { foreignKey: "user_id" });
  };

  return User;
};
