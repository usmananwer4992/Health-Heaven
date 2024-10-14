"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("DrugTypes", [
      {
        id:1,
        name: "Oral",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:5,
        name: "Rectal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:6,
        name: "Intravenous",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:7,
        name: "Others",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:8,
        name: "Topical",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("DrugTypes", null, {});
  },
};
