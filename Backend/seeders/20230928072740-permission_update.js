"use strict";
const permissionsToSeed = [
  "partners",
  "users",
  "transfers",
  "pharmacy",
  "customers",
  "drugs",
  "drug_category",
  "drug_form",
  "drug_class",
  "drug_type",
  "age_groups",
  "access_manager",
  "orders",
  "sigs",
  "partner_user",
  "order_admin"
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const entity of permissionsToSeed) {
        const permissionName = `read_${entity}`;

        const [existingPermission] = await queryInterface.sequelize.query(
          `SELECT * FROM "Permissions" WHERE name = '${permissionName}' LIMIT 1`
        );

        if (!existingPermission.length) {
          const permissions = [
            {
              name: `read_${entity}`,
              slug: `READ_${entity.toUpperCase()}`,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              name: `write_${entity}`,
              slug: `WRITE_${entity.toUpperCase()}`,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              name: `update_${entity}`,
              slug: `UPDATE_${entity.toUpperCase()}`,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              name: `delete_${entity}`,
              slug: `DELETE_${entity.toUpperCase()}`,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];
          await queryInterface.bulkInsert("Permissions", permissions);
        } else {
          console.log(`Permission already exists: ${permissionName}`);
        }
      }
      const extraPermissions = [
        {
          name: `export_orders`,
          slug: `EXPORT_ORDERS`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await queryInterface.bulkInsert("Permissions", extraPermissions);
    } catch (error) {
      console.error("Error seeding permissions:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
