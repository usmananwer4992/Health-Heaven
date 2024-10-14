const { Op, ValidationError } = require("sequelize");
const db = require("../models");
const jwt = require("jsonwebtoken");

class TransfersService {
  // Rename the class to TransfersService
  constructor() {
    this.Transfers = db.transfers;
    this.Partners = db.partners;
    this.Customers = db.customer;
    this.Pharmacies = db.pharmacies;
    this.Drug = db.drugs;
    this.Status = db.transferStatus;
    this.Sigs = db.sigs;
    this.TransferDays = db.transferDays;
  }

  async findAll(options) {
    options = {
      ...options,
    };
    try {
      return await this.Transfers.findAll(options);
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Transfers!");
    }
  }

  async findById(id) {
    try {
      return await this.Transfers.findByPk(id, {
        include: [
          { model: this.Status },
          { model: this.Sigs },
          { model: this.Customers },
          { model: this.Pharmacies },
          { model: this.Drug },
          { model: this.TransferDays },
          { model: this.Partners },
        ],
      });
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Transfer by ID");
    }
  }

  async create(formData) {
    try {
      return await this.Transfers.create(formData);
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Transfer already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      console.log(e);
      throw new Error("Something went wrong while creating the Transfer ");
    }
  }

  async update(data) {
    try {
      return await this.Transfers.update(data, {
        where: { id: data.transferId },
      });
    } catch (e) {
      throw new Error("Something went wrong while updating the Transfer ");
    }
  }

  async delete(id) {
    try {
      return await this.Transfers.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("Something went wrong while deleting the Transfer");
    }
  }

  async count() {
    try {
      return await this.Transfers.count();
    } catch (e) {
      throw new Error("Something went wrong while counting the Transfers");
    }
  }

  fetchPartnerId = async (req) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded.partnerId ? decoded.partnerId : decoded.userId;
  };
}

module.exports = new TransfersService(); // Export an instance of the TransfersService class
