const statuses = [
  { name: "Pending", createdAt: new Date(), updatedAt: new Date() },
  { name: "Awating ERX", createdAt: new Date(), updatedAt: new Date() },
  { name: "Order in Process", createdAt: new Date(), updatedAt: new Date() },
  { name: "Shipped", createdAt: new Date(), updatedAt: new Date() },
  {
    name: "Need more Information",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { name: "Invalid Order", createdAt: new Date(), updatedAt: new Date() },
  { name: "Order Cancelled", createdAt: new Date(), updatedAt: new Date() },
  { name: "Called", createdAt: new Date(), updatedAt: new Date() },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert the statuses into the TransferStatus table
    await queryInterface.bulkInsert("TransferStatus", statuses, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data when rolling back
    await queryInterface.bulkDelete("TransferStatus", null, {});
  },
};
