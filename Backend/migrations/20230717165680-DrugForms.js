'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DrugForms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      softDeleted: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false, 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DrugForms');
  }
};