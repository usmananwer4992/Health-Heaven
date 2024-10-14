"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Partners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here  
    }
  }

  Partners.init(
    {
      name: { type: DataTypes.STRING },
      website: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING, allowNull: true },
      secondaryAddress: { type: DataTypes.STRING, allowNull: true },
      city: { type: DataTypes.STRING, allowNull: true },
      stateId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        onDelete: "CASCADE",
      },
      zipCode: { type: DataTypes.STRING, allowNull: true },
      brandBox: { type: DataTypes.STRING, allowNull: true },
      tier: { type: DataTypes.STRING, allowNull: true },
      sandBoxKey: { type: DataTypes.STRING, allowNull: true },
      liveKey: { type: DataTypes.STRING, allowNull: true },
      softDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Partners",
      paranoid: true,
    }
  );

  Partners.prototype.softDelete = function () {
    return this.update({ deletedAt: new Date(), softDeleted:true});
  };

  return Partners;
};
