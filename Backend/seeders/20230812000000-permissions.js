"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Permissions", [
      {
        name: "read",
        slug: "READ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "write",
        slug: "WRITE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "update",
        slug: "UPDATE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "delete",
        slug: "DELETE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
