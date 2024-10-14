'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      
      queryInterface.addColumn(
        'Orders', 
        'shippedAt', 
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
     
    ]);
  },

  async down (queryInterface, Sequelize) {
  
    return Promise.all([
      queryInterface.removeColumn('Orders', 'shippedAt'),
    ]);
  }
};
