"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sigsData = require("../json/sigs.json"); // Replace with the correct path to your JSON options file
    const sigs = sigsData.sigs.map(async (option) => {
      const existingSig = await queryInterface.rawSelect(
        "Sigs",
        {
          where: { name: option },
        },
        ["id"]
      );

      if (!existingSig) {
        return {
          name: option,
          softDelete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }

      return null; // Skip inserting if the option already exists
    });

    const validSigs = (await Promise.all(sigs)).filter((sig) => sig !== null);

    if (validSigs.length > 0) {
      await queryInterface.bulkInsert("Sigs", validSigs);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Sigs", null, {});
  },
};
