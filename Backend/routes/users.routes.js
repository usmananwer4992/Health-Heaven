const users = require("../controller/user.controller.js");

var router = require("express").Router();
router.get("/", users.findAllUsers);
router.get("/:id", users.findUserById);
router.put("/:id", users.updateUser);
router.delete("/:id", users.deleteUser);
router.get("/role/PartnerUsers", users.findAllUserWithRolePartners);
router.get("/specific/partner", users.allUsersSpecificByPartner);
router.post("/internal/staff", users.createInternalStaffUser);
router.get("/internal/staff", users.findAllUsers);
router.put("/internal/:id", users.updateInternalUser);
module.exports = router;