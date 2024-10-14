const express = require("express");
var router = express.Router();
const shippings = require("../controller/shippings.controller");
router.get("/", shippings.all);
module.exports = router;
