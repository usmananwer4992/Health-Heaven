const db = require("../models");
class RoleService {
  constructor() {
    this.Roles = db.roles;
  }

  async findAllRoles(req) {
    try {
      const { sortBy, sortOrder } = req.query;
      const order = [];

      const defaultSortBy = sortBy || "createdAt";
      order.push([defaultSortBy, sortOrder || "asc"]);
      return await this.Roles.findAll({ order });
    } catch (e) {
      throw new Error("Somthing went wrong while fetching the Roles!");
    }
  }

  async findOneRole(params) {
    try {
      return await this.Roles.findOne({
        where: {
          slug: params,
        },
      });
    } catch (e) {
      throw new Error("Some error occured while fetching the Role ");
    }
  }

  async findOneRoleByPk(pk) {
    try {
      console.log('sdfsfdsdf')
      return await this.Roles.findByPk(pk, {
        include: [
          {
            model: db.permissions,
            as: "permission",
          },
        ],
      });
    } catch (e) {
      throw new Error("Some error occured while fetching the Role ");
    }
  }

  async createRole(params) {
    try {
      return await this.Roles.create(params);
    } catch (e) {
      throw new Error("somthing went wrong while creating Role");
    }
  }

  async updateRole(params, id) {
    try {
      return await this.Roles.update(params, {
        where: { id: id },
      });
    } catch (e) {
      throw new Error("somthing went wrong while Updating Role");
    }
  }

  async deleteRole(id) {
    try {
      return await this.Roles.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("somthing went wrong while deleting Role");
    }
  }
  async bulkDeleteRole(ids) {
    try {
      return await this.Roles.destroy({
        where: { id: ids },
      });
    } catch (e) {
      throw new Error("somthing went wrong while deleting Roles");
    }
  }

  // async
}

module.exports = new RoleService();
