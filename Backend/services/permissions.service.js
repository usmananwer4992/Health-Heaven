const db = require("../models");
class PermissionService {
  constructor() {
    this.Permissions = db.permissions;
    this.RolePermissions = db.permissionRoles;
  }

  async findAllPermissions() {
    try {
      return await this.Permissions.findAll();
    } catch (e) {
      throw new Error("Somthing went wrong while fetching the Permissions!")
    }
  }

  async findOnePermission(params) {
    try {
      return await this.Permissions.findOne({
        where: {
          slug: params,
        },
      });
    } catch (e) {
      throw new Error("Some error occured while fetching the Permission ");
    }
  }

  async findOnePermissionByPk(pk) {
    try {
      return await this.Permissions.findByPk(pk);
    } catch (e) {
      throw new Error("Some error occured while fetching the Permission ");
    }
  }

  async createPermission(params) {
    try {
      return await this.Permissions.create(params);
    } catch (e) {
      throw new Error("somthing went wrong while creating Permission");
    }
  }

  async updatePermission(params, id) {
    try {
      return await this.Permissions.update(params, {
        where: { id: id },
      });
    } catch (e) {
      throw new Error("somthing went wrong while Updating Permission");
    }
  }

  async deletePermission(id) {
    try {
      return await this.Permissions.destroy({
        where: { id: id },
      });
    } catch (e) {
      throw new Error("somthing went wrong while deleting Permission");
    }
  }
  async bulkDeletePermission(ids) {
    try {
      return await this.Permissions.destroy({
        where: { id: ids },
      });
    } catch (e) {
      throw new Error("somthing went wrong while deleting Permissions");
    }
  }
  async deleteAllPermissionRoles(id) {
    try {
      return await this.RolePermissions.destroy({
        where: { roleId: id },
      });
    } catch (e) {
      throw new Error(e || "somthing went wrong while deleting Permissions");
    }
  }

  async createRolePermissions(roleId, permissionId) {
    try {
      return await this.RolePermissions.create({roleId, permissionId});
    } catch (e) {
      throw new Error(e || "somthing went wrong while creating the Permissions");
    }
  }

  async findOrCreate(slug){
    try{

      const [permission, created] = await this.Permissions.findOrCreate({
        where: { slug: slug },
        defaults: {
          slug: slug,
          name: slug.toLowerCase()
        }
      });
      return permission
    }catch(e){
      throw Error(e+'Something went wrong')
    }
  }
}

module.exports = new PermissionService();