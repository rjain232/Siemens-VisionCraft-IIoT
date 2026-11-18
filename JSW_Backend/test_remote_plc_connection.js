const net = require('net');
const https = require('https');

const TARGET_IP = process.argv[2] || process.env.TARGET_PLC_IP || '192.168.1.200';
console.log(`\n=======================================================`);
console.log(`  SIEMENS PLC SIMULATION DIAGNOSTIC TOOL: ${TARGET_IP}`);
console.log(`=======================================================\n`);

// 1. Check Port 102 (ISO-on-TCP / S7comm)
const s7Socket = new net.Socket();
s7Socket.setTimeout(2500);

console.log(`[*] 1. Testing Port 102 (S7comm / RFC 1006)...`);
s7Socket.connect(102, TARGET_IP, () => {
  console.log(`    [+] SUCCESS: Port 102 is OPEN! S7comm driver can connect.`);
  s7Socket.destroy();
  testPort443();
});

s7Socket.on('error', (err) => {
  console.log(`    [-] Port 102 unreachable (${err.message}).`);
  s7Socket.destroy();
  testPort443();
});

s7Socket.on('timeout', () => {
  console.log(`    [-] Port 102 timed out (Check Windows Firewall on remote PC).`);
  s7Socket.destroy();
  testPort443();
});

function testPort443() {
  console.log(`\n[*] 2. Testing Port 443 (Siemens Web API HTTPS)...`);
  const req = https.request({
    hostname: TARGET_IP,
    port: 443,
    path: '/api/jsonrpc',
    method: 'POST',
    rejectUnauthorized: false,
    timeout: 3000,
    headers: { 'Content-Type': 'application/json' }
  }, (res) => {
    console.log(`    [+] SUCCESS: Port 443 HTTPS responded with status code: ${res.statusCode}!`);
    console.log(`\n[RESULT] Remote PLC Simulation is READY for Live Tag Read/Write!`);
  });

  req.on('error', (err) => {
    console.log(`    [-] Port 443 unreachable (${err.message}).`);
    console.log(`\n[DIAGNOSTIC HINT]`);
    console.log(`  - If both ports failed: Check IP address, Wi-Fi subnet, and Windows Firewall on remote laptop.`);
    console.log(`  - If only Port 102 is open: Use S7comm mode (nodes7).`);
    console.log(`  - If Port 443 is open: Use Siemens JSON-RPC Web API mode.`);
  });

  req.on('timeout', () => {
    console.log(`    [-] Port 443 timed out.`);
    req.destroy();
  });

  req.write(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'Api.Version' }));
  req.end();
}
