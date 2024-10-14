    const permissions = require("../controller/permission.controller.js");

    var router = require("express").Router();

    router.post("/", permissions.createPermission);

    router.get("/", permissions.findAllPermissions);

    router.get("/:id", permissions.findPermissionById);

    router.put("/:id", permissions.updatePermission);

    router.delete("/:id", permissions.deletePermission);

    router.delete("/", permissions.bulkDeletePermission);

    module.exports = router