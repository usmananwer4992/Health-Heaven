const orders = require("../controller/orders.controller");

var router = require("express").Router();
router.get("/prerequisite", orders.getPrerequisite);
router.get("/", orders.all);
router.post("/", orders.create);
router.post("/h2o/", orders.createH2O);
// router.get("/:id", orders.find);
router.put("/:id", orders.update);
router.get("/:id", orders.find);
router.get("/:id/view", orders.orderView);
router.delete("/:id/", orders.deleteOrder);
router.put("/:id/details", orders.updateShipping);

module.exports = router;
