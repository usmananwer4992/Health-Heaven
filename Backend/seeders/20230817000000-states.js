"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const statesData = require("../json/state.json");
    const states = statesData.states.map(async (state) => {
      const existingState = await queryInterface.rawSelect(
        "States",
        {
          where: { name: state.name },
        },
        ["id"]
      );

      if (!existingState) {
        return {
          name: state.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }

      return null; // Skip inserting if the state already exists
    });

    const validStates = (await Promise.all(states)).filter(
      (state) => state !== null
    );

    if (validStates.length > 0) {
      await queryInterface.bulkInsert("States", validStates);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("States", null, {});
  },
};
