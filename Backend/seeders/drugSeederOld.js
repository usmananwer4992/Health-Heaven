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
    // // Disable foreign key constraints
    // await queryInterface.sequelize.query("SET CONSTRAINTS ALL DEFERRED;");

    // // Load the drug data from your JSON file
    // const jsonData = require("../json/drugs.json");

    // // Extract the drug_details array
    // const drugDetails = jsonData.drug_details;

    // // Check if any drugs already exist in the "Drugs" table based on some criteria (e.g., name)
    // const existingDrugs = await Promise.all(
    //   drugDetails.map((drug) =>
    //     queryInterface.rawSelect(
    //       "Drugs",
    //       {
    //         where: { name: drug.name },
    //       },
    //       ["id"]
    //     )
    //   )
    // );

    // // Insert drugs only if they do not already exist
    // const drugsToCreate = drugDetails.filter(
    //   (drug, index) => !existingDrugs[index]
    // );

    // if (drugsToCreate.length > 0) {
    //   // Fetch values for foreign keys from related tables
    //   const DrugForm = await drugForms.findAll();
    //   const DrugCategories = await drugCategories.findAll();
    //   const DrugClasses = await drugClasses.findAll();
    //   const DrugTypes = await drugTypes.findAll();
    //   const AgeGroups = await ageGroups.findAll();

    //   const drugData = drugsToCreate.map((item) => {
    //     // Filter only fields that exist in the "Drugs" model
    //     const filteredData = filterFields(item, drugs.rawAttributes);

    //     // Convert the "refillable" field to a boolean
    //     filteredData.refillable = item.refillable === 1 ? true : false;

    //     // Convert the "active" field to a boolean
    //     filteredData.active = item.active === 1 ? true : false;

    //     // Map foreign key values based on JSON data
    //     filteredData.drugFormId = findMatchingValue(
    //       DrugForm,
    //       "name",
    //       item.drugForm
    //     );
    //     filteredData.drugCategoryId = findMatchingValue(
    //       DrugCategories,
    //       "name",
    //       item.drugCategory
    //     );
    //     filteredData.drugClassId = findMatchingValue(
    //       DrugClasses,
    //       "name",
    //       item.drugClass
    //     );
    //     filteredData.drugTypeId = findMatchingValue(
    //       DrugTypes,
    //       "name",
    //       item.drugType
    //     );
    //     filteredData.ageGroupId = findMatchingValue(
    //       AgeGroups,
    //       "name",
    //       item.ageGroup
    //     );

    //     // Set the current timestamp for "createdAt"
    //     filteredData.createdAt = Sequelize.fn("NOW");

    //     // Set the current timestamp for "updatedAt"
    //     filteredData.updatedAt = Sequelize.fn("NOW");

    //     return filteredData;
    //   });

    //   await queryInterface.bulkInsert("Drugs", drugData);

    //   // Enable foreign key constraints
    //   await queryInterface.sequelize.query("SET CONSTRAINTS ALL IMMEDIATE;");
    // }
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete("Drugs", null, {});
  },
};

// Function to find a matching value in an array of objects based on a key and value
function findMatchingValue(array, key, value) {
  const matchedItem = array.find((item) => item[key] === value);
  return matchedItem ? matchedItem.id : null;
}

// Function to filter data fields based on the model's attributes
function filterFields(data, modelAttributes) {
  const filteredData = {};
  for (const key in data) {
    if (modelAttributes[key]) {
      filteredData[key] = data[key];
    }
  }
  return filteredData;
}
