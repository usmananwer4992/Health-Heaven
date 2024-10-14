"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Drugs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      label: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ndc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dosage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      drugFormId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "DrugForms",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      drugCategoryId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "DrugCategories",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      drugClassId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "DrugClasses",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      drugTypeId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "DrugTypes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      ageGroupId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "AgeGroups",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      refillable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      refillLimit: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      tierOne: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      tierTwo: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      tierThree: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      tierFour: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      tierFive: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      erxRequired: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      minQuantity: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      maxQuantity: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      quantityAllowed: {
        type: Sequelize.BIGINT,
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
      softDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Drugs");
  },
};
