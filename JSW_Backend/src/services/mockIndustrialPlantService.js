const { EventEmitter } = require("events");

class MockIndustrialPlantService extends EventEmitter {
  constructor(port = 4841) {
    super();
    this.port = Number(process.env.MOCK_OPCUA_PORT || port);
    this.server = null;
    this.endpointUrl = `opc.tcp://127.0.0.1:${this.port}/UA/JSW_IntegratedPlant`;
    this.isRunning = false;
    this.simulationTimer = null;

    // ─────────────────────────────────────────────────────────────
    // Unified Industrial Plant State (PLC, DCS, SCADA, OMS)
    // ─────────────────────────────────────────────────────────────
    this.plantState = {
      // 1. PLC Layer: High speed discrete body shop / line control
      plc: {
        line1: {
          targetJPH: 45.0,
          actualJPH: 42.0,
          operatingMode: "AUTO", // AUTO, MANUAL, MAINTENANCE
          lineSpeed: 1.25, // m/s
          emergencyStop: false,
          totalPartsProduced: 1240,
          goodParts: 1215,
          rejectedParts: 25,
        },
        robot1: {
          status: "RUNNING", // RUNNING, IDLE, FAULT
          temperature: 64.2, // Celsius
          spotCount: 3820,
          cycleTime: 42.5, // seconds
          tipDressRequired: false,
          alarmActive: false,
          alarmCode: 0,
        },
        robot2: {
          status: "RUNNING",
          temperature: 61.8,
          spotCount: 3790,
          cycleTime: 43.1,
          tipDressRequired: false,
          alarmActive: false,
          alarmCode: 0,
        },
      },

      // 2. DCS Layer: Continuous metallurgical / blast furnace / hot strip loops
      dcs: {
        blastFurnace: {
          hearthTemperature: 1512.4, // Deg C
          hotBlastPressure: 3.42, // Bar
          topGasCO2Percent: 21.8, // %
          topGasCOPercent: 23.5, // %
          coolingWaterFlowRate: 485.0, // m3/hr
          slagLevelMm: 310, // mm
          heaterStatus: "STEADY_FIRING",
        },
        hotStripMill: {
          reheatFurnaceZone1Temp: 1245.0, // Deg C
          reheatFurnaceZone2Temp: 1280.5,
          entryThicknessMm: 220.0,
          exitThicknessMm: 22.5,
          rollingSpeedMpm: 420.0, // meters per min
          stripSurfaceTemp: 890.0,
          sprayCoolingPressureBar: 18.2,
        },
      },

      // 3. SCADA Layer: Supervisory plant-wide KPIs, alarms, health
      scada: {
        plantAvailability: 92.4, // %
        plantPerformance: 88.6, // %
        plantQuality: 98.1, // %
        overallOEE: 80.3, // %
        activeAlarmsCount: 0,
        lastAlarmMessage: "None",
        substationVoltageKV: 33.1,
        totalPlantPowerMW: 14.85,
      },

      // 4. OMS / MES Layer: Order scheduling, tracking, recipe/batch
      oms: {
        activeWorkOrder: "WO-JSW-2026-X99",
        targetSteelGrade: "JSW-HIGH-TENSILE-G550",
        scheduledCoils: 120,
        completedCoils: 84,
        backlogCoils: 36,
        currentShift: "Shift_A",
        shiftTargetTonnage: 450.0,
        actualTonnageProduced: 332.6,
        operatorInCharge: "S. Roy (EMP-4102)",
      },
    };

    // Auto-start continuous simulation loop
    this.startSimulation();
  }

  /**
   * Start or restart telemetry simulation drift
   */
  startSimulation() {
    if (this.simulationTimer) clearInterval(this.simulationTimer);
    this.isRunning = true;

    this.simulationTimer = setInterval(() => {
      const t = Date.now();

      // 1. PLC drift
      this.plantState.plc.robot1.temperature = Number(
        (64.0 + Math.sin(t / 8000) * 3.2 + (Math.random() - 0.5) * 0.6).toFixed(2)
      );
      this.plantState.plc.robot2.temperature = Number(
        (61.5 + Math.cos(t / 9500) * 2.8 + (Math.random() - 0.5) * 0.6).toFixed(2)
      );
      this.plantState.plc.robot1.cycleTime = Number((42.0 + (Math.random() - 0.5) * 1.5).toFixed(1));

      // 2. DCS metallurgical fluctuations
      this.plantState.dcs.blastFurnace.hearthTemperature = Number(
        (1510.0 + Math.sin(t / 20000) * 8.0 + (Math.random() - 0.5) * 2).toFixed(1)
      );
      this.plantState.dcs.blastFurnace.hotBlastPressure = Number(
        (3.40 + Math.cos(t / 15000) * 0.08 + (Math.random() - 0.5) * 0.02).toFixed(2)
      );
      this.plantState.dcs.hotStripMill.stripSurfaceTemp = Number(
        (890.0 + (Math.random() - 0.5) * 4).toFixed(1)
      );

      // 3. SCADA OEE dynamic recalculation
      const avail = Number((91.5 + Math.sin(t / 30000) * 2.5).toFixed(1));
      const perf = Number((88.0 + Math.cos(t / 25000) * 2.0).toFixed(1));
      const qual = 98.4;
      this.plantState.scada.plantAvailability = avail;
      this.plantState.scada.plantPerformance = perf;
      this.plantState.scada.overallOEE = Number(((avail * perf * qual) / 10000).toFixed(1));

      // 4. OMS Production progress
      if (Math.random() > 0.65) {
        this.plantState.plc.line1.totalPartsProduced += 1;
        this.plantState.plc.line1.goodParts += 1;
        this.plantState.oms.actualTonnageProduced = Number(
          (this.plantState.oms.actualTonnageProduced + 0.15).toFixed(1)
        );
      }

      this.emit("tick", this.getState());
    }, 2000);
  }

  /**
   * Start OPC UA protocol server if needed
   */
  async start() {
    this.startSimulation();
    try {
      const { OPCUAServer, DataType, Variant, StatusCodes } = require("node-opcua");
      if (this.server) return this.endpointUrl;

      this.server = new OPCUAServer({
        port: this.port,
        resourcePath: "/UA/JSW_IntegratedPlant",
      });

      await this.server.initialize();
      const addressSpace = this.server.engine.addressSpace;
      const namespace = addressSpace.getOwnNamespace();
      const jswPlant = namespace.addFolder(addressSpace.rootFolder.objects, { browseName: "JSW_Plant" });

      // Add PLC, DCS, SCADA, OMS folders & tags
      const plcFolder = namespace.addFolder(jswPlant, { browseName: "PLC" });
      const line1Folder = namespace.addFolder(plcFolder, { browseName: "Line1" });
      const robot1Folder = namespace.addFolder(line1Folder, { browseName: "Robot1" });

      namespace.addVariable({
        componentOf: line1Folder,
        browseName: "TargetJPH",
        nodeId: "ns=1;s=PLC.Line1.TargetJPH",
        dataType: "Double",
        value: {
          get: () => new Variant({ dataType: DataType.Double, value: this.plantState.plc.line1.targetJPH }),
          set: (v) => { this.plantState.plc.line1.targetJPH = parseFloat(v.value); return StatusCodes.Good; }
        }
      });

      namespace.addVariable({
        componentOf: line1Folder,
        browseName: "OperatingMode",
        nodeId: "ns=1;s=PLC.Line1.OperatingMode",
        dataType: "String",
        value: {
          get: () => new Variant({ dataType: DataType.String, value: this.plantState.plc.line1.operatingMode }),
          set: (v) => { this.plantState.plc.line1.operatingMode = String(v.value); return StatusCodes.Good; }
        }
      });

      namespace.addVariable({
        componentOf: robot1Folder,
        browseName: "Temperature",
        nodeId: "ns=1;s=PLC.Line1.Robot1.Temperature",
        dataType: "Double",
        value: {
          get: () => new Variant({ dataType: DataType.Double, value: this.plantState.plc.robot1.temperature }),
          set: (v) => { this.plantState.plc.robot1.temperature = parseFloat(v.value); return StatusCodes.Good; }
        }
      });

      // DCS
      const dcsFolder = namespace.addFolder(jswPlant, { browseName: "DCS" });
      const bfFolder = namespace.addFolder(dcsFolder, { browseName: "BlastFurnace" });
      const hsmFolder = namespace.addFolder(dcsFolder, { browseName: "HotStripMill" });

      namespace.addVariable({
        componentOf: bfFolder,
        browseName: "HearthTemperature",
        nodeId: "ns=1;s=DCS.BlastFurnace.HearthTemperature",
        dataType: "Double",
        value: {
          get: () => new Variant({ dataType: DataType.Double, value: this.plantState.dcs.blastFurnace.hearthTemperature }),
          set: (v) => { this.plantState.dcs.blastFurnace.hearthTemperature = parseFloat(v.value); return StatusCodes.Good; }
        }
      });

      namespace.addVariable({
        componentOf: bfFolder,
        browseName: "HotBlastPressure",
        nodeId: "ns=1;s=DCS.BlastFurnace.HotBlastPressure",
        dataType: "Double",
        value: {
          get: () => new Variant({ dataType: DataType.Double, value: this.plantState.dcs.blastFurnace.hotBlastPressure }),
          set: (v) => { this.plantState.dcs.blastFurnace.hotBlastPressure = parseFloat(v.value); return StatusCodes.Good; }
        }
      });

      namespace.addVariable({
        componentOf: hsmFolder,
        browseName: "ExitThicknessMm",
        nodeId: "ns=1;s=DCS.HotStripMill.ExitThicknessMm",
        dataType: "Double",
        value: {
          get: () => new Variant({ dataType: DataType.Double, value: this.plantState.dcs.hotStripMill.exitThicknessMm }),
          set: (v) => { this.plantState.dcs.hotStripMill.exitThicknessMm = parseFloat(v.value); return StatusCodes.Good; }
        }
      });

      // SCADA
      const scadaFolder = namespace.addFolder(jswPlant, { browseName: "SCADA" });
      namespace.addVariable({
        componentOf: scadaFolder,
        browseName: "OverallOEE",
        nodeId: "ns=1;s=SCADA.OverallOEE",
        dataType: "Double",
        value: {
          get: () => new Variant({ dataType: DataType.Double, value: this.plantState.scada.overallOEE }),
          set: (v) => { this.plantState.scada.overallOEE = parseFloat(v.value); return StatusCodes.Good; }
        }
      });

      namespace.addVariable({
        componentOf: scadaFolder,
        browseName: "TotalPlantPowerMW",
        nodeId: "ns=1;s=SCADA.TotalPlantPowerMW",
        dataType: "Double",
        value: {
          get: () => new Variant({ dataType: DataType.Double, value: this.plantState.scada.totalPlantPowerMW }),
          set: (v) => { this.plantState.scada.totalPlantPowerMW = parseFloat(v.value); return StatusCodes.Good; }
        }
      });

      namespace.addVariable({
        componentOf: scadaFolder,
        browseName: "ActiveAlarmsCount",
        nodeId: "ns=1;s=SCADA.ActiveAlarmsCount",
        dataType: "Int32",
        value: {
          get: () => new Variant({ dataType: DataType.Int32, value: this.plantState.scada.activeAlarmsCount }),
          set: (v) => { this.plantState.scada.activeAlarmsCount = parseInt(v.value, 10); return StatusCodes.Good; }
        }
      });

      // OMS
      const omsFolder = namespace.addFolder(jswPlant, { browseName: "OMS" });
      namespace.addVariable({
        componentOf: omsFolder,
        browseName: "ActiveWorkOrder",
        nodeId: "ns=1;s=OMS.ActiveWorkOrder",
        dataType: "String",
        value: {
          get: () => new Variant({ dataType: DataType.String, value: this.plantState.oms.activeWorkOrder }),
          set: (v) => { this.plantState.oms.activeWorkOrder = String(v.value); return StatusCodes.Good; }
        }
      });

      namespace.addVariable({
        componentOf: omsFolder,
        browseName: "TargetSteelGrade",
        nodeId: "ns=1;s=OMS.TargetSteelGrade",
        dataType: "String",
        value: {
          get: () => new Variant({ dataType: DataType.String, value: this.plantState.oms.targetSteelGrade }),
          set: (v) => { this.plantState.oms.targetSteelGrade = String(v.value); return StatusCodes.Good; }
        }
      });

      namespace.addVariable({
        componentOf: omsFolder,
        browseName: "BacklogCoils",
        nodeId: "ns=1;s=OMS.BacklogCoils",
        dataType: "Int32",
        value: {
          get: () => new Variant({ dataType: DataType.Int32, value: this.plantState.oms.backlogCoils }),
          set: (v) => { this.plantState.oms.backlogCoils = parseInt(v.value, 10); return StatusCodes.Good; }
        }
      });

      await this.server.start();
      this.endpointUrl = this.server.endpoints[0].endpointDescriptions()[0].endpointUrl;
      console.log(`[MockPlant] OPC UA endpoint listening at ${this.endpointUrl}`);
    } catch (e) {
      console.warn(`[MockPlant] Running in standalone fast-telemetry mode: ${e.message}`);
    }
    return this.endpointUrl;
  }

  async stop() {
    if (this.simulationTimer) {
      clearInterval(this.simulationTimer);
      this.simulationTimer = null;
    }
    if (this.server) {
      await this.server.shutdown();
      this.server = null;
    }
    this.isRunning = false;
  }

  setTagValue(path, value) {
    const keys = path.split(".");
    let target = this.plantState;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) return false;
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;
    return true;
  }

  getState() {
    return {
      isRunning: this.isRunning,
      endpointUrl: this.endpointUrl,
      systems: {
        plc: this.plantState.plc,
        dcs: this.plantState.dcs,
        scada: this.plantState.scada,
        oms: this.plantState.oms,
      },
    };
  }
}

// Singleton instance
const mockIndustrialPlantService = new MockIndustrialPlantService(4841);
module.exports = mockIndustrialPlantService;
