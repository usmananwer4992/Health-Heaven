const { Op } = require("sequelize");
const db = require("../models");
class CustomerService {
  constructor() {
    this.Customers = db.customer;
    this.Partners = db.partners;
  }

  async getAll(req) {
    try {
      return await this.Customers.findAll(req);
    } catch (e) {
      console.log(e);
      throw new Error("Somthing went wrong while fetching the Customers!", e);
    }
  }
  async getCountCustomer(partnerId = null) {
    let config;
    if (partnerId) {
      config = {
        where: {
          partnerId: partnerId,
          softDeleted: false, // Add this condition
        },
      };
    } else {
      config = {
        where: {
          softDeleted: false, // Add this condition
        },
      };
    }
  
    try {
      return await this.Customers.count(config);
    } catch (e) {
      throw new Error("Something went wrong while fetching the Customers!");
    }
  }

  async findAllCustomers(partnerId = null, req) {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const {
      id,
      firstName,
      lastName,
      email,
      city,
      address,
      zipCode,
      gender,
      dob,
      phone,
      sortBy,
      sortOrder,
    } = req.query;
    const offset = (page - 1) * pageSize;

    let config = {};
    if (!config.where) {
      config.where = {
        softDeleted: false,
      };
    } else {
      config.where.softDeleted = false;
    }
    if (partnerId) {
      config = { where: { partnerId: partnerId } };
    }
    const order = sortBy
      ? [[sortBy, sortOrder || "desc"]]
      : [["createdAt", "desc"]];
    // order.push([defaultSortBy, defaultSortOrder]);
    if (id) {
      config = { where: { id } };
    }
    if (firstName && firstName.trim() !== "") {
      config = {
        where: {
          firstName: {
            [Op.iLike]: `%${firstName}%`,
          },
        },
      };
    }
    if (lastName && lastName.trim() !== "") {
      config = {
        where: {
          lastName: {
            [Op.iLike]: `%${lastName}%`,
          },
        },
      };
    }
    if (email && email.trim() !== "") {
      config = {
        where: {
          email: {
            [Op.iLike]: `%${email}%`,
          },
        },
      };
    }
    if (phone && phone.trim() !== "") {
      config = {
        where: {
          phone: {
            [Op.iLike]: `%${phone}%`,
          },
        },
      };
    }
    if (address && address.trim() !== "") {
      config = {
        where: {
          address: {
            [Op.iLike]: `%${address}%`,
          },
        },
      };
    }
    if (city && city.trim() !== "") {
      config = {
        where: {
          city: {
            [Op.iLike]: `%${city}%`,
          },
        },
      };
    }
    if (zipCode && zipCode.trim() !== "") {
      config = {
        where: {
          zipCode: {
            [Op.iLike]: `%${zipCode}%`,
          },
        },
      };
    }
    if (dob && dob.trim() !== "") {
      config = {
        where: {
          dob: {
            [Op.iLike]: `%${dob}%`,
          },
        },
      };
    }
    if (gender && gender.trim() !== "") {
      config = {
        where: {
          gender,
        },
      };
    }

    config.offset = offset;
    config.limit = pageSize;
    config.order = order;

    config.include = {
      model: db.partners,
      attributes: ["name"],
    };
    try {
      return await this.Customers.findAll(config);
    } catch (e) {
      throw new Error("Somthing went wrong while fetching the Customers!");
    }
  }

  async findOneCustomer(params) {
    try {
      return await this.Customers.findOne({
        where: {
          email: params,
        },
      });
    } catch (e) {
      throw new Error(e + "Some error occured while fetching the Customer ");
    }
  }

  async findOneCustomerByPk(pk) {
    try {
      const data = await this.Customers.findByPk(pk);
      if (!data) {
        throw new Error(" No Customer found with id= " + pk);
      }
      return data;
    } catch (e) {
      throw new Error(e + "Some error occured while fetching the Customer ");
    }
  }

  async createCustomer(params) {
    try {
      return await this.Customers.create(params);
    } catch (e) {
      console.log(e);
      throw new Error(e + "somthing went wrong while creating Customer");
    }
  }

  async update(params, id) {
    try {
      return await this.Customers.update(params, {
        where: { id: id },
      });
    } catch (e) {
      throw new Error(e + "somthing went wrong while Updating Customer");
    }
  }

  async delete(id) {
    try {
      return await this.Customers.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error(e + "somthing went wrong while deleting Customer");
    }
  }
  async softDeleteCustomer(id) {
    try {
      return await this.Customers.update(
        { softDeleted: true },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error(e + "somthing went wrong while deleting Customer");
    }
  }
  async getCustomerByEmailAndPhone(id, email, phone) {
    try {
      const whereClause = {
        email,
        phone,
      };

      // If id is provided and not null, exclude the customer with that id
      if (id !== null) {
        whereClause.id = { [Op.not]: id };
      }
      const existingCustomer = await this.Customers.findOne({
        where: whereClause,
      });

      return existingCustomer;
    } catch (e) {
      console.error("Error querying database:", e);
      throw new Error(
        "Something went wrong while checking for existing customer by email and phone"
      );
    }
  }
}

module.exports = new CustomerService();
