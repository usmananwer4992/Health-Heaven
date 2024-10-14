const sigs = require("../../controller/sigs.controller");
const express = require("express");
var router = express.Router();
router.get("/", sigs.all);
router.post("/", sigs.create);
router.put("/:id/", sigs.update);
router.get("/:id", sigs.find);
router.delete("/:id/", sigs.deleteSig);
module.exports = router;
