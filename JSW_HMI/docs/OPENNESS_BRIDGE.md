# Siemens TIA Portal Openness API Integration

This document outlines how the **TIA Openness Bridge** (`/tia-openness-bridge`) interfaces with Siemens TIA Portal V20 to automate project extraction and data ingestion.

---

## 1. Overview
The bridge connects to Siemens TIA Portal V20 using the official public assemblies:
- `Siemens.Engineering.dll`
- `Siemens.Engineering.Hmi.dll`

It runs as a local HTTP service on ports `5088–5095` to allow Antigravity, automated build tools, and web pipelines to query TIA projects without manual clicks.

---

## 2. API Endpoints

### `GET /status`
Returns information on whether TIA Portal is open and which project is active.
```json
{
  "connected": true,
  "project": "PLCbackup.zap20",
  "path": "D:\\TIA v20\\PLCbackup"
}
```

### `GET /screens`
Lists all HMI screens within the active project target.

### `GET /tags`
Enumerates all PLC tag tables and HMI tag bindings directly from the engineering object model.

### `GET /export-screen?name={ScreenName}`
Exports the requested screen to SimaticML XML using `screen.Export(fileInfo, ExportOptions.WithDefaults)`.

---

## 3. Windows Configuration & Security
To run Openness calls without permission prompts:
1. Ensure your Windows user is in the **`Siemens TIA Openness`** user group:
   ```powershell
   net localgroup "Siemens TIA Openness"
   ```
2. Whitelist the bridge executable in the Windows Registry under Siemens Openness Client Permissions if required.
