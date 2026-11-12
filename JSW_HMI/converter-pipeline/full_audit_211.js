const fs = require('fs');
const path = require('path');

const xmlDir = 'C:/Users/SDS/Desktop/ALL_SCREENS_XML';
const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));

const issues = {
  chineseInXml: [],
  graphicViewIssues: [],
  zeroDimensionItems: [],
  negativeCoordinates: [],
  crowdedScreens: []
};

files.forEach(file => {
  const content = fs.readFileSync(path.join(xmlDir, file), 'utf8');
  const base = path.basename(file, '.xml');

  // 1. Check for untranslated Chinese in XML
  const zhMatches = content.match(/[\u4e00-\u9fa5]+/g);
  if (zhMatches) {
    issues.chineseInXml.push({ file: base, terms: Array.from(new Set(zhMatches)) });
  }

  // 2. Check all items
  const itemRegex = /<Hmi\.ScreenItem ID="(\d+)">([\s\S]*?)<\/Hmi\.ScreenItem>/g;
  let match;
  let itemCount = 0;
  let gvCount = 0;

  while ((match = itemRegex.exec(content)) !== null) {
    itemCount++;
    const body = match[2];
    const nameMatch = body.match(/<Name>(.*?)<\/Name>/);
    const typeMatch = body.match(/<Type>(.*?)<\/Type>/);
    const leftMatch = body.match(/<Left>(-?\d+)<\/Left>/);
    const topMatch = body.match(/<Top>(-?\d+)<\/Top>/);
    const wMatch = body.match(/<Width>(\d+)<\/Width>/);
    const hMatch = body.match(/<Height>(\d+)<\/Height>/);

    const name = nameMatch ? nameMatch[1] : '';
    const type = typeMatch ? typeMatch[1] : '';
    const left = leftMatch ? parseInt(leftMatch[1], 10) : 0;
    const top = topMatch ? parseInt(topMatch[1], 10) : 0;
    const w = wMatch ? parseInt(wMatch[1], 10) : 0;
    const h = hMatch ? parseInt(hMatch[1], 10) : 0;

    if (type.includes('GraphicView')) {
      gvCount++;
      // Check if graphic name is generic like "Graphic view_1" on layout screens
      if (name.toLowerCase().startsWith('graphic view') || name.toLowerCase().startsWith('graphic_') || name.startsWith('图形')) {
        issues.graphicViewIssues.push({ file: base, name, w, h });
      }
    }

    if (w === 0 && h === 0 && name !== 'permanentareaborderrectangle') {
      issues.zeroDimensionItems.push({ file: base, name, type });
    }

    if (left < -20 || top < -20) {
      issues.negativeCoordinates.push({ file: base, name, left, top });
    }
  }

  if (itemCount > 60) {
    issues.crowdedScreens.push({ file: base, itemCount });
  }
});

console.log('=== FULL AUDIT OF 211 SCREENS ===');
console.log('Screens containing Chinese characters:', issues.chineseInXml.length);
console.log('Screens with generic GraphicViews:', issues.graphicViewIssues.length);
console.log('Generic GraphicView samples (first 10):', issues.graphicViewIssues.slice(0, 10));
console.log('Screens with zero dimensions (w=0, h=0):', issues.zeroDimensionItems.length);
console.log('Screens with extreme negative coordinates:', issues.negativeCoordinates.length);
console.log('High-density crowded screens (>60 elements):', issues.crowdedScreens.length, issues.crowdedScreens);
