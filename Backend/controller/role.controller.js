const RoleService = require("../services/roles.service");
const ResponseFormatService = require("../services/responseFormat.service");
const permissionsService = require("../services/permissions.service");
const UserService = require("../services/users.service");
const rolesService = require("../services/roles.service");

createRole = async (req, res) => {
  if (!req.body.name) {
    throw new Error("Content can not be empty!");
  }
  const role = {
    name: req.body.name,
    slug: req.body.name.toUpperCase(),
    description: req.body.description,
  };

  try {
    const existingRole = await RoleService.findOneRole(role.name.toUpperCase());
    if (existingRole) {
      throw new Error(
        `Role with this slug: ${role.name.toUpperCase()} already exists`
      );
    }

    const createdRole = await RoleService.createRole(role);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { role: createdRole },
          "Role created SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while creating role!",
          false
        )
      );
  }
};

findAllRoles = async (req, res) => {
  try {
    const roles = await RoleService.findAllRoles(req);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { roles: roles },
          "Roles fetched SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching roles",
          false
        )
      );
  }
};

findRoleById = async (req, res) => {
  const id = req.params.id;
  console.log("################", id);
  try {
    const role = await RoleService.findOneRoleByPk(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { role: role },
          "Role fetched SuccessFully!",
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

deleteRole = async (req, res) => {
  const id = req.params.id;
  try {
    const role = await RoleService.deleteRole(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { role: role },
          "Role Deleted SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting role",
          false
        )
      );
  }
};

updateRole = async (req, res) => {
  const id = req.params.id;

  const role = {
    name: req.body?.name,
    slug: req.body?.name.toUpperCase(),
    description: req.body?.description,
  };

  try {
    const existingRole = await RoleService.findOneRoleByPk(id);
    if (!existingRole) {
      throw new Error(`Role with id: ${id} not found`);
    }

    const existingRoleSlug = await RoleService.findOneRole(
      role.name.toUpperCase()
    );
    if (existingRoleSlug) {
      throw new Error(
        `Role with this slug: ${role.slug} already exists cannot update with this slug`
      );
    }
    const updateRole = await RoleService.updateRole(role, id);

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { role: updateRole },
          "Role updated SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating role!",
          false
        )
      );
  }
};

bulkDeleteRole = async (req, res) => {
  try {
    const deleteIds = req.body.deleteIds;

    const role = await RoleService.bulkDeleteRole(deleteIds);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { role: role },
          "Role Deleted SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting role",
          false
        )
      );
  }
};
addRolePermissions = async (req, res) => {
  try {
    let partnerId = req.body.partnerId;
    let roleId = req.body.roleId;

    if (partnerId) {
      const partner = await UserService.Partners.findByPk(partnerId);
      const role = {
        name: `${partner.dataValues.name} Partner Role`,
        slug: `${partner.dataValues.name}_PARTNER_Role`.toLocaleUpperCase(),
        description: `this role is created and assigned to ${partner.dataValues.name} users.`,
      };
      const newRole = await rolesService.createRole(role);
      roleId = newRole.id;
      console.log(newRole, "==============new role=================", roleId);

      const updateAllUsers = await UserService.updateAllUsers({
        roleId,
        partnerId,
      });
    }

    const rolePermissions = req.body.rolePermissions;

    const role = await RoleService.findOneRoleByPk(roleId);

    if (!role) {
      throw new Error(" Role Not Found");
    }
    const permissionsArray = [];

    const permissionsIds = [];

    const modules = Object.keys(rolePermissions);

    modules.forEach((module) => {
      Object.entries(rolePermissions[module]).forEach((permission) => {
        const permissionSlug =
          module !== "default" ? `${permission[0]}_${module}` : permission[0];
        permissionsArray.push({ name: permissionSlug, value: permission[1] });
      });
    });

    for (const per of permissionsArray) {
      const data = await permissionsService.findOrCreate(
        per.name.toUpperCase()
      );
      permissionsIds.push({ id: data.dataValues.id, value: per.value });
    }

    await permissionsService.deleteAllPermissionRoles(roleId);

    for (const permId of permissionsIds) {
      if (permId.value) {
        await permissionsService.createRolePermissions(roleId, permId.id);
      }
    }

    return res.status(200).send(
      ResponseFormatService.responseOk(
        {
          role,
          roleId,
          rolePermissions,
          permissionsArray,
          permissionsIds,
        },
        "Role Data",
        true
      )
    );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "An error occured",
          false
        )
      );
  }
};
module.exports = {
  createRole,
  findAllRoles,
  findRoleById,
  deleteRole,
  updateRole,
  bulkDeleteRole,
  addRolePermissions,
};
