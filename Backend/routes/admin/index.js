const express = require("express");
var router = express.Router();
router.use("/partners", require("./partner.routes.js"));
router.use("/roles", require("../roles.routes.js"));
router.use("/permissions", require("../permissions.routes.js"));
router.use("/customers", require("../customer.routes.js"));
router.use("/transfers", require("../transfer.routes.js"));
router.use("/drugCategories", require("./drugCategories.routes.js"));
router.use("/drugClasses", require("./drugClasses.routes.js"));
router.use("/drugForms", require("./drugForm.routes.js"));
router.use("/drugTypes", require("./drugType.routes.js"));
router.use("/ageGroups", require("./ageGroups.routes.js"));
router.use("/drugs", require("./drugs.routes.js"));
router.use("/users", require("../users.routes.js"));
router.use("/pharmacies", require("./pharmacies.routes.js"));
router.use("/sigs", require("./sigs.routes.js"));
router.use("/orders", require("../orders.routes.js"));
router.use("/shippings", require("../shippings.routes.js"));

module.exports = router;


