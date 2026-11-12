const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/SDS/Desktop/ALL_SCREENS_XML';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.xml'));

const gvMap = {};
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const items = content.match(/<Hmi\.ScreenItem ID="(\d+)">([\s\S]*?)<\/Hmi\.ScreenItem>/g) || [];
  items.forEach(it => {
    if (it.includes('HmiGraphicView')) {
      const name = (it.match(/<Name>(.*?)<\/Name>/) || [])[1];
      const w = (it.match(/<Width>(.*?)<\/Width>/) || [])[1];
      const h = (it.match(/<Height>(.*?)<\/Height>/) || [])[1];
      const base = f.replace('.xml', '');
      if (!gvMap[base]) gvMap[base] = [];
      gvMap[base].push({ name, w, h });
    }
  });
});

console.log('Screens with GraphicViews:', Object.keys(gvMap).length);
const sampleKeys = Object.keys(gvMap).slice(0, 25);
sampleKeys.forEach(k => {
  console.log(k, ':', gvMap[k].map(g => `${g.name} (${g.w}x${g.h})`).join(', '));
});
