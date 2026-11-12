const fs = require('fs');

const content = fs.readFileSync('C:/Users/SDS/Desktop/ALL_SCREENS_XML/190J5RoofGeo.xml', 'utf8');
const chunks = content.split('<Hmi.ScreenItem');
chunks.slice(1).forEach(c => {
  const name = (c.match(/<Name>([^<]+)<\/Name>/) || [])[1];
  const type = (c.match(/<Type>([^<]+)<\/Type>/) || [])[1];
  const left = (c.match(/<Left>([^<]+)<\/Left>/) || [])[1];
  const top = (c.match(/<Top>([^<]+)<\/Top>/) || [])[1];
  const w = (c.match(/<Width>([^<]+)<\/Width>/) || [])[1];
  const h = (c.match(/<Height>([^<]+)<\/Height>/) || [])[1];
  console.log(String(name).padEnd(25), String(type).padEnd(20), `(${left}, ${top})`.padEnd(12), `${w}x${h}`);
});
