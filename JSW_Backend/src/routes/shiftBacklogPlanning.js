const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
  getShiftBacklogPlanning,
  updateShiftHour,
} = require("../controller/shiftBacklogPlanningController");

router.get("/", authenticate, getShiftBacklogPlanning);
router.put("/:hourId", authenticate, updateShiftHour);

module.exports = router;