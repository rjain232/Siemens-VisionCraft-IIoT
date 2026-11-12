const http = require('http');
const { WebSocketServer } = require('c:/Users/SDS/OneDrive - dacpl.in/Desktop/JSW/JSW_Backend/node_modules/ws');
const { getSiemensHmiBridge } = require('c:/Users/SDS/OneDrive - dacpl.in/Desktop/JSW/JSW_Backend/src/services/siemensHmiBridge');

const PORT = 5055;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify({ status: 'Siemens HMI Bridge Server Online', port: PORT }));
});

const wssSiemensHmi = new WebSocketServer({ noServer: true });
const siemensBridge = getSiemensHmiBridge();

server.on('upgrade', (req, socket, head) => {
  const { pathname } = new URL(req.url, 'http://' + req.headers.host);
  if (pathname === '/ws/siemens-hmi') {
    wssSiemensHmi.handleUpgrade(req, socket, head, (ws) => {
      wssSiemensHmi.emit('connection', ws, req);
    });
  } else {
    socket.destroy();
  }
});

wssSiemensHmi.on('connection', (ws) => {
  console.log('[HMI_BRIDGE] Client connected to /ws/siemens-hmi');
  siemensBridge.registerClient(ws);
});

server.listen(PORT, () => {
  console.log(`[HMI_BRIDGE_READY] Dedicated Siemens HMI Bridge Service active on ws://localhost:${PORT}/ws/siemens-hmi`);
});
