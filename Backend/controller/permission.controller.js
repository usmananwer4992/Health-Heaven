const PermissionService = require("../services/permissions.service");
const ResponseFormatService = require("../services/responseFormat.service");

createPermission = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error("Content can not be empty!");
    }

    const permission = {
      name: req.body.name,
      slug: req.body.name.toUpperCase(),
      description: req.body.description,
    };

    const existingPermission = await PermissionService.findOnePermission(
      permission.name.toUpperCase()
    );
    if (existingPermission) {
      throw new Error(
        `Permission with this slug: ${permission.name.toUpperCase()} already exists`
      );
    }

    const createdPermission = await PermissionService.createPermission(
      permission
    );

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { permission: createdPermission },
          "Permission created SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while creating permission!",
          false
        )
      );
  }
};

findAllPermissions = async (req, res) => {
  try {
    const permissions = await PermissionService.findAllPermissions();
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { permissions: permissions },
          "Permissions fetched SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching permissions",
          false
        )
      );
  }
};

findPermissionById = async (req, res) => {
  const id = req.params.id;
  try {
    const permission = await PermissionService.findOnePermissionByPk(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { permission: permission },
          "Permission fetched SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while fetching permission",
          false
        )
      );
  }
};

deletePermission = async (req, res) => {
  const id = req.params.id;
  try {
    const permission = await PermissionService.deletePermission(id);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { permission: permission },
          "Permission Deleted SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting permission",
          false
        )
      );
  }
};

updatePermission = async (req, res) => {
  const id = req.params.id;

  const permission = {
    name: req.body?.name,
    slug: req.body?.name.toUpperCase(),
    description: req.body?.description,
  };

  try {
    const existingPermission = await PermissionService.findOnePermissionByPk(
      id
    );
    if (!existingPermission) {
      throw new Error(`Permission with id: ${id} not found`);
    }

    const existingPermissionSlug = await PermissionService.findOnePermission(
      permission.name.toUpperCase()
    );
    if (existingPermissionSlug) {
      throw new Error(
        `Permission with this slug: ${permission.slug} already exists cannot update with this slug`
      );
    }
    const updatePermission = await PermissionService.updatePermission(
      permission,
      id
    );

    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { permission: updatePermission },
          "Permission updated SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong while updating permission!",
          false
        )
      );
  }
};

bulkDeletePermission = async (req, res) => {
  try {
    const deleteIds = req.body.deleteIds;

    const permission = await PermissionService.bulkDeletePermission(deleteIds);
    return res
      .status(200)
      .send(
        ResponseFormatService.responseOk(
          { permission: permission },
          "Permission Deleted SuccessFully!",
          true
        )
      );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Some error occurred while deleting permission",
          false
        )
      );
  }
};
module.exports = {
  createPermission,
  findAllPermissions,
  findPermissionById,
  deletePermission,
  updatePermission,
  bulkDeletePermission,
};
