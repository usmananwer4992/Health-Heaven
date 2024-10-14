'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PermissionRoles.init({
    roleId:{type:DataTypes.BIGINT, required: true, allowNull: false},
    permissionId:{type:DataTypes.BIGINT, required: true, allowNull: false},
  }, {
    sequelize,
    modelName: 'PermissionRoles',
  });
  return PermissionRoles;
};