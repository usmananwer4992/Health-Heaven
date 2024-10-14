"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the data to be seeded
    const data = [
      {
        id: 1,
        name: "Blood Thinner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Allergies",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "Anti-Inflammatory",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "Anti-Microbial",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "Bone Health",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        name: "Cholesterol",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        name: "Diabetes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        name: "Digestion/Reflux/Nausea",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        name: "General Health",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        name: "Gout",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        name: "Heart Health/BP",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        name: "Men's Health",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        name: "Mental Health",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        name: "Opthalmic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        name: "Pain/Arthritis",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        name: "Thyroid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        name: "Topic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        name: "Women's Health",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        name: "Migraine",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        name: "Others",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more data as needed
    ];

    // Insert the data into the "DrugCategories" table
    await queryInterface.bulkInsert("DrugCategories", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data from the "DrugCategories" table
    await queryInterface.bulkDelete("DrugCategories", null, {});
  },
};
