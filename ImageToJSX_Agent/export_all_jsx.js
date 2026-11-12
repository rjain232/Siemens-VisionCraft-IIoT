const fs = require('fs');
const path = require('path');
const { parseSimaticXmlToJsx } = require('./simaticXmlParser');

const xmlDir = 'C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML';

if (!fs.existsSync(xmlDir)) {
  console.error('XML folder not found:', xmlDir);
  process.exit(1);
}

const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));
console.log(`Starting conversion of ${files.length} Siemens XML screens to .jsx files in ${xmlDir}...`);

let successCount = 0;
let failCount = 0;

files.forEach((file, index) => {
  try {
    const xmlPath = path.join(xmlDir, file);
    const xmlContent = fs.readFileSync(xmlPath, 'utf8');
    const screenBase = path.basename(file, '.xml');
    
    // Generate React JSX using the updated parser
    const jsxCode = parseSimaticXmlToJsx(xmlContent, screenBase);
    
    // Output file with .jsx extension in the exact same folder
    const jsxPath = path.join(xmlDir, `${screenBase}.jsx`);
    
    // Prepend standard React import header for clean standalone usage
    const fullJsxContent = `import React, { useState } from 'react';\n\n${jsxCode}\nexport default ${screenBase.replace(/[^a-zA-Z0-9]/g, '') ? ((/^[0-9]/.test(screenBase.replace(/[^a-zA-Z0-9]/g, '')) ? 'Screen_' : '') + screenBase.replace(/[^a-zA-Z0-9]/g, '') + 'Component') : 'SimaticHmiScreenComponent'};\n`;
    
    fs.writeFileSync(jsxPath, fullJsxContent, 'utf8');
    successCount++;
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
    failCount++;
  }
});

console.log(`========================================`);
console.log(`BATCH EXPORT COMPLETE!`);
console.log(`Total screens converted: ${successCount}/${files.length}`);
console.log(`Failures: ${failCount}`);
console.log(`Files saved to: ${xmlDir}\\*.jsx`);
console.log(`========================================`);
