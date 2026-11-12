const { parseSimaticXmlToJsx } = require('./simaticXmlParser');
const fs = require('fs');

const xml = fs.readFileSync('C:/Users/SDS/Desktop/ALL_SCREENS_XML/150FX1Layout.xml', 'utf8');
const jsx = parseSimaticXmlToJsx(xml, '150FX1Layout');

console.log('Contains Chinese?', /[\u4e00-\u9fa5]/.test(jsx));
console.log('Contains SVG line?', jsx.includes('<svg className="absolute pointer-events-none'));
console.log('Contains PPX150_J5?', jsx.includes('PPX150_J5'));
console.log('Contains Zylinder?', jsx.includes('Zylinder'));
