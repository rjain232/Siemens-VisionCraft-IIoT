const fs = require('fs');
const path = require('path');

const xmlDir = 'C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML';
const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));

console.log(`Starting comprehensive audit of all ${files.length} Siemens XML screens...`);

let anomalies = {
  negativeCoords: [],
  zeroClusters: [],
  clippedRight: [],
  clippedBottom: [],
  diagonalLines: [],
  overlappingText: [],
  genericGraphics: [],
  chineseRemnants: []
};

files.forEach(file => {
  const filePath = path.join(xmlDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const screenName = file.replace('.xml', '');

  // Extract dimensions
  const wMatch = content.match(/<Width>(\d+)<\/Width>/);
  const hMatch = content.match(/<Height>(\d+)<\/Height>/);
  const screenW = wMatch ? parseInt(wMatch[1], 10) : 1280;
  const screenH = hMatch ? parseInt(hMatch[1], 10) : 800;

  // Extract items
  const itemRegex = /<Hmi\.ScreenItem ID="(\d+)">([\s\S]*?)<\/Hmi\.ScreenItem>/g;
  let match;
  const items = [];

  while ((match = itemRegex.exec(content)) !== null) {
    const id = match[1];
    const body = match[2];
    const nameM = body.match(/<Name>(.*?)<\/Name>/);
    const typeM = body.match(/<Type>(.*?)<\/Type>/);
    const leftM = body.match(/<Left>(-?\d+)<\/Left>/);
    const topM = body.match(/<Top>(-?\d+)<\/Top>/);
    const widthM = body.match(/<Width>(\d+)<\/Width>/);
    const heightM = body.match(/<Height>(\d+)<\/Height>/);

    const name = nameM ? nameM[1] : '';
    const type = typeM ? typeM[1] : '';
    const left = leftM ? parseInt(leftM[1], 10) : 0;
    const top = topM ? parseInt(topM[1], 10) : 0;
    const width = widthM ? parseInt(widthM[1], 10) : 0;
    const height = heightM ? parseInt(heightM[1], 10) : 0;

    items.push({ id, name, type, left, top, width, height });
  }

  // 1. Negative coordinates (often scratchpad elements)
  const negItems = items.filter(el => el.left < -10 || el.top < -10);
  if (negItems.length > 0) {
    anomalies.negativeCoords.push({ screen: screenName, count: negItems.length, items: negItems.map(i => `${i.name}(${i.left},${i.top})`) });
  }

  // 2. Zero origin clusters (items stacked at (0,0))
  const zeroItems = items.filter(el => el.left >= 0 && el.left <= 2 && el.top >= 0 && el.top <= 2 && el.name !== 'Button_Back' && !el.name.includes('border'));
  if (zeroItems.length >= 4) {
    anomalies.zeroClusters.push({ screen: screenName, count: zeroItems.length, names: zeroItems.map(i => i.name).slice(0, 5) });
  }

  // 3. Diagonal lines (HmiLine where width > 4 and height > 4)
  const diagLines = items.filter(el => el.type === 'HmiLine' && el.width > 4 && el.height > 4);
  if (diagLines.length > 0) {
    anomalies.diagonalLines.push({ screen: screenName, count: diagLines.length, lines: diagLines.map(l => `${l.name}(${l.width}x${l.height})`) });
  }

  // 4. Boundary clipping / off-screen placement
  const rightClipped = items.filter(el => el.left + el.width > screenW + 10 && el.left < 2000);
  const bottomClipped = items.filter(el => el.top + el.height > screenH + 10 && el.top < 2000);
  if (rightClipped.length > 0) {
    anomalies.clippedRight.push({ screen: screenName, count: rightClipped.length, screenW, items: rightClipped.map(i => `${i.name}(x:${i.left}, w:${i.width}, right:${i.left+i.width})`) });
  }
  if (bottomClipped.length > 0) {
    anomalies.clippedBottom.push({ screen: screenName, count: bottomClipped.length, screenH, items: bottomClipped.map(i => `${i.name}(y:${i.top}, h:${i.height}, bottom:${i.top+i.height})`) });
  }

  // 5. Check Chinese tokens
  const zhItems = items.filter(el => /[\u4e00-\u9fa5]/.test(el.name));
  if (zhItems.length > 0) {
    anomalies.chineseRemnants.push({ screen: screenName, count: zhItems.length });
  }

  // 6. Generic graphic views that might need intelligent layout mapping
  const genericGv = items.filter(el => el.type === 'HmiGraphicView' && el.name.toLowerCase().startsWith('graphic view'));
  if (genericGv.length > 0) {
    anomalies.genericGraphics.push({ screen: screenName, count: genericGv.length, items: genericGv.map(g => `${g.name}(${g.width}x${g.height})`) });
  }
});

console.log('AUDIT SUMMARY:');
console.log(`- Screens with Negative/Scratchpad coords: ${anomalies.negativeCoords.length}`);
console.log(`- Screens with (0,0) Stacked Clusters: ${anomalies.zeroClusters.length}`);
console.log(`- Screens with Diagonal Lines (needing SVG): ${anomalies.diagonalLines.length}`);
console.log(`- Screens with Right Boundary Overflow: ${anomalies.clippedRight.length}`);
console.log(`- Screens with Bottom Boundary Overflow: ${anomalies.clippedBottom.length}`);
console.log(`- Screens with Chinese Tokens: ${anomalies.chineseRemnants.length}`);
console.log(`- Screens with Generic Graphic Views: ${anomalies.genericGraphics.length}`);

fs.writeFileSync('C:\\Users\\SDS\\Desktop\\ImageToJSX_Agent\\deep_audit_results.json', JSON.stringify(anomalies, null, 2));
console.log('Saved detailed results to deep_audit_results.json');
