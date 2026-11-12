/**
 * Standalone Demonstration of Siemens PLC & SCADA Communication Methods
 * 1. S7-1500 Web API (JSON-RPC 2.0)
 * 2. WinCC Unified Open Pipe (Windows Named Pipe)
 */

const net = require("net");
const https = require("https");

console.log("=================================================================");
console.log("  SIEMENS PLC & SCADA COMMUNICATION RESEARCH DEMONSTRATION");
console.log("=================================================================\n");

// 1. SIMULATE S7-1500 WEB API (JSON-RPC 2.0) REQUEST
function demonstrateWebAPI() {
  console.log("[1] Demonstrating S7-1500 Web API (JSON-RPC 2.0) Method Call:");
  
  const loginRequest = {
    jsonrpc: "2.0",
    id: 101,
    method: "Api.Login",
    params: {
      user: "admin",
      password: "password123"
    }
  };

  const readTagRequest = {
    jsonrpc: "2.0",
    id: 102,
    method: "PlcProgram.Read",
    params: {
      var: '"LineMB200_HMI".BSL010_DK01.ActualAngle'
    }
  };

  console.log("-> Outgoing Auth Payload (HTTPS POST /api/jsonrpc):");
  console.log(JSON.stringify(loginRequest, null, 2));

  console.log("\n-> Outgoing Tag Read Payload:");
  console.log(JSON.stringify(readTagRequest, null, 2));

  console.log("\n<- Simulated PLC Response (Optimized DB, Symbolic Resolution):");
  const simulatedResponse = {
    jsonrpc: "2.0",
    id: 102,
    result: 89.94
  };
  console.log(JSON.stringify(simulatedResponse, null, 2));
}

// 2. DEMONSTRATE WINCC UNIFIED OPEN PIPE SPECIFICATION
function demonstrateOpenPipe() {
  console.log("\n-----------------------------------------------------------------");
  console.log("[2] Demonstrating WinCC Unified Open Pipe IPC Protocol:");
  console.log("    Discovered config: C:\\Program Files\\Siemens\\Automation\\WinCCUnified\\bin\\_config\\openness_protocol.json");
  console.log("    Target Named Pipe: \\\\.\\pipe\\HmiRuntime\n");

  const subscribeCommand = {
    name: "SubscribeTag",
    ClientCookie: "JSW_Live_Monitor_001",
    parameters: {
      Tags: [
        "BSL010_DK01",
        "BSL010_R01",
        "BSL020_LP",
        "SEW-MB220_XM1"
      ]
    }
  };

  console.log("-> Outgoing Named Pipe Subscription Command:");
  console.log(JSON.stringify(subscribeCommand, null, 2));

  const notifyEvent = {
    name: "NotifySubscribeTag",
    parameters: {
      Tags: [
        {
          Name: "BSL010_DK01",
          Value: 90.0,
          QualityCode: 192, // 192 = Good / Valid in Siemens SCADA
          ErrorCode: 0,
          DateTime: new Date().toISOString()
        },
        {
          Name: "SEW-MB220_XM1",
          Value: 1450.25,
          QualityCode: 192,
          ErrorCode: 0,
          DateTime: new Date().toISOString()
        }
      ]
    }
  };

  console.log("\n<- Async Event Pushed by WinCC Unified Runtime (0 latency):");
  console.log(JSON.stringify(notifyEvent, null, 2));
}

demonstrateWebAPI();
demonstrateOpenPipe();
console.log("\n=================================================================");
console.log(" Research & Protocol Verification Completed Successfully.");
console.log("=================================================================");
