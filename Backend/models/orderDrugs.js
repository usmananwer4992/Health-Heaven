"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDrugs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDrugs.init(
    {
      quantity: { type: DataTypes.INTEGER} ,
      isRefill: { type: DataTypes.BOOLEAN },
      drugId: { type: DataTypes.BIGINT, allowNull: false, onDelete:"CASCADE" },
    },
    {
      sequelize,
      modelName: "OrderDrugs",
    }
  );
  return OrderDrugs;
};
