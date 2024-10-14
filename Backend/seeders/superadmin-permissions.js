"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all available permissions from the Permissions table.
    const permissions = await queryInterface.sequelize.query(
      'SELECT id FROM "Permissions"',
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (permissions.length > 0) {
      // Create an array of permission IDs.
      const permissionIds = permissions.map((permission) => permission.id);

      // Define the roleId for the superadmin role (replace with the actual roleId).
      const superadminRoleId = 1;

      // Create an array of permission-role associations for the superadmin role.
      const permissionRoles = permissionIds.map((permissionId) => ({
        roleId: superadminRoleId,
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
    const superadminRoleId = 1; // Replace with the actual roleId for the superadmin role.

    const conditions = {
      roleId: superadminRoleId,
    };

    // Remove the associations from the PermissionRoles table.
    await queryInterface.bulkDelete("PermissionRoles", conditions);
  },
};
