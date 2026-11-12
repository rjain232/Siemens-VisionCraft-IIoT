const express = require("express");
const router = express.Router();
const subscriptionController = require("../controller/subscriptionController");

router.get("/", subscriptionController.getSubscriptions);
router.post("/", subscriptionController.createSubscription);
router.put("/:id", subscriptionController.updateSubscription);
router.delete("/:id", subscriptionController.deleteSubscription);
router.post("/:id/dispatch", subscriptionController.dispatchSubscriptionNow);
router.post("/:id/record-success", subscriptionController.recordDispatchSuccess);
router.post("/dispatch-cadence", subscriptionController.dispatchCadenceNow);

module.exports = router;
