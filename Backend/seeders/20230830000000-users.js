"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const email1 = "nextgen.super-admin@healthhavenrx.com";
    const email2 = "nextgen.partner@healthhavenrx.com";
    const email3 = "nextgen.staff@healthhavenrx.com";

    // Check if the email addresses already exist in the "Users" table
    const [existingUser1, existingUser2] = await Promise.all([
      queryInterface.rawSelect(
        "Users",
        {
          where: { email: email1 },
        },
        ["id"]
      ),
      queryInterface.rawSelect(
        "Users",
        {
          where: { email: email2 },
        },
        ["id"]
      ),
      queryInterface.rawSelect(
        "Users",
        {
          where: { email: email3 },
        },
        ["id"]
      ),
    ]);

    // Insert users only if the email addresses do not exist
    if (!existingUser1 && !existingUser2) {
      const hashedPasswordAdmin = await bcrypt.hash("JrUW62Ts0", 10);
      const hashedPasswordPartner = await bcrypt.hash("H9y97Q9", 10);
      const hashedPasswordStaff = await bcrypt.hash("H9y97Q9", 10);

      await queryInterface.bulkInsert("Users", [
        {
          email: email1,
          password: hashedPasswordAdmin,
          roleId: 1,
          partnerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: email2,
          password: hashedPasswordPartner,
          roleId: 3,
          partnerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: email3,
          password: hashedPasswordStaff,
          roleId: 2,
          partnerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
