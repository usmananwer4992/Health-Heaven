"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transfers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Customer",
          key: "id",
        },
        onDelete: "CASCADE",
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
      pharmacyId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Pharmacies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      sigId: {
        allowNull: true,
        type: Sequelize.BIGINT,
        references: {
          model: "Sigs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      transferStatusId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "TransferStatus",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      providerPhone: {
        type: Sequelize.STRING,
      },
      providerName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      transferDrugId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Drugs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      transferDayId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "TransferDays",
          key: "id",
        },
        onDelete: "SET NULL", // or your preferred onDelete action
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      refills: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transfers");
  },
};
