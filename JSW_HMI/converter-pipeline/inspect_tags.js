const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const filePath = 'D:/TIA v20/hmi tags.xlsx';
if (!fs.existsSync(filePath)) {
  console.log('File not found:', filePath);
  process.exit(1);
}

const workbook = XLSX.readFile(filePath);
console.log('Sheets found:', workbook.SheetNames);

const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);
console.log('Total tags in Excel:', data.length);
console.log('First 5 tags:');
console.log(data.slice(0, 5));

// Analyze tag structures and groupings (DBs, Stations, Shared Areas)
const dbGroups = {};
const stationGroups = {};
let globalHmiCount = 0;

for (const row of data) {
  const tagName = row['Name'] || row['Tag Name'] || Object.values(row)[0] || '';
  const plcTag = row['PLC tag'] || row['Logical Address'] || Object.values(row)[1] || '';
  
  // Extract DB or block name
  const dbMatch = String(plcTag || tagName).match(/"([^"]+)"|([A-Za-z0-9_]+_DB|[A-Za-z0-9_]+_HMI)/);
  if (dbMatch) {
    const db = dbMatch[1] || dbMatch[2];
    dbGroups[db] = (dbGroups[db] || 0) + 1;
  }

  // Extract Station prefix (e.g. 150, 160, 190, 200, MB220, BSL010)
  const stationMatch = String(tagName).match(/^(1[4-9]0|2[0-9]0|MB\d+|BSL\d+|LineMB\d+)/i);
  if (stationMatch) {
    const st = stationMatch[1].toUpperCase();
    stationGroups[st] = (stationGroups[st] || 0) + 1;
  }

  if (String(tagName).includes('LineMB200_HMI') || String(tagName).includes('OPMode') || String(tagName).includes('Global')) {
    globalHmiCount++;
  }
}

console.log('\nTop DB Groups:');
console.log(Object.entries(dbGroups).sort((a,b) => b[1] - a[1]).slice(0, 15));

console.log('\nTags Grouped by Line/Station Prefix:');
console.log(Object.entries(stationGroups).sort((a,b) => b[1] - a[1]));

console.log('\nGlobal Line Status / Mode Tags Count:', globalHmiCount);
