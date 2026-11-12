const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const MockPlcService = require('./mockPlcService');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 5050;
const PLC_HOST = process.env.PLC_HOST || '192.168.0.1';
const PLC_WEBAPI_URL = `https://${PLC_HOST}/api/jsonrpc`;

app.use(cors());
app.use(express.json());

// Serve static graphics
app.use('/tia_graphics', express.static(path.join(__dirname, '..', '..', 'hmi-ui', 'assets', 'tia_graphics')));

// Initialize Mock PLC service fallback
const mockPlc = new MockPlcService();

// State Cache
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
    BSL010_DK01_Clamp_Adv: true,
    BSL010_DK01_Clamp_Ret: false,
    BSL010_DK02_Locator_Up: true,
    BSL010_Part_Seated: true,
    Robot1_Status: 'RUNNING',
    Robot1_ToolAngle: 89.94
  }
};

/**
 * Forward request to Siemens S7-1500 Web API (JSON-RPC 2.0)
 */
async function querySiemensWebAPI(method, params, id = 1) {
  // If actual PLC host is unreachable, fallback cleanly to internal mock state
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);

    const response = await fetch(PLC_WEBAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id, method, params }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    return await response.json();
  } catch (err) {
    // Return mock PLC data
    return {
      jsonrpc: '2.0',
      id,
      result: latestPlcState.tags[params?.var?.replace(/"/g, '')] ?? 1.0,
      simulated: true
    };
  }
}

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ONLINE', architecture: 'Siemens TIA Openness <-> WebAPI <-> Node.js <-> React JSX' });
});

app.get('/api/plc/tags', (req, res) => {
  res.json(latestPlcState);
});

app.post('/api/plc/write', (req, res) => {
  const { tag, value } = req.body;
  if (!tag) return res.status(400).json({ error: 'Tag name required' });
  latestPlcState.tags[tag] = value;
  
  // Broadcast update via WebSocket
  broadcast({ type: 'TAG_UPDATE', tag, value, timestamp: new Date().toISOString() });
  res.json({ success: true, tag, value });
});

// WebSocket Real-time Broadcast
function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('[WebSocket] HMI client connected');
  ws.send(JSON.stringify({ type: 'INITIAL_STATE', data: latestPlcState }));

  ws.on('message', async (message) => {
    try {
      const parsed = JSON.parse(message);
      if (parsed.type === 'READ_TAG') {
        const result = await querySiemensWebAPI('PlcProgram.Read', { var: parsed.tag });
        ws.send(JSON.stringify({ type: 'TAG_VALUE', tag: parsed.tag, result }));
      } else if (parsed.type === 'WRITE_TAG') {
        latestPlcState.tags[parsed.tag] = parsed.value;
        broadcast({ type: 'TAG_UPDATE', tag: parsed.tag, value: parsed.value });
      }
    } catch (e) {
      console.error('[WebSocket] Invalid message:', e.message);
    }
  });
});

// Simulation Loop (revs telemetry every second)
setInterval(() => {
  latestPlcState.timestamp = new Date().toISOString();
  latestPlcState.tags.CycleTimeSeconds = +(40 + Math.random() * 5).toFixed(1);
  latestPlcState.tags.Robot1_ToolAngle = +(88 + Math.random() * 4).toFixed(2);
  broadcast({ type: 'TELEMETRY_TICK', data: latestPlcState.tags });
}, 1000);

server.listen(PORT, () => {
  console.log(`[JSW_HMI Backend] Server running on http://localhost:${PORT}`);
  console.log(`[JSW_HMI Backend] WebSocket listening on ws://localhost:${PORT}`);
});
