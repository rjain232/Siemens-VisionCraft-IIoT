const fs = require('fs');
const content = fs.readFileSync('C:/Users/SDS/Desktop/ALL_SCREENS_XML/160FX1Layout.xml', 'utf8');

const regex = /<Hmi\.ScreenItem ID="(\d+)">\s*<AttributeList>([\s\S]*?)<\/AttributeList>\s*<\/Hmi\.ScreenItem>/g;
let m;
let items = [];
while ((m = regex.exec(content)) !== null) {
  const id = m[1];
  const body = m[2];
  const type = (body.match(/<Type>([^<]+)<\/Type>/) || [])[1];
  const name = (body.match(/<Name>([^<]+)<\/Name>/) || [])[1];
  const left = (body.match(/<Left>([^<]+)<\/Left>/) || [])[1];
  const top = (body.match(/<Top>([^<]+)<\/Top>/) || [])[1];
  const width = (body.match(/<Width>([^<]+)<\/Width>/) || [])[1];
  const height = (body.match(/<Height>([^<]+)<\/Height>/) || [])[1];
  items.push({ id, type, name, left, top, width, height });
}

console.log('Total extracted screen items:', items.length);
console.log('Faceplates / Buttons / Controls:');
console.log(items.filter(it => it.type === 'HmiFaceplateContainer' || it.type === 'HmiButton' || it.type === 'HmiGraphicView'));
