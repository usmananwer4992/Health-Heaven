const { Op, ValidationError } = require("sequelize");
const db = require("../models");

class DrugFormService {
  constructor() {
    this.DrugForms = db.drugForms;
  }

  async findAllDrugForms(req) {
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
      return await this.DrugForms.findAll({
        attributes: ["id", "name", "createdAt", "updatedAt"],
        where: whereClause,
        limit: pageSize,
        offset,
        order,
      });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Drug Forms!");
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
      return await this.DrugForms.count({ where: whereClause });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Drug Forms!");
    }
  }

  async findDrugFormByName(name) {
    try {
      return await this.DrugForms.findOne({
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
        "Some error occurred while fetching the Drug Form by name"
      );
    }
  }

  async findDrugFormById(id) {
    try {
      return await this.DrugForms.findByPk(id, {
        attributes: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Drug Form by ID");
    }
  }

  async createDrugForm(formData) {
    try {
      return await this.DrugForms.create(formData, {
        returning: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Drug Form already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while creating the Drug Form");
    }
  }

  async updateDrugForm(formData, id) {
    try {
      return await this.DrugForms.update(formData, {
        where: { id: id },
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Drug Form already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while updating the Drug Form");
    }
  }

  async deleteDrugForm(id) {
    try {
      return await this.DrugForms.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("Something went wrong while deleting the Drug Form");
    }
  }
  async softDeleteForm(id) {
    try {
      return await this.DrugForms.update(
        { softDeleted: true },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error("Something went wrong while deleting the Drug Form");
    }
  }
}

module.exports = new DrugFormService();
