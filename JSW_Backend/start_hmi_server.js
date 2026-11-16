const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const HTTP_PORT = 5055;
const server = http.createServer((req, res) => {
  // If user opens http://localhost:5055/ or /test, serve the live interactive testbench directly!
  if (req.url === '/' || req.url === '/hmi' || req.url === '/test') {
    const testHtml = path.resolve(__dirname, '../ALL_SCREENS_XML/TEST_LIVE_HMI_TAGS.html');
    if (fs.existsSync(testHtml)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(testHtml));
    }
  }
  if (req.url === '/catalog' || req.url === '/screens') {
    const catalogHtml = path.resolve(__dirname, '../ALL_SCREENS_XML/INDEX_ALL_SCREENS.html');
    if (fs.existsSync(catalogHtml)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(catalogHtml));
    }
  }
  if (req.method === 'GET' && req.url === '/ws/siemens-hmi') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: "Siemens HMI Bridge Server Online", port: HTTP_PORT }));
  }
  res.writeHead(404);
  res.end('Not Found');
});

const wss = new WebSocket.Server({ server, path: '/ws/siemens-hmi' });

let hmiTags = {
  Line_Auto_Running: true,
  BSL015_R01_Status: 1,
  SEW_MB220_XM1_ActPos: 402,
  SEW_MB210_U1_Speed: 1450,
  Station_150_Clamped: true,
  Zone03_Safety_OK: true,
  Part_Marriage_Verified: true,
  RFID_Skid_ID: 8421
};

wss.on('connection', (ws) => {
  console.log('[HMI_CLIENT_CONNECTED]');
  ws.send(JSON.stringify({ type: 'SNAPSHOT', screen: 'LIVE_BENCH', tags: hmiTags }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.action === 'WRITE_TAG' && data.tag) {
        hmiTags[data.tag] = data.value;
        console.log(`[PLC_WRITE_COMMAND] Tag: ${data.tag} -> ${data.value}`);
        // Broadcast delta update to all connected screens
        const updateMsg = JSON.stringify({ type: 'UPDATE', tags: { [data.tag]: data.value } });
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) client.send(updateMsg);
        });
      }
    } catch (e) {
      console.error(e);
    }
  });
});

// Simulate realistic machine jitter and travel
setInterval(() => {
  hmiTags.SEW_MB210_U1_Speed = 1440 + Math.floor(Math.random() * 25);
  if (hmiTags.Line_Auto_Running) {
    hmiTags.SEW_MB220_XM1_ActPos = (hmiTags.SEW_MB220_XM1_ActPos >= 480) ? 120 : hmiTags.SEW_MB220_XM1_ActPos + 3;
  }
  const cyclicUpdate = JSON.stringify({
    type: 'UPDATE',
    tags: {
      SEW_MB210_U1_Speed: hmiTags.SEW_MB210_U1_Speed,
      SEW_MB220_XM1_ActPos: hmiTags.SEW_MB220_XM1_ActPos
    }
  });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(cyclicUpdate);
  });
}, 500);

server.listen(HTTP_PORT, () => {
  console.log(`[HMI_BRIDGE_READY] Dedicated Siemens HMI Bridge Service active on ws://localhost:${HTTP_PORT}/ws/siemens-hmi`);
});
