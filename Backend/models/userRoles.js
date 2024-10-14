"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRoles.init(
    {
      userId: {
        type: DataTypes.BIGINT,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      roleId: {
        type: DataTypes.BIGINT,
        references: {
          model: "Roles",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserRoles",
    }
  );
  return UserRoles;
};
