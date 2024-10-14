const drugForm = require("../../controller/drugForm.controller.js");
const express = require("express");
var router = express.Router();
router.get("/", drugForm.all);
router.post("/", drugForm.create);
router.put("/:id/", drugForm.update);
router.get("/:id", drugForm.find);
router.delete("/:id/", drugForm.deleteDrugForm);
module.exports = router;
