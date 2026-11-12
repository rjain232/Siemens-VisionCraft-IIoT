const XLSX = require('C:/Users/SDS/Desktop/ImageToJSX_Agent/node_modules/xlsx');
const fs = require('fs');

const wb = XLSX.readFile('D:/TIA v20/hmi tags.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

console.log('Total HMI Tags loaded:', rows.length);

const tagCategories = {
  opmode: [],
  stations: {},
  devices: {},
  alarms: [],
  safety: [],
  general: []
};

for (const row of rows) {
  const name = row['Name'] || '';
  const plcTag = row['PLC tag'] || '';
  const dataType = row['DataType'] || '';
  const scope = row['Scope'] || '';

  if (name.startsWith('OpmodePanel') || name.includes('OPMode')) {
    tagCategories.opmode.push({ name, plcTag, dataType });
  } else if (/^(BSL\d+|SEW|MB\d+|LineMB\d+)/i.test(name)) {
    const prefix = name.split('_')[0];
    if (!tagCategories.stations[prefix]) tagCategories.stations[prefix] = [];
    tagCategories.stations[prefix].push({ name, plcTag, dataType });
  } else if (name.includes('Alarm') || name.includes('Meld')) {
    tagCategories.alarms.push({ name, plcTag, dataType });
  } else if (name.includes('Safe') || name.includes('EStop')) {
    tagCategories.safety.push({ name, plcTag, dataType });
  } else {
    tagCategories.general.push({ name, plcTag, dataType });
  }
}

console.log('--- Tag Category Breakdown ---');
console.log('Opmode Panel (Global inter-screen tags):', tagCategories.opmode.length);
console.log('Safety & Emergency:', tagCategories.safety.length);
console.log('Alarms & Diagnostics:', tagCategories.alarms.length);
console.log('General Process Tags:', tagCategories.general.length);
console.log('Station Specific Subsystems:');
for (const [st, list] of Object.entries(tagCategories.stations)) {
  console.log(`  - ${st}: ${list.length} tags`);
}

// Check sample Opmode tags that link screens and modes
console.log('\nSample Global Shared OPMode Tags (shared across layout screens):');
console.log(tagCategories.opmode.slice(0, 10).map(t => `${t.name} -> ${t.plcTag} (${t.dataType})`));
