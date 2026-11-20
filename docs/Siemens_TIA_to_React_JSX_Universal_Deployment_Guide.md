# Universal Deployment Guide: Porting the Siemens-to-React Web SCADA Pipeline to Any PC with Any TIA Backup

This guide provides the exact, production-hardened instructions to deploy and run this repository on **any Windows 10/11 or Linux engineering workstation**, connecting to **any Siemens PLC/HMI backup** (`.ap16` to `.ap20`, S7-1200 / S7-1500 / WinCC Unified / WinCC Comfort).

---

## 1. Workstation Prerequisites

### A. Minimal Runtime PC (To run Web SCADA + PLC Telemetry Gateway)
No Siemens licenses or TIA Portal installation are required on this machine:
1. **Operating System:** Windows 10/11 (x64) or Ubuntu 22.04 LTS
2. **Node.js:** v18.x or v20.x LTS ([Download Node.js](https://nodejs.org))
3. **Web Browser:** Google Chrome, Microsoft Edge, or Mozilla Firefox
4. **Network:** Direct Ethernet / Wi-Fi route to the Siemens PLC IP (e.g. `192.168.0.1`)

### B. Engineering Extraction PC (Only required if exporting a new raw `.apxx` TIA backup)
1. **TIA Portal:** V16, V17, V18, V19, or V20
2. **Openness Option:** Siemens TIA Portal Openness installed (included in standard TIA installer)
3. **User Group Membership:** Current Windows user added to the `Siemens TIA Openness` Windows user group:
   ```powershell
   # Run in PowerShell (Admin):
   net localgroup "Siemens TIA Openness" "$env:USERNAME" /add
   ```

---

## 2. Deploying the Repository to a New PC

### Step 1: Clone / Copy the Repository
```powershell
git clone <your-git-repository-url> Siemens_VisionCraft_IIoT
cd Siemens_VisionCraft_IIoT\ImageToJSX_Agent
```

### Step 2: Install Node.js Dependencies
```powershell
npm install
```
*(Dependencies installed: `express`, `ws`, `@babel/core`, `@babel/preset-react`, `@babel/preset-env`, `xlsx`)*

---

## 3. Ingesting Any New Siemens PLC / HMI Backup (Exact Commands & Steps)

To adapt this repository to a **brand-new plant backup** (e.g. from an `.ap16`..`.ap20` or `.zap16`..`.zap20` project file):

```
New Plant Backup Files:
├── 1. TIA Project Backup        -->  "NewPlant_Backup.zap20" or "NewPlant_Backup.ap20"
├── 2. Screen Export Folder      -->  D:\Siemens_VisionCraft_IIoT\ALL_SCREENS_XML\
└── 3. Tag Table Export          -->  D:\TIA v20\hmi tags.xlsx
```

### Stage 1: Export SimaticML Screens from the New Backup
Choose either **Option A (Automated via Openness)** or **Option B (Manual inside TIA Portal)**:

#### Option A: Automated Export via TIA Openness (Recommended)
Attach headlessly to TIA Portal and dump all screens in minutes:
```powershell
# 1. Navigate to backend automation engine
cd D:\Siemens_VisionCraft_IIoT\JSW_Backend

# 2. Run the Openness Exporter targeting your new backup file
dotnet run --project OpennessDefaultsExporter.cs -- "D:\TIA v20\NewPlant_Backup.zap20" "D:\Siemens_VisionCraft_IIoT\ALL_SCREENS_XML"
```
*Auto-Extraction:* This dumps all HMI screens as `.xml` into `ALL_SCREENS_XML/` and automatically detects the PLC and HMI IP addresses from the network hardware configuration.

#### Option B: Manual Export via TIA Portal GUI
1. Open your project in **TIA Portal V16 - V20**.
2. In the Project tree, expand: **HMI [Comfort / Unified]** -> **Screens**.
3. Select all screens (`Ctrl + A`) -> Right-Click -> **"Export as XML..."**.
4. Choose the output directory: `D:\Siemens_VisionCraft_IIoT\ALL_SCREENS_XML\`.

---

### Stage 2: Export HMI Tag Tables
1. In TIA Portal, navigate to: **HMI [Comfort / Unified]** -> **HMI Tags**.
2. Select **Show all tags** -> Click the **Export** icon on the table toolbar (or Right-Click -> **Export to Excel / XLSX**).
3. Save the exported spreadsheet to:
   `D:\TIA v20\hmi tags.xlsx` (or set `TAGS_FILE_PATH` in `.env`).

---

### Stage 3: Re-Run Deterministic Audit & Tag Resolver
Execute the 1-click AST audit script to verify and bind the new screen elements to the new PLC tags:
```powershell
cd D:\Siemens_VisionCraft_IIoT\ImageToJSX_Agent

# 1. Audit and resolve all XML screens against the new tag dictionary
node audit_all_elements.js

# 2. Generate updated navigation hierarchy and verification reports
node full_audit_211.js
```
* **Output:** Updates `comprehensive_all_screens_report.json` and `runtime_screen_navigation_truth.json` with 100% verified element-to-DB mappings.

---

### Stage 4: Configure Network IP for the New PLC
Update `.env` in `ImageToJSX_Agent/`:
```ini
# New PLC Target Connection
SIEMENS_PLC_IP=192.168.0.1       # Set to new PLC hardware IP (or 127.0.0.1 for PLCSIM)
SIEMENS_PLC_RACK=0
SIEMENS_PLC_SLOT=1
PORT=4080
```

---

### Stage 5: Launch Web SCADA on the New Backup
```powershell
cd D:\Siemens_VisionCraft_IIoT\ImageToJSX_Agent
node server.js
```
Open **`http://localhost:4080`** in Chrome/Edge. The dropdown will dynamically load all newly exported screens with live telemetry bindings!

---

## 4. Configuring Communication to the Target PLC

Open `server.js` or create an `.env` file in `ImageToJSX_Agent/`:

```ini
# Target PLC Configuration
SIEMENS_PLC_IP=192.168.0.1       # IP address of the physical S7-1500 or S7-PLCSIM Advanced
SIEMENS_PLC_RACK=0
SIEMENS_PLC_SLOT=1
SIEMENS_PLC_USER=admin           # Optional (if using S7-1500 Web API)
SIEMENS_PLC_PASS=admin           # Optional (if using S7-1500 Web API)

# Web SCADA Gateway
PORT=4080
POLL_INTERVAL_MS=250             # Telemetry cyclic update rate (100ms - 1000ms)
```

---

## 5. Starting the Web SCADA Service

### Start the Gateway Server:
```powershell
cd ImageToJSX_Agent
node server.js
```

### Accessing the Web Interface:
* **Local Machine:** Open `http://localhost:4080` in Chrome / Edge.
* **Network / Plant Tablet:** Open `http://<PC_IP_ADDRESS>:4080` from any device on the same local subnet.

---

## 6. Demonstration & Operating Features

1. **Auto-Selected Station:** Automatically loads the primary production station on initial load with full vector scaling.
2. **211+ Screen Switcher:** Pre-baked in the DOM; switch to any station layout instantaneously.
3. **Live Tag Read/Write:** Pushbuttons click-toggle real S7 Data Block bits (e.g. `DB200.DBX12.0 = TRUE (Pulse 500ms)`).
4. **Modal Popups:** Clicking `Legend` opens the centered movement color code dialog without page reload.
5. **Universal Back Navigation:** Clicking `← Back` pops the navigation stack and returns to the parent cell layout.
6. **Code Export:** Click the **`Production JSX`** tab to copy clean React 18 / Tailwind code into your git pipeline.
