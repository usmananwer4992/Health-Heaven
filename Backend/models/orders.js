"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init(
    {
      isLive: { type: DataTypes.BOOLEAN },
      customerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      orderDrugId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      totalAmount: { type: DataTypes.STRING, allowNull: true },
      isRefill: { type: DataTypes.BOOLEAN },

      shippingId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      totalAmount: { type: DataTypes.STRING, allowNull: true },
      shippingName: { type: DataTypes.STRING, allowNull: true },
      shippingAddress: { type: DataTypes.STRING },
      shippingCity: { type: DataTypes.STRING, allowNull: true },
      shippingStreet: { type: DataTypes.STRING, allowNull: true },
      shippingAppartment: { type: DataTypes.STRING, allowNull: true },
      shippingStateId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      shippingZipCode: { type: DataTypes.STRING, allowNull: true },
      notes: { type: DataTypes.STRING, allowNull: true },
      quantity: { type: DataTypes.STRING, allowNull: true },
      partnerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      preName: { type: DataTypes.STRING, allowNull: true },
      prePhone: { type: DataTypes.STRING, allowNull: true },
      preAddress: { type: DataTypes.STRING, allowNull: true },
      preNpiNumber: { type: DataTypes.STRING, allowNull: true },
      preSupervisior: { type: DataTypes.STRING, allowNull: true },
      daySupply: { type: DataTypes.INTEGER, allowNull: true },
      refills: { type: DataTypes.INTEGER, allowNull: true },
      pre_state: { type: DataTypes.STRING, allowNull: true },
      invoice_link: { type: DataTypes.STRING, allowNull: true },
      activation_code: { type: DataTypes.STRING, allowNull: true },
      statusId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      sigId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        onDelete: "CASCADE",
      },
      erxRequired: { type: DataTypes.BOOLEAN },
      trackingId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        onDelete: "CASCADE",
      },
      // userId: {
      //   type: DataTypes.BIGINT,
      //   allowNull: false,
      //   onDelete: "CASCADE",
      // },
      relatedId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        onDelete: "CASCADE",
      },
      coPay: { type: DataTypes.STRING, allowNull: true },
      shippedAt: { type: DataTypes.STRING, allowNull: true },
      physicianName: { type: DataTypes.STRING, allowNull: true },
      physicianCity: { type: DataTypes.STRING, allowNull: true },
      physicianPhone: { type: DataTypes.STRING, allowNull: true },
      firstCheckbox: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue:false },
      secondCheckbox: { type: DataTypes.BOOLEAN, allowNull: true,defaultValue:false},
      thirdCheckbox: { type: DataTypes.BOOLEAN, allowNull: true ,defaultValue:false},
      physicianStateId:{
        type: DataTypes.BIGINT,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "States",
          key: "id",
        },
      }
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
