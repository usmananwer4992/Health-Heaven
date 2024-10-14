const ageGroups = require("../../controller/ageGroups.controller");
const express = require("express");
var router = express.Router();
router.get("/", ageGroups.allAgeGroup);
router.post("/", ageGroups.createAgeGroup);
router.put("/:id/", ageGroups.updateAgeGroup);
router.get("/:id", ageGroups.findAgeGroup);
router.delete("/:id/", ageGroups.deleteAgeGroup);
module.exports = router;
