const db = require("../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const DrugsService = require("../services/drug.service");
const ResponseFormatService = require("../services/responseFormat.service");
const { Op } = require("sequelize");
const Partners = db.partners;
const Shippings = db.shippings;
const Users = db.users;

all = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const {
      id,
      label,
      drugName,
      ndc,
      price,
      quantity,
      dosage,
      drugForm,
      drugCategory,
      drugClass,
      drugType,
      ageGroup,
      refillable,
      refillLimit,
      tierOne,
      tierTwo,
      tierThree,
      tierFour,
      tierFive,
      erxRequired,
      active,
      maxQuantity,
      minQuantity,
      quantityAllowed,
      sortBy,
      sortOrder,
    } = req.query;
    const offset = (page - 1) * pageSize;

    let whereClause = {};
    whereClause.softDeleted = false;

    const order = [];
    const defaultSortBy = sortBy || "createdAt";
    order.push([defaultSortBy, sortOrder || "desc"]);

    if (id && parseInt(id) > 0) {
      whereClause.id = {
        [Op.eq]: parseInt(id),
      };
    }

    if (label && label.trim() !== "") {
      whereClause.label = {
        [Op.iLike]: `%${label}%`,
      };
    }

    if (drugName && drugName.trim() !== "") {
      whereClause.name = {
        [Op.iLike]: `%${drugName}%`,
      };
    }

    if (ndc && ndc.trim() !== "") {
      whereClause.ndc = {
        [Op.iLike]: `%${ndc}%`,
      };
    }

    if (price && price.trim() !== "") {
      whereClause.price = {
        [Op.iLike]: `%${price}%`,
      };
    }

    if (quantity && quantity.trim() !== "") {
      whereClause.quantity = {
        [Op.iLike]: `%${quantity}%`,
      };
    }

    if (dosage && dosage.trim() !== "") {
      whereClause.dosage = {
        [Op.iLike]: `%${dosage}%`,
      };
    }

    if (drugForm && parseInt(drugForm) > 0) {
      whereClause.drugFormId = {
        [Op.eq]: parseInt(drugForm),
      };
    }

    if (drugCategory && parseInt(drugCategory) > 0) {
      whereClause.drugCategoryId = {
        [Op.eq]: parseInt(drugCategory),
      };
    }

    if (drugClass && parseInt(drugClass) > 0) {
      whereClause.drugClassId = {
        [Op.eq]: parseInt(drugClass),
      };
    }

    if (drugType && parseInt(drugType) > 0) {
      whereClause.drugTypeId = {
        [Op.eq]: parseInt(drugType),
      };
    }

    if (ageGroup && parseInt(ageGroup) > 0) {
      whereClause.ageGroupId = {
        [Op.eq]: parseInt(ageGroup),
      };
    }

    if (refillable !== "") {
      const isRefillable = parseInt(refillable, 10);
      whereClause.refillable = {
        [Op.eq]: !!isRefillable,
      };
    }

    if (refillLimit && refillLimit.trim() !== "") {
      whereClause.refillLimit = {
        [Op.iLike]: `%${refillLimit}%`,
      };
    }

    if (tierOne && tierOne.trim() !== "") {
      whereClause.tierOne = {
        [Op.iLike]: `%${tierOne}%`,
      };
    }

    if (tierTwo && tierTwo.trim() !== "") {
      whereClause.tierTwo = {
        [Op.iLike]: `%${tierTwo}%`,
      };
    }

    if (tierThree && tierThree.trim() !== "") {
      whereClause.tierThree = {
        [Op.iLike]: `%${tierThree}%`,
      };
    }

    if (tierFour && tierFour.trim() !== "") {
      whereClause.tierFour = {
        [Op.iLike]: `%${tierFour}%`,
      };
    }

    if (tierFive && tierFive.trim() !== "") {
      whereClause.tierFive = {
        [Op.iLike]: `%${tierFive}%`,
      };
    }

    if (erxRequired && erxRequired.trim() !== "") {
      whereClause.erxRequired = {
        [Op.iLike]: `%${erxRequired}%`,
      };
    }

    if (active !== "") {
      const isActive = parseInt(active, 10);
      whereClause.active = {
        [Op.eq]: !!isActive,
      };
    }

    if (maxQuantity && parseInt(maxQuantity) > 0) {
      whereClause.maxQuantity = {
        [Op.eq]: parseInt(maxQuantity),
      };
    }

    if (minQuantity && parseInt(minQuantity) > 0) {
      whereClause.minQuantity = {
        [Op.eq]: parseInt(minQuantity),
      };
    }

    if (quantityAllowed && parseInt(quantityAllowed) > 0) {
      whereClause.quantityAllowed = {
        [Op.eq]: parseInt(quantityAllowed),
      };
    }

    const drugs = await DrugsService.findAll({
      where: whereClause,
      limit: pageSize,
      order,
      offset,
    });
    const totalCount = await DrugsService.count(whereClause);
    res.send(
      ResponseFormatService.responseOk({ drugs, totalCount }, "All Drugs", true)
    );
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong!",
          false
        )
      );
  }
};
findOne = async (req, res) => {
  const drugId = req.params.id;
  try {
    const drug = await DrugsService.findById(drugId);
    res.send(ResponseFormatService.responseOk(drug, "Drug Detail", true));
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong!",
          false
        )
      );
  }
};

createDrug = async (req, res) => {
  const drugSchema = Joi.object({
    name: Joi.string().required(),
    label: Joi.string().required(),
    price: Joi.string().required(),
    quantity: Joi.string().required(),
    ndc: Joi.string().required(),
    dosage: Joi.string().required(),
    drugFormId: Joi.number().integer().required(),
    drugCategoryId: Joi.number().integer().required(),
    drugClassId: Joi.number().integer().required(),
    drugTypeId: Joi.number().integer().required(),
    ageGroupId: Joi.number().integer().required(),
    refillable: Joi.boolean(),
    refillLimit: Joi.number().integer().required(),
    tierOne: Joi.number().integer().required(),
    tierTwo: Joi.number().integer().required(),
    tierThree: Joi.number().integer().required(),
    tierFour: Joi.number().integer().required(),
    tierFive: Joi.number().integer().required(),
    erxRequired: Joi.number().integer().required(),
    active: Joi.boolean(),
    minQuantity: Joi.number().integer().required(),
    maxQuantity: Joi.number().integer().required(),
    quantityAllowed: Joi.number().integer().required(),
    // tier: Joi.string()
    //   .valid(
    //     "tier_one",
    //     "tier_two",
    //     "tier_three",
    //     "tier_four",
    //     "tier_five",
    //     "tier_six"
    //   )
    //   .required(),
  });

  try {
    const { error: drugError } = drugSchema.validate(req.body);

    const drugValidationErrors = {};

    if (drugError) {
      if (drugError) {
        drugError.details.forEach((detail) => {
          drugValidationErrors[detail.path[0]] = detail.message;
        });
      }

      const validationErrors = {
        ...drugValidationErrors,
      };
      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }

    const drug = await DrugsService.create({
      ...req.body,
    });

    return res
      .status(201)
      .send(
        ResponseFormatService.responseOk(
          drug,
          "Drug Created Successfully",
          true
        )
      );
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong!",
          false
        )
      );
  }
};

update = async (req, res) => {
  const drugSchema = Joi.object({
    name: Joi.string().required(),
    label: Joi.string().required(),
    price: Joi.string().required(),
    quantity: Joi.string().required(),
    ndc: Joi.string().required(),
    dosage: Joi.string().required(),
    drugFormId: Joi.number().integer().required(),
    drugCategoryId: Joi.number().integer().required(),
    drugClassId: Joi.number().integer().required(),
    drugTypeId: Joi.number().integer().required(),
    ageGroupId: Joi.number().integer().required(),
    refillable: Joi.boolean(),
    refillLimit: Joi.number().integer().required(),
    tierOne: Joi.number().integer().required(),
    tierTwo: Joi.number().integer().required(),
    tierThree: Joi.number().integer().required(),
    tierFour: Joi.number().integer().required(),
    tierFive: Joi.number().integer().required(),
    erxRequired: Joi.number().integer().required(),
    active: Joi.boolean(),
    minQuantity: Joi.number().integer().required(),
    maxQuantity: Joi.number().integer().required(),
    quantityAllowed: Joi.number().integer().required(),
    // tier: Joi.string()
    //   .valid(
    //     "tier_one",
    //     "tier_two",
    //     "tier_three",
    //     "tier_four",
    //     "tier_five",
    //     "tier_six"
    //   )
    //   .required(),
  });

  try {
    const drugId = req.params.id;

    const { error: drugError } = drugSchema.validate(req.body);

    const drugValidationErrors = {};

    if (drugError) {
      if (drugError) {
        drugError.details.forEach((detail) => {
          drugValidationErrors[detail.path[0]] = detail.message;
        });
      }

      const validationErrors = {
        ...drugValidationErrors,
      };
      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }

    const updatedDrug = await DrugsService.update({
      ...req.body,
      drugId,
    });

    res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          updatedDrug,
          "Drug updated successfully!",
          true
        )
      );
  } catch (e) {
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong!",
          false
        )
      );
  }
};

deleteDrug = async (req, res) => {
  const drugId = req.params.id;

  try {
    const deleted = await DrugsService.softDelete(drugId);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          deleted,
          "Drug Deleted Successfully",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong!",
          false
        )
      );
  }
};

module.exports = {
  createDrug,
  all,
  findOne,
  deleteDrug,
  update,
};
