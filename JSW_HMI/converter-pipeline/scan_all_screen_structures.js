const fs = require('fs');
const path = require('path');

const xmlDir = 'C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML';
const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));

// Store item names, types, and screen occurrences
const controlCatalog = {};
const screenControls = {};
const navigationPatterns = {};
const faceplateCatalog = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(xmlDir, file), 'utf8');
  const screenName = file.replace('.xml', '');
  screenControls[screenName] = [];

  const itemRegex = /<Type>([^<]+)<\/Type>\s*<Name>([^<]+)<\/Name>/g;
  let m;
  while ((m = itemRegex.exec(content)) !== null) {
    const type = m[1];
    const name = m[2];

    if (!controlCatalog[name]) {
      controlCatalog[name] = { type, count: 0, screens: [] };
    }
    controlCatalog[name].count++;
    controlCatalog[name].screens.push(screenName);

    screenControls[screenName].push({ type, name });

    if (type === 'HmiFaceplateContainer') {
      faceplateCatalog[name] = (faceplateCatalog[name] || 0) + 1;
    }

    if (name.includes('Back') || name.includes('Move_') || name.includes('Button_') || name.includes('Fusszeile_')) {
      if (!navigationPatterns[name]) {
        navigationPatterns[name] = { type, count: 0, screens: [] };
      }
      navigationPatterns[name].count++;
      navigationPatterns[name].screens.push(screenName);
    }
  }
}

// 1. Shared Navigation Controls (Interscreen Linkages)
const sharedNav = Object.entries(navigationPatterns)
  .sort((a, b) => b[1].count - a[1].count);

// 2. Shared Faceplate Re-use (Modular Control & Tag Interface Sharing)
const sharedFaceplates = Object.entries(faceplateCatalog)
  .sort((a, b) => b[1] - a[1]);

// 3. Screen Structure Categories
const screenCategories = {
  stationLayouts: files.filter(f => /Layout\.xml$/i.test(f)).map(f => f.replace('.xml', '')),
  submenus: files.filter(f => /SubMenu/i.test(f)).map(f => f.replace('.xml', '')),
  popups: files.filter(f => /Popup|Legend|Dialog/i.test(f)).map(f => f.replace('.xml', '')),
  overviews: files.filter(f => /Overview|Main/i.test(f)).map(f => f.replace('.xml', '')),
  diagnostics: files.filter(f => /Diag|Fault|Meld/i.test(f)).map(f => f.replace('.xml', ''))
};

const output = {
  totalXmlScreens: files.length,
  screenCategories,
  sharedNavigationControls: sharedNav.slice(0, 25),
  sharedFaceplates: sharedFaceplates.slice(0, 25)
};

fs.writeFileSync('C:/Users/SDS/Desktop/JSW_HMI/converter-pipeline/interscreen_structure_summary.json', JSON.stringify(output, null, 2));
console.log('Done scanning 211 screens!');
console.log('Top Shared Navigation Controls across Screens:');
console.log(sharedNav.slice(0, 15).map(n => `${n[0]} (${n[1].type}): present on ${n[1].count} screens`));
console.log('\nTop Shared Faceplates across Screens:');
console.log(sharedFaceplates.slice(0, 15));
