const drugType = require("../../controller/drugType.controller.js");
const express = require("express");
var router = express.Router();
router.get("/", drugType.all);
router.post("/", drugType.create);
router.put("/:id/", drugType.update);
router.get("/:id", drugType.find);
router.delete("/:id/", drugType.deleteDrugType);
module.exports = router;
