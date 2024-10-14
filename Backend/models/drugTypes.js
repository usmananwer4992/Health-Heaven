"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DrugTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DrugTypes.init(
    {
      name: { type: DataTypes.STRING ,unique: true},
      softDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "DrugTypes",
    }
  );
  return DrugTypes;
};
