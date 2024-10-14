"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transfers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transfers.init(
    {
      name: { type: DataTypes.STRING },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Customer",
          key: "id",
        },
      },
      partnerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      pharmacyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
      },
      transferDrugId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Drugs",
          key: "id",
        },
      },
      sigId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
      },
      transferDayId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
      },
      transferStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
      },
      providerName: { type: DataTypes.STRING, allowNull: true },
      notes: { type: DataTypes.STRING, allowNull: true },
      providerPhone: { type: DataTypes.STRING, allowNull: true },
      quantity: { type: DataTypes.STRING, allowNull: true },
      refills: { type: DataTypes.STRING, allowNull: true },

    },
    {
      sequelize,
      modelName: "Transfers",
    }
  );
  return Transfers;
};
