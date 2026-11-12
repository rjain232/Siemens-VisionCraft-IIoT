const fs = require('fs');
const crypto = require('crypto');

async function testSuite() {
  console.log('====================================================');
  console.log('  RUNNING AUTOMATED END-TO-END REGRESSION TEST SUITE ');
  console.log('====================================================');

  const testFile = 'C:/Users/SDS/Desktop/ImageToJSX_Agent/public/mockups/Port_Warning_Modal.png';
  const buf = fs.readFileSync(testFile);
  const b64 = buf.toString('base64');

  // TEST 1: Initial Convert & Preview URL
  console.log('\n[TEST 1] POST /api/convert (Clean Image Ingestion)');
  let t0 = Date.now();
  let res = await fetch('http://localhost:4000/api/convert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64: b64, mimeType: 'image/png', forceNew: false })
  });
  let data = await res.json();
  console.log('  -> Status:', res.status, '| fromCache:', data.fromCache, '| Latency:', Date.now() - t0, 'ms');
  console.log('  -> Preview URL:', data.previewUrl);
  if (!data.success || !data.previewUrl) throw new Error('Test 1 failed');

  // TEST 2: Standalone HTML Page Render Verification
  console.log('\n[TEST 2] GET Preview URL Standalone Page');
  let pRes = await fetch(data.previewUrl);
  let html = await pRes.text();
  console.log('  -> HTTP Status:', pRes.status, '| HTML Length:', html.length);
  const hasMountScript = html.includes('ReactDOM.createRoot') && html.includes('__LatestGeneratedComponent');
  console.log('  -> React 18 Mounting Assertion:', hasMountScript ? 'PASSED ✅' : 'FAILED ❌');
  if (!hasMountScript) throw new Error('Test 2 failed');

  // TEST 3: Duplicate Image Instant Cache Check
  console.log('\n[TEST 3] GET /api/check-cache/:hash (Instant Duplicate Detection)');
  const hash = crypto.createHash('sha256').update(b64).digest('hex');
  let cRes = await fetch('http://localhost:4000/api/check-cache/' + hash);
  let cData = await cRes.json();
  console.log('  -> Cached Status:', cData.cached, '| ShareId:', cData.shareId);
  if (!cData.cached) throw new Error('Test 3 failed');

  // TEST 4: 1-Click ZIP Project Downloader
  console.log('\n[TEST 4] POST /api/export-zip (Vite + React 18 + Tailwind Bundle)');
  let zRes = await fetch('http://localhost:4000/api/export-zip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsxCode: data.jsxCode, projectName: 'modal-unit-test' })
  });
  let zBuf = await zRes.arrayBuffer();
  console.log('  -> ZIP HTTP:', zRes.status, '| Size:', zBuf.byteLength, 'bytes');
  if (zRes.status !== 200 || zBuf.byteLength < 1000) throw new Error('Test 4 failed');

  // TEST 5: Chat-to-Modify Prompt Bar
  console.log('\n[TEST 5] POST /api/modify (Conversational Tweaks)');
  let mRes = await fetch('http://localhost:4000/api/modify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      existingJsx: data.jsxCode,
      instruction: 'Add a secondary button with text Dismiss Dialog'
    })
  });
  let mData = await mRes.json();
  console.log('  -> Modify HTTP:', mRes.status, '| Success:', mData.success);
  console.log('  -> Modified Preview URL:', mData.previewUrl);
  if (!mData.success || !mData.jsxCode) throw new Error('Test 5 failed');

  console.log('\n====================================================');
  console.log('   ALL 5 TESTS PASSED WITH ZERO FAULTS (100% HEALTH) ');
  console.log('====================================================');
}

testSuite().catch(err => {
  console.error('\n❌ TEST SUITE FAILURE:', err);
  process.exit(1);
});
