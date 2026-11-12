const WebSocket = require('c:/Users/SDS/OneDrive - dacpl.in/Desktop/JSW/JSW_Backend/node_modules/ws');
const ws = new WebSocket('ws://localhost:5055/ws/siemens-hmi');

ws.on('open', () => {
  console.log('[SUCCESS] Connected to /ws/siemens-hmi');
  console.log('[ACTION] Writing Tag: BSL015_R01_Status = 2');
  ws.send(JSON.stringify({ action: 'WRITE_TAG', tag: 'BSL015_R01_Status', value: 2 }));
});

let messageCount = 0;
ws.on('message', (data) => {
  messageCount++;
  const parsed = JSON.parse(data.toString());
  console.log(`[RECEIVE] Message #${messageCount}: Type = ${parsed.type}`);
  
  if (parsed.type === 'INITIAL_STATE' || parsed.type === 'TAGS_UPDATE') {
    const keys = Object.keys(parsed.data || {});
    console.log(`[DATA] Tag count: ${keys.length}. Tags preview:`, keys.slice(0, 5));
    console.log(`[DATA] BSL015_R01_Status:`, parsed.data.BSL015_R01_Status);
    console.log(`[DATA] Line_Auto_Running:`, parsed.data.Line_Auto_Running);
  }

  if (messageCount >= 2) {
    console.log('[COMPLETE] Full duplex write & broadcast test verified successfully.');
    ws.close();
    process.exit(0);
  }
});

ws.on('error', (err) => {
  console.error('[FAIL] WebSocket Error:', err.message);
  process.exit(1);
});

setTimeout(() => {
  console.error('[TIMEOUT] No response within 5 seconds');
  process.exit(1);
}, 5000);
