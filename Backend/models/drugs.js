"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drugs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Drugs.init(
    {
      name: { type: DataTypes.STRING },
      label: { type: DataTypes.STRING },
      price: { type: DataTypes.STRING },
      quantity: { type: DataTypes.STRING, allowNull: true },
      ndc: { type: DataTypes.STRING, allowNull: true },
      dosage: { type: DataTypes.STRING, allowNull: true },
      drugFormId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      drugCategoryId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      drugClassId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      drugTypeId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      ageGroupId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      refillable: { type: DataTypes.BOOLEAN, allowNull: false },
      refillLimit: { type: DataTypes.BIGINT, allowNull: true },
      tierOne: { type: DataTypes.BIGINT, allowNull: true },
      tierTwo: { type: DataTypes.BIGINT, allowNull: true },
      tierThree: { type: DataTypes.BIGINT, allowNull: true },
      tierFour: { type: DataTypes.BIGINT, allowNull: true },
      tierFive: { type: DataTypes.BIGINT, allowNull: true },
      erxRequired: { type: DataTypes.BIGINT, allowNull: true },
      active: { type: DataTypes.BOOLEAN, allowNull: true },
      minQuantity: { type: DataTypes.BIGINT, allowNull: true },
      maxQuantity: { type: DataTypes.BIGINT, allowNull: true },
      quantityAllowed: { type: DataTypes.BIGINT, allowNull: true },
      softDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Drugs",
    }
  );
  return Drugs;
};
