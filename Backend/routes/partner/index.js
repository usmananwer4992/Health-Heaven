const express = require("express");
var router = express.Router();
const drugType = require("../../controller/drugType.controller.js");
const drugForm = require("../../controller/drugForm.controller.js");
const drugClasses = require("../../controller/drugClass.controller.js");
const drugCategories = require("../../controller/drugCategory.controller.js");
const ageGroups = require("../../controller/ageGroups.controller");
const sigs = require("../../controller/sigs.controller");
const customers = require("../../controller/customer.controller.js");

router.get("/dashboard", (req, res) => {
  res.send("Partner Dashboard");
});
router.use("/roles", require("../roles.routes.js"));
router.use("/permissions", require("../permissions.routes.js"));
router.use("/customers", require("../customer.routes.js"));
router.use("/shippings", require("../shippings.routes.js"));
router.use("/drugs", require("../admin/drugs.routes.js"));
router.use("/transfers", require("../transfer.routes.js"));
router.use("/orders", require("../orders.routes.js"));
router.use("/ageGroups", require("../admin/ageGroups.routes.js"));
router.use("/users", require("../users.routes.js"));

// Read only routes for partner

router.get("/drugForms", drugForm.all);
router.get("/drugTypes", drugType.all);
router.get("/drugClasses", drugClasses.all);

router.get("/drugCategories", drugCategories.all);
router.get("/ageGroup", ageGroups.allAgeGroup);
router.get("/sigs", sigs.all);

module.exports = router;
