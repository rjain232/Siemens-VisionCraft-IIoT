const XLSX = require('C:/Users/SDS/Desktop/ImageToJSX_Agent/node_modules/xlsx');
const fs = require('fs');
const path = require('path');

const wb = XLSX.readFile('D:/TIA v20/hmi tags.xlsx');
const rawTags = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

console.log('Sample Tag Names from Excel:');
console.log(rawTags.slice(0, 20).map(t => ({ name: t.Name, plcTag: t['PLC tag'] })));

// Check tags containing keywords
const keywords = ['160', 'Layout', 'Button', 'Valve', 'Sicar', 'Move', 'Mode', 'Back'];
for (const kw of keywords) {
  const matches = rawTags.filter(t => (t.Name && t.Name.includes(kw)) || (t['PLC tag'] && t['PLC tag'].includes(kw)));
  console.log(`Keyword "${kw}": found ${matches.length} tags`);
  if (matches.length > 0) {
    console.log('  -> sample:', matches.slice(0, 3).map(m => m.Name));
  }
}
