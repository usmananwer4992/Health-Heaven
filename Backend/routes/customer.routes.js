const customers = require("../controller/customer.controller.js");

var router = require("express").Router();

router.post("/", customers.createCustomer);

router.get("/", customers.findAllCustomers);

router.get("/:id", customers.findOneCustomerByPk);

router.put("/:id", customers.updateCustomer);

router.delete("/:id", customers.deleteCustomer);

// router.delete("/", customers.bulkDeletePermission);

module.exports = router