const { Op, ValidationErrorItem, ValidationError } = require("sequelize");
const db = require("../models");

class DrugCategoryService {
  constructor() {
    this.DrugCategories = db.drugCategories;
  }

  async findAllDrugCategories(req) {
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
      return await this.DrugCategories.findAll({
        attributes: ["id", "name", "createdAt", "updatedAt"],
        where: whereClause,
        limit: pageSize,
        offset,
        order,
      });
    } catch (e) {
      console.log(e);
      throw new Error(
        "Something went wrong while fetching the Drug Categories!"
      );
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

      return await this.DrugCategories.count({ where: whereClause });
    } catch (e) {
      console.log(e);
      throw new Error(
        "Something went wrong while fetching the Drug Categories!"
      );
    }
  }

  async findDrugCategoryByName(name) {
    try {
      return await this.DrugCategories.findOne({
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
        "Some error occurred while fetching the Drug Category by name"
      );
    }
  }

  async findDrugCategoryById(id) {
    try {
      return await this.DrugCategories.findByPk(id, {
        attributes: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      console.log(e);
      throw new Error(
        "Some error occurred while fetching the Drug Category by ID"
      );
    }
  }

  async createDrugCategory(categoryData) {
    try {
      return await this.DrugCategories.create(categoryData, {
        returning: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Drug Category already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }

      throw new Error("Something went wrong while creating the Drug Category");
    }
  }

  async updateDrugCategory(categoryData, id) {
    try {
      return await this.DrugCategories.update(categoryData, {
        where: { id: id },
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Drug Category already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while updating the Drug Category");
    }
  }

  async deleteDrugCategory(id) {
    try {
      return await this.DrugCategories.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("Something went wrong while deleting the Drug Category");
    }
  }
  async softDeleteCategory(id) {
    try {
      return await this.DrugCategories.update(
        { softDeleted: true },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error("Something went wrong while deleting the Drug Category");
    }
  }
}

module.exports = new DrugCategoryService();
