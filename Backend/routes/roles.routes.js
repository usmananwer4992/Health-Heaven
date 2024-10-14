
const roles = require("../controller/role.controller.js");

  var router = require("express").Router();
  router.post("/", roles.createRole);
  router.get("/", roles.findAllRoles);
  router.get("/:id", roles.findRoleById);
  router.put("/:id", roles.updateRole);
  router.delete("/:id", roles.deleteRole);
  router.delete("/", roles.bulkDeleteRole);
  router.post("/role_permissions", roles.addRolePermissions)


module.exports = router;