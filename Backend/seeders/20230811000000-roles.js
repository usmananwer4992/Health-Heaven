"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert("Roles", [
      {
        name: 'Super Administrator',
        slug: 'SUPER-ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Internal Staff',
        slug: 'STAFF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Standard Partner',
        slug: 'PARTNER',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
