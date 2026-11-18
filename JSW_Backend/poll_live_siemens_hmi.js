/**
 * poll_live_siemens_hmi.js
 * Accurate GraphQL schema query for Siemens WinCC Unified V20 Runtime
 */

const http = require('http');

function postGraphQL(body, cookie = '') {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    };
    if (cookie) headers['Cookie'] = cookie;

    const req = http.request({
      hostname: '127.0.0.1',
      port: 4000,
      path: '/graphql',
      method: 'POST',
      headers
    }, (res) => {
      let data = '';
      const setCookies = res.headers['set-cookie'] || [];
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data), cookies: setCookies });
        } catch(e) {
          resolve({ status: res.statusCode, raw: data, cookies: setCookies });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('=======================================================================');
  console.log('  TESTING LIVE SIEMENS HMI READ/WRITE WITH EXACT SCHEMA');
  console.log('=======================================================================');

  // 1. Querying Tag Values
  console.log('\n[*] Querying Live Tag Values (tagValues)...');
  const readQuery = {
    query: `
      query {
        tagValues(names: [
          "Line_Auto_Running",
          "TotalParts",
          "BSL010_DK01_Status",
          "SEW_MB220_XM1_ActPos",
          "OpmodePanel_opmode{1}_userInterfaceOut_controlNoHmi"
        ]) {
          name
          value {
            value
            timestamp
          }
          error {
            code
            description
          }
        }
      }
    `
  };
  const readRes = await postGraphQL(readQuery);
  console.log('[+] Live Tag Values Response:');
  console.log(JSON.stringify(readRes.data, null, 2));

  // 2. Querying Active Alarms
  console.log('\n[*] Querying Active Alarms (activeAlarms)...');
  const alarmQuery = {
    query: `
      query {
        activeAlarms {
          id
          name
          state
          alarmClass
          modificationTime
        }
      }
    `
  };
  const alarmRes = await postGraphQL(alarmQuery);
  console.log('[+] Active Alarms Response:');
  console.log(JSON.stringify(alarmRes.data, null, 2));

  // 3. Testing Tag Write
  console.log('\n[*] Testing Tag Write (writeTagValues)...');
  const writeMutation = {
    query: `
      mutation {
        writeTagValues(input: [
          { name: "TotalParts", value: 105 }
        ]) {
          name
          error {
            code
            description
          }
        }
      }
    `
  };
  const writeRes = await postGraphQL(writeMutation);
  console.log('[+] Write Response:');
  console.log(JSON.stringify(writeRes.data, null, 2));

  console.log('\n=======================================================================');
  console.log('  POLL & TEST COMPLETED');
  console.log('=======================================================================');
}

run().catch(console.error);
