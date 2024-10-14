'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PermissionRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permissionId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Permissions",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false
      },

      roleId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Roles",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PermissionRoles');
  }
}
