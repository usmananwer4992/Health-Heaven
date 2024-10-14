'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shippings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },

      shippingCompany: {
        type: Sequelize.STRING,
      },

      partnerId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Partners",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable('Shippings');
  }
};