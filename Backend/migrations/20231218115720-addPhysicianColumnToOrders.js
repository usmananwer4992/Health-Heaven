'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Orders', 
        'physicianName', 
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Orders', 
        'coPay', 
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Orders',
        'physicianCity',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Orders',
        'physicianStateId',
        {
          allowNull: true,
          type: Sequelize.BIGINT,
          references: {
            model: "States",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      ),
      queryInterface.addColumn(
        'Orders',
        'physicianPhone',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Orders',
        'firstCheckBox',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue:false
        },
      ),
      queryInterface.addColumn(
        'Orders',
        'secondCheckBox',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue:false
        },
      ),
      queryInterface.addColumn(
        'Orders',
        'thirdCheckbox',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue:false
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
  
    return Promise.all([
      queryInterface.removeColumn('Orders', 'physicianName'),
      queryInterface.removeColumn('Orders', 'physicianCity'),
      queryInterface.removeColumn('Orders', 'physicianStateId'),
      queryInterface.removeColumn('Orders', 'physicianPhone'),
      queryInterface.removeColumn('Orders', 'firstCheckbox'),
      queryInterface.removeColumn('Orders', 'secondCheckbox'),
      queryInterface.removeColumn('Orders', 'thirdCheckbox'),

    ]);
  }
};
