# Siemens TIA Portal V20 to Web-Based HMI System

An end-to-end, zero-license, high-performance web HMI system engineered to convert Siemens TIA Portal V20 projects (`PLCbackup.zap20`, SimaticML XML, and HMI tags) into modular React JSX components that run seamlessly on **Full HD (1920 × 1080)** industrial monitors and communicate in real time with Siemens S7-1500 PLCs.

---

## 🏛 System Architecture Overview

```
 ┌────────────────────────────────────────────────────────┐
 │                   SIEMENS TIA PORTAL V20               │
 │            (Project: PLCbackup.zap20 / .ap20)          │
 └───────────────────────────┬────────────────────────────┘
                             │
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │           TIA OPENNESS BRIDGE (.NET Core API)          │
 │         (Siemens.Engineering.dll & Hmi.dll)            │
 └─────────────┬────────────────────────────┬─────────────┘
               │ (SimaticML XML)            │ (Tag Tables)
               ▼                            ▼
 ┌───────────────────────────┐ ┌──────────────────────────┐
 │ 211 Native XML Screens    │ │ 1,148 HMI / PLC Tags     │
 │ (Canvas: 1276 x 673 px)   │ │ (Excel / JSON Tables)    │
 └─────────────┬─────────────┘ └────────────┬─────────────┘
               │                            │
               └─────────────┬──────────────┘
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │               CONVERTER & BINDING PIPELINE             │
 │         - XML to JSX AST Parser (JSXparser.js)         │
 │         - Tag-to-Faceplate Matcher                     │
 │         - FHD 1920x1080 Viewport Scaler                │
 └───────────────────────────┬────────────────────────────┘
                             │
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │               MODULAR REACT HMI (hmi-ui)               │
 │    - Auto-scaled to 1920x1080 via <HMIViewport>        │
 │    - Dynamic Faceplates (Valves, Drives, Sequences)    │
 │    - Client-side Routing (124+ Back & Mode Switches)   │
 └─────────────▲────────────────────────────▲─────────────┘
               │ (WebSocket Realtime)       │ (User Commands)
               ▼                            ▼
 ┌────────────────────────────────────────────────────────┐
 │               NODE.JS BACKEND SERVICE                  │
 │    - WebSocket Server (Port 4000)                      │
 │    - Subscriptions & Shared Tag Cache                  │
 └───────────────────────────┬────────────────────────────┘
                             │ (JSON-RPC WebAPI)
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │                SIEMENS S7-1500 PLC                     │
 │         (Firmware v2.9+ / v3.0+ Built-in WebAPI)       │
 └────────────────────────────────────────────────────────┘
```

---

## 📂 Repository Structure

```
JSW_HMI/
├── docs/                                # Full Architecture & Technical Documentation
│   ├── ARCHITECTURE.md                  # Comprehensive system blueprint & data flows
│   ├── OPENNESS_BRIDGE.md               # Siemens Openness API export/import specs
│   ├── TAG_BINDING_SPEC.md              # Tag mapping (Global vs Station DB tags)
│   ├── FHD_VIEWPORT_GUIDE.md            # 1920x1080 scaling and touch interface guide
│   └── PLC_COMMUNICATION.md             # Siemens S7-1500 WebAPI JSON-RPC protocol
├── tia-openness-bridge/                 # C# .NET Openness Bridge & TIA Add-In
│   ├── TIA_Openness_Bridge/             # Local REST API server (Ports 5088-5095)
│   │   ├── Program.cs                   # Openness entrypoint & HTTP server
│   │   └── TIA_Openness_Bridge.csproj
│   ├── TIA_Antigravity_AddIn/           # TIA Portal Add-In menu integration
│   └── START_TIA_AI_BRIDGE.bat          # 1-Click launcher
├── converter-pipeline/                  # Parsing, Conversion & Tag Binding
│   ├── JSXparser.js                     # SimaticML AST to React JSX converter
│   ├── export_all_jsx.js                # Batch converts 211 XMLs to JSX
│   ├── exact_faceplate_tag_bindings.json# Exact screen-to-PLC tag binding schema
│   ├── bind_faceplates_to_tags.js       # Faceplate-to-tag reconciliation engine
│   └── match_tags_to_screens.js         # Cross-matching script
├── hmi-ui/                              # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── HMIViewport.jsx          # FHD 1920x1080 uniform scaler
│   │   │   └── Faceplates/              # Reusable SICAR Valve & Drive controls
│   │   └── screens/                     # Converted Station Screens (160FX1Layout, etc.)
│   └── package.json
└── backend-service/                     # Realtime Middleware
    ├── src/
    │   ├── server.js                    # Express + WebSocket tag gateway
    │   ├── mockPlcService.js            # Offline PLC tag simulator
    │   └── testSiemensApis.js           # PLC WebAPI test client
    └── package.json
```

---

## 🚀 Quick Start

### 1. Run the Frontend & Viewport Test
```powershell
cd C:\Users\SDS\Desktop\JSW_HMI\hmi-ui
npm install
npm run dev
```
Open **`http://localhost:4000/test_fhd.html`** in your browser to verify full 1920 × 1080 responsiveness.

### 2. Run the Realtime Backend
```powershell
cd C:\Users\SDS\Desktop\JSW_HMI\backend-service
npm install
npm start
```
Starts the WebSocket service on port 4000 for live tag streaming.

### 3. Connect to Live TIA Portal (Openness)
```powershell
cd C:\Users\SDS\Desktop\JSW_HMI\tia-openness-bridge
.\START_TIA_AI_BRIDGE.bat
```
Attaches to the active TIA Portal V20 instance and serves tag and XML endpoints on port 5088.

---

## 📜 Detailed Documentation
- [System Architecture](docs/ARCHITECTURE.md)
- [Openness API Specifications](docs/OPENNESS_BRIDGE.md)
- [Tag Binding Specification](docs/TAG_BINDING_SPEC.md)
- [FHD 1920x1080 Viewport Guide](docs/FHD_VIEWPORT_GUIDE.md)
- [PLC WebAPI Communication](docs/PLC_COMMUNICATION.md)
