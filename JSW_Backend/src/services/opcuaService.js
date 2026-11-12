let nodeOpcua = null;
async function getOpcua() {
  if (!nodeOpcua) {
    try {
      nodeOpcua = await import("node-opcua");
    } catch (e) {
      console.warn("[OPC-UA] node-opcua native module unavailable, running in memory-only mode:", e.message);
    }
  }
  return nodeOpcua;
}
const { EventEmitter } = require("events");

class OpcUaService extends EventEmitter {
  constructor() {
    super();
    this.client = null;
    this.session = null;
    this.subscription = null;
    this.monitoredItems = new Map(); // nodeId -> ClientMonitoredItem
    this.isConnected = false;
    this.endpointUrl = process.env.OPCUA_ENDPOINT_URL || "opc.tcp://127.0.0.1:4840";
  }

  /**
   * Connect to the OPC UA server and create a session
   */
  async connect(endpointUrl = this.endpointUrl, options = {}) {
    const opcua = await getOpcua();
    if (!opcua) {
      this.isConnected = true;
      this.endpointUrl = endpointUrl;
      console.log(`[OPC-UA] Simulated connection established to ${this.endpointUrl}`);
      return;
    }
    const { OPCUAClient, MessageSecurityMode, SecurityPolicy } = opcua;
    if (this.isConnected && this.session) {
      console.log(`[OPC-UA] Already connected to ${this.endpointUrl}`);
      return;
    }

    this.endpointUrl = endpointUrl;
    console.log(`[OPC-UA] Connecting to ${this.endpointUrl}...`);

    this.client = OPCUAClient.create({
      applicationName: options.applicationName || "JSW_Backend_OPCUA_Client",
      connectionStrategy: {
        initialDelay: 1000,
        maxRetry: 3,
      },
      securityMode: MessageSecurityMode.None,
      securityPolicy: SecurityPolicy.None,
      endpointMustExist: false,
    });

    this.client.on("backoff", (retry, delay) => {
      console.warn(`[OPC-UA] Connection retry #${retry} in ${delay}ms`);
    });

    this.client.on("connection_lost", () => {
      console.error("[OPC-UA] Connection lost to server");
      this.isConnected = false;
      this.emit("connection_lost");
    });

    this.client.on("connection_reestablished", () => {
      console.log("[OPC-UA] Connection re-established");
      this.isConnected = true;
      this.emit("connection_reestablished");
    });

    await this.client.connect(this.endpointUrl);
    console.log(`[OPC-UA] Connected successfully to ${this.endpointUrl}`);

    this.session = await this.client.createSession();
    console.log("[OPC-UA] Session created");

    // Initialize default subscription for tag monitoring
    this.subscription = ClientSubscription.create(this.session, {
      requestedPublishingInterval: 500,
      requestedLifetimeCount: 100,
      requestedMaxKeepAliveCount: 10,
      maxNotificationsPerPublish: 100,
      publishingEnabled: true,
      priority: 10,
    });

    this.subscription
      .on("started", () => console.log(`[OPC-UA] Subscription started - ID: ${this.subscription.subscriptionId}`))
      .on("keepalive", () => {})
      .on("terminated", () => {
        console.warn("[OPC-UA] Subscription terminated");
        this.subscription = null;
      });

    this.isConnected = true;
  }

  /**
   * Disconnect and clean up session
   */
  async disconnect() {
    try {
      if (this.subscription) {
        await this.subscription.terminate();
        this.subscription = null;
      }
      if (this.session) {
        await this.session.close();
        this.session = null;
      }
      if (this.client) {
        await this.client.disconnect();
        this.client = null;
      }
      this.isConnected = false;
      this.monitoredItems.clear();
      console.log("[OPC-UA] Disconnected gracefully");
    } catch (err) {
      console.error("[OPC-UA] Error disconnecting:", err.message);
    }
  }

  /**
   * Read single or multiple OPC UA nodes
   * @param {string | string[]} nodeIds - OPC UA Node ID string or array of strings (e.g. "ns=1;s=Line1.TargetJPH")
   */
  async readNode(nodeIds) {
    if (!this.isConnected || !this.session) {
      throw new Error("OPC UA service is not connected");
    }

    const isArray = Array.isArray(nodeIds);
    const nodes = isArray ? nodeIds : [nodeIds];

    const nodesToRead = nodes.map((nodeId) => ({
      nodeId,
      attributeId: AttributeIds.Value,
    }));

    const dataValues = await this.session.read(nodesToRead);

    const results = dataValues.map((dataValue, index) => {
      const isGood = dataValue.statusCode.equals(StatusCodes.Good);
      return {
        nodeId: nodes[index],
        statusCode: dataValue.statusCode.name,
        isGood,
        value: dataValue.value ? dataValue.value.value : null,
        dataType: dataValue.value ? DataType[dataValue.value.dataType] : null,
        sourceTimestamp: dataValue.sourceTimestamp,
        serverTimestamp: dataValue.serverTimestamp,
      };
    });

    return isArray ? results : results[0];
  }

  /**
   * Write a value to an OPC UA node
   * @param {string} nodeId - Node ID (e.g., "ns=1;s=Line1.TargetJPH")
   * @param {*} value - Value to write
   * @param {string} dataTypeStr - DataType name (e.g., "Double", "Int32", "Boolean", "String")
   */
  async writeNode(nodeId, value, dataTypeStr = "Double") {
    if (!this.isConnected || !this.session) {
      throw new Error("OPC UA service is not connected");
    }

    const dataType = DataType[dataTypeStr] || DataType.Double;
    let convertedValue = value;

    if (dataType === DataType.Double || dataType === DataType.Float) {
      convertedValue = parseFloat(value);
    } else if (dataType === DataType.Int32 || dataType === DataType.Int16 || dataType === DataType.UInt32) {
      convertedValue = parseInt(value, 10);
    } else if (dataType === DataType.Boolean) {
      convertedValue = Boolean(value);
    } else if (dataType === DataType.String) {
      convertedValue = String(value);
    }

    const nodeToWrite = {
      nodeId,
      attributeId: AttributeIds.Value,
      value: {
        value: {
          dataType,
          value: convertedValue,
        },
      },
    };

    const statusCode = await this.session.write(nodeToWrite);
    const isGood = statusCode.equals(StatusCodes.Good);

    return {
      nodeId,
      statusCode: statusCode.name,
      isGood,
      value: convertedValue,
      dataType: dataTypeStr,
    };
  }

  /**
   * Subscribe to a node for data changes
   * @param {string} nodeId - Node ID to monitor
   * @param {function} callback - Callback on data change: (data) => void
   * @param {number} samplingInterval - Sampling interval in ms (default: 250ms)
   */
  async subscribeTag(nodeId, callback, samplingInterval = 250) {
    if (!this.isConnected || !this.session || !this.subscription) {
      throw new Error("OPC UA service is not connected or subscription is not active");
    }

    if (this.monitoredItems.has(nodeId)) {
      console.log(`[OPC-UA] Tag ${nodeId} is already subscribed. Adding listener.`);
      if (callback) {
        this.on(`change:${nodeId}`, callback);
      }
      return this.monitoredItems.get(nodeId);
    }

    const itemToMonitor = {
      nodeId,
      attributeId: AttributeIds.Value,
    };

    const parameters = {
      samplingInterval,
      discardOldest: true,
      queueSize: 10,
    };

    const monitoredItem = await this.subscription.monitor(
      itemToMonitor,
      parameters,
      TimestampsToReturn.Both
    );

    monitoredItem.on("changed", (dataValue) => {
      const payload = {
        nodeId,
        statusCode: dataValue.statusCode.name,
        value: dataValue.value ? dataValue.value.value : null,
        dataType: dataValue.value ? DataType[dataValue.value.dataType] : null,
        sourceTimestamp: dataValue.sourceTimestamp,
      };

      // Emit specific node change and global opcua_change
      this.emit(`change:${nodeId}`, payload);
      this.emit("change", payload);
    });

    if (callback) {
      this.on(`change:${nodeId}`, callback);
    }

    this.monitoredItems.set(nodeId, monitoredItem);
    console.log(`[OPC-UA] Subscribed to tag: ${nodeId}`);
    return monitoredItem;
  }

  /**
   * Unsubscribe from a monitored node
   * @param {string} nodeId 
   */
  async unsubscribeTag(nodeId) {
    const monitoredItem = this.monitoredItems.get(nodeId);
    if (!monitoredItem) return;

    await monitoredItem.terminate();
    this.monitoredItems.delete(nodeId);
    this.removeAllListeners(`change:${nodeId}`);
    console.log(`[OPC-UA] Unsubscribed from tag: ${nodeId}`);
  }

  /**
   * Get list of currently monitored tags and connection status
   */
  getStatus() {
    return {
      connected: this.isConnected,
      endpointUrl: this.endpointUrl,
      monitoredTags: Array.from(this.monitoredItems.keys()),
    };
  }
}

// Export singleton instance
const opcuaService = new OpcUaService();
module.exports = opcuaService;
