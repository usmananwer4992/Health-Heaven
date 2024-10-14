'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransferDrugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      drugId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Drugs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      transferId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Transfers",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      sigId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Sigs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      amount:{
        type: Sequelize.INTEGER
      },
      refills:{
        type: Sequelize.INTEGER
      },
      originalDate:{
        type: Sequelize.DATE
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
    await queryInterface.dropTable('TransferDrugs');
  }
};