"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const ageGroupsData = createAgeGroupsData();
      await queryInterface.bulkInsert("AgeGroups", ageGroupsData, {});
      console.log("Seed data successfully created for AgeGroups.");
    } catch (error) {
      console.error("Error seeding data for AgeGroups:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete("AgeGroups", null, {});
      console.log("Seed data for AgeGroups successfully deleted.");
    } catch (error) {
      console.error("Error deleting seed data for AgeGroups:", error);
    }
  },
};

function createAgeGroupsData() {
  return [
    { name: "Adults", createdAt: new Date(), updatedAt: new Date() },
    { name: "Pediatrics Only", createdAt: new Date(), updatedAt: new Date() },
    { name: "Men's Health", createdAt: new Date(), updatedAt: new Date() },
    { name: "Women's Health", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "For Both Males & Females",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more age groups as needed
  ];
}
