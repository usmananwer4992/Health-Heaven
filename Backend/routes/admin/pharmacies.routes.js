const pharmacies = require("../../controller/pharmacies.controller");
const express = require("express");
var router = express.Router();
router.get("/", pharmacies.findAllPharmacies);
router.post("/", pharmacies.createPharmacy);
router.put("/:id/", pharmacies.updatePharmacy);
router.get("/:id", pharmacies.findOnePharmacyByPk);
router.delete("/:id/", pharmacies.deletePharmacy);
module.exports = router;
