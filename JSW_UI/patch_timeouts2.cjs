const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\SDS\\OneDrive - dacpl.in\\Desktop\\JSW\\JSW_UI\\src';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.jsx')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk(srcDir);
let fixedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('bgTriggeredRef.current')) {
    // Look for clearTimeout(t) or clearTimeout(timer)
    const regex = /(bgTriggeredRef\.current\s*=\s*true;[\s\S]*?setTimeout\([\s\S]*?\}\s*,[^)]+\);)\s*return\s*\(\)\s*=>\s*clearTimeout\(\w+\)\s*;/g;
    
    if (regex.test(content)) {
      content = content.replace(regex, "$1\n    // Removed clearTimeout to prevent race condition");
      fs.writeFileSync(file, content, 'utf8');
      fixedCount++;
      console.log(`Fixed: ${file}`);
    }
  }
});

console.log(`Fixed ${fixedCount} files.`);

