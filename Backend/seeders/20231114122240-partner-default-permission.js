"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all available permissions from the Permissions table.
    // Transfer 13, 14,15
    // Order 53,54,55
    // Sigs 57
    // Customer 21,22
    // Drugs 25
    // Drug type 41
    // Category 29
    // Form 33
    // Class 37
    // Age Group 45
    // Pharmacy 17
    const permissions = await queryInterface.sequelize.query(
      `SELECT id FROM "Permissions" where id in (13, 14,15,53,54,55,57,21,22,25,41,29,33,37,45,17,61);`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    // console.log({ permissions });
    if (permissions.length > 0) {
      // Create an array of permission IDs.
      const permissionIds = permissions.map((permission) => permission.id);
      // Define the roleId for the partner role (replace with the actual roleId).
      const partnerRoleId = 3;
      // Create an array of permission-role associations for the partner role.
      const permissionRoles = permissionIds.map((permissionId) => ({
        roleId: partnerRoleId,
        permissionId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      // Insert the associations into the PermissionRoles table.
      await queryInterface.bulkInsert("PermissionRoles", permissionRoles, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Define the conditions to undo the seeding (e.g., remove the associations).
    const partnerRoleId = 3; // Replace with the actual roleId for the partner role.
    const conditions = {
      roleId: partnerRoleId,
    };
    // Remove the associations from the PermissionRoles table.
    await queryInterface.bulkDelete("PermissionRoles", conditions);
  },
};
