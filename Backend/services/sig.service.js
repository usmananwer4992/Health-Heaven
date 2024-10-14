const { Op, ValidationError } = require("sequelize");
const db = require("../models");

class SigService {
  constructor() {
    this.Sigs = db.sigs;
  }

  async findAll(req) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 300;
      const { search, sortBy, sortOrder } = req.query;
      const offset = (page - 1) * pageSize;

      let whereClause = {};
      whereClause.softDelete = false;

      if (search && search.trim() !== "") {
        whereClause = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      const order = sortBy
        ? [[sortBy, sortOrder || "desc"]]
        : [["createdAt", "desc"]];
      return await this.Sigs.findAll({
        attributes: ["id", "name", "createdAt", "updatedAt"],
        where: whereClause,
        limit: pageSize,
        offset,
        order,
      });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Sigs!");
    }
  }

  async totalCount(req) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const { search } = req.query;
      const offset = (page - 1) * pageSize;

      let whereClause = {};
      whereClause.softDelete = false;

      if (search && search.trim() !== "") {
        whereClause = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      return await this.Sigs.count({ where: whereClause });
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Sigs!");
    }
  }

  async findByName(name) {
    try {
      return await this.Sigs.findOne({
        attributes: ["name"],
        where: {
          name: name,
          softDelete: false,
        },
      });
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Sig by name");
    }
  }

  async findById(id) {
    try {
      return await this.Sigs.findByPk(id, {
        where: { softDelete: false },
        attributes: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      console.log(e);
      throw new Error("Some error occurred while fetching the Sig by ID");
    }
  }

  async create(data) {
    try {
      return await this.Sigs.create(data, {
        returning: ["id", "name", "createdAt", "updatedAt"],
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Sig already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while creating the Sig");
    }
  }

  async update(data, id) {
    try {
      return await this.Sigs.update(data, {
        where: { id: id },
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Sig already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error("Something went wrong while updating the Sig");
    }
  }

  async softDelete(id) {
    try {
      return await this.Sigs.update(
        { softDelete: true },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error("Something went wrong while soft deleting the Sig");
    }
  }

  async delete(id) {
    try {
      return await this.Sigs.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("Something went wrong while deleting the Sig");
    }
  }
}

module.exports = new SigService();
