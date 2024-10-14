"use strict";

const status = [
  "Pending",
  "Awating ERX",
  "Order in Process",
  "Shipped",
  "Need more Information",
  "Invalid Order",
  "Order Cancelled",
  "Called",
  "Awaiting Prescription"
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "OrderStatuses",
      status.map((status) => ({
        name: status,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderStatuses', null, {});

  },
};
