'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Customer', 
        'insuranceCardId', 
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Customer',
        'insuranceRxBin',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Customer',
        'insurancePcn',
        {
          allowNull: true,
          type: Sequelize.STRING,
        },
      ),
      queryInterface.addColumn(
        'Customer',
        'insuranceRxGroup',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
  
    return Promise.all([
      queryInterface.removeColumn('Customer', 'insuranceCardId'),
      queryInterface.removeColumn('Customer', 'insuranceRxBin'),
      queryInterface.removeColumn('Customer', 'insurancePcn'),
      queryInterface.removeColumn('Customer', 'insuranceRxGroup'),

    ]);
  }
};
