const fs = require('fs');
const content = fs.readFileSync('C:/Users/SDS/Desktop/ALL_SCREENS_XML/160FX1Layout.xml', 'utf8');

const regex = /<Hmi\.ScreenItem ID="(\d+)">([\s\S]*?)<\/Hmi\.ScreenItem>/g;
let m;
while ((m = regex.exec(content)) !== null) {
  if (m[1] === '4' || m[1] === '63' || m[1] === '68' || m[1] === '70') {
    console.log(`=== ITEM ID ${m[1]} ===`);
    console.log(m[2]);
  }
}
