"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the data to be seeded
    const data = [
      { id: 1, name: "Tablets", createdAt: new Date(), updatedAt: new Date() },
      {
        id: 2,
        name: "Capsule",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Powder",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Cream",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "Solution",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "Nasal Spray/Drop",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "Otic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "Others",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "Ointment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "Gel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "Lotion",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: "Foam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "Suspension",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "Shampoo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "Orally Dissolvable Tablets",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more data as needed
    ];

    // Insert the data into the "DrugForms" table
    await queryInterface.bulkInsert("DrugForms", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data from the "DrugForms" table
    await queryInterface.bulkDelete("DrugForms", null, {});
  },
};
