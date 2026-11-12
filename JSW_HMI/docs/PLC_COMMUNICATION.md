# Siemens S7-1500 PLC WebAPI Communication

The web HMI interfaces directly with the native Siemens S7-1500 PLC WebAPI (introduced in Firmware v2.9+ / v3.0+) over HTTPS using standardized JSON-RPC 2.0 payloads.

---

## 1. WebAPI Connection Parameters
- **Protocol**: HTTPS (Port 443)
- **Format**: JSON-RPC 2.0
- **Authentication**: Cookie session via `Api.Login` or certificate-based token.

---

## 2. Common JSON-RPC Payloads

### A. Authentication (`Api.Login`)
```json
{
  "jsonrpc": "2.0",
  "method": "Api.Login",
  "params": {
    "user": "HmiUser",
    "password": "SecurePassword123"
  },
  "id": 1
}
```

### B. Bulk Tag Read (`PlcProgram.Read`)
Used by `server.js` to poll or stream data block states:
```json
{
  "jsonrpc": "2.0",
  "method": "PlcProgram.Read",
  "params": {
    "var": "\"LineMB200_HMI\".Station[160].OpmodePanel.opmode[1].userInterfaceOut.controlNoHmi"
  },
  "id": 2
}
```

### C. Tag Write (`PlcProgram.Write`)
Triggered when an operator presses a button or changes a setpoint:
```json
{
  "jsonrpc": "2.0",
  "method": "PlcProgram.Write",
  "params": {
    "var": "\"LineMB200_HMI\".Station[160].Valve1To8_Pos",
    "value": 1
  },
  "id": 3
}
```

---

## 3. Realtime Gateway Architecture
To prevent 50+ web browser panels from flooding the S7-1500 CPU with HTTP requests, the Node.js backend serves as a **caching reverse proxy**:
1. Browsers connect via lightweight WebSockets (`ws://localhost:4000`).
2. The Node.js service batches required tags and polls the PLC at an optimized frequency (e.g., 250ms - 1s).
3. Value changes (deltas) are broadcast to connected clients in real time.
