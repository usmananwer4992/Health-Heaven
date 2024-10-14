const { v4: uuidv4 } = require("uuid");

("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert Partner records
    await queryInterface.bulkInsert("Partners", [
      {
        name: "Partner 1",
        website: "https://partner1.com",
        address: "123 Main St",
        city: "City 1",
        stateId: 1,
        zipCode: "12345",
        brandBox: "0",
        tier: "tier_one",
        sandBoxKey: uuidv4(), // Generate UUID for sandboxKey
        liveKey: uuidv4(), // Generate UUID for liveKey
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Partner 2",
        website: "https://partner2.com",
        address: "456 Elm St",
        city: "City 2",
        stateId: 2,
        zipCode: "67890",
        brandBox: "1",
        tier: "tier_two",
        sandBoxKey: uuidv4(), // Generate UUID for sandboxKey
        liveKey: uuidv4(), // Generate UUID for liveKey
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Fetch the IDs of the inserted Partners
    const partners = await queryInterface.sequelize.query(
      'SELECT id FROM "Partners";'
    );

    // Insert Shipping details for each Partner
    for (const partner of partners[0]) {
      await queryInterface.bulkInsert("Shippings", [
        {
          type: "Shipping Type 1",
          price: "50.00",
          shippingCompany: "Company 1",
          partnerId: partner.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete Shipping records first
    await queryInterface.bulkDelete("Shippings", null, {});

    // Then delete Partner records
    await queryInterface.bulkDelete("Partners", null, {});
  },
};
