"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TransferDays extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  TransferDays.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TransferDays",
    }
  );

  return TransferDays;
};
