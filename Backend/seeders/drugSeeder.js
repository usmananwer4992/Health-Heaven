const {
  drugForms,
  drugClasses,
  drugCategories,
  drugTypes,
  ageGroups,
  drugs,
} = require("../models"); // Import your Sequelize models
const { Sequelize } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Disable foreign key constraints
    await queryInterface.sequelize.query("SET CONSTRAINTS ALL DEFERRED;");

    // Load the drug data from your JSON file
    const jsonData = require("../json/drugs.json");

    // Extract the drug_details array
    const drugDetails = jsonData.drug_details;

    // Check if any drugs already exist in the "Drugs" table based on some criteria (e.g., name)
    const existingDrugs = await Promise.all(
      drugDetails.map((drug) =>
        queryInterface.rawSelect(
          "Drugs",
          {
            where: { name: drug.name },
          },
          ["id"]
        )
      )
    );

    // Insert drugs only if they do not already exist
    const drugsToCreate = drugDetails.filter(
      (drug, index) => !existingDrugs[index]
    );
    if (drugsToCreate.length > 0) {
      const drugData = drugsToCreate.map((item) => ({
        // Filter only fields that exist in the "Drugs" model
        id: item.id,
        name: item.name,
        label: item.label,
        price: item.price,
        quantity: item.quantity,
        ndc: item.ndc,
        dosage: item.dosage,
        drugFormId: item.drug_form_id,
        drugCategoryId: item.drug_category_id,
        drugClassId: item.drug_class_id,
        drugTypeId: item.drug_type_id,
        ageGroupId: item.age_group_id,
        tierOne: item.tier_one,
        tierTwo: item.tier_two,
        tierThree: item.tier_three,
        tierFour: item.tier_four,
        tierFive: item.tier_five,
        erxRequired: item.erx_required,
        active: item.active === 1 ? true : false,
        minQuantity: item.min_quantity,
        maxQuantity: item.max_quantity,
        quantityAllowed: item.qty_allowed,
        refillLimit: item.refill_limit,
        refillable: item.refillable === 1 ? true : false,
        createdAt: Sequelize.fn("NOW"),
        updatedAt: Sequelize.fn("NOW"),
      }));
      await queryInterface.bulkInsert("Drugs", drugData);

      // Enable foreign key constraints
      await queryInterface.sequelize.query("SET CONSTRAINTS ALL IMMEDIATE;");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Drugs", null, {});
  },
};