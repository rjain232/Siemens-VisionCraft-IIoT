let nodeOpcua = null;
async function getOpcua() {
  if (!nodeOpcua) {
    try {
      nodeOpcua = await import("node-opcua");
    } catch (e) {
      console.warn("[MockPLC] node-opcua native module unavailable, running in memory-only simulation:", e.message);
    }
  }
  return nodeOpcua;
}

class MockPlcService {
  constructor(port = 4840) {
    this.port
     = Number(process.env.MOCK_OPCUA_PORT || port);
    this.server = null;
    this.endpointUrl = null;
    this.isRunning = false;
    this.simulationTimer = null;

    // In-memory PLC tag state
    this.plcData = {
      // Line 1 telemetry
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
      // Robot 1 telemetry
      robot1: {
        status: "RUNNING", // RUNNING, IDLE, FAULT
        temperature: 64.2, // Celsius
        spotCount: 3820,
        cycleTime: 42.5, // seconds
        tipDressRequired: false,
        alarmActive: false,
        alarmCode: 0,
      },
      // Robot 2 telemetry
      robot2: {
        status: "RUNNING",
        temperature: 61.8,
        spotCount: 3790,
        cycleTime: 43.1,
        tipDressRequired: false,
        alarmActive: false,
        alarmCode: 0,
      },
      // Line 2 telemetry
      line2: {
        targetJPH: 50.0,
        actualJPH: 48.0,
        operatingMode: "AUTO",
        emergencyStop: false,
      },
    };
  }

  /**
   * Start Mock PLC Server and initialize address space
   */
  async start() {
    const opcua = await getOpcua();
    if (!opcua) {
      this.isRunning = true;
      this.endpointUrl = "opc.tcp://127.0.0.1:" + this.port + "/UA/JSW_MockPLC_Simulated";
      this._startSimulation();
      console.log(`[MockPLC] Running in memory-only simulation at ${this.endpointUrl}`);
      return this.endpointUrl;
    }
    const { OPCUAServer, Variant, DataType, StatusCodes } = opcua;
    if (this.isRunning && this.server) {
      console.log(`[MockPLC] Already running at ${this.endpointUrl}`);
      return this.endpointUrl;
    }

    this.server = new OPCUAServer({
      port: this.port,
      resourcePath: "/UA/JSW_MockPLC",
      buildInfo: {
        productName: "JSW_Industrial_Mock_PLC",
        buildNumber: "2.0.0",
        buildDate: new Date(),
      },
    });

    await this.server.initialize();

    const addressSpace = this.server.engine.addressSpace;
    const namespace = addressSpace.getOwnNamespace();

    // Root Folder for JSW Factory
    const jswPlant = namespace.addFolder(addressSpace.rootFolder.objects, {
      browseName: "JSW_Plant",
    });

    // ── LINE 1 FOLDER ───────────────────────────────────────────────
    const line1Folder = namespace.addFolder(jswPlant, {
      browseName: "Line1",
    });

    // Line 1 Tags
    this._addVariable(namespace, line1Folder, "TargetJPH", "ns=1;s=Line1.TargetJPH", DataType.Double, () => this.plcData.line1.targetJPH, (v) => { this.plcData.line1.targetJPH = parseFloat(v); });
    this._addVariable(namespace, line1Folder, "ActualJPH", "ns=1;s=Line1.ActualJPH", DataType.Double, () => this.plcData.line1.actualJPH, (v) => { this.plcData.line1.actualJPH = parseFloat(v); });
    this._addVariable(namespace, line1Folder, "OperatingMode", "ns=1;s=Line1.OperatingMode", DataType.String, () => this.plcData.line1.operatingMode, (v) => { this.plcData.line1.operatingMode = String(v); });
    this._addVariable(namespace, line1Folder, "LineSpeed", "ns=1;s=Line1.LineSpeed", DataType.Double, () => this.plcData.line1.lineSpeed, (v) => { this.plcData.line1.lineSpeed = parseFloat(v); });
    this._addVariable(namespace, line1Folder, "EmergencyStop", "ns=1;s=Line1.EmergencyStop", DataType.Boolean, () => this.plcData.line1.emergencyStop, (v) => { this.plcData.line1.emergencyStop = Boolean(v); });
    this._addVariable(namespace, line1Folder, "TotalPartsProduced", "ns=1;s=Line1.TotalPartsProduced", DataType.Int32, () => this.plcData.line1.totalPartsProduced, (v) => { this.plcData.line1.totalPartsProduced = parseInt(v, 10); });
    this._addVariable(namespace, line1Folder, "GoodParts", "ns=1;s=Line1.GoodParts", DataType.Int32, () => this.plcData.line1.goodParts, (v) => { this.plcData.line1.goodParts = parseInt(v, 10); });
    this._addVariable(namespace, line1Folder, "RejectedParts", "ns=1;s=Line1.RejectedParts", DataType.Int32, () => this.plcData.line1.rejectedParts, (v) => { this.plcData.line1.rejectedParts = parseInt(v, 10); });

    // ── ROBOT 1 SUB-FOLDER ───────────────────────────────────────────
    const robot1Folder = namespace.addFolder(line1Folder, {
      browseName: "Robot1",
    });

    this._addVariable(namespace, robot1Folder, "Status", "ns=1;s=Line1.Robot1.Status", DataType.String, () => this.plcData.robot1.status, (v) => { this.plcData.robot1.status = String(v); });
    this._addVariable(namespace, robot1Folder, "Temperature", "ns=1;s=Line1.Robot1.Temperature", DataType.Double, () => this.plcData.robot1.temperature, (v) => { this.plcData.robot1.temperature = parseFloat(v); });
    this._addVariable(namespace, robot1Folder, "SpotCount", "ns=1;s=Line1.Robot1.SpotCount", DataType.Int32, () => this.plcData.robot1.spotCount, (v) => { this.plcData.robot1.spotCount = parseInt(v, 10); });
    this._addVariable(namespace, robot1Folder, "CycleTime", "ns=1;s=Line1.Robot1.CycleTime", DataType.Double, () => this.plcData.robot1.cycleTime, (v) => { this.plcData.robot1.cycleTime = parseFloat(v); });
    this._addVariable(namespace, robot1Folder, "TipDressRequired", "ns=1;s=Line1.Robot1.TipDressRequired", DataType.Boolean, () => this.plcData.robot1.tipDressRequired, (v) => { this.plcData.robot1.tipDressRequired = Boolean(v); });
    this._addVariable(namespace, robot1Folder, "AlarmActive", "ns=1;s=Line1.Robot1.AlarmActive", DataType.Boolean, () => this.plcData.robot1.alarmActive, (v) => { this.plcData.robot1.alarmActive = Boolean(v); });
    this._addVariable(namespace, robot1Folder, "AlarmCode", "ns=1;s=Line1.Robot1.AlarmCode", DataType.Int32, () => this.plcData.robot1.alarmCode, (v) => { this.plcData.robot1.alarmCode = parseInt(v, 10); });

    // ── ROBOT 2 SUB-FOLDER ───────────────────────────────────────────
    const robot2Folder = namespace.addFolder(line1Folder, {
      browseName: "Robot2",
    });

    this._addVariable(namespace, robot2Folder, "Status", "ns=1;s=Line1.Robot2.Status", DataType.String, () => this.plcData.robot2.status, (v) => { this.plcData.robot2.status = String(v); });
    this._addVariable(namespace, robot2Folder, "Temperature", "ns=1;s=Line1.Robot2.Temperature", DataType.Double, () => this.plcData.robot2.temperature, (v) => { this.plcData.robot2.temperature = parseFloat(v); });
    this._addVariable(namespace, robot2Folder, "SpotCount", "ns=1;s=Line1.Robot2.SpotCount", DataType.Int32, () => this.plcData.robot2.spotCount, (v) => { this.plcData.robot2.spotCount = parseInt(v, 10); });
    this._addVariable(namespace, robot2Folder, "CycleTime", "ns=1;s=Line1.Robot2.CycleTime", DataType.Double, () => this.plcData.robot2.cycleTime, (v) => { this.plcData.robot2.cycleTime = parseFloat(v); });

    // ── LINE 2 FOLDER ───────────────────────────────────────────────
    const line2Folder = namespace.addFolder(jswPlant, {
      browseName: "Line2",
    });
    this._addVariable(namespace, line2Folder, "TargetJPH", "ns=1;s=Line2.TargetJPH", DataType.Double, () => this.plcData.line2.targetJPH, (v) => { this.plcData.line2.targetJPH = parseFloat(v); });
    this._addVariable(namespace, line2Folder, "ActualJPH", "ns=1;s=Line2.ActualJPH", DataType.Double, () => this.plcData.line2.actualJPH, (v) => { this.plcData.line2.actualJPH = parseFloat(v); });

    await this.server.start();
    this.endpointUrl = this.server.endpoints[0].endpointDescriptions()[0].endpointUrl;
    this.isRunning = true;
    console.log(`[MockPLC] Industrial Mock PLC started successfully at ${this.endpointUrl}`);

    // Start background live jitter/simulation (fluctuates temperatures and parts count gently)
    this._startSimulation();

    return this.endpointUrl;
  }

  /**
   * Helper to register read/write variables
   */
  _addVariable(namespace, parent, browseName, nodeId, dataType, getter, setter) {
    namespace.addVariable({
      componentOf: parent,
      browseName,
      nodeId,
      dataType,
      minimumSamplingInterval: 100,
      value: {
        get: () => (nodeOpcua?.Variant ? new nodeOpcua.Variant({ dataType, value: getter() }) : { dataType, value: getter() }),
        set: (variant) => {
          setter(variant.value);
          return (nodeOpcua?.StatusCodes?.Good || 0x00000);
        },
      },
    });
  }

  /**
   * Simulates continuous factory telemetry drift
   */
  _startSimulation() {
    if (this.simulationTimer) clearInterval(this.simulationTimer);

    this.simulationTimer = setInterval(() => {
      if (!this.isRunning) return;

      // Subtle temperature fluctuations (±0.4°C)
      this.plcData.robot1.temperature = Number(
        (64.0 + Math.sin(Date.now() / 10000) * 3 + (Math.random() - 0.5) * 0.8).toFixed(2)
      );
      this.plcData.robot2.temperature = Number(
        (61.5 + Math.cos(Date.now() / 12000) * 2.5 + (Math.random() - 0.5) * 0.8).toFixed(2)
      );

      // Random small cycle time fluctuations (40 - 45s)
      this.plcData.robot1.cycleTime = Number((42.0 + (Math.random() - 0.5) * 2).toFixed(1));

      // Periodic parts increment
      if (Math.random() > 0.6) {
        this.plcData.line1.totalPartsProduced += 1;
        if (Math.random() > 0.05) {
          this.plcData.line1.goodParts += 1;
        } else {
          this.plcData.line1.rejectedParts += 1;
        }
      }
    }, 2000);
  }

  /**
   * Stop Mock PLC Server
   */
  async stop() {
    if (this.simulationTimer) {
      clearInterval(this.simulationTimer);
      this.simulationTimer = null;
    }
    if (this.server) {
      await this.server.shutdown();
      this.server = null;
      this.isRunning = false;
      console.log("[MockPLC] Server stopped gracefully");
    }
  }

  /**
   * Directly set simulated values from REST test requests
   */
  setTagValue(path, value) {
    const keys = path.split(".");
    let target = this.plcData;
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
      data: this.plcData,
    };
  }
}

// Export singleton instance
const mockPlcService = new MockPlcService(4840);
module.exports = mockPlcService;
