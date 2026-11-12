const express = require("express");
const router = express.Router();
const cloudIotService = require("../services/cloudIotService");
const { authenticate } = require("../middleware/auth");

/**
 * GET /api/cloud-iot/status
 * Get connection status, cloud provider, and current Digital Twin state
 */
router.get("/status", (req, res) => {
  res.json(cloudIotService.getStatus());
});

/**
 * POST /api/cloud-iot/telemetry
 * Ingest telemetry from factory sensors/PLCs and stream to Azure / AWS IoT
 * Body: { jph?: number, oee?: number, robotId?: string, weldCurrent?: number, temperature?: number }
 */
router.post("/telemetry", async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ success: false, message: "Telemetry payload cannot be empty." });
    }

    const result = await cloudIotService.publishTelemetry(payload);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/cloud-iot/twin
 * Update Digital Twin desired configurations (e.g. target JPH, schedules)
 * Body: { targetJPH?: number, shiftSchedule?: string, ... }
 */
router.put("/twin", authenticate, async (req, res, next) => {
  try {
    const desired = req.body;
    if (!desired || Object.keys(desired).length === 0) {
      return res.status(400).json({ success: false, message: "Desired properties cannot be empty." });
    }

    const result = await cloudIotService.updateTwin(desired);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
