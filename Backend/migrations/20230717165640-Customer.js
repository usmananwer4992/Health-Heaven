'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        // uinque: true,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        // uinque: true,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
      },
      secondaryAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      stateId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "States",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: true
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
      dob: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM("male", "female","others"),
        default: "male"
      },
      isDeleted:{
        type: Sequelize.BOOLEAN
      },

      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
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
    await queryInterface.dropTable('Customer');
  }
};