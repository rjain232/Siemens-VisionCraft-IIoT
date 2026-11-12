const EventEmitter = require("events");
let nodes7;
try {
  nodes7 = require("nodes7");
} catch (e) {
  nodes7 = null;
}

class TiaPortalPlcService extends EventEmitter {
  constructor() {
    super();
    this.s7client = nodes7 ? new nodes7() : null;
    this.isConnected = false;
    this.isConnecting = false;
    this.pollInterval = null;

    // Default PLC configuration (can be overridden via environment variables)
    this.plcConfig = {
      host: process.env.PLC_IP || "192.168.0.1",
      port: Number(process.env.PLC_PORT) || 102,
      rack: Number(process.env.PLC_RACK) || 0,
      slot: Number(process.env.PLC_SLOT) || 1, // Slot 1 for S7-1200 / S7-1500; Slot 2 for S7-300 / 400
      timeout: 3000,
    };

    // Standard TIA Portal Tag Mapping -> S7comm DB Offset Addresses
    // Requires non-optimized DB access in TIA Portal
    this.tagList = {
      AutoMode: "DB1,X0.0", // DB1.DBX0.0 (BOOL)
      TargetJPH: "DB1,INT2", // DB1.DBW2 (16-bit INT)
      ActualJPH: "DB1,INT4", // DB1.DBW4 (16-bit INT)
      LineSpeed: "DB1,REAL6", // DB1.DBD6 (32-bit REAL / Float)
      EmergencyStop: "DB1,X10.0", // DB1.DBX10.0 (BOOL)
      TotalParts: "DB1,DINT12", // DB1.DBD12 (32-bit DINT)
      GoodParts: "DB1,DINT16", // DB1.DBD16 (32-bit DINT)
      RejectedParts: "DB1,DINT20", // DB1.DBD20 (32-bit DINT)
    };

    // Cached tag values (with fallback simulation if PLC is disconnected/unreachable)
    this.currentValues = {
      AutoMode: true,
      TargetJPH: 45,
      ActualJPH: 42,
      LineSpeed: 1.25,
      EmergencyStop: false,
      TotalParts: 1250,
      GoodParts: 1222,
      RejectedParts: 28,
    };
  }

  /**
   * Connect to Siemens PLC using ISO-on-TCP (RFC 1006 / S7comm)
   */
  async connect() {
    if (!this.s7client) {
      console.warn("[TIA Portal PLC] nodes7 library not yet available, running in fallback mode");
      return false;
    }

    if (this.isConnected || this.isConnecting) return this.isConnected;
    this.isConnecting = true;

    return new Promise((resolve) => {
      this.s7client.initiateConnection(this.plcConfig, (err) => {
        this.isConnecting = false;
        if (err) {
          console.warn(`[TIA Portal PLC] Hardware connection to ${this.plcConfig.host}:102 failed (${err}). Simulation mode active.`);
          this.isConnected = false;
          this.startSimulationFallback();
          return resolve(false);
        }

        console.log(`[TIA Portal PLC] Connected successfully to Siemens PLC at ${this.plcConfig.host}:102`);
        this.isConnected = true;
        this.stopSimulationFallback();

        this.s7client.setTranslationCB((tag) => this.tagList[tag]);
        this.s7client.addItems(Object.keys(this.tagList));

        this.startHardwarePolling();
        resolve(true);
      });
    });
  }

  startHardwarePolling(intervalMs = 250) {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      if (!this.isConnected || !this.s7client) return;

      this.s7client.readAllItems((err, values) => {
        if (err) {
          console.error("[TIA Portal PLC] Tag read error:", err);
          this.isConnected = false;
          this.connect(); // auto-reconnect
          return;
        }

        this.currentValues = { ...this.currentValues, ...values };
        this.emit("tagsUpdated", this.currentValues);
      });
    }, intervalMs);
  }

  startSimulationFallback() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      // Simulate slight industrial drift so live UI graphs animate realistically
      const jitter = (Math.random() - 0.5) * 0.05;
      this.currentValues.LineSpeed = +(this.currentValues.LineSpeed + jitter).toFixed(2);
      this.currentValues.ActualJPH = Math.min(50, Math.max(38, Math.round(this.currentValues.ActualJPH + (Math.random() > 0.5 ? 1 : -1))));
      this.emit("tagsUpdated", this.currentValues);
    }, 1000);
  }

  stopSimulationFallback() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  /**
   * Read all registered tags
   */
  async readAllTags() {
    if (this.isConnected && this.s7client) {
      return new Promise((resolve) => {
        this.s7client.readAllItems((err, values) => {
          if (!err && values) {
            this.currentValues = { ...this.currentValues, ...values };
          }
          resolve(this.currentValues);
        });
      });
    }
    return this.currentValues;
  }

  /**
   * Write a tag value directly to TIA Portal DB
   * @param {string} tagName - Tag name defined in tagList
   * @param {any} value - Value to write (Boolean, Number, etc.)
   */
  async writeTag(tagName, value) {
    if (!this.tagList[tagName]) {
      throw new Error(`Tag "${tagName}" is not defined in TIA Portal tag mapping.`);
    }

    if (this.isConnected && this.s7client) {
      return new Promise((resolve, reject) => {
        this.s7client.writeItems(tagName, value, (err) => {
          if (err) return reject(new Error(`PLC Write failed: ${err}`));
          this.currentValues[tagName] = value;
          this.emit("tagsUpdated", this.currentValues);
          resolve({ success: true, tag: tagName, writtenValue: value });
        });
      });
    }

    // In simulation mode: update state immediately and emit
    this.currentValues[tagName] = value;
    this.emit("tagsUpdated", this.currentValues);
    return { success: true, tag: tagName, writtenValue: value, simulated: true };
  }

  getPlcStatus() {
    return {
      connected: this.isConnected,
      host: this.plcConfig.host,
      port: this.plcConfig.port,
      rack: this.plcConfig.rack,
      slot: this.plcConfig.slot,
      tagsConfigured: Object.keys(this.tagList).length,
    };
  }
}

module.exports = new TiaPortalPlcService();
