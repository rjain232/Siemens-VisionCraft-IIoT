# Siemens VisionCraft IIoT & Web SCADA Platform

Industrial IoT, Siemens TIA Openness automation, and pixel-perfect Web SCADA platform for automotive body-in-white (BIW) manufacturing.

## Architecture & Project Structure
- **Engineering_Artifacts/**: Original TIA Portal tag tables (`hmi tags.xlsx`) and screen definitions (`hmi screen.pptx`).
- **JSW_Backend/TIA_Antigravity/**: .NET Framework 4.8 Openness Bridge using `Siemens.Engineering.dll` to export SimaticML XML blocks headlessly.
- **JSW_Backend/**: Node.js edge telemetry microservice (`siemensHmiBridge.js`, `start_hmi_server.js` on port `5055`) multiplexing WebSocket streams and Siemens Web API JSON-RPC calls.
- **JSW_UI/**: React 18 Web SCADA dashboard featuring the Siemens Unified Comfort MTP1500 Panel (`SiemensPlantHMI.jsx`), dynamic telemetry gauges, and headless off-screen PDF shift report generation.
- **JSW_MLOps_Engine/**: Python anomaly detection and Modbus/S7 binary register decoding.
- **JSW_E2E_Automation/**: Playwright end-to-end regression testing suite.

## Quick Start
### 1. Edge Gateway
```bash
cd JSW_Backend
npm install
node start_hmi_server.js
```
Listens on `ws://localhost:5055/ws/siemens-hmi`.

### 2. Frontend HMI
```bash
cd JSW_UI
npm install
npm run dev
```

For full system architecture specifications, see [ARCHITECTURE.md](ARCHITECTURE.md).
