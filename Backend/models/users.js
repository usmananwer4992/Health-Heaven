"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Partners, {
        foreignKey: "partnerId",
        onDelete: "CASCADE", // This enables cascade delete
      });
    }
  }
  Users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: { type: DataTypes.BIGINT, required: true, allowNull: false },
      partnerId: { type: DataTypes.BIGINT, required: true, allowNull: true },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      softDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      paranoid: true,
    }
  );

  Users.prototype.softDelete = function () {
    return this.update({ deletedAt: new Date(), softDeleted: true });
  };

  return Users;
};
