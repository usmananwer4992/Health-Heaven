const db = require("../models");
const { Op } = require("sequelize");
class UserService {
  constructor() {
    this.Roles = db.roles;
    this.Users = db.users;
    this.Permissions = db.permissions;
    this.Modules = db.modules;
    this.Partners = db.partners;
    this.UserRoles = db.userRoles;
    this.Op = Op;
  }

  async findOneUser(params) {
    try {
      return await this.Users.findOne({
        where: {
          [params.configKey]: params.key,
          partnerId: {
            [Op.ne]: null, // [Op.ne] stands for "not equal"
          },
        },
        include: [
          {
            model: this.Roles,
            as: "Role",
          },
          {
            model: this.Partners,
            // as: "Role",
          },
        ],
      });
    } catch (e) {
      throw new Error(e + "Somthing went wrong while fetching the Roles!");
    }
  }

  async updateAllUsers(params) {
    try {
      return await this.Users.update(
        { roleId: params.roleId },
        {
          where: { partnerId: params.partnerId },
        }
      );
    } catch (e) {
      throw new Error("Somthing went wrong while fetching the Users!");
    }
  }
  async findAllUsers(req) {
      try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const { id, name, email, sortBy, sortOrder, roleId} = req.query;
        const offset = (page - 1) * pageSize;
    
        let whereClauseUser = {};
    // console.log({roleId})
        if (id && id.trim() !== "") {
          whereClauseUser.id = id;
        }
        if (roleId && roleId.trim() !== "") {
          whereClauseUser.roleId = roleId;
        }
        if (email && email.trim() !== "") {
          whereClauseUser.email = {
            [Op.iLike]: `%${email}%`,
          };
        }
        // Block Soft Delete
        whereClauseUser.softDeleted = false;
            
        const order = sortBy
      ? [[sortBy, sortOrder || "desc"]]
      : [["createdAt", "desc"]];
    
        const partner_users = await this.Users.findAll({
          where: whereClauseUser,
          limit: pageSize,
          offset,
          order,
        });
    
        const totalCount = await this.Users.count({
          where: whereClauseUser,
        });
    
        return  { users: partner_users, totalCount }
      } catch (e) {
        throw new Error(e);

       
      }
  }
  async findAllUsersSpecificByPartner(req) {
    try {
      const limit = parseInt(req.query.pageSize) || 10;
      const page = parseInt(req.query.page) || 1;
      const offset = (page - 1) * limit;
      const { id, name, email, sortBy, sortOrder } = req.query;
      let whereClauseUser = {
        partnerId: req.query.partnerId,
      };
      let whereClausePartner = {};

      if (id && id.trim() !== "") {
        whereClauseUser.id = id;
      }

      // if (name && name.trim() !== "") {
      //   whereClausePartner.name = {
      //     [Op.iLike]: `%${name}%`,
      //   };
      // }

      if (email && email.trim() !== "") {
        whereClauseUser.email = {
          [Op.iLike]: `%${email}%`,
        };
      }

      const order = [];

      const defaultSortBy = sortBy || "createdAt";
      order.push([defaultSortBy, sortOrder || "asc"]);
      return await this.Users.findAndCountAll({
        where: whereClauseUser,
        include: [{ model: this.Partners, attributes: ["id", "name"] }],
        order,
        limit,
        offset,
      });
    } catch (e) {
      throw new Error("Somthing went wrong while fetching the Users!");
    }
  }

  async findUserRole(id) {
    console.log(id, "////////  ");
    try {
      return await this.Users.findAll({
        where: {
          roleId: id,
        },
        include: [{ model: this.Partners, attributes: ["id", "name"] }],
        attributes: [],
        distinct: true,
      });
    } catch (e) {
      throw new Error(e + "Somthing went wrong while fetching the Users!");
    }
  }

  async findOneUserByPk(pk) {
    try {
      return await this.Users.findByPk(pk);
    } catch (e) {
      throw new Error("Some error occured while fetching the User ");
    }
  }

  async createUser(params) {
    try {
      return await this.Users.create(params);
    } catch (e) {
      throw new Error("somthing went wrong while creating User");
    }
  }

  async updateUser(params, id) {
    try {
      return await this.Users.update(params, {
        where: { id: id },
      });
    } catch (e) {
      throw new Error("somthing went wrong while Updating User");
    }
  }

  async deleteUser(id) {
    try {
      return await this.Users.update(
        { softDeleted: true, deletedAt: new Date() },
        {
          where: { id: id },
        }
      );
    } catch (e) {
      throw new Error("somthing went wrong while deleting User");
    }
  }
  async bulkDeleteUser(ids) {
    try {
      return await this.Users.destroy({
        where: { id: ids },
      });
    } catch (e) {
      throw new Error("somthing went wrong while deleting Users");
    }
  }
}

module.exports = new UserService();
