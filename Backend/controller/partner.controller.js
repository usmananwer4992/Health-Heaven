const db = require("../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const ResponseFormatService = require("../services/responseFormat.service");
const { Op, Sequelize, where } = require("sequelize");
const rolesService = require("../services/roles.service");
const Partners = db.partners;
const Shippings = db.shippings;
const Users = db.users;
const UserRole = db.userRoles;
const State = db.states;
allStates = async (req, res) => {
  try {
    const states = await State.findAll();
    res.send(ResponseFormatService.responseOk(states, "All states", true));
  } catch (e) {
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};
fetchAllRecords = async (req, res) => {
  try {
    const partners = await Partners.findAll({
      attributes: ["id", "name"],
      where: {
        softDeleted: false,
      },
      order: [["name", "desc"]],
    });
    res.send(
      ResponseFormatService.responseOk({ partners }, "All partners", true)
    );
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};
all = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const { name, state, brandBox, sortBy, sortOrder } = req.query;
    const offset = (page - 1) * pageSize;

    let whereClause = { softDeleted: false };

    if (name && name.trim() !== "") {
      whereClause.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (state && state > 0) {
      whereClause.stateId = state;
    }

    if (brandBox && brandBox !== "all") {
      whereClause.brandBox = brandBox;
    }

    // const order = [];

    // if (sortBy === "userCount") {
    //   order.push([
    //     db.sequelize.fn("COUNT", db.sequelize.col(`Users.id`)),
    //     sortOrder || "desc",
    //   ]);
    // } else if (sortBy === "stateName") {
    //   order.push([Sequelize.literal('"State.name"'), sortOrder || "desc"]);
    // } else if (sortBy === "brandBox") {
    //   order.push([
    //     Sequelize.literal(`CASE WHEN "brandBox" = '1' THEN 1 ELSE 0 END`),
    //     sortOrder || "asc",
    //   ]);
    // } else {
    //   const defaultSortBy = sortBy || "createdAt";
    //   order.push([defaultSortBy, sortOrder || "desc"]);
    // }

    const order = sortBy
    ? [[sortBy, sortOrder || "desc"]]
    : [["createdAt", "desc"]];

    const partners = await Partners.findAll({
      attributes: [
        "id",
        "name",
        "brandBox",
        "tier",
        "city",
        "address",
        "zipCode",
        "createdAt",
        [db.sequelize.fn("COUNT", db.sequelize.col(`Users.id`)), "userCount"],
      ],
      where: whereClause,
      limit: pageSize,
      offset,
      order,
      include: [
        {
          model: Users,
          as: "Users",
          attributes: [],
          where: {
            roleId: 3,
          },
          required: false,
        },
        {
          model: State,
          attributes: ["name"],
        },
      ],
      group: ["Partners.id", "State.id"],
      subQuery: false,
    });

    console.log("partners", partners);
    const totalCount = await Partners.count({
      where: whereClause,
    });

    res.send(
      ResponseFormatService.responseOk(
        { partners, totalCount },
        "All partners",
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
          e.message | "Something went wrong!",
          false
        )
      );
  }
};
getPartnerDetail = async (req, res) => {
  const partnerId = req.params.partnerId;
  try {
    const partner = await Partners.findByPk(partnerId, {
      attributes: {
        exclude: ['partnerId'], // Exclude the partnerId column
      },
      include: [Users, Shippings],
    });

    res.send(ResponseFormatService.responseOk(partner, "Partner Detail", true));
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};
allPartnerUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const { id, name, email, sortBy, sortOrder } = req.query;
    const offset = (page - 1) * pageSize;

    let whereClauseUser = {
      partnerId: { [Op.ne]: null },
      roleId: { [Op.ne]: null },
    };
    let whereClausePartner = {};

    if (id && id.trim() !== "") {
      whereClauseUser.id = id;
    }

    if (name && name.trim() !== "") {
      whereClausePartner.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (email && email.trim() !== "") {
      whereClauseUser.email = {
        [Op.iLike]: `%${email}%`,
      };
    }
    // Block Soft Delete
    whereClausePartner.softDeleted = false;

    // const order = [];

    // if (sortBy === "name") {
    //   order.push([Sequelize.literal('"Partner.name"'), sortOrder || "desc"]);
    // } else if (sortBy === "email") {
    //   order.push(["email", sortOrder || "desc"]);
    // } else {
    //   const defaultSortBy = sortBy || "createdAt";
    //   order.push([defaultSortBy, sortOrder || "desc"]);
    // }
    const order = sortBy
    ? [[sortBy, sortOrder || "desc"]]
    : [["createdAt", "desc"]];

    const partner_users = await Users.findAll({
      include: [{ model: Partners, where: whereClausePartner }],
      where: whereClauseUser,
      limit: pageSize,
      offset,
      order,
    });

    const totalCount = await Users.count({
      include: [{ model: Partners, where: whereClausePartner }],
      where: whereClauseUser,
    });

    res.send(
      ResponseFormatService.responseOk(
        { users: partner_users, totalCount },
        "All partner users",
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

allPartnerUsersById = async (req, res) => {
  const partnerId = req.params.partnerId;
  try {
    const partner_users = await Users.findAll({ where: { partnerId } });
    res.send(
      ResponseFormatService.responseOk(partner_users, "All partner users", true)
    );
  } catch (e) {
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};

createPartner = async (req, res) => {
  const shippingDetailSchema = Joi.object({
    id: Joi.number(),
    type: Joi.string().required().messages({
      "string.base": "Type should be a string",
      "string.empty": "Type is not allowed to be empty.",
      "any.required": "Type is required.",
    }),
    shippingCompany: Joi.string().required().messages({
      "string.base": "Shipping Company should be a string",
      "string.empty": "Shipping Company is not allowed to be empty.",
      "any.required": "Shipping Company is required.",
    }),
    price: Joi.string().required().messages({
      "string.base": "Price should be a string",
      "string.empty": "Price is not allowed to be empty.",
      "any.required": "Price is required.",
    }),
  });
  const partnerSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    website: Joi.string().allow("", null).optional(),
    loading: Joi.optional(),
    address: Joi.string().required(),
    secondaryAddress: Joi.string().allow("", null).optional(),
    city: Joi.string().allow("", null).optional(),
    stateId: Joi.number().integer().required(),
    zipCode: Joi.number().integer().allow("", null).optional(),
    // brandBox: Joi.array().items(Joi.number()).optional(),
    // tier: Joi.string().allow("", null).optional(),
    // brandBox: Joi.array().items(Joi.string()).min(1).max(1).messages({
    //   "array.base": "One checkbox should be checked.",
    //   "array.min": "One checkbox should be checked.",
    //   "array.max": "One checkbox should be checked.",
    // }),
    // tier: Joi.array().min(1).max(1).messages({
    //   "array.base": "One checkbox should be checked.",
    //   "array.empty": "One checkbox should be checked.",
    //   "array.min": "One checkbox should be checked.",
    //   "array.max": "One checkbox should be checked.",
    // }),
    brandBox: Joi.string().valid("1", "0").required(),
    tier: Joi.string()
      .valid(
        "tier_one",
        "tier_two",
        "tier_three",
        "tier_four",
        "tier_five",
        "tier_six"
      )
      .required(),
    softDeleted: Joi.date().allow(null, "").optional(),
    //sandBoxKey: Joi.string().allow("", null).optional(),
    liveKey: Joi.string().allow("", null).optional(),
    // shippingData: Joi.object(),
    shippingDetails: Joi.array().items(shippingDetailSchema).min(1).messages({
      "array.base": "Shipping Details should be an array",
      "array.min": "At least one shipping detail is required.",
      "any.required": "Shipping Details are required.",
    }),
  });

  try {
    const {
      email,
      password,
      password2,
      type,
      shippingCompany,
      price,
      shippingDetails,
      ...partnerObj
    } = req.body;

    const shippingObj = [...shippingDetails];
    const shippingData = shippingObj.map(({ id, ...rest }) => rest);
    const { error: partnerError } = partnerSchema.validate(partnerObj);

    const partnerValidationErrors = {};

    if (partnerError) {
      if (partnerError) {
        partnerError.details.forEach((detail) => {
          if (detail.path[0] !== "loading") {
            partnerValidationErrors[detail.path[0]] = detail.message;
          }
        });
      }

      const validationErrors = {
        ...partnerValidationErrors,
      };
      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }

    // if (partnerObj.tier && Array.isArray(partnerObj.tier)) {
    //   partnerObj.tier = partnerObj.tier.join(",");
    // } else {
    //   partnerObj.tier = "";
    // }

    // if (partnerObj.brandBox && Array.isArray(partnerObj.brandBox)) {
    //   partnerObj.brandBox = partnerObj.brandBox.join(",");
    // } else {
    //   partnerObj.brandBox = "0";
    // }

    const partner = await Partners.create({
      ...partnerObj,
    });
    const updatedShippingObj = shippingData.map((shippingDetail) => ({
      ...shippingDetail,
      partnerId: partner?.id,
    }));
    try {
      await Shippings.bulkCreate(updatedShippingObj);

      res
        .status(200)
        .send(
          ResponseFormatService.responseOk(partner, "Partner created!", true)
        );
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            e.message | "Something went wrong!",
            false
          )
        );
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};

updatePartner = async (req, res) => {
  const shippingDetailSchema = Joi.object({
    id: Joi.number(),
    type: Joi.string().required().messages({
      "string.base": "Type should be a string",
      "string.empty": "Type is not allowed to be empty.",
      "any.required": "Type is required.",
    }),
    shippingCompany: Joi.string().required().messages({
      "string.base": "Shipping Company should be a string",
      "string.empty": "Shipping Company is not allowed to be empty.",
      "any.required": "Shipping Company is required.",
    }),
    price: Joi.string().required().messages({
      "string.base": "Price should be a string",
      "string.empty": "Price is not allowed to be empty.",
      "any.required": "Price is required.",
    }),
  });
  const partnerSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    website: Joi.string().allow("", null).optional(),
    address: Joi.string().required(),
    secondaryAddress: Joi.string().allow("", null).optional(),
    city: Joi.string().allow("", null).optional(),
    stateId: Joi.number().integer().required(),
    zipCode: Joi.number().integer().allow("", null).optional(),
    brandBox: Joi.string().valid("1", "0").required(),
    tier: Joi.string()
      .valid(
        "tier_one",
        "tier_two",
        "tier_three",
        "tier_four",
        "tier_five",
        "tier_six"
      )
      .required(),
    // brandBox: Joi.array().items(Joi.string()).min(1).max(1).messages({
    //   "array.base": "One checkbox should be checked.",
    //   "array.min": "One checkbox should be checked.",
    //   "array.max": "One checkbox should be checked.",
    // }),
    // tier: Joi.array().min(1).max(6).messages({
    //   "array.base": "One checkbox should be checked.",
    //   "array.empty": "One checkbox should be checked.",
    //   "array.min": "One checkbox should be checked.",
    //   "array.max": "Only six checkbox should be checked.",
    // }),
    softDeleted: Joi.date().allow(null, "").optional(),
    //sandBoxKey: Joi.string().allow("", null).optional(),
    liveKey: Joi.string().allow("", null).optional(),
    shippingDetails: Joi.array().items(shippingDetailSchema).min(1).messages({
      "array.base": "Shipping Details should be an array",
      "array.min": "At least one shipping detail is required.",
      "any.required": "Shipping Details are required.",
    }),
  });

  try {
    //const partnerObj = req.body;
    const { shippingDetails, ...partnerObj } = req.body;

    const shippingData = [...shippingDetails];
    //const shippingData = shippingObj.map(({ id, ...rest }) => rest);

    const { error: partnerError } = partnerSchema.validate(partnerObj);

    const partnerValidationErrors = {};
    if (partnerError) {
      partnerError.details.forEach((detail) => {
        partnerValidationErrors[detail.path[0]] = detail.message;
      });
    }
    const partnerId = req.params.partnerId;
    // if (partnerObj.tier && Array.isArray(partnerObj.tier)) {
    //   partnerObj.tier = partnerObj.tier.join(",");
    // } else {
    //   partnerObj.tier = "";
    // }

    // if (partnerObj.brandBox && Array.isArray(partnerObj.brandBox)) {
    //   partnerObj.brandBox = partnerObj.brandBox.join(",");
    // } else {
    //   partnerObj.brandBox = "0";
    // }
    const [updatedRowCount, updatedPartner] = await Partners.update(
      partnerObj,
      {
        where: { id: partnerId },
        returning: true,
      }
    );

    const updatedShippingObj = shippingData.map((shippingDetail) => ({
      ...shippingDetail,
      partnerId: partnerId,
    }));

    try {
      const insertData = updatedShippingObj.filter((item) => item.id === 0);
      const updateData = updatedShippingObj.filter((item) => item.id !== 0);

      const insertDataWithoutId = insertData.map(({ id, ...rest }) => rest);
      // Perform the insertion
      await Shippings.bulkCreate(insertDataWithoutId);

      // Perform the update
      await Promise.all(
        updateData.map(async (item) => {
          await Shippings.update(item, {
            where: { id: item.id },
          });
        })
      );

      res
        .status(200)
        .send(
          ResponseFormatService.responseOk(
            updatedPartner,
            "Partner updated successfully!",
            true
          )
        );
    } catch (e) {
      console.error(e);
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
  } catch (e) {
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};

createPartnerUser = async (req, res) => {
  try {
    const { email, password, roleId, partnerId } = req.body;

    // Validate input using Joi
    const partnerUserSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      roleId: Joi.number().integer().required(),
      partnerId: Joi.number().integer().required(),
    });

    const { error } = partnerUserSchema.validate({
      email,
      password,
      roleId,
      partnerId,
    });

    if (error) {
      const validationErrors = error.details.reduce((errors, detail) => {
        errors[detail.path[0]] = detail.message;
        return errors;
      }, {});

      return res
        .status(400)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            validationErrors,
            false
          )
        );
    }

    const userExist = await Users.findOne({
      paranoid: false,
      where: { email },
    });
    if (userExist) {
      return res
        .status(400)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            { email: "Email already exists" },
            false
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //const staderedPartnerRole = await rolesService.findOneRole("PARTNER");

    const newUser = await Users.create({
      email,
      password: hashedPassword,
      roleId: roleId,
      partnerId,
    });

    await UserRole.create({
      userId: newUser.id,
      roleId: roleId,
    });

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          newUser,
          "Partner user created successfully!",
          true
        )
      );
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Internal server error",
          false
        )
      );
  }
};

const deletePartner = async (req, res) => {
  const partnerId = req.params.id;

  try {
    const partner = await Partners.findByPk(partnerId);

    if (!partner) {
      return res
        .status(404)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            "Partner not found!",
            false
          )
        );
    }

    try {
      const updatedPartner = await Partners.update(
        { softDeleted: true },
        { where: { id: partnerId } }
      );
      const updatedPartnerUser = await Users.update(
        { softDeleted: true, deletedAt: new Date() },
        { where: { partnerId: partnerId } }
      );
      console.log({ updatedPartnerUser });

      res
        .status(200)
        .send(
          ResponseFormatService.responseOk(
            updatedPartner,
            "Partner marked as deleted successfully!",
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

deletePartnerUser = async (req, res) => {
  const partnerId = req.params.partnerId;

  try {
    const user = await Users.findByPk(partnerId);

    if (!user) {
      return res
        .status(404)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            "User not found!",
            false
          )
        );
    }

    try {
      await user.destroy();

      return res
        .status(204)
        .send(
          ResponseFormatService.responseOk(
            user,
            "User deleted successfully!",
            true
          )
        );
    } catch (e) {
      return res
        .status(500)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            e.message | "Something went wrong!",
            false
          )
        );
    }
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};

deleteShippingDetail = async (req, res) => {
  const id = req.params.shippingId;

  try {
    const shipping = await Shippings.destroy({
      where: { id },
    });

    if (shipping === 0) {
      return res
        .status(404)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            "Shipping not found!",
            false
          )
        );
    }
    res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          shipping,
          "Shipping deleted successfully!",
          true
        )
      );
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};
module.exports = {
  allStates,
  all,
  allPartnerUsers,
  allPartnerUsersById,
  createPartner,
  updatePartner,
  createPartnerUser,
  getPartnerDetail,
  deletePartner,
  deletePartnerUser,
  deleteShippingDetail,
  fetchAllRecords,
};
