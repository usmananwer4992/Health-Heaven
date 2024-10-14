"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransferDrugs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransferDrugs.init(
    {
      name: { type: DataTypes.STRING },
      drugId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      transferId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      sigId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },

      amount: { type: DataTypes.INTEGER },
      refills: { type: DataTypes.INTEGER },
      originalDate: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "TransferDrugs",
    }
  );
  return TransferDrugs;
};
