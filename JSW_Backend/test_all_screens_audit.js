const fs = require('fs');
const path = require('path');
const http = require('http');

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(new Error(`Failed to parse: ${data.slice(0, 100)}`));
        }
      });
    }).on('error', reject);
  });
}

async function runBatchAudit() {
  console.log('========================================================================');
  console.log('  BATCH VERIFICATION: 100% ELEMENT-LEVEL RESOLVER ACROSS ALL XML SCREENS');
  console.log('========================================================================\n');

  // 1. Get all available XML screens
  const xmlScreensRes = await getJson('http://127.0.0.1:4080/api/tia/xml-screens');
  if (!xmlScreensRes.success || !xmlScreensRes.screens) {
    console.error('Failed to list XML screens:', xmlScreensRes);
    return;
  }

  const screens = xmlScreensRes.screens;
  console.log(`[INFO] Found ${screens.length} total exported Siemens HMI XML screens.\n`);

  let elementPreciseCount = 0;
  let subsystemCount = 0;
  let totalMappedElements = 0;

  const summary = [];

  // 2. Iterate through screens and test mapping endpoint
  for (let i = 0; i < screens.length; i++) {
    const screenFile = screens[i];
    const screenName = screenFile.replace(/\.xml$/, '');
    const encoded = encodeURIComponent(screenName);

    try {
      const res = await getJson(`http://127.0.0.1:4080/api/hmi/screen-tag-mapping/${encoded}`);
      
      if (res.precisionMode === '100%_ELEMENT_LEVEL') {
        elementPreciseCount++;
      } else {
        subsystemCount++;
      }
      totalMappedElements += res.mappedTagCount;

      summary.push({
        index: i + 1,
        screen: screenName,
        mode: res.precisionMode,
        mappedTags: res.mappedTagCount,
        sampleTag: res.tags && res.tags[0] ? res.tags[0].name : 'None'
      });

      if ((i + 1) % 25 === 0 || i === screens.length - 1) {
        console.log(`[PROGRESS] Processed ${i + 1} / ${screens.length} screens... (Element-Level: ${elementPreciseCount}, Subsystem: ${subsystemCount})`);
      }
    } catch(err) {
      console.error(`[ERROR] Processing ${screenName}:`, err.message);
    }
  }

  console.log('\n========================================================================');
  console.log('  AUDIT SUMMARY RESULTS');
  console.log('========================================================================');
  console.log(`Total Screens Tested:           ${screens.length}`);
  console.log(`100% Element-Level Precision:   ${elementPreciseCount} screens`);
  console.log(`Subsystem Filter Fallback:      ${subsystemCount} screens`);
  console.log(`Total On-Screen Tag Bindings:   ${totalMappedElements} elements mapped`);
  console.log('========================================================================\n');

  console.log('Sample 30 Screens Audit Report:');
  console.table(summary.slice(0, 30));

  // Save full audit log to disk
  fs.writeFileSync(
    'c:\\Users\\SDS\\OneDrive - dacpl.in\\Desktop\\JSW\\JSW_Backend\\batch_screens_audit.json',
    JSON.stringify({ screensCount: screens.length, elementPreciseCount, subsystemCount, totalMappedElements, summary }, null, 2)
  );
  console.log('\n[SAVED] Full detailed report saved to batch_screens_audit.json');
}

runBatchAudit().catch(console.error);
