# Enterprise Industrial Automation Architecture: TIA Openness to Web HMI

An end-to-end specification of the automated engineering and runtime pipeline bridging Siemens TIA Portal projects (`.zap20`), C# Openness extraction, Node.js edge telemetry gateways, and pixel-perfect React Web SCADA screens.

---

## 1. Clean Enterprise Folder Structure

A standardized, multi-tiered repository layout that separates **offline engineering artifacts**, **automation compilers**, **edge gateways**, and the **web presentation layer**:

```
siemens-web-scada-platform/
│
├── 📂 01_engineering/                      # Level 1: PLC & HMI Engineering Sources
│   ├── backups/
│   │   └── PLCbackup_Line1.zap20           # Compressed TIA Portal V20 Project Backup
│   ├── tag_tables/
│   │   ├── hmi_tags.xlsx                   # Exported Tag Spreadsheet (Symbolic <-> DB Offset)
│   │   └── PEData.plf                      # Siemens HMI Binary Tag/Cross-Reference File
│   └── screens/
│       └── hmi_screens.pptx                # Screen layout designs & master asset definitions
│
├── 📂 02_dotnet_compiler/                  # Level 2: C# / .NET Openness Automation Engine
│   ├── TIA_Antigravity.sln                 # Visual Studio Solution (.NET Framework 4.8)
│   ├── src/
│   │   ├── AntigravityAddInServer.cs       # Official TIA Portal GUI Add-In Implementation
│   │   ├── OpennessProjectExtractor.cs     # Headless TIA Portal project traversal & unpacking
│   │   └── SimaticMLParser.cs              # Exports DB/FB blocks into structured SimaticML XML
│   ├── lib/
│   │   ├── Siemens.Engineering.dll         # Official Siemens TIA Openness Core Assembly (GAC)
│   │   └── Siemens.Engineering.Hmi.dll     # Siemens HMI Screen Automation Assembly
│   └── output/
│       ├── tags.dictionary.json            # Compiled Tag Offset Map (Symbolic -> DB Address)
│       ├── blocks_simaticml/               # Exported PLC Blocks in XML (DB, FB, FC, OB)
│       └── svg_assets/                     # Extracted vector graphics & screen backgrounds
│
├── 📂 03_edge_gateway/                     # Level 3: Runtime Node.js Telemetry Microservice
│   ├── package.json
│   ├── .env                                # PLC IP, Port, Credentials, Poll Rates
│   ├── src/
│   │   ├── server.js                       # Primary HTTP Server & WS Upgrade Multiplexer
│   │   ├── start_hmi_server.js             # Dedicated Siemens HMI WebSocket Daemon (Port 5055)
│   │   ├── services/
│   │   │   ├── siemensHmiBridge.js         # Core Tag Engine, WS Broadcaster & Simulation Fallback
│   │   │   ├── siemensWebApiClient.js      # HTTPS JSON-RPC client (Api.Login, PlcProgram.Read/Write)
│   │   │   └── s7commDriver.js             # Direct ISO-on-TCP (Port 102) client using nodes7
│   │   └── utils/
│   │       └── endianUtils.js              # Word-swapping & IEEE-754 32-bit float decoders
│   └── tests/
│       └── test_hmi_bridge.js              # Full-duplex WebSocket & Tag write automated test suite
│
└── 📂 04_web_scada_ui/                     # Level 4: React 18 Web HMI (Siemens MTP1500 Panel)
    ├── package.json
    ├── public/
    │   └── hmi_assets/                     # Static screen backdrops & vector widgets
    │       ├── image1.png                  # Screen 1: Station Overview
    │       ├── image2.png                  # Screen 2: Station Modify
    │       ├── image3.png                  # Screen 3: Robot Status
    │       ├── image4.png                  # Screen 4: System & Settings
    │       └── image5.png                  # Screen 5: Production Status
    └── src/
        ├── App.jsx
        ├── pages/
        │   └── SiemensPlantHMI.jsx         # 16:9 Bezel UI, Multi-screen carousel & dynamic overlay
        ├── hooks/
        │   └── useSiemensHmiSocket.js      # Resilient WebSocket hook with auto-reconnection
        └── context/
            └── BackgroundExportContext.jsx # Headless off-screen shift report generation engine
```

---

## 2. End-to-End Execution Flowchart

```mermaid
flowchart TD
    subgraph STAGE_1 ["Stage 1: Offline Engineering & Extraction"]
        A["TIA Portal Project<br/>(PLCbackup.zap20)"] -->|Open via Openness| B[".NET Converter Tool<br/>(Siemens.Engineering.dll)"]
        B -->|Export Blocks| C["SimaticML (XML)<br/>+ Tag Dictionaries"]
        B -->|Extract Panels| D["HMI Screen Assets<br/>(SVG / PNG)"]
    end

    subgraph STAGE_2 ["Stage 2: Code Generation & Setup"]
        C -->|Parse AST & Offsets| E["JSXparser.js / Generators"]
        D --> E
        E -->|Compile| F["SiemensPlantHMI.jsx<br/>(Pixel-Perfect React UI)"]
    end

    subgraph STAGE_3 ["Stage 3: Live Shop-Floor Runtime"]
        G["Physical Siemens S7-1500<br/>(PLC Web API / Port 443)"] <-->|JSON-RPC HTTPS<br/>(Api.Login, Tag Read/Write)| H["Node.js Edge Bridge<br/>(siemensHmiBridge.js)"]
        H <-->|Bi-directional WebSocket<br/>ws://host:5055/ws/siemens-hmi| F
    end

    style STAGE_1 fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff
    style STAGE_2 fill:#1e1e38,stroke:#a855f7,stroke-width:2px,color:#fff
    style STAGE_3 fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#fff
```

---

## 3. Data Contracts & Communication Protocols

### A. Runtime WebSocket Contract (Frontend $\leftrightarrow$ Edge Gateway)
All messages across `ws://localhost:5055/ws/siemens-hmi` are strictly typed JSON payloads:

#### 1. Server-to-Client Initial State (`SNAPSHOT`)
Fired immediately upon client connection:
```json
{
  "type": "SNAPSHOT",
  "plcOnline": true,
  "timestamp": "2026-11-12T15:55:23.104Z",
  "data": {
    "Line_Auto_Running": true,
    "Operating_Mode": "AUTO",
    "BSL015_R01_Status": 2,
    "SEW_MB220_XM1_ActPos": 420.5,
    "WeldSpotCountSummary": 48,
    "TotalCycles": 1420
  }
}
```

#### 2. Client-to-Server Tag Mutation (`WRITE_TAG`)
Dispatched when an operator interacts with HMI pushbuttons, toggles, or setpoints:
```json
{
  "type": "WRITE_TAG",
  "tag": "BSL015_R01_Status",
  "value": 2
}
```

#### 3. Server Broadcast to All Connected Clients (`UPDATE`)
Dispatched when physical PLC state changes or a write command completes:
```json
{
  "type": "UPDATE",
  "data": {
    "BSL015_R01_Status": 2
  }
}
```

---

### B. Gateway-to-PLC Protocol (Edge Gateway $\leftrightarrow$ S7-1500 Controller)
The bridge communicates with the PLC's embedded HTTPS server via **Siemens Web API JSON-RPC 2.0**:

```http
POST /api/jsonrpc HTTP/1.1
Host: 192.168.0.1
Content-Type: application/json
X-Auth-Token: <SESSION_TOKEN>

{
  "jsonrpc": "2.0",
  "id": 1709210400,
  "method": "PlcProgram.Write",
  "params": {
    "var": "\"DB_Robot_Data\".BSL015_R01_Status",
    "value": 2
  }
}
```

---

## 4. Resilience & The Dual-Engine Failover Strategy

Industrial networks experience electrical noise, cable breaks, and PLC maintenance reboots. To maintain operator visibility and continuous development/testing, the architecture implements a **Dual-Engine Strategy**:

```
                  ┌──────────────────────────────────────────────┐
                  │          Node.js Edge Bridge Server          │
                  └──────────────────────┬───────────────────────┘
                                         │
                        [ Hardware Health Check: 3000ms ]
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼ (Hardware Reachable)                      ▼ (Hardware Offline / Demo)
    ┌───────────────────────────────┐           ┌───────────────────────────────┐
    │     PHYSICAL PLC MODE         │           │      SIMULATION FALLBACK      │
    │ • JSON-RPC HTTPS requests     │           │ • Simulates axis movement     │
    │ • Port 102 S7comm direct reads│           │ • Increments weld counters    │
    │ • Actual sensor telemetry     │           │ • Emits realistic plant noise │
    └───────────────────────────────┘           └───────────────────────────────┘
                   │                                           │
                   └─────────────────────┬─────────────────────┘
                                         ▼
                     [ Broadcasts to React UI via WS ]
```

1. **Hardware Mode:** When the S7-1500 CPU is online, commands write directly to PLC data blocks, and live sensor values stream to the web UI.
2. **Simulation Fallback:** If the network cable is detached or during offline customer demos, the service smoothly activates an internal state generator. It simulates SEW servo motions, weld spot increments, and turntable indexing without crashing the UI or dropping the WebSocket connection.

---

## 5. Senior Interview Talking Points

When presenting this architecture to senior interviewers or technical panels:

> *"In legacy industrial environments, SCADA projects are fragile because engineers manually copy tag addresses from TIA Portal into SCADA development tools—a single offset error corrupts production data.*
>
> *I designed a modern, automated toolchain:*
> 1. ***Engineering Automation:*** *We use a C# .NET Openness tool referencing `Siemens.Engineering.dll` to inspect the `.zap20` backup headlessly, extracting SimaticML XML logic, tag offset tables, and screen graphics.*
> 2. ***Code Generation:*** *These exports are compiled into a pixel-perfect React HMI mirroring the Siemens MTP1500 Unified Comfort Panel.*
> 3. ***Runtime Telemetry:*** *The React interface connects over a high-performance full-duplex WebSocket (`/ws/siemens-hmi`) to a Node.js edge daemon. This daemon translates operator UI actions into Siemens JSON-RPC Web API calls with sub-20ms latency and includes automatic simulation fallback to guarantee 100% uptime during demos and maintenance windows."*
