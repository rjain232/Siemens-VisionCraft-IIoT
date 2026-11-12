const fs = require('fs');
const path = require('path');

const xmlDir = 'C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML';
const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));

let totalItems = 0;
let corruptedNames = 0;
let chineseNames = 0;
let diagonalLines = 0;
let outOfBounds = 0;
const corruptedTypes = {};

files.forEach(f => {
  const content = fs.readFileSync(path.join(xmlDir, f), 'utf8');
  const itemRegex = /<Hmi\.ScreenItem ID="(\d+)">([\s\S]*?)<\/Hmi\.ScreenItem>/g;
  let m;
  while ((m = itemRegex.exec(content)) !== null) {
    totalItems++;
    const body = m[2];
    const name = (body.match(/<Name>(.*?)<\/Name>/) || [])[1] || '';
    const type = (body.match(/<Type>(.*?)<\/Type>/) || [])[1] || '';
    const w = parseInt((body.match(/<Width>(\d+)<\/Width>/) || [])[1] || '0', 10);
    const h = parseInt((body.match(/<Height>(\d+)<\/Height>/) || [])[1] || '0', 10);
    const left = parseInt((body.match(/<Left>(-?\d+)<\/Left>/) || [])[1] || '0', 10);
    const top = parseInt((body.match(/<Top>(-?\d+)<\/Top>/) || [])[1] || '0', 10);

    if (name.includes('\uFFFD')) {
      corruptedNames++;
      corruptedTypes[type] = (corruptedTypes[type] || 0) + 1;
    }
    if (/[\u4e00-\u9fa5]/.test(name)) chineseNames++;
    if (type === 'HmiLine' && w > 4 && h > 4) diagonalLines++;
    if (left < -10 || top < -10) outOfBounds++;
  }
});

console.log('AUDIT OF ALL 211 XMLs:');
console.log('Total HMI Elements across 211 screens:', totalItems);
console.log('Corrupted/Mojibake Names (containing \\uFFFD):', corruptedNames);
console.log('Corrupted Names by Element Type:', JSON.stringify(corruptedTypes, null, 2));
console.log('Direct Chinese Names (containing Hanzi):', chineseNames);
console.log('Diagonal Lines (w>4 and h>4):', diagonalLines);
console.log('Negative / Scratchpad Out-of-bounds Elements:', outOfBounds);
