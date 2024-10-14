const drugClasses = require("../../controller/drugClass.controller.js");
const express = require("express");
var router = express.Router();
router.get("/", drugClasses.all);
router.post("/", drugClasses.create);
router.put("/:id/", drugClasses.update);
router.get("/:id", drugClasses.find);
router.delete("/:id/", drugClasses.deleteDrugClass);
module.exports = router;
