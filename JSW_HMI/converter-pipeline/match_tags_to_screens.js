const fs = require('fs');
const path = require('path');
const XLSX = require('C:/Users/SDS/Desktop/ImageToJSX_Agent/node_modules/xlsx');

// 1. Load All 1,148 Tags from Excel / Openness Tag Export
const tagFilePath = 'D:/TIA v20/hmi tags.xlsx';
const wb = XLSX.readFile(tagFilePath);
const sheet = wb.Sheets[wb.SheetNames[0]];
const rawTags = XLSX.utils.sheet_to_json(sheet);

console.log(`Loaded ${rawTags.length} TIA HMI Tags from ${tagFilePath}`);

const tagDict = new Map();
for (const row of rawTags) {
  const name = (row['Name'] || '').trim();
  const plcTag = (row['PLC tag'] || '').trim();
  const dataType = (row['DataType'] || '').trim();
  const connection = (row['Connection'] || '').trim();

  if (name) {
    tagDict.set(name.toLowerCase(), { name, plcTag, dataType, connection });
  }
}

// 2. Scan All 211 XML Screen Files
const xmlDir = 'C:/Users/SDS/Desktop/ALL_SCREENS_XML';
const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));

const screenTagMatches = {};
const tagScreenUsage = new Map();
let totalMatches = 0;

for (const file of files) {
  const screenName = file.replace('.xml', '');
  const content = fs.readFileSync(path.join(xmlDir, file), 'utf8');
  screenTagMatches[screenName] = [];

  // Look for any exact tag name or partial tag name mentioned in the XML
  for (const [lowerTagName, meta] of tagDict.entries()) {
    // Check if XML text contains the tag name or PLC tag
    if (content.toLowerCase().includes(lowerTagName)) {
      screenTagMatches[screenName].push(meta);
      totalMatches++;

      if (!tagScreenUsage.has(meta.name)) {
        tagScreenUsage.set(meta.name, []);
      }
      tagScreenUsage.get(meta.name).push(screenName);
    }
  }
}

// Sort tags by frequency of appearance across screens
const sharedAcrossScreens = [...tagScreenUsage.entries()]
  .map(([name, screens]) => ({
    name,
    screenCount: screens.length,
    screens: screens.slice(0, 10),
    plcTag: (tagDict.get(name.toLowerCase()) || {}).plcTag
  }))
  .sort((a, b) => b.screenCount - a.screenCount);

console.log(`\n=== MATCH SUMMARY ===`);
console.log(`Total XML Screens Scanned: ${files.length}`);
console.log(`Total Unique Tags Matched: ${tagScreenUsage.size}`);
console.log(`Total Screen-Tag Associations: ${totalMatches}`);

console.log('\nTop 15 Most Shared Tags across Screens:');
console.log(sharedAcrossScreens.slice(0, 15));

// Check Station 160FX1Layout specifics
console.log('\nTags explicitly matching 160FX1Layout:');
console.log(screenTagMatches['160FX1Layout'] ? screenTagMatches['160FX1Layout'].map(t => `${t.name} -> ${t.plcTag}`) : 'None');

// Save detailed match report
fs.writeFileSync(
  'C:/Users/SDS/Desktop/JSW_HMI/converter-pipeline/tag_screen_match_report.json',
  JSON.stringify({
    totalTags: rawTags.length,
    matchedTagsCount: tagScreenUsage.size,
    sharedAcrossScreens: sharedAcrossScreens.slice(0, 50),
    screenTagMatches
  }, null, 2)
);
console.log('\nFull match report written to: C:/Users/SDS/Desktop/JSW_HMI/converter-pipeline/tag_screen_match_report.json');
