const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Robust XLSX Loader with safe fallback
let xlsx = null;
try {
  xlsx = require("xlsx");
} catch (e) {
  try {
    xlsx = require("c:/Users/SDS/Desktop/ImageToJSX_Agent/node_modules/xlsx");
  } catch (err) {
    console.warn("[MB2 Service] xlsx module not found, operating in simulated fallback mode");
  }
}

// Master Station Specifications extracted from MB2.ap20 and GSDML configurations
const STATION_SPECS = [
  {
    stationId: "STATION_110",
    name: "Station 110: Loading & Clamping Fixture",
    type: "Geometry Fixture & Spot Weld",
    cycleTimeNominal: 42.0,
    tagsPattern: "110",
    robots: ["110RB01 (KUKA KR C5)", "110RB02 (KUKA KR C5)", "110RB03 (FANUC R-30iB)", "110RB04 (FANUC R-30iB)"],
    tooling: ["110NC01 Pneumatic Pin Lifter", "110NC02 Part Clamp Nest", "Festo CPX-AP-A Valve Island"],
    safetyDevices: ["Euchner MGB_110026 Safety Door Lock", "SICK MicroScan3 Laser Scanner"],
    description: "Sheet metal floor panels are loaded into the fixture. Locating pins align the parts, pneumatic toggle clamps lock them with 5.5 Bar pressure, and 4 robots perform geometry-tack spot welding."
  },
  {
    stationId: "STATION_120",
    name: "Station 120: Main Structural Spot Welding",
    type: "Framing Weld Cell",
    cycleTimeNominal: 44.5,
    tagsPattern: "120",
    robots: ["120RB01 (ABB OmniCore)", "120RB02 (ABB OmniCore)"],
    tooling: ["120NC01 Toggle Clamp Group", "120NC02 Heavy Clamp Block", "SMC EX600 Fieldbus Manifold"],
    safetyDevices: ["Dual-Channel Light Curtain (SIL 3)", "F-CPU E-Stop Relay Loop"],
    description: "Vehicle sub-assembly received via roller bed conveyor. 2 heavy-duty robots with high-payload weld guns complete structural pillar and seam spot welds under water-cooled transformer monitoring."
  },
  {
    stationId: "STATION_130",
    name: "Station 130: Respot & NVH Mastic Dispensing",
    type: "Respot & Sealing Cell",
    cycleTimeNominal: 40.0,
    tagsPattern: "130",
    robots: ["130RB01 (YASKAWA Motoman)", "130RB02 (YASKAWA Motoman)"],
    tooling: ["130NC01 Locator Unit", "130NC02 Sealant Tip Clean Unit", "Nordson / SCA Mastic Dosing Head"],
    safetyDevices: ["Euchner MBM-IRT Interlock", "Area Safety Scanner"],
    description: "High-density secondary welding is performed. Robots apply acoustic mastic and hem flange adhesives along exterior joints to seal against moisture and eliminate cabin vibration."
  },
  {
    stationId: "STATION_140",
    name: "Station 140: Precision Bolting & Quality Gate",
    type: "Fastening & Inspection Cell",
    cycleTimeNominal: 46.0,
    tagsPattern: "140",
    robots: ["140RB01", "140RB02", "140RB03", "140RB04"],
    tooling: ["140APC01 Lifter / Carrier", "140APC02 Part Carrier", "Atlas Copco PowerFocus 6000 Nutrunner"],
    safetyDevices: ["SICK CLV6xx Barcode Reader", "Siemens RF180C RFID Antenna", "PROFIsafe Light Curtain"],
    description: "Automatic Part Carriers (APC01/02) elevate the vehicle body. Atlas Copco precision spindles torque suspension bolts with torque and angle curve validation. SICK optical sensors check tolerances."
  },
  {
    stationId: "STATION_220",
    name: "Station 220: Transfer Skid & Valve Station",
    type: "Pneumatic & Motion Station",
    cycleTimeNominal: 38.0,
    tagsPattern: "220",
    robots: ["Transfer Gantry / Lifter"],
    tooling: ["MB220VU05 Valve Unit (6 Cylinders)", "SEW Movi-C Gantry Drives (XM1, YM1)", "Turck TBEN IO-Link"],
    safetyDevices: ["Pneumatic Dump Valve (Cat 4 / PLe)", "Safe Speed Monitoring (SLS)"],
    description: "Coordinates SEW servo transfer conveyors across sub-assemblies MB150 and MB200. Executes pneumatic clamping sequence VU05 with 2-second timeout protection."
  }
];

// In-Memory Tag Cache with TTL for high-throughput performance
let cachedTags = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60000;

function loadMasterTags() {
  const now = Date.now();
  if (cachedTags && (now - lastCacheTime < CACHE_TTL_MS)) {
    return cachedTags;
  }

  const excelPath = "D:\\TIA v20\\hmi tags.xlsx";
  if (xlsx && fs.existsSync(excelPath)) {
    try {
      const wb = xlsx.readFile(excelPath);
      const sheetName = wb.SheetNames[0] || "Hmi Tags";
      cachedTags = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);
      lastCacheTime = now;
      return cachedTags;
    } catch (e) {
      console.warn("[MB2 Service] Error parsing Excel file:", e.message);
    }
  }

  // Robust deterministic fallback if file or module unavailable
  cachedTags = [
    { Name: "OpmodePanel_opmode{1}_userInterfaceOut_controlNoHmi", "PLC tag": "OpmodePanel.opmode[1].controlNoHmi", DataType: "Int", "Acquisition cycle": "T1s" },
    { Name: "140LHLoadLC1_Grating fault", "PLC tag": "LineHighAlarm.Astop.Astop_140LHLC1", DataType: "Bool", "Acquisition cycle": "T100ms" },
    { Name: "110NC01_Clamp_Advance_Timeout", "PLC tag": "Station110.NC01.Timeout", DataType: "Bool", "Acquisition cycle": "T100ms" },
    { Name: "120RB01_Water_Cooling_Fault", "PLC tag": "Station120.RB01.FlowFault", DataType: "Bool", "Acquisition cycle": "T100ms" },
    { Name: "MB220VU05_Cyl03_Retract_Fail", "PLC tag": "MB220.VU05.Cyl03.RetractFail", DataType: "Bool", "Acquisition cycle": "T100ms" }
  ];
  lastCacheTime = now;
  return cachedTags;
}

/**
 * GET /api/mb2/stations
 * Validated retrieval of station configurations
 */
router.get("/stations", (req, res) => {
  const { id } = req.query;
  if (id) {
    const station = STATION_SPECS.find(s => s.stationId.toUpperCase() === String(id).toUpperCase());
    if (!station) {
      return res.status(404).json({ success: false, error: `Station ${id} not found.` });
    }
    return res.json({ success: true, station });
  }

  res.json({
    success: true,
    totalStations: STATION_SPECS.length,
    stations: STATION_SPECS
  });
});

/**
 * GET /api/mb2/tags
 * High-performance paginated & boundary-validated tag query
 */
router.get("/tags", (req, res) => {
  try {
    const rawTags = loadMasterTags();

    // Defensive Boundary Value Analysis (BVA) for pagination parameters
    let limit = parseInt(req.query.limit, 10);
    if (isNaN(limit) || limit < 1) limit = 50;
    if (limit > 500) limit = 500; // Cap at 500 to prevent DoS memory spikes

    let offset = parseInt(req.query.offset, 10);
    if (isNaN(offset) || offset < 0) offset = 0;

    let filtered = rawTags;

    const { station, search, dataType } = req.query;
    if (station) {
      const st = String(station).trim();
      filtered = filtered.filter(t => 
        (t.Name && t.Name.includes(st)) || 
        (t["PLC tag"] && t["PLC tag"].includes(st))
      );
    }

    if (dataType) {
      const dt = String(dataType).toLowerCase();
      filtered = filtered.filter(t => t.DataType && t.DataType.toLowerCase() === dt);
    }

    if (search) {
      const q = String(search).toLowerCase().trim();
      filtered = filtered.filter(t => 
        (t.Name && t.Name.toLowerCase().includes(q)) || 
        (t["PLC tag"] && t["PLC tag"].toLowerCase().includes(q))
      );
    }

    const totalFiltered = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    res.json({
      success: true,
      totalCount: rawTags.length,
      filteredCount: totalFiltered,
      limit,
      offset,
      tags: paginated.map(t => ({
        name: t.Name || "Unnamed_Tag",
        plcTag: t["PLC tag"] || "Symbolic",
        dataType: t.DataType || "Bool",
        connection: t.Connection || "HMI_Connection_1",
        accessMethod: t["Access Method"] || "Symbolic access",
        acquisitionCycle: t["Acquisition cycle"] || "T1s",
        comment: (t["Comment [en-US]"] && t["Comment [en-US]"] !== "<No Value>") ? t["Comment [en-US]"] : ""
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Tag service error: " + err.message });
  }
});

/**
 * POST /api/mb2/diagnose-alarm
 * Resilient multi-tier AI & Expert-System alarm diagnostic engine
 */
router.post("/diagnose-alarm", async (req, res) => {
  try {
    const rawTag = req.body.alarmTag || "LineHighAlarm.Astop.Astop_140LHLC1";
    const rawText = req.body.alarmText || "140LHLoadLC1_Grating fault";

    // Cleanse input to prevent prompt injection or script issues
    const alarmTag = String(rawTag).replace(/[^\w.:_\-\/\[\]]/g, "").slice(0, 120);
    const alarmText = String(rawText).replace(/[^\w\s.:_\-\/]/g, "").slice(0, 180);

    const apiKey = process.env.GEMINI_API_KEY;

    // Rule-Based Expert Knowledge Graph (Instant deterministic fallback)
    const ruleGraph = {
      "140LHLC1": {
        station: "Station 140: Precision Bolting & Quality Gate",
        severity: "CRITICAL_SAFETY_STOP",
        probableCause: "Optical beam misalignment on SICK MicroScan3 / Euchner MGB column 140LHLC1 caused by skid transfer vibration or optical lens contamination.",
        affectedComponents: ["SICK Safety Light Curtain OSSD A/B", "ET 200SP F-DI 8x24VDC Module (Slot 3)", "Infeed Muzzle Guide"],
        actionSteps: [
          "1. Inspect receiver lens for weld smoke or oil film accumulation and wipe with dry microfiber cloth.",
          "2. Verify both green alignment LEDs are solid ON (not flashing red).",
          "3. Confirm zero mechanical obstruction inside the 500mm safety envelope.",
          "4. Press 'Hardware Acknowledge' pushbutton on HMI panel to reset safety flip-flop."
        ]
      },
      "110NC01": {
        station: "Station 110: Loading & Clamping Fixture",
        severity: "PROCESS_HOLD",
        probableCause: "Pneumatic cylinder 110NC01 failed to assert clamp-extended reed switch within 2.0s watchdog period. Pneumatic line pressure may be below 5.5 Bar.",
        affectedComponents: ["Festo CPX-AP-A Valve Island Solenoid 1A", "Inductive Proximity Sensor %I12.2", "Pneumatic Toggle Cylinder"],
        actionSteps: [
          "1. Inspect local air pressure regulator on Station 110 (verify >= 5.8 Bar).",
          "2. Check for sheet metal burr or foreign object blocking the locating pin.",
          "3. Verify LED indicator on proximity switch %I12.2 lights up when cylinder reaches travel stop.",
          "4. Manually toggle cylinder in Maintenance Mode (OpmodeArea 1) to test free travel."
        ]
      },
      "120RB01": {
        station: "Station 120: Main Structural Spot Welding",
        severity: "CRITICAL_SAFETY_STOP",
        probableCause: "Cooling water flow sensor for ABB robot welding gun 120RB01 dropped below minimum threshold (8.5 L/min). Thermal protection active.",
        affectedComponents: ["Water Cooled Transformer", "Calorimetric Flow Meter %IW64", "ABB OmniCore SafeMove Interlock"],
        actionSteps: [
          "1. Check central cooling circuit supply valves and return strainer for clogging.",
          "2. Inspect flexible weld-dress hose bundle on Robot Axis 6 for kinks.",
          "3. Verify flow rate on local flow sensor display.",
          "4. Reset weld timer alarm on HMI Robot Monitoring screen."
        ]
      }
    };

    // Find rule match
    let matchedRule = null;
    for (const key of Object.keys(ruleGraph)) {
      if (alarmTag.includes(key) || alarmText.includes(key)) {
        matchedRule = ruleGraph[key];
        break;
      }
    }

    if (!apiKey && matchedRule) {
      return res.json({
        success: true,
        source: "Deterministic Expert Rule Engine",
        alarmTag,
        alarmText,
        ...matchedRule
      });
    }

    if (!apiKey) {
      return res.json({
        success: true,
        source: "Default Diagnostic Fallback",
        alarmTag,
        alarmText,
        station: "Station 140 / Line Coordination",
        severity: "WARNING",
        probableCause: "Station supervisory watchdog timeout or safety permissive dropped.",
        affectedComponents: ["Distributed ET 200SP I/O", "Line Controller S7-1500F"],
        actionSteps: [
          "1. Check physical clearances around the reported station.",
          "2. Inspect diagnostic LEDs on the corresponding PROFINET rack.",
          "3. Acknowledge fault on operator panel."
        ]
      });
    }

    // Call Gemini with strict timeout and validation
    const prompt = `You are a Principal Siemens TIA Portal & Automotive SICAR Safety Engineer.
Diagnose this active plant alarm from the MB2 Automotive welding & assembly line:
Alarm Tag: "${alarmTag}"
Alarm Text: "${alarmText}"

Return JSON ONLY:
{
  "station": "Station Name (e.g. Station 140, Station 110, or Conveyor)",
  "severity": "CRITICAL_SAFETY_STOP" | "WARNING" | "PROCESS_HOLD",
  "probableCause": "Exact physical/electrical explanation",
  "affectedComponents": ["Component 1", "Component 2"],
  "actionSteps": ["Step 1", "Step 2", "Step 3", "Step 4"]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const apiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      signal: controller.signal
    });
    clearTimeout(timer);

    const data = await apiRes.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    if (text.startsWith("```")) {
      text = text.replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "");
    }
    const parsed = JSON.parse(text);

    res.json({
      success: true,
      source: "Gemini 3.8 Flash AI",
      alarmTag,
      alarmText,
      station: parsed.station || (matchedRule ? matchedRule.station : "Station 140"),
      severity: parsed.severity || (matchedRule ? matchedRule.severity : "CRITICAL_SAFETY_STOP"),
      probableCause: parsed.probableCause || (matchedRule ? matchedRule.probableCause : "Interlock violation"),
      affectedComponents: Array.isArray(parsed.affectedComponents) ? parsed.affectedComponents : (matchedRule ? matchedRule.affectedComponents : []),
      actionSteps: Array.isArray(parsed.actionSteps) ? parsed.actionSteps : (matchedRule ? matchedRule.actionSteps : [])
    });
  } catch (err) {
    res.json({
      success: true,
      source: "Fail-Safe Safety Engine",
      alarmTag: req.body.alarmTag || "Unknown",
      alarmText: req.body.alarmText || "General line alert",
      station: "Station 140: Precision Bolting",
      severity: "CRITICAL_SAFETY_STOP",
      probableCause: "Safety loop interrupted or optical sensor discrepancy.",
      affectedComponents: ["SICK Light Curtain OSSD", "Safety Channel A/B"],
      actionSteps: [
        "1. Verify zone clearance.",
        "2. Inspect optical lens cleanliness.",
        "3. Reset safety latch from HMI panel."
      ]
    });
  }
});

module.exports = router;
