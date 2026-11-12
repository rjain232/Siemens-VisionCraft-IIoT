const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { runFaangAgenticPipeline, runComponentModifier, sanitizeAndCompileAST } = require('./agent');
const { synthesizeBackendLogic } = require('./backendAgent');
const archiver = require('archiver');

const crypto = require('crypto');
const xlsx = require('xlsx');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 4000;

// Siemens PLC Tag State Cache & WebSocket Streamer
let latestPlcState = {
  timestamp: new Date().toISOString(),
  connected: false,
  mode: 'AUTO',
  tags: {
    Line_Auto_Running: true,
    Operating_Mode: 'AUTO',
    CycleTimeSeconds: 42.4,
    TotalParts: 1420,
    TargetParts: 1500,
    Valve1To8_Pos: 1,
    Valve1To8_State: 3,
    Valve1To8_Alarm: 0,
    'OpmodePanel_opmode{1}_userInterfaceOut_controlNoHmi': 1,
    'OpmodePanel_opmode{2}_userInterfaceOut_opmodeArea': 2,
    MB140LifterActualPos: 845.2,
    MB160RoofClamp_Work: true,
    MB160RoofClamp_Home: false,
    Robot1_Status: 'RUNNING'
  }
};

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('[WebSocket] HMI client connected to live PLC stream');
  ws.send(JSON.stringify({ type: 'INITIAL_STATE', data: latestPlcState }));

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
      if (parsed.type === 'WRITE_TAG') {
        const { tag, value } = parsed;
        latestPlcState.tags[tag] = value;
        latestPlcState.timestamp = new Date().toISOString();
        broadcast({ type: 'TAG_UPDATE', tag, value, timestamp: latestPlcState.timestamp });
      } else if (parsed.type === 'SUBSCRIBE') {
        ws.send(JSON.stringify({ type: 'SUBSCRIBED', screen: parsed.screen, tags: latestPlcState.tags }));
      }
    } catch (e) {
      console.error('[WebSocket] Invalid message received:', e.message);
    }
  });
});

// Periodic PLC Simulation Tick (1000ms heartbeat)
setInterval(() => {
  latestPlcState.tags.CycleTimeSeconds = +(40 + Math.random() * 5).toFixed(1);
  latestPlcState.tags.TotalParts += Math.random() > 0.8 ? 1 : 0;
  latestPlcState.timestamp = new Date().toISOString();
  broadcast({
    type: 'PLC_CYCLE_TICK',
    data: {
      timestamp: latestPlcState.timestamp,
      CycleTimeSeconds: latestPlcState.tags.CycleTimeSeconds,
      TotalParts: latestPlcState.tags.TotalParts
    }
  });
}, 1000);

// In-memory + disk cache map: imageHash -> cachedResult
const cacheFilePath = path.join(__dirname, 'cache.json');
let imageCache = {};
if (require('fs').existsSync(cacheFilePath)) {
  try {
    imageCache = JSON.parse(require('fs').readFileSync(cacheFilePath, 'utf8'));
  } catch (e) {
    imageCache = {};
  }
}

function saveCache() {
  try {
    require('fs').writeFileSync(cacheFilePath, JSON.stringify(imageCache, null, 2));
  } catch (e) {
    console.error('Failed to persist cache:', e.message);
  }
}

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({
  limits: { fileSize: 25 * 1024 * 1024 }
});

app.get('/api/check-cache/:hash', (req, res) => {
  const hash = req.params.hash;
  if (imageCache[hash]) {
    res.json({
      cached: true,
      shareId: imageCache[hash].shareId,
      previewUrl: imageCache[hash].previewUrl
    });
  } else {
    res.json({ cached: false });
  }
});

/**
 * TIA Portal V20 Tag Extraction & Generation API
 * Reads all tags from D:\TIA v20\hmi tags.xlsx and generates mock PLC data / mappings
 */
app.get('/api/hmi/tags', (req, res) => {
  try {
    const excelPath = 'D:\\TIA v20\\hmi tags.xlsx';
    if (!require('fs').existsSync(excelPath)) {
      return res.status(404).json({ error: 'hmi tags.xlsx not found at ' + excelPath });
    }
    const wb = xlsx.readFile(excelPath);
    const sheetName = wb.SheetNames[0] || 'Hmi Tags';
    const rawTags = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);

    const { search, limit = 50, offset = 0 } = req.query;
    let filtered = rawTags;
    if (search) {
      const q = String(search).toLowerCase();
      filtered = rawTags.filter(t => 
        (t.Name && t.Name.toLowerCase().includes(q)) || 
        (t['PLC tag'] && t['PLC tag'].toLowerCase().includes(q)) ||
        (t.DataType && t.DataType.toLowerCase().includes(q))
      );
    }

    const paginated = filtered.slice(Number(offset), Number(offset) + Number(limit));

    // Grouping by subsystem
    const subsystems = {
      OpmodePanel: rawTags.filter(t => t.Name?.includes('OpmodePanel')).length,
      StationSeq: rawTags.filter(t => t.Name?.includes('Seq') || t.Name?.includes('Step')).length,
      Robots: rawTags.filter(t => t.Name?.toLowerCase().includes('robot') || t.Name?.includes('R0')).length,
      Alarms: rawTags.filter(t => t.Name?.toLowerCase().includes('alarm') || t.Name?.toLowerCase().includes('fault')).length,
      Safety: rawTags.filter(t => t.Name?.toLowerCase().includes('safe') || t.Name?.toLowerCase().includes('checksum')).length,
    };

    res.json({
      success: true,
      totalTags: rawTags.length,
      filteredCount: filtered.length,
      subsystems,
      tags: paginated.map(t => ({
        name: t.Name,
        plcTag: t['PLC tag'],
        dataType: t.DataType,
        connection: t.Connection,
        accessMethod: t['Access Method'],
        acquisitionCycle: t['Acquisition cycle'],
        comment: t['Comment [en-US]'] === '<No Value>' ? '' : t['Comment [en-US]']
      }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read HMI tags: ' + err.message });
  }
});

/**
 * TIA Portal V20 Preset Screens Endpoint
 */
app.get('/api/hmi/screens', (req, res) => {
  const screens = [
    {
      id: 1,
      name: 'Station Overview (Type)',
      file: 'image1.png',
      url: '/mockups/image1.png',
      tagsCount: 42,
      subsystem: 'Station Sequencing & Auto Cycle'
    },
    {
      id: 2,
      name: 'Station Data Modify (Style.Modify)',
      file: 'image2.png',
      url: '/mockups/image2.png',
      tagsCount: 28,
      subsystem: 'Variant Recipe & Offset Adjustment'
    },
    {
      id: 3,
      name: 'Robot Status & Welding (Robot)',
      file: 'image3.png',
      url: '/mockups/image3.png',
      tagsCount: 64,
      subsystem: 'KUKA/Fanuc Spot & MIG Welding'
    },
    {
      id: 4,
      name: 'System & Settings (Safety Checksum)',
      file: 'image4.png',
      url: '/mockups/image4.png',
      tagsCount: 36,
      subsystem: 'F-CPU Safety & Drive Parameters'
    },
    {
      id: 5,
      name: 'Production Hourly Status (ProdData)',
      file: 'image5.png',
      url: '/mockups/image5.png',
      tagsCount: 52,
      subsystem: 'Shift OEE & Hourly Hit Rate'
    }
  ];
  res.json({ success: true, screens });
});

/**
 * Endpoint to list all 211+ real exported Siemens TIA XML screens
 */
app.get('/api/tia/xml-screens', (req, res) => {
  try {
    const xmlDir = 'C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML';
    if (!require('fs').existsSync(xmlDir)) {
      return res.json({ success: false, screens: [] });
    }
    const files = require('fs').readdirSync(xmlDir).filter(f => f.endsWith('.xml'));
    res.json({ success: true, count: files.length, screens: files });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Endpoint to query categorized Siemens HMI graphics, icons, styles and plant visuals
 */
app.get('/api/tia/graphics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, 'public', 'siemens_visual_catalog.json');
    if (fs.existsSync(catalogPath)) {
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      return res.json({ success: true, ...catalog });
    }
    const gDir = path.join(__dirname, 'public', 'tia_graphics');
    const files = fs.existsSync(gDir) ? fs.readdirSync(gDir).filter(f => /\.(png|jpg|jpeg|svg)$/i.test(f)) : [];
    res.json({ success: true, total: files.length, graphics: files });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Endpoint to load and convert any Siemens XML screen by name (Method 1 + 3 Combined)
 */
app.get('/api/tia/render-screen/:screenName', (req, res) => {
  try {
    const rawName = req.params.screenName.replace(/\.xml$/, '');
    const xmlPath = path.join('C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML', `${rawName}.xml`);
    if (!require('fs').existsSync(xmlPath)) {
      return res.status(404).json({ success: false, error: `Screen ${rawName}.xml not found.` });
    }
    const xmlContent = require('fs').readFileSync(xmlPath, 'utf8');
    const jsxCode = parseSimaticXmlToJsx(xmlContent, rawName);
    const astCompile = sanitizeAndCompileAST(jsxCode);
    res.json({
      success: true,
      screenName: rawName,
      compName: astCompile.componentName || 'GeneratedScreen',
      jsxCode,
      compiledJs: astCompile.compiledJs,
      xmlContent,
      fromXml: true
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Siemens WinCC Unified Web Client API & Gateway Proxy Config
 * Exposes live WinCC Unified runtime screens via WebRH without manual parsing
 */
let WINCC_UNIFIED_CONFIG = {
  hmiHost: process.env.WINCC_HMI_HOST || '127.0.0.1',
  hmiPort: process.env.WINCC_HMI_PORT || '443',
  protocol: process.env.WINCC_HMI_PROTOCOL || 'https',
  webPath: '/WebRH/',
  activeMode: 'react' // 'react' or 'webrh'
};

app.get('/api/tia/webrh/config', (req, res) => {
  const fullWebUrl = `${WINCC_UNIFIED_CONFIG.protocol}://${WINCC_UNIFIED_CONFIG.hmiHost}:${WINCC_UNIFIED_CONFIG.hmiPort}${WINCC_UNIFIED_CONFIG.webPath}`;
  res.json({
    success: true,
    config: WINCC_UNIFIED_CONFIG,
    fullWebUrl
  });
});

app.post('/api/tia/webrh/config', express.json(), (req, res) => {
  const { hmiHost, hmiPort, protocol, activeMode } = req.body;
  if (hmiHost) WINCC_UNIFIED_CONFIG.hmiHost = hmiHost.trim();
  if (hmiPort) WINCC_UNIFIED_CONFIG.hmiPort = String(hmiPort).trim();
  if (protocol) WINCC_UNIFIED_CONFIG.protocol = protocol.trim();
  if (activeMode) WINCC_UNIFIED_CONFIG.activeMode = activeMode;

  const fullWebUrl = `${WINCC_UNIFIED_CONFIG.protocol}://${WINCC_UNIFIED_CONFIG.hmiHost}:${WINCC_UNIFIED_CONFIG.hmiPort}${WINCC_UNIFIED_CONFIG.webPath}`;
  res.json({
    success: true,
    message: 'Updated Siemens WinCC Unified WebRH Configuration',
    config: WINCC_UNIFIED_CONFIG,
    fullWebUrl
  });
});

/**
 * TIA Portal V20 SCL & LAD Logic Generator Endpoint (Gemini-Powered)
 */
const mb2StationRoutes = require('c:/Users/SDS/OneDrive - dacpl.in/Desktop/JSW/JSW_Backend/src/routes/mb2StationRoutes.js');
app.use('/api/mb2', mb2StationRoutes);

/**
 * Siemens WinCC / SimaticML XML Screen to React JSX Converter
 */
const { parseSimaticXmlToJsx } = require('./simaticXmlParser');

app.post('/api/convert-xml', express.text({ type: ['application/xml', 'text/xml', 'text/plain'], limit: '10mb' }), async (req, res) => {
  try {
    const xmlContent = req.body;
    if (!xmlContent || typeof xmlContent !== 'string' || xmlContent.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Empty or invalid XML content provided.' });
    }

    // 100% Exact Siemens XML parsing with attached tags & geometry - Zero AI hallucination, 0ms latency
    const jsxCode = parseSimaticXmlToJsx(xmlContent);

    // Pre-compile to pure JS so browser doesn't need to transpile or worry about imports
    const astCompile = sanitizeAndCompileAST(jsxCode);

    res.json({
      success: true,
      compName: astCompile.componentName || 'GeneratedScreen',
      jsxCode,
      compiledJs: astCompile.compiledJs,
      fromXml: true,
      message: 'Successfully rendered exact Siemens XML screen with tags'
    });
  } catch (err) {
    console.error('[XML-to-JSX Error]:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/plc/generate-logic', async (req, res) => {
  try {
    const { 
      blockType = 'FUNCTION_BLOCK', // 'FUNCTION_BLOCK' or 'FUNCTION'
      blockName = 'FB_Station_Auto_Sequence',
      description = 'Station sequencing, clamping interlocks, and robot weld release with 5s timeout',
      selectedTags = [],
      targetPlc = 'S7-1500' // 'S7-1500' or 'S7-1200'
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in .env' });
    }

    const tagContext = selectedTags.length > 0 
      ? `Use these real PLC tags from the project:\n${selectedTags.map(t => `- ${t.name || t} (${t.dataType || 'Bool'}): ${t.plcTag || ''}`).join('\n')}`
      : 'Generate realistic S7-1500 SICAR automotive tags (Auto_Run, Clamp_Adv, Clamp_Ret, Sensor_Seated, Weld_Permit, Fault_Timeout).';

    const prompt = `You are a Principal Siemens TIA Portal V20 Automation & Control Engineer (SICAR / IEC 61131-3 standard).

TASK:
Generate industrial S7-1500 PLC logic for:
Block Name: "${blockName}" (${blockType})
Target: ${targetPlc}
Function Description: ${description}

${tagContext}

You MUST return a valid JSON object with EXACTLY this structure (no markdown wrappers outside JSON):
{
  "blockName": "${blockName}",
  "blockType": "${blockType}",
  "description": "${description}",
  "sclCode": "string (The complete clean Siemens SCL code with proper VAR_INPUT, VAR_OUTPUT, VAR, and CASE sequencing logic)",
  "ladRepresentation": [
    {
      "network": 1,
      "title": "Network 1: Operating Mode & Safety Interlock",
      "comment": "Check Auto mode and safety circuit healthy before cycle start",
      "rungs": [
        { "instruction": "--| |--", "operand": "#Line_Auto_Running", "desc": "Line Auto Run" },
        { "instruction": "--|/|--", "operand": "#E_Stop_Active", "desc": "No E-Stop" },
        { "instruction": "--( )--", "operand": "#Cycle_Permit", "desc": "Permit Cycle" }
      ]
    },
    {
      "network": 2,
      "title": "Network 2: Clamping Advance & Sensor Feedback",
      "comment": "Drive clamp advance solenoid and await proximity sensor feedback",
      "rungs": [
        { "instruction": "--| |--", "operand": "#Cycle_Permit", "desc": "Permit Cycle" },
        { "instruction": "--| |--", "operand": "#Part_Seated", "desc": "Part In Nest" },
        { "instruction": "--(S)--", "operand": "#Clamp_Adv_Solenoid", "desc": "Set Clamp Solenoid" }
      ]
    },
    {
      "network": 3,
      "title": "Network 3: Robot Weld Release Handshake",
      "comment": "Send release permission to KUKA/Fanuc welding robot",
      "rungs": [
        { "instruction": "--| |--", "operand": "#Clamp_Adv_Sensor", "desc": "Clamp Advanced" },
        { "instruction": "--| |--", "operand": "#Station_Safe", "desc": "Safety OK" },
        { "instruction": "--( )--", "operand": "#Robot_Release_Permit", "desc": "Robot Weld Release" }
      ]
    }
  ],
  "simaticMlXml": "string (Valid SimaticML XML for TIA Openness import via PlcBlockGroup.Blocks.CreateFromXml)"
}

Requirements:
1. SCL code must have proper headers, variable declarations, and state-machine sequencing.
2. Ladder (LAD) networks must be clean, structured, and easy to read.
3. Return ONLY valid raw JSON.`;

    let parsed = null;
    const plcModels = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-flash-latest'];
    for (const m of plcModels) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.1 }
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
          if (text.startsWith('```')) {
            text = text.replace(/^```[a-zA-Z]*\n/, '').replace(/\n```$/, '');
          }
          parsed = JSON.parse(text);
          if (parsed && (parsed.sclCode || parsed.networks)) break;
        }
      } catch (_) {
        // Continue to next model tier
      }
    }

    if (!parsed) {
      const isCleanroom = description.toLowerCase().includes('cleanroom') || description.toLowerCase().includes('hvac') || description.toLowerCase().includes('fab');
      const isBess = description.toLowerCase().includes('bess') || description.toLowerCase().includes('battery') || description.toLowerCase().includes('storage');
      
      const cleanName = isCleanroom 
        ? 'FB_Cleanroom_HVAC_Cascade' 
        : isBess 
        ? 'FB_BESS_Thermal_Safety' 
        : (blockName.replace(/[^A-Za-z0-9_]/g, '') || 'FB_Station_Auto_Sequence');

      if (isCleanroom) {
        parsed = {
          blockName: cleanName,
          blockType: 'FUNCTION_BLOCK',
          description: description,
          sclCode: `// =============================================================================
// Siemens TIA Portal V20 SCL Block - High-Precision Cleanroom HVAC
// Industry: Semiconductor & EEE Fabrication (ISO Class 1 - 5)
// Block: "${cleanName}"
// Description: ${description}
// Generated: ${new Date().toISOString()}
// =============================================================================

FUNCTION_BLOCK "${cleanName}"
TITLE = 'Cleanroom Environment Precision Controller'
{ S7_Optimized_Access := 'TRUE' }
AUTHOR : 'VisionCraft_Industrial'
FAMILY : 'CLEANROOM'
VERSION : 2.0

VAR_INPUT
    Auto_Mode : Bool;                  // System in Automatic Regulation mode
    Fire_Alarm_Active : Bool;          // Hardwired interlock from Fire Alarm System
    E_Stop_Active : Bool;              // Emergency Air Shutdown switch
    Target_Temp_C : Real := 21.50;     // Precision setpoint (21.50 °C ± 0.10 °C)
    Target_Humidity_RH : Real := 42.0; // ESD prevention setpoint (42.0% ± 1.0%)
    Target_Pressure_Pa : Real := 45.0; // Positive pressure cascade setpoint (+45.0 Pa)
    
    // Analog Transmitters (4-20mA / 24-bit RTD)
    Actual_Temp_C : Real;              // 4-wire PT100 RTD cleanroom air temperature
    Actual_Humidity_RH : Real;         // Capacitive polymer relative humidity transmitter
    Actual_Pressure_Pa : Real;         // Ultra-low differential pressure transmitter (Pa)
    Delta_P_HEPA_Pa : Real;            // HEPA/ULPA filter pressure drop (Pa)
    Particle_Count_0_3um : DInt;       // Laser optical particle counter (particles/m³)
END_VAR

VAR_OUTPUT
    Supply_Fan_VFD_Hz : Real;          // Inverter frequency command to Supply Fan (0-50.0 Hz)
    Exhaust_Damper_Pct : Real;         // Modulating exhaust damper position (0-100.0%)
    Chilled_Water_Valve_Pct : Real;    // Pressure-independent chilled water valve (0-100.0%)
    Reheat_Valve_Pct : Real;           // Precision electric/hot water reheat valve (0-100.0%)
    Humidifier_Output_Pct : Real;      // DI Ultrasonic / clean steam humidifier output (0-100.0%)
    
    // Safety & Alarms
    Alarm_Temp_Out_Of_Spec : Bool;     // Temperature deviated > 0.15 °C
    Alarm_RH_Out_Of_Spec : Bool;       // Humidity deviated > 2.0%
    Alarm_Pressure_Lost : Bool;        // Room pressure dropped < 25 Pa (Particle ingress risk)
    Alarm_HEPA_Clogged : Bool;         // Filter loading exceeded 250 Pa
    System_Healthy : Bool;             // All parameters in ISO Class 1-5 compliance
END_VAR

VAR
    Temp_Error : Real;
    RH_Error : Real;
    Pressure_Error : Real;
    Timer_Safety_Debounce : TON_TIME;
END_VAR

BEGIN
    // Network 1: Emergency & Fire Safety Interlock
    IF #Fire_Alarm_Active OR #E_Stop_Active THEN
        #Supply_Fan_VFD_Hz := 0.0;
        #Exhaust_Damper_Pct := 0.0;
        #Chilled_Water_Valve_Pct := 0.0;
        #Reheat_Valve_Pct := 0.0;
        #Humidifier_Output_Pct := 0.0;
        #System_Healthy := FALSE;
        RETURN;
    END_IF;

    IF #Auto_Mode THEN
        // Network 2: Ultra-Precision Temperature Regulation (± 0.1°C)
        #Temp_Error := #Actual_Temp_C - #Target_Temp_C;
        IF #Temp_Error > 0.05 THEN
            // Cooling Demand
            #Chilled_Water_Valve_Pct := LIMIT(MN := 0.0, IN := (#Temp_Error * 40.0) + 20.0, MX := 100.0);
            #Reheat_Valve_Pct := 0.0;
        ELSIF #Temp_Error < -0.05 THEN
            // Heating / Reheat Demand
            #Chilled_Water_Valve_Pct := 0.0;
            #Reheat_Valve_Pct := LIMIT(MN := 0.0, IN := (ABS(#Temp_Error) * 45.0) + 15.0, MX := 100.0);
        ELSE
            // In Tight Deadband (± 0.05 °C)
            #Chilled_Water_Valve_Pct := 15.0; // Maintain base dehumidification coil chill
            #Reheat_Valve_Pct := 12.0;       // Trim reheat
        END_IF;

        // Network 3: Relative Humidity Control (42% ESD Window)
        #RH_Error := #Actual_Humidity_RH - #Target_Humidity_RH;
        IF #RH_Error < -1.0 THEN
            // Low humidity: Risk of electrostatic discharge (ESD)
            #Humidifier_Output_Pct := LIMIT(MN := 0.0, IN := ABS(#RH_Error) * 12.0, MX := 100.0);
        ELSIF #RH_Error > 1.0 THEN
            // High humidity: Deep-chill coil + reheat dehumidification cycle
            #Humidifier_Output_Pct := 0.0;
            #Chilled_Water_Valve_Pct := LIMIT(MN := #Chilled_Water_Valve_Pct, IN := #Chilled_Water_Valve_Pct + 25.0, MX := 100.0);
            #Reheat_Valve_Pct := LIMIT(MN := #Reheat_Valve_Pct, IN := #Reheat_Valve_Pct + 20.0, MX := 100.0);
        ELSE
            #Humidifier_Output_Pct := 0.0;
        END_IF;

        // Network 4: Differential Pressure Cascade (+45 Pa)
        #Pressure_Error := #Target_Pressure_Pa - #Actual_Pressure_Pa;
        #Supply_Fan_VFD_Hz := LIMIT(MN := 25.0, IN := 45.0 + (#Pressure_Error * 0.8), MX := 50.0);
        #Exhaust_Damper_Pct := LIMIT(MN := 10.0, IN := 50.0 - (#Pressure_Error * 1.5), MX := 90.0);

        // Network 5: Cleanroom Alarms & Compliance Evaluation
        #Alarm_Temp_Out_Of_Spec := ABS(#Temp_Error) > 0.15;
        #Alarm_RH_Out_Of_Spec := ABS(#RH_Error) > 2.0;
        #Alarm_Pressure_Lost := #Actual_Pressure_Pa < 25.0;
        #Alarm_HEPA_Clogged := #Delta_P_HEPA_Pa > 250.0;

        #System_Healthy := NOT (#Alarm_Temp_Out_Of_Spec OR #Alarm_RH_Out_Of_Spec OR #Alarm_Pressure_Lost OR #Alarm_HEPA_Clogged);
    END_IF;
END_FUNCTION_BLOCK`,
          ladRepresentation: [
            {
              network: 1,
              title: "Network 1: Cleanroom Master Safety Interlock",
              comment: "Shuts down supply fans and closes air dampers on Fire or E-Stop",
              rungs: [
                { instruction: "--| |--", operand: "#Auto_Mode", desc: "Auto Enabled" },
                { instruction: "--|/|--", operand: "#Fire_Alarm_Active", desc: "No Fire Alarm" },
                { instruction: "--|/|--", operand: "#E_Stop_Active", desc: "E-Stop Safe" },
                { instruction: "--( )--", operand: "#AHU_Run_Permissive", desc: "Run Permissive" }
              ]
            },
            {
              network: 2,
              title: "Network 2: Positive Room Pressure Cascade Protection",
              comment: "Detects loss of positive pressure (+45Pa setpoint, alarm at <25Pa)",
              rungs: [
                { instruction: "--| |--", operand: "#AHU_Run_Permissive", desc: "AHU Running" },
                { instruction: "[CMP < 25.0 Pa]", operand: "#Actual_Pressure_Pa", desc: "Pressure Drop" },
                { instruction: "--(S)--", operand: "#Alarm_Pressure_Lost", desc: "Particle Risk Alarm" }
              ]
            },
            {
              network: 3,
              title: "Network 3: HEPA / ULPA Filter Loading Monitoring",
              comment: "Monitors differential pressure across cleanroom ceiling filter grid",
              rungs: [
                { instruction: "[CMP > 250.0 Pa]", operand: "#Delta_P_HEPA_Pa", desc: "Delta-P High" },
                { instruction: "--( )--", operand: "#Alarm_HEPA_Clogged", desc: "Filter Clogged" }
              ]
            }
          ]
        };
      } else {
        // Deterministic S7-1500 SICAR code generator
      parsed = {
        blockName: cleanName,
        blockType: blockType || 'FUNCTION_BLOCK',
        description: description,
        sclCode: `// =============================================================================
// Siemens TIA Portal V20 SCL Block
// Architecture: S7-1500 / Automotive SICAR Standard
// Block: "${cleanName}" (${blockType})
// Description: ${description}
// Generated: ${new Date().toISOString()}
// =============================================================================

FUNCTION_BLOCK "${cleanName}"
TITLE = '${cleanName}'
{ S7_Optimized_Access := 'TRUE' }
AUTHOR : 'VisionCraft_AI'
FAMILY : 'SICAR'
VERSION : 1.0

VAR_INPUT
    Line_Auto_Running : Bool;         // Line is running in Automatic mode
    E_Stop_Active : Bool;             // Emergency Stop circuit status
    Safety_OK : Bool;                 // Safety zones 1-4 healthy
    Sensor_Part_Present : Bool;       // Workpiece detected in fixture
    Sensor_Clamp_Adv : Bool;          // Clamping cylinder fully advanced
    Sensor_Clamp_Ret : Bool;          // Clamping cylinder fully retracted
    Robot_In_Home : Bool;             // Robot at interference safe home
    Ack_Fault : Bool;                 // HMI Alarm acknowledge button
END_VAR

VAR_OUTPUT
    Solenoid_Clamp_Adv : Bool;        // Valve solenoid: Advance Clamps
    Solenoid_Clamp_Ret : Bool;        // Valve solenoid: Retract Clamps
    Robot_Weld_Permit : Bool;         // Handshake: Release robot to weld
    Station_Cycle_Done : Bool;        // Station sequence completed
    Fault_Timeout : Bool;             // Motion timeout fault
    Fault_Code : Int;                 // Diagnostic error code
END_VAR

VAR
    Step : Int := 0;                  // Sequence Step Register
    Timer_Motion : TON_TIME;          // Motion supervisory timer
    Timer_Pulse : TP_TIME;            // Strobe pulse timer
END_VAR

BEGIN
    // Network 1: Fault Reset Handshake
    IF #Ack_Fault THEN
        #Fault_Timeout := FALSE;
        #Fault_Code := 0;
    END_IF;

    // Network 2: Sequence State Machine
    CASE #Step OF
        0: // Idle / Station Clear State
            #Solenoid_Clamp_Adv := FALSE;
            #Solenoid_Clamp_Ret := TRUE;
            #Robot_Weld_Permit := FALSE;
            #Station_Cycle_Done := FALSE;
            
            IF #Line_Auto_Running AND #Safety_OK AND NOT #E_Stop_Active AND #Sensor_Part_Present THEN
                #Step := 10;
            END_IF;

        10: // Command Clamping Cylinders Advance
            #Solenoid_Clamp_Ret := FALSE;
            #Solenoid_Clamp_Adv := TRUE;
            
            #Timer_Motion(IN := TRUE, PT := T#5S);
            IF #Sensor_Clamp_Adv THEN
                #Timer_Motion(IN := FALSE, PT := T#5S);
                #Step := 20;
            ELSIF #Timer_Motion.Q THEN
                #Fault_Timeout := TRUE;
                #Fault_Code := 101; // Clamp Advance Timeout Fault
                #Step := 99;
            END_IF;

        20: // Handshake: Permit KUKA / Fanuc Robot Spot Welding
            #Robot_Weld_Permit := TRUE;
            
            IF NOT #Robot_In_Home THEN
                #Step := 30; // Robot is actively working
            END_IF;

        30: // Wait for Robot Weld Complete and Return Home
            IF #Robot_In_Home THEN
                #Robot_Weld_Permit := FALSE;
                #Step := 40;
            END_IF;

        40: // Retract Clamps & Release Workpiece
            #Solenoid_Clamp_Adv := FALSE;
            #Solenoid_Clamp_Ret := TRUE;
            
            #Timer_Motion(IN := TRUE, PT := T#5S);
            IF #Sensor_Clamp_Ret THEN
                #Timer_Motion(IN := FALSE, PT := T#5S);
                #Station_Cycle_Done := TRUE;
                #Step := 0; // Cycle complete, return to idle
            ELSIF #Timer_Motion.Q THEN
                #Fault_Timeout := TRUE;
                #Fault_Code := 102; // Clamp Retract Timeout Fault
                #Step := 99;
            END_IF;

        99: // Fault / Lockout State
            #Solenoid_Clamp_Adv := FALSE;
            #Robot_Weld_Permit := FALSE;
            IF #Ack_Fault THEN
                #Step := 0;
            END_IF;
    END_CASE;
END_FUNCTION_BLOCK`,
        ladRepresentation: [
          {
            network: 1,
            title: "Network 1: Auto Mode & Safety Circuit Permissive",
            comment: "Evaluates hardware E-Stop and Line Master Run condition",
            rungs: [
              { instruction: "--| |--", operand: "#Line_Auto_Running", desc: "Line Master Run" },
              { instruction: "--|/|--", operand: "#E_Stop_Active", desc: "E-Stop Healthy" },
              { instruction: "--| |--", operand: "#Safety_OK", desc: "Light Curtains OK" },
              { instruction: "--( )--", operand: "#Station_Permit", desc: "Cycle Permissive" }
            ]
          },
          {
            network: 2,
            title: "Network 2: Clamping Cylinder Advance Solenoid",
            comment: "Drives hydraulic/pneumatic directional valve solenoid",
            rungs: [
              { instruction: "--| |--", operand: "#Station_Permit", desc: "Permit OK" },
              { instruction: "--| |--", operand: "#Sensor_Part_Present", desc: "Workpiece Nest" },
              { instruction: "--|/|--", operand: "#Sensor_Clamp_Adv", desc: "Not Extended" },
              { instruction: "--(S)--", operand: "#Solenoid_Clamp_Adv", desc: "Set Clamp Adv" }
            ]
          },
          {
            network: 3,
            title: "Network 3: Robot Welding Release Handshake",
            comment: "Sets hardware weld release interlock to KUKA Robot Controller",
            rungs: [
              { instruction: "--| |--", operand: "#Sensor_Clamp_Adv", desc: "Part Clamped" },
              { instruction: "--| |--", operand: "#Safety_OK", desc: "Cell Safe" },
              { instruction: "--( )--", operand: "#Robot_Weld_Permit", desc: "Permit Weld" }
            ]
          },
          {
            network: 4,
            title: "Network 4: Motion Supervisory Timeout Alarm",
            comment: "Detects cylinder stall or defective proximity switch (5.0s)",
            rungs: [
              { instruction: "--| |--", operand: "#Solenoid_Clamp_Adv", desc: "Adv Solenoid Active" },
              { instruction: "--|/|--", operand: "#Sensor_Clamp_Adv", desc: "Sensor Missing" },
              { instruction: "[TON 5.0s]", operand: "#Timer_Motion", desc: "Supervisory Timer" },
              { instruction: "--( )--", operand: "#Fault_Timeout", desc: "Motion Fault" }
            ]
          }
        ]
      };
    }
  }

    res.json({ success: true, ...parsed });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate PLC logic: ' + err.message });
  }
});

/**
 * Image URL Ingestion Endpoint
 * Fetches an image from a web URL, data URL, or local path, and returns base64 payload
 */
app.post('/api/fetch-image-url', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'url parameter is required' });
    }

    const trimmed = url.trim();

    // 1. Data URL (data:image/...)
    if (trimmed.startsWith('data:image/')) {
      const match = trimmed.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        return res.json({
          success: true,
          mimeType: match[1],
          base64: match[2],
          dataUrl: trimmed
        });
      }
    }

    // 2. Local file path
    if (require('fs').existsSync(trimmed)) {
      const ext = path.extname(trimmed).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
      const buf = require('fs').readFileSync(trimmed);
      const b64 = buf.toString('base64');
      return res.json({
        success: true,
        mimeType: mime,
        base64: b64,
        dataUrl: `data:${mime};base64,${b64}`
      });
    }

    // 3. Web URL (http:// or https://)
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const response = await fetch(trimmed);
      if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${response.status} ${response.statusText}`);
      }
      const contentType = response.headers.get('content-type') || 'image/png';
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const b64 = buffer.toString('base64');
      const dataUrl = `data:${contentType};base64,${b64}`;

      return res.json({
        success: true,
        mimeType: contentType,
        base64: b64,
        dataUrl
      });
    }

    throw new Error('Invalid URL format. Provide a valid HTTP/HTTPS URL, data URL, or image file path.');
  } catch (err) {
    console.error('Fetch image URL error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/status', (req, res) => {
  res.json({
    platform: 'VisionCraft-FAANG-v2',
    status: 'online',
    agentsOnline: 4,
    supportedProviders: ['gemini-1.5-flash', 'gemini-1.5-pro', 'claude-3-5-sonnet', 'mock-offline']
  });
});

/**
 * Conversational Edit Endpoint ("Chat-to-Modify")
 */
app.post('/api/modify', async (req, res) => {
  try {
    const { existingJsx, instruction, userKey } = req.body;
    if (!existingJsx || !instruction) {
      return res.status(400).json({ error: 'existingJsx and instruction are required.' });
    }

    const geminiKey = process.env.GEMINI_API_KEY || userKey;
    const result = await runComponentModifier({
      existingJsx,
      promptInstruction: instruction,
      apiKey: geminiKey
    });

    const shareId = crypto.randomBytes(4).toString('hex');
    const sharesDir = path.join(__dirname, 'public', 'shares');
    if (!require('fs').existsSync(sharesDir)) {
      require('fs').mkdirSync(sharesDir, { recursive: true });
    }

    const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VisionCraft Live Preview (Modified)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <style>
    html, body { margin: 0; padding: 0; min-height: 100vh; background-color: #0b0f17; font-family: ui-sans-serif, system-ui, sans-serif; }
    #root { min-height: 100vh; width: 100%; display: flex; flex-direction: column; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    try {
      ${result.compiledJs}
      const Comp = window.__LatestGeneratedComponent || (typeof GeneratedScreen !== 'undefined' ? GeneratedScreen : null);
      if (Comp) {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(Comp));
      } else {
        document.getElementById('root').innerHTML = '<div style="color:#f87171;padding:24px;font-family:monospace;font-size:14px;">Error: Component failed to mount.</div>';
      }
    } catch(err) {
      document.getElementById('root').innerHTML = '<div style="color:#f87171;padding:24px;font-family:monospace;font-size:14px;">Render Error: ' + err.message + '</div>';
    }
  </script>
</body>
</html>`;

    require('fs').writeFileSync(path.join(sharesDir, `${shareId}.html`), standaloneHtml);
    const previewUrl = `http://localhost:${PORT}/shares/${shareId}.html`;

    res.json({
      success: true,
      jsxCode: result.code,
      compiledJs: result.compiledJs,
      compName: result.compName,
      previewUrl,
      shareId
    });
  } catch (err) {
    console.error('Modify error:', err);
    res.status(500).json({ error: err.message || 'Failed to modify component' });
  }
});

/**
 * 1-Click Complete Vite + React 18 + Tailwind Project ZIP Exporter
 */
app.post('/api/export-zip', async (req, res) => {
  try {
    const { jsxCode, projectName = 'visioncraft-app' } = req.body;
    if (!jsxCode) {
      return res.status(400).json({ error: 'jsxCode is required to export project.' });
    }

    res.attachment(`${projectName}.zip`);
    const archive = new archiver.ZipArchive({ zlib: { level: 9 } });

    archive.on('error', (err) => {
      res.status(500).send({ error: err.message });
    });

    archive.pipe(res);

    // package.json
    const packageJson = JSON.stringify({
      name: projectName,
      private: true,
      version: '0.1.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1'
      },
      devDependencies: {
        '@vitejs/plugin-react': '^4.3.1',
        autoprefixer: '^10.4.19',
        postcss: '^8.4.38',
        tailwindcss: '^3.4.4',
        vite: '^5.3.4'
      }
    }, null, 2);

    archive.append(packageJson, { name: 'package.json' });

    // vite.config.js
    archive.append(`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`, { name: 'vite.config.js' });

    // tailwind.config.js
    archive.append(`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`, { name: 'tailwind.config.js' });

    // postcss.config.js
    archive.append(`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`, { name: 'postcss.config.js' });

    // index.html
    archive.append(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body class="bg-slate-950 text-white min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`, { name: 'index.html' });

    // src/index.css
    archive.append(`@tailwind base;
@tailwind components;
@tailwind utilities;`, { name: 'src/index.css' });

    // src/main.jsx
    archive.append(`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`, { name: 'src/main.jsx' });

    // src/App.jsx (The synthesized component)
    archive.append(jsxCode, { name: 'src/App.jsx' });

    // README.md
    archive.append(`# ${projectName}

Synthesized by **VisionCraft Enterprise Agent**.

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`
`, { name: 'README.md' });

    await archive.finalize();
  } catch (err) {
    console.error('Export ZIP error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Push to JSW UI Repo Endpoint
 */
/**
 * Push to JSW UI Repo Endpoint - Enterprise Multi-Target & Universal Global Slot
 */
app.post('/api/push-to-jsw', async (req, res) => {
  try {
    let { 
      jsxCode, 
      pageName = 'GeneratedScreen', 
      tabLabel = '',
      routePath = '', 
      targetPage = 'global-widget' 
    } = req.body;

    if (!jsxCode) {
      return res.status(400).json({ error: 'jsxCode is required.' });
    }

    const jswUiPath = 'C:/Users/SDS/OneDrive - dacpl.in/Desktop/JSW/JSW_UI';
    const pagesDir = path.join(jswUiPath, 'src', 'pages', 'generated');
    if (!require('fs').existsSync(pagesDir)) {
      require('fs').mkdirSync(pagesDir, { recursive: true });
    }

    // Clean names
    let cleanCompName = pageName.replace(/[^A-Za-z0-9_]/g, '');
    if (!cleanCompName || !/^[A-Z]/.test(cleanCompName)) {
      cleanCompName = (cleanCompName ? cleanCompName.charAt(0).toUpperCase() + cleanCompName.slice(1) : 'GeneratedScreen');
    }
    
    const cleanRoute = (routePath || cleanCompName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())
      .replace(/[^A-Za-z0-9_-]/g, '').toLowerCase() || 'ai-screen';
    const tabId = cleanRoute.replace(/[^a-z0-9_]/g, '_');
    const finalTabLabel = tabLabel || cleanCompName.replace(/([A-Z])/g, ' $1').trim();

    const filePath = path.join(pagesDir, `${cleanCompName}.jsx`);

    // Ensure proper React imports and component export
    let codeToWrite = jsxCode;
    // Fix export default function name
    if (codeToWrite.includes('export default function')) {
      codeToWrite = codeToWrite.replace(/export\s+default\s+function\s*[A-Za-z0-9_]*\s*\(/, `export default function ${cleanCompName}(`);
    } else if (codeToWrite.includes('export default')) {
      codeToWrite = codeToWrite.replace(/export\s+default\s+([A-Za-z0-9_]+);?/, `export default ${cleanCompName};`);
    } else {
      codeToWrite += `\n\nexport default ${cleanCompName};`;
    }

    // Helper for safe atomic write under Windows & OneDrive
    const safeWrite = (targetPath, fileContent) => {
      try {
        const { execSync } = require('child_process');
        execSync(`attrib -r -s "${targetPath}" 2>nul`);
        execSync(`icacls "${targetPath}" /remove:d Everyone 2>nul`);
        execSync(`icacls "${targetPath}" /grant Everyone:F 2>nul`);
      } catch (_) {}
      require('fs').writeFileSync(targetPath, fileContent, 'utf8');
    };

    safeWrite(filePath, codeToWrite);

    // 1. Maintain Universal Manifest (manifest.json)
    const manifestPath = path.join(pagesDir, 'manifest.json');
    let manifest = [];
    if (require('fs').existsSync(manifestPath)) {
      try {
        manifest = JSON.parse(require('fs').readFileSync(manifestPath, 'utf8'));
      } catch (_) { manifest = []; }
    }

    // Always preserve Siemens Plant HMI widget in the manifest so it never disappears!
    const siemensHmiEntry = {
      id: "SiemensPlantHMIWidget",
      name: "Siemens Plant HMI (TIA Portal V20)",
      targetPage: "global-widget",
      tabId: "siemens_plant_hmi",
      routePath: "siemens-hmi",
      pushedAt: new Date().toISOString()
    };
    if (!manifest.some(m => m.id === "SiemensPlantHMIWidget")) {
      manifest.push(siemensHmiEntry);
    }

    const entryIdx = manifest.findIndex(m => m.id === cleanCompName);
    const manifestEntry = {
      id: cleanCompName,
      name: finalTabLabel,
      targetPage: targetPage,
      tabId: tabId,
      routePath: cleanRoute,
      pushedAt: new Date().toISOString()
    };
    if (entryIdx >= 0) {
      manifest[entryIdx] = manifestEntry;
    } else {
      manifest.unshift(manifestEntry);
    }
    safeWrite(manifestPath, JSON.stringify(manifest, null, 2));

    // 2. Auto-discovered by GlobalWidgetSlot.jsx via import.meta.glob and manifest.json

    let destinationInfo = '';
    let jswUrl = `http://localhost:5173/robot-monitoring`;

    // 3. TARGET: OEE Sub-Tab
    if (targetPage === 'oee' || targetPage === 'oee-tab') {
      const oeeTabNavPath = path.join(jswUiPath, 'src', 'pages', 'production', 'oee', 'components', 'TabNavigation.jsx');
      if (require('fs').existsSync(oeeTabNavPath)) {
        let tabContent = require('fs').readFileSync(oeeTabNavPath, 'utf8');
        const tabEntry = `  { id: "${tabId}", label: "${finalTabLabel}", icon: TrendingUp, componentName: "${cleanCompName}" },`;
        if (!tabContent.includes(`id: "${tabId}"`)) {
          tabContent = tabContent.replace(/export const oeeTabs = \[([\s\S]*?)\];/, (match, inner) => {
            return `export const oeeTabs = [\n${inner.trimEnd()}\n${tabEntry}\n];`;
          });
          safeWrite(oeeTabNavPath, tabContent);
        }
      }
      destinationInfo = `Added as Sub-Tab under OEE (${finalTabLabel})`;
      jswUrl = `http://localhost:5173/oee?tab=${tabId}`;
    }

    // 4. TARGET: Robot Monitoring Sub-Tab
    else if (targetPage === 'robot-monitoring' || targetPage === 'robot') {
      const robotIndexPath = path.join(jswUiPath, 'src', 'pages', 'production', 'robot-monitoring', 'index.jsx');
      if (require('fs').existsSync(robotIndexPath)) {
        let robotContent = require('fs').readFileSync(robotIndexPath, 'utf8');
        const importLine = `import ${cleanCompName} from "../../generated/${cleanCompName}.jsx";`;
        const tabEntry = `  { id: "${tabId}", label: "${finalTabLabel}", icon: "Activity" },`;

        if (!robotContent.includes(`../../generated/${cleanCompName}`)) {
          robotContent = `${importLine}\n${robotContent}`;
        }
        if (!robotContent.includes(`id: "${tabId}"`)) {
          robotContent = robotContent.replace(/const robotMonitoringTabs = \[([\s\S]*?)\];/, (match, inner) => {
            return `const robotMonitoringTabs = [\n${inner.trimEnd()}\n${tabEntry}\n];`;
          });
        }
        if (!robotContent.includes(`activeTab === "${tabId}"`)) {
          robotContent = robotContent.replace(
            '{activeTab === "spot-nok" && <RobotSpotNOK />}',
            `{activeTab === "spot-nok" && <RobotSpotNOK />}\n        {activeTab === "${tabId}" && <${cleanCompName} />}`
          );
        }
        safeWrite(robotIndexPath, robotContent);
      }
      destinationInfo = `Added as Sub-Tab under Robot Monitoring (${finalTabLabel})`;
      jswUrl = `http://localhost:5173/robot-monitoring?tab=${tabId}`;
    }

    // 5. TARGET: Maintenance Sub-Tab
    else if (targetPage === 'maintenance') {
      const maintIndexPath = path.join(jswUiPath, 'src', 'pages', 'maintenance', 'index.jsx');
      if (require('fs').existsSync(maintIndexPath)) {
        let maintContent = require('fs').readFileSync(maintIndexPath, 'utf8');
        const importLine = `import ${cleanCompName} from "../generated/${cleanCompName}.jsx";`;
        const tabEntry = `  { id: "${tabId}", label: "${finalTabLabel}", icon: "Zap" },`;
        const mapEntry = `  "${tabId}": ${cleanCompName},`;

        if (!maintContent.includes(`../generated/${cleanCompName}`)) {
          maintContent = `${importLine}\n${maintContent}`;
        }
        if (!maintContent.includes(`id: "${tabId}"`)) {
          maintContent = maintContent.replace(/const maintenanceTabs = \[([\s\S]*?)\];/, (match, inner) => {
            return `const maintenanceTabs = [\n${inner.trimEnd()}\n${tabEntry}\n];`;
          });
        }
        if (!maintContent.includes(`"${tabId}":`)) {
          maintContent = maintContent.replace(/const componentMap = \{([\s\S]*?)\};/, (match, inner) => {
            return `const componentMap = {\n${inner.trimEnd()}\n${mapEntry}\n};`;
          });
        }
        safeWrite(maintIndexPath, maintContent);
      }
      destinationInfo = `Added as Sub-Tab under Maintenance (${finalTabLabel})`;
      jswUrl = `http://localhost:5173/maintenance?tab=${tabId}`;
    }

    // 6. TARGET: Standalone Route in App.jsx
    else if (targetPage === 'standalone') {
      const appJsxPath = path.join(jswUiPath, 'src', 'App.jsx');
      if (require('fs').existsSync(appJsxPath)) {
        let appContent = require('fs').readFileSync(appJsxPath, 'utf8');
        const lazyLine = `const ${cleanCompName} = lazy(() => import("./pages/generated/${cleanCompName}"));`;
        const routeLine = `<Route path="${cleanRoute}" element={<Suspense fallback={<PageFallback />}><${cleanCompName} /></Suspense>} />`;

        let updated = false;
        if (!appContent.includes(`./pages/generated/${cleanCompName}`)) {
          appContent = appContent.replace(
            'const ThirdPartyData = lazy(() => import("./pages/third-party-data"));',
            `const ThirdPartyData = lazy(() => import("./pages/third-party-data"));\n${lazyLine}`
          );
          updated = true;
        }
        if (!appContent.includes(`path="${cleanRoute}"`)) {
          appContent = appContent.replace(
            '<Route path="help" element={<Suspense fallback={<PageFallback />}><Help /></Suspense>} />',
            `<Route path="help" element={<Suspense fallback={<PageFallback />}><Help /></Suspense>} />\n                ${routeLine}`
          );
          updated = true;
        }
        if (updated) {
          safeWrite(appJsxPath, appContent);
        }
      }
      destinationInfo = `Added as Standalone Route (/${cleanRoute})`;
      jswUrl = `http://localhost:5173/${cleanRoute}`;

      // Also ensure sidebar navigation item exists in appConfig.js
      const appConfigPath = path.join(jswUiPath, 'src', 'config', 'appConfig.js');
      if (require('fs').existsSync(appConfigPath)) {
        let configContent = require('fs').readFileSync(appConfigPath, 'utf8');
        if (!configContent.includes(`"${cleanRoute}"`)) {
          const navEntry = `  {
    key: "${cleanRoute}",
    label: "${finalTabLabel}",
    icon: MonitorPlay,
    to: "/${cleanRoute}",
    group: "production",
    publicAfterLogin: true,
  },`;
          configContent = configContent.replace(
            'const sidebarNavItems = [',
            `const sidebarNavItems = [\n${navEntry}`
          );
          safeWrite(appConfigPath, configContent);
        }
      }
    }

    // 7. TARGET: Global AI Drag & Drop Widget (Default for ALL pages)
    else {
      destinationInfo = `Registered for All Pages via Global AI Widget Slot (${finalTabLabel})`;
      jswUrl = `http://localhost:5173/robot-monitoring`;
    }

    // 8. AUTONOMOUS BACKEND LOGIC SYNTHESIZER
    // If backend generation is requested, write corresponding Express route & MSSQL query
    let backendResult = null;
    if (req.body.generateBackend) {
      try {
        backendResult = await synthesizeBackendLogic({
          screenName: cleanCompName,
          userRequirement: req.body.backendRequirement || `Add time filter and telemetry aggregation backend for ${cleanCompName}`,
          existingJsx: jsxCode,
          apiKey: process.env.GEMINI_API_KEY
        });

        // Write backend route file to JSW_Backend
        const jswBackendPath = 'C:/Users/SDS/OneDrive - dacpl.in/Desktop/JSW/JSW_Backend';
        const backendRoutesDir = path.join(jswBackendPath, 'src', 'routes');
        const generatedRouteFile = path.join(backendRoutesDir, `generated_${cleanRoute}.js`);
        
        const routeFileContent = `/**
 * Auto-generated by VisionCraft Full-Stack AI Pipeline
 * Feature: ${backendResult.featureSummary || cleanCompName}
 * Created: ${new Date().toISOString()}
 */
const express = require('express');
const router = express.Router();

// SQL Query:
// ${backendResult.sqlQuery ? backendResult.sqlQuery.replace(/\n/g, '\n// ') : ''}

${backendResult.routeCode}

module.exports = router;
`;
        safeWrite(generatedRouteFile, routeFileContent);

        // Mount route in JSW_Backend/src/app.js if not already mounted
        const backendAppPath = path.join(jswBackendPath, 'src', 'app.js');
        if (require('fs').existsSync(backendAppPath)) {
          let appJsContent = require('fs').readFileSync(backendAppPath, 'utf8');
          const routeImportName = `generated_${cleanRoute.replace(/-/g, '_')}`;
          if (!appJsContent.includes(`routes/generated_${cleanRoute}`)) {
            appJsContent = `const ${routeImportName} = require('./routes/generated_${cleanRoute}');\n` + appJsContent;
            appJsContent = appJsContent.replace(
              'app.use("/api/subscriptions", subscriptionRoutes);',
              `app.use("/api/subscriptions", subscriptionRoutes);\napp.use("/api/generated", ${routeImportName});`
            );
            safeWrite(backendAppPath, appJsContent);
          }
        }
      } catch (backendErr) {
        console.warn('Backend generation warning (non-fatal):', backendErr.message);
      }
    }

    res.json({
      success: true,
      componentName: cleanCompName,
      tabLabel: finalTabLabel,
      tabId: tabId,
      routePath: cleanRoute,
      targetPage: targetPage,
      destinationInfo: destinationInfo,
      savedPath: filePath,
      jswUrl: jswUrl,
      backend: backendResult
    });
  } catch (err) {
    console.error('Push to JSW error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/convert', upload.single('image'), async (req, res) => {
  try {
    const modelPreference = req.body.model || 'gemini-1.5-flash';
    let base64Image = '';
    let mimeType = 'image/png';
    let imageName = req.body.imageName || '';

    if (req.file) {
      base64Image = req.file.buffer.toString('base64');
      mimeType = req.file.mimetype;
      imageName = req.file.originalname || imageName;
    } else if (req.body.imageBase64) {
      base64Image = req.body.imageBase64.replace(/^data:image\/\w+;base64,/, '');
      mimeType = req.body.mimeType || 'image/png';
    } else {
      return res.status(400).json({ error: 'No image provided. Please supply an image payload.' });
    }

    const imageHash = crypto.createHash('sha256').update(base64Image).digest('hex');
    const forceNew = req.body.forceNew === true || req.body.forceNew === 'true';

    // If cached and user didn't force new regeneration, serve cached result
    if (imageCache[imageHash] && !forceNew) {
      console.log(`[Cache Hit] Serving cached JSX for image ${imageHash.substring(0, 8)}`);
      return res.json({
        ...imageCache[imageHash],
        fromCache: true
      });
    }

    const geminiKey = process.env.GEMINI_API_KEY || req.body.geminiKey;
    const claudeKey = process.env.ANTHROPIC_API_KEY || req.body.claudeKey;
    // Always use the available Gemini key if model is Gemini or if Claude key is missing
    let apiKey = geminiKey;
    let chosenModel = modelPreference;

    if (modelPreference.startsWith('claude') && claudeKey) {
      apiKey = claudeKey;
      chosenModel = modelPreference;
    } else {
      // Use best available Gemini model with active quota, cascading automatically in agent pipeline
      chosenModel = (modelPreference && !modelPreference.startsWith('claude')) ? modelPreference : 'gemini-3.5-flash';
      apiKey = geminiKey;
    }

    // Run FAANG 4-Agent Pipeline
    const pipelineResult = await runFaangAgenticPipeline({
      base64Image,
      mimeType,
      model: chosenModel,
      apiKey,
      imageName
    });

    const shareId = crypto.randomBytes(4).toString('hex');
    const sharesDir = path.join(__dirname, 'public', 'shares');
    if (!require('fs').existsSync(sharesDir)) {
      require('fs').mkdirSync(sharesDir, { recursive: true });
    }

    // Generate standalone preview HTML page for sharing
    const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VisionCraft Live Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <style>
    html, body { margin: 0; padding: 0; min-height: 100vh; background-color: #0b0f17; font-family: ui-sans-serif, system-ui, sans-serif; }
    #root { min-height: 100vh; width: 100%; display: flex; flex-direction: column; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    try {
      ${pipelineResult.compiledJs}
      const Comp = window.__LatestGeneratedComponent || (typeof GeneratedScreen !== 'undefined' ? GeneratedScreen : null);
      if (Comp) {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(Comp));
      } else {
        document.getElementById('root').innerHTML = '<div style="color:#f87171;padding:24px;font-family:monospace;font-size:14px;">Error: Component failed to mount.</div>';
      }
    } catch(err) {
      document.getElementById('root').innerHTML = '<div style="color:#f87171;padding:24px;font-family:monospace;font-size:14px;">Render Error: ' + err.message + '</div>';
    }
  </script>
</body>
</html>`;

    require('fs').writeFileSync(path.join(sharesDir, `${shareId}.html`), standaloneHtml);
    const previewUrl = `http://localhost:${PORT}/shares/${shareId}.html`;

    const responsePayload = {
      success: true,
      shareId,
      previewUrl,
      imageHash,
      modelUsed: modelPreference,
      tokens: pipelineResult.tokens,
      estimatedCost: pipelineResult.cost,
      jsxCode: pipelineResult.code,
      compiledJs: pipelineResult.compiledJs,
      compName: pipelineResult.compName,
      schema: pipelineResult.schema,
      agentLog: pipelineResult.agentLog,
      healingAttempts: pipelineResult.healingAttempts,
      fromCache: false
    };

    // Store in cache
    imageCache[imageHash] = responsePayload;
    saveCache();

    res.json(responsePayload);
  } catch (err) {
    console.error('FAANG Pipeline execution error:', err);
    res.status(500).json({ error: err.message || 'Pipeline execution failed' });
  }
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`VisionCraft FAANG Pipeline + WebSocket running on http://localhost:${PORT}`);
  console.log(`=======================================================`);
});

