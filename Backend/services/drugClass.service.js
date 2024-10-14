const { Op, ValidationError } = require("sequelize");
const db = require("../models");

class DrugClassService {
  constructor() {
    this.DrugClasses = db.drugClasses;
  }

  async findAllDrugClasses(req) {
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
      return await this.DrugClasses.findAll({
        attributes: ["id", "name", "createdAt", "updatedAt"],
        where: whereClause,
        limit: pageSize,
        offset,
        order,
      });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Drug Classes!");
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

      return await this.DrugClasses.count({ where: whereClause });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Drug Classes!");
    }
  }

  async findDrugClassByName(name) {
    try {
      return await this.DrugClasses.findOne({
        attributes: ["name"],
        where: {
          name: {
            [Op.iLike]: name, // Using Op.iLike for case-insensitive search
          },
        },
      });
    } catch (e) {
      console.log(e);
      throw new Error(
        "Some error occurred while fetching the Drug Class by name"
      );
    }
  }

  async findDrugClassById(id) {
    try {
      return await this.DrugClasses.findByPk(id, {
        attributes: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      console.log(e);
      throw new Error(
        "Some error occurred while fetching the Drug Class by ID"
      );
    }
  }

  async createDrugClass(ClassData) {
    try {
      return await this.DrugClasses.create(ClassData, {
        returning: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Drug Class already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while creating the Drug Class");
    }
  }

  async updateDrugClass(ClassData, id) {
    try {
      return await this.DrugClasses.update(ClassData, {
        where: { id: id },
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Drug Class already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while updating the Drug Class");
    }
  }

  async deleteDrugClass(id) {
    try {
      return await this.DrugClasses.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("Something went wrong while deleting the Drug Class");
    }
  }
  async softDeleteClass(id) {
    try {
      return await this.DrugClasses.update(
        { softDeleted: true },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error("Something went wrong while deleting the Drug Class");
    }
  }
}

module.exports = new DrugClassService();
