const { Op, ValidationError } = require("sequelize");
const db = require("../models");

class DrugTypeService {
  constructor() {
    this.DrugTypes = db.drugTypes;
  }

  async findAllDrugTypes(req) {
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
      return await this.DrugTypes.findAll({
        attributes: ["id", "name", "createdAt", "updatedAt"],
        where: whereClause,
        limit: pageSize,
        offset,
        order,
      });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Drug Types!");
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
      return await this.DrugTypes.count({ where: whereClause });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Drug Types!");
    }
  }

  async findDrugTypeByName(name) {
    try {
      return await this.DrugTypes.findOne({
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
        "Some error occurred while fetching the Drug Type by name"
      );
    }
  }

  async findDrugTypeById(id) {
    try {
      return await this.DrugTypes.findByPk(id, {
        attributes: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Drug Type by ID");
    }
  }

  async createDrugType(formData) {
    try {
      return await this.DrugTypes.create(formData, {
        returning: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Drug Type already exists.");
        }
        const errorMessage = e.errors[0].message;
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while creating the Drug Type");
    }
  }

  async updateDrugType(formData, id) {
    try {
      return await this.DrugTypes.update(formData, {
        where: { id: id },
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Drug Type already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while updating the Drug Type");
    }
  }

  async deleteDrugType(id) {
    try {
      return await this.DrugTypes.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("Something went wrong while deleting the Drug Type");
    }
  }
  async softDeleteDrugType(id) {
    try {
      return await this.DrugTypes.update(
        { softDeleted: true },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error("Something went wrong while deleting the Drug Type");
    }
  }
}

module.exports = new DrugTypeService();
