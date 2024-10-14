"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, allowNull: false, },
      phone: { type: DataTypes.STRING, allowNull: false,  },
      address: { type: DataTypes.STRING },
      secondaryAddress: { type: DataTypes.STRING, allowNull: true },
      city: { type: DataTypes.STRING, allowNull: true },
      stateId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      zipCode: { type: DataTypes.STRING, allowNull: true },
      partnerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      dob: { type: DataTypes.STRING },
      gender: {
        type: DataTypes.ENUM("male", "female", "others"),
        required: true,
        default: "male",
      },
      deletedAt: { type: DataTypes.DATE},
      isDeleted: { type: DataTypes.BOOLEAN },
      softDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      insuranceCardId:{ type: DataTypes.STRING, allowNull: true },
      insuranceRxBin:{ type: DataTypes.STRING, allowNull: true },
      insurancePcn:{ type: DataTypes.STRING, allowNull: true },
      insuranceRxGroup:{ type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "Customer",
    }
  );
  return Customer;
};
