const orders = require("../controller/orders.controller.js");

var router = require("express").Router();

router.post("/", orders.imiOrder);
router.get("/", orders.imiOrderPrequsite);

module.exports = router