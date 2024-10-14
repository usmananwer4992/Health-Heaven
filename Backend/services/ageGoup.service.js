const { Op, ValidationError } = require("sequelize");
const db = require("../models");

class AgeGroupService {
  constructor() {
    this.AgeGroups = db.ageGroups;
  }

  async findAllAgeGroups(req) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const { search, sortBy, sortOrder } = req.query;
      const offset = (page - 1) * pageSize;

      let whereClause = {};
      whereClause.softDeleted = false;

      if (search && search.trim() !== "") {
        whereClause.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      const order = sortBy
        ? [[sortBy, sortOrder || "desc"]]
        : [["createdAt", "desc"]];
      return await this.AgeGroups.findAll({
        attributes: ["id", "name", "createdAt", "updatedAt"],
        where: whereClause,
        limit: pageSize,
        offset,
        order,
      });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Age Groups!");
    }
  }

  async totalCount(req) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const { search } = req.query;
      const offset = (page - 1) * pageSize;

      let whereClause = {};
      whereClause.softDeleted = false;

      if (search && search.trim() !== "") {
        whereClause.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      return await this.AgeGroups.count({ where: whereClause });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the age groups!");
    }
  }

  async findByName(name) {
    try {
      return await this.AgeGroups.findOne({
        attributes: ["name"],
        where: {
          name: {
            [Op.iLike]: name, // Using Op.iLike for case-insensitive search
          },
        },
      });
    } catch (e) {
      throw new Error(
        "Some error occurred while fetching the Age Group by name"
      );
    }
  }

  async findById(id) {
    try {
      return await this.AgeGroups.findByPk(id, {
        attributes: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Age group by ID");
    }
  }

  async createAgeGroup(formData) {
    try {
      return await this.AgeGroups.create(formData, {
        returning: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Age Group already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while creating the Age Group");
    }
  }

  async update(formData, id) {
    try {
      return await this.AgeGroups.update(formData, {
        where: { id: id },
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Age Group already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while updating the Age Group");
    }
  }

  async delete(id) {
    try {
      return await this.AgeGroups.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("Something went wrong while deleting the Age Group");
    }
  }
  async softDelete(id) {
    try {
      return await this.AgeGroups.update(
        { softDeleted: true },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error("Something went wrong while deleting the Age Group");
    }
  }
}

module.exports = new AgeGroupService();
