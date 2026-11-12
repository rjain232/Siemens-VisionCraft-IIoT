const { parseSimaticXmlToJsx } = require('./simaticXmlParser');
const fs = require('fs');

const xml = fs.readFileSync('C:/Users/SDS/Desktop/ALL_SCREENS_XML/150FX1Layout.xml', 'utf8');
const jsx = parseSimaticXmlToJsx(xml, '150FX1Layout');
const lines = jsx.split('\n');
lines.forEach((l, i) => {
  if (/[\u4e00-\u9fa5]/.test(l)) {
    console.log('Line ' + (i+1) + ': ' + l);
  }
});
