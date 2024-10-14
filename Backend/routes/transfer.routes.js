const transfers = require("../controller/transfer.controller.js");

var router = require("express").Router();

router.get("/prerequisite", transfers.getPrerequisite);

router.post("/", transfers.createTransfer);

router.get("/", transfers.all);

router.get("/statuses", transfers.fetchStatuses);

router.get("/days", transfers.fetchDays);

router.get("/:id", transfers.findOne);

router.put("/:id", transfers.update);

router.delete("/:id", transfers.deleteTransfer);



// Add any additional routes ss to transfers here

module.exports = router;
