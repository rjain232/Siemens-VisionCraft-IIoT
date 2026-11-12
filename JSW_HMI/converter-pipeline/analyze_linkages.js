const fs = require('fs');
const path = require('path');

const xmlDir = 'C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML';
const files = fs.readdirSync(xmlDir).filter(f => f.endsWith('.xml'));

let totalScreens = files.length;
let linkages = [];
let screenTags = {};
let allTags = new Set();
let screenTypes = {
  layouts: [],
  submenus: [],
  diagnostics: [],
  alarms: [],
  popups: [],
  others: []
};

// Also load known tags from HMI if needed, but scanning the XML reveals real runtime bindings
for (const file of files) {
  const content = fs.readFileSync(path.join(xmlDir, file), 'utf8');
  const screenName = file.replace('.xml', '');
  screenTags[screenName] = new Set();

  if (screenName.includes('Layout')) screenTypes.layouts.push(screenName);
  else if (screenName.includes('SubMenu')) screenTypes.submenus.push(screenName);
  else if (screenName.includes('Diag')) screenTypes.diagnostics.push(screenName);
  else if (screenName.includes('Alarm') || screenName.includes('Meld')) screenTypes.alarms.push(screenName);
  else if (screenName.includes('Popup') || screenName.includes('Legend') || screenName.includes('Dialog')) screenTypes.popups.push(screenName);
  else screenTypes.others.push(screenName);

  // 1. Navigation / ActivateScreen calls and Links
  // Match ActivateScreen function calls
  const activateScreenRegex = /ActivateScreen[\s\S]*?Target="([^"]+)"/g;
  let m;
  while ((m = activateScreenRegex.exec(content)) !== null) {
    linkages.push({ from: screenName, to: m[1], type: 'ActivateScreen' });
  }

  // Match Screen target links
  const screenTargetRegex = /<Link\s+Name="Screen"\s+Target="([^"]+)"/g;
  while ((m = screenTargetRegex.exec(content)) !== null) {
    linkages.push({ from: screenName, to: m[1], type: 'ScreenLink' });
  }

  // Match button text or custom screen jump properties
  const jumpRegex = /<Parameter\s+Name="ScreenNumber"[^>]*?>\s*<Value>(\d+)<\/Value>/g;
  while ((m = jumpRegex.exec(content)) !== null) {
    linkages.push({ from: screenName, screenNumber: m[1], type: 'ScreenNumberCall' });
  }

  // 2. Extract Tags from bindings and dynamic properties
  // Pattern A: Tag="tagname" or VariableName="tagname"
  const tagAttrRegex = /(?:Tag|VariableName|Variable)="([^"]+)"/g;
  while ((m = tagAttrRegex.exec(content)) !== null) {
    const t = m[1].trim();
    if (t && !t.includes('<') && !t.includes('>')) {
      screenTags[screenName].add(t);
      allTags.add(t);
    }
  }

  // Pattern B: <Link Name="Tag" Target="..."/> or <Link Name="Variable" Target="..."/>
  const linkTagRegex = /<Link\s+Name="(?:Tag|Variable|ProcessValue|InputValue|OutputValue)"\s+Target="([^"]+)"/g;
  while ((m = linkTagRegex.exec(content)) !== null) {
    const t = m[1].trim();
    if (t) {
      screenTags[screenName].add(t);
      allTags.add(t);
    }
  }

  // Pattern C: DB symbol references like "DB_Name".Field or "LineMB200_HMI".something
  const dbRegex = /"([A-Za-z0-9_-]+)"\.([A-Za-z0-9_\.\[\]]+)/g;
  while ((m = dbRegex.exec(content)) !== null) {
    const fullTag = `"${m[1]}".${m[2]}`;
    screenTags[screenName].add(fullTag);
    allTags.add(fullTag);
  }
}

// Compute Tag Sharing metrics
let tagUsage = {};
for (const [screen, tags] of Object.entries(screenTags)) {
  for (const t of tags) {
    if (!tagUsage[t]) tagUsage[t] = [];
    tagUsage[t].push(screen);
  }
}

const sharedTags = Object.entries(tagUsage)
  .filter(([t, screens]) => screens.length > 1)
  .map(([t, screens]) => ({ tag: t, screenCount: screens.length, screens: screens.slice(0, 5) }))
  .sort((a, b) => b.screenCount - a.screenCount);

const singleScreenTags = Object.entries(tagUsage)
  .filter(([t, screens]) => screens.length === 1);

// Look at inter-screen linkages breakdown
const linkMap = {};
for (const link of linkages) {
  const key = `${link.from} -> ${link.to || link.screenNumber}`;
  linkMap[key] = (linkMap[key] || 0) + 1;
}

const result = {
  summary: {
    totalScreens,
    screenBreakdown: {
      layouts: screenTypes.layouts.length,
      submenus: screenTypes.submenus.length,
      diagnostics: screenTypes.diagnostics.length,
      alarms: screenTypes.alarms.length,
      popups: screenTypes.popups.length,
      others: screenTypes.others.length
    },
    totalExtractedTags: allTags.size,
    sharedTagsCount: sharedTags.length,
    isolatedTagsCount: singleScreenTags.length,
    totalNavigationsFound: linkages.length
  },
  topSharedTags: sharedTags.slice(0, 30),
  sampleScreenLinkages: Object.entries(linkMap).slice(0, 40).map(([k, v]) => ({ route: k, occurrences: v }))
};

fs.writeFileSync(path.join(__dirname, 'interscreen_linkages_report.json'), JSON.stringify(result, null, 2));
console.log('Analysis written to interscreen_linkages_report.json successfully!');
console.log(JSON.stringify(result.summary, null, 2));
console.log('Top 10 Most Shared Global Tags:');
console.log(JSON.stringify(result.topSharedTags.slice(0, 10), null, 2));
