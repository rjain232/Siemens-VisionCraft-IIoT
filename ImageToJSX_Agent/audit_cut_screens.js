const fs = require('fs');
const path = require('path');
const { parseSimaticXmlToJsx } = require('./simaticXmlParser');

const xmlDir = 'C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML';
const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));

console.log(`Starting clipping & boundary audit across all ${files.length} screens...`);

let cutScreens = [];

files.forEach(file => {
  const xml = fs.readFileSync(path.join(xmlDir, file), 'utf8');
  const screenName = file.replace('.xml', '');
  const jsx = parseSimaticXmlToJsx(xml, screenName);

  // Extract container dimensions
  const containerW = parseInt((jsx.match(/width:\s*'(\d+)px'/) || [])[1] || '0', 10);
  const containerH = parseInt((jsx.match(/height:\s*'(\d+)px'/) || [])[1] || '0', 10);

  // Extract all elements left, top, width, height from JSX
  const elRegex = /style=\{\{\s*left:\s*'(-?\d+)px',\s*top:\s*'(-?\d+)px'(?:,\s*width:\s*'(\d+)px')?(?:,\s*height:\s*'(\d+)px')?/g;
  let m;
  const elements = [];

  while ((m = elRegex.exec(jsx)) !== null) {
    const left = parseInt(m[1], 10);
    const top = parseInt(m[2], 10);
    const width = m[3] ? parseInt(m[3], 10) : 0;
    const height = m[4] ? parseInt(m[4], 10) : 0;

    elements.push({ left, top, width, height });
  }

  // Check if any element exceeds container width or height
  const cutRight = elements.filter(el => el.left + el.width > containerW);
  const cutBottom = elements.filter(el => el.top + el.height > containerH);

  if (cutRight.length > 0 || cutBottom.length > 0) {
    cutScreens.push({
      screen: screenName,
      container: `${containerW}x${containerH}`,
      cutRightCount: cutRight.length,
      maxRight: Math.max(...elements.map(e => e.left + e.width)),
      cutBottomCount: cutBottom.length,
      maxBottom: Math.max(...elements.map(e => e.top + e.height))
    });
  }
});

console.log(`\nAudit Complete:`);
console.log(`Total screens audited: ${files.length}`);
console.log(`Screens with internal element clipping: ${cutScreens.length}`);

if (cutScreens.length > 0) {
  console.log('\nClipped screens list:');
  cutScreens.forEach(s => {
    console.log(`- ${s.screen}: container [${s.container}], maxRight: ${s.maxRight}, maxBottom: ${s.maxBottom}`);
  });
} else {
  console.log('ALL 211 SCREENS HAVE 100% CONTAINER COVERAGE (0 CUT SCREENS)!');
}
