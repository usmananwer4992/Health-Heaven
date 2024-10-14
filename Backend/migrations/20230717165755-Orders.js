"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isLive: {
        type: Sequelize.BOOLEAN,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Customer",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      orderDrugId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "OrderDrugs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      totalAmount: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isRefill: {
        type: Sequelize.BOOLEAN,
      },
      shippingId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Shippings",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      shippingName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shippingAddress: {
        type: Sequelize.STRING,
      },
      shippingCity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shippingStateId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "States",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      shippingZipCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      partnerId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Partners",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      preName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      prePhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preNpiNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preSupervisior: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      daySupply: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      refills: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pre_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoice_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      activation_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      statusId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "OrderStatuses",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      
      sigId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: "Sigs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      // Add columns Shipping Appartment and Shipping Street

      shippingAppartment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shippingStreet: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      erxRequired: {
        type: Sequelize.BOOLEAN,
      },
      trackingId: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },

      // userId: {
      //   allowNull: false,
      //   type: Sequelize.BIGINT,
      //   references: {
      //     model: "Users",
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      // },
      relatedId: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
