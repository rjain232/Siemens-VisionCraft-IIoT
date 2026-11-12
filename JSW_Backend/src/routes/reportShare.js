const express = require("express");
const router = express.Router();
const reportShareController = require("../controller/reportShareController");

router.post("/share-email", reportShareController.shareReportsViaEmail);
router.post("/share-by-email", reportShareController.shareReportsViaEmail);
router.get("/smtp-status", reportShareController.verifySmtpStatus);

module.exports = router;
