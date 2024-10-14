const { Op } = require("sequelize");
const db = require("../models");
class PharmacyService {
  constructor() {
    this.Pharmacies = db.pharmacies;
  }

  async findAll(options) {
    options = {
      ...options,
    };
    try {
      return await this.Pharmacies.findAll(options);
    } catch (e) {
      throw new Error("Somthing went wrong while fetching the Pharmacies!");
    }
  }

  async findOneCustomer(params) {
    try {
      return await this.Pharmacies.findOne({
        where: {
          email: params,
        },
      });
    } catch (e) {
      throw new Error(e + "Some error occured while fetching the Pharmacy ");
    }
  }

  async findOneByPk(pk) {
    try {
      const data = await this.Pharmacies.findByPk(pk);
      if (!data) {
        throw new Error(" No Pharmacy found with id= " + pk);
      }
      return data;
    } catch (e) {
      throw new Error(e + "Some error occured while fetching the Pharmacy ");
    }
  }

  async create(params) {
    try {
      // Check if a pharmacy with the same name already exists
      const existingPharmacyByName = await this.Pharmacies.findOne({
        where: {
          name: {
            [Op.iLike]: params.name, // Using Op.iLike for case-insensitive search
          },
        },
      });

      // if (existingPharmacyByName) {
      //   throw {
      //     name: `Pharmacy with this name: ${params.name.toUpperCase()} already exists`,
      //   };
      // }

      // Check if a pharmacy with the same phone number already exists
      const existingPharmacyByPhone = await this.Pharmacies.findOne({
        where: {
          phone: params.phone, // Assuming the phone property exists in your model
        },
      });

      if (existingPharmacyByPhone) {
        throw {
          phone: `Pharmacy with this phone number: ${params.phone} already exists`,
        };
      }

      // If no existing pharmacy, proceed with creating a new one
      return await this.Pharmacies.create(params);
    } catch (e) {
      throw e;
    }
  }

  async update(params, id) {
    try {
      return await this.Pharmacies.update(params, {
        where: { id: id },
      });
    } catch (e) {
      throw new Error(e + "somthing went wrong while Updating Pharmacy");
    }
  }

  async delete(id) {
    try {
      return await this.Pharmacies.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error(e + "somthing went wrong while deleting Pharmacy");
    }
  }
  async totalCount(req) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const { search } = req.query;
      const offset = (page - 1) * pageSize;

      let whereClause = {};

      if (search && search.trim() !== "") {
        whereClause = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      return await this.Pharmacies.count({ where: whereClause });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the count!");
    }
  }
}

module.exports = new PharmacyService();
