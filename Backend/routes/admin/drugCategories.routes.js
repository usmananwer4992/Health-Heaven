const drugCategories = require("../../controller/drugCategory.controller.js");
const express = require("express");
var router = express.Router();
router.get("/", drugCategories.all);
router.post("/", drugCategories.create);
router.put("/:id/", drugCategories.update);
router.get("/:id", drugCategories.find);
router.delete("/:id/", drugCategories.deleteDrugCategory);
module.exports = router;
