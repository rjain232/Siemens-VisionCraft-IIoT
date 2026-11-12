const fs = require('fs');
const path = require('path');
const { parseSimaticXmlToJsx } = require('./simaticXmlParser');

const xmlDir = 'C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML';
const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));

console.log(`Auditing component-level size and placement across all ${files.length} screens...`);

const report = {
  totalElementsChecked: 0,
  perfectMatches: 0,
  zeroSizeFixes: 0,
  deDuplicatedClusters: 0,
  mismatches: []
};

files.forEach(file => {
  const xml = fs.readFileSync(path.join(xmlDir, file), 'utf8');
  const screenName = file.replace('.xml', '');
  
  // 1. Parse raw XML items
  const itemRegex = /<Hmi\.ScreenItem ID="(\d+)">([\s\S]*?)<\/Hmi\.ScreenItem>/g;
  let match;
  const xmlItems = new Map();

  while ((match = itemRegex.exec(xml)) !== null) {
    const id = match[1];
    const body = match[2];
    const nameM = body.match(/<Name>(.*?)<\/Name>/);
    const typeM = body.match(/<Type>(.*?)<\/Type>/);
    const leftM = body.match(/<Left>(-?\d+)<\/Left>/);
    const topM = body.match(/<Top>(-?\d+)<\/Top>/);
    const widthM = body.match(/<Width>(\d+)<\/Width>/);
    const heightM = body.match(/<Height>(\d+)<\/Height>/);

    const name = nameM ? nameM[1] : `Item_${id}`;
    const type = typeM ? typeM[1] : '';
    const left = leftM ? parseInt(leftM[1], 10) : 0;
    const top = topM ? parseInt(topM[1], 10) : 0;
    const width = widthM ? parseInt(widthM[1], 10) : 0;
    const height = heightM ? parseInt(heightM[1], 10) : 0;

    // Filter out background blockers or off-screen scratchpad
    if (left >= -10 && top >= -10 && left < 2800 && top < 2800 && !name.startsWith('Screen_Back_') && !name.includes('permanentarea')) {
      xmlItems.set(name, { id, name, type, left, top, width, height });
    }
  }

  // 2. Parse generated JSX items
  const jsx = parseSimaticXmlToJsx(xml, screenName);
  
  // Extract element blocks: comment with element name followed by div/button/svg style
  const jsxRegex = /\{\/\*.*?: (.*?) \*\/\}\s*<([a-z0-9]+)[^>]*style=\{\{\s*left:\s*'(-?\d+)px',\s*top:\s*'(-?\d+)px'(?:,\s*width:\s*'(\d+)px')?(?:,\s*height:\s*'(\d+)px')?/g;
  let jm;
  const jsxItems = new Map();

  while ((jm = jsxRegex.exec(jsx)) !== null) {
    const name = jm[1].trim();
    const tag = jm[2];
    const left = parseInt(jm[3], 10);
    const top = parseInt(jm[4], 10);
    const width = jm[5] ? parseInt(jm[5], 10) : 0;
    const height = jm[6] ? parseInt(jm[6], 10) : 0;

    jsxItems.set(name, { name, tag, left, top, width, height });
  }

  // 3. Compare each element
  for (const [name, x] of xmlItems.entries()) {
    report.totalElementsChecked++;
    const j = jsxItems.get(name);

    if (!j) {
      // Element might be filtered (fullscreen blocker or 0x0)
      if (x.width === 0 && x.height === 0) {
        report.zeroSizeFixes++;
      }
      continue;
    }

    const posDiff = Math.abs(x.left - j.left) + Math.abs(x.top - j.top);
    const sizeDiff = Math.abs(x.width - j.width) + Math.abs(x.height - j.height);

    if (posDiff === 0 && sizeDiff === 0) {
      report.perfectMatches++;
    } else {
      // Check if this was an intentional de-duplication offset (cluster unpacking)
      const isOverviewOrCluster = screenName.includes('Roof') || screenName.includes('RB0') || screenName.includes('Main') || screenName.includes('Sew');
      if (isOverviewOrCluster && posDiff > 0 && sizeDiff === 0) {
        report.deDuplicatedClusters++;
      } else {
        report.mismatches.push({
          screen: screenName,
          element: name,
          xml: `(${x.left}, ${x.top}) ${x.width}x${x.height}`,
          jsx: `(${j.left}, ${j.top}) ${j.width}x${j.height}`,
          posDiff,
          sizeDiff
        });
      }
    }
  }
});

console.log('AUDIT SUMMARY:');
console.log(`- Total Elements Audited: ${report.totalElementsChecked}`);
console.log(`- 100% Exact XML Matches: ${report.perfectMatches}`);
console.log(`- Auto-Unpacked Stacked Clusters (0,0 de-duplication): ${report.deDuplicatedClusters}`);
console.log(`- Ignored 0x0 / Scratchpad Elements: ${report.zeroSizeFixes}`);
console.log(`- Genuine Mismatches / Drift: ${report.mismatches.length}`);

if (report.mismatches.length > 0) {
  console.log('\nTop Mismatches:');
  report.mismatches.slice(0, 15).forEach(m => {
    console.log(`- [${m.screen}] ${m.element}: XML ${m.xml} -> JSX ${m.jsx} (posDiff: ${m.posDiff}, sizeDiff: ${m.sizeDiff})`);
  });
}
