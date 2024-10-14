"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the data to be seeded
    const data = [
      {
        id: 1,
        name: "OTC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "RX",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "Others",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more data as needed
    ];

    // Insert the data into the "DrugClasses" table
    await queryInterface.bulkInsert("DrugClasses", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data from the "DrugClasses" table
    await queryInterface.bulkDelete("DrugClasses", null, {});
  },
};
