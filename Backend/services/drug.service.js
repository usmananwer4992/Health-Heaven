const { Op, ValidationError } = require("sequelize");
const db = require("../models");

class DrugsService {
  constructor() {
    this.Drugs = db.drugs;
    this.DrugTypes = db.drugTypes;
    this.AgeGroups = db.ageGroups;
    this.DrugClasses = db.drugClasses;
    this.DrugCategories = db.drugCategories;
    this.DrugForms = db.drugForms;
  }

  async findAll(options) {
    options = {
      ...options,
      include: [
        this.DrugTypes,
        this.AgeGroups,
        this.DrugCategories,
        this.DrugClasses,
        this.DrugForms,
      ],
    };
    try {
      return await this.Drugs.findAll(options);
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong while fetching the Drugs!");
    }
  }

  async findById(id) {
    try {
      return await this.Drugs.findByPk(id, {
        include: [
          this.DrugTypes,
          this.AgeGroups,
          this.DrugCategories,
          this.DrugClasses,
          this.DrugForms,
        ],
      });
    } catch (e) {
      console.log(e);
      throw new Error(e + "Some error occurred while fetching the Drug by ID");
    }
  }

  async create(formData) {
    try {
      return await this.Drugs.create(formData);
    } catch (e) {
      if (e instanceof ValidationError) {
        // If the error is a Sequelize validation error, extract the error message
        const errorMessage = e.errors[0].message;
        if (e.errors[0]?.validatorKey === "not_unique") {
          throw new Error("This Drug already exists.");
        }
        throw new Error(`Validation Error: ${errorMessage}`);
      }
      throw new Error(e + "Something went wrong while creating the Drug ");
    }
  }

  async update(data) {
    try {
      return await this.Drugs.update(data, {
        where: { id: data.drugId },
      });
    } catch (e) {
      throw new Error("Something went wrong while updating the Drug ");
    }
  }

  async delete(id) {
    try {
      return await this.Drugs.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("Something went wrong while deleting the Drug");
    }
  }
  async softDelete(id) {
    try {
      return await this.Drugs.update(
        { softDeleted: true },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error("Something went wrong while soft deleting the Drug");
    }
  }
  async count(where) {
    try {
      const countOptions = where ? { where } : {}; // Use where if provided, otherwise, an empty object
      return await this.Drugs.count(countOptions);
    } catch (e) {
      throw new Error("Something went wrong while counting the Drug");
    }
  }
}

module.exports = new DrugsService();
