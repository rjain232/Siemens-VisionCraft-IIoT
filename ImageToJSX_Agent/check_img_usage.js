const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\SDS\\Desktop\\ALL_SCREENS_XML';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const imgUsage = {};
const screensWithImgs = {};

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = content.match(/src="[^"]+"/g) || [];
  matches.forEach(m => {
    const src = m.replace('src="', '').replace('"', '');
    if (!src.includes('Back01')) {
      const base = path.basename(src);
      imgUsage[base] = (imgUsage[base] || 0) + 1;
      if (!screensWithImgs[base]) screensWithImgs[base] = [];
      screensWithImgs[base].push(f.replace('.html', ''));
    }
  });
});

console.log('Image usage count:');
console.log(JSON.stringify(imgUsage, null, 2));

console.log('\nSample screens for each image:');
for (const [img, list] of Object.entries(screensWithImgs)) {
  console.log(`${img} (${list.length} screens): ${list.slice(0, 4).join(', ')}`);
}
