"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Partners", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      secondaryAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
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
        allowNull: true,
      },
      brandBox: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tier: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sandBoxKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      liveKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      softDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // partnerId: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },      
      deletedAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Partners");
  },
};
