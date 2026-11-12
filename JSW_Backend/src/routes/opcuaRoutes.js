const express = require("express");
const router = express.Router();
const opcuaService = require("../services/opcuaService");
const mockPlcService = require("../services/mockPlcService");

/**
 * GET /api/opcua/status
 * Get connection status and currently subscribed tags
 */
router.get("/status", (req, res) => {
  res.json({
    success: true,
    data: opcuaService.getStatus(),
  });
});

/**
 * POST /api/opcua/connect
 * Connect to an OPC UA server endpoint
 * Body: { endpointUrl?: string }
 */
router.post("/connect", async (req, res, next) => {
  try {
    const { endpointUrl } = req.body;
    await opcuaService.connect(endpointUrl);
    res.json({
      success: true,
      message: "Connected to OPC UA server",
      data: opcuaService.getStatus(),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/opcua/disconnect
 * Disconnect from the OPC UA server
 */
router.post("/disconnect", async (req, res, next) => {
  try {
    await opcuaService.disconnect();
    res.json({
      success: true,
      message: "Disconnected from OPC UA server",
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/opcua/read
 * Read one or more OPC UA nodes
 * Query: ?nodeId=ns=1;s=Line1.TargetJPH or multiple ?nodeId=...&nodeId=...
 */
router.get("/read", async (req, res, next) => {
  try {
    const { nodeId } = req.query;
    if (!nodeId) {
      return res.status(400).json({
        success: false,
        message: "nodeId query parameter is required",
      });
    }

    const data = await opcuaService.readNode(nodeId);
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/opcua/write
 * Write a value to an OPC UA node
 * Body: { nodeId: string, value: any, dataType?: string }
 */
router.post("/write", async (req, res, next) => {
  try {
    const { nodeId, value, dataType } = req.body;
    if (!nodeId || value === undefined) {
      return res.status(400).json({
        success: false,
        message: "nodeId and value are required in body",
      });
    }

    const result = await opcuaService.writeNode(nodeId, value, dataType || "Double");
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/opcua/subscribe
 * Register a node to be monitored
 * Body: { nodeId: string, samplingInterval?: number }
 */
router.post("/subscribe", async (req, res, next) => {
  try {
    const { nodeId, samplingInterval } = req.body;
    if (!nodeId) {
      return res.status(400).json({
        success: false,
        message: "nodeId is required in body",
      });
    }

    await opcuaService.subscribeTag(nodeId, null, samplingInterval || 250);
    res.json({
      success: true,
      message: `Subscribed to ${nodeId}`,
      data: opcuaService.getStatus(),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/opcua/unsubscribe
 * Unsubscribe a monitored node
 * Body: { nodeId: string }
 */
router.post("/unsubscribe", async (req, res, next) => {
  try {
    const { nodeId } = req.body;
    if (!nodeId) {
      return res.status(400).json({
        success: false,
        message: "nodeId is required in body",
      });
    }

    await opcuaService.unsubscribeTag(nodeId);
    res.json({
      success: true,
      message: `Unsubscribed from ${nodeId}`,
      data: opcuaService.getStatus(),
    });
  } catch (err) {
    next(err);
  }
});

// ═════════════════════════════════════════════════════════════════════
// MOCK PLC SIMULATOR MANAGEMENT ENDPOINTS
// ═════════════════════════════════════════════════════════════════════

/**
 * GET /api/opcua/mock-plc/status
 * Get the current operational status and tag telemetry of the Mock PLC
 */
router.get("/mock-plc/status", (req, res) => {
  res.json({
    success: true,
    data: mockPlcService.getState(),
  });
});

/**
 * POST /api/opcua/mock-plc/start
 * Start the Mock PLC OPC UA server instance
 */
router.post("/mock-plc/start", async (req, res, next) => {
  try {
    const endpointUrl = await mockPlcService.start();
    res.json({
      success: true,
      message: "Mock PLC server started successfully",
      endpointUrl,
      data: mockPlcService.getState(),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/opcua/mock-plc/stop
 * Stop the Mock PLC OPC UA server instance
 */
router.post("/mock-plc/stop", async (req, res, next) => {
  try {
    await mockPlcService.stop();
    res.json({
      success: true,
      message: "Mock PLC server stopped successfully",
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/opcua/mock-plc/simulate
 * Forcefully override a simulated tag (e.g. simulate temperature spike, emergency stop, etc.)
 * Body: { path: "line1.emergencyStop" | "robot1.temperature" | "line1.targetJPH", value: any }
 */
router.post("/mock-plc/simulate", (req, res) => {
  const { path, value } = req.body;
  if (!path || value === undefined) {
    return res.status(400).json({
      success: false,
      message: "path and value are required in body (e.g. { path: 'robot1.temperature', value: 85.5 })",
    });
  }

  const updated = mockPlcService.setTagValue(path, value);
  if (!updated) {
    return res.status(400).json({
      success: false,
      message: `Invalid tag path: ${path}`,
    });
  }

  res.json({
    success: true,
    message: `Overrode simulated tag ${path}`,
    currentValue: value,
    data: mockPlcService.getState(),
  });
});

module.exports = router;

