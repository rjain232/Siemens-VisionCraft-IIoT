const express = require("express");
const router = express.Router();
const tiaPlcService = require("../services/tiaPortalPlcService");

/**
 * GET /api/plc/tags
 * Returns all current PLC tag values and connection status
 */
router.get("/tags", async (req, res) => {
  try {
    const tags = await tiaPlcService.readAllTags();
    const status = tiaPlcService.getPlcStatus();
    res.json({
      success: true,
      status,
      tags,
    });
  } catch (error) {
    console.error("[PLC Routes] Read tags error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/plc/write-tag
 * Body: { tagName: "TargetJPH", value: 50 }
 */
router.post("/write-tag", async (req, res) => {
  try {
    const { tagName, value } = req.body;
    if (!tagName || value === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Both "tagName" and "value" fields are required.',
      });
    }

    const result = await tiaPlcService.writeTag(tagName, value);
    res.json({ success: true, result });
  } catch (error) {
    console.error("[PLC Routes] Write tag error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/plc/status
 */
router.get("/status", (req, res) => {
  res.json({ success: true, status: tiaPlcService.getPlcStatus() });
});

module.exports = router;
