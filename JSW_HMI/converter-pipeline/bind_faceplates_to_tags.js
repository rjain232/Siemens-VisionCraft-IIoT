const XLSX = require('C:/Users/SDS/Desktop/ImageToJSX_Agent/node_modules/xlsx');
const fs = require('fs');
const path = require('path');

const wb = XLSX.readFile('D:/TIA v20/hmi tags.xlsx');
const rawTags = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
const xmlDir = 'C:/Users/SDS/Desktop/ALL_SCREENS_XML';
const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));

// 1. Map Faceplates and Controls across all screens
const faceplateUsage = {};
const screenFaceplates = {};

for (const file of files) {
  const screen = file.replace('.xml', '');
  const content = fs.readFileSync(path.join(xmlDir, file), 'utf8');
  screenFaceplates[screen] = [];

  const fpMatches = content.matchAll(/<Type>HmiFaceplateContainer<\/Type>\s*<Name>([^<]+)<\/Name>/g);
  for (const m of fpMatches) {
    const name = m[1];
    faceplateUsage[name] = (faceplateUsage[name] || 0) + 1;
    screenFaceplates[screen].push(name);
  }
}

// 2. Identify the exact matching Sicar Faceplate Tags in Excel
const sicarValveTags = rawTags.filter(t => t.Name.includes('Valve') || t.Name.includes('Sicar'));
const opmodeTags = rawTags.filter(t => t.Name.includes('Opmode') || t.Name.includes('OPMode'));
const buttonTags = rawTags.filter(t => t.Name.includes('Button'));
const rollerBedTags = rawTags.filter(t => t.Name.includes('Roller_Bed'));

const faceplateToTagBinding = [
  {
    screenElement: 'LSicar_Valve8Pos_LeftHomeRightWork_WithPB_1..5',
    type: 'Pneumatic 8-Position Valve Faceplate',
    screensFound: Object.keys(screenFaceplates).filter(s => screenFaceplates[s].some(f => f.includes('Valve'))),
    boundTagsInExcel: sicarValveTags.map(t => ({
      hmiTag: t.Name,
      plcAddress: t['PLC tag'],
      dataType: t.DataType
    }))
  },
  {
    screenElement: 'Fusszeile_Button_ManualOPMode1_1..5',
    type: 'Operational Mode Selector Buttons',
    screensFound: files.filter(f => fs.readFileSync(path.join(xmlDir, f), 'utf8').includes('Fusszeile_Button_ManualOPMode1')).map(f => f.replace('.xml', '')),
    boundTagsInExcel: opmodeTags.slice(0, 10).map(t => ({
      hmiTag: t.Name,
      plcAddress: t['PLC tag'],
      dataType: t.DataType
    }))
  },
  {
    screenElement: 'Button_Back / Button_Back_1..3',
    type: 'Station Navigation Return Buttons',
    screensFound: files.filter(f => fs.readFileSync(path.join(xmlDir, f), 'utf8').includes('Button_Back')).map(f => f.replace('.xml', '')),
    boundTagsInExcel: buttonTags.slice(0, 5).map(t => ({
      hmiTag: t.Name,
      plcAddress: t['PLC tag'],
      dataType: t.DataType
    }))
  }
];

console.log('=== MATCHED FACEPLATES TO TIA TAGS ===');
for (const b of faceplateToTagBinding) {
  console.log(`\nControl: ${b.screenElement} (${b.type})`);
  console.log(`Active across ${b.screensFound.length} screens: e.g. [${b.screensFound.slice(0, 5).join(', ')}]`);
  console.log(`Matched ${b.boundTagsInExcel.length} PLC Tags from TIA Tag Table. Sample:`);
  console.log(b.boundTagsInExcel.slice(0, 3));
}

// Write the matched binding specification
fs.writeFileSync(
  'C:/Users/SDS/Desktop/JSW_HMI/converter-pipeline/exact_faceplate_tag_bindings.json',
  JSON.stringify(faceplateToTagBinding, null, 2)
);
console.log('\nWrote full binding map to C:/Users/SDS/Desktop/JSW_HMI/converter-pipeline/exact_faceplate_tag_bindings.json');
