"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pharmacies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pharmacies.init(
    {
      name: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Pharmacies",
      tableName: "Pharmacies",
    }
  );
  return Pharmacies;
};
