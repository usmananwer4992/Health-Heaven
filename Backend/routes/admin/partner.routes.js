const partners = require("../../controller/partner.controller.js");
const express = require("express");
var router = express.Router();
router.get("/", partners.all);
router.post("/", partners.createPartner);
router.put("/:partnerId/", partners.updatePartner);
//router.put("/:id/delete", partners.deletePartner);
router.delete("/:id/", partners.deletePartner);
router.delete("/:partnerId/user", partners.deletePartnerUser);

router.get("/:partnerId/users", partners.allPartnerUsers);
router.get("/:partnerId/detail", partners.getPartnerDetail);
router.post("/:partnerId/users", partners.createPartnerUser);
router.get("/users", partners.allPartnerUsers);
router.get("/states", partners.allStates);
router.delete(
  "/:shippingId/removeShippingDetail",
  partners.deleteShippingDetail
);
router.get("/list", partners.fetchAllRecords);

module.exports = router;
