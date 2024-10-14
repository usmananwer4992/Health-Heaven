"use strict";

const days = ["0", "90", "30", "60", "100", "15"];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transferDays = days.map(async (day) => {
      const existingDay = await queryInterface.rawSelect(
        "TransferDays",
        {
          where: { name: day },
        },
        ["id"]
      );

      if (!existingDay) {
        return {
          name: day,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }

      return null; // Skip inserting if the day already exists
    });

    const validTransferDays = (await Promise.all(transferDays)).filter(
      (day) => day !== null
    );

    if (validTransferDays.length > 0) {
      await queryInterface.bulkInsert("TransferDays", validTransferDays);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("TransferDays", null, {});
  },
};
