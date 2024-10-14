const drugs = require("../../controller/drugs.controller");
const express = require("express");
var router = express.Router();
router.get("/", drugs.all);
router.post("/", drugs.createDrug);
router.put("/:id", drugs.update);
router.get("/:id", drugs.findOne);
router.delete("/:id", drugs.deleteDrug);
module.exports = router;
