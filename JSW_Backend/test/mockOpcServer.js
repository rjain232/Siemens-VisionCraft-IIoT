const {
  OPCUAServer,
  Variant,
  DataType,
  StatusCodes,
} = require("node-opcua");

class MockOpcServer {
  constructor(port = 4841) {
    this.port = port;
    this.server = null;
    this.variables = {};
  }

  async start() {
    this.server = new OPCUAServer({
      port: this.port,
      resourcePath: "/UA/JSWTestServer",
      buildInfo: {
        productName: "JSW_Mock_OPCUA_Server",
        buildNumber: "1.0.0",
        buildDate: new Date(),
      },
    });

    await this.server.initialize();

    const addressSpace = this.server.engine.addressSpace;
    const namespace = addressSpace.getOwnNamespace();

    // Create a device/folder under Root -> Objects
    const jswFolder = namespace.addFolder(addressSpace.rootFolder.objects, {
      browseName: "JSW_Plant",
    });

    const line1Folder = namespace.addFolder(jswFolder, {
      browseName: "Line1",
    });

    // 1. Double variable: TargetJPH (Read & Write)
    let targetJPHValue = 45.0;
    this.variables.targetJPH = namespace.addVariable({
      componentOf: line1Folder,
      browseName: "TargetJPH",
      nodeId: "ns=1;s=Line1.TargetJPH",
      dataType: "Double",
      value: {
        get: () => new Variant({ dataType: DataType.Double, value: targetJPHValue }),
        set: (variant) => {
          targetJPHValue = parseFloat(variant.value);
          return StatusCodes.Good;
        },
      },
    });

    // 2. Double variable: Robot1 Temperature
    let robotTemp = 65.5;
    this.variables.temperature = namespace.addVariable({
      componentOf: line1Folder,
      browseName: "Robot1_Temperature",
      nodeId: "ns=1;s=Line1.Robot1.Temperature",
      dataType: "Double",
      value: {
        get: () => new Variant({ dataType: DataType.Double, value: robotTemp }),
        set: (variant) => {
          robotTemp = parseFloat(variant.value);
          return StatusCodes.Good;
        },
      },
    });

    // 3. Boolean variable: EmergencyStop
    let emergencyStop = false;
    this.variables.emergencyStop = namespace.addVariable({
      componentOf: line1Folder,
      browseName: "EmergencyStop",
      nodeId: "ns=1;s=Line1.EmergencyStop",
      dataType: "Boolean",
      value: {
        get: () => new Variant({ dataType: DataType.Boolean, value: emergencyStop }),
        set: (variant) => {
          emergencyStop = Boolean(variant.value);
          return StatusCodes.Good;
        },
      },
    });

    // 4. String variable: CurrentModel
    let currentModel = "JSW-STEEL-SLAB-X50";
    this.variables.currentModel = namespace.addVariable({
      componentOf: line1Folder,
      browseName: "CurrentModel",
      nodeId: "ns=1;s=Line1.CurrentModel",
      dataType: "String",
      value: {
        get: () => new Variant({ dataType: DataType.String, value: currentModel }),
        set: (variant) => {
          currentModel = String(variant.value);
          return StatusCodes.Good;
        },
      },
    });

    await this.server.start();
    const endpointUrl = this.server.endpoints[0].endpointDescriptions()[0].endpointUrl;
    console.log(`[MockOpcServer] Server running at ${endpointUrl}`);
    return endpointUrl;
  }

  async stop() {
    if (this.server) {
      await this.server.shutdown();
      this.server = null;
      console.log("[MockOpcServer] Server stopped");
    }
  }
}

module.exports = MockOpcServer;
