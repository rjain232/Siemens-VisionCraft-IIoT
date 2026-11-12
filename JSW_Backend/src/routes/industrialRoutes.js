const express = require("express");
const router = express.Router();
const mockPlantService = require("../services/mockIndustrialPlantService");
const opcuaService = require("../services/opcuaService");

/**
 * GET /api/industrial/overview
 * Unified dashboard state merging PLC, DCS, SCADA, and OMS telemetry
 */
router.get("/overview", (req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: mockPlantService.getState(),
  });
});

/**
 * GET /api/industrial/plc
 * Discrete PLC controller status (Lines, Robots, Interlocks, Safety)
 */
router.get("/plc", (req, res) => {
  res.json({
    success: true,
    system: "PLC (Discrete Line & Robot Controller)",
    data: mockPlantService.getState().systems.plc,
  });
});

/**
 * GET /api/industrial/dcs
 * Continuous DCS process loops (Blast Furnace, Hot Strip Mill)
 */
router.get("/dcs", (req, res) => {
  res.json({
    success: true,
    system: "DCS (Distributed Control System - Continuous Loops)",
    data: mockPlantService.getState().systems.dcs,
  });
});

/**
 * GET /api/industrial/scada
 * Supervisory SCADA metrics (OEE, Availability, Performance, Quality, Plant Power)
 */
router.get("/scada", (req, res) => {
  res.json({
    success: true,
    system: "SCADA (Supervisory Control & Data Acquisition)",
    data: mockPlantService.getState().systems.scada,
  });
});

/**
 * GET /api/industrial/oms
 * Order Management System & Manufacturing Execution System (Work orders, Grade, Backlog)
 */
router.get("/oms", (req, res) => {
  res.json({
    success: true,
    system: "OMS / MES (Operations & Order Management)",
    data: mockPlantService.getState().systems.oms,
  });
});

/**
 * POST /api/industrial/control/start
 * Launch unified OPC UA server across all systems
 */
router.post("/control/start", async (req, res, next) => {
  try {
    const endpointUrl = await mockPlantService.start();
    res.json({
      success: true,
      message: "Unified PLC/DCS/SCADA/OMS industrial server started",
      endpointUrl,
      systems: mockPlantService.getState().systems,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/industrial/control/stop
 * Halt industrial simulation server
 */
router.post("/control/stop", async (req, res, next) => {
  try {
    await mockPlantService.stop();
    res.json({
      success: true,
      message: "Industrial server stopped",
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/industrial/control/override
 * Cross-system manual override or test injection
 * Body: { path: "plc.line1.emergencyStop" | "dcs.blastFurnace.hearthTemperature" | "oms.activeWorkOrder", value: any }
 */
router.post("/control/override", (req, res) => {
  const { path, value } = req.body;
  if (!path || value === undefined) {
    return res.status(400).json({
      success: false,
      message: "path and value are required (e.g. { path: 'dcs.blastFurnace.hearthTemperature', value: 1540.0 })",
    });
  }

  const success = mockPlantService.setTagValue(path, value);
  if (!success) {
    return res.status(400).json({
      success: false,
      message: `Invalid tag path: ${path}`,
    });
  }

  res.json({
    success: true,
    message: `Updated tag: ${path}`,
    newValue: value,
    currentState: mockPlantService.getState(),
  });
});

/**
 * POST /api/industrial/oms/dispatch
 * Simulate OMS dispatching a new production order into PLC/DCS/SCADA
 * Body: { workOrder: string, steelGrade: string, targetJPH: number, scheduledCoils: number }
 */
router.post("/oms/dispatch", async (req, res, next) => {
  try {
    const { workOrder, steelGrade, targetJPH, scheduledCoils } = req.body;

    if (workOrder) mockPlantService.setTagValue("oms.activeWorkOrder", workOrder);
    if (steelGrade) mockPlantService.setTagValue("oms.targetSteelGrade", steelGrade);
    if (scheduledCoils) mockPlantService.setTagValue("oms.scheduledCoils", Number(scheduledCoils));
    if (targetJPH) {
      mockPlantService.setTagValue("plc.line1.targetJPH", Number(targetJPH));
      // If OPC UA client is actively connected, update the live tag directly
      if (opcuaService.isConnected) {
        try {
          await opcuaService.writeNode("ns=1;s=PLC.Line1.TargetJPH", Number(targetJPH), "Double");
        } catch (_) {}
      }
    }

    res.json({
      success: true,
      message: "Dispatched OMS Order down to PLC & SCADA layers",
      oms: mockPlantService.getState().systems.oms,
      plcLine1: mockPlantService.getState().systems.plc.line1,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
