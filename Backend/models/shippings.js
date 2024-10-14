"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shippings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shippings.init(
    {
      type: { type: DataTypes.STRING },
      price: { type: DataTypes.STRING },
      shippingCompany: { type: DataTypes.STRING },
      partnerId: {
        type: DataTypes.BIGINT,
        required: true,
        allowNull: false,
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Shippings",
    }
  );
  return Shippings;
};
