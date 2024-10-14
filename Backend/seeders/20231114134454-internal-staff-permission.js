"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all available permissions from the Permissions table.
    const permissions = await queryInterface.sequelize.query(
      `SELECT id FROM "Permissions" where id not in (49,50,51,52);`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    // console.log({ permissions });
    if (permissions.length > 0) {
      // Create an array of permission IDs.
      const permissionIds = permissions.map((permission) => permission.id);
      // Define the roleId for the internal staff role (replace with the actual roleId).
      const internalStaffRoleId = 2;
      // Create an array of permission-role associations for the internal staff role.
      const permissionRoles = permissionIds.map((permissionId) => ({
        roleId: internalStaffRoleId,
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
    const internalStaffRoleId = 2; // Replace with the actual roleId for the internal staff role.
    const conditions = {
      roleId: internalStaffRoleId,
    };
    // Remove the associations from the PermissionRoles table.
    await queryInterface.bulkDelete("PermissionRoles", conditions);
  },
};
