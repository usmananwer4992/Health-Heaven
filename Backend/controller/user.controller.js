const UserService = require("../services/users.service");
const ResponseFormatService = require("../services/responseFormat.service");
const { Roles } = require("../services/roles.service");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");
const Joi = require("joi");
const Users = db.users;

findAllUsers = async (req, res) => {
  try {
    const users = await UserService.findAllUsers(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          users ,
          "Users fetched SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching users",
          false
        )
      );
  }
};
allUsersSpecificByPartner = async (req, res) => {
  try {
    const users = await UserService.findAllUsersSpecificByPartner(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { users: users },
          "Users fetched SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching users",
          false
        )
      );
  }
};

findUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserService.findOneUser({
      configKey: "id",
      key: id,
    });
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { user: user },
          "User fetched SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching role",
          false
        )
      );
  }
};

updateUser = async (req, res) => {
  try {
    const { email, password, roleId, partnerId } = req.body;

    // Validate input using Joi
    const partnerUserSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string(),
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
    const userId = req.params.id;
    const userExist = await Users.findOne({
      paranoid: false,
      where: { email, id: { [Op.not]: userId } },
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

    const user = await Users.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res
        .status(400)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            { user: "User not found" },
            false
          )
        );
    }
    // Only hash the password if it's provided
    //    let hashedPassword = password;
    if (password) {
      const isSamePassword = await bcrypt.compare(password, user.password);

      if (isSamePassword) {
        return res
          .status(400)
          .send(
            ResponseFormatService.responseInternalServer(
              null,
              { password: "New password must be different" },
              false
            )
          );
      }

      // Passwords are different, hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserService.updateUser(
        {
          email,
          password: hashedPassword,
          roleId,
          partnerId,
        },
        userId
      );
    } else {
      await UserService.updateUser(
        {
          email,
          roleId,
          partnerId,
        },
        userId
      );
    }

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          "Partner User",
          "Partner user updated successfully!",
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
updateUser = async (req, res) => {
  try {
    const { email, password, roleId, partnerId } = req.body;

    // Validate input using Joi
    const partnerUserSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string(),
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
    const userId = req.params.id;
    const userExist = await Users.findOne({
      paranoid: false,
      where: { email, id: { [Op.not]: userId } },
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

    const user = await Users.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res
        .status(400)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            { user: "User not found" },
            false
          )
        );
    }
    // Only hash the password if it's provided
    //    let hashedPassword = password;
    if (password) {
      const isSamePassword = await bcrypt.compare(password, user.password);

      if (isSamePassword) {
        return res
          .status(400)
          .send(
            ResponseFormatService.responseInternalServer(
              null,
              { password: "New password must be different" },
              false
            )
          );
      }

      // Passwords are different, hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserService.updateUser(
        {
          email,
          password: hashedPassword,
          roleId,
          partnerId,
        },
        userId
      );
    } else {
      await UserService.updateUser(
        {
          email,
          roleId,
          partnerId,
        },
        userId
      );
    }

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          "Partner User",
          "Partner user updated successfully!",
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
updateInternalUser = async (req, res) => {
  try {
    const { email, password, roleId } = req.body;

    // Validate input using Joi
    const partnerUserSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string(),
      roleId: Joi.number().integer().required(),
      // partnerId: Joi.number().integer().required(),
    });

    const { error } = partnerUserSchema.validate({
      email,
      password,
      roleId,
      // partnerId,
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
    const userId = req.params.id;
    const userExist = await Users.findOne({
      paranoid: false,
      where: { email, id: { [Op.not]: userId } },
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

    const user = await Users.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res
        .status(400)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            { user: "User not found" },
            false
          )
        );
    }
    // Only hash the password if it's provided
    //    let hashedPassword = password;
    if (password) {
      const isSamePassword = await bcrypt.compare(password, user.password);

      if (isSamePassword) {
        return res
          .status(400)
          .send(
            ResponseFormatService.responseInternalServer(
              null,
              { password: "New password must be different" },
              false
            )
          );
      }

      // Passwords are different, hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserService.updateUser(
        {
          email,
          password: hashedPassword,
          roleId,
          // partnerId,
        },
        userId
      );
    } else {
      await UserService.updateUser(
        {
          email,
          roleId,
          // partnerId,
        },
        userId
      );
    }

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          "Partner User",
          "Partner user updated successfully!",
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

findAllUserWithRolePartners = async (req, res) => {
  try {
    const role = await Roles.findOne({
      where: { slug: "PARTNER" },
    });
    const users = await UserService.findUserRole(role.id);
    // return res.send({users, id:role.id})
    const uniquePartners = new Set();
    const resultArray = users.filter((item) => {
      const partner = item.Partner;
      if (!partner) {
        return false; // Exclude null values
      }
      const partnerId = partner.id;
      if (uniquePartners.has(partnerId)) {
        return false; // Exclude duplicates
      }
      uniquePartners.add(partnerId);
      return true;
    });
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { users: resultArray },
          "Users fetched SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching users",
          false
        )
      );
  }
};
createInternalStaffUser = async (req, res) => {
  try {
    const { email, password, roleId } = req.body;

    // Validate input using Joi
    const internalStaffUserSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      roleId: Joi.number().integer().required(),
      // partnerId: Joi.number().integer().required(),
    });

    const { error } = internalStaffUserSchema.validate({
      email,
      password,
      roleId,
      // partnerId,
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
      roleId: "2",
      partnerId: null,
    });

  //   await UserRole.create({
  //     userId: newUser.id,
  //     roleId: roleId,
  //   });

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          newUser,
          "Internal Staff User created successfully!",
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
deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await UserService.deleteUser(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { deleted: data },
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
          e.message || "Some error occurred while deleting the User",
          false
        )
      );
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  updateUser,
  findAllUserWithRolePartners,
  allUsersSpecificByPartner,
  createInternalStaffUser,
  deleteUser,
  updateInternalUser
};
